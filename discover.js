let activeType = 'all';
        let activeCategory = 'all';
        let activePrice = 'all';
        let searchTerm = '';

        function setTypeFilter(type) {
            activeType = type;
            document.querySelectorAll('.filter-link').forEach(el => el.classList.remove('active'));
            document.querySelector(`.filter-link[data-type="${type}"]`).classList.add('active');
            applyFilters();
        }

        function setCategoryFilter(category) {
            activeCategory = category;
            document.querySelectorAll('.category-pill').forEach(el => el.classList.remove('active'));
            document.querySelector(`.category-pill[data-category="${category}"]`).classList.add('active');
            applyFilters();
        }

        function setPriceFilter(price) {
            activePrice = price;
            applyFilters();
        }

        document.getElementById('searchInput').addEventListener('input', function(e) {
            searchTerm = e.target.value.toLowerCase().trim();
            applyFilters();
        });

        function applyFilters() {
            const items = document.querySelectorAll('.course-item');
            let count = 0;

            items.forEach(item => {
                const itemType = item.getAttribute('data-type');
                const itemCategory = item.getAttribute('data-category');
                const itemPrice = parseFloat(item.getAttribute('data-price'));
                
                const title = item.querySelector('.card-title').innerText.toLowerCase();
                const author = item.querySelector('.card-author span').innerText.toLowerCase();

                const typeMatch = (activeType === 'all' || itemType === activeType);
                const categoryMatch = (activeCategory === 'all' || itemCategory === activeCategory);
                
                let priceMatch = true;
                if (activePrice === 'free') { priceMatch = (itemPrice === 0); } 
                else if (activePrice === 'paid') { priceMatch = (itemPrice > 0); }

                let searchMatch = true;
                if(searchTerm !== '') { searchMatch = title.includes(searchTerm) || author.includes(searchTerm); }

                if (typeMatch && categoryMatch && priceMatch && searchMatch) {
                    item.style.display = 'block'; count++;
                } else {
                    item.style.display = 'none';
                }
            });

            const countDisplay = document.getElementById('result-count');
            if(countDisplay) { countDisplay.innerText = `${count} résultat${count !== 1 ? 's' : ''}`; }
        }