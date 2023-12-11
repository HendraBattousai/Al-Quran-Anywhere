function getURL(e){
    const pageURL= window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e ){
            return parameterName[1];
        }
    }
}
const nomorsurat = getURL('nomorsurat');
// console.log(nomorsurat);

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(Response => Response.json())
    .then(Response => {
        // title surat
        const titleSurat = document.querySelector('#title-surat')
        titleSurat.textContent = `
        Surat ${Response.nama_latin}
        `

        // judul surat start
        const judulSurat = document.querySelector('.judul-surat');
        const cardJudulSurat = `
        <strong>${Response.nama_latin} <br>${Response.nama}</strong>
                      <p>Jumlah Ayat : ${Response.jumlah_ayat} <br>Arti : ${Response.arti}</p>
                      <button class="btn btn-success audio-button-play">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
</svg>
                        Play
                    </button>
                    <button class="btn btn-danger audio-button-pause hidden-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5z"/>
</svg>
                        Stop
                    </button>
                    <audio id="audio-tag" src="${Response.audio}"></audio>                    
                    `;
                    judulSurat.innerHTML=cardJudulSurat
                    // judul surat end

                    // isi surat
                    const surat = Response.ayat;
                    let isiSurat = '';
                    surat.forEach(s => {
                        isiSurat+=`
                        <div class="card mb-2">
                    <div class="card-body">
                      <p>${s.nomor}.</p>
                      <h3 class="text-end">${s.ar}</h3>
                      <p><br>'${s.tr}'</p>
                      <p>"${s.idn}"</p>
                    </div>
                  </div>                       
                        `;
                    });

                    const cardIsiSurat = document.querySelector('.card-isi-surat')
                    cardIsiSurat.innerHTML=isiSurat;
                    // play and pause
                    const buttonPlay = document.querySelector('.audio-button-play');
                    const buttonPause = document.querySelector('.audio-button-pause');
                    const audioSurat = document.querySelector('#audio-tag');

                    // play
                    buttonPlay.addEventListener('click', function(){
                        audioSurat.play();
                    })

                    // pause 
                    buttonPause.addEventListener('click' , function(){
                    audioSurat.pause();
                    });
                       
                    
                    
               });
                
   
    
}
   
getSurat();