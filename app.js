fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vR-oOBOMeDPp9HBZHEadZHLqMQ0OiPwptSAREllLjpFccxD_cn-nggupgJGP3VgqeDwCJKC_dWENChR/pub?gid=520033085&single=true&output=csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(",")); // CSV in Arrays umwandeln
        
        // Result-Array für gefilterte Daten
        const result = [];
        
        // Iteriere über die Zeilen und filtere die gewünschten Spalten
        for (let i = 1; i < rows.length; i++) { // Ab i=1, um die Header-Zeile zu überspringen
            const row = rows[i];
            if (row.length > 6) { // Stelle sicher, dass die Zeile genug Spalten hat
                result.push({
                    optimierungsStatus: row[4] ? row[4].trim() : '', // Spalte für Optimierungs Status
                    dcIdKaeufer: row[6] ? row[6].trim() : ''        // Spalte für DC ID Käufer
                });
            }
        }

        // Daten in die Tabelle einfügen
        const tableBody = document.getElementById("data-table-body");
        result.forEach(item => {
            const row = document.createElement("tr"); // Neue Zeile erstellen
            row.innerHTML = `
                <td>${item.optimierungsStatus || ''}</td>
                <td>${item.dcIdKaeufer || ''}</td>
            `;
            tableBody.appendChild(row); // Zeile zur Tabelle hinzufügen
        });
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
