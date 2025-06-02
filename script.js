// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Si c'est le titre "À propos", afficher le menu
            if (entry.target.tagName === 'H2' && entry.target.textContent === 'A propos de moi') {
                document.querySelector('.side-nav').classList.add('visible');
            }
        } else {
            entry.target.classList.remove('show');
            // Si c'est le titre "À propos" et qu'il sort de la vue par le haut
            if (entry.target.tagName === 'H2' && entry.target.textContent === 'A propos de moi' && entry.boundingClientRect.y < 0) {
                document.querySelector('.side-nav').classList.remove('visible');
            }
        }
    });
}, {
    threshold: 0.1
});

// Handle hero name fade out on scroll
const heroContent = document.querySelector('.hero-content');
let lastScrollPosition = window.pageYOffset;
const scrollThreshold = window.innerHeight * 0.3; // 30% of viewport height

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Calculate opacity based on absolute scroll position
    const opacity = Math.max(0, 1 - (Math.abs(currentScroll) / scrollThreshold));
    const translateY = currentScroll > lastScrollPosition 
        ? Math.min(100, currentScroll * 0.5)  // Scrolling down
        : Math.max(-100, -currentScroll * 0.5); // Scrolling up
    
    heroContent.style.opacity = opacity;
    heroContent.style.transform = `translateY(${translateY}px)`;
    
    lastScrollPosition = currentScroll;
});

// Reset hero content when at top of page
window.addEventListener('scrollend', () => {
    if (window.pageYOffset === 0) {
        heroContent.style.opacity = 1;
        heroContent.style.transform = 'translateY(0)';
    }
});

// Navigation menu visibility and interaction
const topNav = document.querySelector('.top-nav');
const sideNav = document.querySelector('.side-nav');
const navItems = document.querySelectorAll('.floating-nav .nav-item, .side-nav .nav-item, .top-nav .nav-item');

// Navigation item click handling
navItems.forEach(item => {
    // Ne pas ajouter d'écouteur d'événements aux liens sociaux
    if (!item.classList.contains('social-link')) {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Gestion de la barre de navigation flottante
const floatingNav = document.querySelector('.floating-nav');
const heroSection = document.querySelector('.hero');
let lastScrollY = window.scrollY;

// Fonction pour gérer l'affichage de la barre de navigation
function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const footer = document.querySelector('.footer');
    const footerTop = footer.offsetTop;
    const windowHeight = window.innerHeight;
    
    // Afficher/masquer la barre de navigation
    if (currentScrollY > heroHeight / 2) {
        // Vérifier si on est proche du footer
        if (currentScrollY + windowHeight > footerTop - 100) {
            floatingNav.classList.remove('visible');
        } else {
            floatingNav.classList.add('visible');
        }
    } else {
        floatingNav.classList.remove('visible');
    }
    
    // Mettre à jour le dernier défilement
    lastScrollY = currentScrollY;
}

// Gestion du clic sur les liens de la barre de navigation
document.querySelectorAll('.floating-nav .nav-item, .side-nav .nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Supprimer la classe active de tous les éléments
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.classList.remove('active');
        });
        
        // Ajouter la classe active à l'élément cliqué
        e.currentTarget.classList.add('active');
    });
});

// Observer les sections pour mettre en surbrillance l'élément actif
const sections = document.querySelectorAll('section[id]');

function highlightNavItem() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
}

// Écouteurs d'événements
window.addEventListener('scroll', () => {
    handleScroll();
    highlightNavItem();
});

// Observer tous les éléments avec la classe fade-in
// Données des projets
const projectsData = {
    capgemini: {
        title: 'Site Capgemini',
        description: 'Site internet pour Capgemini à destination des élèves de troisième pour la recherche de stage.',
        competences: ['Développement web front-end', 'Intégration web', 'Travail en équipe', 'Gestion de projet'],
        objectifs: [
            'Créer une interface intuitive pour les élèves de 3ème',
            'Faciliter la recherche et candidature aux stages',
            'Respecter la charte graphique Capgemini'
        ],
        travailGroupe: [
            'Répartition des tâches en équipe de 3',
            'Réunions hebdomadaires de suivi',
            'Revues de code collaboratives'
        ],
        travailIndividuel: [
            'Développement de la page d’accueil',
            'Intégration du formulaire de candidature'
        ],
        techniquesSavoirFaire: [
            'Maîtrise des standards HTML5/CSS3',
            'Utilisation de Git pour la collaboration',
            'Tests cross-navigateurs'
        ],
        technologies: ['HTML', 'CSS'],
        githubLink: 'https://github.com/Erwann1708/SAE-Capgemini'
    },
    portfolio: {
        title: 'Portfolio Personnel',
        description: 'Site web portfolio moderne et interactif présentant mes projets et compétences.',
        competences: ['Développement front-end avancé', 'Design UI/UX'],
        objectifs: [
            'Créer une vitrine professionnelle attractive',
            'Démontrer mes compétences techniques',
            'Faciliter le contact avec les recruteurs'
        ],
        travailIndividuel: [
            'Conception et design de l’interface',
            'Développement full-stack',
            'Déploiement et maintenance'
        ],
        techniquesSavoirFaire: [
            'Architecture modulaire et maintenable',
            'Animations fluides et optimisées',
            'Intégration de bibliothèques tierces',
            'Responsive design avancé'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Swiper.js'],
        githubLink: 'https://github.com/Erwann1708/Portfolio'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));
    
    // Initialiser la barre de navigation
    handleScroll();

    // Gestion des modales de projet
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');

    // Fermer la modale quand on clique sur le X
    closeModal.onclick = () => modal.style.display = 'none';

    // Fermer la modale quand on clique en dehors
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    function showProjectDetails(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        const modalContent = document.getElementById('modalContent');
        let html = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            
            <div class="modal-section">
                <h3>Compétences :</h3>
                <ul>
                    ${project.competences.map(comp => `<li>${comp}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Objectifs :</h3>
                <ul>
                    ${project.objectifs.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
        `;

        // Section travail en groupe (optionnelle)
        if (project.travailGroupe) {
            html += `
                <div class="modal-section">
                    <h3>Travail en groupe :</h3>
                    <ul>
                        ${project.travailGroupe.map(tg => `<li>${tg}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        html += `
            <div class="modal-section">
                <h3>Travail individuel :</h3>
                <ul>
                    ${project.travailIndividuel.map(ti => `<li>${ti}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Techniques et savoir-faire acquis :</h3>
                <ul>
                    ${project.techniquesSavoirFaire.map(tsf => `<li>${tsf}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3>Technologies utilisées :</h3>
                <ul>
                    ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                </ul>
            </div>
            ${projectId !== 'portfolio' ? `
                <div class="modal-links">
                    <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>
                </div>
            ` : ''}
        `;

        modalContent.innerHTML = html;
        modal.style.display = 'block';
    }

    // Ouvrir la modale quand on clique sur un projet
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            showProjectDetails(projectId);
            // Cacher le menu flottant quand la modale est ouverte
            floatingNav.classList.remove('visible');
        });
    });

    // Réactiver le menu flottant quand on ferme la modale
    closeModal.addEventListener('click', () => {
        handleScroll();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            handleScroll();
        }
    });

    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };

            // Envoyer le message par email
            const mailtoLink = `mailto:deshayesmenuterwann@gmail.com?subject=Message de ${formData.name}&body=${encodeURIComponent(formData.message)}\nEmail: ${formData.email}`;
            window.location.href = mailtoLink;

            // Réinitialiser le formulaire
            contactForm.reset();
            alert('Merci pour votre message ! Votre application de messagerie va s\'ouvrir.');
        });
    }
});
