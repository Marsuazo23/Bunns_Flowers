class SliderController {
    slider;
    framestrack;
    slides = [];
    currentSlideIndex = 0;
    totalSlides = 0;

    constructor() {
        this.slider = document.querySelector('.slider');
        this.framestrack = document.querySelector('.framestrack');
        this.slides = [...document.querySelectorAll('.slide')];

        // Duplica los slides al inicio y al final
        this.duplicateSlides();

        this.totalSlides = this.slides.length;
        this.generateUI();

        // Mueve al primer slide real
        this.framestrack.style.transform = `translateX(-100vw)`;
    }

    duplicateSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);

        this.framestrack.appendChild(firstSlide); // Duplicado al final
        this.framestrack.insertBefore(lastSlide, this.slides[0]); // Duplicado al inicio

        this.slides = [...document.querySelectorAll('.slide')];
    }

    moveSlideTo(slideIndex) {
        this.currentSlideIndex = slideIndex;

        // Mover el framestrack
        this.framestrack.style.transition = 'transform 0.5s ease-in-out';
        this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;

        // Verificar si estamos en un slide duplicado
        this.framestrack.addEventListener(
            'transitionend',
            () => {
                if (this.currentSlideIndex === 0) {
                    // Si estamos en el duplicado al inicio, saltar al último slide real
                    this.framestrack.style.transition = 'none';
                    this.currentSlideIndex = this.slides.length - 2;
                    this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;
                } else if (this.currentSlideIndex === this.slides.length - 1) {
                    // Si estamos en el duplicado al final, saltar al primer slide real
                    this.framestrack.style.transition = 'none';
                    this.currentSlideIndex = 1;
                    this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;
                }
            },
            { once: true }
        );
    }

    moveNext() {
        this.moveSlideTo(this.currentSlideIndex + 1);
    }

    movePrevious() {
        this.moveSlideTo(this.currentSlideIndex - 1);
    }

    generateUI() {
        const btnLeft = document.createElement('DIV');
        const btnRight = document.createElement('DIV');
        btnLeft.classList.add('btnLeft');
        btnRight.classList.add('btnRight');
        btnLeft.innerHTML = '&lt;';
        btnRight.innerHTML = '&gt;';

        btnLeft.addEventListener('click', () => this.movePrevious());
        btnRight.addEventListener('click', () => this.moveNext());

        this.slider.appendChild(btnLeft);
        this.slider.appendChild(btnRight);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SliderController();
});
