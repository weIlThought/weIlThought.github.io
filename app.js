document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const soundList = document.getElementById('sound-list');

    searchInput.addEventListener('input', filterSounds);
    categorySelect.addEventListener('change', filterSounds);

    function filterSounds() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        
        document.querySelectorAll('.sound-card').forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchValue);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
