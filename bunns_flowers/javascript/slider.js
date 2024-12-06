class SliderController {
    // Constructor que inicializa el controlador del slider con los selectores de los elementos necesarios
    constructor(sliderSelector, framestrackSelector, btnLeftSelector, btnRightSelector) {
        // Seleccionamos los elementos del DOM correspondientes
        this.slider = document.querySelector(sliderSelector); 
        this.framestrack = document.querySelector(framestrackSelector);
        this.slides = [...this.framestrack.children]; // Convertimos los hijos de framestrack en un array
        this.currentSlideIndex = 0; // Inicializamos el índice de la diapositiva actual en 0

        // Duplica los slides al inicio y al final para facilitar el desplazamiento circular
        this.duplicateSlides();

        // Genera los controles de UI (botones de navegación)
        this.generateUI(btnLeftSelector, btnRightSelector);

        // Ajusta la posición inicial del slider
        this.framestrack.style.transform = `translateX(-100vw)`;
    }

    // Duplica el primer y último slide para crear un efecto circular
    duplicateSlides() {
        const firstSlide = this.slides[0].cloneNode(true); // Clonamos el primer slide
        const lastSlide = this.slides[this.slides.length - 1].cloneNode(true); // Clonamos el último slide

        // Agregamos el primer slide al final y el último al principio
        this.framestrack.appendChild(firstSlide);
        this.framestrack.insertBefore(lastSlide, this.slides[0]);

        // Actualizamos la lista de slides con los nuevos elementos duplicados
        this.slides = [...this.framestrack.children];
    }

    // Mueve el slider a la diapositiva especificada por el índice
    moveSlideTo(index) {
        this.currentSlideIndex = index;

        // Aplicamos una transición para mover el slider
        this.framestrack.style.transition = 'transform 0.5s ease-in-out';
        this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`; // Movemos el slider

        // Evento que se ejecuta cuando termina la transición
        this.framestrack.addEventListener(
            'transitionend',
            () => {
                // Si llegamos al primer slide, volvemos al último (efecto circular)
                if (this.currentSlideIndex === 0) {
                    this.framestrack.style.transition = 'none';
                    this.currentSlideIndex = this.slides.length - 2; // Movemos al penúltimo slide
                    this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;
                } 
                // Si llegamos al último slide, volvemos al primero (efecto circular)
                else if (this.currentSlideIndex === this.slides.length - 1) {
                    this.framestrack.style.transition = 'none';
                    this.currentSlideIndex = 1; // Movemos al segundo slide
                    this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;
                }
            },
            { once: true } // El evento se ejecuta solo una vez
        );
    }

    // Mueve el slider a la siguiente diapositiva
    moveNext() {
        this.moveSlideTo(this.currentSlideIndex + 1); // Incrementamos el índice
    }

    // Mueve el slider a la diapositiva anterior
    movePrevious() {
        this.moveSlideTo(this.currentSlideIndex - 1); // Decrementamos el índice
    }

    // Genera los controles de navegación (botones de izquierda y derecha)
    generateUI(btnLeftSelector, btnRightSelector) {
        const btnLeft = document.querySelector(btnLeftSelector); // Seleccionamos el botón izquierdo
        const btnRight = document.querySelector(btnRightSelector); // Seleccionamos el botón derecho

        // Añadimos eventos de clic para los botones
        btnLeft.addEventListener('click', () => this.movePrevious()); // Al hacer clic, movemos al anterior
        btnRight.addEventListener('click', () => this.moveNext()); // Al hacer clic, movemos al siguiente
    }
}

// Cuando el contenido de la página está completamente cargado, se inicializan los sliders
document.addEventListener('DOMContentLoaded', () => {
    // Creamos dos instancias del controlador del slider, uno para cada conjunto de elementos
    new SliderController('.slider', '.framestrack', '.btnLeft', '.btnRight');
    new SliderController('.slider2', '.framestrack2', '.btnLeft2', '.btnRight2');
});
