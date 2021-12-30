(function (e) {
  var t = {columns: 4, classname: "column", min: 1};
  e.fn.autocolumnlist = function (n) {
    var r = e.extend({}, t, n);
    return this.each(function () {
      var t = e(this).find("> li");
      var n = t.size();
      if (n > 0) {
        var s = Math.ceil(n / r.columns);
        if (s < r.min) {
          s = r.min
        }
        var o = 0;
        var u = s;
        for (i = 0; i < r.columns; i++) {
          if (i + 1 == r.columns) {
            t.slice(o, u).wrapAll('<div class="' + r.classname + ' last" />')
          } else {
            t.slice(o, u).wrapAll('<div class="' + r.classname + '" />')
          }
          o = o + s;
          u = u + s
        }
      }
    })
  }
})(jQuery)


if ($('.js-cities-list').length) {
  $('.js-cities-list').autocolumnlist({
    columns: 3,
    min: 2,
    classname: 'cities-list__column'
  });
}

function tabBlocksHeight() {
  $('.js-po-autoheight._active').find('.c-block:odd').each(function () {
    var $t = $(this),
        $p = $t.prev('.c-block'),
        th = $t.height(),
        ph = $p.height();

    if (th > ph) {
      $p.height(th);
    } else if (th < ph) {
      $t.height(ph)
    }
  })
}

tabBlocksHeight();

function isMobile() {
  return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4)))
}

var gVar = {
  'speed': {
    'effect': 150
    , 'layout': 250
    , 'long': 400
  }
}
, $W = $(window)
, $D = $(document)
, $B = $('BODY');

// Аккордеон
var ContentAccordion = (function () {
  //Ссылка на текущий объект
  var $this = this;

  return {
    init: function (element, callback) {
      var context = $(element)
      , el = {
        'btn': $('.js-acc-btn', context)
        , 'body': $('.js-acc-body', context)
      }
      , callback = callback || function () {
      }
      , options = {
        'callback': callback || function () {
        }
      }

      el.btn.on('click', btnClick);

      function btnClick(e) {
        e.preventDefault();
        var $that = $(this)
        , ctx = $that.closest('.js-acc')

        ctx.toggleClass('_active');

        // if (ctx.hasClass('_active')) {
        //     context.removeClass('_active');
        // } else {
        //     context.removeClass('_active');
        //     ctx.addClass('_active');
        // }
        options.callback(context);
      }

    }
  }
})();

// Обычная гуглокарта
var CommonMap = (function () {
  var $this = this,
      context,
      el,
      options,
      map;

  function gmapInit(element) {
    var myLatlng = new google.maps.LatLng($(context).data().lat, $(context).data().long);

    var mapOptions = {
      'zoom': 10
      , 'center': myLatlng
      , 'mapTypeId': google.maps.MapTypeId.ROADMAP
      , 'disableDefaultUI': true
    };

    map = new google.maps.Map(element,
                              mapOptions);

    var marker = new google.maps.Marker({
      'position': myLatlng
      , 'map': map
    });

    options.afterInit(context);
  }

  return {
    init: function (element, opt) {
      context = element
        , el = {}
        , defaults = {
        'afterInit': function () {
        }
      }
        , options = $.extend(defaults, opt)

      gmapInit(context);

    }
  }
})();

// Фильтр
var ContentFilter = (function () {
  //Ссылка на текущий объект
  var $this = this;


  return {
    init: function (callback) {
      var context = $('.js-content-filter')
      , el = {
        'filterBtn': $('.js-filter__one', context)
        , 'csBody': $('.js-cs-body__one', context)
      }
      , callback = callback || function () {
      };

      el.filterBtn.on('click', filterBtnClick);

      function filterBtnClick(e) {
        e.preventDefault();
        var $that = $(this)
        , type = $that.data('type');

        if ($that.hasClass('_active')) return;

        el.filterBtn.removeClass('_active');
        $that.addClass('_active')

        callback($that);
      }

    }
  }
})();

// Табуляция
var TabFilter = (function () {
  //Ссылка на текущий объект
  var $this = this;

  return {
    init: function (element, callback) {
      var context = element
      , el = {
        'tabBtn': $('.js-tab-btn', context)
        , 'tabBody': $('.js-tab-body', context)
      }
      , callback = callback || function () {
      };

      el.tabBtn.on('click', tabBtnClick);

      function tabBtnClick(e) {
        e.preventDefault();
        var $that = $(this)
        , id = $that.data('id');


        if ($that.hasClass('_active')) return;

        el.tabBtn.removeClass('_active');
        $that.addClass('_active');

        el.tabBody
          .removeClass('_active')
          .filter('[data-id="' + id + '"]')
          .addClass('_active');

        callback($that);

        $W.resize();
      }

    }
  }
})();

// Общие стили
$(function () {
  var el = {
    'nav': $('.js-nav')
    , 'btnToTop': $('.js-to-top')
    , 'subMenu': $('.js-submenu-wr')
    , 'subMenuItem': $('.js-submenu')
    , 'navMenuBtn': $('.js-nav-menu-btn')
    , 'navBackBtn': $('.js-nav-back-btn')
    , 'maxHeightCtx': $('.js-max-h')
  }
  , headerHeight = 50

  // кстомный селект
  $('.js-nice-select').niceSelect({
    'theme': 'grey'
  });


  // фолбек для колонок для ие
  if (!Modernizr.csscolumns) {
    columnFallback();
  }

  if (el.maxHeightCtx.length) {
    // setMaxHeight(el.maxHeightCtx)

    $W.on('resize', function (e) {
      setMaxHeight(el.maxHeightCtx)
    });
  }

  // кнопка вызова меню для маленьких экранов
  el.navMenuBtn.on('click', function () {
    $B.toggleClass('_ipad-menu');
    $B.removeClass('_ipad-submenu');
    el.subMenuItem.removeClass('_active');
  });

  el.navBackBtn.on('click', function () {
    $B.removeClass('_ipad-submenu');
    $B.removeClass('_ipad-submenu');
    el.subMenuItem.removeClass('_active');
  });


  Hammer(document, {preventMouse: true}).on("swipe", function (e) {
    var direct = e.gesture.direction;

    if ($(e.target).closest('.js-submenu-wr').length || $(e.target).closest('.js-nav').length) return;

    // $D.on('touchend', function(){
    //     $B.removeClass('_ipad-menu');
    // });

    if (direct == 'right') {
      if (!$B.hasClass('_ipad-menu')) {
        $B.addClass('_ipad-menu');
      }
      // $D.off('touchend')
      return;
    }
    $B.removeClass('_ipad-menu');
    $B.removeClass('_ipad-submenu');
    el.subMenuItem.removeClass('_active');
  });

  Hammer(document, {preventMouse: true}).on("tap", function (e) {
    if ($(e.target).closest('.js-submenu-wr').length || $(e.target).closest('.js-nav').length) return;
    $B.removeClass('_ipad-menu');
    $B.removeClass('_ipad-submenu');
    el.subMenuItem.removeClass('_active');
  });


  // Фиксированное меню
  $W.on('scroll', function (e) {
    var wScroll = $W.scrollTop();

    if (wScroll > headerHeight) {
      $B.addClass('_fixed-menu');
    } else {
      $B.removeClass('_fixed-menu');
    }
  });
  $W.scroll();

  // Высота меню при ресайзах
  $W.on('resize', function (e) {
    var wH = $W.height()
    , cH = $('.l-main').height();

    if (wH > cH) {
      el.nav.height(wH);
      el.subMenu.height(wH);
    } else {
      el.nav.height(cH);
      el.subMenu.height(cH);
    }
  });
  $W.resize();


  // Скролл вверх страницы
  el.btnToTop.on('click', function (e) {
    e.preventDefault();
    $('HTML, BODY').animate({
      'scrollTop': 0
    },
                            300);
  });


  // so I'm setting width then height
  function setMaxHeight(context) {
    context.each(function () {
      var $that = $(this)
      , els = $that.children()
      , maxH = 0

      els.height('auto');

      els.each(function () {
        var h = $(this).height();
        if (h > maxH)
          maxH = h;
      });

      els.height(maxH)

    });
    $('.no-flexbox .flex-container').not('.vertical').each(function () {
      var $el = $(this),
          maxHeight = 0;

      $el.children('.flex-item').each(function () {
        // set height auto to reset the height
        $(this).css('height', 'auto');
        if ($(this).height() > maxHeight) {
          maxHeight = $(this).outerHeight();
        }
      });
      // makes sure maxHeight is not equal to 0
      if (maxHeight) {
        $el.find(' >.flex-item').css('height', maxHeight);
      }
    });
  }
});

// Слайдер на текстовых
$(function () {
  var speed = 1000;

  var target = $('.js-common-slider-wr');
  if (!target.length) return;

  target.each(function () {
    var context = $(this)
    , el = {
      'slider': $('.js-common-slider', context)
      , 'thumbs': $('.js-common-thumbs', context)
      , 'thumbsOne': $('.js-common-thumbs LI', context)
    }
    , textSlider
    , textThumb
    , thumbsLength = el.thumbsOne.length

    textSlider = el.slider.bxSlider({
      'pager': false
      , 'infiniteLoop': false
      , 'touchEnabled': false
      , 'nextSelector': '.main-slider-pagi._next'
      , 'prevSelector': '.main-slider-pagi._prev'
      , 'nextText': ''
      , 'prevText': ''
      , 'onSlideBefore': onSlideBefore
    });

    textThumb = el.thumbs.bxSlider({
      'pager': false
      , 'touchEnabled': false
      , 'infiniteLoop': false
      , 'nextText': ''
      , 'prevText': ''
      , 'minSlides': 5
      , 'maxSlides': 5
      , 'slideWidth': 126
      , 'slideMargin': 10
      , 'moveSlides': 1
      // ,'onSlideBefore' : onThumbClick
    });

    // $('.main-slider-pagi._next, .main-slider-pagi._prev').click(function (e) {
    //     e.preventDefault();
    // });

    el.thumbsOne.on('click', thumbClick);

    function onSlideBefore($slideElement, oldIndex, newIndex) {
      el.thumbsOne
        .removeClass('_active')
        .eq(newIndex)
        .addClass('_active');

      if (!el.thumbsOne.eq(newIndex).hasClass('_current')) {
        textThumb.goToSlide(newIndex);
        el.thumbsOne.removeClass('_current');

        for (var i = newIndex; i < newIndex + 5; i++) {
          el.thumbsOne.eq(i).addClass('_current');
        }
      }

    }

    function thumbClick(e) {
      var $that = $(this)
      , newIndex = $that.index()
      , activeIndex = el.thumbsOne.filter('._active').index()

      textSlider.goToSlide(newIndex);
    }

  });

});
// Слайдер на главной
$(function () {
  var speed = 1000;

  var context = $('.js-main-slider');
  if (!context.length) return;

  var el = {
    'currentSlideNumber': $('.js-main-slider-count ._current')
    , 'miniSlider': $('.js-main-mini-slider')
  }

  context.bxSlider({
    'pager': false
    // ,'auto': true
    , 'touchEnabled': false
    , 'nextSelector': '.main-slider-pagi._next'
    , 'prevSelector': '.main-slider-pagi._prev'
    , 'nextText': ''
    , 'prevText': ''
    , 'onSlideBefore': onSlideBefore
    , 'speed': speed
  });

  $('.main-slider-pagi._next, .main-slider-pagi._prev').click(function (e) {
    e.preventDefault();
  });

  el.miniSlider.each(function () {
    var $that = $(this);
    $that.bxSlider({
      'pager': false
      , 'auto': true
      , 'nextText': ''
      , 'prevText': ''
      , 'mode': 'fade'
    });
  });

  var fancySlider = $('HTML').hasClass('csstransitions') && !isMobile();

  if (fancySlider) {
    var images = $('.main-slider-img');

    // если слайдов два, то клонируем первую картинку
    if (images.length == 2) {
      var clone = images.eq(0).clone(true);
      clone.insertAfter(images.last());
      var images = $('.main-slider-img');
    }

    var dimensions = {};
    var keys = [];

    images.map(function (i) {
      (function (el, index) {
        var i = new Image();
        i.src = $(el).find('.clear').find('IMG').eq(0).attr('src');
        i.onload = function () {
          dimensions[index] = [this.width, this.height];
          keys.push(index == images.length - 1 ? -1 : index + 1);
        };
      })(this, i);
    });

    var intervalId = setInterval(function () {
      if (keys.length == images.length) {
        images.find('.blurred').foggy();
        makeIndexes(images, keys, 0);
        positionImages(images, false);

        setTimeout(function () {
          images.css('visibility', 'visible');
        }, 100);

        clearInterval(intervalId);
      }
    }, 100);
  } else {
    $('.main-slider-wr').addClass('no-fancy');
  }

  function makeIndexes(elements, keys, startIndex) {
    currentElIndex = startIndex;

    for (var i = 0; i < keys.length; i++) {
      if (currentElIndex >= elements.length) {
        currentElIndex = 0;
      }

      elements.get(currentElIndex).prevPerspectiveKey = elements.get(currentElIndex).perspectiveKey || keys[i];
      elements.get(currentElIndex).perspectiveKey = keys[i];
      currentElIndex++;
    }

    return elements;
  }

  function removeTransition(elements) {
    elements.addClass('notransition');
  }

  function addTransition(elements) {
    setTimeout(function () {
      elements.removeClass('notransition');
    }, 50);
  }

  function positionElement(element, props, transition, className) {
    if (!transition) removeTransition(element);
    element.css(props);//.removeClass('_prev _next _current _hidden').addClass(className);
    if (!transition) addTransition(element);
  }

  function makeCurrent(element, transition) {
    var i = element.index();
    positionElement(element, {
      top: (element.parent().height() - dimensions[i][1]) / 2,
      left: '5%',
      width: dimensions[i][0],
      height: dimensions[i][1],
      opacity: 1
    }, transition, '_current');
    element.find('.clear').show();
    element.find('.blurred').hide();
    if (transition) {
      element.find('.clear').fadeIn();
      element.find('.blurred').hide();
    } else {
      element.find('.clear').show();
      element.find('.blurred').fadeOut();
    }
  }

  function makePrev(element, transition) {
    var i = element.index();
    positionElement(element, {
      top: -700,
      left: '-260%',
      width: dimensions[i][0] * 4.5,
      height: dimensions[i][1] * 4.5,
      opacity: 1
    }, transition, '_prev');
  }

  function makeNext(element, transition) {
    var i = element.index();
    positionElement(element, {
      top: 180,
      left: '65%',
      width: dimensions[i][0] / 3,
      height: dimensions[i][1] / 3,
      opacity: 0.4
    }, transition, '_next');
    if (transition) {
      element.find('.clear').fadeOut(speed);
      element.find('.blurred').fadeIn(speed);
    } else {
      element.find('.clear').hide(speed);
      element.find('.blurred').show(speed);
    }
  }

  function makeHidden(element, transition) {
    var i = element.index();
    positionElement(element, {
      top: 240,
      left: '105%',
      width: dimensions[i][0] / 30,
      height: dimensions[i][1] / 30,
      opacity: 0
    }, transition, '_hidden');
  }

  function positionImages(elements, transition, dir) {
    if (typeof transition != 'undefined' && !transition) {
      removeTransition(elements);
    }

    for (var i = 0; i < elements.length; i++) {
      var el = elements.eq(i);

      if (el.get(0).perspectiveKey == 1) {
        makeCurrent(el, true);
      } else if (el.get(0).perspectiveKey == -1) {
        // для трех элементов
        if (el.get(0).prevPerspectiveKey == 2 && dir < 1) {
          makeHidden(el, true);
          (function (el) {
            setTimeout(function () {
              makePrev(el, false);
            }, speed);
          })(el);
          // для четырех и больше элементов
        } else {
          makePrev(el, dir > 0);
        }
      } else if (el.get(0).perspectiveKey == 2) {
        // для трех элементов
        if (el.get(0).prevPerspectiveKey == -1) {
          makeHidden(el, false);
        }

        // задержка нужна чтобы успели сработать изменения для двух и трех элементов
        (function (el) {
          setTimeout(function () {
            makeNext(el, true);
          }, transition ? 50 : 1);
        })(el);
      } else {
        makeHidden(el, dir < 0);
      }
    }

    if (typeof transition != 'undefined' && !transition) {
      addTransition(elements);
    }
  }

  function onSlideBefore($slideElement, oldIndex, newIndex) {
    el.currentSlideNumber.html(newIndex + 1);

    if (typeof images != 'undefined' && images.length) {
      makeIndexes(images, keys, newIndex);

      dir = newIndex - oldIndex == -1 || newIndex - oldIndex == images.length - 1 ? -1 : 1;
      positionImages(images, true, dir);
    }
  }

});

// Каталог товаров и новости
$(function () {
  var context = $('.js-mega-filter');
  if (!context.length) return;

  var el = {
    'megaFilterWr': $('.js-mega-filter-wr')
    , 'megaFilter': $('.js-mega-filter')
    , 'megaFilterSelect': $('.js-mega-select select')
    , 'megaList': $('.js-mega-list')
    , 'yearBtnCtx': $('.js-news-year-block LABEL')
    , 'resultCount': $('.js-mega-result-count')
    , 'newsMonthSelect': $('.js-news-month')
    , 'filterForm': $('.js-filter-form')
  }
  , firstFilterPos = el.megaFilterWr.offset().top
  , filterHeight = el.megaFilterWr.height()
  , contentWidht = context.outerWidth()
  , sendData = {};

  // Поведение белой плашки с фильтрами
  $W.on('scroll', function (e) {
    var wScroll = $W.scrollTop();

    if (wScroll <= firstFilterPos) {
      el.megaFilterWr
        .removeClass('_fixed')
        .css({
        'width': '100%'
      });

      el.megaList.css({
        'paddingTop': 0
      });
    } else if (wScroll > firstFilterPos) {
      el.megaFilterWr
        .addClass('_fixed')
        .css({
        'width': contentWidht
      });

      el.megaList.css({
        'paddingTop': filterHeight
      });
    }
    ;
  });
  $W.scroll();

  $W.on('resize', function (e) {
    contentWidht = context.outerWidth()
    filterHeight = el.megaFilterWr.height()
    if (el.megaFilterWr.hasClass('_fixed')) {
      el.megaFilterWr.css({
        'width': contentWidht
      })
    }
  });

  function sendDataToServer(sendData, url, loadCallback) {
    var sendData = sendData || {};

    if ($B.hasClass('_mega-ajax')) return false;
    $B.addClass('_mega-ajax');

    $.ajax({
      url: url,
      type: 'POST',
      data: sendData,
    })
      .success(function (response) {
      var response = $.parseJSON(response);

      if (response.success == 1) {
        setTimeout(function () {
          loadCallback(response);
          el.resultCount
            .find('H6')
            .html(response.data)
            .end()
            .addClass('_active')

        }, 500)

      } else if (response.success == 0) {
        ajaxErrorHandler(response.message);
        return false;
      }
    })
      .fail(function () {
      alert('Сервер не отвечает. Попробуйте через несколько минут.')
    })
      .always(function () {
      setTimeout(function () {
        $B.removeClass('_mega-ajax');
        el.resultCount.removeClass('_active');
        $W.resize();
      }, 1200)
    });
  }

  // Блок для каталога
  if (el.megaFilterSelect.length) {
    el.megaFilterSelect.niceSelect();
    // TODO: удалить таймауты на боевом
    $W.on('niceChange', function () {
      var sendData = {}
      , url = g_url.catalog;


      function bindSelectChange() {
        $('.nice-select', el.megaFilter).each(function () {
          var $that = $(this)
          , name = $that.data('name')
          , val = $that.data('val')
          , activeItem = $that.find('.nice-select-list LI')

          if (activeItem.first().hasClass('_active')) {
            $that.removeClass('_checked')
          }
          sendData[name] = val;
        });
      }

      bindSelectChange();

      sendData['site_id'] = el.megaFilterWr.data('site-id');

      sendDataToServer(sendData, url, function (response) {
        el.megaList.html(response.html);

        if (response.select) {
          $('.js-mega-select').html(response.select);
          $('.js-mega-select select').niceSelect();

          $('.js-mega-select .nice-select').each(function () {
            var $selectBlock = $(this);
            if ($selectBlock.find('option[selected]').length) {
              $selectBlock.addClass('_checked');
            }
            $selectBlock.attr('data-val', $selectBlock.find('select').val());
            bindSelectChange();
          });
        }
      });
    });
    return;
  }


  // Блок для новостей
  // var newsUrl = g_url.news;
  var newsUrl = $('.js-filter-form').attr('action');

  el.newsMonthSelect.niceSelect({
    'theme': 'trans'
    , 'afterChange': monthChange
  });

  $D.on('click', '.js-filter-btn', newsFilterClick);
  $D.on('click', '.js-filter-year', newsFilterYearClick);
  $D.on('click', '.js-load-more', newsMoreClick);

  $('.js-filter-btn').attr('checked', false);


  function newsFilterClick() {
    var $that = $(this)
    , ctx = $that.closest('LABEL')
    , sendData

    if (ctx.hasClass('_active')) {
      ctx.removeClass('_active')
    } else {
      ctx.addClass('_active');
    }

    sendData = collectData();
    sendDataToServer(sendData, newsUrl, newsLoadCallback);
  }

  function newsFilterYearClick() {
    var $that = $(this)
    , ctx = $that.closest('LABEL')
    , sendData

    el.yearBtnCtx.removeClass('_active')
    ctx.addClass('_active')

    sendData = collectData();
    sendDataToServer(sendData, newsUrl, newsLoadCallback);
  }

  function monthChange() {
    var sendData;

    sendData = collectData();
    sendDataToServer(sendData, newsUrl, newsLoadCallback);
  }

  function newsMoreClick() {
    var sendData
    , offset = $(this).data('offset');

    sendData = collectData() + '&offset=' + offset;
    sendDataToServer(sendData, newsUrl, newsLoadCallback);
  }

  function newsLoadCallback(response) {
    var newFilter = $(response.html).find('.js-mega-filter-wr').html()
    , newContent = $(response.html).find('.js-mega-list').html()

    el.megaFilterWr.html(newFilter);
    el.megaList.html(newContent);

    $('.js-news-month').niceSelect({
      'theme': 'trans'
      , 'afterChange': monthChange
    });
  }

  function collectData() {
    var data = $('.js-filter-form').serialize();
    return data;
  }

});

// Выбор языка в шапке
$(function () {
  var target = $('.js-lang-btn');
  if (!target.length) return;

  var el = {
    'langList': $('.js-lang-list')
  }

  target.on('click', langBtn);

  function langBtn(e) {
    var $that = $(this);

    if ($B.hasClass('_lang-open')) {
      $B.removeClass('_lang-open');
      return;
    }

    $B.addClass('_lang-open');
  }

  $D.on('click', function (e) {
    if (!$(e.target).closest(el.langList).length && !$(e.target).closest(target).length) {
      $B.removeClass('_lang-open');
    }
  });
});

// Левое меню
$(function () {
  var context = $('.js-nav');
  if (!context.length) return;

  var el = {
    'menu': $('.js-main-menu', context)
    , 'menuItem': $('.js-main-menu LI', context)
    , 'submenuWr': $('.js-submenu-wr')
    , 'submenu': $('.js-submenu')
  }
  , timeouts
  , activeId = false
  , newId = false


  el.submenuWr.on('mouseenter mouseleave', onSubmenuHover);


  $D.on('touchstart', function (e) {
    if ($B.hasClass('_menu-open')) {
      if ($(e.target).closest(el.submenuWr).length) return;
      el.submenu.removeClass('_active');
      el.menuItem.removeClass('_hovered');
      $B.removeClass('_menu-open');
    }
  })

  el.menuItem.on('click touchstart', function () {
    if ($B.hasClass('_ipad-menu')) {
      var $that = $(this)
      , id = $that.data('id')
      , activeSubmenuItem = el.submenu.filter('[data-id="' + id + '"]');

      if (activeSubmenuItem.length) {
        $B.addClass('_ipad-submenu');
        activeSubmenuItem.addClass('_active');
      }

    }
  });

  el.menuItem.hover(function (e) {
    if (!$B.hasClass('_ipad-menu')) {
      var $that = $(this)
      , id = $that.data('id');

      newId = id;

      if (activeId) return;
      activeteMenu(id);
    }

  }, function (e) {
    if (!$B.hasClass('_ipad-menu')) {
      var $that = $(this)
      , id = $that.data('id');

      if (timeouts) {
        clearTimeout(timeouts);
        timeouts = null;
      }

      timeouts = setTimeout(function () {
        unactiveMenu(activeId);
        activeteMenu(newId);
      }, 400);
    }
  });

  function unactiveMenu(id) {
    var activeMenuItem = el.menuItem.filter('[data-id="' + id + '"]')
    , activeSubmenuItem = el.submenu.filter('[data-id="' + id + '"]');

    activeMenuItem.removeClass('_hovered');
    activeSubmenuItem.removeClass('_active');
    $B.removeClass('_menu-open');
  }

  function activeteMenu(id) {
    if (typeof(id) == 'undefined') {
      return;
    }
    var activeMenuItem = el.menuItem.filter('[data-id="' + id + '"]')
    , activeSubmenuItem = el.submenu.filter('[data-id="' + id + '"]');

    activeMenuItem.addClass('_hovered');
    activeSubmenuItem.addClass('_active');
    $B.addClass('_menu-open');
    activeId = id;
  }


  function onSubmenuHover(e) {
    if (!$B.hasClass('_ipad-menu')) {
      var activeItemId = el.submenu.filter('._active').data('id')

      if (e.type === 'mouseenter') {
        clearTimeout(timeouts);
        timeouts = null

      } else if (e.type === 'mouseleave') {
        unactiveMenu(activeItemId);
        activeId = false;
      }
    }
  }
});

// Переключатель фич на главной
$(function () {
  var context = $('.js-main-features');
  if (!context.length) return;

  var el = {
    'oneFeature': $('.js-main-features__one', context)
  }

  el.oneFeature.on('mouseenter mouseleave', onHover);

  function onHover(e) {
    var $that = $(this);

    if (e.type === 'mouseenter') {
      context.addClass('_active');
      $that.addClass('_active');
    } else if (e.type === 'mouseleave') {
      context.removeClass('_active');
      $that.removeClass('_active');
    }
  }
});

// Лента новостей на главной
$(function () {
  var context = $('.js-main-news-slider');
  if (!context.length) return;

  var el = {
    'currentSlideNumber': $('.js-news-slider-count ._current')
  },
      slider;

  slider = context.bxSlider({
    'pager': false
    , 'auto': false
    , 'touchEnabled': false
    , 'nextSelector': '.news-slider-pagi._next'
    , 'prevSelector': '.news-slider-pagi._prev'
    , 'nextText': ''
    , 'prevText': ''
    , 'onSlideBefore': onSlideBefore
    , 'onSliderLoad': onSlideLoad
  })

  el.slides = $('.js-main-news-slider > LI');

  function onSlideBefore($slideElement, oldIndex, newIndex) {
    el.currentSlideNumber.html(newIndex + 1);
    $W.resize()

    el.slides.removeClass('_active')
    el.slides.eq(newIndex + 1).addClass('_active')
  }

  function onSlideLoad(currentIndex) {
    el.slides = $('.js-main-news-slider > LI');
    slideWidthCalc();
  }

  function slideWidthCalc() {
    el.slides.each(function () {
      var $that = $(this)
      , w = $that.width();

      $that.width(w - 3);
    });
  }

  $W.on('resize', function () {
    slideWidthCalc();
  })
});

// Липкое меню в боковой колонке
$(function () {
  var context = $('.js-side-menu');
  if (!context.length) return;

  var el = {
    'sideWr': $('.js-aside')
    , 'fixedMenu': $('.js-fixed-menu')
    , 'fixedBtn': $('.js-fixed-menu__btn')
    , 'fixedBody': $('.js-fixed-menu__body')
  }
  , sideH = context.height()
  , sideOffset = context.offset().top
  , sideEnd = sideH + sideOffset;

  el.fixedBody.html(context.clone());

  el.fixedBtn.on('click', fixedBtnClick);

  $W.on('scroll', function () {
    var wScrollTop = $W.scrollTop();

    if (wScrollTop > sideEnd) {
      el.fixedMenu.addClass('_show');
    } else {
      el.fixedMenu.removeClass('_show');
    }
  });

  function fixedBtnClick() {
    var $that = $(this)
    , alt = $that.attr('alt');

    oldTitle = $that.find('span').html();
    $that.find('span').html(alt);
    $that.attr('alt', oldTitle);

    el.fixedMenu.toggleClass('_active');
  }

  $W.scroll();
});

// Страница ПО, каталоги, инструкции
$(function () {
  var context = $('.js-dload');
  if (!context.length) return;

  var el = {
    'tabMain': context
    , 'bigTab': $('.js-tab-btn')
    , 'tabProgr': $('.js-po-tab')
    , 'tabBtn': $('.js-po-btn')
    , 'tabBody': $('.js-po-body')
    , 'catWr': $('.js-dload-cat')
    , 'firstSelect': $('.js-dload-select__first')
    , 'itemSelect': $('.js-dload-select__item')
    , 'catSelect': $('.js-dload-select__cat')
    , 'catSelectWr': $('.js-select-cat-wr')
    , 'stepOne': $('.js-dload__step-1')
    , 'stepTwo': $('.js-dload__step-2')
    , 'stepTwoTip': $('.js-step-2-tip')
    , 'itemsWr': $('.js-dload-cat__body')
  }

  TabFilter.init(el.tabMain);
  TabFilter.init(el.tabProgr);

  el.firstSelect.niceSelect({
    'theme': 'simple-blue'
    , 'afterChange': firstSelectClick
  });

  el.tabBtn.on('click', tabBtnClick);
  el.bigTab.on('click', function () {
    scrollToEl('.dload-header');
  });

  $D.on('click', '.js-load-more', moreBtnClick);
  $W.on('resize', function () {
    setBlockOneHeight();
  });

  function tabBtnClick() {
    var $that = $(this)
    , id = $that.data('id');

    if ($that.hasClass('_active')) return;

    el.tabBtn.removeClass('_active');
    $that.addClass('_active');

    el.tabBody
      .removeClass('_active')
      .filter('[data-id="' + id + '"]')
      .addClass('_active');

    tabBlocksHeight();

    $W.resize();
  }

  function moreBtnClick() {
    var $that = $(this)
    , count = $that.data('offset')
    , val = $('.js-dload-select__cat').val();

    loadItems(val, count);
  }

  function firstSelectClick(elem) {
    var $that = $(elem)
    , val = $that.data('val');

    loadNewCat(val, function () {
      $("option", el.itemSelect).filter(function () {
        return $(this).val() == val;
      }).attr('selected', true);

      el.itemSelect.niceSelect({
        'theme': 'grey'
        , 'afterChange': itemSelectClick
      });
      el.stepOne.removeClass('_active');
      el.stepTwo.addClass('_active');
    });
  }

  function itemSelectClick(elem) {
    var $that = $(elem)
    , val = $that.data('val');
    loadNewCat(val);
  }

  function loadNewCat(val, afterLoad) {
    var afterLoad = afterLoad || function () {
    }
    if ($B.hasClass('_ajax')) return false;
    $B.addClass('_ajax');

    $.ajax({
      //            url: g_url.cat_select,
      url: el.catWr.data('cat-url'),
      type: 'POST',
      data: {type: val}
    })
      .success(function (response) {
      var response = $.parseJSON(response);

      if (response.success == 1) {
        el.catSelectWr.html(response.html)
        $('.js-dload-select__cat').niceSelect({
          'theme': 'grey'
          , 'afterChange': itemSelectChange
        });
        el.stepTwoTip.removeClass('_hidden');
        el.itemsWr.html('');
        el.catWr.removeClass('_auto-height');
        afterLoad();
        setBlockOneHeight();
        $W.resize();
      } else if (response.success == 0) {
        ajaxErrorHandler(response.message)
      }
    })
      .fail(function () {
      alert('Сервер не отвечает. Попробуйте через несколько минут.')
    })
      .always(function () {
      $B.removeClass('_ajax');
      $W.resize();
    });
  }

  function setBlockOneHeight() {
    var maxHeight = 0
    , items = $('.c-block', el.itemsWr)
    , itemsLength = items.length;

    items.css('height', 'auto')

    items.each(function (index) {
      var $that = $(this)
      , next = $that.next()
      , thatHeight = $that.height()
      , nextHeight = next.height()

      if (index % 2 != 0) {
        return;
      }

      if (nextHeight > thatHeight) {
        $that.height(nextHeight)
      } else {
        next.height(thatHeight)
      }

    });
  }

  function itemSelectChange(elem) {
    var $that = $(elem)
    , val = $that.data('val');
    loadItems(val);
  }

  function loadItems(val, count) {
    var count = 0 || count;

    if ($B.hasClass('_ajax')) return false;
    $B.addClass('_ajax');

    $.ajax({
      //            url: g_url.cat_items,
      url: el.catWr.data('items-url'),
      type: 'POST',
      data: {
        'type': val
        , 'count': count
      }
    })
      .success(function (response) {
      var response = $.parseJSON(response);
      if (response.success == 1) {
        el.stepTwoTip.addClass('_hidden');
        el.itemsWr.html(response.html);
        el.catWr.addClass('_auto-height');
        $W.resize();
      } else if (response.success == 0) {
        ajaxErrorHandler(response.message)
      }
    })
      .fail(function () {
      alert('Сервер не отвечает. Попробуйте через несколько минут.')
    })
      .always(function () {
      $B.removeClass('_ajax');
      $W.resize();
    });
  }
});

// Страница контакты
$(function () {
  var context = $('.js-contacts');
  if (!context.length) return;

  var el = {
    'map': $('#js-contacts-map')
    , 'contryItem': $('.js-contacts-country DIV')
    , 'cityItem': $('.js-contacts-city LI')
    , 'mapItemList': $('.js-map-list')
  }
  , mObj = {}
  , rMarkersObj = {}
  , markerBounds = {}
  , map
  , sendUrl = context.data('url')

  TabFilter.init(context);

  mapInit();

  loadWorldMarkers();

  $D.on('click', '.js-d-marker', markerClick);
  $D.on('touchstart', '.js-d-marker', markerClick);
  $D.on('click touchstart', '.js-s-marker-close', closeAllMarkers);
  el.contryItem.on('click', countryItemClick);
  el.cityItem.on('click', cityItemClick);
  $D.on('click', documentClick);

  function loadWorldMarkers() {
    var sendData = {
      'type': 'world'
      , 'id': ''
    };

    sendDataToServer(sendData);
  }

  function countryItemClick() {
    var sendData = {
      'type': 'country'
      , 'id': $(this).data('id')
    };

    scrollToEl('.js-contacts-country');

    el.cityItem.removeClass('_active');
    sendDataToServer(sendData);
  }

  function cityItemClick() {
    var sendData = {
      'type': 'city'
      , 'id': $(this).data('id')
    };

    if ($(this).hasClass('_active')) return;

    el.cityItem.removeClass('_active');
    $(this).addClass('_active');

    scrollToEl('.js-contacts-country');

    sendDataToServer(sendData);
  }


  function sendDataToServer(sendData) {
    var sendData = sendData || {};

    if ($B.hasClass('_ajax')) return false;
    $B.addClass('_ajax');

    $.ajax({
      url: sendUrl,
      type: 'POST',
      data: sendData
    })
      .success(function (response) {
      var response = $.parseJSON(response);

      if (response.success == 1) {
        selectTypeClick(sendData.type, sendData.id, response);
      } else if (response.success == 0) {
        ajaxErrorHandler(response.message);
        return false;
      }
    })
      .fail(function () {
      alert('Сервер не отвечает. Попробуйте через несколько минут.')
    })
      .always(function () {
      $B.removeClass('_ajax');
      $W.resize();
    });
  }

  function selectTypeClick(type, id, resp) {
    // Очищаемся лол
    $.each(rMarkersObj, function () {
      this.onRemove(map);
    });
    rMarkersObj = {};

    var $respHtml = $(resp.html)
    , count = 0
    , lastElem
    , contentEl
    , content;

    markerBounds = new google.maps.LatLngBounds();

    // Добавляем данные для попапов
    el.mapItemList.html($('.js-map-list', $respHtml).html());

    // Выставляем маркеры
    mObj = resp.data;
    $.each(mObj, function () {
      contentEl = $('.js-map-list__item', el.mapItemList)
        .filter('[data-id="' + this.id + '"]');

      content = contentEl.html();

      addMarkers(this, content);

      lastElem = this;
      count++;
    });

    if (count == 0) {
      return false;
    }

    showOverlays();

    // Если маркер один, то используем заданный для него зум
    if (count == 1) {
      setTimeout(function () {
        openPopup(lastElem.id);
        map.setZoom(lastElem.zoom)

      }, 100)
    } else {
      map.fitBounds(markerBounds);

    }
  }

  function showOverlays() {
    if (rMarkersObj) {
      for (i in rMarkersObj) {
        rMarkersObj[i].setMap(map);
      }
    }
  }

  function addMarkers(oneMarker, contentInfo) {
    var activeClass = ''
    , contentInfo = contentInfo || ''
    , markerVisible = ''
    , thisType = '_' + oneMarker.type
    , latLng = new google.maps.LatLng(oneMarker.lat, oneMarker.long);

    var content = '<div class="s-marker-wr js-s-marker-wr _visible ' + activeClass + ' ' + thisType + '" data-id="' + oneMarker.id + '">'
    + '<div class="s-marker-content">'
    + '<div class="map-list__item js-marker-inner" data-id="' + oneMarker.id + '">'
    + '<div class="s-marker-close js-s-marker-close"><span></span></div>'
    + contentInfo
    + '</div>'
    + '</div>'
    + '<div class="clinics-marker js-d-marker _' + oneMarker.type + '"></div>'
    + '</div>';

    // var marker = new RichMarker({
    //     map: map,
    //     position: latLng,
    //     draggable: false,
    //     flat: true,
    //     content: content,
    //     enableEventPropagation: true,
    //     m_id: oneMarker.id,
    //     m_zoom: oneMarker.zoom,
    // });

    var marker = new InfoBubble({
      map: map,
      content: content,
      position: latLng,
      shadowStyle: 0,
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 0,
      arrowSize: 6,
      borderWidth: 0,
      borderColor: 'transparent',
      disableAutoPan: true,
      hideCloseButton: false,
      arrowPosition: 50,
      backgroundClassName: 'map-bbl',
      arrowStyle: 0,
      maxWidth: 0,
      maxHeight: 0,
      disableAnimation: true
    });

    marker.open();

    rMarkersObj[oneMarker.id] = marker;

    markerPoint = new google.maps.LatLng(oneMarker.lat, oneMarker.long)
    markerBounds.extend(markerPoint);
  }

  function openPopup(id) {
    var $elem = $('.js-s-marker-wr').filter('[data-id="' + id + '"]')
    , objItem = rMarkersObj[id]
    , mLat = objItem.position.lat()
    , mLong = objItem.position.lng();

    map.panToWithOffset(new google.maps.LatLng(mLat, mLong), 0, -200);
    setTimeout(function () {
      if ($elem.hasClass('_active')) {
        $('.js-s-marker-wr').removeClass('_active');
        $('.js-bubble-wrap').removeClass('_active');
      } else {
        $('.js-s-marker-wr').removeClass('_active');
        $('.js-bubble-wrap').removeClass('_active');
        $elem.addClass('_active');
        $elem.closest('.js-bubble-wrap').addClass('_active');
      }
    }, 400);
  }

  // Обработчики
  function markerClick(e) {
    var $that = $(this)
    , $elem = $that.closest('.js-s-marker-wr')
    , id = $elem.data('id');

    scrollToEl('.js-contacts-country');
    openPopup(id);
  }

  function closeAllMarkers() {
    $('.js-s-marker-wr').removeClass('_active')
  }

  function documentClick(e) {
    if ($(e.target).closest('.js-s-marker-wr._active').length) {
      e.stopPropagation();
    }
  }

  function mapInit() {
    var opt = {
      'lat': 65.905017
      , 'long': 105.073242
      , 'zoom': 3
    };

    var mapOptions = {
      center: new google.maps.LatLng(opt.lat, opt.long),
      zoom: opt.zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      streetViewControl: false,
      mapMaker: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
      }
    };

    map = new google.maps.Map(el.map[0], mapOptions);


    // Открываем маркер, если в стране один офис
    $('body').addClass('_loading');
    google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
      var c = $('.js-tab-body._active').find('li').length;
      if (c == 1) {
        $('.js-tab-body._active').find('li').click();
      }
      $('body').removeClass('_loading');
    });

    google.maps.Map.prototype.panToWithOffset = function (latlng, offsetX, offsetY) {
      var map = this;
      var ov = new google.maps.OverlayView();
      ov.onAdd = function () {
        var proj = this.getProjection();
        var aPoint = proj.fromLatLngToContainerPixel(latlng);
        aPoint.x = aPoint.x + offsetX;
        aPoint.y = aPoint.y + offsetY;
        map.panTo(proj.fromContainerPixelToLatLng(aPoint));
      };
      ov.draw = function () {
      };
      ov.setMap(this);
    };
  }

});

// Модальные окна
$(function () {
  var context = $('.js-nice-modal');
  if (!context.length) return;

  $('.js-nice-modal-close, .js-dark-bg').on('click', closeModal);

  function closeModal() {
    $('BODY').removeClass('_modal');
    if ($('.js-nice-modal._active').hasClass('error-modal')) {
      if ($('.mega-filter').length) {
        $('.mega-filter .nice-select').each(function () {
          $(this).find('li:first-child').click();
        });
      }
    }
    $('.js-nice-modal._active').removeClass('_active');
  }

});

// Инициализация форм
$(function () {
  var target = $('.js-common-form');
  if (!target.length) return;

  $('input, textarea').placeholder();

  target.each(function () {
    var $that = $(this);

    $that.validate({
      'errorClass': '_novalid'
      , 'highlight': function (element, errorClass) {
        var $el = $(element);
        $el.closest('.form-row').addClass(errorClass);
      }
      , 'unhighlight': function (element, errorClass) {
        var $el = $(element);
        $el.closest('.form-row').removeClass(errorClass);
      }
      , 'submitHandler': function (form) {
        var $form = $(form);

        if ($B.hasClass('_ajax')) return false;
        $B.addClass('_ajax');

        $form.ajaxSubmit({
          'success': function (response) {
            var response = $.parseJSON(response);

            if (response.success == 1) {
              clearForm(form);
              ajaxErrorHandler(response.message);

            } else if (response.success == 0) {
              ajaxErrorHandler(response.message)
            }

            $B.removeClass('_ajax');
          }
          , 'error': function (response) {
            alert('Сервер не отвечает. Попробуйте через несколько минут.')
            $B.removeClass('_ajax');
          }
        })
        return false;
      }
    });


  });
});

function clearForm($form) {
  $form.reset();
}

// Колбэк для ошибочного ответа с сервера
function ajaxErrorHandler(message) {
  var modalWr = $('.js-nice-modal.error-modal')
  , modalInner = $('.js-nice-modal-inner', modalWr);

  $('.js-nice-modal').removeClass('_active');
  modalInner.html(message);
  modalWr.addClass('_active');
  $('body').addClass('_modal');

  $('.js-nice-modal').css({
    'marginLeft': -(modalWr.outerWidth() / 2)
  });

}

// Фолбэк для css колонок
function columnFallback() {
  $('.js-colums').each(function (index, el) {
    var $that = $(this)
    , count = $that.data('col');

    $that.columnize({columns: count});
  });
}


// Анимация для статистики в сервисе
$(function () {
  var target = $('.js-serv-stat');
  if (!target.length) return;

  $(window).on('scroll', function (e) {
    var wScroll = $(window).scrollTop()
    , targetTop = target.closest('.serv-stat').offset().top
    , wHeight = $(window).height();

    if (wScroll > targetTop - wHeight) {
      target.addClass('_active');
    }

  });
  $(window).scroll();
});


//Анимация блоков в истории
$(function () {
  var target = $('.js-history-year');
  if (!target.length) return;

  $(window).on('scroll', function (e) {
    var wScroll = $(window).scrollTop()
    , wHeight = $(window).height();

    for (var i = 0; i < target.length; i++) {

      if (wScroll > target[i].offsetTop - wHeight + target[i].offsetHeight * 2) {
        var trg = $(target[i]);
        trg.find('.inner-body').addClass('_animate');
        trg.addClass('_active-dotts')
      }
    }
  });
  $(window).scroll();
});

// страница товара
(function () {
  if (!$('.product-benefits-wr').length) return;

  var speed = 600;
  var correction = 3;

  var context = $('.js-product-slider');
  if (!context.length) return;

  var elements = $('.js-product-slider > LI');
  var currentSlide = 1;
  var started = false;

  var reviewsWr = $('.reviews-dl');

  ContentAccordion.init('.l-narrower._acc', accClick);

  function accClick(ctx) {
    var btn = $('.js-acc-btn', ctx)
    , acc = $('.js-acc', ctx)
    , hideText = btn.data('hide')
    , openText = btn.data('open');

    if (acc.hasClass('_active')) {
      btn.html(hideText)
    } else {
      btn.html(openText)

    }
  }

  context.cycle({
    fx: 'scrollHorz',
    prev: '.main-slider-pagi._prev',
    next: '.main-slider-pagi._next',
    timeout: 0,
    speed: speed,
    cleartypeNoBg: true,
    before: function (currSlideElement, nextSlideElement, opts) {
      (function (el) {
        setTimeout(function () {
          el.find('.slide-img').animate({
            opacity: 1
          }, {
            duration: speed / correction
          });
        }, speed / correction);
      })($(this))

      elements.not($(this)).find('.slide-img').animate({
        opacity: 0
      }, {
        duration: speed / correction
      });

      var num = opts.nextSlide + 1;

      if (!started) {
        num = started = 1;
      }

      $('.js-main-slider-count ._current').html(num);
    }
  });

  TabFilter.init($('.js-products-tab'));

  $('.js-3d-fullscreen-switch')
    .toggle($D.fullScreen() != null)
    .click(function () {
    $(this).parent('.product-3d-wr').find('.js-3d-fullscreen')
      .css('visibility', 'visible')
      .fullScreen(true);

    return false;
  });

  $D.bind('fullscreenchange', function (e) {
    if (!$D.fullScreen()) {
      $('.js-3d-fullscreen').css('visibility', 'hidden');
    }
  });

  var moreLoading = false;

  $D.on('click', '.js-dl-more', function () {
    if (moreLoading) return;
    moreLoading = true;
    $B.addClass('_ajax');
    $that = $(this);

    $.ajax(
      $that.data('href'),
      {
        success: function (data) {
          var newItems = $(data).find('.reviews-dl-item')
          , newMoreBtn = $(data).find('.js-dl-more');

          newItems.insertAfter($('.reviews-dl-item').last());

          $('.js-dl-more').remove();
          if (newMoreBtn.length) {
            reviewsWr.append(newMoreBtn);
          }

          $W.resize();
        },
        complete: function () {
          moreLoading = false;
          $('BODY').removeClass('_ajax');
          $W.resize();
        }
      }
    )
  });

  // якоря
  $('.js-product-anchor').click(function () {
    toAnchor($(this).attr('href'));
  });

  // якоря
  $('.js-tab-btn').mouseup(function () {
    toAnchor('#' + this.id);
  });

  function toAnchor(anchor) {
    var target = $(anchor);
    if (!target.length) return;
    var tabId = target.data('id');
    var tabControl = $('.js-tab-btn[data-id="' + tabId + '"]');
    tabControl.click();

    $('html:not(:animated),body:not(:animated)')
      .animate({scrollTop: target.offset().top}, 300);

    return false;
  }

  if (window.location.hash) {
    toAnchor(window.location.hash);
  }
})();


//Анимация иконок в About
$(function () {
  var target = $('.js-icon');
  if (!target.length) return;
  $(window).on('scroll', function (e) {
    var wScroll = $(window).scrollTop()
    , wHeight = $(window).height();

    for (var i = 0; i < target.length; i++) {
      var p = $(target[i]).closest('.js-trigger')
      , pTop = p.offset().top
      , pHeight = p.height();

      if (wScroll > pTop - wHeight + pHeight / 1.5) {
        $(target[i]).addClass('_animate');
      }
    }
  });
  $(window).scroll();
});

//Фолбек нажатия на пины на айпаде
(function () {
  var target = $('.one-pin');
  if (!target.length) return;


  $D.on('touchstart', function (e) {
    var $trgt = $(e.target).closest('.one-pin');

    target.removeClass('_active');
    if ($trgt.length) {
      $trgt.addClass('_active');
    }
  });
})();


//Карта на странице Сервис
$(function () {
  var target = $('.js-servmap-item');
  if (!target.length) return;

  var $imgMap = $('.js-servmap-imagemap')
  , $area = $imgMap.find('AREA')
  , $allAbouts = $('.js-about')
  , $regWrap = $('.js-regions-wrap')
  , $placeholder = $('.js-info-placeholder');

  target.on('mouseenter mouseleave', activeRegion);
  $area.on('mouseenter mouseleave', activeRegion);

  setRegWrapHeight();
  $(window).resize(setRegWrapHeight);

  function activeRegion(e) {
    var $that = $(this)
    , $id = $that.data('area')
    , $map = $('.js-map[data-area="' + $id + '"]')
    , $info = $('.js-servmap-item[data-area="' + $id + '"]')  //.find('.js-info')
    , $about = $('.js-about[data-area="' + $id + '"]')
    , $checkEvent = e.type.toLowerCase() == 'mouseenter';

    $info.toggleClass('_active', $checkEvent);
    $map.toggleClass('_active', $checkEvent);
    $about.toggleClass('_active', $checkEvent);
    $placeholder.toggleClass('_active', e.type.toLowerCase() == 'mouseleave');
  }

  function setRegWrapHeight() {
    var aboutsHeight = []
    , maxHeight;

    for (var i = 0; i < $allAbouts.length; i++) {
      aboutsHeight.push($allAbouts[i].clientHeight);
    }

    aboutsHeight.push($placeholder[0].clientHeight);
    maxHeight = (Math.max.apply(Math, aboutsHeight));
    $regWrap.css({'height': maxHeight});
  }

  $area.on('click', function (e) {
    e.preventDefault();
  });
});

// карта в about
$(function () {
  // return;
  var map = $('#dealers-800');
  var mapContainer = $('.map-container');

  if (!map.length) return;

  var mapX = mapContainer.offset().left;
  var mapY = mapContainer.offset().top;
  var mapH = mapContainer.height();
  var mapW = mapContainer.width();

  $(window).resize(function () {
    mapX = mapContainer.offset().left;
    mapY = mapContainer.offset().top;
    mapH = mapContainer.height();
    mapW = mapContainer.width();
  });

  var timeouts = {};
  var heights = {};

  map.find('AREA').click(function (e) {
    e.preventDefault();

    $('.countries-list').hide();

    var contId = this.id;
    var countries = $('.countries-list[data-continent="' + contId + '"]');
    if (!countries.length) return;

    if (typeof heights[contId] == 'undefined') {
      heights[contId] = countries.show().height();
      countries.hide();
    }

    var x = e.pageX - mapX + 20;
    var y = e.pageY - mapY - 100;

    if (y + heights[contId] > mapH) {
      while (y + heights[contId] > mapH) {
        y -= 10;
      }
    }

    if (y < 0) {
      y = 0;
    }

    if (x + countries.width() > mapW) {
      x -= countries.width() + 20;
    }

    countries.mouseenter(function () {
      clearTO(contId);
    }).mouseleave(function (e) {
      if ($(e.target).hasClass('countries-item')) {
        return;
      }
      startTO(contId);
    });

    countries.css({left: x, top: y}).show();
  }).mouseleave(function () {
    startTO(this.id);
  }).mousemove(function () {
    clearTO(this.id);
  });

  function clearTO(contId) {
    if (typeof(timeouts[contId]) != 'undefined') {
      clearTimeout(timeouts[contId]);
    }
  }

  function startTO(contId) {
    var countries = $('.countries-list[data-continent="' + contId + '"]');

    timeouts[contId] = setTimeout(function () {
      countries.hide();
    }, 100);
  }

  $('.countries-item').hover(function () {
    var text = $(this).find('.countries-item-text');

    text.removeClass('_left');

    var left = text.offset().left;
    var width = text.width();

    // console.clear()
    // console.log('-------')
    // console.log(mapX)
    // console.log(mapW)
    // console.log('-------')
    // console.log(left)
    // console.log(width)
    // console.log(left + width + 175)
    // console.log(mapX + mapW)

    text.removeClass('_left _right')

    if (left + width + 175 > mapX + mapW) {
      text.addClass('_left');
    } else {
      text.addClass('_right');
    }

    text.css('visibility', 'visible');

  });
});

// Карта в about
$(function () {
  return;
  var target = $('#dealers-800').find('AREA');
  if (!target.length) return;

  var el = {
    'map': $('#dealers-800')
    , 'allCountry': $('.countries-list')
  }
  , data = {
    'mapX': el.map.offset().left
    , 'mapY': el.map.offset().top
    , 'mapH': el.map.height()
    , 'mapW': el.map.width()
  }

  target.on('click', showPopup);

  //for iPad
  // if (Modernizr.touch) {
  //     $D.on('touchstart', function(e) {
  //         var $trgt = $(e.target).closest('.js-pin');

  //         target.removeClass('_active');
  //         if ($trgt.length) {
  //             $trgt.addClass('_active');
  //         }
  //     });
  // }

  $W.resize(function (event) {
    $('.js-tooltip').removeClass('_fix');
  });

  function showPopup(e) {
    e.preventDefault();
    var $that = $(this)
    , id = $that.attr('id')
    , $popup = $('.countries-list[data-continent="' + id + '"]')
    , popupW = $popup.width()
    , popupH;

    if ($popup.hasClass('_active')) {
      $popup.removeClass('_active');
      return;
    }

    // $popup.toggleClass('_active');
    el.allCountry.removeClass('_active');
    popupH = $popup.show().height();
    $popup.hide();

    // console.log(popupH)

    var x = e.clientX + 20;
    var y = e.clientY - 100;

    // if (y + popupH > data.mapH) {
    //     while (y + popupH > data.mapH) {
    //         y -= 10;
    //     }
    // }

    // if (y < 0) {
    //    y = 0;
    // }

    // if (x + popupW > data.mapW) {
    //     x -= popupW + 20;
    // }

    $popup.css({left: x, top: y}).toggleClass('_active');

    // var  thatOffset = $popup.position().left
    //     ,thatWidth = $popup.outerWidth()
    //     ,popupOffset = $popup.position().left
    //     ,popupWidth = $popup.outerWidth()
    //     ,offsetSum = thatOffset + thatWidth + popupOffset + popupWidth + 10;

    // if(data.mapWidth < offsetSum) {
    //     $popup.addClass('_fix');
    // }

  }
});

function dv(v) {
  console.log(v);
}


// Flexbox fallback
$.fn.inlineStyle = function (prop) {
  var styles = this.attr("style"),
      value;
  styles && styles.split(";").forEach(function (e) {
    var style = e.split(":");
    if ($.trim(style[0]) === prop) {
      value = style[1];
    }
  });
  return value;
};

function setWidth() {
  $('.no-flexbox .flex-container').not('.vertical').each(function () {
    var $el = $(this),
        widthPerBox = Math.ceil(100 / $el.find('> .flex-item').length);

    $el.children('.flex-item').each(function () {
      if ($(this).attr('data-width') !== undefined) {
        $(this).css('width', $(this).data('width') + '%');
      }
      // do not overwrite the actual width
      else if (!$(this).inlineStyle('width')) {
        $(this).css('width', widthPerBox + '%');
      }
    });
  });
}

// there is a problem while setting width and height at same time
// so I'm setting width then height
function setHeight() {
  $('.no-flexbox .flex-container').not('.vertical').each(function () {
    var $el = $(this),
        maxHeight = 0;

    $el.children('.flex-item').each(function () {
      // set height auto to reset the height
      $(this).css('height', 'auto');
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).outerHeight();
      }
    });
    // makes sure maxHeight is not equal to 0
    if (maxHeight) {
      $el.find(' >.flex-item').css('height', maxHeight);
    }
  });
}
function scrollToEl(element, offset) {
  var $el = $(element)
  , elOffset = $el.offset().top
  , offset = offset || 0

  $('HTML, BODY').animate({
    'scrollTop': elOffset - offset
  },
                          300);

}


$D.ready(function () {
  setWidth();
  setHeight();
});
$(window).resize(function () {
  setHeight();
});

//Popup in hypermarket
$(function () {
  var target = $('.js-pin');
  if (!target.length) return;

  target.on('mouseenter mouseleave', showPopup);

  //for iPad
  if (Modernizr.touch) {
    $D.on('touchstart', function (e) {
      var $trgt = $(e.target).closest('.js-pin');

      target.removeClass('_active');
      if ($trgt.length) {
        $trgt.addClass('_active');
      }
    });
  }

  $W.resize(function (event) {
    $('.js-tooltip').removeClass('_fix');
  });

  function showPopup(e) {
    var $that = $(this)
    , $popup = $that.closest('.js-pin-wr').find('.js-tooltip')
    , $scheme = $that.closest('.js-scheme')
    , contentWidth = $that.closest('.js-scheme').width();

    $popup.toggleClass('_active', e.type.toLowerCase() == 'mouseenter');

    if ($scheme.hasClass('js-scheme-3d')) {

      var thatOffset = $that.closest('.js-pin-wr').position().left
      , thatWidth = $that.closest('.js-pin-wr').outerWidth()
      , popupOffset = $popup.position().left
      , popupWidth = $popup.outerWidth()
      , offsetSum = thatOffset + thatWidth + popupOffset + popupWidth + 10;

      if (contentWidth < offsetSum) {
        $popup.addClass('_fix');
      }
    }

    if ($scheme.hasClass('js-scheme-2d') && !$popup.hasClass('_fix')) {

      var thatOffset = $that.closest('.js-pin-wr').position().left
      , thatWidth = $that.closest('.js-pin-wr').outerWidth()
      , popupArrWidth = $that.closest('.js-pin-wr').find('.js-tooltip').outerWidth()
      , popupWidth = $that.closest('.js-pin-wr').find('.pin-tooltip__text').outerWidth()
      , offsetSum = thatOffset + (thatWidth / 2) + popupArrWidth + popupWidth + 10;

      if (contentWidth < offsetSum && !$popup.hasClass('_fix')) {
        $popup.addClass('_fix');
      }
    }
  }
});

//Табуляция для кассового оборудования
$(function () {
  var context = $('.js-cash-scheme');
  if (!context.length) return;

  var el = {
    'tabMain': context
  }

  TabFilter.init(el.tabMain);

});

//Скролл по якорям на перечне продуктов
$(function () {
  $('.sub-nav-menu a').on('click', function (e) {
    e.preventDefault();
    $('HTML, BODY').animate({
      'scrollTop': $($(this).attr("href")).offset().top
    },
                            500);
  });
});


//$(function() {
//    var main_slider_pagi = $('.main-slider-pagi'),
//        bg;
//
//    main_slider_pagi.on('touchstart', function () {
//        bg = $(this).css('background');
//        //console.log(bg);
//    });
//
//    main_slider_pagi.on('touchend', function () {
//        $(this).css({ background: bg });
//    });
//});


// Кастомный скролл
$('.js-scroll').mCustomScrollbar();


// Список сервис-центров
$('.js-open-cities').on('click', function () {
  $('.js-cities-droplist').fadeOut(100);
  $(this).siblings('.js-cities-droplist').fadeIn(100);
})

$('.js-close-cities').on('click', function () {
  $('.js-cities-droplist').fadeOut(100);
})

$D.on('click', function (e) {
  if ($(e.target).closest('.js-cities-droplist').length) {
    return;
  } else if (!$(e.target).hasClass('js-open-cities')) {
    $('.js-cities-droplist').fadeOut(100);
  }
});


// Гарантийный купон
$('.js-coupon-input').on('change', function () {
  if ($(this).prop('checked')) {
    $('.js-coupon-file').removeAttr('disabled');
    $('.js-upload-coupon').removeClass('disabled');
    $('.js-coupon-descr').show();
  } else {
    $('.js-coupon-file').attr('disabled', true).val('').trigger('change');
    $('.js-upload-coupon').addClass('disabled');
    $('.js-coupon-descr').hide();
  }
});

$('.js-upload-coupon').on('click', function () {
  if ($(this).hasClass('disabled')) {
    return false;
  }
});

$('.js-coupon-file').on('change', function () {
  var val = $(this).val();
  if (val != '') {
    val = val.replace(/.*\\(.*)/, "$1").replace(/.*\/(.*)/, "$1");
    $('.js-coupon-path').html(val);
  } else {
    $('.js-coupon-path').html('');
  }
});

// Защита от спама
function spamProtect() {
  var d = new Date(),
      t = d.getTime();

  $('.js-partner-form').append('<input type="hidden" name="nospam" value="" class="js-nospam" />');

  $('.js-nospam').val(t);
}


spamProtect();

//Скролл для таблицы сервис-администатора
$(function () {
  var $table = $('.access-table');
  $table.floatThead({
    zIndex: 5,
    scrollContainer: function($table){
      return $table.closest('.wrapper-table');
    }
  });
});

