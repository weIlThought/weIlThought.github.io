document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const soundList = document.getElementById('sound-list');
    let soundsData = [];

    // Fetch sounds data from JSON
    fetch('sounds.json')
        .then(response => response.json())
        .then(data => {
            soundsData = data;
            populateCategories();
            displaySounds(soundsData);
        })
        .catch(error => console.error('Error loading sounds:', error));

    // Populate category dropdown
    function populateCategories() {
        const categories = new Set(soundsData.map(sound => sound.category));
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = capitalizeFirstLetter(category);
            categorySelect.appendChild(option);
        });
    }

    // Display sounds based on filter
    function displaySounds(sounds) {
        soundList.innerHTML = '';
        sounds.forEach(sound => {
            const soundCard = document.createElement('div');
            soundCard.className = 'sound-card';
            soundCard.dataset.category = sound.category;

            soundCard.innerHTML = `
                <h3>${sound.name}</h3>
                <audio controls>
                    <source src="sounds/${sound.file}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;
            soundList.appendChild(soundCard);
        });
    }

    // Filter sounds by search and category
    function filterSounds() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const filteredSounds = soundsData.filter(sound => {
            const matchesSearch = sound.name.toLowerCase().includes(searchValue);
            const matchesCategory = selectedCategory === 'all' || sound.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        displaySounds(filteredSounds);
    }

    // Helper function to capitalize category names
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Event listeners for search and category filter
    searchInput.addEventListener('input', filterSounds);
    categorySelect.addEventListener('change', filterSounds);
});
