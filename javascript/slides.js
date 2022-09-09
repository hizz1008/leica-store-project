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
