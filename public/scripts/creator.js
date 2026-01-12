const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const statusText = document.querySelector('#creating-panel p'); 
const uploadIcon = dropZone.querySelector('svg');
const generateBtn = document.querySelector('.btn-generate');
const creatingPanel = document.getElementById('creating-panel');

let uploadedFiles = []; 

// --- NOWA FUNKCJA DO WYŚWIETLANIA WIADOMOŚCI ---
function displayMessage(text, isError = false) {
    // Szukamy czy element message już istnieje
    let msgElement = creatingPanel.querySelector('.message');

    // Jeśli nie istnieje (bo PHP go nie wygenerował), tworzymy go
    if (!msgElement) {
        msgElement = document.createElement('p');
        msgElement.classList.add('message');
        // Wstawiamy go przed przyciskiem generowania
        creatingPanel.insertBefore(msgElement, generateBtn);
    }

    // Ustawiamy tekst i kolor
    msgElement.innerText = text;
    msgElement.style.display = 'block';
}
// ------------------------------------------------

// Otwórz okno wyboru plików
dropZone.addEventListener('click', (e) => {
    if(e.target !== dropZone && e.target !== uploadIcon) return;
    fileInput.click();
});

// Wybrano pliki przez kliknięcie
fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
    fileInput.value = ''; 
});

// Obsługa przeciągania
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#c9c9c9';
    dropZone.style.borderColor = '#333';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = ''; 
    dropZone.style.borderColor = '';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = '';
    dropZone.style.borderColor = '';
    
    handleFiles(e.dataTransfer.files);
});


function handleFiles(files) {
    const newFiles = Array.from(files);

    if (uploadedFiles.length + newFiles.length > 60) {
        // ZMIANA: Zamiast alert
        displayMessage("You can upload up to 60 photos!", true);
        return;
    }
    
    // Jeśli dodajemy poprawne pliki, czyścimy ewentualne stare błędy
    displayMessage(""); 

    if (newFiles.length > 0) {
        uploadIcon.style.display = 'none';
    }

    newFiles.forEach(file => {
        if (!file.type.startsWith('image/')) return;

        uploadedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('photo-preview');
            dropZone.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    updateStatusText();
}

function updateStatusText() {
    // statusText to ten element <p>Photos uploaded...</p>, nie mylić z .message
    if(statusText) {
        statusText.innerText = `Photos uploaded: ${uploadedFiles.length}/60`;
    }
}


// Generowanie filmu
generateBtn.addEventListener('click', async () => {
    // Czyścimy poprzednie komunikaty
    displayMessage("");

    if (uploadedFiles.length === 0) {
        // ZMIANA: Zamiast alert
        displayMessage("Upload at least one photo before generating the reel!", true);
        return;
    }

    const formData = new FormData();
    uploadedFiles.forEach(file => {
        formData.append('photos[]', file);
    });

    generateBtn.innerText = "Generating...";
    generateBtn.disabled = true;

    try {
        const response = await fetch('/generateReel', {
            method: 'POST',
            body: formData
        });

        const rawResponse = await response.text();
        console.log("Surowa odpowiedź serwera:", rawResponse);

        let result;
        try {
            result = JSON.parse(rawResponse);
        } catch (e) {
            result = { status: 'error', message: 'Błąd parsowania JSON' };
        }

        if (response.ok && result.status === 'success') {
            // ZMIANA: Zamiast alert
            displayMessage("Film został wygenerowany! Przekierowanie...", false);
            
            // Czekamy 2 sekundy, żeby użytkownik zdążył przeczytać komunikat
            setTimeout(() => {
                window.location.href = '/dashboard'; 
            }, 2000);
            
        } else {
            // ZMIANA: Zamiast alert
            displayMessage("Serwer zgłosił błąd: " + (result.message || "Nieznany błąd"), true);
            
            generateBtn.innerText = "Generate Reel";
            generateBtn.disabled = false;
        }
    } catch (error) {
        console.error("Błąd krytyczny JS:", error);
        // ZMIANA: Zamiast alert
        displayMessage("Wystąpił błąd komunikacji. Sprawdź konsolę (F12)!", true);
        
        generateBtn.innerText = "Generate Reel";
        generateBtn.disabled = false;
    }
});