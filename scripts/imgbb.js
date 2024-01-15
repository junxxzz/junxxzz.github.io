setLoadComplete(function() {
    const email = sessionStorage.getItem('email');
    if( !email ) {
        alert('로그인하고 사용해야 합니다.', function() {
            location.href = '/';
        });
    }

    document.querySelector('#userfile').addEventListener('change', function() {
        if( this.files.length ) {
            // 뭔가 체크할까..
        }
    });
    document.querySelector('#imgurl').addEventListener('click', function() {
        navigator.clipboard.writeText(this.innerHTML).then(res => {
            alert('클립보드에 카피 완료');
        });
    });
});

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
async function getIMGBBURL() {
    var formdata = new FormData();
    const f = document.querySelector('#userfile').files[0];
    formdata.append('image', f, f.name);
    formdata.append('name', f.name);
    formdata.append('key', '53415d7950c7d4cd2a4d53c2ac22c628');
    fetch(`https://api.imgbb.com/1/upload`, {
        method: 'POST',
        body: formdata,
    }).then(res => {
        res.json().then(d => {
            if( d.success ) {
                document.querySelector('#imgurl').innerHTML = d.data.url;
                document.querySelector('#img').innerHTML = `<img src="${d.data.url}" border="0">`;
            }
            else {
                document.querySelector('#imgurl').innerHTML = d.error.message;
                document.querySelector('#img').innerHTML = '';
            }
        });
    });
}