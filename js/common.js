/******** 제이쿼리 시작 *********/
/******** 제이쿼리 시작 *********/
/******** 제이쿼리 시작 *********/
$(function () {

  // const gnbLi = $("nav.gnb li");
  // let w = $(window).width();
  var desktop = false, laptop = false, tablet = false, mHorz = false, mVert = false;
  const mediaSet = [desktop, laptop, tablet, mHorz, mVert];

  // 미디어 사이즈 확인 메서드
  function chkMedia() {
    w = $(window).width();
    desktop = window.matchMedia('(width>=1200px)').matches;
    laptop = window.matchMedia('(width>=992px) and (width <1200px)').matches;
    tablet = window.matchMedia('(width>=768px) and (width <992px)').matches;
    mHorz = window.matchMedia('(width>=576px) and (width <768px)').matches;
    mVert = window.matchMedia('(max-width: 576px)').matches;
    return mediaSet;
  }




  /*************************  모바일 : 헤더 **************************/
  /*************************  모바일 : 헤더 **************************/
  /*************************  모바일 : 헤더 **************************/



  // mMenu gnb 스크롤 최상단일 때, contact 상자 표시
  $(".mMenu nav.gnb ul").on("load scroll drag", function () {
    if (mVert || mHorz) {
      contactSlide();
    }
  })


  // mMenu gnb 스크롤 최상단일 때, contact 상자 표시
  function contactSlide() {
    if ($(".mMenu nav.gnb ul").scrollTop() <= 20) {
      $(".mMenu .contact").addClass("on");
      // $(".mMenu .contact").slideDown();
    } else if ($(".mMenu nav.gnb ul").scrollTop() > 20) {
      $(".mMenu .contact").removeClass("on");
      // $(".mMenu .contact").slideUp();
    }
  }


  //모바일 : gnb depth1 클릭 시 depth2 활성화
  $(".mMenu nav.gnb>ul>li").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });


  //모바일 : 메뉴 오픈
  $(".menuBtn").on("click", function () {
    // $(".mMenu").css({ "z-index": 9999 });
    $(".mMenu").addClass("on");
    $("body").addClass("no-scroll");
    // $(".mMenu").removeClass("animate__slideOutRight");
    // $(".mMenu").css('--animate-duration', '0.5s');
  });

  //모바일 : 메뉴 닫기
  $(".closeBtn").on("click", function () {
    // $(".mMenu").css({ "z-index": 0 });
    // $(".mMenu").addClass("animate__slideOutRight");
    $(".mMenu").removeClass("on");
    $("body").removeClass("no-scroll");
    // $(".mMenu").css('--animate-duration', '0.5s');
  });




  /***********************************************/
  /************ 반응형 제어 메서드 ***************/
  /***********************************************/

  // 미디어 사이즈 확인 : 로딩 & resize시 
  $(window).on("load resize", function () {
    chkMedia(); //미디어쿼리 체크
    // initSizes();
    //whichHeader(); // 사이즈별 헤더 선택 (subBar || pcHeader)
    //mvSwiperInit(); // 메인뷰 스와이퍼 초기화
    // mvAniReset();
    snbCollapse(); //pc : 헤더 snb collapse
    pageDesc(); //세부페이지 설명 <p> 선택 section.page p.desc
  })




  //PC : 헤더 스크롤
  const pcGnbLi = $('ul.category > li').not(':last-of-type');
  const pcMenu = $(".pcMenu")
  const depth2bg = $(".depth2bg");
  // const lnb = $("ul.lnb");
  const lnbWrapper = $(".lnbWrapper");

  //마우스 오버 위치 옵저버 플래그
  let isPcGnbLi = false;
  //let isDepth2bg = false;
  let isLnbWrapper = false;
  // let isLnb = false;

  let isActivateDepth2 = false;

  pcGnbLi.on("mouseover", function () {
    isPcGnbLi = true;
    isActivateDepth2 = true;
    //console.log("isPcGnbLi"+isPcGnbLi);
    //console.log("isActivateDepth2"+isActivateDepth2);
  })
  // depth2bg.on("mouseover", function(){
  //   isDepth2bg = true;
  //   console.log("isDepth2bg"+isDepth2bg);
  // })
  // lnb.on("mouseover", function(){
  //   isLnb = true;
  //   console.log("isLnb"+isLnb);
  // })
  lnbWrapper.on("mouseover", function (e) {
    isLnbWrapper = true;
    console.log("버블링? " + e.bubbles);
  })
  pcGnbLi.on("mouseleave", function () {
    isPcGnbLi = false;
    console.log("isPcGnbLi" + isPcGnbLi);
    if (!isPcGnbLi && !isLnbWrapper && isActivateDepth2) {
      deactivateDepth2();
    }
    // if(!isPcGnbLi && !isDepth2bg && !isLnb && isActivateDepth2){
    //   deactivateDepth2();
    // }
  })
  // depth2bg.on("mouseleave", function(){
  //   isDepth2bg = false;
  //   console.log("isDepth2bg"+isDepth2bg);
  //   if(!isPcGnbLi && !isDepth2bg && !isLnb && isActivateDepth2){
  //     deactivateDepth2();
  //   }
  // })
  // lnb.on("mouseleave", function(){
  //   isLnb = false;
  //   console.log("isLnb"+isLnb);
  //   if(!isPcGnbLi && !isDepth2bg && !isLnb && isActivateDepth2){
  //     deactivateDepth2();
  //   }
  // })
  lnbWrapper.on("mouseleave", function () {
    isLnbWrapper = false;
    if (!isPcGnbLi && !isLnbWrapper && isActivateDepth2) {
      deactivateDepth2();
    }
  })

  //헤더 스크롤 비활성화
  function deactivateDepth2() {
    depth2bg.removeClass("on");
    pcMenu.removeClass("on");
    //lnb.removeClass("on off");
    pcGnbLi.removeClass("active");

    isActivateDepth2 = false;
    console.log("isActivateDepth2" + isActivateDepth2);
  }

  /* gnb 마우스오버일때 */
  pcGnbLi.on("mouseover", function () {

    let activate = $(this);
    let eq = $(this).index();


    //하단bg & lnb활성화
    if (!depth2bg.hasClass("on")) depth2bg.addClass("on");
    if (!pcMenu.hasClass("on")) pcMenu.addClass("on");
    //if(!lnb.hasClass("off") && !lnb.hasClass("on")){
    // lnb.addClass("off");
    //}

    pcGnbLi.each(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        //$(this).find("ul.lnb").toggleClass("on off");
      }
    });
    pcGnbLi.eq(eq).addClass('active');
    activate.addClass('active');
    //activate.find("ul.lnb").toggleClass("on off");
  })
  // $("ul.category > li:not(:last-of-type)").on("mouseleave", function () {
  //   pcGnbLi.each(function () {
  //     if ($(this).hasClass('active')) {
  //       $(this).removeClass('active');
  //       $(this).find("ul.lnb").toggleClass("on off");
  //     }
  //   });
  //   if ($(".depth2bg, .pcMenu").hasClass("on")) {
  //     // $(".depth2bg").slideUp("fast");
  //     // setTimeout(function () {
  //     //   $(".depth2bg, .pcMenu").removeClass("on");
  //     // }, 100);
  //   }
  // })



  //gnb 마우스오버 시 2depth 스크롤(백업)
  // pcGnbLi.on("mouseover", function () {
  //   let activate = $(this);
  //   let eq = $(this).index();
  //   if (!$(".depth2bg, .pcMenu").hasClass("on")) {
  //     $(".depth2bg, .pcMenu").addClass("on");
  //     // $(".pcMenu").fadeIn("fast");
  //     // $(".depth2bg").slideDown("fast");
  //   }
  //   pcGnbLi.each(function () {
  //     if ($(this).hasClass('active')) {
  //       $(this).removeClass('active');
  //       $(this).find("ul.lnb").toggleClass("on off");
  //     }
  //   });
  //   pcGnbLi.eq(eq).addClass('active');
  //   activate.addClass('active');
  //   activate.find("ul.lnb").toggleClass("on off");
  // })
  // $("ul.category > li:not(:last-of-type)").on("mouseleave", function () {
  //   pcGnbLi.each(function () {
  //     if ($(this).hasClass('active')) {
  //       $(this).removeClass('active');
  //       $(this).find("ul.lnb").toggleClass("on off");
  //     }
  //   });
  //   if ($(".depth2bg, .pcMenu").hasClass("on")) {
  //     // $(".depth2bg").slideUp("fast");
  //     // setTimeout(function () {
  //     //   $(".depth2bg, .pcMenu").removeClass("on");
  //     // }, 100);
  //   }
  // })



  //pc : 헤더 : 슬라이드
  function pcHeaderSlide() {
    $(document).on("mousewheel", function (event, delta) {
      if (delta > 0) {
        //올릴때
        $("header .pcMenu").removeClass("hide");
        $("header .subBar").addClass("slide");

      } else if (delta < 0) {
        //내릴때
        $("header .pcMenu").addClass("hide");
        $("header .subBar").removeClass("slide");

      }
    })
    if ($(window).scrollTop() <= 20) {
      $("header .pcMenu").addClass("slide");
    }
    $(document).on("scroll", function () {
      if ($(window).scrollTop() <= 20) {
        $("header .pcMenu").addClass("slide");
      }
    })

  }
  pcHeaderSlide()


  // PC : 헤더 : 1200이하에서, SNB Collapse (More버튼)
  function snbCollapse() {
    let snbItems = $(".pcMenu ul.snb li:not(:last-of-type)"); //li 5개
    let smSnbContainer = $(".sm-snb"); //li블록

    //가로 1200px 이하에서
    if ($(window).width() <= 1200) {
      //li블록이 비어있으면
      if (smSnbContainer.children().length === 0) {
        //li블록 안으로 li들을 넣는다
        snbItems.appendTo(smSnbContainer);
        $("span.more-toggle").removeClass("dn");
      }
    } else { // 1200 이상에서
      //li블록이 차있으면
      if (smSnbContainer.children().length > 0) {
        //ul.snb의 마지막 li 앞쪽으로 li들을 넣는다.
        smSnbContainer.children().insertBefore($(".pcMenu ul.snb li:last-of-type"));
        $("span.more-toggle").addClass("dn");
      }
    }
  }
  snbCollapse(); //로딩 시 실행

  // PC : 헤더 : SNB Collapse (More버튼)
  $(".more-toggle").on("click", function () {
    $(".sm-snb").toggleClass("open");
  });

  // PC : 헤더 : 1200이하에서, More버튼 이외의 공간 클릭 시 헤더 More블록 닫기
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".more-toggle").length) {
      if ($(".sm-snb").hasClass("open")) {
        $(".more-toggle").trigger("click");
      }
    }
  });

  // 세부페이지 : section.page p.desc 선택
  function pageDesc() {
    if (mVert || mHorz) {
      $("section.page p.desc.m").removeClass("dn");
      $("section.page p.desc.pc").addClass("dn");
    } else if (tablet || laptop || desktop) {
      $("section.page p.desc.m").addClass("dn");
      $("section.page p.desc.pc").removeClass("dn");
    }
  }




})



// Image Slide Carousel(car) 스타일 스와이퍼 동적 생성 ★
function createCarSwiper(containerId, slideContents) {
  // Clear existing slides
  $(`#${containerId} .swiper-wrapper`).empty();

  // Append slides dynamically
  $.each(slideContents, function (index, content) {
    $(`#${containerId} .swiper-wrapper`).append('<div class="swiper-slide">' + content + '</div>');
  });

  // Initialize Swiper
  return new Swiper(`#${containerId}`, {
    // init:false,
    loop: true,
    allowTouchMove: true,
    pagination: {
      el: `#${containerId} .swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `#${containerId} .swiper-next`,
      prevEl: `#${containerId} .swiper-prev`,
    },
    breakpoints: {
      768: {
        spaceBetween: 20,
      }
    },
    observer: true,
    observeParents: true,

  });
}








// 객실 타입별 설명부분만 추출하여 ul list화
/* function getRoomCardBody(swiperInstance, containerId){
  const subDescContainer = document.querySelector(`#${containerId} .sub-container`);
  const subDescWrapper = document.querySelector(`#${containerId} .sub-container ul.sub-wrapper`);
  const roomCardBody = document.querySelectorAll(`#${containerId} .card-body`);


  roomCardBody.forEach(function(cardBody) {
    const li = document.createElement('li');
    li.innerHTML = cardBody.innerHTML;
    // console.log(li.innerHTML);
    li.classList.add('sub-slide');
    subDescWrapper.appendChild(li);
  });

  const subprev = document.createElement('div');
  subprev.classList.add('sub-prev');
  subDescContainer.appendChild(subprev);
  const subnext = document.createElement('div');
  subnext.classList.add('sub-next');
  subDescContainer.appendChild(subnext);
  const subpagenation = document.createElement('div');
  subpagenation.classList.add('sub-pagenation');
  subDescContainer.appendChild(subpagenation);



  // sub swiper 생성
  const subSwiper = new Swiper(`#${containerId}>.sub-container`, {
    wrapperClass: 'sub-wrapper',
    slideClass: 'sub-slide',
    slidesPerView: "auto",
    effect: 'fade',
    loop: false,
    allowTouchMove: true,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    pagination: {
      el: `#${containerId} .sub-pagination`,
    },
    navigation: {
      nextEl: `#${containerId} .sub-next`,
      prevEl: `#${containerId} .sub-prev`,
    },
  });
  
  swiperInstance.controller.control = subSwiper;
  subSwiper.controller.control = swiperInstance;

}
window.getRoomCardBody = getRoomCardBody;
 */











//페이지 스타일 Fraction 표시 (hotel>room_list 1/4)
/* function showFracPage(swiperInstance, containerId) {
  console.log(containerId)
  var curPage = swiperInstance.pagination.el.textContent
  var fracPage = document.querySelector(`#${containerId} .fracPage`);

  var media = chkMedia2();
  if (media == "mHorz" || media == "mVert") {
    fracPage.textContent = curPage;
    if (swiperInstance.isEnd) {
      document.querySelector(".swiper-pagination-current").textContent = document.querySelector(".swiper-pagination-total").textContent;
    }
  } else {
    fracPage.textContent = '';
    swiperInstance.updateSize();
  }
} */



//pc사이즈 gnb show 애니메이션
function headerSlideDown() {
  $("header .pcMenu").removeClass("hide");
  $("header .subBar").addClass("slide");
}
window.headerSlideDown = headerSlideDown;


//헤더애니메이션
function showLnb() {
  $("ul.category li").on("mouseenter", function () {
    let target = $(this).attr("data-lnb");
    $(".lnbWrapper").children().removeClass("on");
    $(".lnbWrapper").children(`#${target}`).addClass("on");
  })

}
window.showLnb = showLnb;





//호텔:리스트: pc2단캐러셀 card-body텍스트 추출
function getRoomDesc(sectionId) {
  const ul = document.querySelector(`#${sectionId} .swiper-wrapper`);
  const textAll = document.querySelectorAll(`#${sectionId} .card-body`);
  textAll.forEach(function (cardBody) {
    const li = document.createElement('li');
    li.innerHTML = cardBody.innerHTML;
    // console.log(li.innerHTML);
    li.classList.add('swiper-slide');
    ul.appendChild(li);
  });
  console.log(ul.innerHTML);

  createTwinCaro(sectionId);
}
window.getRoomDesc = getRoomDesc;





//호텔:리스트: pc2단캐러셀 스와이퍼 객체 생성
function createTwinCaro(sectionId) {
  var imgSwiper = new Swiper(`#${sectionId} .swiper-img-container`, {
    slidesPerView: "auto",
    wrapperClass: 'swiper-img-wrapper',
    // slideClass: 'card',
    loop: false,
    spaceBetween: "20px",
    pagination: {
      el: `#${sectionId} .swiper-img-pagination`,
      type: 'fraction',
      // clickable: true,
    },
    navigation: {
      nextEl: `#${sectionId} .swiper-img-next`,
      prevEl: `#${sectionId} .swiper-img-prev`,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      }
    },
    // speed: 300,
    // resizeObserver:true,
    observeParents: true,
    observer: true,
  });
  var textSwiper = new Swiper(`#${sectionId} .swiper-text-container`, {
    wrapperClass: 'swiper-wrapper',
    slideClass: 'swiper-slide',
    loop: false,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    spaceBetween: 0,
    pagination: {
      el: `#${sectionId} .swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `#${sectionId} .swiper-next`,
      prevEl: `#${sectionId} .swiper-prev`,
    },
    speed: 500,
  })

  imgSwiper.controller.control = textSwiper;
  textSwiper.controller.control = imgSwiper;
  imgSwiper.on('resize',
    function () {
      imgSwiper.updateSize();
    });
  return textSwiper;
}
window.createTwinCaro = createTwinCaro;




//호텔:Overview: pc2단캐러셀 스와이퍼 객체 생성
function createTwinCaroV2(sectionId) {
  var imgSwiper = new Swiper(`#${sectionId} .swiper-img-container`, {
    slidesPerView: "auto",
    wrapperClass: 'swiper-img-wrapper',
    // slideClass: 'card',
    loop: false,
    spaceBetween: "10",
    pagination: {
      el: `#${sectionId} .swiper-img-pagination`,
      type: 'fraction',
      // clickable: true,
    },
    navigation: {
      nextEl: `#${sectionId} .swiper-img-next`,
      prevEl: `#${sectionId} .swiper-img-prev`,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    },
    // speed: 300,
    // resizeObserver:true,
    observeParents: true,
    observer: true,
  });
  var textSwiper = new Swiper(`#${sectionId} .swiper-text-container`, {
    wrapperClass: 'swiper-wrapper',
    slideClass: 'swiper-slide',
    loop: false,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    spaceBetween: 0,
    pagination: {
      el: `#${sectionId} .swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `#${sectionId} .swiper-next`,
      prevEl: `#${sectionId} .swiper-prev`,
    },
    speed: 300,
  })

  imgSwiper.controller.control = textSwiper;
  textSwiper.controller.control = imgSwiper;
  imgSwiper.on('resize',
    function () {
      imgSwiper.updateSize();
    });
  return textSwiper;
}
window.createTwinCaroV2 = createTwinCaroV2;


















// trackCarousel 스타일 스와이퍼 객체 생성 
// function createTrackCarSwiper(containerId) {
//   var swiperInstance = new Swiper(`#${containerId}`, {
//     loop: false,
//     allowTouchMove: true,
//     slidesPerView: "auto",
//     spaceBetween: 10,
//     pagination: {
//       el: `#${containerId} .swiper-pagination`,
//       type: 'fraction',
//       clickable: false,
//     },
//     navigation: {
//       nextEl: '#swiper1 .swiper-next',
//       prevEl: '#swiper1 .swiper-prev',
//     },
//     breakpoints: {
//       768: {
//         slidesPerView: "auto",
//         spaceBetween: 20,
//         loop: true,
//         pagination: {
//           type: 'bullets',
//           clickable: true,
//         },
//       }
//     },
//     observer: true,
//     observeParents: true,
//   });



//   return swiperInstance;
// }
// window.createTrackCarSwiper = createTrackCarSwiper;






let media;
// 미디어 사이즈 확인 메서드 ★★★★★
function chkMedia2() {
  w = $(window).width();

  if (window.matchMedia('(width>=1200px)').matches) {
    media = "desktop";
    // return "desktop";
  } else if (window.matchMedia('(width>=992px) and (width <1200px)').matches) {
    media = "laptop";
    // return "laptop";
  } else if (window.matchMedia('(width>=768px) and (width <992px)').matches) {
    media = "tablet";
    // return "tablet";
  } else if (window.matchMedia('(width>=576px) and (width <768px)').matches) {
    media = "mHorz";
    // return "mHorz";
  } else {
    media = "mVert";
    // return "mVert";
  }
  return media;
}
window.chkMedia2 = chkMedia2;

//카드 배열 그리드리스트 || 아코디언 선택 메서드 ★★★★★
function accoOrList(accoListId) {

  if (media == "mHorz" || media == "mVert") {
    if ($(`#${accoListId}`).accordion("instance") == undefined) {
      //리스트 아코디언 인스턴스 생성
      $(`#${accoListId}`).accordion({
        active: 0,
        animate: 300,
        icons: {
          "header": "ui-icon-custom-off",
          "activeHeader": "ui-icon-custom-on"
        }
      });
    } else {
      //.acco-body 높이 재계산
      $(`#${accoListId}`).accordion("refresh");
    }
  } else {
    if (!($(`#${accoListId}`).accordion("instance") == undefined)) {
      //리스트 그리드
      $(`#${accoListId}`).accordion("destroy");
    }
  }
}
window.accoOrList = accoOrList;

//모바일 or pc 헤더 선택
function whichHeader() {
  if (media == "mHorz" || media == "mVert") {
    // $(".subBar").show();
    $(".pcMenu").hide();
    // $(".pcMenu").addClass("dn");
  } else if (media == "tablet" || media == "laptop" || media == "desktop") {
    $(".pcMenu").show();
    // $(".subBar").hide();
  }
}
window.whichHeader = whichHeader;



// 포함시설 카드 동적 생성
function FacilityCard(title, img, cardTexts) {
  this.title = title;
  this.img = img;
  this.cardTexts = cardTexts;
}
window.FacilityCard = FacilityCard;

// accoCardList 동적 생성 : 카드 리스트 만들기
const createCard = (cardInfoList, pass) => {
  let createdCardList = [];

  cardInfoList.map((cardInfo) => {
    let element = "<h3>" + cardInfo.title + "</h3>";
    element += '<div class="acco-body card-wrap">';
    element += '<div class="card">';
    element += "<div class='img-wrap'><img src='../../resource/img" + pass + cardInfo.img + "' class='card-img-top growup' alt='...'></div>";
    element += '<div class="card-body">';
    element += '<h5 class="card-title">' + cardInfo.title + '</h5>'
    element += cardInfo.cardTexts; //<p class='card-text'>
    element += '</div> </div> </div>';
    createdCardList.push(element);
  });
  return createdCardList;
}

// 포함시설 리스트를 탭 페이지로 삽입
function insertFacilityCardList(accoListId, cardInfoList, pass) {
  console.log(pass);
  let createdCardList = createCard(cardInfoList, pass);
  $(`#${accoListId}`).append(createdCardList);
}
window.insertFacilityCardList = insertFacilityCardList;


//이미지 리스트를 Swiper의 각 슬라이드로 생성 (only img 캐러셀 car스타일)
const addImgSlides = (imgList, pass) => {
  let slides = [];
  imgList.map((img) => {
    let element = "<p class='fullsize-img-wrap'><img src='../../resource/img" + pass + img + "'</p>";
    slides.push(element);
  })
  return slides;
}
window.addImgSlides = addImgSlides;


//3column 리스트 ScrollTrigger 애니메이션
function resetScrollTriggers(target) {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 모든 ScrollTrigger를 초기화

  if (media == "mVert" || media == "mHorz") return false; //모바일이면 종료
  const activeCards = $(target).find('.card-wrap');

  //애니메이션 동작 설정
  activeCards.each(function (index, card) {
    gsap.fromTo(card, { opacity: 0, yPercent: 30 }, {
      duration: 0.5,
      delay: (index % 3) * 0.2,
      opacity: 1,
      yPercent: 0,
      scrollTrigger: {
        trigger: card,
        markers: false,
        start: "top bottom",
        end: "bottom 20%",
        toggleActions: "play none none none"
      }
    });
  });
}
window.resetScrollTriggers = resetScrollTriggers;


// pc: overview페이지 메인뷰 텍스트 애니메이션
function overviewFullScreenTextAni() {

  if (media == "mVert" || media == "mHorz") return false; //모바일이면 종료

  const fullScreen = $(".full-screen");
  const h2Category = $(".full-screen h2.category");
  const pDesc = $(".full-screen p.desc");

  gsap.from(h2Category, {
    duration: 0.8,
    yPercent: -30,
    opacity: 0,
    scrollTrigger: {
      trigger: fullScreen,
      markers: false,
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none none"
    }
  });

  gsap.from(pDesc, {
    duration: 0.8,
    yPercent: 30,
    opacity: 0,
    scrollTrigger: {
      trigger: fullScreen,
      markers: false,
      start: "top bottom",
      end: "bottom top",
      toggleActions: "play none none none"
    }
  });
}
window.overviewFullScreenTextAni = overviewFullScreenTextAni;



// pc: overview페이지 캐러셀 텍스트 애니메이션
// 텍스트 클래스 모두에 animate__animated 추가
// 첫 슬라이드 : 초기 부여 애니메이션 제외
// 나머지 슬라이드 : Out시 애니메이션 넣어두기
function overviewCaroTextAni(textSwiper, sectionId) {

  if (media == "mVert" || media == "mHorz") return false; //모바일이면 종료

  let prev = null;
  let now = null;
  const title = $(`#hotel.contents #${sectionId} .swiper-text-container .swiper-slide h5.card-title`)
  const text = $(`#hotel.contents #${sectionId} .swiper-text-container .swiper-slide p.card-text`)

  //기존 슬라이드 out
  textSwiper.on('transitionStart', function () {
    prev = textSwiper.previousIndex;
    title.eq(prev).removeClass('animate__slideInDown');
    title.eq(prev).addClass('animate__slideOutUp');
    text.eq(prev).removeClass('animate__fadeInUp');
    text.eq(prev).addClass('animate__fadeOutDown');
  })

  //새 active슬라이드 in
  textSwiper.on('transitionEnd', function () {
    now = textSwiper.activeIndex;
    title.eq(now).removeClass('animate__slideOutUp');
    title.eq(now).addClass('animate__slideInDown');
    text.eq(now).removeClass('animate__fadeOutDown');
    text.eq(now).addClass('animate__fadeInUp');
  })

}
window.overviewCaroTextAni = overviewCaroTextAni;




// pc: hotel : overview페이지 : 캐러셀 섹션 스크롤 트리거
function overviewCaroScrollTrigger() {

  if (media == "mVert" || media == "mHorz") return false; //모바일이면 종료

  const hotelOverviewCaro = $("section.hotelOverviewCaro");

  hotelOverviewCaro.each(function (index, box) {
    gsap.from(box, {
      duration: 0.6,
      yPercent: 10,
      opacity: 0,
      scrollTrigger: {
        trigger: box,
        markers: false,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play complete none none"
      }
    })
  })

}
window.overviewCaroScrollTrigger = overviewCaroScrollTrigger;



// pc : hotel  : overview페이지 : 배경 사각 parallel
function hotelBgRectParallel() {
  const parallels = $('#hotel.contents .bgRect');

  parallels.each(function (i, rect) {
    gsap.fromTo(rect, {
      yPercent: -50,
    }, {
      yPercent: -150,
      ease: "power3.out",
      duration: 0.5,
      scrollTrigger: {
        trigger: rect,
        start: "top bottom",
        end: "bottom top",
        markers: false,
        scrub: true,
      }
    })
  })

}
window.hotelBgRectParallel = hotelBgRectParallel;


// 부드러운 스크롤 효과
function smoothScroll() {
  const lenis = new Lenis();

  lenis.on('scroll', (e) => {
    // console.log(e);
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
window.smoothScroll = smoothScroll;


// 최상단으로 이동 메서드
function goToTop() {
  // window.scrollTo(0,0);
  document.documentElement.scroll(0, 0);
  if (chkMedia2() == "tablet" || chkMedia2() == "laptop" || chkMedia2 == "desktop") {
    headerSlideDown();
  }

}
window.goToTop = goToTop;



/**** contact : 문의하기 모달창 ******/
/**** contact : 문의하기 모달창 ******/
/**** contact : 문의하기 모달창 ******/



/* contact : EmailJs 발송 */
function submitEmailJs() {
  emailjs.init({
    publicKey: 'ANALmNfMIjs9dAW1W',
  });

  $('input[name=contact_submit]').on("click", function (e) {
    e.preventDefault();

    //메일로 발송할 내용을 담은 객체 생성
    //각 요소는 emailJS에서 설정한 템플릿과 동일한 명으로 작성!
    var contact = {
      contact_subject: $('input[name=contact_subject]').val(),
      contact_message: $('textarea[name=contact_message]').val(),
      contact_username: $('input[name=contact_username]').val(),
      contact_useremail: $('input[name=contact_useremail]').val(),
      contact_userphone: $('input[name=contact_userphone]').val()
    };



    //emailjs.send('service ID', 'template ID', 보낼 내용이 담긴 객체)
    //메일 발송
    emailjs.send('service_qw7xalg', 'template_qmniqxk', contact)
      .then(function (response) {
        console.log('contact SUCCESS!', response.status, response.text);
      }, function (error) {
        console.log('contact FAILED...', error);
      });

    $("#contact_window").dialog("close");
  });

  //버튼 클릭 이벤트 트리거
  $('input[name=contact_submit]').trigger("click");

}
window.submitEmailJs = submitEmailJs;





// contact : 모달 초기화 = 인스턴스 생성
function contactInit() {
  contact_window = $("#contact_window").dialog({
    autoOpen: true, //개발완료 후 false로 바꿀 것
    // height: 400,
    modal: true,
    resizable: false,
    draggable: false,
    classes: {
      "ui-dialog": "contact_window",
      "ui-dialog-content": "contact_body"
    },
    buttons: {
      "문의하기": submitEmailJs,
      // Cancel: function() {
      //   contact_window.dialog( "close" );
      // }
    },
    close: function () {
      form[0].reset();
      // allFields.removeClass("ui-state-error");
    }
  });
  // console.log(contact_window);
  contactWidth();
  $(".contact_window").css({ "position": "relative", "left": "0px", "margin": "auto" });
  // return $("#contact_window").dialog("instance");

  //폼 기본동작 방지
  form = $("#contact_window").find("form").on("submit", function (event) {
    event.preventDefault();
  });

}
window.contactInit = contactInit;


// contact : 브라우저 너비에 따라 모달창 크기를 조정
function contactWidth() {
  let curMedia = chkMedia2();
  if (curMedia == "mVert" || curMedia == "mHorz") {
    contact_window.dialog("option", "width", "100%");
    // contact_window.dialog("option", "height", "auto");
  } else {
    contact_window.dialog("option", "width", 650);
    // contact_window.dialog("option", "height", "100vh");
  }
}
window.contactWidth = contactWidth;


// contact : 창 열기
function contactOpen() {
  console.log(contact_window)
  contact_window.dialog("open");
}
window.contactOpen = contactOpen;













