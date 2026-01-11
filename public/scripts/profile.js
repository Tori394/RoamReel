const profileEdit = document.getElementById('edit-icon');

profileEdit.addEventListener('click', (e) => {
    handleFiles(fileInput.files);
    profileEdit.value='';
});