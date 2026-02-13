import React from 'react';
import './SelectedWork.css';

const projects = [
    {
        id: 1,
        title: 'Digital Horizon',
        category: 'Web Experience',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        year: '2025'
    },
    {
        id: 2,
        title: 'Neon Dreams',
        category: 'Creative Direction',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop',
        year: '2024'
    },
    {
        id: 3,
        title: 'Abstract Logic',
        category: 'Interaction Design',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
        year: '2024'
    }
];

const SelectedWork = () => {
    return (
        <section className="selected-work container">
            <div className="selected-work__header">
                <h2 className="selected-work__title">Selected Work</h2>
                <span className="selected-work__count">({projects.length})</span>
            </div>

            <div className="selected-work__grid">
                {projects.map((project) => (
                    <article key={project.id} className="work-item">
                        <div className="work-item__image-container">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="work-item__image"
                            />
                            <div className="work-item__overlay"></div>
                        </div>
                        <div className="work-item__info">
                            <div className="work-item__meta">
                                <h3 className="work-item__title">{project.title}</h3>
                                <span className="work-item__year">{project.year}</span>
                            </div>
                            <p className="work-item__category">{project.category}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default SelectedWork;
