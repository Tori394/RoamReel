const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const statusText = document.querySelector('#creating-panel p');
const uploadIcon = dropZone.querySelector('svg');
const generateBtn = document.querySelector('.btn-generate');

let uploadedFiles = []; 

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
        alert("You can upload up to 60 photos!");
        return;
    }

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
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "5px";
            img.style.margin = "5px";
            img.style.border = "1px solid #ddd";
            dropZone.appendChild(img);
        };
        reader.readAsDataURL(file);
    });

    updateStatusText();
}

function updateStatusText() {
    statusText.innerText = `Photos uploaded: ${uploadedFiles.length}/60`;
}



// Generowanie filmu
generateBtn.addEventListener('click', async () => {
    if (uploadedFiles.length === 0) {
        alert("Upload at least one photo before generating the reel!");
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
            alert("Film został wygenerowany!");
            window.location.href = '/dashboard'; 
        } else {
            alert("Serwer zgłosił błąd: " + (result.message || "Nieznany błąd"));
            generateBtn.innerText = "Generate Reel";
            generateBtn.disabled = false;
        }
    } catch (error) {
        console.error("Błąd krytyczny JS:", error);
        alert("Wystąpił błąd komunikacji. Sprawdź konsolę (F12)!");
        generateBtn.innerText = "Generate Reel";
        generateBtn.disabled = false;
    }
});