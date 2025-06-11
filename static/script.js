$(document).ready(function() {
    $('.container').mouseenter(function(){
        $('.cartao').stop().animate({
            top: '-90px'
        }, 'slow');
    }).mouseleave(function(){
        $('.cartao').stop().animate({
            top: 0
        }, 'slow');
    });

    const inicioAmor = new Date(2023, 4, 23, 0, 0, 0);
    function atualizarContador() {
        const agora = new Date();
        let anos = agora.getFullYear() - inicioAmor.getFullYear();
        let meses = agora.getMonth() - inicioAmor.getMonth();
        let dias = agora.getDate() - inicioAmor.getDate();
        let horas = agora.getHours() - inicioAmor.getHours();
        let minutos = agora.getMinutes() - inicioAmor.getMinutes();
        let segundos = agora.getSeconds() - inicioAmor.getSeconds();

        if (segundos < 0) { segundos += 60; minutos--; }
        if (minutos < 0) { minutos += 60; horas--; }
        if (horas < 0) { horas += 24; dias--; }
        if (dias < 0) {
            const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
            dias += mesAnterior.getDate();
            meses--;
        }
        if (meses < 0) { meses += 12; anos--; }

        document.getElementById('contador').textContent =
            `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
    }
    setInterval(atualizarContador, 1000);
    atualizarContador();

    // PLAYER
    const audio = document.getElementById('audio');
    document.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch((e) => {
                console.log('Autoplay bloqueado:', e);
            });
        }
    }, { once: true }); 
    const playPause = document.getElementById('playPause');
    const restart = document.getElementById('restart');
    const progress = document.getElementById('progress');
    const volume = document.getElementById('volume');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    // Toca a música automaticamente (garantido para desktop)
    audio.volume = 1;
    audio.play();

    // Atualiza duração assim que possível
    audio.addEventListener('loadedmetadata', () => {
        progress.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
    });

    // Atualiza tempo da música
    audio.addEventListener('timeupdate', () => {
        progress.value = audio.currentTime;
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    // Slider para mudar tempo
    progress.addEventListener('input', () => {
        audio.currentTime = progress.value;
    });

    // Play/Pause toggle
    playPause.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // Restart
    restart.addEventListener('click', () => {
        audio.currentTime = 0;
        audio.play();
    });

    // Volume
    volume.addEventListener('input', () => {
        audio.volume = volume.value;
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

});
