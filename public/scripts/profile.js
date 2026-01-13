document.addEventListener('DOMContentLoaded', () => {
    const editIcon = document.getElementById('edit-icon');
    const fileInput = document.getElementById('pfp-upload-input');
    const profilePicContainer = document.getElementById('profile-picture');

    if (editIcon) {
        editIcon.addEventListener('click', () => {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', async () => {
            const file = fileInput.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append('pfp', file);

            if (profilePicContainer) profilePicContainer.style.opacity = '0.5';

            try {
                const response = await fetch('/upload_pfp', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();

                if (result.status === 'success') {
                    const newPfpUrl = result.url;
                    
                    let imgElement = profilePicContainer.querySelector('img');
                    
                    if (!imgElement) {
                        profilePicContainer.innerHTML = '';
                        imgElement = document.createElement('img');
                        imgElement.style.width = '100%';
                        imgElement.style.height = '100%';
                        imgElement.style.objectFit = 'cover';
                        imgElement.style.borderRadius = '50%'; 
                        profilePicContainer.appendChild(imgElement);
                    }

                    imgElement.src = newPfpUrl + '?t=' + new Date().getTime();
                
                } else {
                    alert('Błąd: ' + result.message);
                }
            } catch (error) {
                console.error(error); 
                alert('Błąd sieci lub serwer zwrócił HTML zamiast JSON.');
            } finally {
                if (profilePicContainer) profilePicContainer.style.opacity = '1';
                fileInput.value = ''; 
            }
        });
    }
});