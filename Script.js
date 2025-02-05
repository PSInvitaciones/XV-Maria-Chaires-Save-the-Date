document.addEventListener('DOMContentLoaded', function() {

  // ─────────────────────────────────────────
  // 1. Código para el botón "Add to Calendar"
  // ─────────────────────────────────────────
  const addToCalendarButton = document.getElementById('add-to-calendar');
  if (addToCalendarButton) {
    addToCalendarButton.addEventListener('click', function () {
      const icsFileContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20250913T180000Z
DTEND:20250913T220000Z
SUMMARY:Fiesta de XV Años Maria Chaires Aguirre
DESCRIPTION:¡No olvides asistir a la fiesta de XV años de Maria!
LOCATION:Salón de eventos Alborada, Calle Benito Juárez #976, Col. Centro, CP 26450, Zaragoza Coahuila
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsFileContent], { type: 'text/calendar' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'evento_xv_anos.ics';
      link.click();
    });
  }

  // ─────────────────────────────────────────
  // 2. Código para el carrusel de imágenes
  // ─────────────────────────────────────────
  const carrusel = document.querySelector('.carrusel-contenedor');
  const prevButton = document.querySelector('.carrusel-control.prev');
  const nextButton = document.querySelector('.carrusel-control.next');
  let currentIndex = 0;

  function actualizarCarrusel() {
    if (carrusel) {
      const imagen = carrusel.querySelector('img');
      if (imagen) {
        const anchoImagen = imagen.clientWidth;
        carrusel.style.transform = `translateX(-${currentIndex * anchoImagen}px)`;
      }
    }
  }

  if (prevButton && carrusel) {
    prevButton.addEventListener('click', () => {
      const totalImagenes = carrusel.children.length;
      currentIndex = (currentIndex - 1 + totalImagenes) % totalImagenes;
      actualizarCarrusel();
    });
  }

  if (nextButton && carrusel) {
    nextButton.addEventListener('click', () => {
      const totalImagenes = carrusel.children.length;
      currentIndex = (currentIndex + 1) % totalImagenes;
      actualizarCarrusel();
    });
  }

  window.addEventListener('resize', actualizarCarrusel);

  // ─────────────────────────────────────────
  // 3. Código para el efecto de estrellas en el botón "Confirmar Asistencia"
  // ─────────────────────────────────────────
  const confirmButton = document.querySelector('.boton.confirmar');

  if (confirmButton) {
    confirmButton.addEventListener('click', function(e) {
      e.preventDefault(); 
      lanzarEstrellas();

      // Después de 2 segundos redirige al enlace (por ejemplo, WhatsApp)
      setTimeout(() => {
        window.open(confirmButton.getAttribute('href'), '_blank');
      }, 2000);
    });
  }

  function lanzarEstrellas() {
    const cantidadEstrellas = 40; 
    for (let i = 0; i < cantidadEstrellas; i++) {
      setTimeout(crearEstrella, i * 50); 
    }
  }

  function crearEstrella() {
    const estrella = document.createElement('div');
    estrella.classList.add('estrella');

    // Decidir si la estrella viene desde la izquierda o la derecha
    const desdeIzquierda = Math.random() < 0.5;
    estrella.style.left = desdeIzquierda ? '-20px' : window.innerWidth + 'px';

    // Posición vertical aleatoria
    const posY = Math.random() * window.innerHeight;
    estrella.style.top = posY + 'px';

    // Tamaño aleatorio de las estrellas
    const tamano = Math.random() * 5 + 5;  // Ahora serán entre 5px y 10px
    estrella.style.width = tamano + 'px';
    estrella.style.height = tamano + 'px';
    

    // Estilo brillante
    estrella.style.backgroundColor = 'rgba(255, 255, 255, 1)';  // Máxima opacidad
estrella.style.boxShadow = '0 0 20px rgba(255, 255, 255, 1)';  // Sombra más intensa y brillante

    estrella.style.borderRadius = '50%';
    estrella.style.position = 'fixed';
    estrella.style.zIndex = '1000';
    estrella.style.pointerEvents = 'none';

    const colores = ['#FFD700', '#FF69B4', '#7FFFD4', '#ADFF2F', '#FFFFFF'];
estrella.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
estrella.style.boxShadow = `0 0 20px ${estrella.style.backgroundColor}`;


    document.body.appendChild(estrella);

    // Animación para mover las estrellas hacia el centro y desaparecer
    setTimeout(() => {
        const destinoX = window.innerWidth / 2 - (desdeIzquierda ? 0 : estrella.clientWidth);
        const destinoY = window.innerHeight / 2 - estrella.clientHeight;
        estrella.style.transform = `translate(${destinoX - parseFloat(estrella.style.left)}px, ${destinoY - posY}px) scale(0.5)`;
        estrella.style.opacity = '0';
    }, 50);

    // Eliminar la estrella después de 2 segundos
    setTimeout(() => {
        estrella.remove();
    }, 2000);
  }

  // ─────────────────────────────────────────
  // 4. Código para la cuenta regresiva
  // ─────────────────────────────────────────
  const eventoFecha = new Date('2025-09-13T21:00:00').getTime();

  function actualizarCuentaRegresiva() {
    const ahora = new Date().getTime();
    const distancia = eventoFecha - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;

    if (distancia < 0) {
      clearInterval(intervalo);
      document.querySelector('.cuenta-regresiva').innerHTML = '<h2>¡Hora de festejar!</h2>';
    }
  }

  const intervalo = setInterval(actualizarCuentaRegresiva, 1000);

});
