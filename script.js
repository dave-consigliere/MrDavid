// Obtenir tous les liens des projets
const projectLinks = document.querySelectorAll('.project-link');
const projectDetailsSection = document.getElementById('project-details');
const closeModalButton = document.getElementById('close-modal');

  
  // Ajouter les technologies et fonctionnalités
  const technologiesList = document.getElementById('project-technologies');
  technologiesList.innerHTML = ''; // Vider la liste avant de la remplir
  project.technologies.forEach(tech => {
    const li = document.createElement('li');
    li.textContent = tech;
    technologiesList.appendChild(li);
  });
  
  const featuresList = document.getElementById('project-features');
  featuresList.innerHTML = ''; // Vider la liste avant de la remplir
  project.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });


// Ajouter des événements de clic à chaque lien de projet
projectLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Empêcher le lien de se comporter normalement
    const projectKey = link.getAttribute('data-project');
    openProjectDetails(projectKey);
  });
});

// Simple scroll to top functionality
const scrollButton = document.getElementById('scrollToTop');
if (scrollButton) {
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log('Form submitted with data:', Object.fromEntries(formData));
            contactForm.reset();
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Message envoyé avec succès!';
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        });
    }

    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
                mainMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.removeAttribute('aria-current');
                });
                if (navLink) {
                    navLink.setAttribute('aria-current', 'page');
                }
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL without scrolling
                history.pushState(null, '', this.getAttribute('href'));
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add success message styles if not already in CSS
    if (!document.querySelector('style#form-styles')) {
        const style = document.createElement('style');
        style.id = 'form-styles';
        style.textContent = `
            .success-message {
                background-color: #d4edda;
                color: #155724;
                padding: 15px;
                margin-top: 20px;
                border-radius: 8px;
                text-align: center;
                animation: fadeIn 0.5s ease;
            }

            @media (prefers-color-scheme: dark) {
                .success-message {
                    background-color: #1e3a29;
                    color: #28a745;
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
});
