// let slideIndex = 0;
// showSlide(slideIndex);

// function showSlide(n) {
//     const slides = document.getElementsByClassName('slide');
    
//     if (n >= slides.length) {
//         slideIndex = 0;
//     }

//     if (n < 0) {
//         slideIndex = slides.length - 1;
//     }

//     for (let i = 0; i < slides.length; i++) {
//       slides[i].style.transition = "display  2s ease";
//         slides[i].style.display = 'none';
//     }

//     // slides[slideIndex].style.display = 'block';
// }

// function nextSlide() {
//     showSlide(++slideIndex);
// }

// function prevSlide() {
//     showSlide(--slideIndex);
// }

// setInterval(nextSlide, 10000);


if (window.innerWidth <= 1024) {
    const images = [
        'url("../images/hero/mob-bg/bg1.png")',
        'url("../images/hero/mob-bg/bg2.png")',
        'url("../images/hero/mob-bg/bg3.png")',
        'url("../images/hero/mob-bg/bg4.png")',
        'url("../images/hero/mob-bg/bg5.png")',
        'url("../images/hero/mob-bg/bg6.png")',

    
    ];
    
    let currentIndex = 0;
    
    function showSlide(index) {
        currentIndex = (index + images.length) % images.length;
        document.getElementById('hero').style.backgroundImage = images[currentIndex];
    }
    
    function changeSlide(direction) {
        showSlide(currentIndex + direction);
        resetAutoSlide();
    }
    
    function autoSlide() {
        changeSlide(1);
    }
    
    let autoSlideInterval = setInterval(autoSlide, 15000);
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 15000);
    }
    
    showSlide(currentIndex);

} else {
   const images = [
        'url("../images/hero/hero-bg1.png")',
        'url("../images/hero/hero-bg2.png")',
        'url("../images/hero/hero-bg3.png")',
        'url("../images/hero/hero-bg4.png")',
        'url("../images/hero/hero-bg5.png")',
        'url("../images/hero/hero-bg6.png")',
    
    ];
    
    let currentIndex = 0;
    
    function showSlide(index) {
        currentIndex = (index + images.length) % images.length;
        document.getElementById('hero').style.backgroundImage = images[currentIndex];
    }
    
    function changeSlide(direction) {
        showSlide(currentIndex + direction);
        resetAutoSlide();
    }
    
    function autoSlide() {
        changeSlide(1);
    }
    
    let autoSlideInterval = setInterval(autoSlide, 15000);
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlide, 15000);
    }
    
    showSlide(currentIndex);
    
}







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
}



carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);




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

}



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
    document.getElementById('open-modal7-btn').classList.add('is-hidden');

});

document.getElementById('open-modal7-btn').addEventListener('click', function() {
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
});
document.getElementById('open-modal7-btn1').addEventListener('click', function() {
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('open-modal7-btn2').addEventListener('click', function() {
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('open-modal7-btn3').addEventListener('click', function() {
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('open-modal7-btn4').addEventListener('click', function() {
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('skip1').addEventListener('click' , function() {
    document.getElementById('modal1-section').classList.add('is-hidden');
    document.getElementById('modal2-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

})
document.getElementById('skip2').addEventListener('click' , function() {
    document.getElementById('modal2-section').classList.add('is-hidden');
    document.getElementById('modal3-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

})
document.getElementById('skip3').addEventListener('click' , function() {
    document.getElementById('modal3-section').classList.add('is-hidden');
    document.getElementById('modal4-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

})
document.getElementById('skip4').addEventListener('click' , function() {
    document.getElementById('modal4-section').classList.add('is-hidden');
    document.getElementById('modal5-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

})
document.getElementById('skip5').addEventListener('click' , function() {
    document.getElementById('modal5-section').classList.add('is-hidden');
    document.getElementById('modal6-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

})
document.getElementById('skip6').addEventListener('click' , function() {
    document.getElementById('modal6-section').classList.add('is-hidden');
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

})


document.getElementById('close-modal1-btn').addEventListener('click', function() {
    document.getElementById('modal1-section').classList.add('is-hidden');
    document.body.classList.remove('no-scroll');

});
document.getElementById('close-modal2-btn').addEventListener('click', function() {
    document.getElementById('modal2-section').classList.add('is-hidden');
    document.body.classList.remove('no-scroll');

});
document.getElementById('close-modal3-btn').addEventListener('click', function() {
    document.getElementById('modal3-section').classList.add('is-hidden');
            document.body.classList.remove('no-scroll');

});
document.getElementById('close-modal4-btn').addEventListener('click', function() {
    document.getElementById('modal4-section').classList.add('is-hidden');
            document.body.classList.remove('no-scroll');

});
document.getElementById('close-modal5-btn').addEventListener('click', function() {
    document.getElementById('modal5-section').classList.add('is-hidden');
            document.body.classList.remove('no-scroll');

});
document.getElementById('close-modal6-btn').addEventListener('click', function() {
    document.getElementById('modal6-section').classList.add('is-hidden');
            document.body.classList.remove('no-scroll');

});
document.getElementById('close-modal7-btn').addEventListener('click', function() {
    document.getElementById('modal7-section').classList.add('is-hidden');
            document.body.classList.remove('no-scroll');

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
 
document.getElementById('next-modal21-btn').addEventListener('click', function() {
    document.getElementById('modal2-section').classList.add('is-hidden');
    document.getElementById('modal3-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('next-modal3-btn').addEventListener('click', function() {
    document.getElementById('modal3-section').classList.add('is-hidden');
    document.getElementById('modal4-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal31-btn').addEventListener('click', function() {
    document.getElementById('modal3-section').classList.add('is-hidden');
    document.getElementById('modal4-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});

document.getElementById('next-modal4-btn').addEventListener('click', function() {
    document.getElementById('modal4-section').classList.add('is-hidden');
    document.getElementById('modal5-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal41-btn').addEventListener('click', function() {
    document.getElementById('modal4-section').classList.add('is-hidden');
    document.getElementById('modal5-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal5-btn').addEventListener('click', function() {
    document.getElementById('modal5-section').classList.add('is-hidden');
    document.getElementById('modal6-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal51-btn').addEventListener('click', function() {
    document.getElementById('modal5-section').classList.add('is-hidden');
    document.getElementById('modal6-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal6-btn').addEventListener('click', function() {
    document.getElementById('modal6-section').classList.add('is-hidden');
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});
document.getElementById('next-modal61-btn').addEventListener('click', function() {
    document.getElementById('modal6-section').classList.add('is-hidden');
    document.getElementById('modal7-section').classList.remove('is-hidden');
    document.body.classList.add('no-scroll');

});



document.getElementById('modal1-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});

document.getElementById('modal2-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});
document.getElementById('modal3-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});
document.getElementById('modal4-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});
document.getElementById('modal5-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});
document.getElementById('modal6-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});

document.getElementById('modal7-section').addEventListener('click', function(event) {
    if (event.target === this) {
        this.classList.add('is-hidden');
        document.body.classList.remove('no-scroll');

    }
});




document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('album-modal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const prevImageBtn = document.getElementById('prev-image');
    const nextImageBtn = document.getElementById('next-image');
    const mainImage = document.getElementById('main-image');
    const albumCarousel = document.querySelector('.album-carousel');
    const showMoreBtn = document.getElementById('show-more-album');
    const nextMainImagesWrapper = document.getElementById('next-main-images-wrapper');
    const showMoreAlbumsBtn = document.getElementById('show-more-albums');
    const backBtn = document.getElementById('back-btn')
    const albumGroupTitle = document.getElementById('album-group-title');


    let currentAlbumIndex = 0;
    let currentImageIndex = 0;

    const titles = ["Florida Wedding", "Florida Love Story", "Engagement", "PROPOSAL", "Party"];
    let albums = [
        [
            { src: '/images/album1/florida2.png', class: 'img1' },
            { src: '/images/album1/florida3.png', class: 'img2' },
            { src: '/images/album1/florida4.png', class: 'img3' },
            { src: '/images/album1/florida5.png', class: 'img4' },
            { src: '/images/album1/florida6.png', class: 'img5' },
            { src: '/images/album1/florida7.png', class: 'img6' },
            { src: '/images/album1/florida8.png', class: 'img7' },
            { src: '/images/album1/florida9.png', class: 'img8' }
        ],
        [
            { src: '/images/album2/florida12.png', class: 'img1' },
            { src: '/images/album2/florida13.png', class: 'img2' },
            { src: '/images/album2/florida14.png', class: 'img3' },
            { src: '/images/album2/florida15.png', class: 'img4' },
            { src: '/images/album2/florida16.png', class: 'img5' },
            { src: '/images/album2/florida17.png', class: 'img6' },
            { src: '/images/album2/florida18.png', class: 'img7' },
            { src: '/images/album2/florida19.png', class: 'img8' }
        ],
        [
            { src: '/images/album3/florida22.png', class: 'img1' },
            { src: '/images/album3/florida23.png', class: 'img2' },
            { src: '/images/album3/florida24.png', class: 'img3' },
            { src: '/images/album3/florida25.png', class: 'img4' },
            { src: '/images/album3/florida26.png', class: 'img5' },
            { src: '/images/album3/florida27.png', class: 'img6' },
            { src: '/images/album3/florida28.png', class: 'img7' },
            { src: '/images/album3/florida29.png', class: 'img8' }
        ],
        [
            { src: '/images/album4/florida32.png', class: 'img1' },
            { src: '/images/album4/florida33.png', class: 'img2' },
            { src: '/images/album4/florida34.png', class: 'img3' },
            { src: '/images/album4/florida35.png', class: 'img4' },
            { src: '/images/album4/florida36.png', class: 'img5' },
            { src: '/images/album4/florida37.png', class: 'img6' },
            { src: '/images/album4/florida38.png', class: 'img7' },
            { src: '/images/album4/florida39.png', class: 'img8' },
            { src: '/images/album4/florida399.png', class: 'img9' }
        ],
        [
            { src: '/images/album5/florida42.png', class: 'img1' },
            { src: '/images/album5/florida43.png', class: 'img2' },
            { src: '/images/album5/florida44.png', class: 'img3' },
            { src: '/images/album5/florida45.png', class: 'img4' },
            { src: '/images/album5/florida46.png', class: 'img5' },
            { src: '/images/album5/florida47.png', class: 'img6' },
            { src: '/images/album5/florida48.png', class: 'img7' },
            { src: '/images/album5/florida49.png', class: 'img8' },
            { src: '/images/album5/florida499.png', class: 'img9' }
        ],
        [
            { src: '/images/album6/florida52.png', class: 'img1' },
            { src: '/images/album6/florida53.png', class: 'img2' },
            { src: '/images/album6/florida54.png', class: 'img3' },
            { src: '/images/album6/florida55.png', class: 'img4' },
            { src: '/images/album6/florida56.png', class: 'img5' },
            { src: '/images/album6/florida599.png', class: 'img8' },
            { src: '/images/album6/florida57.png', class: 'img6' },
            { src: '/images/album6/florida59.png', class: 'img9' },
            { src: '/images/album6/florida58.png', class: 'img7' },
        ],
        [
            { src: '/images/album7/floriada62.png', class: 'img1' },
            { src: '/images/album7/floriada63.png', class: 'img2' },
            { src: '/images/album7/floriada64.png', class: 'img3' },
            { src: '/images/album7/floriada65.png', class: 'img4' },
            { src: '/images/album7/floriada66.png', class: 'img5' },
            { src: '/images/album7/floriada67.png', class: 'img6' },
            { src: '/images/album7/floriada68.png', class: 'img7' },
            { src: '/images/album7/floriada69.png', class: 'img8' },
        ],
        [
            { src: '/images/album8/florida72.png', class: 'img1' },
            { src: '/images/album8/florida73.png', class: 'img2' },
            { src: '/images/album8/florida74.png', class: 'img3' },
            { src: '/images/album8/florida75.png', class: 'img4' },
            { src: '/images/album8/florida76.png', class: 'img5' },
            { src: '/images/album8/florida77.png', class: 'img6' },
            { src: '/images/album8/florida78.png', class: 'img7' },
            { src: '/images/album8/florida79.png', class: 'img8' },
        ],
        [
            { src: '/images/album9/florida82.png', class: 'img1' },
            { src: '/images/album9/florida83.png', class: 'img2' },
            { src: '/images/album9/florida84.png', class: 'img3' },
            { src: '/images/album9/florida85.png', class: 'img4' },
            { src: '/images/album9/florida86.png', class: 'img5' },
            { src: '/images/album9/florida87.png', class: 'img6' },
            { src: '/images/album9/florida88.png', class: 'img7' },
            { src: '/images/album9/florida89.png', class: 'img8' },
        ],
        [
            { src: '/images/album10/florida92.png', class: 'img1' },
            { src: '/images/album10/florida93.png', class: 'img2' },
            { src: '/images/album10/florida94.png', class: 'img3' },
            { src: '/images/album10/florida95.png', class: 'img4' },
            { src: '/images/album10/florida96.png', class: 'img5' },
            { src: '/images/album10/florida97.png', class: 'img6' },
            { src: '/images/album10/florida98.png', class: 'img7' },
            { src: '/images/album10/florida99.png', class: 'img8' },
            { src: '/images/album10/florida999.png', class: 'img10' },
        ],
        [
            { src: '/images/album11/florida102.png', class: 'img2' },
            { src: '/images/album11/florida103.png', class: 'img1' },
            { src: '/images/album11/florida104.png', class: 'img4' },
            { src: '/images/album11/florida105.png', class: 'img3' },
            { src: '/images/album11/florida106.png', class: 'img5' },
            { src: '/images/album11/florida107.png', class: 'img6' },
            { src: '/images/album11/florida108.png', class: 'img7' },
            { src: '/images/album11/florida109.png', class: 'img8' },
        ],
        [
            { src: '/images/album12/florida112.png', class: 'img2' },
            { src: '/images/album12/florida113.png', class: 'img1' },
            { src: '/images/album12/florida114.png', class: 'img4' },
            { src: '/images/album12/florida115.png', class: 'img3' },
            { src: '/images/album12/florida116.png', class: 'img5' },
            { src: '/images/album12/florida1199.png', class: 'img9' },
            { src: '/images/album12/florida117.png', class: 'img6' },
            { src: '/images/album12/florida118.png', class: 'img7' },
            { src: '/images/album12/florida119.png', class: 'img8' },

        ],
        [
            { src: '/images/album13/florida122.png', class: 'img2' },
            { src: '/images/album13/florida123.png', class: 'img1' },
            { src: '/images/album13/florida124.png', class: 'img4' },
            { src: '/images/album13/florida125.png', class: 'img3' },
            { src: '/images/album13/florida126.png', class: 'img5' },
            { src: '/images/album13/florida127.png', class: 'img6' },
            { src: '/images/album13/florida128.png', class: 'img7' },
            { src: '/images/album13/florida129.png', class: 'img8' },
        ],
        [
            { src: '/images/album14/florida131.png', class: 'img2-cut' },    
            { src: '/images/album14/florida133.png', class: 'img1' },
            { src: '/images/album14/florida139.png', class: 'img4' },
            { src: '/images/album14/florida137.png', class: 'img7' },
            { src: '/images/album14/florida134.png', class: 'img5' },
            { src: '/images/album14/florida136.png', class: 'img8' },
            { src: '/images/album14/florida135.png', class: 'img6' },
            { src: '/images/album14/florida138.png', class: 'img8' },
            { src: '/images/album14/florida1399.png', class: 'img8' },
        ],
        [
            { src: '/images/album15/florida141.png', class: 'img1' },    
            { src: '/images/album15/florida142.png', class: 'img2' },
            { src: '/images/album15/florida146.png', class: 'img6' },
            { src: '/images/album15/florida147.png', class: 'img7' },
            { src: '/images/album15/florida148.png', class: 'img8' },
            { src: '/images/album15/florida149.png', class: 'img9' },
            { src: '/images/album15/florida143.png', class: 'img7' },
            { src: '/images/album15/florida144.png', class: 'img4' },
            { src: '/images/album15/florida145.png', class: 'img5' },
        ],
        [
            { src: '/images/album16/florida151.png', class: 'img1' },    
            { src: '/images/album16/florida152.png', class: 'img2' },
            { src: '/images/album16/florida153.png', class: 'img6' },
            { src: '/images/album16/florida154.png', class: 'img7' },
            { src: '/images/album16/florida158.png', class: 'img4' },
            { src: '/images/album16/florida159.png', class: 'img5' },
            { src: '/images/album16/florida155.png', class: 'img8' },
            { src: '/images/album16/florida156.png', class: 'img9' },
            { src: '/images/album16/florida157.png', class: 'img7' },
        ],
        [
            { src: '/images/album17/florida161.png', class: 'img1' },    
            { src: '/images/album17/florida162.png', class: 'img2' },
            { src: '/images/album17/florida163.png', class: 'img6' },
            { src: '/images/album17/florida164.png', class: 'img7' },
            { src: '/images/album17/florida168.png', class: 'img4' },
            { src: '/images/album17/florida169.png', class: 'img5' },
            { src: '/images/album17/florida165.png', class: 'img8' },
            { src: '/images/album17/florida166.png', class: 'img9' },
            { src: '/images/album17/florida167.png', class: 'img7' },
        ],
        [
            { src: '/images/album18/fkorida171.png', class: 'img1' },    
            { src: '/images/album18/fkorida172.png', class: 'img2' },    
            { src: '/images/album18/fkorida173.png', class: 'img3' },    
            { src: '/images/album18/fkorida174.png', class: 'img4' },    
            { src: '/images/album18/fkorida175.png', class: 'img5' },    
            { src: '/images/album18/fkorida176.png', class: 'img6' },    
            { src: '/images/album18/fkorida177.png', class: 'img7' },    
            { src: '/images/album18/fkorida178.png', class: 'img8' },
            { src: '/images/album18/fkorida179.png', class: 'img9' },    
        ],
        [
            { src: '/images/album19/florida181.png', class: 'img1' },    
            { src: '/images/album19/florida182.png', class: 'img2' },
            { src: '/images/album19/florida183.png', class: 'img3' },
            { src: '/images/album19/florida184.png', class: 'img4' },
            { src: '/images/album19/florida185.png', class: 'img5' },
            { src: '/images/album19/florida186.png', class: 'img6' },
            { src: '/images/album19/florida187.png', class: 'img7' },
            { src: '/images/album19/florida188.png', class: 'img8' },
            { src: '/images/album19/florida189.png', class: 'img9' },
        ],
        [
            { src: '/images/album20/florida191.png', class: 'img9' },    
            { src: '/images/album20/florida192.png', class: 'img42' },
            { src: '/images/album20/florida193.png', class: 'im93' },
            { src: '/images/album20/florida194.png', class: 'img4' },
            { src: '/images/album20/florida195.png', class: 'img5' },
            { src: '/images/album20/florida196.png', class: 'img6' },
            { src: '/images/album20/florida197.png', class: 'img7' },
            { src: '/images/album20/florida198.png', class: 'img8' },
        ],
        [
            { src: '/images/album21/florida201.png', class: 'img1' },    
            { src: '/images/album21/florida202.png', class: 'img2' },
            { src: '/images/album21/florida203.png', class: 'img3' },
            { src: '/images/album21/florida204.png', class: 'img4' },
            { src: '/images/album21/florida205.png', class: 'img5' },
            { src: '/images/album21/florida206.png', class: 'img6' },
            { src: '/images/album21/florida207.png', class: 'img7' },
            { src: '/images/album21/florida208.png', class: 'img8' },
            { src: '/images/album21/florida209.png', class: 'img9' },
        ],
        [
            { src: '/images/album22/florida211.png', class: 'img1' },    
            { src: '/images/album22/florida212.png', class: 'img2' },
            { src: '/images/album22/florida213.png', class: 'img3' },
            { src: '/images/album22/florida214.png', class: 'img4' },
            { src: '/images/album22/florida215.png', class: 'img5' },
            { src: '/images/album22/florida216.png', class: 'img6' },
            { src: '/images/album22/florida217.png', class: 'img7' },
            { src: '/images/album22/florida218.png', class: 'img8' },
            { src: '/images/album22/florida219.png', class: 'img9' },
        ],
        [
            { src: '/images/album23/florida221.png', class: 'img1' },    
            { src: '/images/album23/florida222.png', class: 'img2' },
            { src: '/images/album23/florida223.png', class: 'img3' },
            { src: '/images/album23/florida224.png', class: 'img4' },
            { src: '/images/album23/florida225.png', class: 'img5' },
            { src: '/images/album23/florida226.png', class: 'img6' },
            { src: '/images/album23/florida227.png', class: 'img7' },
            { src: '/images/album23/florida228.png', class: 'img8' },
            { src: '/images/album23/florida229.png', class: 'img9' },
        ],
        [
            { src: '/images/album24/florida231.png', class: 'img1' },    
            { src: '/images/album24/florida232.png', class: 'img2' },
            { src: '/images/album24/florida233.png', class: 'img3' },
            { src: '/images/album24/florida234.png', class: 'img4' },
            { src: '/images/album24/florida235.png', class: 'img5' },
            { src: '/images/album24/florida236.png', class: 'img6' },
            { src: '/images/album24/florida237.png', class: 'img7' },
            { src: '/images/album24/florida238.png', class: 'img8' },
            { src: '/images/album24/florida239.png', class: 'img9' },
        ],
        [
            { src: '/images/album25/florida241.png', class: 'img1' },    
            { src: '/images/album25/florida242.png', class: 'img2' },
            { src: '/images/album25/florida243.png', class: 'img3' },
            { src: '/images/album25/florida244.png', class: 'img4' },
            { src: '/images/album25/florida245.png', class: 'img5' },
            { src: '/images/album25/florida246.png', class: 'img6' },
            { src: '/images/album25/florida247.png', class: 'img7' },
            { src: '/images/album25/florida248.png', class: 'img8' },
            { src: '/images/album25/florida249.png', class: 'img9' },
        ],
    ];

    function openModal(albumIndex) {
        currentAlbumIndex = albumIndex;
        modal.style.display = 'block';
        loadAlbum(currentAlbumIndex);
         document.body.style.overflow = 'hidden';
        document.body.classList.add('no-scroll');

        
    }


    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

 function loadAlbum(index) {
        albumCarousel.innerHTML = '';
        let container = null;
        const album = albums[index];
        document.body.classList.add('no-scroll');

        
        album.forEach((imgData, i) => {
            if (album.length === 9 && i >= 6) {
                if (i === 6) {
                    container = document.createElement('div');
                    container.classList.add('single-image-column');
                    albumCarousel.appendChild(container);
                }
            } else {
                if (i % 2 === 0) {
                    container = document.createElement('div');
                    container.classList.add('image-pair');
                    albumCarousel.appendChild(container);
                }
            }

            const img = document.createElement('img');
            img.src = imgData.src;
            img.classList.add(imgData.class);
            img.addEventListener('click', () => {
                showImage(i);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            container.appendChild(img);
        });

        showImage(0);
        loadNextMainImages(index);
    }

    function showImage(index) {
        currentImageIndex = index;
        mainImage.src = albums[currentAlbumIndex][index].src;
        mainImage.classList.add('main-image')
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + albums[currentAlbumIndex].length) % albums[currentAlbumIndex].length;
        showImage(currentImageIndex);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % albums[currentAlbumIndex].length;
        showImage(currentImageIndex);
    }

    function prevAlbum() {
        currentAlbumIndex = (currentAlbumIndex - 1 + albums.length) % albums.length;
        loadAlbum(currentAlbumIndex);
    }

    function nextAlbum() {
        currentAlbumIndex = (currentAlbumIndex + 1) % albums.length;
        loadAlbum(currentAlbumIndex);
    }
        function loadNextMainImages() {
        nextMainImagesWrapper.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            const nextAlbumIndex = (currentAlbumIndex + i) % albums.length;
            const mainImageData = albums[nextAlbumIndex][0]; // Перше зображення як основне
            const img = document.createElement('img');
            img.src = mainImageData.src;
            img.classList.add('next-main-image');
            img.addEventListener('click', () => openModal(nextAlbumIndex));
            nextMainImagesWrapper.appendChild(img);
        }
    }



    function showMoreAlbums() {
        nextMainImagesWrapper.innerHTML = '';
        for (let i = 1; i <= albums.length; i++) {
            const nextAlbumIndex = (currentAlbumIndex + i) % albums.length;
            const mainImageData = albums[nextAlbumIndex][0]; // Перше зображення як основне
            const img = document.createElement('img');
            img.src = mainImageData.src;
            img.classList.add('next-main-image');
            img.addEventListener('click', () => openModal(nextAlbumIndex));
            nextMainImagesWrapper.appendChild(img);
        }
    }

    showMoreAlbumsBtn.addEventListener('click', showMoreAlbums);

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevAlbum);
    nextBtn.addEventListener('click', nextAlbum);
    prevImageBtn.addEventListener('click', prevImage);
    nextImageBtn.addEventListener('click', nextImage);
    backBtn.addEventListener('click', closeModal )

    showMoreBtn.addEventListener('click', function () {
        if (currentAlbumIndex < albums.length - 1) {
            currentAlbumIndex++;
            loadAlbum(currentAlbumIndex);
        } else {
            alert('No more albums to show');
        }
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    const watchAlbumBtns = document.querySelectorAll('.watch-album-btn');
    watchAlbumBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const albumIndex = parseInt(this.getAttribute('data-album-index'));
            openModal(albumIndex);
        });
    });

    

});


// const openBurger = document.getElementById('header-burg-btn').addEventListener('click', function(event) {
//     document.getElementById('burger-sect').classList.remove('is-hidden')
// })