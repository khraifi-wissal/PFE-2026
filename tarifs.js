 // Logique visuelle basique pour le toggle Mensuel/Annuel
        const toggleBtns = document.querySelectorAll('.billing-btn');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                toggleBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Si vous souhaitez animer les prix, c'est ici que vous mettriez la logique
                // ex: si "Annuel" est cliqué, multiplier le prix par 12 et appliquer les -20%
            });
        });