# The portfolio's studio: a device on volcanic basalt under monochrome studio light (the look of
# the site's own project photographs), with a real product screen as its texture.
#   still: blender -b -P devices.py -- still <laptop|phone|tablet> <screen.png> <out.png> <w> <h> [samples] [yaw]
#   film:  blender -b -P devices.py -- film laptop <screen.png> <out_dir> <w> <h> <frames> [samples]
#          the lid opens, the screen wakes, the camera pushes in (scrubbed on the site, so linear time)
# Quality (env): ENGINE=CYCLES (default; BLENDER_EEVEE for a quick look), SAMPLES cap, NOISE (adaptive threshold),
# PREVIEW=f1,f2 renders only those frames. The site's film: Cycles path tracing, OpenImageDenoise on albedo + normal
# (accurate prefilter), dithered 8-bit PNG; desktop SHIFT_X=-0.17 2560×1440, phone LENS=35 SHIFT_Y=-0.05 1080×1920.
import bpy, bmesh, math, sys, os
from mathutils import Vector

a = sys.argv[sys.argv.index('--') + 1:]
MODE, DEVICE, SCREEN, OUT, W, H = a[0], a[1], a[2], a[3], int(a[4]), int(a[5])
FRAMES = int(a[6]) if MODE == 'film' else 1
SAMPLES = int(a[7]) if MODE == 'film' and len(a) > 7 else (int(a[6]) if MODE == 'still' and len(a) > 6 else (512 if MODE == 'film' else 256))
YAW = float(a[7]) if MODE == 'still' and len(a) > 7 else -28.0

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.resolution_x, sc.render.resolution_y = W, H
sc.render.engine = os.environ.get('ENGINE', 'CYCLES')
if sc.render.engine == 'BLENDER_EEVEE':
    sc.eevee.taa_render_samples = int(os.environ.get('EEVEE_SAMPLES', 48))
    try: sc.eevee.use_raytracing = True
    except AttributeError: pass
cy = sc.cycles
cy.samples = SAMPLES
cy.use_adaptive_sampling = True
cy.adaptive_threshold = float(os.environ.get('NOISE', 0.004))   # stop a pixel once its noise is below this
cy.adaptive_min_samples = 64
cy.use_denoising = True
cy.denoiser = 'OPENIMAGEDENOISE'
cy.denoising_input_passes = 'RGB_ALBEDO_NORMAL'                  # edges and textures stay sharp through the denoiser
cy.denoising_prefilter = 'ACCURATE'
try: cy.denoising_quality = 'HIGH'
except AttributeError: pass
try: cy.denoising_use_gpu = True
except AttributeError: pass
cy.max_bounces, cy.diffuse_bounces, cy.glossy_bounces = 12, 6, 8
cy.transmission_bounces, cy.transparent_max_bounces = 8, 8
cy.caustics_reflective = cy.caustics_refractive = False
cy.blur_glossy = 0.4                                             # no fireflies off the metal
cy.sample_clamp_indirect = 4.0
cy.light_sampling_threshold = 0.005
sc.render.filter_size = 1.2                                      # a slightly crisper pixel filter than the 1.5 default
sc.render.use_persistent_data = True                             # the scene stays loaded between frames
sc.render.dither_intensity = 1.0                                 # no banding in the dark gradients
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for d in prefs.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e:
    print('GPU setup failed:', e)
sc.view_settings.view_transform = 'AgX'
sc.view_settings.look = 'AgX - Medium High Contrast'
sc.render.image_settings.file_format = 'PNG'
sc.render.image_settings.color_mode = 'RGB'

world = bpy.data.worlds.new('w'); sc.world = world; world.use_nodes = True
world.node_tree.nodes['Background'].inputs[0].default_value = (0.004, 0.0042, 0.0046, 1)

def principled(name, base, rough=0.5, metal=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*base, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    return m, b

# ---------------------------------------------------------------- basalt: a displaced, cut block
def rock():
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=int(os.environ.get('ROCK_SUBDIV', 7)), radius=1.0)
    r = bpy.context.object; r.name = 'basalt'
    r.scale = (0.46, 0.34, 0.2); bpy.ops.object.transform_apply(scale=True)
    for name, ttype, size, strength in (('big', 'VORONOI', 0.35, 0.09), ('mid', 'CLOUDS', 0.12, 0.035), ('fine', 'CLOUDS', 0.03, 0.008)):
        t = bpy.data.textures.new(name, ttype); t.noise_scale = size
        if ttype == 'CLOUDS': t.noise_depth = 4
        m = r.modifiers.new(name, 'DISPLACE'); m.texture = t; m.strength = strength
        bpy.ops.object.modifier_apply(modifier=m.name)
    # a flattened, still-rough top the device rests on (squash everything above the cut, keep the grain)
    top = 0.12
    for v in r.data.vertices:
        if v.co.z > top: v.co.z = top + (v.co.z - top) * 0.22
    for p in r.data.polygons: p.use_smooth = True
    r.location.z = -top
    mat, b = principled('basalt', (0.006, 0.006, 0.0065), rough=0.95)
    nt = mat.node_tree
    noise = nt.nodes.new('ShaderNodeTexNoise'); noise.inputs['Scale'].default_value = 60; noise.inputs['Detail'].default_value = 12
    vor = nt.nodes.new('ShaderNodeTexVoronoi'); vor.inputs['Scale'].default_value = 140
    mix = nt.nodes.new('ShaderNodeMath'); mix.operation = 'MULTIPLY'
    nt.links.new(noise.outputs['Fac'], mix.inputs[0]); nt.links.new(vor.outputs['Distance'], mix.inputs[1])
    # vesicles: the small gas pits of volcanic stone, and a fine grain
    pits = nt.nodes.new('ShaderNodeTexVoronoi'); pits.inputs['Scale'].default_value = 420; pits.feature = 'F1'
    ramp = nt.nodes.new('ShaderNodeMapRange'); ramp.inputs['From Min'].default_value = 0.0; ramp.inputs['From Max'].default_value = 0.09
    nt.links.new(pits.outputs['Distance'], ramp.inputs['Value'])
    grain = nt.nodes.new('ShaderNodeTexNoise'); grain.inputs['Scale'].default_value = 900; grain.inputs['Detail'].default_value = 4
    soft = nt.nodes.new('ShaderNodeMath'); soft.operation = 'MULTIPLY_ADD'; soft.inputs[1].default_value = 0.35; soft.inputs[2].default_value = 0.65
    nt.links.new(ramp.outputs['Result'], soft.inputs[0])   # sparse pits: most of the surface keeps the original grain
    h1 = nt.nodes.new('ShaderNodeMath'); h1.operation = 'MULTIPLY'
    nt.links.new(mix.outputs['Value'], h1.inputs[0]); nt.links.new(soft.outputs['Value'], h1.inputs[1])
    h2 = nt.nodes.new('ShaderNodeMath'); h2.operation = 'MULTIPLY_ADD'; h2.inputs[1].default_value = 0.08
    nt.links.new(grain.outputs['Fac'], h2.inputs[0]); nt.links.new(h1.outputs['Value'], h2.inputs[2])
    bump = nt.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.75; bump.inputs['Distance'].default_value = 0.0025
    nt.links.new(h2.outputs['Value'], bump.inputs['Height'])
    nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    # matte volcanic stone: a faint sheen on the high points only, never a grey polish
    rr = nt.nodes.new('ShaderNodeMapRange'); rr.inputs['To Min'].default_value = 0.98; rr.inputs['To Max'].default_value = 0.9
    nt.links.new(ramp.outputs['Result'], rr.inputs['Value']); nt.links.new(rr.outputs['Result'], b.inputs['Roughness'])
    r.data.materials.append(mat)
    return r

def screen_material(path, name='screen'):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    out = nt.nodes.new('ShaderNodeOutputMaterial')
    tex = nt.nodes.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(path); tex.interpolation = 'Cubic'
    em = nt.nodes.new('ShaderNodeEmission'); em.inputs['Strength'].default_value = 1.0
    glossy = nt.nodes.new('ShaderNodeBsdfGlossy'); glossy.inputs['Roughness'].default_value = 0.05
    glossy.inputs['Color'].default_value = (1, 1, 1, 1)
    fres = nt.nodes.new('ShaderNodeLayerWeight'); fres.inputs['Blend'].default_value = 0.12
    add = nt.nodes.new('ShaderNodeMixShader')
    nt.links.new(tex.outputs['Color'], em.inputs['Color'])
    nt.links.new(fres.outputs['Facing'], add.inputs['Fac'])
    nt.links.new(em.outputs['Emission'], add.inputs[1]); nt.links.new(glossy.outputs['BSDF'], add.inputs[2])
    nt.links.new(add.outputs['Shader'], out.inputs['Surface'])
    return m, em

ALU, _alu = principled('aluminium', (0.13, 0.13, 0.135), rough=0.4, metal=1.0)
# bead-blasted aluminium: a fine, even roughness grain instead of a perfect mirror-smooth surface
_n = ALU.node_tree.nodes; _g = _n.new('ShaderNodeTexNoise'); _g.inputs['Scale'].default_value = 2400; _g.inputs['Detail'].default_value = 2
_r = _n.new('ShaderNodeMapRange'); _r.inputs['To Min'].default_value = 0.36; _r.inputs['To Max'].default_value = 0.44
ALU.node_tree.links.new(_g.outputs['Fac'], _r.inputs['Value']); ALU.node_tree.links.new(_r.outputs['Result'], _alu.inputs['Roughness'])
BLACK, _blk = principled('bezel', (0.004, 0.004, 0.005), rough=0.18)
_blk.inputs['Coat Weight'].default_value = 0.6; _blk.inputs['Coat Roughness'].default_value = 0.04   # the glass over the bezel
KEY, _ = principled('keys', (0.012, 0.012, 0.013), rough=0.55)
CAP, _cap = principled('keycaps', (0.016, 0.016, 0.017), rough=0.62)
_cap.inputs['Sheen Weight'].default_value = 0.25; _cap.inputs['Sheen Roughness'].default_value = 0.4   # soft-touch plastic
GLASSPAD, _gp = principled('trackpad', (0.085, 0.085, 0.09), rough=0.3)
_gp.inputs['Coat Weight'].default_value = 0.3; _gp.inputs['Coat Roughness'].default_value = 0.2       # etched glass

def box(name, size, loc=(0, 0, 0), mat=ALU, bevel=0.0, segs=4, parent=None):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object; o.name = name; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel:
        bv = o.modifiers.new('bevel', 'BEVEL'); bv.width = bevel; bv.segments = max(segs, int(os.environ.get('BEVEL_SEGS', 8)))
        bv.limit_method = 'NONE'; bv.harden_normals = True
    o.data.materials.append(mat)
    for p in o.data.polygons: p.use_smooth = True
    if parent: o.parent = parent
    return o

def screen_plane(name, w, h, mat, loc, rot, parent):
    bpy.ops.mesh.primitive_plane_add(size=1, location=loc, rotation=rot)
    s = bpy.context.object; s.name = name; s.scale = (w, h, 1)
    s.data.materials.append(mat); s.parent = parent
    return s

# ---------------------------------------------------------------- devices
def laptop(path):
    root = bpy.data.objects.new('laptop', None); sc.collection.objects.link(root)
    W_, D_, T_ = 0.31, 0.215, 0.012
    box('base', (W_, D_, T_), (0, 0, T_ / 2), bevel=0.004, parent=root)
    box('well', (W_ * 0.88, D_ * 0.42, 0.0012), (0, D_ * 0.12, T_ + 0.0002), mat=KEY, parent=root)
    key = box('key', (0.0158, 0.0152, 0.0014), (-W_ * 0.415, D_ * 0.12 - D_ * 0.17, T_ + 0.0009), mat=CAP, bevel=0.0012, segs=4, parent=root)
    for axis, count in ((0, 14), (1, 5)):
        arr = key.modifiers.new(f'a{axis}', 'ARRAY'); arr.count = count
        arr.relative_offset_displace = (1.2, 0, 0) if axis == 0 else (0, 1.22, 0)
    box('pad', (0.11, 0.068, 0.0006), (0, -D_ * 0.3, T_ + 0.0001), mat=GLASSPAD, bevel=0.0003, segs=3, parent=root)
    # the hinge barrel along the back edge (seen while the lid is still closed)
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.0042, depth=W_ * 0.78, location=(0, D_ / 2 - 0.004, T_ - 0.0005), rotation=(0, math.radians(90), 0))
    barrel = bpy.context.object; barrel.name = 'barrel'; barrel.data.materials.append(ALU); barrel.parent = root
    for p in barrel.data.polygons: p.use_smooth = True
    hinge = bpy.data.objects.new('hinge', None); sc.collection.objects.link(hinge)
    hinge.parent = root; hinge.location = (0, D_ / 2 - 0.004, T_)
    box('lid', (W_, 0.006, D_), (0, 0.003, D_ / 2), bevel=0.004, parent=hinge)
    screen_plane('bezel', W_ * 0.965, D_ * 0.95, BLACK, (0, -0.0002, D_ / 2), (math.radians(90), 0, 0), hinge)
    mat, em = screen_material(path)
    screen_plane('screen', 0.288, 0.18, mat, (0, -0.0005, D_ / 2 + 0.004), (math.radians(90), 0, 0), hinge)
    return root, hinge, em, (0, 0, 0.11)

def slab(name, w, h, t, path):
    """a phone or tablet standing on the rock, leaning back a little, screen to the camera"""
    root = bpy.data.objects.new(name, None); sc.collection.objects.link(root)
    stand = bpy.data.objects.new(name + '_tilt', None); sc.collection.objects.link(stand); stand.parent = root
    stand.rotation_euler = (math.radians(-11), 0, 0)
    r = min(w, h) * 0.12
    box(name + '_body', (w, t, h), (0, 0, h / 2), bevel=r, segs=10, parent=stand)
    screen_plane(name + '_bezel', w - r * 1.2, h - r * 1.2, BLACK, (0, -t / 2 - 0.0002, h / 2), (math.radians(90), 0, 0), stand)
    mat, em = screen_material(path)
    inset = min(w, h) * 0.045 + r * 0.3
    screen_plane(name + '_screen', w - inset * 2, h - inset * 2, mat, (0, -t / 2 - 0.0005, h / 2), (math.radians(90), 0, 0), stand)
    return root, stand, em, (0, 0, h * 0.5)

# ---------------------------------------------------------------- light and camera
def area(name, loc, energy, size, target=(0, 0, 0.08), color=(1, 1, 1)):
    l = bpy.data.lights.new(name, 'AREA'); l.energy = energy; l.size = size; l.color = color
    o = bpy.data.objects.new(name, l); o.location = loc; sc.collection.objects.link(o)
    t = bpy.data.objects.new(name + '_t', None); t.location = target; sc.collection.objects.link(t)
    c = o.constraints.new('TRACK_TO'); c.target = t; c.track_axis = 'TRACK_NEGATIVE_Z'; c.up_axis = 'UP_Y'
    return o

backdrop_mat, _ = principled('backdrop', (0.05, 0.05, 0.052), rough=0.95)
bpy.ops.mesh.primitive_plane_add(size=12, location=(0, 3.2, 0), rotation=(math.radians(90), 0, 0))
bpy.context.object.data.materials.append(backdrop_mat)
area('key', (-1.2, -1.0, 1.6), 70, 1.6)
area('top', (0.2, 0.3, 2.0), 22, 2.5)
area('rim', (1.3, 1.2, 0.6), 90, 1.0)
area('wash', (0, 2.6, 1.2), 60, 3.5, target=(0, 3.2, 0.6))

basalt = rock()
if DEVICE == 'laptop':
    dev, part, emission, aim = laptop(SCREEN)
elif DEVICE == 'phone':
    dev, part, emission, aim = slab('phone', 0.0715, 0.147, 0.0078, SCREEN)
else:
    dev, part, emission, aim = slab('tablet', 0.25, 0.18, 0.0065, SCREEN)
dev.rotation_euler = (0, 0, math.radians(YAW * 0.35))
# seat the device on the rock: the highest rock point under its footprint (world z = local z + rock offset)
half = {'laptop': (0.17, 0.12), 'phone': (0.045, 0.03), 'tablet': (0.14, 0.04)}[DEVICE]
under = [v.co.z for v in basalt.data.vertices if abs(v.co.x) < half[0] and abs(v.co.y) < half[1]]
seat = (max(under) if under else 0.12) + basalt.location.z
dev.location.z = seat - 0.001
aim = (aim[0], aim[1], aim[2] + seat)

target = bpy.data.objects.new('aim', None); sc.collection.objects.link(target); target.location = aim
cam_d = bpy.data.cameras.new('cam'); cam_d.lens = float(os.environ.get('LENS', 50))
cam_d.shift_x = float(os.environ.get('SHIFT_X', 0)); cam_d.shift_y = float(os.environ.get('SHIFT_Y', 0))
cam_d.dof.use_dof = True; cam_d.dof.focus_object = target; cam_d.dof.aperture_fstop = 4.0
cam = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(cam); sc.camera = cam
tc = cam.constraints.new('TRACK_TO'); tc.target = target; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'

def orbit(yaw_deg, dist, height):
    y = math.radians(yaw_deg)
    return Vector((math.sin(y) * dist, -math.cos(y) * dist, height))

if MODE == 'still':
    dist = {'laptop': 0.72, 'phone': 0.36, 'tablet': 0.6}[DEVICE]
    if DEVICE == 'laptop': part.rotation_euler = (math.radians(-14), 0, 0)
    cam.location = orbit(YAW, dist, aim[2] + dist * 0.16)
    sc.render.filepath = OUT
    bpy.ops.render.render(write_still=True)
else:
    sc.frame_start, sc.frame_end = 1, FRAMES
    f_open, f_wake, f_end = int(FRAMES * 0.5), int(FRAMES * 0.42), FRAMES
    # the lid: closed → open (hinge 90° → -14°), the screen wakes as it passes upright
    part.rotation_euler = (math.radians(90), 0, 0); part.keyframe_insert('rotation_euler', frame=1)
    part.rotation_euler = (math.radians(-14), 0, 0); part.keyframe_insert('rotation_euler', frame=f_open)
    emission.inputs['Strength'].default_value = 0.0; emission.inputs['Strength'].keyframe_insert('default_value', frame=int(FRAMES * 0.22))
    emission.inputs['Strength'].default_value = float(os.environ.get('SCREEN_GLOW', 1.45))  # white reads white under AgX
    emission.inputs['Strength'].keyframe_insert('default_value', frame=f_wake)
    cam_d.dof.focus_object = bpy.data.objects.get('screen') or target   # the run log stays sharp as the camera pushes in
    # the camera: a low three-quarter view that rises and comes round to face the screen, then pushes in
    keys = [(1, orbit(-48, 1.25, 0.32)), (f_open, orbit(-24, 1.0, 0.42)), (f_end, orbit(-6, 0.56, 0.24))]
    for f, p in keys:
        cam.location = p; cam.keyframe_insert('location', frame=f)
    target.location = (0, 0.02, 0.07); target.keyframe_insert('location', frame=1)
    target.location = (0, 0.07, 0.13); target.keyframe_insert('location', frame=f_end)
    sc.frame_start = int(os.environ.get('FROM', 1))   # resume an interrupted render (FROM=13)
    sc.render.filepath = OUT + '/f_'
    prev = os.environ.get('PREVIEW')
    if prev:
        for f in [int(x) for x in prev.split(',')]:
            sc.frame_set(f); sc.render.filepath = f'{OUT}/p_{f:03d}.png'; bpy.ops.render.render(write_still=True)
    else:
        bpy.ops.render.render(animation=True)
