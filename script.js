'use strict';

const appoinmentBTNs = document.querySelectorAll('.appoinment');
const closeModalWindowBTN = document.querySelectorAll('.btn--close-modal-window');
const modalWindow = document.querySelector('.modal-window');
const modalWindow2 = document.querySelector('.modal-window-2');
const contactsBTN = document.querySelectorAll('.contacts');
const overlay = document.querySelector('.overlay');

const inputName = document.querySelector('.name');
const inputTel = document.querySelector('.tel');
const inputEmail = document.querySelector('.email');

///////////////////modal window//////////////////

const showModalWindow = function (e) {
    e.preventDefault();
    modalWindow.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const showModalWindow2 = function (e) {
    e.preventDefault();
    overlay.classList.remove('hidden');
    modalWindow2.classList.remove('hidden');
    if (!overlay.classList.contains('hidden') && !modalWindow.classList.contains('hidden')) {
        modalWindow.classList.add('hidden');
    }
};

const closeModalWindow = function () {
    modalWindow.classList.add('hidden');
    modalWindow2.classList.add('hidden');

    overlay.classList.add('hidden');
};

appoinmentBTNs.forEach(button => button.addEventListener('click', showModalWindow));
closeModalWindowBTN.forEach(b => b.addEventListener('click', closeModalWindow));
overlay.addEventListener('click', closeModalWindow);

contactsBTN.forEach(button => button.addEventListener('click', showModalWindow2));

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
        closeModalWindow();
    }
    if (e.key === 'Escape' && !modalWindow2.classList.contains('hidden')) {
        closeModalWindow();
    }
});

///////////////ПРОКРУЧИВАНИЕ ПО КЛИКУ//////////////////

const scrollBTN = document.querySelector('.btn--scroll-to');
const scrollingTo = function (e) {
    e.preventDefault();
    const section = document.querySelector('#section-2');

    section.scrollIntoView({ behavior: 'smooth' });
};
scrollBTN.addEventListener('click', scrollingTo);
////////////// ПОЯВЛЕНИЕ СЕКЦИЙ САЙТА//////////////////

const allSections = document.querySelectorAll('.section');

const appearanceSection = function (entries, observer) {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(appearanceSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

///////////////////////////SLYDER/////////////////////////////
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const sliders = document.querySelectorAll('.slide');
const slidesNumber = sliders.length;
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;

const mooveToSlide = function (slide) {
    sliders.forEach((s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`));
};

////////////dots slide
const createDots = function () {
    sliders.forEach(function (_, index) {
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
    });
};
createDots();

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        const slide = e.target.dataset.slide;
        mooveToSlide(slide);
        activDot(slide);
    }
});

const activDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activDot(0);
//////mouse click slide

const nextSlide = function () {
    if (currentSlide === slidesNumber - 1) {
        currentSlide = 0;
    } else {
        currentSlide += 1;
    }
    mooveToSlide(currentSlide);
    activDot(currentSlide);
};

const previousSlide = function () {
    if (currentSlide === 0) {
        currentSlide = slidesNumber - 1;
    } else {
        currentSlide -= 1;
    }
    mooveToSlide(currentSlide);
    activDot(currentSlide);
};

mooveToSlide(0);
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

////btn mooveslide
document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    }
});

/////////////////LOCAL STORAGE//////////////
const data = [];
const appoinmentData = document.querySelector('.btn');
appoinmentData.addEventListener('click', function (e) {
    const newClient = {
        clientName: inputName.value,
        clientTel: +inputTel.value,
        clientMail: inputEmail.value,
    };
    data.push(newClient);
    localStorage.setItem('client', JSON.stringify(data));
    const savedData = JSON.parse(localStorage.getItem('client'));
    console.log(savedData);
    closeModalWindow();
});
const savedData = JSON.parse(localStorage.getItem('client'));
console.log(savedData);
