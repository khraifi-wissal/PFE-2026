lucide.createIcons();

        function navTo(viewId) {
            document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
            document.querySelectorAll('#sidebar .nav-link').forEach(l => l.classList.remove('active'));
            
            if(viewId !== 'editor') { document.getElementById('preview-panel').classList.remove('open'); }
            
            const viewElement = document.getElementById('view-' + viewId);
            if (viewElement) viewElement.classList.add('active');
            
            document.querySelectorAll('#sidebar .nav-link').forEach(link => {
                const onclickAttr = link.getAttribute('onclick');
                if(onclickAttr && (onclickAttr.includes(`navTo('${viewId}')`) || onclickAttr.includes(`openEditor('${viewId}')`))) {
                    link.classList.add('active');
                }
            });
            
            const titles = { 'started': 'Tableau de bord', 'sessions': 'Événements', 'community': 'Communauté', 'products': 'Produits', 'marketing': 'Email Marketing', 'checkouts': 'Transactions', 'payouts': 'Paiements', 'editor': 'Création', 'mentor': 'Mentor IA', 'analytics': 'Analytiques', 'settings': 'Paramètres' };
            
            if (document.getElementById('view-title')) {
                document.getElementById('view-title').innerText = titles[viewId] || 'Workspace';
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

        function switchSettingsTab(tabId, btnElement) {
            document.querySelectorAll('.settings-nav-link').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');
            document.querySelectorAll('.settings-content-section').forEach(sec => sec.classList.remove('active'));
            document.getElementById('settings-' + tabId).classList.add('active');
        }

        function openDyteRoom(roomName) {
            document.getElementById('dyte-room-title').innerText = "Live: " + roomName;
            document.getElementById('dyte-room-overlay').classList.remove('d-none');
        }
        function closeDyteRoom() {
            document.getElementById('dyte-room-overlay').classList.add('d-none');
        }

        function togglePreview() {
            const panel = document.getElementById('preview-panel');
            panel.classList.toggle('open');
            updatePreview();
        }

        function updatePreview() {
            let title = '';
            let desc = '';
            
            // Logique de récupération dynamique selon le type de produit
            if (currentProductMode === 'course') {
                title = document.getElementById('course-name-input').value;
                const descInput = document.querySelector('#dynamic-descriptions textarea');
                desc = descInput ? descInput.value : '';
            } else {
                title = document.getElementById('standard-name-input').value;
                desc = document.getElementById('standard-desc-input').value;
            }
            
            document.getElementById('live-preview-title').innerText = title || 'Produit sans titre';
            document.getElementById('live-preview-desc').innerText = desc || 'Commencez à taper dans la description pour voir votre page produit se mettre à jour en direct.';
            
            let displayPrice = "Gratuit";
            if (currentPricingType === 'onetime') {
                const val = document.getElementById('product-price-input').value;
                displayPrice = val ? '$' + val : 'Gratuit';
            } else if (currentPricingType === 'subscription') {
                const tierVal = document.querySelector('.tier-price-val') ? document.querySelector('.tier-price-val').value : '';
                const tierInt = document.querySelector('.tier-interval-val') ? (document.querySelector('.tier-interval-val').value === 'Mensuel' ? '/mo' : '/an') : '/mo';
                displayPrice = tierVal ? '$' + tierVal + tierInt : 'Gratuit';
            } else {
                displayPrice = "Gratuit";
            }
            document.getElementById('live-preview-price').innerText = displayPrice;
        }

        let currentProductMode = 'product'; 
        let currentPricingType = 'onetime';

        function openEditor(type) {
            currentProductMode = type;
            navTo('editor'); 
            
            let typeName = 'Création';
            if (type === 'course') typeName = 'Nouveau Cours';
            if (type === 'digital') typeName = 'Nouveau Produit Digital';
            if (type === 'event') typeName = 'Nouvel Événement';
            if (type === 'coaching') typeName = 'Session Coaching';
            
            document.getElementById('breadcrumb-type').innerText = typeName;

            // Masquer tout le contenu spécifique par défaut
            document.getElementById('view-course-content').classList.add('d-none');
            document.getElementById('view-digital-content').classList.add('d-none');
            document.getElementById('view-coaching-content').classList.add('d-none');
            document.getElementById('view-event-content').classList.add('d-none');
            document.getElementById('content-separator').classList.add('d-none');
            
            document.getElementById('default-settings-block').classList.add('d-none');
            document.getElementById('event-promo-settings').classList.add('d-none');
            document.getElementById('course-settings-extra').classList.add('d-none');
            document.getElementById('digital-settings-extra').classList.add('d-none');
            document.getElementById('event-settings-extra').classList.add('d-none');
            
            // Masquer et afficher les bons blocs dans l'étape 1 "Infos"
            document.getElementById('standard-basics').classList.add('d-none');
            document.getElementById('course-specific-basics').classList.add('d-none');

            const rightCol = document.getElementById('visual-assets-col');
            const salesVideoBlock = document.getElementById('sales-video-block');
            const basicsTabLabel = document.getElementById('basics-tab-label');
            const contentTabLabel = document.getElementById('content-tab-label');
            const subOption = document.getElementById('subscription-option-card');
            const settingsTabBtn = document.getElementById('tab-btn-settings');
            const settingsDivider = document.getElementById('divider-settings');
            const pricingSeoBlock = document.getElementById('pricing-seo-block');
            const settingsSeoBlock = document.getElementById('settings-seo-block');
            
            const strategyTabBtn = document.getElementById('tab-btn-strategy');
            const strategyDivider = document.getElementById('divider-strategy');

            // Reset visibilities for extra course tabs
            strategyTabBtn.classList.add('d-none');
            strategyDivider.classList.add('d-none');
            
            // Default step numbering reset
            document.getElementById('circle-content').innerText = "2";
            document.getElementById('circle-pricing').innerText = "3";
            document.getElementById('circle-settings').innerText = "4";

            settingsTabBtn.classList.add('d-none');
            settingsDivider.classList.add('d-none');
            pricingSeoBlock.classList.remove('d-none'); 
            settingsSeoBlock.classList.add('d-none');

            if(type === 'course') {
                document.getElementById('course-specific-basics').classList.remove('d-none'); // Affiche le format Udemy
                
                settingsTabBtn.classList.remove('d-none'); 
                settingsDivider.classList.remove('d-none');
                pricingSeoBlock.classList.add('d-none'); 
                settingsSeoBlock.classList.remove('d-none');
                
                strategyTabBtn.classList.remove('d-none');
                strategyDivider.classList.remove('d-none');
                
                document.getElementById('circle-content').innerText = "3";
                document.getElementById('circle-pricing').innerText = "4";
                document.getElementById('circle-settings').innerText = "5";

                basicsTabLabel.innerText = "Infos Cours";
                contentTabLabel.innerText = "Programme";
                document.getElementById('dynamic-basics-title').innerText = "Informations du Cours";
                
                rightCol.classList.remove('d-none');
                salesVideoBlock.classList.remove('d-none');
                document.querySelector('.basics-grid').style.gridTemplateColumns = "1.6fr 1fr";
                
                document.getElementById('view-course-content').classList.remove('d-none');
                
                document.getElementById('default-settings-block').classList.remove('d-none');
                document.getElementById('course-settings-extra').classList.remove('d-none'); 
                subOption.classList.remove('d-none'); 
                selectPricing(document.querySelectorAll('.pricing-card')[0], 'onetime');
                
            } else if (type === 'digital') {
                document.getElementById('standard-basics').classList.remove('d-none'); // Format simple
                
                basicsTabLabel.innerText = "Infos Produit";
                contentTabLabel.innerText = "Fichiers";
                document.getElementById('dynamic-basics-title').innerText = "Informations du Produit Digital";
                
                rightCol.classList.remove('d-none');
                salesVideoBlock.classList.add('d-none'); 
                document.querySelector('.basics-grid').style.gridTemplateColumns = "1.6fr 1fr";
                
                document.getElementById('view-digital-content').classList.remove('d-none');
                
                document.getElementById('default-settings-block').classList.remove('d-none');
                document.getElementById('digital-settings-extra').classList.remove('d-none');
                subOption.classList.add('d-none'); 
                selectPricing(document.querySelectorAll('.pricing-card')[0], 'onetime');
                
            } else if (type === 'coaching') {
                document.getElementById('standard-basics').classList.remove('d-none'); // Format simple
                
                basicsTabLabel.innerText = "Infos Coaching";
                contentTabLabel.innerText = "Disponibilités";
                document.getElementById('dynamic-basics-title').innerText = "Informations du Coaching";
                rightCol.classList.add('d-none'); 
                document.querySelector('.basics-grid').style.gridTemplateColumns = "1fr";
                
                document.getElementById('view-coaching-content').classList.remove('d-none');
                subOption.classList.add('d-none'); 
                selectPricing(document.querySelectorAll('.pricing-card')[0], 'onetime');
                
            } else if (type === 'event') {
                document.getElementById('standard-basics').classList.remove('d-none'); // Format simple
                
                basicsTabLabel.innerText = "Infos Événement";
                contentTabLabel.innerText = "Planification";
                document.getElementById('dynamic-basics-title').innerText = "Détails de l'Événement";
                rightCol.classList.remove('d-none');
                salesVideoBlock.classList.add('d-none'); 
                document.querySelector('.basics-grid').style.gridTemplateColumns = "1.6fr 1fr";

                document.getElementById('view-event-content').classList.remove('d-none');
                
                document.getElementById('default-settings-block').classList.remove('d-none');
                document.getElementById('event-settings-extra').classList.remove('d-none');
                subOption.classList.add('d-none'); 
                selectPricing(document.querySelectorAll('.pricing-card')[2], 'free');
            }

            document.querySelectorAll('.step-item')[0].click(); 
        }

        function switchEditorTab(tabId, btnElement) {
            document.querySelectorAll('.step-item').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');
            document.querySelectorAll('.editor-section').forEach(sec => sec.classList.remove('active'));
            document.getElementById('tab-' + tabId).classList.add('active');
        }

        function nextEditorStep() {
            const ids = ['tab-btn-basics', 'tab-btn-strategy', 'tab-btn-content', 'tab-btn-pricing', 'tab-btn-settings'];
            const visibleTabs = ids.map(id => document.getElementById(id)).filter(el => el && !el.classList.contains('d-none'));
            const activeIndex = visibleTabs.findIndex(el => el.classList.contains('active'));
            if(activeIndex >= 0 && activeIndex < visibleTabs.length - 1) {
                visibleTabs[activeIndex + 1].click();
            } else if (activeIndex === visibleTabs.length - 1) {
                publishProduct();
            }
        }

        function prevEditorStep() {
            const ids = ['tab-btn-basics', 'tab-btn-strategy', 'tab-btn-content', 'tab-btn-pricing', 'tab-btn-settings'];
            const visibleTabs = ids.map(id => document.getElementById(id)).filter(el => el && !el.classList.contains('d-none'));
            const activeIndex = visibleTabs.findIndex(el => el.classList.contains('active'));
            if(activeIndex > 0) {
                visibleTabs[activeIndex - 1].click();
            }
        }

        let chapterCount = 1;
        function addChapter() {
            chapterCount++;
            const container = document.getElementById('curriculum-container');
            const html = `
            <div class="chapter-card border-0 mt-3" style="border-radius: 6px;">
                <div class="chapter-header" style="border-radius: 6px 6px 0 0;">
                    <div class="d-flex align-items-center gap-2 text-dark"><i data-lucide="folder" size="18" class="text-primary"></i> Chapitre ${chapterCount}</div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-light border bg-white p-1 text-muted" style="border-radius: 6px;"><i data-lucide="edit-2" size="14"></i></button>
                        <button class="btn btn-sm btn-light border bg-white p-1 text-danger" style="border-radius: 6px;" onclick="this.closest('.chapter-card').remove()"><i data-lucide="trash" size="14"></i></button>
                    </div>
                </div>
                <div class="p-3 bg-white" style="border-radius: 0 0 6px 6px;">
                    <div class="modules-container"></div>
                    <button class="btn btn-sm btn-light bg-white w-100 mt-2 fw-800 py-2 text-muted" style="border: 2px dashed #cbd5e1; border-radius: 6px;" onclick="addModule(this, ${chapterCount})">+ Ajouter une leçon</button>
                </div>
            </div>`;
            container.insertAdjacentHTML('beforeend', html);
            lucide.createIcons();
        }

        function addModule(btn, chapIndex) {
            const container = btn.previousElementSibling;
            const modCount = container.children.length + 1;
            const html = `
            <div class="module-card border-0 shadow-none mb-3" style="border: 1px solid #e2e8f0 !important; border-radius: 6px;">
                <div class="module-header bg-light" style="border-radius: 6px 6px 0 0;">
                    <div class="d-flex align-items-center gap-2 text-dark"><i data-lucide="layers" size="16" class="text-muted"></i> <span>Leçon ${chapIndex}.${modCount}</span></div>
                    <button class="btn btn-sm btn-light border-0 bg-transparent p-1 text-danger" onclick="this.closest('.module-card').remove()"><i data-lucide="trash" size="14"></i></button>
                </div>
                <div class="lessons-list"></div>
                <div class="p-3 text-center bg-white border-top dropdown w-100" style="border-radius: 0 0 6px 6px;">
                    <button class="btn btn-sm btn-light bg-white fw-800 text-primary w-100 py-2" data-bs-toggle="dropdown" style="border: 2px dashed #cbd5e1; border-radius: 6px;">+ Ajouter du Contenu</button>
                    <ul class="dropdown-menu w-100 shadow-lg border-0 mt-1 p-2 text-start" style="border-radius: 6px;">
                        <li><a class="dropdown-item py-2 fw-700" href="#" onclick="addContent(event, this, 'video')"><i data-lucide="play-circle" size="16" class="me-2 text-primary"></i> Vidéo pré-enregistrée / Texte</a></li>
                        <li><a class="dropdown-item py-2 fw-700" href="#" onclick="addContent(event, this, 'live')"><i data-lucide="radio" size="16" class="me-2 text-danger"></i> Session Live (Salle Dyte native)</a></li>
                    </ul>
                </div>
            </div>`;
            container.insertAdjacentHTML('beforeend', html);
            lucide.createIcons();
        }

        let activeListForUpload = null;

        function addContent(e, linkEl, type) {
            e.preventDefault();
            const list = linkEl.closest('.dropdown').previousElementSibling;
            
            if (type === 'video') {
                activeListForUpload = list;
                document.getElementById('video-tester-input').click();
            } else {
                const count = list.children.length + 1;
                let icon = 'radio';
                let color = 'text-danger';
                let title = 'Nouvelle session Live';
                let badge = '<span class="badge bg-danger-subtle text-danger fw-800" style="font-size:10px; border-radius:6px;">LIVE</span>';
                
                const html = `
                <div class="lesson-item" style="padding: 0.75rem 1rem 0.75rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
                    <div class="d-flex align-items-center gap-2 fw-600"><i data-lucide="${icon}" size="16" class="${color}"></i> <span>${count}. ${title}</span></div>
                    <div class="d-flex align-items-center gap-3">
                        ${badge}
                        <button class="btn btn-sm btn-light bg-transparent border-0 p-1 text-danger" onclick="this.closest('.lesson-item').remove()"><i data-lucide="trash" size="14"></i></button>
                    </div>
                </div>`;
                list.insertAdjacentHTML('beforeend', html);
                lucide.createIcons();
            }
        }

        function handleVideoSelection(input) {
            if (input.files && input.files[0] && activeListForUpload) {
                const fileName = input.files[0].name;
                const count = activeListForUpload.children.length + 1;
                
                const html = `
                <div class="lesson-item" style="padding: 0.75rem 1rem 0.75rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #fafafa;">
                    <div class="d-flex align-items-center gap-2 fw-600"><i data-lucide="play-circle" size="16" class="text-primary"></i> <span>${count}. ${fileName}</span></div>
                    <div class="d-flex align-items-center gap-3">
                        <span class="access-badge preview" style="border-radius:6px;">Vidéo Uploadée</span>
                        <button class="btn btn-sm btn-light bg-transparent border-0 p-1 text-danger" onclick="this.closest('.lesson-item').remove()"><i data-lucide="trash" size="14"></i></button>
                    </div>
                </div>`;
                
                activeListForUpload.insertAdjacentHTML('beforeend', html);
                lucide.createIcons();
                
                input.value = ''; 
                activeListForUpload = null;
            }
        }

        function selectCourseFormat(element, format) {
            document.querySelectorAll('#course-settings-extra .format-card').forEach(card => card.classList.remove('active'));
            element.classList.add('active');
        }

        function selectEventFormat(element, format) {
            document.querySelectorAll('#view-event-content .format-card').forEach(card => card.classList.remove('active'));
            element.classList.add('active');
            if(format === 'online') {
                document.getElementById('event-online-info').classList.remove('d-none');
                document.getElementById('event-inperson-info').classList.add('d-none');
            } else {
                document.getElementById('event-online-info').classList.add('d-none');
                document.getElementById('event-inperson-info').classList.remove('d-none');
            }
        }

        function selectPricing(element, type) {
            currentPricingType = type;
            document.querySelectorAll('.pricing-card').forEach(card => {
                card.classList.remove('active');
                card.querySelector('.ms-auto').innerHTML = '<div class="border p-1" style="width:16px;height:16px; border-radius:6px;"></div>';
            });
            element.classList.add('active');
            element.querySelector('.ms-auto').innerHTML = '<div class="border border-primary p-1" style="border-radius:6px;"><div class="bg-primary" style="width:8px;height:8px; border-radius:6px;"></div></div>';
            
            document.getElementById('pricing-details-area').classList.toggle('d-none', type === 'free');
            document.getElementById('single-price-area').classList.toggle('d-none', type !== 'onetime');
            document.getElementById('multi-tier-area').classList.toggle('d-none', type !== 'subscription');
            updatePreview();
        }

        function addTier() {
            const wrapper = document.getElementById('tiers-wrapper');
            if(wrapper.querySelectorAll('.tier-box').length >= 3) return;
            const newTier = document.createElement('div');
            newTier.className = 'tier-box bg-white p-3 border-0 position-relative shadow-sm mt-3';
            newTier.style.borderRadius = "6px";
            newTier.innerHTML = `<button class="btn btn-sm btn-light bg-white border-0 text-danger position-absolute top-0 end-0 mt-2 me-2 p-1" style="border-radius:6px;" onclick="this.closest('.tier-box').remove(); checkTierCount(); updatePreview();"><i data-lucide="x" size="14"></i></button><div class="row g-3"><div class="col-md-5"><label>PLAN NAME</label><input type="text" class="form-control fw-bold" placeholder="e.g. VIP"></div><div class="col-md-3"><label>PRIX</label><div class="input-group"><span class="input-group-text bg-light border-end-0 fw-800">$</span><input type="number" class="form-control border-start-0 fw-800 text-primary" class="tier-price-val" placeholder="99" oninput="updatePreview()"></div></div><div class="col-md-4"><label>FRÉQUENCE</label><select class="form-select fw-bold tier-interval-val" onchange="updatePreview()"><option>Mensuel</option><option>Annuel</option></select></div></div>`;
            wrapper.appendChild(newTier);
            lucide.createIcons();
            checkTierCount();
        }

        function checkTierCount() {
            const count = document.getElementById('tiers-wrapper').querySelectorAll('.tier-box').length;
            document.getElementById('btn-add-tier').style.display = count >= 3 ? 'none' : 'inline-block';
        }

        function filterProducts(type, btnElement) {
            const subNavItems = btnElement.closest('.sub-nav').querySelectorAll('.sub-nav-item');
            subNavItems.forEach(item => item.classList.remove('active'));
            btnElement.classList.add('active');

            const products = document.querySelectorAll('#products-grid .product-card');
            products.forEach(product => {
                if (type === 'all' || product.dataset.type === type) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        function publishProduct() {
            let name = "Produit sans titre";
            if (currentProductMode === 'course') {
                name = document.getElementById('course-name-input').value || name;
            } else {
                name = document.getElementById('standard-name-input').value || name;
            }
            
            if(currentProductMode === 'event' || currentProductMode === 'coaching') {
                if(currentProductMode === 'event') { navTo('sessions'); alert("Événement programmé !"); }
                else { navTo('sessions'); alert("Session de Coaching disponible !"); }
            } else {
                let displayPrice = document.getElementById('live-preview-price').innerText;
                const icon = currentProductMode === 'course' ? 'book-open' : 'file-archive';
                const badge = currentProductMode === 'course' ? 'COURS' : 'DIGITAL';
                
                const card = `<div class="col-md-4 product-card" data-type="${currentProductMode}"><div class="neo-card p-0 overflow-hidden border-0 h-100 d-flex flex-column"><div class="course-card-cover d-flex justify-content-center align-items-center" style="background-image: url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80');"><div class="position-absolute top-0 start-0 p-3 d-flex gap-2"><span class="badge bg-dark text-white fw-800">${badge}</span></div><div class="position-absolute top-0 end-0 p-3"><span class="badge bg-success text-white fw-800">Publié</span></div></div><div class="p-4 d-flex flex-column flex-grow-1"><h6 class="fw-900 text-dark mb-4 fs-6">${name}</h6><div class="mt-auto"><div class="course-card-stats"><span class="text-success fw-900 fs-5">${displayPrice}</span><button class="btn btn-sm btn-light border bg-white p-1 text-muted ms-auto" style="border-radius:6px;"><i data-lucide="edit-2" size="14"></i></button></div></div></div></div></div>`;
                document.getElementById('products-grid').insertAdjacentHTML('afterbegin', card);
                lucide.createIcons();
                navTo('products');
                
                filterProducts('all', document.querySelector('#view-products .sub-nav-item'));
                alert(badge + " Publié !");
            }
        }

        // Feature 2: Toggle Schedule Inputs
        function toggleEmailSchedule(show) {
            const inputs = document.getElementById('schedule-inputs');
            if (show) {
                inputs.classList.remove('d-none');
            } else {
                inputs.classList.add('d-none');
            }
        }

        // Feature 3: Load Templates
        function loadEmailTemplate(type) {
            if(!window.emailQuill) return;
            let html = '';
            let subject = '';
            if (type === 'launch') {
                subject = "🚀 Mon nouveau cours est en ligne !";
                html = "<h4>Bonjour !</h4><p>Je suis très heureux de vous annoncer que mon nouveau cours est enfin disponible.</p><p>Dans ce cours, nous allons voir :</p><ul><li>Point 1</li><li>Point 2</li></ul><p>Cliquez sur le lien ci-dessous pour le découvrir :</p><p><a href='#'>Découvrir le cours</a></p><p>À très vite !</p>";
            } else if (type === 'discount') {
                subject = "⏳ -20% sur ma formation (48h seulement)";
                html = "<h4>Une offre spéciale pour vous,</h4><p>Pour vous remercier de votre fidélité, je vous offre 20% de réduction sur ma formation phare pendant les prochaines 48 heures.</p><p>Utilisez le code <strong>SUPER20</strong> lors du paiement.</p><p>À bientôt !</p>";
            } else if (type === 'newsletter') {
                subject = "📰 Les nouveautés de la semaine !";
                html = "<h4>Voici ce que vous avez manqué cette semaine :</h4><p>1. Nouvelle ressource ajoutée au chapitre 3.</p><p>2. Prochaine session live prévue ce jeudi.</p><p>N'hésitez pas à poser vos questions dans la communauté !</p>";
            }
            
            document.getElementById('email-subject').value = subject;
            document.getElementById('preview-subject').innerText = subject;
            window.emailQuill.clipboard.dangerouslyPasteHTML(html);
        }

        // Feature 4: AI Subject Line
        function generateAISubject() {
            const subjects = [
                "🔥 Vous ne voulez pas rater ça...",
                "💡 3 astuces pour booster vos résultats aujourd'hui",
                "🚀 C'est enfin là ! Découvrez ma nouveauté",
                "⏳ Plus que quelques heures pour en profiter...",
                "👋 J'ai une question importante pour vous",
                "🎁 Une petite surprise vous attend à l'intérieur"
            ];
            const randomSubj = subjects[Math.floor(Math.random() * subjects.length)];
            const subjInput = document.getElementById('email-subject');
            subjInput.value = randomSubj;
            document.getElementById('preview-subject').innerText = randomSubj;
        }

        setTimeout(() => {
            if(document.getElementById('email-editor-container')) {
                window.emailQuill = new Quill('#email-editor-container', { theme: 'snow', placeholder: 'Tapez votre message ici...', modules: { toolbar: [ [{ 'header': [1, 2, false] }], ['bold', 'italic', 'underline', 'strike'], ['link', 'image'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], ['clean'] ] } });
                
                document.getElementById('email-subject').addEventListener('input', function(e) { document.getElementById('preview-subject').innerText = e.target.value || 'Sujet de l\'email'; });
                
                window.emailQuill.on('text-change', function() {
                    var htmlContent = window.emailQuill.root.innerHTML;
                    document.getElementById('preview-body').innerHTML = window.emailQuill.getText().trim() === '' ? '<p class="text-muted fw-medium">Aperçu en direct...</p>' : htmlContent;
                    document.getElementById('email-body-html').value = htmlContent;
                });
            }

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

        function sendSimpleEmail() { alert("Email programmé/envoyé avec succès !"); }

        // AJOUT POUR LES CHAMPS DYNAMIQUES DU COURS
        function addDynamicField(containerId, type, placeholder) {
            const container = document.getElementById(containerId);
            const div = document.createElement('div');
            div.className = 'd-flex gap-2 mb-2 dynamic-item';
            
            let fieldHtml = '';
            if(type === 'textarea') {
                fieldHtml = `<textarea class="form-control fw-medium" rows="3" placeholder="${placeholder}" oninput="updatePreview()"></textarea>`;
            } else {
                fieldHtml = `<input type="text" class="form-control fw-medium" placeholder="${placeholder}">`;
            }
            
            div.innerHTML = `
                ${fieldHtml}
                <button class="btn btn-light border bg-white p-2 text-danger flex-shrink-0" onclick="this.parentElement.remove()" style="height: fit-content;"><i data-lucide="trash" size="16"></i></button>
            `;
            container.appendChild(div);
            lucide.createIcons();
        }