let sounds = [];

fetch('sounds.json')
    .then(response => response.json())
    .then(data => {
        sounds = data;
        populateCategories();
        displaySounds(sounds);
    });

function populateCategories() {
    const categories = [...new Set(sounds.map(sound => sound.category))];
    const categorySelect = document.getElementById('category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function displaySounds(sounds) {
    const soundList = document.getElementById('sound-list');
    soundList.innerHTML = '';
    sounds.forEach(sound => {
        const soundDiv = document.createElement('div');
        soundDiv.className = 'sound-item';
        soundDiv.innerHTML = `
            <h3>${sound.name}</h3>
            <p>Category: ${sound.category}</p>
            <audio controls>
                <source src="${sound.file}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>
        `;
        soundList.appendChild(soundDiv);
    });
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredSounds = sounds.filter(sound => 
        sound.name.toLowerCase().includes(query)
    );
    displaySounds(filteredSounds);
});

document.getElementById('category').addEventListener('change', function() {
    const category = this.value;
    const filteredSounds = category === 'all' 
        ? sounds 
        : sounds.filter(sound => sound.category === category);
    displaySounds(filteredSounds);
});

document.getElementById('sort-asc').addEventListener('click', function() {
    sounds.sort((a, b) => a.name.localeCompare(b.name));
    displaySounds(sounds);
});

document.getElementById('sort-desc').addEventListener('click', function() {
    sounds.sort((a, b) => b.name.localeCompare(a.name));
    displaySounds(sounds);
});
