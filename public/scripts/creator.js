const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const statusText = document.querySelector('#creating-panel p');

dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const count = fileInput.files.length;
    if (count > 60) {
        alert("You can select up to 60 photos!");
        fileInput.value = "";
        statusText.innerText = "Photos uploaded: 0/60";
    } else {
        statusText.innerText = `Photos uploaded: ${count}/60`;
    }
});

const generateBtn = document.querySelector('.btn-generate');

generateBtn.addEventListener('click', async () => {
    const files = fileInput.files;
    if (files.length === 0) {
        alert("Dodaj przynajmniej jedno zdjęcie!");
        return;
    }

    // Tworzymy "paczkę" z danymi do wysłania
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('photos[]', files[i]);
    }

    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;

    try {
        const response = await fetch('/generateReel', {
            method: 'POST',
            body: formData
        });

        // Pobieramy surowy tekst odpowiedzi, żeby zobaczyć błędy PHP
        const rawResponse = await response.text();
        console.log("Surowa odpowiedź serwera:", rawResponse);

        // Próbujemy to zamienić na JSON
        const result = JSON.parse(rawResponse);

        if (response.ok) {
            alert("Film został wygenerowany!");
            window.location.href = '/dashboard'; 
        } else {
            alert("Serwer zgłosił błąd: " + (result.message || "Nieznany błąd"));
        }
    } catch (error) {
        console.error("Błąd krytyczny JS:", error);
        alert("Wystąpił błąd komunikacji. Sprawdź konsolę (F12)!");
    }
});