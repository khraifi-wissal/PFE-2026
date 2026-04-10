 // ROUTER & LOGIQUE DE NAVIGATION SINGLE PAGE
        const navLinksList = Array.from(document.querySelectorAll('.docs-nav-link'));
        const pagesList = document.querySelectorAll('.doc-page');
        let currentIndex = 0;

        // Fonction principale de changement de page
        function openDocPage(targetId) {
            // 1. Cacher toutes les pages et enlever l'état actif des liens
            pagesList.forEach(p => p.classList.remove('active'));
            navLinksList.forEach(l => l.classList.remove('active'));

            // 2. Afficher la nouvelle page
            const targetPage = document.getElementById(targetId);
            const targetLink = document.querySelector(`.docs-nav-link[data-target="${targetId}"]`);
            
            if (targetPage && targetLink) {
                targetPage.classList.add('active');
                targetLink.classList.add('active');
                currentIndex = navLinksList.indexOf(targetLink);

                // 3. Mettre à jour le Breadcrumb (Fil d'ariane)
                const category = targetLink.closest('.docs-nav-group').querySelector('.docs-nav-title').innerText;
                document.getElementById('bc-category').innerText = category;
                document.getElementById('bc-page').innerText = targetLink.innerText;

                // 4. Mettre à jour la Table des matières (TOC)
                generateTOC(targetPage);

                // 5. Mettre à jour la Pagination
                updatePagination();

                // 6. Remonter en haut de la page
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Ajout des Event Listeners sur les liens de la barre latérale
        navLinksList.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openDocPage(link.getAttribute('data-target'));
            });
        });

        // Générer le Sommaire (TOC) basé sur les balises <h2> de la page active
        function generateTOC(page) {
            const tocContainer = document.getElementById('dynamic-toc');
            tocContainer.innerHTML = '';
            const h2s = page.querySelectorAll('h2[id]');
            
            h2s.forEach((h2, index) => {
                const li = document.createElement('li');
                // Le premier lien est actif par défaut
                li.innerHTML = `<a href="#${h2.id}" class="toc-link ${index === 0 ? 'active' : ''}">${h2.innerText}</a>`;
                tocContainer.appendChild(li);
            });

            bindScrollSpy();
        }

        // Gérer les boutons Suivant/Précédent
        function updatePagination() {
            const btnPrev = document.getElementById('btn-prev');
            const btnNext = document.getElementById('btn-next');
            
            if (currentIndex > 0) {
                btnPrev.style.display = 'flex';
                document.getElementById('title-prev').innerText = navLinksList[currentIndex - 1].innerText;
            } else {
                btnPrev.style.display = 'none';
            }

            if (currentIndex < navLinksList.length - 1) {
                btnNext.style.display = 'flex';
                document.getElementById('title-next').innerText = navLinksList[currentIndex + 1].innerText;
            } else {
                btnNext.style.display = 'none';
            }
        }

        function navPagination(direction) {
            const newIndex = currentIndex + direction;
            if(newIndex >= 0 && newIndex < navLinksList.length) {
                openDocPage(navLinksList[newIndex].getAttribute('data-target'));
            }
        }

        // ScrollSpy pour mettre à jour le sommaire au scroll
        function bindScrollSpy() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.toc-link').forEach(link => {
                            link.classList.remove('active');
                            if(link.getAttribute('href').substring(1) === entry.target.id) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { rootMargin: '-100px 0px -66% 0px' });

            document.querySelectorAll('.doc-page.active h2[id]').forEach(h2 => observer.observe(h2));
        }

        // Gestion du clic fluide sur les liens du TOC
        document.getElementById('dynamic-toc').addEventListener('click', function(e) {
            if(e.target.tagName === 'A') {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if(targetElement) {
                    const y = targetElement.getBoundingClientRect().top + window.scrollY - 100; // offset nav
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
            }
        });

        // Initialisation de la première page au chargement
        openDocPage('doc-intro');