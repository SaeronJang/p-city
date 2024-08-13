/******** 제이쿼리 시작 *********/
/******** 제이쿼리 시작 *********/
/******** 제이쿼리 시작 *********/
$(function () {

  const gnbLi = $("nav.gnb li");
  let w = $(window).width();
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
  }




  /*************************  모바일 : 헤더 **************************/
  /*************************  모바일 : 헤더 **************************/
  /*************************  모바일 : 헤더 **************************/



  //리사이즈 시 실행시킬 메서드 모두 담기 ★★★★★★★★
  const beMobileSize = function () {
    $(".mNavbar").show();// ★★★★★★★★★★★★★★★★★★헤더 고칠부분
    $(".pcMenu").hide();
    // mainViewStyleReset()
    // mainViewSwiper.enable();

    // mainViewSwiper.update();
    // mainViewSwiper.updateAutoHeight(0);
    // mainViewSwiper.updateSlidesClasses();
    // mainViewSwiper.updateSize();

    // $(':root').css({ '--wImgHeight': $('.mainViewContainer').height() });
  }

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


  //메인뷰 : 텍스트애니메이션 animate__animated 클래스명 제어
  const animate__animated = function () {
    if (mVert || mHorz || tablet) {
      $(".descBox").removeClass("animate__animated");
      $(".overview").removeClass("animate__animated");
    } else if (laptop || desktop) {
      $(".descBox").addClass("animate__animated");
      $(".overview").addClass("animate__animated");
    }
  }


  //모바일 or pc 헤더 선택
  const whichHeader = function () {
    if (mVert || mHorz) {
      $(".mNavbar").show();
      $(".pcMenu").hide();
    } else if (tablet || laptop || desktop) {
      $(".pcMenu").show();
      $(".mNavbar").hide();
    }
  }


  //메인뷰 : 스와이퍼 객체생성
  var mvPicSwiper = undefined;
  var mvTxtSwiper = undefined;
  function mvSwiperInit() {
    if ((mVert || mHorz || tablet) && (mvPicSwiper == undefined) && (mvTxtSwiper == undefined)) {
      mvPicSwiper = new Swiper('.mvPicSwiper', {
        // init: false,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        direction: 'horizontal',
        pagination: {
          el: '.mv-page',
          clickable: true,
        },
        on: {
          resize: function () {
            mvPicSwiper.update();
          }
        }
      });
      mvTxtSwiper = new Swiper('.mvTxtSwiper', {
        // init: false,
        slidesPerView: 1,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        direction: 'horizontal',
        pagination: {
          el: '.mv-page',
          clickable: true,
        },
        on: {
          resize: function () {
            mvTxtSwiper.update();
          }
        }
      });
      mvPicSwiper.slideTo(0, 0, false);
      mvTxtSwiper.slideTo(0, 0, false);
      //메인뷰 스와이퍼 연동
      mvPicSwiper.controller.control = mvTxtSwiper;
      mvTxtSwiper.controller.control = mvPicSwiper;

    } else if ((laptop || desktop) && mvPicSwiper != undefined && mvTxtSwiper != undefined) {
      mvPicSwiper.destroy();
      mvPicSwiper = undefined;
      mvTxtSwiper.destroy();
      mvTxtSwiper = undefined;
    }
  }




  // 모바일 : 헤더 : 리사이즈 시 페이지네이션 위치 조정
  function updatePaginationPosition() {
    // var windowHeight = $(window).height();
    // var paginationHeight = $('.mvTxtSwiper .swiper-pagination').outerHeight();
    // $('.swiper-pagination').css({'bottom': (windowHeight - paginationHeight) / 2, "position":"absolute"});

    var mvH = $("section.mainView").height();
    var paginationHeight = $('.mvPicSwiper .swiper-pagination').outerHeight();
    $('.mvPicSwiper .swiper-pagination').css({ 'bottom': 0, 'padding-bottom': '10px' });
  }





  //메인뷰 사이즈 초기화
  const initSizes = function () {
    winW = $(window).width();
    winH = $(window).height();

    //mainSizing();

    updatePaginationPosition();


    // // mvPicSwiper.slideTo(0, 0, false);
    // // mvTxtSwiper.slideTo(0, 0, false);

    // // mvPicSwiper.disable();
    // // mvTxtSwiper.disable();
    // $(".mvPicSlide").width($(window).width() * 0.2);
    // $(".mvTxtSlide").width($(window).width() * 0.2);
    // // mvPicSwiper.updateSlidesClasses();
    // // mvTxtSwiper.updateSlidesClasses();
    // // mvPicSwiper.updateSize();
    // // mvTxtSwiper.updateSize();
    // } else {
    // $(".mvPicSlide").width($(window).width());
    // $(".mvTxtSlide").width($(window).width());

    // $(".mvPicSlide").width($(window).width() / 5.0);
    // $(".mvTxtSlide").width($(window).width() / 5.0);
    // chkMedia();
    // $(".wImg").height($(window).height());
  }


  /***********************************************/
  /************ 반응형 제어 메서드 ***************/
  /***********************************************/

  // 미디어 사이즈 확인 : 로딩 & resize시 
  $(window).on("load resize", function () {
    chkMedia();
    initSizes();
    animate__animated();
    whichHeader();
    mvSwiperInit();
    // mvAniReset();
    foScrollTriggers();
    pceScrollTriggers();
    memScrollTriggers();
     resetOverviewTxt()
  })

  function resetOverviewTxt(){
    chkMedia();
    if (mVert || mHorz || tablet){
      $(".overview").show();
    } else {
      $(".overview").hide();
    }
  }


  function overviewTxtBlock(){
    
  }

  //메인뷰(pc) : mouseenter 애니메이션
  let curMainView = null;
  let hoverActive = false; //hover이벤트 옵저버
  $(".mainView").on("mouseenter mousemove", function (ev) {
    if (mVert || mHorz || tablet) return false;
    let slides = $(".mvTxtSlide");
    let h = $(this).height();
    let wImg = $(".wImg");
    wImg.height(wImg.parent().height());
    wImg.css({ "z-index": 9 });
    winW = $(window).width();
    let idx = Math.floor(ev.pageX / winW * 5);

    //새로 다른 이미지로 옮겼을 때 애니메이션 시작 시작
    if (curMainView == null || curMainView != idx) {

      curMainView = idx;
      hoverActive = true;
      $(".descBox").stop(true, false).hide(); // 모든 descBox 숨김
      // slides.find('.overview').css({ "display": "none" });
      slides.find('.overview').hide();
      slides.each((i, slide) => {
        if (idx == i) {
          setTimeout(function () {
            if (hoverActive && curMainView === idx) {
              $("mvTxtContainer").css("z-index", 99);

              slides.eq(i).find('.descBox').css("display", "block");
              slides.eq(i).find('.descBox').show();
              console.log(i);
              slides.eq(i).find('.overview').show();
            }
          }, 200);
        }
      });

      //이미지가 이미 들어있다면 비우기
      wImg.empty();
      playingMainView(wImg, idx);
      // setTimeout(function () {
      wImg.stop(true, true)
        .animate({ "left": 0, "width": "100%", "background-position-x": 0, "background-size": "400px 400px" }, 500, "easeInOutQuint");
      // .animate({"background-size":"450px 450px"},8000);
      // setTimeout(function () {
      //   $("section.mainView").css({ "overflow": "hidden" });
      //   wImg.css({ "transform": "scale(1.08)", "transition": "transform 8s cubic-bezier(.4,.03,.62,.95)", "overflow": "hidden" });

      // }, 510);

      // }, 300);//배경 확대 수정 필요
    }
  });

  //메인뷰(pc) : 애니메이션 초기 설정
  function playingMainView(wImg, idx) {
    //애니메이션 설정
    //초기위치
    wImg.width("20%");
    let x = wImg.width() * idx;
    wImg.offset({ "top": 0, "left": x });
    wImg.css({ "position": "absolute", "background-position-x": -x, "background-position-y": "center", "background-image": "url('./resource/img/wImg_" + idx + ".jpg')", "width": "20%", "background-size-x": "100%", "z-index": "9", "transform": "scale(1)" });
    wImg.stop(true, false).show(); //********************다시켜기!
  }


  //메인뷰(pc) : 애니메이션 종료 이벤트
  $(".mainView").on("mouseleave", function (ev) {
    if (mVert || mHorz || tablet) return false;
    hoverActive = false;
    curMainView = null;
    $(".wImg").stop(true, false).hide();
    $(".overview").stop(true, true).slideUp(100);
    let delay = 0;
    $(".descBox").each(function () {
      let desc = $(this);
      desc.stop(true, true).hide();
      delay += 200;
      setTimeout(function () {
        if (!hoverActive) {
          desc.stop(true, true).show();
        }
      }, delay);
    });
  });


  //메인뷰(pc) : 리사이즈 시 애니메이션 리셋
  function mvAniReset() {
    hoverActive = false;
    curMainView = null;
    $(".wImg").stop(true, true).hide();
    $(".descBox").stop(true, true).show();
  }


  //이미지 갤러리 : 스와이퍼 객체 생성
  const galSwiper = new Swiper('.galSwiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.gal-page',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.gal-next',
      prevEl: '.gal-prev',
    },
    autoplay: {
      delay: 5000,
    }
  });




  //멤버쉽 : 큰사이즈에서만 backdrop 적용
  $(".mem .memContainer ul li.card").on("mouseenter", function () {
    if (tablet || laptop || desktop) {
      $(this).addClass("active");
    }
  });

  $(".mem .memContainer ul li.card").on("mouseleave", function () {
    $(".mem .memContainer ul li.card").removeClass("active");
  });



  //pc : footer : FamilyBox 위치, 크기 설정
  // function fbPosFunc() {
  //   fbW = $(".footer .upside .innerBox").width();
  //   fbT = $(".familySite").offset().top - $(".familyBox").height() - 20;
  //   fbL = $(".footer .upside .innerBox").offset().left + 20;
  //   var winW = $(window).width();
  //   $(".fbPos").css({ "top": fbT, "left": fbL, "width": fbW });
  //   // $(".familyBox").toggleClass("fbPos");
  //   // $(".familyBox").toggleClass("fbPos");
  // }



  //footer : FamilySite 버튼 작동
  $(".aFamily").on("click", function (ev) {

    //기본 이동 방지
    ev.preventDefault();
    $(this).parent().toggleClass("on");

    //창 위치
    if (mVert || mHorz) {
      $("body").toggleClass("no-scroll");
    } else {
    }


    if ($(".familyBox").hasClass("dn")) {
      $(".familyBox").removeClass("dn");
      // fbPosFunc();
      setTimeout(function () {
        $(".familyBox").addClass("on");
        // $(".familyBox").toggleClass("fbPos");
      }, 10);
    } else {
      $(".familyBox").removeClass("on");
      if (mVert || mHorz) {
        setTimeout(function () {
          $(".familyBox").addClass("dn");
        }, 510);
      } else {
        setTimeout(function () {
          $(".familyBox").addClass("dn");
        }, 1);
      }
    }
  });



  //footer : FamilySite close 버튼 작동
  $(".familyBox .closeBtn").on("click", function () {
    if ($(".familySite").hasClass("on")) $(".familySite").removeClass("on");
    $(".familyBox").removeClass("on");
    setTimeout(function () {
      $(".familyBox").addClass("dn");
    }, 510);
    // $(".familyBox").animate({"left":"100%"}, 300, "easeInSine");
    // $(".familyBox").animate({"left":"100%"}, {duration:500, easing:"customBezier"});
  });


  // familyBox 이외의 공간 클릭 시 familyBox 닫기
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".familyBox, .aFamily").length) {
      if ($(".familyBox").hasClass("on")) {
        $(".familyBox").removeClass("on");
        $(".aFamily").parent().removeClass("on");
        if (mVert || mHorz) {
          setTimeout(function () {
            $(".familyBox").addClass("dn");
          }, 510);
        } else {
          setTimeout(function () {
            $(".familyBox").addClass("dn");
          }, 1);
        }
        $("body").removeClass("no-scroll");
      }
    }
  });

  //footer : 사이트 카테고리 클릭 시 사이트 항목 활성화
  $(".familyBox nav.gnb>ul>li").on("click", function () {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
  });




  //헤더 : 헤더 배경색 변경
  $(window).on("load scroll drag", function (ev) {
    if ((mHorz || mVert)) {
      if (($(window).scrollTop() >= $("section.mainView").height() - 50)) {
        $(".mNavbar").addClass("dark");
      } else if (($(this).scrollTop() < $("section.mainView").height())) {
        $(".mNavbar").removeClass("dark");
      }
    } else if ((tablet || laptop || desktop)) {
      if (($(window).scrollTop() >= 100)) {
        $(".pcMenu").addClass("dark");
      } else if (($(this).scrollTop() < 100)) {
        $(".pcMenu").removeClass("dark");
      }
    }
  });


  //PC : 헤더 스크롤
  const pcGnbLi = $(".pcMenu nav.gnb> ul.depth1 > li:not(:last-of-type)");
  const pcMenu = $(".pcMenu")

  //gnb 마우스오버 시 2depth 스크롤
  pcGnbLi.on("mouseover", function () {
    let activate = $(this);
    let eq = $(this).index();
    if (!$(".depth2bg, .pcMenu").hasClass("on")) {
      $(".depth2bg, .pcMenu").addClass("on");
      $(".pcMenu").fadeIn("fast");
      $(".depth2bg").slideDown("fast");
    }
    pcGnbLi.each(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find("ul.lnb").toggleClass("on off");
      }
    });
    pcGnbLi.eq(eq).addClass('active');
    activate.addClass('active');
    activate.find("ul.lnb").toggleClass("on off");
  })
  $(".pcMenu nav.gnb").on("mouseleave", function () {
    pcGnbLi.each(function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find("ul.lnb").toggleClass("on off");
      }
    });
    if ($(".depth2bg, .pcMenu").hasClass("on")) {
      $(".depth2bg, .pcMenu").removeClass("on");
      $(".depth2bg").slideUp("fast");
    }
  })




  //pc : 메인뷰 : 스크롤 시 다음 섹션으로 이동
  $("section.mainView").on("mousewheel", function (event, delta) {
    if (delta > 0) {
      $('html, body').stop(true, false).animate({ scrollTop: 0 }, 400);
    } else if (delta < 0) {
      //마우스 휠 내려갔을 때 실행구문
      $('html, body').stop(true, false).animate({ scrollTop: $('section.mainView').height() }, 400);
    }
  })




  
  //3column 리스트 ScrollTrigger 애니메이션
  function foScrollTriggers() {
    // ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 모든 ScrollTrigger를 초기화

    if (mVert || mHorz) return false; //모바일이면 종료
    // const activeCards = $(target).find('.card-wrap');
    const activeCards = $(".foContainer").find('.card');
    //애니메이션 동작 설정
    activeCards.each(function (index, card) {
      gsap.fromTo(card, { opacity: 0, yPercent: 30 }, {
        duration: 0.5,
        delay: (index % 4) * 0.2,
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

  function pceScrollTriggers() {
    // ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 모든 ScrollTrigger를 초기화

    if (mVert || mHorz) return false; //모바일이면 종료
    // const activeCards = $(target).find('.card-wrap');
    const activeCards = $(".pceContainer").find('.card');
    //애니메이션 동작 설정
    activeCards.each(function (index, card) {
      gsap.fromTo(card, { opacity: 0, yPercent: 20 }, {
        duration: 0.9,
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

  function memScrollTriggers() {
    // ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // 모든 ScrollTrigger를 초기화

    if (mVert || mHorz) return false; //모바일이면 종료
    // const activeCards = $(target).find('.card-wrap');
    const activeCards = $(".memContainer").find('.card');
    //애니메이션 동작 설정
    activeCards.each(function (index, card) {
      gsap.fromTo(card, { opacity: 0, yPercent: 30 }, {
        duration: 0.9,
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

  
  
  
  
  
  
  
  
  
  

}) // $(function(){ }) END

