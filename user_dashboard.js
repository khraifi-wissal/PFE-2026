 lucide.createIcons();

        // 1. Navigation globale
        function navTo(viewId) {
            document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
            document.querySelectorAll('#sidebar .nav-link').forEach(l => l.classList.remove('active'));
            
            const viewElement = document.getElementById('view-' + viewId);
            if (viewElement) viewElement.classList.add('active');
            
            document.querySelectorAll('#sidebar .nav-link').forEach(link => {
                const onclickAttr = link.getAttribute('onclick');
                if(onclickAttr && onclickAttr.includes(`navTo('${viewId}')`)) {
                    link.classList.add('active');
                }
            });
            
            const titles = { 
                'started': 'Tableau de bord', 
                'learning': 'Mes Cours & Achats', 
                'calendar': 'Calendrier & Lives', 
                'tutor': 'Tutor IA', 
                'community': 'Communauté', 
                'certificates': 'Mes Certificats', 
                'settings': 'Paramètres Profil' 
            };
            
            if (document.getElementById('view-title')) {
                document.getElementById('view-title').innerText = titles[viewId] || 'Espace Apprenant';
            }
        }
        
        function showCommunityTab(tab) {
            const feed = document.getElementById('community-feed-container');
            const messages = document.getElementById('community-messages-container');
            const tabFeed = document.getElementById('tab-feed');
            const tabMessages = document.getElementById('tab-messages');

            if (tab === 'messages') {
                if(feed) feed.classList.add('d-none');
                if(messages) messages.classList.remove('d-none');
                if(tabMessages) tabMessages.classList.add('active');
                if(tabFeed) tabFeed.classList.remove('active');
            } else {
                if(messages) messages.classList.add('d-none');
                if(feed) feed.classList.remove('d-none');
                if(tabFeed) tabFeed.classList.add('active');
                if(tabMessages) tabMessages.classList.remove('active');
            }
            lucide.createIcons();
        }

        // 2. Navigation Paramètres
        function switchSettingsTab(tabId, btnElement) {
            document.querySelectorAll('.settings-nav-link').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');
            document.querySelectorAll('.settings-content-section').forEach(sec => sec.classList.remove('active'));
            document.getElementById('settings-' + tabId).classList.add('active');
        }

        // JS pour filtrer les cours
        function filterLearning(status, btnElement) {
            const subNavItems = btnElement.closest('.sub-nav').querySelectorAll('.sub-nav-item');
            subNavItems.forEach(item => item.classList.remove('active'));
            btnElement.classList.add('active');

            const cards = document.querySelectorAll('#learning-grid .learning-card');
            cards.forEach(card => {
                if (status === 'all' || card.dataset.status === status) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // 3. Gestion de la salle Live
        function openDyteRoom(roomName) {
            document.getElementById('dyte-room-title').innerText = "Live: " + roomName;
            document.getElementById('dyte-room-overlay').classList.remove('d-none');
        }
        function closeDyteRoom() {
            document.getElementById('dyte-room-overlay').classList.add('d-none');
        }

        // 4. Initialisation de l'éditeur de texte pour la communauté (Style Formateur)
        setTimeout(() => {
            if(document.getElementById('community-editor-container')) {
                var commQuill = new Quill('#community-editor-container', {
                    theme: 'snow',
                    placeholder: 'Partagez quelque chose avec la communauté...',
                    modules: {
                        toolbar: [
                            [{ 'font': [] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['link']
                        ]
                    }
                });
            }
        }, 100);