let slideIndex = 0;
showSlide(slideIndex);

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    
    if (n >= slides.length) {
        slideIndex = 0;
    }

    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transition = "display  2s ease";
        slides[i].style.display = 'none';
    }

    slides[slideIndex].style.display = 'block';
}

function nextSlide() {
    showSlide(++slideIndex);
}

function prevSlide() {
    showSlide(--slideIndex);
}

setInterval(nextSlide, 10000); // Проміжок між слайдами в мілісекундах (тут 5000 = 5 секунд)







const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
// wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// wrapper.addEventListener("mouseleave", autoPlay);




const revWrapper = document.querySelector(".rev-wrapper");
const revCarousel = document.querySelector(".reviews-carousel");
const revFirstCardWidth = revWrapper.querySelector(".reviews-card").offsetWidth;
const revArrowBtns = document.querySelectorAll(".rev-wrapper i");
const revCarouselChildrens = [...revCarousel.children];

let isRevDragging = false, isRevAutoPlay = true, revStartX, startRevScrollLeft, revTimeoutId;

// Get the number of cards that can fit in the carousel at once
let cardRevPerView = Math.round(revCarousel.offsetWidth / revFirstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
revCarouselChildrens.slice(-cardRevPerView).reverse().forEach(card => {
    revCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
revCarouselChildrens.slice(0, cardRevPerView).forEach(card => {
    revCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
revCarousel.classList.add("no-transition");
revCarousel.scrollLeft = revCarousel.offsetWidth;
revCarousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
revArrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        revCarousel.scrollLeft += btn.id == "left" ? -revFirstCardWidth : revFirstCardWidth;
    });
});

const revDragStart = (e) => {
    isRevDragging = true;
    revCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    revStartX = e.pageX;
    startRevScrollLeft = revCarousel.scrollLeft;
}

const revDragging = (e) => {
    if(!isRevDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    revCarousel.scrollLeft = startRevScrollLeft - (e.pageX - startX);
}

const revDragStop = () => {
    isRevDragging = false;
    revCarousel.classList.remove("dragging");
}

const revInfiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(revCarousel.scrollLeft === 0) {
        revCarousel.classList.add("no-transition");
        revCarousel.scrollLeft = revCarousel.scrollWidth - (2 * revCarousel.offsetWidth);
        revCarousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(revCarousel.scrollLeft) === revCarousel.scrollWidth - revCarousel.offsetWidth) {
        revCarousel.classList.add("no-transition");
        revCarousel.scrollLeft = revCarousel.offsetWidth;
        revCarousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(revTimeoutId);
    if(!revWrapper.matches(":hover")) autoPlay();
}

const revAutoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    revTimeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
revAutoPlay();

revCarousel.addEventListener("mousedown", revDragStart);
revCarousel.addEventListener("mousemove", revDragging);
document.addEventListener("mouseup", revDragStop);
revCarousel.addEventListener("scroll", revInfiniteScroll);












const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateTimer() {
  // Отримати поточну дату та час
  const now = new Date();
  
  // Отримати кінцеву дату (кінець поточної доби)
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  // Розрахувати різницю в часі між поточним часом і кінцем доби
  const timeDiff = endOfDay - now;

  // Перетворити час у години, хвилини та секунди
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // Оновити вміст елементів таймера
  hoursElement.textContent = formatTime(hours);
  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(updateTimer, 1000);

updateTimer();


document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.modal-item');

    items.forEach(item => {
        item.addEventListener('click', function () {
            // Видалити клас 'selected' у всіх елементів
            items.forEach(i => i.classList.remove('selected'));
            // Додати клас 'selected' до натиснутого елемента
            this.classList.add('selected');
        });
    });
});




  

document.getElementById('open-modal1-btn').addEventListener('click', function() {
    document.getElementById('modal1-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('close-modal1-btn').addEventListener('click', function() {
    document.getElementById('modal1-section').classList.add('is-hidden');


});


document.getElementById('next-modal-btn').addEventListener('click', function() {
    document.getElementById('modal1-section').classList.add('is-hidden');
    document.getElementById('modal2-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('next-modal2-btn').addEventListener('click', function() {
    document.getElementById('modal2-section').classList.add('is-hidden');
    document.getElementById('modal3-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('next-modal3-btn').addEventListener('click', function() {
    document.getElementById('modal3-section').classList.add('is-hidden');
    document.getElementById('modal4-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('next-modal4-btn').addEventListener('click', function() {
    document.getElementById('modal4-section').classList.add('is-hidden');
    document.getElementById('modal5-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal5-btn').addEventListener('click', function() {
    document.getElementById('modal5-section').classList.add('is-hidden');
    document.getElementById('modal6-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal6-btn').addEventListener('click', function() {
    document.getElementById('modal6-section').classList.add('is-hidden');
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});



document.getElementById('modal1-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});

document.getElementById('modal2-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});
document.getElementById('modal3-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});
document.getElementById('modal4-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});
document.getElementById('modal5-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});
document.getElementById('modal6-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});

document.getElementById('modal7-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
    }
});
