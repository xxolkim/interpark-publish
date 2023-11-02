window.addEventListener("load", function () {
  const xh = new XMLHttpRequest();
  xh.open("GET", "visual.json");
  xh.send();
  xh.onreadystatechange = function (event) {
    //   console.log(event.target);
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const result = JSON.parse(event.target.response);
      // 문자열을 JS에서 사용하는 JSON 데이터로 변환
      console.log(result);
      // 현재 화면 출력에 활용을 하지는 않음
      makeVisualSlideHtml(result);
    }
  };

  function makeVisualSlideHtml(_data) {
    const visualRes = _data;

    // 출력을 시켜줄 문장을 만들기
    let visualHtml = "";

    // total 만큼 반복
    // for 은 반복을 하는데 True 인 경우만 반복
    for (let i = 1; i <= visualRes.total; i++) {
      let temp = `
      <div class="swiper-slide">
          <div class="visual-slide-item">
              <a href="${visualRes["visual_" + i].url}">
                  <img src="${visualRes["visual_" + i].file}" alt="${
        visualRes["visual_" + i].url
      }" />
              </a>
          </div>
      </div>
  `;
      console.log(temp);
      visualHtml += temp;
    }

    // 자료 출력 위치 지정
    const visualSlide = document.querySelector(".visual-slide .swiper-wrapper");
    visualSlide.innerHTML = visualHtml;

    var swiper = new Swiper(".visual-slide", {
      slidesPerView: 2,
      // 슬라이드 개수
      spaceBetween: 24,
      // 슬라이드 간격
      loop: true,
      // 슬라이드 무한 루프
      autoplay: {
        delay: 1000,
        // 슬라이드 넘어가는 대기 시간
        disableOnInteraction: false,
        // 사용자 터치 후 자동 실행 다시
      },
      speed: 500,
      // 이동 속도 (1000=1초)
      navigation: {
        nextEl: ".visual-slide-next",
        prevEl: ".visual-slide-prev",
      },
    });
  }
});
