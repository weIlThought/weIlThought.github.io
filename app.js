// app.js
document.addEventListener("DOMContentLoaded", () => {
    const sounds = [
        { name: "Car 1", category: "sports", file: "car1.mp3" },
        { name: "Car 2", category: "muscle", file: "car2.mp3" },
        { name: "Car 3", category: "classic", file: "car3.mp3" },
        // Füge hier weitere Autosounds hinzu
    ];

    const soundList = document.getElementById("sound-list");
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("category");
    const sortAscButton = document.getElementById("sort-asc");
    const sortDescButton = document.getElementById("sort-desc");

    function renderSounds(sounds) {
        soundList.innerHTML = "";
        sounds.forEach(sound => {
            const soundItem = document.createElement("div");
            soundItem.classList.add("sound-item");
            soundItem.innerHTML = `
                <h3>${sound.name}</h3>
                <p>Category: ${sound.category}</p>
                <audio controls>
                    <source src="${sound.file}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
            `;
            soundList.appendChild(soundItem);
        });
    }

    function filterAndSortSounds() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        let filteredSounds = sounds.filter(sound =>
            sound.name.toLowerCase().includes(searchTerm) &&
            (category === "all" || sound.category === category)
        );

        if (sortAscButton.classList.contains("active")) {
            filteredSounds.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortDescButton.classList.contains("active")) {
            filteredSounds.sort((a, b) => b.name.localeCompare(a.name));
        }

        renderSounds(filteredSounds);
    }

    searchInput.addEventListener("input", filterAndSortSounds);
    categorySelect.addEventListener("change", filterAndSortSounds);
    sortAscButton.addEventListener("click", () => {
        sortAscButton.classList.add("active");
        sortDescButton.classList.remove("active");
        filterAndSortSounds();
    });
    sortDescButton.addEventListener("click", () => {
        sortDescButton.classList.add("active");
        sortAscButton.classList.remove("active");
        filterAndSortSounds();
    });

    renderSounds(sounds);
});
