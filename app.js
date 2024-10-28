fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vR-oOBOMeDPp9HBZHEadZHLqMQ0OiPwptSAREllLjpFccxD_cn-nggupgJGP3VgqeDwCJKC_dWENChR/pub?gid=520033085&single=true&output=csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").map(row => row.split(","));
        const result = rows.map(row => ({
            optimierungsStatus: row[4], // Optimierungs Status Spalte
            dcIdKaeufer: row[6]         // DC ID Käufer Spalte
        }));

        // Daten in die Tabelle einfügen
        const tableBody = document.getElementById("data-table-body");
        result.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.optimierungsStatus}</td>
                <td>${item.dcIdKaeufer}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
