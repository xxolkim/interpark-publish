// 모든 js는 html 태그를 로드 완료하고 실행해야 안전함
// 현재 .js 파일을 head 태그에서 불러들이므로 불안전 상태
// 오류가 날 확률이 무척 높음

// 이벤트를 실행할 target.addEventListener('이벤트타입', 실행 함수)
// 아래의 window 는 웹브라우저를 뜻함
// (약속: onload 절대로 소문자로 작성)

// *해석: 웹 브라우저에 html, css, js, image 등을 load 완료 하면 function 을 함
window.addEventListener("load", function () {
  // 글로 코딩 시나리오 작성을 먼저 해보기 : 의사 코드
  // 1. 외부 데이터를 불러오기
  // :  외부 데이터 파일명.json
  const fileName = "recommend.json";
  // 외부 데이터 가져올 때 작성법
  const xhr = new XMLHttpRequest();
  // 외부의 파일을 열어라
  // GET 방식으로 파일을 열어줌
  xhr.open("GET", fileName);
  // 실행
  xhr.send();
  // 데이터의 전송 상태를 체크
  xhr.onreadystatechange = function (event) {
    // 네트워크로 xhr 로 연결을 하면 연결 과정마다 readyState 가 바뀜
    // readyState 가 바뀐 상태를 onreadystatechange 로 확인 가능
    // event.target.readyState 를 보고서 할 일을 별도로 if 문에서 작성을 함
    if (event.target.readyState === XMLHttpRequest.DONE) {
      // 코드가 가독성이 떨어지므로 변수에 담기
      // 규칙은 const 부터 작성
      // const 가 문제가 된다면 let 으로 변경
      // * const 는 일정한 상수 값을 유지 / let 은 상수 값 변경 가능

      // event.target 에는 다양한 네트워크 결과가 담겨있음
      // 그중 우리는 결과 문자열을 보고싶음
      // 결과 문자열은 event.target.response 에 보관되어 있음
      // 그래서 변수에 담음
      const res = event.target.response;
      // res 를 전달해서 html 태그를 만듦
      // (데이터를 정리해서 전달하는 것이 관례)
      // 전달받은 문자열을 js 에서 사용하도록
      // JSON 데이터로 해석(parse)하여
      // 객체화 {원시데이터 묶음} 함
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  // html 태그를 만드는 기능
  function makeHtmlTag(_res) {
    // makeHtmlTag 를 연결해주는 매개 변수의 용도로 _res 를 사용
    // html 태그를 백틱을 이용해서 만듦
    let htmlRecommendTag = ``;
    // _res 에 담겨진 객체에서 total 을 보관
    // 우리가 몇번 반복(total)해야 하는지 아는 경우 for (모르는 경우 while)
    // for (초기값; 조건; 증감) {
    // 반복 하고 싶은 일
    // }
    for (let i = 0; i < _res.total; i++) {
      // 가독성이 떨어짐
      // ++ 증가, -- 감소
      const index = i + 1;
      // _res.good_1;
      // _res["good_2"];
      // _res["good_" + 3];
      const obj = _res["good_" + index];

      let tempTag = ``;

      // 마지막 json 에서는 url 만 읽어들임
      // 그렇지 않으면 일반적으로 모두 출력
      if (i === _res.total - 1) {
        tempTag = `
        <div class="swiper-slide">
        바로가기
        </div>
        `;
        // 바로가기 버튼을 출력
      } else {
        tempTag = `
        <div class="swiper-slide">
          <div class="recommend-slide-item">
            <a href="${obj.url}" class="recommend-link">
              <div class="recommend-img">
                <img src="${obj.image}" alt="${obj.desc}" />
              </div>
              <div class="recommend-info">
                <ul class="recommend-good-list">
                  <li>
                    <span class="recommend-good-info-price">
                      <b>${obj.discount === 0 ? "" : obj.discount + "%"}</b>
                      <em>${obj.price}</em>
                      원
                    </span>
                  </li>
                  <li>
                    <p class="recommend-good-info-desc">
                    ${obj.desc}
                    </p>
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      `;
        // 일반적인 내용을 출력
      }

      // htmlRecommendTag = htmlRecommendTag + tempTag;
      htmlRecommendTag += tempTag;
    }

    showHtmlTag(htmlRecommendTag);
  }

  // html 출력 전용 기능을 만들기
  function showHtmlTag(_html) {
    // 3. swiper 태그에 백틱을 배치
    const recommendSlide = ".recommend-slide .swiper-wrapper";
    const tag = document.querySelector(recommendSlide);
    tag.innerHTML = _html;

    makeSwiper();
  }

  function makeSwiper() {
    // 4. swiper 작동
    const swiperRecommend = new Swiper(".recommend-slide", {
      slidesPerView: 4,
      spaceBetween: 27,
      // 좌측, 우측 이동 버튼
      navigation: {
        nextEl: ".recommend-slide-wrap .slide-next-bt",
        prevEl: ".recommend-slide-wrap .slide-prev-bt",
      },
      // 4장씩 한번에 이동
      slidesPerGroup: 4,
    });
  }
});
