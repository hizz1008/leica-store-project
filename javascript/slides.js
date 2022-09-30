const slides = document.querySelector('.hero_slides_container');
//슬라이드의 left 위치값을 변경하여 이동시킴으로 전체 슬라이드컨테이너를 가져왔다
const slidesImg = document.querySelectorAll('.hero_slides_container li');
const slideCount = slidesImg.length;
//슬라이드 이미지의 개수를 구하기 위해 가져옴
const slideTitle = document.querySelectorAll('.hero_slide-title > li');
//슬라이드 현재 위치를 표시하기 위한 하단 텍스트 버튼 값
let currentIdx = 1;
//슬라이드마다 번호를 붙혀주기 위한 기본값

function onTimeSlide() {
  if (currentIdx <= slideCount) {
    //슬라이드가 이미지를 벗어나지 않도록 하기 위해 작성
    const offset = 100 * (currentIdx - 1);
    slides.style.left = `${-offset}vw`;
    //슬라이드 컨테이너의 left값이 100단위로 -가 될 수 있게 작성
    slideTitle.forEach((i) => i.classList.remove('active'));
    slideTitle[currentIdx - 1].classList.add('active');
    //반복문으로 슬라이드 타이틀 li들중 현재 출력되는 이미지에 맞는 색상을 같게 함
    currentIdx += 1;
  } else {
    currentIdx = 1;
    //슬라이드가 이미지를 벗어나지 않고 다시 돌아오게 하기 위해 값을 재할당
  }
}
onTimeSlide();
setInterval(onTimeSlide, 5000);
//바로 실행하여 딜레이가 없게 5초마다 반복

function onSlide() {
  for (let i = 0; i <= slideCount; i++) {
    slideTitle[i] &&
      slideTitle[i].addEventListener('click', () => {
        currentIdx = i + 1;
        const offset = 100 * (currentIdx - 1);
        slides.style.left = `${-offset}vw`;
        slideTitle.forEach((i) => i.classList.remove('active'));
        slideTitle[currentIdx - 1].classList.add('active');
      });
  }
}

onSlide();

const slideProduct = document.querySelector('.slide-product');
const slideProductSlides = document.querySelector('.slide-product_slides');
const slideProductUl = document.querySelector(
  '.slide-product_slides_container'
);
const slideProductLi = document.querySelectorAll(
  '.slide-product_slides_container li'
);
const slideProductCount = slideProductLi.length;
const slideProductWidth = 620;
const slideProductMargin = 40;
let slideProductCurrentIdx = 0;

function setTimeoutAnimatedClass() {
  setTimeout(() => {
    slideProductUl.classList.remove('slide-product_animated');
    slideProductCurrentIdx = 0;
    slideProductUl.style.left = '0px';
  }, 50);
  setTimeout(() => {
    slideProductUl.classList.add('slide-product_animated');
  }, 150);
}

function nextMove() {
  slideProductCurrentIdx++;
  if (slideProductCurrentIdx <= slideProductCount - 1) {
    //슬라이드가 마지막 이미지를 벋어나지 않도록 하기 위해 작성
    const offset = 660 * slideProductCurrentIdx;
    slideProductUl.style.left = `${-offset}px`;
    //드래그할 경우 -660만큼 앞으로 이동
  } else {
    //슬라이드가 이미지를 벗어나지 않고 다시 돌아오게 하기 위해 값을 재할당
    setTimeoutAnimatedClass();
  }
}
//드래그 슬라이드를 5s 뒤에 자동으로 넘어가게 실행
setInterval(nextMove, 5000);

function prevMove() {
  slideProductCurrentIdx--;
  if (slideProductCurrentIdx >= -slideProductCount + 4) {
    //슬라이드가 마지막 이미지를 벋어나지 않도록 하기 위해 작성

    const offset = 660 * slideProductCurrentIdx;

    slideProductUl.style.left = `${-offset}px`;
    //슬라이드 컨테이너의 left값이 100단위로 -가 될 수 있게 작성
  } else {
    setTimeoutAnimatedClass();
    //슬라이드가 이미지를 벗어나지 않고 다시 돌아오게 하기 위해 값을 재할당
  }
}

slideProduct.addEventListener('mousedown', (e) => {
  pressed = true;
  startX = e.offsetX - slideProductUl.offsetLeft;
  slideProductUl.style.transition = 'none';
});

window.addEventListener('mouseup', () => {
  pressed = false;
  slideProductUl.style.transition = 'all 0.5s ease-out';
});

slideProduct.addEventListener('mousemove', (e) => {
  if (!pressed) return;
  e.preventDefault();
  x = e.offsetX;
  slideProductUl.style.left = `${x - startX}px`;
});

let startPoint = 0;
let endPoint = 0;

// PC 클릭 이벤트 (드래그)
slideProduct.addEventListener('mousedown', (e) => {
  startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
});

slideProduct.addEventListener('mouseup', (e) => {
  endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
  if (startPoint < endPoint) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove();
  } else if (startPoint > endPoint) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove();
  }
});

makeClone();

function makeClone() {
  // 슬라이드 이미지 클론 복사
  for (let i = 0; i < slideProductCount; i++) {
    let cloneSlide = slideProductLi[i].cloneNode(true);
    // 슬라이드 갯수만큼 클론노드 사용
    cloneSlide.classList.add('clone');
    // 슬라이드에 클론 클래스 추가
    slideProductUl.appendChild(cloneSlide);
    // 기존 이미지 뒤에 생성
  }
  for (let i = slideProductCount - 1; i >= 0; i--) {
    let cloneSlide = slideProductLi[i].cloneNode(true);
    cloneSlide.classList.add('clone');
    slideProductUl.prepend(cloneSlide);
    // 기존 이미지 앞에 생성
  }
  updateWidth();
  setInitialPos();
  setTimeout(() => {
    slideProductUl.classList.add('slide-product_animated');
  }, 100);
}
function updateWidth() {
  // 클론 이미지가 추가된 슬라이드의 넓이를 구하는 함수
  slideProductUl.style.width =
    (slideProductWidth + slideProductMargin) * slideProductCount -
    slideProductMargin +
    'px';
  const slideProductLi = document.querySelectorAll(
    '.slide-product_slides_container li'
  );
  let newslideCount = slideProductLi.length;

  let newWidth =
    (slideProductWidth + slideProductMargin) * newslideCount -
    slideProductMargin +
    'px';

  slideProductUl.style.width = newWidth;
}
function setInitialPos() {
  const initialTranslateValue =
    -(slideProductWidth + slideProductMargin) * slideProductLi.length;

  slideProductUl.style.transform =
    'translateX(' + initialTranslateValue + 'px)';
}
