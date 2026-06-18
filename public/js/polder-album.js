const uploadTile = document.getElementById('uploadTile');
const fileInput = document.getElementById('fileInput');
const removeBtn = document.getElementById('removeBtn');

if (uploadTile) {
    uploadTile.addEventListener('click', (e) => {
        if (e.target === removeBtn) return;
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            uploadTile.style.backgroundImage = `url(${ev.target.result})`;
            uploadTile.classList.add('has-image');
        };
        reader.readAsDataURL(file);
    });

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadTile.style.backgroundImage = '';
        uploadTile.classList.remove('has-image');
        fileInput.value = '';
    });
}