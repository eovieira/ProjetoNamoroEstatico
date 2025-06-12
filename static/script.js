$(document).ready(function () {
    // --- Animação do cartão ---
    $('.container').mouseenter(function () {
        $('.cartao').stop().animate({ top: '-90px' }, 'slow');
    }).mouseleave(function () {
        $('.cartao').stop().animate({ top: 0 }, 'slow');
    });

    // --- Contador de tempo juntos ---
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

        $('#contador').html(
            `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas,<br>${minutos} minutos e ${segundos} segundos`
        );
    }
    setInterval(atualizarContador, 1000);
    atualizarContador();

    // --- Player de música ---
    const audio = document.getElementById('audio');
    const playPause = $('#playPause');
    const restart = $('#restart');
    const progress = $('#progress');
    const volume = $('#volume');
    const currentTimeDisplay = $('#currentTime');
    const durationDisplay = $('#duration');

    audio.volume = 1;
    audio.play().catch(() => {});

    audio.addEventListener('loadedmetadata', () => {
        progress.attr('max', audio.duration);
        durationDisplay.text(formatTime(audio.duration));
    });

    audio.addEventListener('timeupdate', () => {
        progress.val(audio.currentTime);
        currentTimeDisplay.text(formatTime(audio.currentTime));
    });

    progress.on('input', () => {
        audio.currentTime = progress.val();
    });

    playPause.on('click', () => {
        if (audio.paused) audio.play();
        else audio.pause();
    });

    restart.on('click', () => {
        audio.currentTime = 0;
        audio.play();
    });

    volume.on('input', () => {
        audio.volume = volume.val();
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    // --- Carrossel de imagens ---
    const track = $('.carousel-track');
    const images = $('.carousel-img');
    const total = images.length;
    let index = 0;

    function updateCarousel() {
        const imageWidth = 300; // largura da imagem
        const offset = -index * imageWidth;
        track.css('transform', `translateX(${offset}px)`);
    }

    $('#next').on('click', () => {
        index = (index + 1) % total;
        updateCarousel();
    });

    $('#prev').on('click', () => {
        index = (index - 1 + total) % total;
        updateCarousel();
    });

    updateCarousel();

    // --- Modal de imagem ampliada ---
    const modal = $('#imageModal');
    const modalImg = $('#modalImage');
    const closeBtn = $('.close');

    images.on('click', function () {
        modal.show();
        modalImg.attr('src', $(this).attr('src'));
    });

    closeBtn.on('click', () => {
        modal.hide();
    });

    $(window).on('click', function (e) {
        if ($(e.target).is(modal)) {
            modal.hide();
        }
    });
});
