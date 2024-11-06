// 타이핑 애니메이션 함수
function typeText(element, text, delay = 100, callback) {
    let charIndex = 0;
    element.style.visibility = "visible";
    element.textContent = "";

    const interval = setInterval(() => {
        element.textContent += text[charIndex];
        charIndex++;

        if (charIndex === text.length) {
            clearInterval(interval);
            if (callback) {
                element.style.borderRight = "none";
                callback();
            } else {
                element.classList.add("blinking-cursor");
            }
        }
    }, delay);
}

// 숫자 증가 애니메이션 함수
function animateCounters() {
    const counters = document.querySelectorAll('.num');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// 모달 열기 및 닫기 함수
function openModal(imageSrc) {
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// 초기화 및 애니메이션 시작
window.onload = function() {
    // 타이핑 애니메이션 실행
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    typeText(line1, "2024", 100, () => {
        typeText(line2, "Design", 100, () => {
            typeText(line3, "Portfolio", 100);
        });
    });

    // 숫자 증가 애니메이션 실행
    animateCounters();
};

// 스크롤 및 클릭 이벤트 추가
const sections = document.querySelectorAll('section');
let currentSection = 0;
let isScrolling = false;

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            isScrolling = false;
        }, 1200); // 1.2초 후 스크롤 가능
    }
}

let lastScrollTime = 0;

function handleScroll(event) {
    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < 1200 || isScrolling) return;

    lastScrollTime = currentTime;

    if (event.deltaY > 0) {
        currentSection++;
        if (currentSection >= sections.length) {
            currentSection = sections.length - 1;
        }
    } else {
        currentSection--;
        if (currentSection < 0) {
            currentSection = 0;
        }
    }

    scrollToSection(currentSection);
}

function handleClick() {
    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < 1200 || isScrolling) return;

    lastScrollTime = currentTime;

    currentSection++;
    if (currentSection >= sections.length) {
        currentSection = sections.length - 1;
    }

    scrollToSection(currentSection);
}

window.addEventListener('wheel', handleScroll);
window.addEventListener('click', handleClick);
