// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Si c'est le titre "À propos", afficher le menu
            if (entry.target.tagName === 'H2' && entry.target.textContent === 'A propos de moi') {
                document.querySelector('.side-nav').classList.add('visible');
                document.querySelector('.top-nav').classList.add('hidden');
            }
        } else {
            entry.target.classList.remove('show');
            // Si c'est le titre "À propos" et qu'il sort de la vue par le haut
            if (entry.target.tagName === 'H2' && entry.target.textContent === 'A propos de moi' && entry.boundingClientRect.y < 0) {
                document.querySelector('.side-nav').classList.remove('visible');
                document.querySelector('.top-nav').classList.remove('hidden');
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
const navItems = document.querySelectorAll('.nav-item');

// Navigation item click handling
navItems.forEach(item => {
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
});

// Gestion de la barre de navigation flottante
const floatingNav = document.querySelector('.floating-nav');
const heroSection = document.querySelector('.hero');
let lastScrollY = window.scrollY;

// Fonction pour gérer l'affichage de la barre de navigation
function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Afficher/masquer la barre de navigation
    if (currentScrollY > heroHeight / 2) {
        floatingNav.classList.add('visible');
    } else {
        floatingNav.classList.remove('visible');
    }
    
    // Mettre à jour le dernier défilement
    lastScrollY = currentScrollY;
}

// Gestion du clic sur les liens de la barre de navigation
document.querySelectorAll('.nav-item').forEach(item => {
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
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => observer.observe(element));
    
    // Initialiser la barre de navigation
    handleScroll();
});
