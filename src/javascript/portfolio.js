// 1. SELECTORES DE ELEMENTOS
const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const blocks = document.querySelectorAll('.aside');

// 2. ESTADO DEL SLIDER
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// 3. LISTENERS DEL SLIDER
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('.iframe');
  if (slideImage) {
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());
  }

  // Eventos Táctiles
  slide.addEventListener('touchstart', touchStart(index), { passive: true });
  slide.addEventListener('touchend', touchEnd);
  slide.addEventListener('touchmove', touchMove, { passive: true });

  // Eventos de Mouse
  slide.addEventListener('mousedown', touchStart(index));
  slide.addEventListener('mouseup', touchEnd);
  slide.addEventListener('mousemove', touchMove);
  slide.addEventListener('mouseleave', touchEnd);
});

window.addEventListener('resize', setPositionByIndex);

window.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  event.stopPropagation();
});

window.addEventListener('dragstart', (e) => e.preventDefault());

// 4. FUNCIONES DE LOGICA Y ANIMACIÓN
function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  };
}

function touchMove(event) {
  if (!isDragging) return;
  const currentPosition = getPositionX(event);
  currentTranslate = prevTranslate + currentPosition - startPos;
}

function touchEnd() {
  if (!isDragging) return;
  cancelAnimationFrame(animationID);
  isDragging = false;
  
  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  slider.classList.remove('grabbing');
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

// 5. INYECCIÓN DE LOGOS (Corregido: Usa clase para revivir tus iconos)
(() => {
  blocks.forEach((row) => {
    const element = document.createElement('div');
    element.classList.add('logos-container'); // Cambiado a clase para que no se rompan
    element.innerHTML = `
      <img src="../../assets/curriculum/javascript.png" alt="Javascript">
      <img src="../../assets/curriculum/ts.png" alt="Typescrip">
      <img src="../../assets/curriculum/node.png" alt="Node_JS">
      <img src="../../assets/curriculum/express.png" alt="Express">
      <img src="../../assets/curriculum/lowdb.png" alt="Low_DB">
      `;

    row.prepend(element);
  });
})();

// 6. TU CUSTOM SCROLLBAR DE JQUERY (Revivido y adaptado a la nueva clase)
(function($){
    $(window).on("load", function(){
        // Apuntamos a la nueva clase .slide-info para que inicialice en todos los contenedores
        $(".slide-info").mCustomScrollbar({
          theme: "rounded-dots",
          scrollButtons: { enable: true }
        });
    });
})(jQuery);

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');

    // Desvanece el letrero guía al interactuar
    const infoIcon = document.querySelector('.fa-share');
    if (infoIcon) {
      infoIcon.style.transition = 'opacity 0.5s ease';
      infoIcon.style.opacity = '0';
      setTimeout(() => infoIcon.remove(), 500); // Lo borra del DOM tras la animación
    }
  };
}
