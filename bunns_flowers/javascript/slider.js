class SliderController {
    constructor(sliderSelector, framestrackSelector, btnLeftSelector, btnRightSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.framestrack = document.querySelector(framestrackSelector);
        this.slides = [...this.framestrack.children];
        this.currentSlideIndex = 0;

        // Duplica los slides al inicio y al final
        this.duplicateSlides();

        // Genera controles de UI
        this.generateUI(btnLeftSelector, btnRightSelector);

        // Ajusta la posición inicial
        this.framestrack.style.transform = `translateX(-100vw)`;
    }

    duplicateSlides() {
        const firstSlide = this.slides[0].cloneNode(true);
        const lastSlide = this.slides[this.slides.length - 1].cloneNode(true);

        this.framestrack.appendChild(firstSlide);
        this.framestrack.insertBefore(lastSlide, this.slides[0]);

        this.slides = [...this.framestrack.children];
    }

    moveSlideTo(index) {
        this.currentSlideIndex = index;

        this.framestrack.style.transition = 'transform 0.5s ease-in-out';
        this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;

        this.framestrack.addEventListener(
            'transitionend',
            () => {
                if (this.currentSlideIndex === 0) {
                    this.framestrack.style.transition = 'none';
                    this.currentSlideIndex = this.slides.length - 2;
                    this.framestrack.style.transform = `translateX(-${this.currentSlideIndex * 100}vw)`;
                } else if (this.currentSlideIndex === this.slides.length - 1) {
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

    generateUI(btnLeftSelector, btnRightSelector) {
        const btnLeft = document.querySelector(btnLeftSelector);
        const btnRight = document.querySelector(btnRightSelector);

        btnLeft.addEventListener('click', () => this.movePrevious());
        btnRight.addEventListener('click', () => this.moveNext());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SliderController('.slider', '.framestrack', '.btnLeft', '.btnRight');
    new SliderController('.slider2', '.framestrack2', '.btnLeft2', '.btnRight2');
});
