let currentStep = 1;
    const totalSteps = 3; // Mise à jour pour 3 étapes

    function goNext(n) {
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        document.getElementById(`step-${n}`).classList.remove('hidden');

        // Checkmark sur l'étape actuelle
        const currentDot = document.getElementById(`st-${currentStep}`);
        currentDot.classList.remove('active');
        currentDot.classList.add('completed');
        currentDot.querySelector('.step-circle').innerHTML = '✓';

        // Activer la nouvelle étape
        document.getElementById(`st-${n}`).classList.add('active');
        
        currentStep = n;
        updateFooter();
    }

    function goBack() {
        if (currentStep > 1) {
            let prev = currentStep - 1;
            
            document.getElementById(`step-${currentStep}`).classList.add('hidden');
            document.getElementById(`step-${prev}`).classList.remove('hidden');

            document.getElementById(`st-${currentStep}`).classList.remove('active');
            
            const prevDot = document.getElementById(`st-${prev}`);
            prevDot.classList.remove('completed');
            prevDot.classList.add('active');
            prevDot.querySelector('.step-circle').innerHTML = prev; 
            
            currentStep = prev;
            updateFooter();
        }
    }

    function updateFooter() {
        document.getElementById('step-indicator').innerText = `Étape ${currentStep} sur ${totalSteps}`;
    }

    // Gestion de la sélection exclusive pour différents groupes de cartes
    function selectGroupCard(el, groupClass) {
        document.querySelectorAll(`.${groupClass}`).forEach(c => {
            c.classList.remove('selected');
            // Reset color for level titles specifically when unselected
            if(groupClass === 'lvl-card') {
                c.querySelector('.card-title').style.color = 'var(--text-dark)';
            }
        });
        
        el.classList.add('selected');
        
        // Highlight title color if it's a level card
        if(groupClass === 'lvl-card') {
            el.querySelector('.card-title').style.color = 'var(--primary)';
        }
    }

    // Gestion des tags multiples
    document.querySelectorAll('.tag').forEach(t => t.addEventListener('click', () => t.classList.toggle('selected')));