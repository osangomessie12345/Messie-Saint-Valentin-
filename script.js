        AOS.init();

        // Variable pour vérifier si la section "accueil" est visible
        let heartsVisible = false;

        function createHeart() {
            const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            heart.setAttribute('class', 'heart');
            heart.setAttribute('viewBox', '0 0 24 24');

            // Positionnement aléatoire
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;

            // Vérifier si la position se trouve dans la section #projets
            const projetsSection = document.getElementById('projets');
            const rectProjets = projetsSection.getBoundingClientRect();
            if (posX > rectProjets.left && posX < rectProjets.right && posY > rectProjets.top && posY < rectProjets.bottom) {
                return; // Si la position est dans la section #projets, ne pas créer de cœur
            }

            heart.style.position = 'absolute';
            heart.style.left = `${posX}px`;
            heart.style.top = `${posY}px`;

            // Taille aléatoire
            const size = Math.random() * 30 + 20;
            heart.style.width = `${size}px`;

            // Couleur aléatoire
            heart.style.fill = getRandomColor();

            // Rotation initiale aléatoire
            const rotation = Math.random() * 360;
            heart.style.transform = `rotate(${rotation}deg)`;

            // Direction aléatoire pour l'effet de flottement
            heart.style.setProperty('--dirX', Math.random() > 0.5 ? 1 : -1);
            heart.style.setProperty('--dirY', Math.random() > 0.5 ? 1 : -1);

            // Durée d'animation aléatoire
            const duration = Math.random() * 4 + 3;
            heart.style.animation = `floatHeart ${duration}s ease-in-out infinite, rotateHeart ${duration}s linear infinite`;

            // Contenu SVG du cœur
            heart.innerHTML = `
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            `;

            heart.addEventListener('animationend', () => heart.remove());

            document.getElementById('heartsContainer').appendChild(heart);
        }

        function getRandomColor() {
            return `hsl(${Math.random() * 360}, 70%, 65%)`;
        }

        // Fonction pour détecter la visibilité de la section "accueil"
        function checkVisibility() {
            const accueilSection = document.getElementById('accueil');
            const rect = accueilSection.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                if (!heartsVisible) {
                    // Activer la génération des cœurs uniquement si la section est visible
                    heartsVisible = true;
                    setInterval(() => {
                        createHeart();
                        if (Math.random() > 0.5) createHeart();
                    }, 300);
                }
            }
        }

        // Vérifier la visibilité à chaque défilement
        window.addEventListener('scroll', checkVisibility);
        checkVisibility(); // Vérifie dès le début si la section est visible
