# The rendered film (devices.py film) → the site's frame sets, WebP.
#   python3 encode_film.py <desktop_png_dir> <phone_png_dir> <public/film/laptop-vN>
# desktop 2560×1440 → xl/ (as rendered) and hd/ (1920×1080, Lanczos); phone 1080×1920 → m/. Files 001.webp … in frame
# order. Quality 82 (phone 80) with sharp RGB→YUV: above 46 dB PSNR against the render; the dither lossy WebP strips
# from the dark gradients is put back by the player (motion/media.js → sequence, DITHER).
import os, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

desk, phone, out = sys.argv[1:4]
SETS = [("xl", desk, None, 82), ("hd", desk, (1920, 1080), 82), ("m", phone, None, 80)]


def encode(job):
    src, dst, size, q = job
    with tempfile.TemporaryDirectory() as tmp:
        if size:
            mid = os.path.join(tmp, "f.png")
            Image.open(src).convert("RGB").resize(size, Image.LANCZOS).save(mid)
            src = mid
        subprocess.run(["cwebp", "-quiet", "-q", str(q), "-m", "6", "-sharp_yuv", "-metadata", "none", src, "-o", dst], check=True)


jobs = []
for name, folder, size, q in SETS:
    frames = sorted(f for f in os.listdir(folder) if f.endswith(".png"))
    os.makedirs(os.path.join(out, name), exist_ok=True)
    jobs += [(os.path.join(folder, f), os.path.join(out, name, f"{i:03d}.webp"), size, q) for i, f in enumerate(frames, 1)]
with ThreadPoolExecutor(os.cpu_count()) as pool:
    list(pool.map(encode, jobs))
for name, *_ in SETS:
    files = [os.path.join(out, name, f) for f in os.listdir(os.path.join(out, name))]
    total = sum(os.path.getsize(f) for f in files)
    if files: print(f"{name}: {len(files)} frames, {total / 1e6:.1f} MB, {total / len(files) / 1024:.0f} KB a frame")
