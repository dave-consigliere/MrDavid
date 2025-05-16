document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments de navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    // Vérifier si les éléments existent
    if (!menuToggle || !mainMenu) {
        console.error('Éléments de navigation non trouvés');
        return;
    }

    // Fonction pour fermer le menu
    function closeMenu() {
        mainMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Fonction pour ouvrir le menu
    function openMenu() {
        mainMenu.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
    }

    // Fonction pour basculer le menu
    function toggleMenu(e) {
        e.stopPropagation();
        if (mainMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // S'assurer que le menu est fermé par défaut
    closeMenu();

    // Gestionnaire de clic pour le bouton du menu
    menuToggle.addEventListener('click', toggleMenu);

    // Fermer le menu lors du clic sur un lien
    mainMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Fermer le menu lors du défilement
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(scrollTop - lastScrollTop) > 10 && mainMenu.classList.contains('active')) {
            closeMenu();
        }
        lastScrollTop = scrollTop;
    });

    // Fermer le menu lors du redimensionnement
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}); 