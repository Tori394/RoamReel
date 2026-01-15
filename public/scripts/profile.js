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

function showSection(sectionName) {
    const statsSection = document.getElementById('stats-section');
    const timelineSection = document.getElementById('timeline-section');
    
    const buttons = document.querySelectorAll('.nav-btn');
    const timelineBtn = buttons[0];
    const statsBtn = buttons[1];

    if (sectionName === 'stats') {
            
        statsSection.classList.remove('hidden');
        timelineSection.classList.add('hidden');
        

        timelineBtn.classList.remove('active');
        statsBtn.classList.add('active');

    } else {

        statsSection.classList.add('hidden');
        timelineSection.classList.remove('hidden');
        

        timelineBtn.classList.add('active');
        statsBtn.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const btnTimeline = document.getElementById('btn-timeline');
    const btnStats = document.getElementById('btn-stats');
    
    const sectionTimeline = document.getElementById('timeline-section');
    const sectionStats = document.getElementById('stats-section');


    function switchToTimeline() {

        sectionStats.classList.add('hidden');
        sectionTimeline.classList.remove('hidden');


        btnStats.classList.remove('active');
        btnTimeline.classList.add('active');
    }

    function switchToStats() {

        sectionTimeline.classList.add('hidden');
        sectionStats.classList.remove('hidden');


        btnTimeline.classList.remove('active');
        btnStats.classList.add('active');
    }

    if (btnTimeline && btnStats) {
        btnTimeline.addEventListener('click', switchToTimeline);
        btnStats.addEventListener('click', switchToStats);
    } else {
        console.error("Nie znaleziono przycisków nawigacji!");
    }
});