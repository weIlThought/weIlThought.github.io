document.getElementById("loadDataButton").addEventListener("click", loadGapiClient);

function loadGapiClient() {
  gapi.load("client:auth2", initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: "DEIN_API_KEY",
    clientId: "DEINE_CLIENT_ID",
    discoveryDocs: ["https://docs.googleapis.com/$discovery/rest?version=v1"],
    scope: "https://www.googleapis.com/auth/documents.readonly",
  }).then(() => {
    console.log("GAPI client geladen.");
    gapi.auth2.getAuthInstance().signIn().then(loadDocument);
  });
}

function loadDocument() {
  const documentId = "DOKUMENT_ID";  // Ersetze mit deiner Dokument-ID
  gapi.client.docs.documents.get({
    documentId: documentId
  }).then((response) => {
    const doc = response.result;
    const optimizationData = [];

    // Dokumentinhalt durchlaufen
    doc.body.content.forEach(element => {
      if (element.table) {
        element.table.tableRows.forEach((row, rowIndex) => {
          if (rowIndex === 0) return;  // Kopfzeile überspringen

          const optimizationStatusCell = row.tableCells[4]; // Optimierungs Status
          const dcIdBuyerCell = row.tableCells[6]; // DC ID Käufer

          const optimizationStatusText = optimizationStatusCell.content.map(content => 
            content.paragraph.elements.map(el => el.textRun.content).join("")
          ).join("");
          
          const dcIdBuyerText = dcIdBuyerCell.content.map(content => 
            content.paragraph.elements.map(el => el.textRun.content).join("")
          ).join("");

          optimizationData.push({
            optimizationStatus: optimizationStatusText.trim(),
            dcIdBuyer: dcIdBuyerText.trim()
          });
        });
      }
    });

    displayData(optimizationData);
  }, (error) => {
    console.error("Fehler beim Abrufen des Dokuments:", error);
    document.getElementById("dataDisplay").innerText = "Fehler beim Laden der Daten.";
  });
}

function displayData(data) {
  const dataDisplay = document.getElementById("dataDisplay");
  dataDisplay.innerHTML = "";  // Vorherige Daten löschen
  
  // Tabelle erstellen
  const table = document.createElement("table");
  table.classList.add("table");
  const headerRow = document.createElement("tr");
  
  const headers = ["Optimierungs Status", "DC ID Käufer"];
  headers.forEach(headerText => {
    const header = document.createElement("th");
    header.innerText = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  data.forEach(rowData => {
    const row = document.createElement("tr");
    
    const optimizationStatusCell = document.createElement("td");
    optimizationStatusCell.innerText = rowData.optimizationStatus;
    row.appendChild(optimizationStatusCell);
    
    const dcIdBuyerCell = document.createElement("td");
    dcIdBuyerCell.innerText = rowData.dcIdBuyer;
    row.appendChild(dcIdBuyerCell);
    
    table.appendChild(row);
  });

  dataDisplay.appendChild(table);
}
