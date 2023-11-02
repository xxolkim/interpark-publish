window.addEventListener("load", function () {
  const fileName = "tour.json";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", fileName);
  xhr.send();

  xhr.onreadystatechange = function (event) {
    if (event.target.readyState === XMLHttpRequest.DONE) {
      const res = event.target.response;
      const json = JSON.parse(res);
      makeHtmlTag(json);
    }
  };

  function makeHtmlTag(_res) {
    let htmlTourTag = ``;
    for (let i = 0; i < _res.total; i++) {
      const index = i + 1;
      const obj = _res["good_" + index];
      const tempTag = `
      <div class="swiper-slide">
      <div class="tour-slide-item">
        <a href="${obj.url}" class="tour-link">
          <div class="tour-img">
            <img src="${obj.image}" alt="${obj.desc}" />
          </div>
          <div class="tour-info">
            <strong class="tour-badge">${obj.badge}</strong>
            <ul class="tour-good-list">
              <li>
                <span class="tour-good-info"
                  >${obj.option}</span
                >
              </li>
              <li>
                <p class="tour-good-info-desc">
                  ${obj.desc}
                </p>
              </li>
              <li>
                <span class="tour-good-info-price"
                  ><b class="black">${obj.price}</b>원~</span
                >
              </li>
            </ul>
          </div>
        </a>
      </div>
    </div>
      `;
      htmlTourTag += tempTag;
    }

    showHtmlTag(htmlTourTag);
  }

  function showHtmlTag(_html) {
    const TourSlide = ".tour-slide .swiper-wrapper";
    const tag = document.querySelector(TourSlide);
    console.log(tag);
    tag.innerHTML = _html;
    makeSwiper();
  }

  function makeSwiper() {
    const swiperTour = new Swiper(".tour-slide", {
      slidesPerView: 3,
      spaceBetween: 26,
      navigation: {
        nextEl: ".tour-slide-wrap .slide-next-bt",
        prevEl: ".tour-slide-wrap .slide-prev-bt",
      },
      slidesPerGroup: 3,
    });
  }
});
