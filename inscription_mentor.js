let currentStep = 1;

    function goNext(n) {
        // Hide current step, show next
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        document.getElementById(`step-${n}`).classList.remove('hidden');

        // Update Stepper: Mark current as completed (Checkmark)
        const currentDot = document.getElementById(`st-${currentStep}`);
        currentDot.classList.remove('active');
        currentDot.classList.add('completed');
        currentDot.querySelector('.step-circle').innerHTML = '✓';

        // Set new step as active
        document.getElementById(`st-${n}`).classList.add('active');
        
        currentStep = n;
        updateFooter();
    }

    function goBack() {
        if (currentStep > 1) {
            let prev = currentStep - 1;
            
            // Hide current step, show previous
            document.getElementById(`step-${currentStep}`).classList.add('hidden');
            document.getElementById(`step-${prev}`).classList.remove('hidden');

            // Revert Stepper: Remove active from current, remove completed from previous
            document.getElementById(`st-${currentStep}`).classList.remove('active');
            
            const prevDot = document.getElementById(`st-${prev}`);
            prevDot.classList.remove('completed');
            prevDot.classList.add('active');
            prevDot.querySelector('.step-circle').innerHTML = prev; // Change back to number
            
            currentStep = prev;
            updateFooter();
        }
    }

    function updateFooter() {
        document.getElementById('step-indicator').innerText = `Étape ${currentStep} sur 4`;
    }

    // Interactive selections
    function selectCard(el, className) {
        document.querySelectorAll(`.${className}`).forEach(c => c.classList.remove('selected', 'pro')); // 'pro' class is used for the blue border on plans
        el.classList.add(className === 'plan-card' ? 'pro' : 'selected');
    }

    document.querySelectorAll('.tag').forEach(t => t.addEventListener('click', () => t.classList.toggle('selected')));