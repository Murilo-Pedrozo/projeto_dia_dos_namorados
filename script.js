function abrir() {
  const btn = document.querySelector('button');
  const popup = document.getElementById('popup');
  const imagemContainer = document.querySelector('.image-container');
  const contador = document.getElementById('contador');
  const p = document.getElementById('p');
  const main = document.getElementById('main');
  const musica = document.getElementById('musica');

  musica.play().catch(e => console.log("Autoplay bloqueado até interação completa."));

  btn.style.display = 'none';

  popup.classList.remove('hidden');
  popup.style.animation = 'popupAnim 2s forwards';

  setTimeout(() => {
    popup.classList.add('hidden');

    imagemContainer.classList.remove('hidden');
    imagemContainer.classList.add('mostrar');
    contador.classList.remove('hidden');
    p.classList.remove('hidden');
    main.classList.remove('hidden');

    iniciarContador();
    iniciarCarrossel();
    explosaoDeCoracoes();

    const intervalo = setInterval(criarCoracao, 300);
    setTimeout(() => clearInterval(intervalo), 5000);
  }, 2000);
}


function mostrarPopup(popup, callback) {
  popup.classList.remove('hidden');
  popup.style.animation = 'popupAnim 3s forwards';

  setTimeout(() => {
    popup.classList.add('hidden');
    if (typeof callback === 'function') callback();
  }, 2000);
}

function mostrarImagem(imagemContainer) {
  imagemContainer.classList.add('mostrar');
}

function criarCoracao() {
  const coracao = document.createElement('div');
  coracao.classList.add('coracao');

  const emojis = ['❤️', '💕', '💖', '💗', '💓'];
  coracao.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  coracao.style.left = Math.random() * window.innerWidth + 'px';
  coracao.style.top = Math.random() * window.innerHeight + 'px';

  document.body.appendChild(coracao);

  coracao.addEventListener('animationend', () => coracao.remove());
}

function explosaoDeCoracoes() {
  const intervalo = setInterval(() => {
    for (let i = 0; i < 7; i++) {
      criarCoracao();
    }
  }, 100);

  setTimeout(() => {
    clearInterval(intervalo);
  }, 5000);
}


function iniciarContador() {
  const contador = document.getElementById('contador');
  const inicio = new Date(2023, 2, 17);

  function atualizar() {
    const agora = new Date();
    let anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    let horas = agora.getHours() - inicio.getHours();
    let minutos = agora.getMinutes() - inicio.getMinutes();
    let segundos = agora.getSeconds() - inicio.getSeconds();

    if (segundos < 0) { segundos += 60; minutos--; }
    if (minutos < 0) { minutos += 60; horas--; }
    if (horas < 0) { horas += 24; dias--; }
    if (dias < 0) {
      const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoMes;
      meses--;
    }
    if (meses < 0) { meses += 12; anos--; }

    contador.textContent = `Juntos há ${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
  }

  atualizar();
  setInterval(atualizar, 1000);
}

function iniciarCarrossel() {
  const imagens = document.querySelectorAll('.carrosel img');
  let index = 0;

  imagens[index].classList.add('active');

  setInterval(() => {
    const imagemAtual = imagens[index];
    imagemAtual.classList.remove('active');
    imagemAtual.classList.add('exit');

    index = (index + 1) % imagens.length;
    const proximaImagem = imagens[index];
    proximaImagem.classList.add('active');

    setTimeout(() => {
      imagemAtual.classList.remove('exit');
    }, 800);
  }, 3000);
}

