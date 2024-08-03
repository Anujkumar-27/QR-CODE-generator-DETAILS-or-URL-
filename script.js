document.addEventListener("DOMContentLoaded", function() {
    const user_name = document.querySelector('.user-name');
    const user_email = document.querySelector('.user-email');
    const user_phone = document.querySelector('.user-phone');
    const generateCodeButton = document.querySelector('.generate-qr-code');
    const downloadButton = document.querySelector('.download-qr-code');
    let qrImage = document.querySelector('.qr-image');
    const loading = document.querySelector('.loading');

    generateCodeButton.onclick = async () => {
        qrImage.src = '';
        let name = user_name.value;
        let eamil = user_email.value;
        let phone = user_phone.value;

        let userData = `Name: ${name} Email: ${eamil} Phone: ${phone}`;
        let imgSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userData}`;

        loading.style.display = 'block';
        try {
            if (name != '' || eamil != '' || phone != '') {
                let response = await fetch(imgSrc);
                let data = await response.blob();
                let blobUrl = URL.createObjectURL(data);
                qrImage.src = blobUrl;
                loading.style.display = 'none';
            } else {
                alert('Please enter valid field data!!!');
                loading.style.display = 'none';
            }
        } catch (error) {
            console.error(error);
            loading.style.display = 'none';
        }
    };

    downloadButton.addEventListener('click', () => {
        let img = document.querySelector('.qr-image');

        if (img !== null) {
            let imgAttr = img.getAttribute('src');
            downloadButton.setAttribute("href", imgAttr);
        }
    });
});