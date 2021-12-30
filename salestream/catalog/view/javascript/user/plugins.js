/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
      .one($.support.transition.end, removeElement)
      .emulateTransitionEnd(150) :
    removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
      this.sliding     =
      this.interval    =
      this.$active     =
      this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
    && !this.paused
    && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
        $next.removeClass([type, direction].join(' ')).addClass('active')
        $active.removeClass(['active', direction].join(' '))
        that.sliding = false
        setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
      })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
      this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal')
      }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
        .one($.support.transition.end, function () {
        that.$element.focus().trigger(e)
      })
        .emulateTransitionEnd(300) :
      that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
      .one($.support.transition.end, $.proxy(this.hideModal, this))
      .emulateTransitionEnd(300) :
    this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.focus()
      }
    }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
        : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(150) :
      callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
        .one($.support.transition.end, callback)
        .emulateTransitionEnd(150) :
      callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
      $this.is(':visible') && $this.focus()
    })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
      this.options    =
      this.enabled    =
      this.timeout    =
      this.hoverState =
      this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
    this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
      this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
        placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
        placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
        placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
        placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
      .one($.support.transition.end, complete)
      .emulateTransitionEnd(150) :
    complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
    placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
    placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
    /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
    || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
    || (typeof o.content == 'function' ?
        o.content.call($e[0]) :
        o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
    && $.support.transition
    && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
      .one($.support.transition.end, next)
      .emulateTransitionEnd(150) :
    next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
      this.unpin        =
      this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
    offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
    offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
    [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
      [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
    [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
    [dimension](this.$element[dimension]())
    [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
    [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
    || e.preventDefault()
    || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
                           || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
                           || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
    .find(this.selector)
    .map(function () {
      var $el   = $(this)
      var href  = $el.data('target') || $el.attr('href')
      var $href = /^#./.test(href) && $(href)

      return ($href
              && $href.length
              && $href.is(':visible')
              && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
    })
    .sort(function (a, b) { return a[0] - b[0] })
    .each(function () {
      self.offsets.push(this[0])
      self.targets.push(this[1])
    })
    }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
      && scrollTop >= offsets[i]
      && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
      && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
    .parents('li')
    .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
;/*! Hammer.JS - v1.1.3 - 2014-05-20
 * http://eightmedia.github.io/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

(function(window, undefined) {
  'use strict';

  /**
 * @main
 * @module hammer
 *
 * @class Hammer
 * @static
 */

  /**
 * Hammer, use this to create instances
 * ````
 * var hammertime = new Hammer(myElement);
 * ````
 *
 * @method Hammer
 * @param {HTMLElement} element
 * @param {Object} [options={}]
 * @return {Hammer.Instance}
 */
  var Hammer = function Hammer(element, options) {
    return new Hammer.Instance(element, options || {});
  };

  /**
 * version, as defined in package.json
 * the value will be set at each build
 * @property VERSION
 * @final
 * @type {String}
 */
  Hammer.VERSION = '1.1.3';

  /**
 * default settings.
 * more settings are defined per gesture at `/gestures`. Each gesture can be disabled/enabled
 * by setting it's name (like `swipe`) to false.
 * You can set the defaults for all instances by changing this object before creating an instance.
 * @example
 * ````
 *  Hammer.defaults.drag = false;
 *  Hammer.defaults.behavior.touchAction = 'pan-y';
 *  delete Hammer.defaults.behavior.userSelect;
 * ````
 * @property defaults
 * @type {Object}
 */
  Hammer.defaults = {
    /**
     * this setting object adds styles and attributes to the element to prevent the browser from doing
     * its native behavior. The css properties are auto prefixed for the browsers when needed.
     * @property defaults.behavior
     * @type {Object}
     */
    behavior: {
      /**
         * Disables text selection to improve the dragging gesture. When the value is `none` it also sets
         * `onselectstart=false` for IE on the element. Mainly for desktop browsers.
         * @property defaults.behavior.userSelect
         * @type {String}
         * @default 'none'
         */
      userSelect: 'none',

      /**
         * Specifies whether and how a given region can be manipulated by the user (for instance, by panning or zooming).
         * Used by Chrome 35> and IE10>. By default this makes the element blocking any touch event.
         * @property defaults.behavior.touchAction
         * @type {String}
         * @default: 'pan-y'
         */
      touchAction: 'pan-y',

      /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @property defaults.behavior.touchCallout
         * @type {String}
         * @default 'none'
         */
      touchCallout: 'none',

      /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @property defaults.behavior.contentZooming
         * @type {String}
         * @default 'none'
         */
      contentZooming: 'none',

      /**
         * Specifies that an entire element should be draggable instead of its contents.
         * Mainly for desktop browsers.
         * @property defaults.behavior.userDrag
         * @type {String}
         * @default 'none'
         */
      userDrag: 'none',

      /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in Safari on iPhone. This property obeys the alpha value, if specified.
         *
         * If you don't specify an alpha value, Safari on iPhone applies a default alpha value
         * to the color. To disable tap highlighting, set the alpha value to 0 (invisible).
         * If you set the alpha value to 1.0 (opaque), the element is not visible when tapped.
         * @property defaults.behavior.tapHighlightColor
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
      tapHighlightColor: 'rgba(0,0,0,0)'
    }
  };

  /**
 * hammer document where the base events are added at
 * @property DOCUMENT
 * @type {HTMLElement}
 * @default window.document
 */
  Hammer.DOCUMENT = document;

  /**
 * detect support for pointer events
 * @property HAS_POINTEREVENTS
 * @type {Boolean}
 */
  Hammer.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;

  /**
 * detect support for touch events
 * @property HAS_TOUCHEVENTS
 * @type {Boolean}
 */
  Hammer.HAS_TOUCHEVENTS = ('ontouchstart' in window);

  /**
 * detect mobile browsers
 * @property IS_MOBILE
 * @type {Boolean}
 */
  Hammer.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);

  /**
 * detect if we want to support mouseevents at all
 * @property NO_MOUSEEVENTS
 * @type {Boolean}
 */
  Hammer.NO_MOUSEEVENTS = (Hammer.HAS_TOUCHEVENTS && Hammer.IS_MOBILE) || Hammer.HAS_POINTEREVENTS;

  /**
 * interval in which Hammer recalculates current velocity/direction/angle in ms
 * @property CALCULATE_INTERVAL
 * @type {Number}
 * @default 25
 */
  Hammer.CALCULATE_INTERVAL = 25;

  /**
 * eventtypes per touchevent (start, move, end) are filled by `Event.determineEventTypes` on `setup`
 * the object contains the DOM event names per type (`EVENT_START`, `EVENT_MOVE`, `EVENT_END`)
 * @property EVENT_TYPES
 * @private
 * @writeOnce
 * @type {Object}
 */
  var EVENT_TYPES = {};

  /**
 * direction strings, for safe comparisons
 * @property DIRECTION_DOWN|LEFT|UP|RIGHT
 * @final
 * @type {String}
 * @default 'down' 'left' 'up' 'right'
 */
  var DIRECTION_DOWN = Hammer.DIRECTION_DOWN = 'down';
  var DIRECTION_LEFT = Hammer.DIRECTION_LEFT = 'left';
  var DIRECTION_UP = Hammer.DIRECTION_UP = 'up';
  var DIRECTION_RIGHT = Hammer.DIRECTION_RIGHT = 'right';

  /**
 * pointertype strings, for safe comparisons
 * @property POINTER_MOUSE|TOUCH|PEN
 * @final
 * @type {String}
 * @default 'mouse' 'touch' 'pen'
 */
  var POINTER_MOUSE = Hammer.POINTER_MOUSE = 'mouse';
  var POINTER_TOUCH = Hammer.POINTER_TOUCH = 'touch';
  var POINTER_PEN = Hammer.POINTER_PEN = 'pen';

  /**
 * eventtypes
 * @property EVENT_START|MOVE|END|RELEASE|TOUCH
 * @final
 * @type {String}
 * @default 'start' 'change' 'move' 'end' 'release' 'touch'
 */
  var EVENT_START = Hammer.EVENT_START = 'start';
  var EVENT_MOVE = Hammer.EVENT_MOVE = 'move';
  var EVENT_END = Hammer.EVENT_END = 'end';
  var EVENT_RELEASE = Hammer.EVENT_RELEASE = 'release';
  var EVENT_TOUCH = Hammer.EVENT_TOUCH = 'touch';

  /**
 * if the window events are set...
 * @property READY
 * @writeOnce
 * @type {Boolean}
 * @default false
 */
  Hammer.READY = false;

  /**
 * plugins namespace
 * @property plugins
 * @type {Object}
 */
  Hammer.plugins = Hammer.plugins || {};

  /**
 * gestures namespace
 * see `/gestures` for the definitions
 * @property gestures
 * @type {Object}
 */
  Hammer.gestures = Hammer.gestures || {};

  /**
 * setup events to detect gestures on the document
 * this function is called when creating an new instance
 * @private
 */
  function setup() {
    if(Hammer.READY) {
      return;
    }

    // find what eventtypes we add listeners to
    Event.determineEventTypes();

    // Register all gestures inside Hammer.gestures
    Utils.each(Hammer.gestures, function(gesture) {
      Detection.register(gesture);
    });

    // Add touch events on the document
    Event.onTouch(Hammer.DOCUMENT, EVENT_MOVE, Detection.detect);
    Event.onTouch(Hammer.DOCUMENT, EVENT_END, Detection.detect);

    // Hammer is ready...!
    Hammer.READY = true;
  }

  /**
 * @module hammer
 *
 * @class Utils
 * @static
 */
  var Utils = Hammer.utils = {
    /**
     * extend method, could also be used for cloning when `dest` is an empty object.
     * changes the dest object
     * @method extend
     * @param {Object} dest
     * @param {Object} src
     * @param {Boolean} [merge=false]  do a merge
     * @return {Object} dest
     */
    extend: function extend(dest, src, merge) {
      for(var key in src) {
        if(!src.hasOwnProperty(key) || (dest[key] !== undefined && merge)) {
          continue;
        }
        dest[key] = src[key];
      }
      return dest;
    },

    /**
     * simple addEventListener wrapper
     * @method on
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     */
    on: function on(element, type, handler) {
      element.addEventListener(type, handler, false);
    },

    /**
     * simple removeEventListener wrapper
     * @method off
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     */
    off: function off(element, type, handler) {
      element.removeEventListener(type, handler, false);
    },

    /**
     * forEach over arrays and objects
     * @method each
     * @param {Object|Array} obj
     * @param {Function} iterator
     * @param {any} iterator.item
     * @param {Number} iterator.index
     * @param {Object|Array} iterator.obj the source object
     * @param {Object} context value to use as `this` in the iterator
     */
    each: function each(obj, iterator, context) {
      var i, len;

      // native forEach on arrays
      if('forEach' in obj) {
        obj.forEach(iterator, context);
        // arrays
      } else if(obj.length !== undefined) {
        for(i = 0, len = obj.length; i < len; i++) {
          if(iterator.call(context, obj[i], i, obj) === false) {
            return;
          }
        }
        // objects
      } else {
        for(i in obj) {
          if(obj.hasOwnProperty(i) &&
             iterator.call(context, obj[i], i, obj) === false) {
            return;
          }
        }
      }
    },

    /**
     * find if a string contains the string using indexOf
     * @method inStr
     * @param {String} src
     * @param {String} find
     * @return {Boolean} found
     */
    inStr: function inStr(src, find) {
      return src.indexOf(find) > -1;
    },

    /**
     * find if a array contains the object using indexOf or a simple polyfill
     * @method inArray
     * @param {String} src
     * @param {String} find
     * @return {Boolean|Number} false when not found, or the index
     */
    inArray: function inArray(src, find) {
      if(src.indexOf) {
        var index = src.indexOf(find);
        return (index === -1) ? false : index;
      } else {
        for(var i = 0, len = src.length; i < len; i++) {
          if(src[i] === find) {
            return i;
          }
        }
        return false;
      }
    },

    /**
     * convert an array-like object (`arguments`, `touchlist`) to an array
     * @method toArray
     * @param {Object} obj
     * @return {Array}
     */
    toArray: function toArray(obj) {
      return Array.prototype.slice.call(obj, 0);
    },

    /**
     * find if a node is in the given parent
     * @method hasParent
     * @param {HTMLElement} node
     * @param {HTMLElement} parent
     * @return {Boolean} found
     */
    hasParent: function hasParent(node, parent) {
      while(node) {
        if(node == parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    },

    /**
     * get the center of all the touches
     * @method getCenter
     * @param {Array} touches
     * @return {Object} center contains `pageX`, `pageY`, `clientX` and `clientY` properties
     */
    getCenter: function getCenter(touches) {
      var pageX = [],
          pageY = [],
          clientX = [],
          clientY = [],
          min = Math.min,
          max = Math.max;

      // no need to loop when only one touch
      if(touches.length === 1) {
        return {
          pageX: touches[0].pageX,
          pageY: touches[0].pageY,
          clientX: touches[0].clientX,
          clientY: touches[0].clientY
        };
      }

      Utils.each(touches, function(touch) {
        pageX.push(touch.pageX);
        pageY.push(touch.pageY);
        clientX.push(touch.clientX);
        clientY.push(touch.clientY);
      });

      return {
        pageX: (min.apply(Math, pageX) + max.apply(Math, pageX)) / 2,
        pageY: (min.apply(Math, pageY) + max.apply(Math, pageY)) / 2,
        clientX: (min.apply(Math, clientX) + max.apply(Math, clientX)) / 2,
        clientY: (min.apply(Math, clientY) + max.apply(Math, clientY)) / 2
      };
    },

    /**
     * calculate the velocity between two points. unit is in px per ms.
     * @method getVelocity
     * @param {Number} deltaTime
     * @param {Number} deltaX
     * @param {Number} deltaY
     * @return {Object} velocity `x` and `y`
     */
    getVelocity: function getVelocity(deltaTime, deltaX, deltaY) {
      return {
        x: Math.abs(deltaX / deltaTime) || 0,
        y: Math.abs(deltaY / deltaTime) || 0
      };
    },

    /**
     * calculate the angle between two coordinates
     * @method getAngle
     * @param {Touch} touch1
     * @param {Touch} touch2
     * @return {Number} angle
     */
    getAngle: function getAngle(touch1, touch2) {
      var x = touch2.clientX - touch1.clientX,
          y = touch2.clientY - touch1.clientY;

      return Math.atan2(y, x) * 180 / Math.PI;
    },

    /**
     * do a small comparision to get the direction between two touches.
     * @method getDirection
     * @param {Touch} touch1
     * @param {Touch} touch2
     * @return {String} direction matches `DIRECTION_LEFT|RIGHT|UP|DOWN`
     */
    getDirection: function getDirection(touch1, touch2) {
      var x = Math.abs(touch1.clientX - touch2.clientX),
          y = Math.abs(touch1.clientY - touch2.clientY);

      if(x >= y) {
        return touch1.clientX - touch2.clientX > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return touch1.clientY - touch2.clientY > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    },

    /**
     * calculate the distance between two touches
     * @method getDistance
     * @param {Touch}touch1
     * @param {Touch} touch2
     * @return {Number} distance
     */
    getDistance: function getDistance(touch1, touch2) {
      var x = touch2.clientX - touch1.clientX,
          y = touch2.clientY - touch1.clientY;

      return Math.sqrt((x * x) + (y * y));
    },

    /**
     * calculate the scale factor between two touchLists
     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
     * @method getScale
     * @param {Array} start array of touches
     * @param {Array} end array of touches
     * @return {Number} scale
     */
    getScale: function getScale(start, end) {
      // need two fingers...
      if(start.length >= 2 && end.length >= 2) {
        return this.getDistance(end[0], end[1]) / this.getDistance(start[0], start[1]);
      }
      return 1;
    },

    /**
     * calculate the rotation degrees between two touchLists
     * @method getRotation
     * @param {Array} start array of touches
     * @param {Array} end array of touches
     * @return {Number} rotation
     */
    getRotation: function getRotation(start, end) {
      // need two fingers
      if(start.length >= 2 && end.length >= 2) {
        return this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0]);
      }
      return 0;
    },

    /**
     * find out if the direction is vertical   *
     * @method isVertical
     * @param {String} direction matches `DIRECTION_UP|DOWN`
     * @return {Boolean} is_vertical
     */
    isVertical: function isVertical(direction) {
      return direction == DIRECTION_UP || direction == DIRECTION_DOWN;
    },

    /**
     * set css properties with their prefixes
     * @param {HTMLElement} element
     * @param {String} prop
     * @param {String} value
     * @param {Boolean} [toggle=true]
     * @return {Boolean}
     */
    setPrefixedCss: function setPrefixedCss(element, prop, value, toggle) {
      var prefixes = ['', 'Webkit', 'Moz', 'O', 'ms'];
      prop = Utils.toCamelCase(prop);

      for(var i = 0; i < prefixes.length; i++) {
        var p = prop;
        // prefixes
        if(prefixes[i]) {
          p = prefixes[i] + p.slice(0, 1).toUpperCase() + p.slice(1);
        }

        // test the style
        if(p in element.style) {
          element.style[p] = (toggle == null || toggle) && value || '';
          break;
        }
      }
    },

    /**
     * toggle browser default behavior by setting css properties.
     * `userSelect='none'` also sets `element.onselectstart` to false
     * `userDrag='none'` also sets `element.ondragstart` to false
     *
     * @method toggleBehavior
     * @param {HtmlElement} element
     * @param {Object} props
     * @param {Boolean} [toggle=true]
     */
    toggleBehavior: function toggleBehavior(element, props, toggle) {
      if(!props || !element || !element.style) {
        return;
      }

      // set the css properties
      Utils.each(props, function(value, prop) {
        Utils.setPrefixedCss(element, prop, value, toggle);
      });

      var falseFn = toggle && function() {
        return false;
      };

      // also the disable onselectstart
      if(props.userSelect == 'none') {
        element.onselectstart = falseFn;
      }
      // and disable ondragstart
      if(props.userDrag == 'none') {
        element.ondragstart = falseFn;
      }
    },

    /**
     * convert a string with underscores to camelCase
     * so prevent_default becomes preventDefault
     * @param {String} str
     * @return {String} camelCaseStr
     */
    toCamelCase: function toCamelCase(str) {
      return str.replace(/[_-]([a-z])/g, function(s) {
        return s[1].toUpperCase();
      });
    }
  };


  /**
 * @module hammer
 */
  /**
 * @class Event
 * @static
 */
  var Event = Hammer.event = {
    /**
     * when touch events have been fired, this is true
     * this is used to stop mouse events
     * @property prevent_mouseevents
     * @private
     * @type {Boolean}
     */
    preventMouseEvents: false,

    /**
     * if EVENT_START has been fired
     * @property started
     * @private
     * @type {Boolean}
     */
    started: false,

    /**
     * when the mouse is hold down, this is true
     * @property should_detect
     * @private
     * @type {Boolean}
     */
    shouldDetect: false,

    /**
     * simple event binder with a hook and support for multiple types
     * @method on
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     * @param {Function} [hook]
     * @param {Object} hook.type
     */
    on: function on(element, type, handler, hook) {
      var types = type.split(' ');
      Utils.each(types, function(type) {
        Utils.on(element, type, handler);
        hook && hook(type);
      });
    },

    /**
     * simple event unbinder with a hook and support for multiple types
     * @method off
     * @param {HTMLElement} element
     * @param {String} type
     * @param {Function} handler
     * @param {Function} [hook]
     * @param {Object} hook.type
     */
    off: function off(element, type, handler, hook) {
      var types = type.split(' ');
      Utils.each(types, function(type) {
        Utils.off(element, type, handler);
        hook && hook(type);
      });
    },

    /**
     * the core touch event handler.
     * this finds out if we should to detect gestures
     * @method onTouch
     * @param {HTMLElement} element
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {Function} handler
     * @return onTouchHandler {Function} the core event handler
     */
    onTouch: function onTouch(element, eventType, handler) {
      var self = this;

      var onTouchHandler = function onTouchHandler(ev) {
        var srcType = ev.type.toLowerCase(),
            isPointer = Hammer.HAS_POINTEREVENTS,
            isMouse = Utils.inStr(srcType, 'mouse'),
            triggerType;

        // if we are in a mouseevent, but there has been a touchevent triggered in this session
        // we want to do nothing. simply break out of the event.
        if(isMouse && self.preventMouseEvents) {
          return;

          // mousebutton must be down
        } else if(isMouse && eventType == EVENT_START && ev.button === 0) {
          self.preventMouseEvents = false;
          self.shouldDetect = true;
        } else if(isPointer && eventType == EVENT_START) {
          self.shouldDetect = (ev.buttons === 1 || PointerEvent.matchType(POINTER_TOUCH, ev));
          // just a valid start event, but no mouse
        } else if(!isMouse && eventType == EVENT_START) {
          self.preventMouseEvents = true;
          self.shouldDetect = true;
        }

        // update the pointer event before entering the detection
        if(isPointer && eventType != EVENT_END) {
          PointerEvent.updatePointer(eventType, ev);
        }

        // we are in a touch/down state, so allowed detection of gestures
        if(self.shouldDetect) {
          triggerType = self.doDetect.call(self, ev, eventType, element, handler);
        }

        // ...and we are done with the detection
        // so reset everything to start each detection totally fresh
        if(triggerType == EVENT_END) {
          self.preventMouseEvents = false;
          self.shouldDetect = false;
          PointerEvent.reset();
          // update the pointerevent object after the detection
        }

        if(isPointer && eventType == EVENT_END) {
          PointerEvent.updatePointer(eventType, ev);
        }
      };

      this.on(element, EVENT_TYPES[eventType], onTouchHandler);
      return onTouchHandler;
    },

    /**
     * the core detection method
     * this finds out what hammer-touch-events to trigger
     * @method doDetect
     * @param {Object} ev
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {HTMLElement} element
     * @param {Function} handler
     * @return {String} triggerType matches `EVENT_START|MOVE|END`
     */
    doDetect: function doDetect(ev, eventType, element, handler) {
      var touchList = this.getTouchList(ev, eventType);
      var touchListLength = touchList.length;
      var triggerType = eventType;
      var triggerChange = touchList.trigger; // used by fakeMultitouch plugin
      var changedLength = touchListLength;

      // at each touchstart-like event we want also want to trigger a TOUCH event...
      if(eventType == EVENT_START) {
        triggerChange = EVENT_TOUCH;
        // ...the same for a touchend-like event
      } else if(eventType == EVENT_END) {
        triggerChange = EVENT_RELEASE;

        // keep track of how many touches have been removed
        changedLength = touchList.length - ((ev.changedTouches) ? ev.changedTouches.length : 1);
      }

      // after there are still touches on the screen,
      // we just want to trigger a MOVE event. so change the START or END to a MOVE
      // but only after detection has been started, the first time we actualy want a START
      if(changedLength > 0 && this.started) {
        triggerType = EVENT_MOVE;
      }

      // detection has been started, we keep track of this, see above
      this.started = true;

      // generate some event data, some basic information
      var evData = this.collectEventData(element, triggerType, touchList, ev);

      // trigger the triggerType event before the change (TOUCH, RELEASE) events
      // but the END event should be at last
      if(eventType != EVENT_END) {
        handler.call(Detection, evData);
      }

      // trigger a change (TOUCH, RELEASE) event, this means the length of the touches changed
      if(triggerChange) {
        evData.changedLength = changedLength;
        evData.eventType = triggerChange;

        handler.call(Detection, evData);

        evData.eventType = triggerType;
        delete evData.changedLength;
      }

      // trigger the END event
      if(triggerType == EVENT_END) {
        handler.call(Detection, evData);

        // ...and we are done with the detection
        // so reset everything to start each detection totally fresh
        this.started = false;
      }

      return triggerType;
    },

    /**
     * we have different events for each device/browser
     * determine what we need and set them in the EVENT_TYPES constant
     * the `onTouch` method is bind to these properties.
     * @method determineEventTypes
     * @return {Object} events
     */
    determineEventTypes: function determineEventTypes() {
      var types;
      if(Hammer.HAS_POINTEREVENTS) {
        if(window.PointerEvent) {
          types = [
            'pointerdown',
            'pointermove',
            'pointerup pointercancel lostpointercapture'
          ];
        } else {
          types = [
            'MSPointerDown',
            'MSPointerMove',
            'MSPointerUp MSPointerCancel MSLostPointerCapture'
          ];
        }
      } else if(Hammer.NO_MOUSEEVENTS) {
        types = [
          'touchstart',
          'touchmove',
          'touchend touchcancel'
        ];
      } else {
        types = [
          'touchstart mousedown',
          'touchmove mousemove',
          'touchend touchcancel mouseup'
        ];
      }

      EVENT_TYPES[EVENT_START] = types[0];
      EVENT_TYPES[EVENT_MOVE] = types[1];
      EVENT_TYPES[EVENT_END] = types[2];
      return EVENT_TYPES;
    },

    /**
     * create touchList depending on the event
     * @method getTouchList
     * @param {Object} ev
     * @param {String} eventType
     * @return {Array} touches
     */
    getTouchList: function getTouchList(ev, eventType) {
      // get the fake pointerEvent touchlist
      if(Hammer.HAS_POINTEREVENTS) {
        return PointerEvent.getTouchList();
      }

      // get the touchlist
      if(ev.touches) {
        if(eventType == EVENT_MOVE) {
          return ev.touches;
        }

        var identifiers = [];
        var concat = [].concat(Utils.toArray(ev.touches), Utils.toArray(ev.changedTouches));
        var touchList = [];

        Utils.each(concat, function(touch) {
          if(Utils.inArray(identifiers, touch.identifier) === false) {
            touchList.push(touch);
          }
          identifiers.push(touch.identifier);
        });

        return touchList;
      }

      // make fake touchList from mouse position
      ev.identifier = 1;
      return [ev];
    },

    /**
     * collect basic event data
     * @method collectEventData
     * @param {HTMLElement} element
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {Array} touches
     * @param {Object} ev
     * @return {Object} ev
     */
    collectEventData: function collectEventData(element, eventType, touches, ev) {
      // find out pointerType
      var pointerType = POINTER_TOUCH;
      if(Utils.inStr(ev.type, 'mouse') || PointerEvent.matchType(POINTER_MOUSE, ev)) {
        pointerType = POINTER_MOUSE;
      } else if(PointerEvent.matchType(POINTER_PEN, ev)) {
        pointerType = POINTER_PEN;
      }

      return {
        center: Utils.getCenter(touches),
        timeStamp: Date.now(),
        target: ev.target,
        touches: touches,
        eventType: eventType,
        pointerType: pointerType,
        srcEvent: ev,

        /**
             * prevent the browser default actions
             * mostly used to disable scrolling of the browser
             */
        preventDefault: function() {
          var srcEvent = this.srcEvent;
          srcEvent.preventManipulation && srcEvent.preventManipulation();
          srcEvent.preventDefault && srcEvent.preventDefault();
        },

        /**
             * stop bubbling the event up to its parents
             */
        stopPropagation: function() {
          this.srcEvent.stopPropagation();
        },

        /**
             * immediately stop gesture detection
             * might be useful after a swipe was detected
             * @return {*}
             */
        stopDetect: function() {
          return Detection.stopDetect();
        }
      };
    }
  };


  /**
 * @module hammer
 *
 * @class PointerEvent
 * @static
 */
  var PointerEvent = Hammer.PointerEvent = {
    /**
     * holds all pointers, by `identifier`
     * @property pointers
     * @type {Object}
     */
    pointers: {},

    /**
     * get the pointers as an array
     * @method getTouchList
     * @return {Array} touchlist
     */
    getTouchList: function getTouchList() {
      var touchlist = [];
      // we can use forEach since pointerEvents only is in IE10
      Utils.each(this.pointers, function(pointer) {
        touchlist.push(pointer);
      });
      return touchlist;
    },

    /**
     * update the position of a pointer
     * @method updatePointer
     * @param {String} eventType matches `EVENT_START|MOVE|END`
     * @param {Object} pointerEvent
     */
    updatePointer: function updatePointer(eventType, pointerEvent) {
      if(eventType == EVENT_END || (eventType != EVENT_END && pointerEvent.buttons !== 1)) {
        delete this.pointers[pointerEvent.pointerId];
      } else {
        pointerEvent.identifier = pointerEvent.pointerId;
        this.pointers[pointerEvent.pointerId] = pointerEvent;
      }
    },

    /**
     * check if ev matches pointertype
     * @method matchType
     * @param {String} pointerType matches `POINTER_MOUSE|TOUCH|PEN`
     * @param {PointerEvent} ev
     */
    matchType: function matchType(pointerType, ev) {
      if(!ev.pointerType) {
        return false;
      }

      var pt = ev.pointerType,
          types = {};

      types[POINTER_MOUSE] = (pt === (ev.MSPOINTER_TYPE_MOUSE || POINTER_MOUSE));
      types[POINTER_TOUCH] = (pt === (ev.MSPOINTER_TYPE_TOUCH || POINTER_TOUCH));
      types[POINTER_PEN] = (pt === (ev.MSPOINTER_TYPE_PEN || POINTER_PEN));
      return types[pointerType];
    },

    /**
     * reset the stored pointers
     * @method reset
     */
    reset: function resetList() {
      this.pointers = {};
    }
  };


  /**
 * @module hammer
 *
 * @class Detection
 * @static
 */
  var Detection = Hammer.detection = {
    // contains all registred Hammer.gestures in the correct order
    gestures: [],

    // data of the current Hammer.gesture detection session
    current: null,

    // the previous Hammer.gesture session data
    // is a full clone of the previous gesture.current object
    previous: null,

    // when this becomes true, no gestures are fired
    stopped: false,

    /**
     * start Hammer.gesture detection
     * @method startDetect
     * @param {Hammer.Instance} inst
     * @param {Object} eventData
     */
    startDetect: function startDetect(inst, eventData) {
      // already busy with a Hammer.gesture detection on an element
      if(this.current) {
        return;
      }

      this.stopped = false;

      // holds current session
      this.current = {
        inst: inst, // reference to HammerInstance we're working for
        startEvent: Utils.extend({}, eventData), // start eventData for distances, timing etc
        lastEvent: false, // last eventData
        lastCalcEvent: false, // last eventData for calculations.
        futureCalcEvent: false, // last eventData for calculations.
        lastCalcData: {}, // last lastCalcData
        name: '' // current gesture we're in/detected, can be 'tap', 'hold' etc
      };

      this.detect(eventData);
    },

    /**
     * Hammer.gesture detection
     * @method detect
     * @param {Object} eventData
     * @return {any}
     */
    detect: function detect(eventData) {
      if(!this.current || this.stopped) {
        return;
      }

      // extend event data with calculations about scale, distance etc
      eventData = this.extendEventData(eventData);

      // hammer instance and instance options
      var inst = this.current.inst,
          instOptions = inst.options;

      // call Hammer.gesture handlers
      Utils.each(this.gestures, function triggerGesture(gesture) {
        // only when the instance options have enabled this gesture
        if(!this.stopped && inst.enabled && instOptions[gesture.name]) {
          gesture.handler.call(gesture, eventData, inst);
        }
      }, this);

      // store as previous event event
      if(this.current) {
        this.current.lastEvent = eventData;
      }

      if(eventData.eventType == EVENT_END) {
        this.stopDetect();
      }

      return eventData;
    },

    /**
     * clear the Hammer.gesture vars
     * this is called on endDetect, but can also be used when a final Hammer.gesture has been detected
     * to stop other Hammer.gestures from being fired
     * @method stopDetect
     */
    stopDetect: function stopDetect() {
      // clone current data to the store as the previous gesture
      // used for the double tap gesture, since this is an other gesture detect session
      this.previous = Utils.extend({}, this.current);

      // reset the current
      this.current = null;
      this.stopped = true;
    },

    /**
     * calculate velocity, angle and direction
     * @method getVelocityData
     * @param {Object} ev
     * @param {Object} center
     * @param {Number} deltaTime
     * @param {Number} deltaX
     * @param {Number} deltaY
     */
    getCalculatedData: function getCalculatedData(ev, center, deltaTime, deltaX, deltaY) {
      var cur = this.current,
          recalc = false,
          calcEv = cur.lastCalcEvent,
          calcData = cur.lastCalcData;

      if(calcEv && ev.timeStamp - calcEv.timeStamp > Hammer.CALCULATE_INTERVAL) {
        center = calcEv.center;
        deltaTime = ev.timeStamp - calcEv.timeStamp;
        deltaX = ev.center.clientX - calcEv.center.clientX;
        deltaY = ev.center.clientY - calcEv.center.clientY;
        recalc = true;
      }

      if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
        cur.futureCalcEvent = ev;
      }

      if(!cur.lastCalcEvent || recalc) {
        calcData.velocity = Utils.getVelocity(deltaTime, deltaX, deltaY);
        calcData.angle = Utils.getAngle(center, ev.center);
        calcData.direction = Utils.getDirection(center, ev.center);

        cur.lastCalcEvent = cur.futureCalcEvent || ev;
        cur.futureCalcEvent = ev;
      }

      ev.velocityX = calcData.velocity.x;
      ev.velocityY = calcData.velocity.y;
      ev.interimAngle = calcData.angle;
      ev.interimDirection = calcData.direction;
    },

    /**
     * extend eventData for Hammer.gestures
     * @method extendEventData
     * @param {Object} ev
     * @return {Object} ev
     */
    extendEventData: function extendEventData(ev) {
      var cur = this.current,
          startEv = cur.startEvent,
          lastEv = cur.lastEvent || startEv;

      // update the start touchlist to calculate the scale/rotation
      if(ev.eventType == EVENT_TOUCH || ev.eventType == EVENT_RELEASE) {
        startEv.touches = [];
        Utils.each(ev.touches, function(touch) {
          startEv.touches.push({
            clientX: touch.clientX,
            clientY: touch.clientY
          });
        });
      }

      var deltaTime = ev.timeStamp - startEv.timeStamp,
          deltaX = ev.center.clientX - startEv.center.clientX,
          deltaY = ev.center.clientY - startEv.center.clientY;

      this.getCalculatedData(ev, lastEv.center, deltaTime, deltaX, deltaY);

      Utils.extend(ev, {
        startEvent: startEv,

        deltaTime: deltaTime,
        deltaX: deltaX,
        deltaY: deltaY,

        distance: Utils.getDistance(startEv.center, ev.center),
        angle: Utils.getAngle(startEv.center, ev.center),
        direction: Utils.getDirection(startEv.center, ev.center),
        scale: Utils.getScale(startEv.touches, ev.touches),
        rotation: Utils.getRotation(startEv.touches, ev.touches)
      });

      return ev;
    },

    /**
     * register new gesture
     * @method register
     * @param {Object} gesture object, see `gestures/` for documentation
     * @return {Array} gestures
     */
    register: function register(gesture) {
      // add an enable gesture options if there is no given
      var options = gesture.defaults || {};
      if(options[gesture.name] === undefined) {
        options[gesture.name] = true;
      }

      // extend Hammer default options with the Hammer.gesture options
      Utils.extend(Hammer.defaults, options, true);

      // set its index
      gesture.index = gesture.index || 1000;

      // add Hammer.gesture to the list
      this.gestures.push(gesture);

      // sort the list by index
      this.gestures.sort(function(a, b) {
        if(a.index < b.index) {
          return -1;
        }
        if(a.index > b.index) {
          return 1;
        }
        return 0;
      });

      return this.gestures;
    }
  };


  /**
 * @module hammer
 */

  /**
 * create new hammer instance
 * all methods should return the instance itself, so it is chainable.
 *
 * @class Instance
 * @constructor
 * @param {HTMLElement} element
 * @param {Object} [options={}] options are merged with `Hammer.defaults`
 * @return {Hammer.Instance}
 */
  Hammer.Instance = function(element, options) {
    var self = this;

    // setup HammerJS window events and register all gestures
    // this also sets up the default options
    setup();

    /**
     * @property element
     * @type {HTMLElement}
     */
    this.element = element;

    /**
     * @property enabled
     * @type {Boolean}
     * @protected
     */
    this.enabled = true;

    /**
     * options, merged with the defaults
     * options with an _ are converted to camelCase
     * @property options
     * @type {Object}
     */
    Utils.each(options, function(value, name) {
      delete options[name];
      options[Utils.toCamelCase(name)] = value;
    });

    this.options = Utils.extend(Utils.extend({}, Hammer.defaults), options || {});

    // add some css to the element to prevent the browser from doing its native behavoir
    if(this.options.behavior) {
      Utils.toggleBehavior(this.element, this.options.behavior, true);
    }

    /**
     * event start handler on the element to start the detection
     * @property eventStartHandler
     * @type {Object}
     */
    this.eventStartHandler = Event.onTouch(element, EVENT_START, function(ev) {
      if(self.enabled && ev.eventType == EVENT_START) {
        Detection.startDetect(self, ev);
      } else if(ev.eventType == EVENT_TOUCH) {
        Detection.detect(ev);
      }
    });

    /**
     * keep a list of user event handlers which needs to be removed when calling 'dispose'
     * @property eventHandlers
     * @type {Array}
     */
    this.eventHandlers = [];
  };

  Hammer.Instance.prototype = {
    /**
     * bind events to the instance
     * @method on
     * @chainable
     * @param {String} gestures multiple gestures by splitting with a space
     * @param {Function} handler
     * @param {Object} handler.ev event object
     */
    on: function onEvent(gestures, handler) {
      var self = this;
      Event.on(self.element, gestures, handler, function(type) {
        self.eventHandlers.push({ gesture: type, handler: handler });
      });
      return self;
    },

    /**
     * unbind events to the instance
     * @method off
     * @chainable
     * @param {String} gestures
     * @param {Function} handler
     */
    off: function offEvent(gestures, handler) {
      var self = this;

      Event.off(self.element, gestures, handler, function(type) {
        var index = Utils.inArray({ gesture: type, handler: handler });
        if(index !== false) {
          self.eventHandlers.splice(index, 1);
        }
      });
      return self;
    },

    /**
     * trigger gesture event
     * @method trigger
     * @chainable
     * @param {String} gesture
     * @param {Object} [eventData]
     */
    trigger: function triggerEvent(gesture, eventData) {
      // optional
      if(!eventData) {
        eventData = {};
      }

      // create DOM event
      var event = Hammer.DOCUMENT.createEvent('Event');
      event.initEvent(gesture, true, true);
      event.gesture = eventData;

      // trigger on the target if it is in the instance element,
      // this is for event delegation tricks
      var element = this.element;
      if(Utils.hasParent(eventData.target, element)) {
        element = eventData.target;
      }

      element.dispatchEvent(event);
      return this;
    },

    /**
     * enable of disable hammer.js detection
     * @method enable
     * @chainable
     * @param {Boolean} state
     */
    enable: function enable(state) {
      this.enabled = state;
      return this;
    },

    /**
     * dispose this hammer instance
     * @method dispose
     * @return {Null}
     */
    dispose: function dispose() {
      var i, eh;

      // undo all changes made by stop_browser_behavior
      Utils.toggleBehavior(this.element, this.options.behavior, false);

      // unbind all custom event handlers
      for(i = -1; (eh = this.eventHandlers[++i]);) {
        Utils.off(this.element, eh.gesture, eh.handler);
      }

      this.eventHandlers = [];

      // unbind the start event listener
      Event.off(this.element, EVENT_TYPES[EVENT_START], this.eventStartHandler);

      return null;
    }
  };


  /**
 * @module gestures
 */
  /**
 * Move with x fingers (default 1) around on the page.
 * Preventing the default browser behavior is a good way to improve feel and working.
 * ````
 *  hammertime.on("drag", function(ev) {
 *    console.log(ev);
 *    ev.gesture.preventDefault();
 *  });
 * ````
 *
 * @class Drag
 * @static
 */
  /**
 * @event drag
 * @param {Object} ev
 */
  /**
 * @event dragstart
 * @param {Object} ev
 */
  /**
 * @event dragend
 * @param {Object} ev
 */
  /**
 * @event drapleft
 * @param {Object} ev
 */
  /**
 * @event dragright
 * @param {Object} ev
 */
  /**
 * @event dragup
 * @param {Object} ev
 */
  /**
 * @event dragdown
 * @param {Object} ev
 */

  /**
 * @param {String} name
 */
  (function(name) {
    var triggered = false;

    function dragGesture(ev, inst) {
      var cur = Detection.current;

      // max touches
      if(inst.options.dragMaxTouches > 0 &&
         ev.touches.length > inst.options.dragMaxTouches) {
        return;
      }

      switch(ev.eventType) {
        case EVENT_START:
          triggered = false;
          break;

        case EVENT_MOVE:
          // when the distance we moved is too small we skip this gesture
          // or we can be already in dragging
          if(ev.distance < inst.options.dragMinDistance &&
             cur.name != name) {
            return;
          }

          var startCenter = cur.startEvent.center;

          // we are dragging!
          if(cur.name != name) {
            cur.name = name;
            if(inst.options.dragDistanceCorrection && ev.distance > 0) {
              // When a drag is triggered, set the event center to dragMinDistance pixels from the original event center.
              // Without this correction, the dragged distance would jumpstart at dragMinDistance pixels instead of at 0.
              // It might be useful to save the original start point somewhere
              var factor = Math.abs(inst.options.dragMinDistance / ev.distance);
              startCenter.pageX += ev.deltaX * factor;
              startCenter.pageY += ev.deltaY * factor;
              startCenter.clientX += ev.deltaX * factor;
              startCenter.clientY += ev.deltaY * factor;

              // recalculate event data using new start point
              ev = Detection.extendEventData(ev);
            }
          }

          // lock drag to axis?
          if(cur.lastEvent.dragLockToAxis ||
             ( inst.options.dragLockToAxis &&
              inst.options.dragLockMinDistance <= ev.distance
             )) {
            ev.dragLockToAxis = true;
          }

          // keep direction on the axis that the drag gesture started on
          var lastDirection = cur.lastEvent.direction;
          if(ev.dragLockToAxis && lastDirection !== ev.direction) {
            if(Utils.isVertical(lastDirection)) {
              ev.direction = (ev.deltaY < 0) ? DIRECTION_UP : DIRECTION_DOWN;
            } else {
              ev.direction = (ev.deltaX < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
            }
          }

          // first time, trigger dragstart event
          if(!triggered) {
            inst.trigger(name + 'start', ev);
            triggered = true;
          }

          // trigger events
          inst.trigger(name, ev);
          inst.trigger(name + ev.direction, ev);

          var isVertical = Utils.isVertical(ev.direction);

          // block the browser events
          if((inst.options.dragBlockVertical && isVertical) ||
             (inst.options.dragBlockHorizontal && !isVertical)) {
            ev.preventDefault();
          }
          break;

        case EVENT_RELEASE:
          if(triggered && ev.changedLength <= inst.options.dragMaxTouches) {
            inst.trigger(name + 'end', ev);
            triggered = false;
          }
          break;

        case EVENT_END:
          triggered = false;
          break;
      }
    }

    Hammer.gestures.Drag = {
      name: name,
      index: 50,
      handler: dragGesture,
      defaults: {
        /**
             * minimal movement that have to be made before the drag event gets triggered
             * @property dragMinDistance
             * @type {Number}
             * @default 10
             */
        dragMinDistance: 10,

        /**
             * Set dragDistanceCorrection to true to make the starting point of the drag
             * be calculated from where the drag was triggered, not from where the touch started.
             * Useful to avoid a jerk-starting drag, which can make fine-adjustments
             * through dragging difficult, and be visually unappealing.
             * @property dragDistanceCorrection
             * @type {Boolean}
             * @default true
             */
        dragDistanceCorrection: true,

        /**
             * set 0 for unlimited, but this can conflict with transform
             * @property dragMaxTouches
             * @type {Number}
             * @default 1
             */
        dragMaxTouches: 1,

        /**
             * prevent default browser behavior when dragging occurs
             * be careful with it, it makes the element a blocking element
             * when you are using the drag gesture, it is a good practice to set this true
             * @property dragBlockHorizontal
             * @type {Boolean}
             * @default false
             */
        dragBlockHorizontal: false,

        /**
             * same as `dragBlockHorizontal`, but for vertical movement
             * @property dragBlockVertical
             * @type {Boolean}
             * @default false
             */
        dragBlockVertical: false,

        /**
             * dragLockToAxis keeps the drag gesture on the axis that it started on,
             * It disallows vertical directions if the initial direction was horizontal, and vice versa.
             * @property dragLockToAxis
             * @type {Boolean}
             * @default false
             */
        dragLockToAxis: false,

        /**
             * drag lock only kicks in when distance > dragLockMinDistance
             * This way, locking occurs only when the distance has become large enough to reliably determine the direction
             * @property dragLockMinDistance
             * @type {Number}
             * @default 25
             */
        dragLockMinDistance: 25
      }
    };
  })('drag');

  /**
 * @module gestures
 */
  /**
 * trigger a simple gesture event, so you can do anything in your handler.
 * only usable if you know what your doing...
 *
 * @class Gesture
 * @static
 */
  /**
 * @event gesture
 * @param {Object} ev
 */
  Hammer.gestures.Gesture = {
    name: 'gesture',
    index: 1337,
    handler: function releaseGesture(ev, inst) {
      inst.trigger(this.name, ev);
    }
  };

  /**
 * @module gestures
 */
  /**
 * Touch stays at the same place for x time
 *
 * @class Hold
 * @static
 */
  /**
 * @event hold
 * @param {Object} ev
 */

  /**
 * @param {String} name
 */
  (function(name) {
    var timer;

    function holdGesture(ev, inst) {
      var options = inst.options,
          current = Detection.current;

      switch(ev.eventType) {
        case EVENT_START:
          clearTimeout(timer);

          // set the gesture so we can check in the timeout if it still is
          current.name = name;

          // set timer and if after the timeout it still is hold,
          // we trigger the hold event
          timer = setTimeout(function() {
            if(current && current.name == name) {
              inst.trigger(name, ev);
            }
          }, options.holdTimeout);
          break;

        case EVENT_MOVE:
          if(ev.distance > options.holdThreshold) {
            clearTimeout(timer);
          }
          break;

        case EVENT_RELEASE:
          clearTimeout(timer);
          break;
      }
    }

    Hammer.gestures.Hold = {
      name: name,
      index: 10,
      defaults: {
        /**
             * @property holdTimeout
             * @type {Number}
             * @default 500
             */
        holdTimeout: 500,

        /**
             * movement allowed while holding
             * @property holdThreshold
             * @type {Number}
             * @default 2
             */
        holdThreshold: 2
      },
      handler: holdGesture
    };
  })('hold');

  /**
 * @module gestures
 */
  /**
 * when a touch is being released from the page
 *
 * @class Release
 * @static
 */
  /**
 * @event release
 * @param {Object} ev
 */
  Hammer.gestures.Release = {
    name: 'release',
    index: Infinity,
    handler: function releaseGesture(ev, inst) {
      if(ev.eventType == EVENT_RELEASE) {
        inst.trigger(this.name, ev);
      }
    }
  };

  /**
 * @module gestures
 */
  /**
 * triggers swipe events when the end velocity is above the threshold
 * for best usage, set `preventDefault` (on the drag gesture) to `true`
 * ````
 *  hammertime.on("dragleft swipeleft", function(ev) {
 *    console.log(ev);
 *    ev.gesture.preventDefault();
 *  });
 * ````
 *
 * @class Swipe
 * @static
 */
  /**
 * @event swipe
 * @param {Object} ev
 */
  /**
 * @event swipeleft
 * @param {Object} ev
 */
  /**
 * @event swiperight
 * @param {Object} ev
 */
  /**
 * @event swipeup
 * @param {Object} ev
 */
  /**
 * @event swipedown
 * @param {Object} ev
 */
  Hammer.gestures.Swipe = {
    name: 'swipe',
    index: 40,
    defaults: {
      /**
         * @property swipeMinTouches
         * @type {Number}
         * @default 1
         */
      swipeMinTouches: 1,

      /**
         * @property swipeMaxTouches
         * @type {Number}
         * @default 1
         */
      swipeMaxTouches: 1,

      /**
         * horizontal swipe velocity
         * @property swipeVelocityX
         * @type {Number}
         * @default 0.6
         */
      swipeVelocityX: 0.6,

      /**
         * vertical swipe velocity
         * @property swipeVelocityY
         * @type {Number}
         * @default 0.6
         */
      swipeVelocityY: 0.6
    },

    handler: function swipeGesture(ev, inst) {
      if(ev.eventType == EVENT_RELEASE) {
        var touches = ev.touches.length,
            options = inst.options;

        // max touches
        if(touches < options.swipeMinTouches ||
           touches > options.swipeMaxTouches) {
          return;
        }

        // when the distance we moved is too small we skip this gesture
        // or we can be already in dragging
        if(ev.velocityX > options.swipeVelocityX ||
           ev.velocityY > options.swipeVelocityY) {
          // trigger swipe events
          inst.trigger(this.name, ev);
          inst.trigger(this.name + ev.direction, ev);
        }
      }
    }
  };

  /**
 * @module gestures
 */
  /**
 * Single tap and a double tap on a place
 *
 * @class Tap
 * @static
 */
  /**
 * @event tap
 * @param {Object} ev
 */
  /**
 * @event doubletap
 * @param {Object} ev
 */

  /**
 * @param {String} name
 */
  (function(name) {
    var hasMoved = false;

    function tapGesture(ev, inst) {
      var options = inst.options,
          current = Detection.current,
          prev = Detection.previous,
          sincePrev,
          didDoubleTap;

      switch(ev.eventType) {
        case EVENT_START:
          hasMoved = false;
          break;

        case EVENT_MOVE:
          hasMoved = hasMoved || (ev.distance > options.tapMaxDistance);
          break;

        case EVENT_END:
          if(!Utils.inStr(ev.srcEvent.type, 'cancel') && ev.deltaTime < options.tapMaxTime && !hasMoved) {
            // previous gesture, for the double tap since these are two different gesture detections
            sincePrev = prev && prev.lastEvent && ev.timeStamp - prev.lastEvent.timeStamp;
            didDoubleTap = false;

            // check if double tap
            if(prev && prev.name == name &&
               (sincePrev && sincePrev < options.doubleTapInterval) &&
               ev.distance < options.doubleTapDistance) {
              inst.trigger('doubletap', ev);
              didDoubleTap = true;
            }

            // do a single tap
            if(!didDoubleTap || options.tapAlways) {
              current.name = name;
              inst.trigger(current.name, ev);
            }
          }
          break;
      }
    }

    Hammer.gestures.Tap = {
      name: name,
      index: 100,
      handler: tapGesture,
      defaults: {
        /**
             * max time of a tap, this is for the slow tappers
             * @property tapMaxTime
             * @type {Number}
             * @default 250
             */
        tapMaxTime: 250,

        /**
             * max distance of movement of a tap, this is for the slow tappers
             * @property tapMaxDistance
             * @type {Number}
             * @default 10
             */
        tapMaxDistance: 10,

        /**
             * always trigger the `tap` event, even while double-tapping
             * @property tapAlways
             * @type {Boolean}
             * @default true
             */
        tapAlways: true,

        /**
             * max distance between two taps
             * @property doubleTapDistance
             * @type {Number}
             * @default 20
             */
        doubleTapDistance: 20,

        /**
             * max time between two taps
             * @property doubleTapInterval
             * @type {Number}
             * @default 300
             */
        doubleTapInterval: 300
      }
    };
  })('tap');

  /**
 * @module gestures
 */
  /**
 * when a touch is being touched at the page
 *
 * @class Touch
 * @static
 */
  /**
 * @event touch
 * @param {Object} ev
 */
  Hammer.gestures.Touch = {
    name: 'touch',
    index: -Infinity,
    defaults: {
      /**
         * call preventDefault at touchstart, and makes the element blocking by disabling the scrolling of the page,
         * but it improves gestures like transforming and dragging.
         * be careful with using this, it can be very annoying for users to be stuck on the page
         * @property preventDefault
         * @type {Boolean}
         * @default false
         */
      preventDefault: false,

      /**
         * disable mouse events, so only touch (or pen!) input triggers events
         * @property preventMouse
         * @type {Boolean}
         * @default false
         */
      preventMouse: false
    },
    handler: function touchGesture(ev, inst) {
      if(inst.options.preventMouse && ev.pointerType == POINTER_MOUSE) {
        ev.stopDetect();
        return;
      }

      if(inst.options.preventDefault) {
        ev.preventDefault();
      }

      if(ev.eventType == EVENT_TOUCH) {
        inst.trigger('touch', ev);
      }
    }
  };

  /**
 * @module gestures
 */
  /**
 * User want to scale or rotate with 2 fingers
 * Preventing the default browser behavior is a good way to improve feel and working. This can be done with the
 * `preventDefault` option.
 *
 * @class Transform
 * @static
 */
  /**
 * @event transform
 * @param {Object} ev
 */
  /**
 * @event transformstart
 * @param {Object} ev
 */
  /**
 * @event transformend
 * @param {Object} ev
 */
  /**
 * @event pinchin
 * @param {Object} ev
 */
  /**
 * @event pinchout
 * @param {Object} ev
 */
  /**
 * @event rotate
 * @param {Object} ev
 */

  /**
 * @param {String} name
 */
  (function(name) {
    var triggered = false;

    function transformGesture(ev, inst) {
      switch(ev.eventType) {
        case EVENT_START:
          triggered = false;
          break;

        case EVENT_MOVE:
          // at least multitouch
          if(ev.touches.length < 2) {
            return;
          }

          var scaleThreshold = Math.abs(1 - ev.scale);
          var rotationThreshold = Math.abs(ev.rotation);

          // when the distance we moved is too small we skip this gesture
          // or we can be already in dragging
          if(scaleThreshold < inst.options.transformMinScale &&
             rotationThreshold < inst.options.transformMinRotation) {
            return;
          }

          // we are transforming!
          Detection.current.name = name;

          // first time, trigger dragstart event
          if(!triggered) {
            inst.trigger(name + 'start', ev);
            triggered = true;
          }

          inst.trigger(name, ev); // basic transform event

          // trigger rotate event
          if(rotationThreshold > inst.options.transformMinRotation) {
            inst.trigger('rotate', ev);
          }

          // trigger pinch event
          if(scaleThreshold > inst.options.transformMinScale) {
            inst.trigger('pinch', ev);
            inst.trigger('pinch' + (ev.scale < 1 ? 'in' : 'out'), ev);
          }
          break;

        case EVENT_RELEASE:
          if(triggered && ev.changedLength < 2) {
            inst.trigger(name + 'end', ev);
            triggered = false;
          }
          break;
      }
    }

    Hammer.gestures.Transform = {
      name: name,
      index: 45,
      defaults: {
        /**
             * minimal scale factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
             * @property transformMinScale
             * @type {Number}
             * @default 0.01
             */
        transformMinScale: 0.01,

        /**
             * rotation in degrees
             * @property transformMinRotation
             * @type {Number}
             * @default 1
             */
        transformMinRotation: 1
      },

      handler: transformGesture
    };
  })('transform');

  /**
 * @module hammer
 */

  // AMD export
  if(typeof define == 'function' && define.amd) {
    define(function() {
      return Hammer;
    });
    // commonjs export
  } else if(typeof module !== 'undefined' && module.exports) {
    module.exports = Hammer;
    // browser export
  } else {
    window.Hammer = Hammer;
  }

})(window);;// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3.js
// ==/ClosureCompiler==

/**
 * @name CSS3 InfoBubble with tabs for Google Maps API V3
 * @version 0.8
 * @author Luke Mahe
 * @fileoverview
 * This library is a CSS Infobubble with tabs. It uses css3 rounded corners and
 * drop shadows and animations. It also allows tabs
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A CSS3 InfoBubble v0.8
 * @param {Object.<string, *>=} opt_options Optional properties to set.
 * @extends {google.maps.OverlayView}
 * @constructor
 */
function InfoBubble(opt_options) {
  this.extend(InfoBubble, google.maps.OverlayView);
  this.tabs_ = [];
  this.activeTab_ = null;
  this.baseZIndex_ = 100;
  this.isOpen_ = false;

  var options = opt_options || {};

  if (options['backgroundColor'] == undefined) {
    options['backgroundColor'] = this.BACKGROUND_COLOR_;
  }

  if (options['borderColor'] == undefined) {
    options['borderColor'] = this.BORDER_COLOR_;
  }

  if (options['borderRadius'] == undefined) {
    options['borderRadius'] = this.BORDER_RADIUS_;
  }

  if (options['borderWidth'] == undefined) {
    options['borderWidth'] = this.BORDER_WIDTH_;
  }

  if (options['padding'] == undefined) {
    options['padding'] = this.PADDING_;
  }

  if (options['arrowPosition'] == undefined) {
    options['arrowPosition'] = this.ARROW_POSITION_;
  }

  if (options['disableAutoPan'] == undefined) {
    options['disableAutoPan'] = false;
  }

  if (options['disableAnimation'] == undefined) {
    options['disableAnimation'] = false;
  }

  if (options['minWidth'] == undefined) {
    options['minWidth'] = this.MIN_WIDTH_;
  }

  if (options['shadowStyle'] == undefined) {
    options['shadowStyle'] = this.SHADOW_STYLE_;
  }

  if (options['arrowSize'] == undefined) {
    options['arrowSize'] = this.ARROW_SIZE_;
  }

  if (options['arrowStyle'] == undefined) {
    options['arrowStyle'] = this.ARROW_STYLE_;
  }

  this.buildDom_();

  this.setValues(options);
}
window['InfoBubble'] = InfoBubble;


/**
 * Default arrow size
 * @const
 * @private
 */
InfoBubble.prototype.ARROW_SIZE_ = 15;


/**
 * Default arrow style
 * @const
 * @private
 */
InfoBubble.prototype.ARROW_STYLE_ = 0;


/**
 * Default shadow style
 * @const
 * @private
 */
InfoBubble.prototype.SHADOW_STYLE_ = 1;


/**
 * Default min width
 * @const
 * @private
 */
InfoBubble.prototype.MIN_WIDTH_ = 50;


/**
 * Default arrow position
 * @const
 * @private
 */
InfoBubble.prototype.ARROW_POSITION_ = 50;


/**
 * Default padding
 * @const
 * @private
 */
InfoBubble.prototype.PADDING_ = 10;


/**
 * Default border width
 * @const
 * @private
 */
InfoBubble.prototype.BORDER_WIDTH_ = 1;


/**
 * Default border color
 * @const
 * @private
 */
InfoBubble.prototype.BORDER_COLOR_ = '#ccc';


/**
 * Default border radius
 * @const
 * @private
 */
InfoBubble.prototype.BORDER_RADIUS_ = 10;


/**
 * Default background color
 * @const
 * @private
 */
InfoBubble.prototype.BACKGROUND_COLOR_ = '#fff';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
InfoBubble.prototype.extend = function(obj1, obj2) {
  return (function(object) {
    for (var property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1, [obj2]);
};


/**
 * Builds the InfoBubble dom
 * @private
 */
InfoBubble.prototype.buildDom_ = function() {
  var bubble = this.bubble_ = document.createElement('DIV');
  bubble.style['position'] = 'absolute';
  bubble.classList.add('js-bubble-wrap');
  bubble.classList.add('bubble-wrap');
  bubble.style['zIndex'] = this.baseZIndex_;

  var tabsContainer = this.tabsContainer_ = document.createElement('DIV');
  tabsContainer.style['position'] = 'relative';

  // Close button
  var close = this.close_ = document.createElement('DIV');
  close.style['position'] = 'absolute';
  close.style['width'] = this.px(19);
  close.style['height'] = this.px(19);
  close.style['border'] = 0;
  close.style['zIndex'] = this.baseZIndex_ + 1;
  close.style['cursor'] = 'pointer';
  close.classList.add('close-map-img');
  // close.src = '/img/map-close.png';

  var that = this;
  google.maps.event.addDomListener(close, 'click', function() {
    that.close();
    google.maps.event.trigger(that, 'closeclick');
  });

  // Content area
  var contentContainer = this.contentContainer_ = document.createElement('DIV');
  contentContainer.style['overflowX'] = 'visible';
  contentContainer.style['overflowY'] = 'visible';
  contentContainer.style['cursor'] = 'default';
  contentContainer.style['clear'] = 'both';
  contentContainer.style['position'] = 'relative';

  var content = this.content_ = document.createElement('DIV');
  contentContainer.appendChild(content);

  // Arrow
  var arrow = this.arrow_ = document.createElement('DIV');
  arrow.style['position'] = 'relative';

  var arrowOuter = this.arrowOuter_ = document.createElement('DIV');
  var arrowInner = this.arrowInner_ = document.createElement('DIV');

  var arrowSize = this.getArrowSize_();

  arrowOuter.style['position'] = arrowInner.style['position'] = 'absolute';
  arrowOuter.style['left'] = arrowInner.style['left'] = '50%';
  arrowOuter.style['height'] = arrowInner.style['height'] = '0';
  arrowOuter.style['width'] = arrowInner.style['width'] = '0';
  arrowOuter.style['marginLeft'] = this.px(-arrowSize);
  arrowOuter.style['borderWidth'] = this.px(arrowSize);
  arrowOuter.style['borderBottomWidth'] = 0;

  // Shadow
  var bubbleShadow = this.bubbleShadow_ = document.createElement('DIV');
  bubbleShadow.style['position'] = 'absolute';

  // Hide the InfoBubble by default
  bubble.style['display'] = bubbleShadow.style['display'] = 'none';

  bubble.appendChild(this.tabsContainer_);
  bubble.appendChild(close);
  bubble.appendChild(contentContainer);
  arrow.appendChild(arrowOuter);
  arrow.appendChild(arrowInner);
  bubble.appendChild(arrow);

  var stylesheet = document.createElement('style');
  stylesheet.setAttribute('type', 'text/css');

  /**
   * The animation for the infobubble
   * @type {string}
   */
  this.animationName_ = '_ibani_' + Math.round(Math.random() * 10000);

  var css = '.' + this.animationName_ + '{-webkit-animation-name:' +
      this.animationName_ + ';-webkit-animation-duration:0.5s;' +
      '-webkit-animation-iteration-count:1;}' +
      '@-webkit-keyframes ' + this.animationName_ + ' {from {' +
      '-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% ' +
      '{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}';

  stylesheet.textContent = css;
  document.getElementsByTagName('head')[0].appendChild(stylesheet);
};


/**
 * Sets the background class name
 *
 * @param {string} className The class name to set.
 */
InfoBubble.prototype.setBackgroundClassName = function(className) {
  this.set('backgroundClassName', className);
};
InfoBubble.prototype['setBackgroundClassName'] =
  InfoBubble.prototype.setBackgroundClassName;


/**
 * changed MVC callback
 */
InfoBubble.prototype.backgroundClassName_changed = function() {
  this.content_.className = this.get('backgroundClassName');
};
InfoBubble.prototype['backgroundClassName_changed'] =
  InfoBubble.prototype.backgroundClassName_changed;


/**
 * Sets the class of the tab
 *
 * @param {string} className the class name to set.
 */
InfoBubble.prototype.setTabClassName = function(className) {
  this.set('tabClassName', className);
};
InfoBubble.prototype['setTabClassName'] =
  InfoBubble.prototype.setTabClassName;


/**
 * tabClassName changed MVC callback
 */
InfoBubble.prototype.tabClassName_changed = function() {
  this.updateTabStyles_();
};
InfoBubble.prototype['tabClassName_changed'] =
  InfoBubble.prototype.tabClassName_changed;


/**
 * Gets the style of the arrow
 *
 * @private
 * @return {number} The style of the arrow.
 */
InfoBubble.prototype.getArrowStyle_ = function() {
  return parseInt(this.get('arrowStyle'), 10) || 0;
};


/**
 * Sets the style of the arrow
 *
 * @param {number} style The style of the arrow.
 */
InfoBubble.prototype.setArrowStyle = function(style) {
  this.set('arrowStyle', style);
};
InfoBubble.prototype['setArrowStyle'] =
  InfoBubble.prototype.setArrowStyle;


/**
 * Arrow style changed MVC callback
 */
InfoBubble.prototype.arrowStyle_changed = function() {
  this.arrowSize_changed();
};
InfoBubble.prototype['arrowStyle_changed'] =
  InfoBubble.prototype.arrowStyle_changed;


/**
 * Gets the size of the arrow
 *
 * @private
 * @return {number} The size of the arrow.
 */
InfoBubble.prototype.getArrowSize_ = function() {
  return parseInt(this.get('arrowSize'), 10) || 0;
};


/**
 * Sets the size of the arrow
 *
 * @param {number} size The size of the arrow.
 */
InfoBubble.prototype.setArrowSize = function(size) {
  this.set('arrowSize', size);
};
InfoBubble.prototype['setArrowSize'] =
  InfoBubble.prototype.setArrowSize;


/**
 * Arrow size changed MVC callback
 */
InfoBubble.prototype.arrowSize_changed = function() {
  this.borderWidth_changed();
};
InfoBubble.prototype['arrowSize_changed'] =
  InfoBubble.prototype.arrowSize_changed;


/**
 * Set the position of the InfoBubble arrow
 *
 * @param {number} pos The position to set.
 */
InfoBubble.prototype.setArrowPosition = function(pos) {
  this.set('arrowPosition', pos);
};
InfoBubble.prototype['setArrowPosition'] =
  InfoBubble.prototype.setArrowPosition;


/**
 * Get the position of the InfoBubble arrow
 *
 * @private
 * @return {number} The position..
 */
InfoBubble.prototype.getArrowPosition_ = function() {
  return parseInt(this.get('arrowPosition'), 10) || 0;
};


/**
 * arrowPosition changed MVC callback
 */
InfoBubble.prototype.arrowPosition_changed = function() {
  var pos = this.getArrowPosition_();
  this.arrowOuter_.style['left'] = this.arrowInner_.style['left'] = pos + '%';

  this.redraw_();
};
InfoBubble.prototype['arrowPosition_changed'] =
  InfoBubble.prototype.arrowPosition_changed;


/**
 * Set the zIndex of the InfoBubble
 *
 * @param {number} zIndex The zIndex to set.
 */
InfoBubble.prototype.setZIndex = function(zIndex) {
  this.set('zIndex', zIndex);
};
InfoBubble.prototype['setZIndex'] = InfoBubble.prototype.setZIndex;


/**
 * Get the zIndex of the InfoBubble
 *
 * @return {number} The zIndex to set.
 */
InfoBubble.prototype.getZIndex = function() {
  return parseInt(this.get('zIndex'), 10) || this.baseZIndex_;
};


/**
 * zIndex changed MVC callback
 */
InfoBubble.prototype.zIndex_changed = function() {
  var zIndex = this.getZIndex();

  this.bubble_.style['zIndex'] = this.baseZIndex_ = zIndex;
  this.close_.style['zIndex'] = zIndex + 1;
};
InfoBubble.prototype['zIndex_changed'] = InfoBubble.prototype.zIndex_changed;


/**
 * Set the style of the shadow
 *
 * @param {number} shadowStyle The style of the shadow.
 */
InfoBubble.prototype.setShadowStyle = function(shadowStyle) {
  this.set('shadowStyle', shadowStyle);
};
InfoBubble.prototype['setShadowStyle'] = InfoBubble.prototype.setShadowStyle;


/**
 * Get the style of the shadow
 *
 * @private
 * @return {number} The style of the shadow.
 */
InfoBubble.prototype.getShadowStyle_ = function() {
  return parseInt(this.get('shadowStyle'), 10) || 0;
};


/**
 * shadowStyle changed MVC callback
 */
InfoBubble.prototype.shadowStyle_changed = function() {
  var shadowStyle = this.getShadowStyle_();

  var display = '';
  var shadow = '';
  var backgroundColor = '';
  switch (shadowStyle) {
    case 0:
      display = 'none';
      break;
    case 1:
      shadow = '40px 15px 10px rgba(33,33,33,0.3)';
      backgroundColor = 'transparent';
      break;
    case 2:
      shadow = '0 0 2px rgba(33,33,33,0.3)';
      backgroundColor = 'rgba(33,33,33,0.35)';
      break;
  }
  this.bubbleShadow_.style['boxShadow'] =
    this.bubbleShadow_.style['webkitBoxShadow'] =
    this.bubbleShadow_.style['MozBoxShadow'] = shadow;
  this.bubbleShadow_.style['backgroundColor'] = backgroundColor;
  if (this.isOpen_) {
    this.bubbleShadow_.style['display'] = display;
    this.draw();
  }
};
InfoBubble.prototype['shadowStyle_changed'] =
  InfoBubble.prototype.shadowStyle_changed;


/**
 * Show the close button
 */
InfoBubble.prototype.showCloseButton = function() {
  this.set('hideCloseButton', false);
};
InfoBubble.prototype['showCloseButton'] = InfoBubble.prototype.showCloseButton;


/**
 * Hide the close button
 */
InfoBubble.prototype.hideCloseButton = function() {
  this.set('hideCloseButton', true);
};
InfoBubble.prototype['hideCloseButton'] = InfoBubble.prototype.hideCloseButton;


/**
 * hideCloseButton changed MVC callback
 */
InfoBubble.prototype.hideCloseButton_changed = function() {
  this.close_.style['display'] = this.get('hideCloseButton') ? 'none' : '';
};
InfoBubble.prototype['hideCloseButton_changed'] =
  InfoBubble.prototype.hideCloseButton_changed;


/**
 * Set the background color
 *
 * @param {string} color The color to set.
 */
InfoBubble.prototype.setBackgroundColor = function(color) {
  if (color) {
    this.set('backgroundColor', color);
  }
};
InfoBubble.prototype['setBackgroundColor'] =
  InfoBubble.prototype.setBackgroundColor;


/**
 * backgroundColor changed MVC callback
 */
InfoBubble.prototype.backgroundColor_changed = function() {
  var backgroundColor = this.get('backgroundColor');
  this.contentContainer_.style['backgroundColor'] = backgroundColor;

  this.arrowInner_.style['borderColor'] = backgroundColor +
    ' transparent transparent';
  this.updateTabStyles_();
};
InfoBubble.prototype['backgroundColor_changed'] =
  InfoBubble.prototype.backgroundColor_changed;


/**
 * Set the border color
 *
 * @param {string} color The border color.
 */
InfoBubble.prototype.setBorderColor = function(color) {
  if (color) {
    this.set('borderColor', color);
  }
};
InfoBubble.prototype['setBorderColor'] = InfoBubble.prototype.setBorderColor;


/**
 * borderColor changed MVC callback
 */
InfoBubble.prototype.borderColor_changed = function() {
  var borderColor = this.get('borderColor');

  var contentContainer = this.contentContainer_;
  var arrowOuter = this.arrowOuter_;
  contentContainer.style['borderColor'] = borderColor;

  arrowOuter.style['borderColor'] = borderColor +
    ' transparent transparent';

  contentContainer.style['borderStyle'] =
    arrowOuter.style['borderStyle'] =
    this.arrowInner_.style['borderStyle'] = 'solid';

  this.updateTabStyles_();
};
InfoBubble.prototype['borderColor_changed'] =
  InfoBubble.prototype.borderColor_changed;


/**
 * Set the radius of the border
 *
 * @param {number} radius The radius of the border.
 */
InfoBubble.prototype.setBorderRadius = function(radius) {
  this.set('borderRadius', radius);
};
InfoBubble.prototype['setBorderRadius'] = InfoBubble.prototype.setBorderRadius;


/**
 * Get the radius of the border
 *
 * @private
 * @return {number} The radius of the border.
 */
InfoBubble.prototype.getBorderRadius_ = function() {
  return parseInt(this.get('borderRadius'), 10) || 0;
};


/**
 * borderRadius changed MVC callback
 */
InfoBubble.prototype.borderRadius_changed = function() {
  var borderRadius = this.getBorderRadius_();
  var borderWidth = this.getBorderWidth_();

  this.contentContainer_.style['borderRadius'] =
    this.contentContainer_.style['MozBorderRadius'] =
    this.contentContainer_.style['webkitBorderRadius'] =
    this.bubbleShadow_.style['borderRadius'] =
    this.bubbleShadow_.style['MozBorderRadius'] =
    this.bubbleShadow_.style['webkitBorderRadius'] = this.px(borderRadius);

  this.tabsContainer_.style['paddingLeft'] =
    this.tabsContainer_.style['paddingRight'] =
    this.px(borderRadius + borderWidth);

  this.redraw_();
};
InfoBubble.prototype['borderRadius_changed'] =
  InfoBubble.prototype.borderRadius_changed;


/**
 * Get the width of the border
 *
 * @private
 * @return {number} width The width of the border.
 */
InfoBubble.prototype.getBorderWidth_ = function() {
  return parseInt(this.get('borderWidth'), 10) || 0;
};


/**
 * Set the width of the border
 *
 * @param {number} width The width of the border.
 */
InfoBubble.prototype.setBorderWidth = function(width) {
  this.set('borderWidth', width);
};
InfoBubble.prototype['setBorderWidth'] = InfoBubble.prototype.setBorderWidth;


/**
 * borderWidth change MVC callback
 */
InfoBubble.prototype.borderWidth_changed = function() {
  var borderWidth = this.getBorderWidth_();

  this.contentContainer_.style['borderWidth'] = this.px(borderWidth);
  this.tabsContainer_.style['top'] = this.px(borderWidth);

  this.updateArrowStyle_();
  this.updateTabStyles_();
  this.borderRadius_changed();
  this.redraw_();
};
InfoBubble.prototype['borderWidth_changed'] =
  InfoBubble.prototype.borderWidth_changed;


/**
 * Update the arrow style
 * @private
 */
InfoBubble.prototype.updateArrowStyle_ = function() {
  var borderWidth = this.getBorderWidth_();
  var arrowSize = this.getArrowSize_();
  var arrowStyle = this.getArrowStyle_();
  var arrowOuterSizePx = this.px(arrowSize);
  var arrowInnerSizePx = this.px(Math.max(0, arrowSize - borderWidth));

  var outer = this.arrowOuter_;
  var inner = this.arrowInner_;

  this.arrow_.style['marginTop'] = this.px(-borderWidth);
  outer.style['borderTopWidth'] = arrowOuterSizePx;
  inner.style['borderTopWidth'] = arrowInnerSizePx;

  // Full arrow or arrow pointing to the left
  if (arrowStyle == 0 || arrowStyle == 1) {
    outer.style['borderLeftWidth'] = arrowOuterSizePx;
    inner.style['borderLeftWidth'] = arrowInnerSizePx;
  } else {
    outer.style['borderLeftWidth'] = inner.style['borderLeftWidth'] = 0;
  }

  // Full arrow or arrow pointing to the right
  if (arrowStyle == 0 || arrowStyle == 2) {
    outer.style['borderRightWidth'] = arrowOuterSizePx;
    inner.style['borderRightWidth'] = arrowInnerSizePx;
  } else {
    outer.style['borderRightWidth'] = inner.style['borderRightWidth'] = 0;
  }

  if (arrowStyle < 2) {
    outer.style['marginLeft'] = this.px(-(arrowSize));
    inner.style['marginLeft'] = this.px(-(arrowSize - borderWidth));
  } else {
    outer.style['marginLeft'] = inner.style['marginLeft'] = 0;
  }

  // If there is no border then don't show thw outer arrow
  if (borderWidth == 0) {
    outer.style['display'] = 'none';
  } else {
    outer.style['display'] = '';
  }
};


/**
 * Set the padding of the InfoBubble
 *
 * @param {number} padding The padding to apply.
 */
InfoBubble.prototype.setPadding = function(padding) {
  this.set('padding', padding);
};
InfoBubble.prototype['setPadding'] = InfoBubble.prototype.setPadding;


/**
 * Set the padding of the InfoBubble
 *
 * @private
 * @return {number} padding The padding to apply.
 */
InfoBubble.prototype.getPadding_ = function() {
  return parseInt(this.get('padding'), 10) || 0;
};


/**
 * padding changed MVC callback
 */
InfoBubble.prototype.padding_changed = function() {
  var padding = this.getPadding_();
  this.contentContainer_.style['padding'] = this.px(padding);
  this.updateTabStyles_();

  this.redraw_();
};
InfoBubble.prototype['padding_changed'] = InfoBubble.prototype.padding_changed;


/**
 * Add px extention to the number
 *
 * @param {number} num The number to wrap.
 * @return {string|number} A wrapped number.
 */
InfoBubble.prototype.px = function(num) {
  if (num) {
    // 0 doesn't need to be wrapped
    return num + 'px';
  }
  return num;
};


/**
 * Add events to stop propagation
 * @private
 */
InfoBubble.prototype.addEvents_ = function() {
  // We want to cancel all the events so they do not go to the map
  var events = ['mousedown', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
                'mousewheel', 'DOMMouseScroll', 'touchend', 'touchmove',
                'dblclick', 'contextmenu'];

  var bubble = this.bubble_;
  this.listeners_ = [];
  for (var i = 0, event; event = events[i]; i++) {
    this.listeners_.push(
      google.maps.event.addDomListener(bubble, event, function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
      })
    );
  }
};


/**
 * On Adding the InfoBubble to a map
 * Implementing the OverlayView interface
 */
InfoBubble.prototype.onAdd = function() {
  if (!this.bubble_) {
    this.buildDom_();
  }

  this.addEvents_();

  var panes = this.getPanes();
  if (panes) {
    panes.floatPane.appendChild(this.bubble_);
    panes.floatShadow.appendChild(this.bubbleShadow_);
  }
};
InfoBubble.prototype['onAdd'] = InfoBubble.prototype.onAdd;


/**
 * Draw the InfoBubble
 * Implementing the OverlayView interface
 */
InfoBubble.prototype.draw = function() {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));

  if (!latLng) {
    this.close();
    return;
  }

  var tabHeight = 0;

  if (this.activeTab_) {
    tabHeight = this.activeTab_.offsetHeight;
  }

  var anchorHeight = this.getAnchorHeight_();
  var arrowSize = this.getArrowSize_();
  var arrowPosition = this.getArrowPosition_();

  arrowPosition = arrowPosition / 100;

  var pos = projection.fromLatLngToDivPixel(latLng);
  var width = this.contentContainer_.offsetWidth;
  var height = this.bubble_.offsetHeight;

  if (!width) {
    return;
  }

  // Adjust for the height of the info bubble
  var top = pos.y - (height + arrowSize);

  if (anchorHeight) {
    // If there is an anchor then include the height
    top -= anchorHeight;
  }

  var left = pos.x - (width * arrowPosition);

  this.bubble_.style['top'] = this.px(top);
  this.bubble_.style['left'] = this.px(left);

  var shadowStyle = parseInt(this.get('shadowStyle'), 10);

  switch (shadowStyle) {
    case 1:
      // Shadow is behind
      this.bubbleShadow_.style['top'] = this.px(top + tabHeight - 1);
      this.bubbleShadow_.style['left'] = this.px(left);
      this.bubbleShadow_.style['width'] = this.px(width);
      this.bubbleShadow_.style['height'] =
        this.px(this.contentContainer_.offsetHeight - arrowSize);
      break;
    case 2:
      // Shadow is below
      width = width * 0.8;
      if (anchorHeight) {
        this.bubbleShadow_.style['top'] = this.px(pos.y);
      } else {
        this.bubbleShadow_.style['top'] = this.px(pos.y + arrowSize);
      }
      this.bubbleShadow_.style['left'] = this.px(pos.x - width * arrowPosition);

      this.bubbleShadow_.style['width'] = this.px(width);
      this.bubbleShadow_.style['height'] = this.px(2);
      break;
  }
};
InfoBubble.prototype['draw'] = InfoBubble.prototype.draw;


/**
 * Removing the InfoBubble from a map
 */
InfoBubble.prototype.onRemove = function() {
  if (this.bubble_ && this.bubble_.parentNode) {
    this.bubble_.parentNode.removeChild(this.bubble_);
  }
  if (this.bubbleShadow_ && this.bubbleShadow_.parentNode) {
    this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);
  }

  for (var i = 0, listener; listener = this.listeners_[i]; i++) {
    google.maps.event.removeListener(listener);
  }
};
InfoBubble.prototype['onRemove'] = InfoBubble.prototype.onRemove;


/**
 * Is the InfoBubble open
 *
 * @return {boolean} If the InfoBubble is open.
 */
InfoBubble.prototype.isOpen = function() {
  return this.isOpen_;
};
InfoBubble.prototype['isOpen'] = InfoBubble.prototype.isOpen;


/**
 * Close the InfoBubble
 */
InfoBubble.prototype.close = function() {
  if (this.bubble_) {
    this.bubble_.style['display'] = 'none';
    // Remove the animation so we next time it opens it will animate again
    this.bubble_.className =
      this.bubble_.className.replace(this.animationName_, '');
  }

  if (this.bubbleShadow_) {
    this.bubbleShadow_.style['display'] = 'none';
    this.bubbleShadow_.className =
      this.bubbleShadow_.className.replace(this.animationName_, '');
  }
  this.isOpen_ = false;
};
InfoBubble.prototype['close'] = InfoBubble.prototype.close;


/**
 * Open the InfoBubble (asynchronous).
 *
 * @param {google.maps.Map=} opt_map Optional map to open on.
 * @param {google.maps.MVCObject=} opt_anchor Optional anchor to position at.
 */
InfoBubble.prototype.open = function(opt_map, opt_anchor) {
  var that = this;
  window.setTimeout(function() {
    that.open_(opt_map, opt_anchor);
  }, 0);
};

/**
 * Open the InfoBubble
 * @private
 * @param {google.maps.Map=} opt_map Optional map to open on.
 * @param {google.maps.MVCObject=} opt_anchor Optional anchor to position at.
 */
InfoBubble.prototype.open_ = function(opt_map, opt_anchor) {
  this.updateContent_();

  if (opt_map) {
    this.setMap(opt_map);
  }

  if (opt_anchor) {
    this.set('anchor', opt_anchor);
    this.bindTo('anchorPoint', opt_anchor);
    this.bindTo('position', opt_anchor);
  }

  // Show the bubble and the show
  this.bubble_.style['display'] = this.bubbleShadow_.style['display'] = '';
  var animation = !this.get('disableAnimation');

  if (animation) {
    // Add the animation
    this.bubble_.className += ' ' + this.animationName_;
    this.bubbleShadow_.className += ' ' + this.animationName_;
  }

  this.redraw_();
  this.isOpen_ = true;

  var pan = !this.get('disableAutoPan');
  if (pan) {
    var that = this;
    window.setTimeout(function() {
      // Pan into view, done in a time out to make it feel nicer :)
      that.panToView();
    }, 200);
  }
};
InfoBubble.prototype['open'] = InfoBubble.prototype.open;


/**
 * Set the position of the InfoBubble
 *
 * @param {google.maps.LatLng} position The position to set.
 */
InfoBubble.prototype.setPosition = function(position) {
  if (position) {
    this.set('position', position);
  }
};
InfoBubble.prototype['setPosition'] = InfoBubble.prototype.setPosition;


/**
 * Returns the position of the InfoBubble
 *
 * @return {google.maps.LatLng} the position.
 */
InfoBubble.prototype.getPosition = function() {
  return /** @type {google.maps.LatLng} */ (this.get('position'));
};
InfoBubble.prototype['getPosition'] = InfoBubble.prototype.getPosition;


/**
 * position changed MVC callback
 */
InfoBubble.prototype.position_changed = function() {
  this.draw();
};
InfoBubble.prototype['position_changed'] =
  InfoBubble.prototype.position_changed;


/**
 * Pan the InfoBubble into view
 */
InfoBubble.prototype.panToView = function() {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  if (!this.bubble_) {
    // No Bubble yet so do nothing
    return;
  }

  var anchorHeight = this.getAnchorHeight_();
  var height = this.bubble_.offsetHeight + anchorHeight;
  var map = this.get('map');
  var mapDiv = map.getDiv();
  var mapHeight = mapDiv.offsetHeight;

  var latLng = this.getPosition();
  var centerPos = projection.fromLatLngToContainerPixel(map.getCenter());
  var pos = projection.fromLatLngToContainerPixel(latLng);

  // Find out how much space at the top is free
  var spaceTop = centerPos.y - height;

  // Fine out how much space at the bottom is free
  var spaceBottom = mapHeight - centerPos.y;

  var needsTop = spaceTop < 0;
  var deltaY = 0;

  if (needsTop) {
    spaceTop *= -1;
    deltaY = (spaceTop + spaceBottom) / 2;
  }

  pos.y -= deltaY;
  latLng = projection.fromContainerPixelToLatLng(pos);

  if (map.getCenter() != latLng) {
    map.panTo(latLng);
  }
};
InfoBubble.prototype['panToView'] = InfoBubble.prototype.panToView;


/**
 * Converts a HTML string to a document fragment.
 *
 * @param {string} htmlString The HTML string to convert.
 * @return {Node} A HTML document fragment.
 * @private
 */
InfoBubble.prototype.htmlToDocumentFragment_ = function(htmlString) {
  htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
  var tempDiv = document.createElement('DIV');
  tempDiv.innerHTML = htmlString;
  if (tempDiv.childNodes.length == 1) {
    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
  } else {
    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
};


/**
 * Removes all children from the node.
 *
 * @param {Node} node The node to remove all children from.
 * @private
 */
InfoBubble.prototype.removeChildren_ = function(node) {
  if (!node) {
    return;
  }

  var child;
  while (child = node.firstChild) {
    node.removeChild(child);
  }
};


/**
 * Sets the content of the infobubble.
 *
 * @param {string|Node} content The content to set.
 */
InfoBubble.prototype.setContent = function(content) {
  this.set('content', content);
};
InfoBubble.prototype['setContent'] = InfoBubble.prototype.setContent;


/**
 * Get the content of the infobubble.
 *
 * @return {string|Node} The marker content.
 */
InfoBubble.prototype.getContent = function() {
  return /** @type {Node|string} */ (this.get('content'));
};
InfoBubble.prototype['getContent'] = InfoBubble.prototype.getContent;


/**
 * Sets the marker content and adds loading events to images
 */
InfoBubble.prototype.updateContent_ = function() {
  if (!this.content_) {
    // The Content area doesnt exist.
    return;
  }

  this.removeChildren_(this.content_);
  var content = this.getContent();
  if (content) {
    if (typeof content == 'string') {
      content = this.htmlToDocumentFragment_(content);
    }
    this.content_.appendChild(content);

    var that = this;
    var images = this.content_.getElementsByTagName('IMG');
    for (var i = 0, image; image = images[i]; i++) {
      // Because we don't know the size of an image till it loads, add a
      // listener to the image load so the marker can resize and reposition
      // itself to be the correct height.
      google.maps.event.addDomListener(image, 'load', function() {
        that.imageLoaded_();
      });
    }
    google.maps.event.trigger(this, 'domready');
  }
  this.redraw_();
};

/**
 * Image loaded
 * @private
 */
InfoBubble.prototype.imageLoaded_ = function() {
  var pan = !this.get('disableAutoPan');
  this.redraw_();
  if (pan && (this.tabs_.length == 0 || this.activeTab_.index == 0)) {
    this.panToView();
  }
};

/**
 * Updates the styles of the tabs
 * @private
 */
InfoBubble.prototype.updateTabStyles_ = function() {
  if (this.tabs_ && this.tabs_.length) {
    for (var i = 0, tab; tab = this.tabs_[i]; i++) {
      this.setTabStyle_(tab.tab);
    }
    this.activeTab_.style['zIndex'] = this.baseZIndex_;
    var borderWidth = this.getBorderWidth_();
    var padding = this.getPadding_() / 2;
    this.activeTab_.style['borderBottomWidth'] = 0;
    this.activeTab_.style['paddingBottom'] = this.px(padding + borderWidth);
  }
};


/**
 * Sets the style of a tab
 * @private
 * @param {Element} tab The tab to style.
 */
InfoBubble.prototype.setTabStyle_ = function(tab) {
  var backgroundColor = this.get('backgroundColor');
  var borderColor = this.get('borderColor');
  var borderRadius = this.getBorderRadius_();
  var borderWidth = this.getBorderWidth_();
  var padding = this.getPadding_();

  var marginRight = this.px(-(Math.max(padding, borderRadius)));
  var borderRadiusPx = this.px(borderRadius);

  var index = this.baseZIndex_;
  if (tab.index) {
    index -= tab.index;
  }

  // The styles for the tab
  var styles = {
    'cssFloat': 'left',
    'position': 'relative',
    'cursor': 'pointer',
    'backgroundColor': backgroundColor,
    'border': this.px(borderWidth) + ' solid ' + borderColor,
    'padding': this.px(padding / 2) + ' ' + this.px(padding),
    'marginRight': marginRight,
    'whiteSpace': 'nowrap',
    'borderRadiusTopLeft': borderRadiusPx,
    'MozBorderRadiusTopleft': borderRadiusPx,
    'webkitBorderTopLeftRadius': borderRadiusPx,
    'borderRadiusTopRight': borderRadiusPx,
    'MozBorderRadiusTopright': borderRadiusPx,
    'webkitBorderTopRightRadius': borderRadiusPx,
    'zIndex': index,
    'display': 'inline'
  };

  for (var style in styles) {
    tab.style[style] = styles[style];
  }

  var className = this.get('tabClassName');
  if (className != undefined) {
    tab.className += ' ' + className;
  }
};


/**
 * Add user actions to a tab
 * @private
 * @param {Object} tab The tab to add the actions to.
 */
InfoBubble.prototype.addTabActions_ = function(tab) {
  var that = this;
  tab.listener_ = google.maps.event.addDomListener(tab, 'click', function() {
    that.setTabActive_(this);
  });
};


/**
 * Set a tab at a index to be active
 *
 * @param {number} index The index of the tab.
 */
InfoBubble.prototype.setTabActive = function(index) {
  var tab = this.tabs_[index - 1];

  if (tab) {
    this.setTabActive_(tab.tab);
  }
};
InfoBubble.prototype['setTabActive'] = InfoBubble.prototype.setTabActive;


/**
 * Set a tab to be active
 * @private
 * @param {Object} tab The tab to set active.
 */
InfoBubble.prototype.setTabActive_ = function(tab) {
  if (!tab) {
    this.setContent('');
    this.updateContent_();
    return;
  }

  var padding = this.getPadding_() / 2;
  var borderWidth = this.getBorderWidth_();

  if (this.activeTab_) {
    var activeTab = this.activeTab_;
    activeTab.style['zIndex'] = this.baseZIndex_ - activeTab.index;
    activeTab.style['paddingBottom'] = this.px(padding);
    activeTab.style['borderBottomWidth'] = this.px(borderWidth);
  }

  tab.style['zIndex'] = this.baseZIndex_;
  tab.style['borderBottomWidth'] = 0;
  tab.style['marginBottomWidth'] = '-10px';
  tab.style['paddingBottom'] = this.px(padding + borderWidth);

  this.setContent(this.tabs_[tab.index].content);
  this.updateContent_();

  this.activeTab_ = tab;

  this.redraw_();
};


/**
 * Set the max width of the InfoBubble
 *
 * @param {number} width The max width.
 */
InfoBubble.prototype.setMaxWidth = function(width) {
  this.set('maxWidth', width);
};
InfoBubble.prototype['setMaxWidth'] = InfoBubble.prototype.setMaxWidth;


/**
 * maxWidth changed MVC callback
 */
InfoBubble.prototype.maxWidth_changed = function() {
  this.redraw_();
};
InfoBubble.prototype['maxWidth_changed'] =
  InfoBubble.prototype.maxWidth_changed;


/**
 * Set the max height of the InfoBubble
 *
 * @param {number} height The max height.
 */
InfoBubble.prototype.setMaxHeight = function(height) {
  this.set('maxHeight', height);
};
InfoBubble.prototype['setMaxHeight'] = InfoBubble.prototype.setMaxHeight;


/**
 * maxHeight changed MVC callback
 */
InfoBubble.prototype.maxHeight_changed = function() {
  this.redraw_();
};
InfoBubble.prototype['maxHeight_changed'] =
  InfoBubble.prototype.maxHeight_changed;


/**
 * Set the min width of the InfoBubble
 *
 * @param {number} width The min width.
 */
InfoBubble.prototype.setMinWidth = function(width) {
  this.set('minWidth', width);
};
InfoBubble.prototype['setMinWidth'] = InfoBubble.prototype.setMinWidth;


/**
 * minWidth changed MVC callback
 */
InfoBubble.prototype.minWidth_changed = function() {
  this.redraw_();
};
InfoBubble.prototype['minWidth_changed'] =
  InfoBubble.prototype.minWidth_changed;


/**
 * Set the min height of the InfoBubble
 *
 * @param {number} height The min height.
 */
InfoBubble.prototype.setMinHeight = function(height) {
  this.set('minHeight', height);
};
InfoBubble.prototype['setMinHeight'] = InfoBubble.prototype.setMinHeight;


/**
 * minHeight changed MVC callback
 */
InfoBubble.prototype.minHeight_changed = function() {
  this.redraw_();
};
InfoBubble.prototype['minHeight_changed'] =
  InfoBubble.prototype.minHeight_changed;


/**
 * Add a tab
 *
 * @param {string} label The label of the tab.
 * @param {string|Element} content The content of the tab.
 */
InfoBubble.prototype.addTab = function(label, content) {
  var tab = document.createElement('DIV');
  tab.innerHTML = label;

  this.setTabStyle_(tab);
  this.addTabActions_(tab);

  this.tabsContainer_.appendChild(tab);

  this.tabs_.push({
    label: label,
    content: content,
    tab: tab
  });

  tab.index = this.tabs_.length - 1;
  tab.style['zIndex'] = this.baseZIndex_ - tab.index;

  if (!this.activeTab_) {
    this.setTabActive_(tab);
  }

  tab.className = tab.className + ' ' + this.animationName_;

  this.redraw_();
};
InfoBubble.prototype['addTab'] = InfoBubble.prototype.addTab;

/**
 * Update a tab at a speicifc index
 *
 * @param {number} index The index of the tab.
 * @param {?string} opt_label The label to change to.
 * @param {?string} opt_content The content to update to.
 */
InfoBubble.prototype.updateTab = function(index, opt_label, opt_content) {
  if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
    return;
  }

  var tab = this.tabs_[index];
  if (opt_label != undefined) {
    tab.tab.innerHTML = tab.label = opt_label;
  }

  if (opt_content != undefined) {
    tab.content = opt_content;
  }

  if (this.activeTab_ == tab.tab) {
    this.setContent(tab.content);
    this.updateContent_();
  }
  this.redraw_();
};
InfoBubble.prototype['updateTab'] = InfoBubble.prototype.updateTab;


/**
 * Remove a tab at a specific index
 *
 * @param {number} index The index of the tab to remove.
 */
InfoBubble.prototype.removeTab = function(index) {
  if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
    return;
  }

  var tab = this.tabs_[index];
  tab.tab.parentNode.removeChild(tab.tab);

  google.maps.event.removeListener(tab.tab.listener_);

  this.tabs_.splice(index, 1);

  delete tab;

  for (var i = 0, t; t = this.tabs_[i]; i++) {
    t.tab.index = i;
  }

  if (tab.tab == this.activeTab_) {
    // Removing the current active tab
    if (this.tabs_[index]) {
      // Show the tab to the right
      this.activeTab_ = this.tabs_[index].tab;
    } else if (this.tabs_[index - 1]) {
      // Show a tab to the left
      this.activeTab_ = this.tabs_[index - 1].tab;
    } else {
      // No tabs left to sho
      this.activeTab_ = undefined;
    }

    this.setTabActive_(this.activeTab_);
  }

  this.redraw_();
};
InfoBubble.prototype['removeTab'] = InfoBubble.prototype.removeTab;


/**
 * Get the size of an element
 * @private
 * @param {Node|string} element The element to size.
 * @param {number=} opt_maxWidth Optional max width of the element.
 * @param {number=} opt_maxHeight Optional max height of the element.
 * @return {google.maps.Size} The size of the element.
 */
InfoBubble.prototype.getElementSize_ = function(element, opt_maxWidth,
                                                 opt_maxHeight) {
  var sizer = document.createElement('DIV');
  sizer.style['display'] = 'inline';
  sizer.style['position'] = 'absolute';
  sizer.style['visibility'] = 'hidden';

  if (typeof element == 'string') {
    sizer.innerHTML = element;
  } else {
    sizer.appendChild(element.cloneNode(true));
  }

  document.body.appendChild(sizer);
  var size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);

  // If the width is bigger than the max width then set the width and size again
  if (opt_maxWidth && size.width > opt_maxWidth) {
    sizer.style['width'] = this.px(opt_maxWidth);
    size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
  }

  // If the height is bigger than the max height then set the height and size
  // again
  if (opt_maxHeight && size.height > opt_maxHeight) {
    sizer.style['height'] = this.px(opt_maxHeight);
    size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
  }

  document.body.removeChild(sizer);
  delete sizer;
  return size;
};


/**
 * Redraw the InfoBubble
 * @private
 */
InfoBubble.prototype.redraw_ = function() {
  this.figureOutSize_();
  this.positionCloseButton_();
  this.draw();
};


/**
 * Figure out the optimum size of the InfoBubble
 * @private
 */
InfoBubble.prototype.figureOutSize_ = function() {
  var map = this.get('map');

  if (!map) {
    return;
  }

  var padding = this.getPadding_();
  var borderWidth = this.getBorderWidth_();
  var borderRadius = this.getBorderRadius_();
  var arrowSize = this.getArrowSize_();

  var mapDiv = map.getDiv();
  var gutter = arrowSize * 2;
  var mapWidth = mapDiv.offsetWidth - gutter;
  var mapHeight = mapDiv.offsetHeight - gutter - this.getAnchorHeight_();
  var tabHeight = 0;
  var width = /** @type {number} */ (this.get('minWidth') || 0);
  var height = /** @type {number} */ (this.get('minHeight') || 0);
  var maxWidth = /** @type {number} */ (this.get('maxWidth') || 0);
  var maxHeight = /** @type {number} */ (this.get('maxHeight') || 0);

  maxWidth = Math.min(mapWidth, maxWidth);
  maxHeight = Math.min(mapHeight, maxHeight);

  var tabWidth = 0;
  if (this.tabs_.length) {
    // If there are tabs then you need to check the size of each tab's content
    for (var i = 0, tab; tab = this.tabs_[i]; i++) {
      var tabSize = this.getElementSize_(tab.tab, maxWidth, maxHeight);
      var contentSize = this.getElementSize_(tab.content, maxWidth, maxHeight);

      if (width < tabSize.width) {
        width = tabSize.width;
      }

      // Add up all the tab widths because they might end up being wider than
      // the content
      tabWidth += tabSize.width;

      if (height < tabSize.height) {
        height = tabSize.height;
      }

      if (tabSize.height > tabHeight) {
        tabHeight = tabSize.height;
      }

      if (width < contentSize.width) {
        width = contentSize.width;
      }

      if (height < contentSize.height) {
        height = contentSize.height;
      }
    }
  } else {
    var content = /** @type {string|Node} */ (this.get('content'));
    if (typeof content == 'string') {
      content = this.htmlToDocumentFragment_(content);
    }
    if (content) {
      var contentSize = this.getElementSize_(content, maxWidth, maxHeight);

      if (width < contentSize.width) {
        width = contentSize.width;
      }

      if (height < contentSize.height) {
        height = contentSize.height;
      }
    }
  }

  if (maxWidth) {
    width = Math.min(width, maxWidth);
  }

  if (maxHeight) {
    height = Math.min(height, maxHeight);
  }

  width = Math.max(width, tabWidth);

  if (width == tabWidth) {
    width = width + 2 * padding;
  }

  arrowSize = arrowSize * 2;
  width = Math.max(width, arrowSize);

  // Maybe add this as a option so they can go bigger than the map if the user
  // wants
  if (width > mapWidth) {
    width = mapWidth;
  }

  if (height > mapHeight) {
    height = mapHeight - tabHeight;
  }

  if (this.tabsContainer_) {
    this.tabHeight_ = tabHeight;
    this.tabsContainer_.style['width'] = this.px(tabWidth);
  }

  this.contentContainer_.style['width'] = this.px(width);
  this.contentContainer_.style['height'] = this.px(height);
};


/**
 *  Get the height of the anchor
 *
 *  This function is a hack for now and doesn't really work that good, need to
 *  wait for pixelBounds to be correctly exposed.
 *  @private
 *  @return {number} The height of the anchor.
 */
InfoBubble.prototype.getAnchorHeight_ = function() {
  var anchor = this.get('anchor');
  if (anchor) {
    var anchorPoint = /** @type google.maps.Point */(this.get('anchorPoint'));

    if (anchorPoint) {
      return -1 * anchorPoint.y;
    }
  }
  return 0;
};

InfoBubble.prototype.anchorPoint_changed = function() {
  this.draw();
};
InfoBubble.prototype['anchorPoint_changed'] = InfoBubble.prototype.anchorPoint_changed;


/**
 * Position the close button in the right spot.
 * @private
 */
InfoBubble.prototype.positionCloseButton_ = function() {
  var br = this.getBorderRadius_();
  var bw = this.getBorderWidth_();

  var right = 2;
  var top = 2;

  if (this.tabs_.length && this.tabHeight_) {
    top += this.tabHeight_;
  }

  top += bw;
  right += bw;

  var c = this.contentContainer_;
  if (c && c.clientHeight < c.scrollHeight) {
    // If there are scrollbars then move the cross in so it is not over
    // scrollbar
    right += 15;
  }

  this.close_.style['right'] = this.px(right);
  this.close_.style['top'] = this.px(top);
};
;/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){

  var plugin = {};

  var defaults = {

    // GENERAL
    mode: 'horizontal',
    slideSelector: '',
    infiniteLoop: true,
    hideControlOnEnd: false,
    speed: 500,
    easing: null,
    slideMargin: 0,
    startSlide: 0,
    randomStart: false,
    captions: false,
    ticker: false,
    tickerHover: false,
    adaptiveHeight: false,
    adaptiveHeightSpeed: 500,
    video: false,
    useCSS: true,
    preloadImages: 'visible',
    responsive: true,
    slideZIndex: 50,
    wrapperClass: 'bx-wrapper',

    // TOUCH
    touchEnabled: true,
    swipeThreshold: 50,
    oneToOneTouch: true,
    preventDefaultSwipeX: true,
    preventDefaultSwipeY: false,

    // PAGER
    pager: true,
    pagerType: 'full',
    pagerShortSeparator: ' / ',
    pagerSelector: null,
    buildPager: null,
    pagerCustom: null,

    // CONTROLS
    controls: true,
    nextText: 'Next',
    prevText: 'Prev',
    nextSelector: null,
    prevSelector: null,
    autoControls: false,
    startText: 'Start',
    stopText: 'Stop',
    autoControlsCombine: false,
    autoControlsSelector: null,

    // AUTO
    auto: false,
    pause: 4000,
    autoStart: true,
    autoDirection: 'next',
    autoHover: false,
    autoDelay: 0,
    autoSlideForOnePage: false,

    // CAROUSEL
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 0,
    slideWidth: 0,

    // CALLBACKS
    onSliderLoad: function() {},
    onSlideBefore: function() {},
    onSlideAfter: function() {},
    onSlideNext: function() {},
    onSlidePrev: function() {},
    onSliderResize: function() {}
  }

  $.fn.bxSlider = function(options){

    if(this.length == 0) return this;

    // support mutltiple elements
    if(this.length > 1){
      this.each(function(){$(this).bxSlider(options)});
      return this;
    }

    // create a namespace to be used throughout the plugin
    var slider = {};
    // set a reference to our slider element
    var el = this;
    plugin.el = this;

    /**
		 * Makes slideshow responsive
		 */
    // first get the original window dimens (thanks alot IE)
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();



    /**
		 * ===================================================================================
		 * = PRIVATE FUNCTIONS
		 * ===================================================================================
		 */

    /**
		 * Initializes namespace settings to be used throughout plugin
		 */
    var init = function(){
      // merge user-supplied options with the defaults
      slider.settings = $.extend({}, defaults, options);
      // parse slideWidth setting
      slider.settings.slideWidth = parseInt(slider.settings.slideWidth);
      // store the original children
      slider.children = el.children(slider.settings.slideSelector);
      // check if actual number of slides is less than minSlides / maxSlides
      if(slider.children.length < slider.settings.minSlides) slider.settings.minSlides = slider.children.length;
      if(slider.children.length < slider.settings.maxSlides) slider.settings.maxSlides = slider.children.length;
      // if random start, set the startSlide setting to random number
      if(slider.settings.randomStart) slider.settings.startSlide = Math.floor(Math.random() * slider.children.length);
      // store active slide information
      slider.active = { index: slider.settings.startSlide }
      // store if the slider is in carousel mode (displaying / moving multiple slides)
      slider.carousel = slider.settings.minSlides > 1 || slider.settings.maxSlides > 1;
      // if carousel, force preloadImages = 'all'
      if(slider.carousel) slider.settings.preloadImages = 'all';
      // calculate the min / max width thresholds based on min / max number of slides
      // used to setup and update carousel slides dimensions
      slider.minThreshold = (slider.settings.minSlides * slider.settings.slideWidth) + ((slider.settings.minSlides - 1) * slider.settings.slideMargin);
      slider.maxThreshold = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
      // store the current state of the slider (if currently animating, working is true)
      slider.working = false;
      // initialize the controls object
      slider.controls = {};
      // initialize an auto interval
      slider.interval = null;
      // determine which property to use for transitions
      slider.animProp = slider.settings.mode == 'vertical' ? 'top' : 'left';
      // determine if hardware acceleration can be used
      slider.usingCSS = slider.settings.useCSS && slider.settings.mode != 'fade' && (function(){
        // create our test div element
        var div = document.createElement('div');
        // css transition properties
        var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
        // test for each property
        for(var i in props){
          if(div.style[props[i]] !== undefined){
            slider.cssPrefix = props[i].replace('Perspective', '').toLowerCase();
            slider.animProp = '-' + slider.cssPrefix + '-transform';
            return true;
          }
        }
        return false;
      }());
      // if vertical mode always make maxSlides and minSlides equal
      if(slider.settings.mode == 'vertical') slider.settings.maxSlides = slider.settings.minSlides;
      // save original style data
      el.data("origStyle", el.attr("style"));
      el.children(slider.settings.slideSelector).each(function() {
        $(this).data("origStyle", $(this).attr("style"));
      });
      // perform all DOM / CSS modifications
      setup();
    }

    /**
		 * Performs all DOM and CSS modifications
		 */
    var setup = function(){
      // wrap el in a wrapper
      el.wrap('<div class="' + slider.settings.wrapperClass + '"><div class="bx-viewport"></div></div>');
      // store a namspace reference to .bx-viewport
      slider.viewport = el.parent();
      // add a loading div to display while images are loading
      slider.loader = $('<div class="bx-loading" />');
      slider.viewport.prepend(slider.loader);
      // set el to a massive width, to hold any needed slides
      // also strip any margin and padding from el
      el.css({
        width: slider.settings.mode == 'horizontal' ? (slider.children.length * 100 + 215) + '%' : 'auto',
        position: 'relative'
      });
      // if using CSS, add the easing property
      if(slider.usingCSS && slider.settings.easing){
        el.css('-' + slider.cssPrefix + '-transition-timing-function', slider.settings.easing);
        // if not using CSS and no easing value was supplied, use the default JS animation easing (swing)
      }else if(!slider.settings.easing){
        slider.settings.easing = 'swing';
      }
      var slidesShowing = getNumberSlidesShowing();
      // make modifications to the viewport (.bx-viewport)
      slider.viewport.css({
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      });
      slider.viewport.parent().css({
        maxWidth: getViewportMaxWidth()
      });
      // make modification to the wrapper (.bx-wrapper)
      if(!slider.settings.pager) {
        slider.viewport.parent().css({
          margin: '0 auto 0px'
        });
      }
      // apply css to all slider children
      slider.children.css({
        'float': slider.settings.mode == 'horizontal' ? 'left' : 'none',
        listStyle: 'none',
        position: 'relative'
      });
      // apply the calculated width after the float is applied to prevent scrollbar interference
      slider.children.css('width', getSlideWidth());
      // if slideMargin is supplied, add the css
      if(slider.settings.mode == 'horizontal' && slider.settings.slideMargin > 0) slider.children.css('marginRight', slider.settings.slideMargin);
      if(slider.settings.mode == 'vertical' && slider.settings.slideMargin > 0) slider.children.css('marginBottom', slider.settings.slideMargin);
      // if "fade" mode, add positioning and z-index CSS
      if(slider.settings.mode == 'fade'){
        slider.children.css({
          position: 'absolute',
          zIndex: 0,
          display: 'none'
        });
        // prepare the z-index on the showing element
        slider.children.eq(slider.settings.startSlide).css({zIndex: slider.settings.slideZIndex, display: 'block'});
      }
      // create an element to contain all slider controls (pager, start / stop, etc)
      slider.controls.el = $('<div class="bx-controls" />');
      // if captions are requested, add them
      if(slider.settings.captions) appendCaptions();
      // check if startSlide is last slide
      slider.active.last = slider.settings.startSlide == getPagerQty() - 1;
      // if video is true, set up the fitVids plugin
      if(slider.settings.video) el.fitVids();
      // set the default preload selector (visible)
      var preloadSelector = slider.children.eq(slider.settings.startSlide);
      if (slider.settings.preloadImages == "all") preloadSelector = slider.children;
      // only check for control addition if not in "ticker" mode
      if(!slider.settings.ticker){
        // if pager is requested, add it
        if(slider.settings.pager) appendPager();
        // if controls are requested, add them
        if(slider.settings.controls) appendControls();
        // if auto is true, and auto controls are requested, add them
        if(slider.settings.auto && slider.settings.autoControls) appendControlsAuto();
        // if any control option is requested, add the controls wrapper
        if(slider.settings.controls || slider.settings.autoControls || slider.settings.pager) slider.viewport.after(slider.controls.el);
        // if ticker mode, do not allow a pager
      }else{
        slider.settings.pager = false;
      }
      // preload all images, then perform final DOM / CSS modifications that depend on images being loaded
      loadElements(preloadSelector, start);
    }

    var loadElements = function(selector, callback){
      var total = selector.find('img, iframe').length;
      if (total == 0){
        callback();
        return;
      }
      var count = 0;
      selector.find('img, iframe').each(function(){
        $(this).one('load', function() {
          if(++count == total) callback();
        }).each(function() {
          if(this.complete) $(this).load();
        });
      });
    }

    /**
		 * Start the slider
		 */
    var start = function(){
      // if infinite loop, prepare additional slides
      if(slider.settings.infiniteLoop && slider.settings.mode != 'fade' && !slider.settings.ticker){
        var slice = slider.settings.mode == 'vertical' ? slider.settings.minSlides : slider.settings.maxSlides;
        var sliceAppend = slider.children.slice(0, slice).clone().addClass('bx-clone');
        var slicePrepend = slider.children.slice(-slice).clone().addClass('bx-clone');
        el.append(sliceAppend).prepend(slicePrepend);
      }
      // remove the loading DOM element
      slider.loader.remove();
      // set the left / top position of "el"
      setSlidePosition();
      // if "vertical" mode, always use adaptiveHeight to prevent odd behavior
      if (slider.settings.mode == 'vertical') slider.settings.adaptiveHeight = true;
      // set the viewport height
      slider.viewport.height(getViewportHeight());
      // make sure everything is positioned just right (same as a window resize)
      el.redrawSlider();
      // onSliderLoad callback
      slider.settings.onSliderLoad(slider.active.index);
      // slider has been fully initialized
      slider.initialized = true;
      // bind the resize call to the window
      if (slider.settings.responsive) $(window).bind('resize', resizeWindow);
      // if auto is true and has more than 1 page, start the show
      if (slider.settings.auto && slider.settings.autoStart && (getPagerQty() > 1 || slider.settings.autoSlideForOnePage)) initAuto();
      // if ticker is true, start the ticker
      if (slider.settings.ticker) initTicker();
      // if pager is requested, make the appropriate pager link active
      if (slider.settings.pager) updatePagerActive(slider.settings.startSlide);
      // check for any updates to the controls (like hideControlOnEnd updates)
      if (slider.settings.controls) updateDirectionControls();
      // if touchEnabled is true, setup the touch events
      if (slider.settings.touchEnabled && !slider.settings.ticker) initTouch();
    }

    /**
		 * Returns the calculated height of the viewport, used to determine either adaptiveHeight or the maxHeight value
		 */
    var getViewportHeight = function(){
      var height = 0;
      // first determine which children (slides) should be used in our height calculation
      var children = $();
      // if mode is not "vertical" and adaptiveHeight is false, include all children
      if(slider.settings.mode != 'vertical' && !slider.settings.adaptiveHeight){
        children = slider.children;
      }else{
        // if not carousel, return the single active child
        if(!slider.carousel){
          children = slider.children.eq(slider.active.index);
          // if carousel, return a slice of children
        }else{
          // get the individual slide index
          var currentIndex = slider.settings.moveSlides == 1 ? slider.active.index : slider.active.index * getMoveBy();
          // add the current slide to the children
          children = slider.children.eq(currentIndex);
          // cycle through the remaining "showing" slides
          for (i = 1; i <= slider.settings.maxSlides - 1; i++){
            // if looped back to the start
            if(currentIndex + i >= slider.children.length){
              children = children.add(slider.children.eq(i - 1));
            }else{
              children = children.add(slider.children.eq(currentIndex + i));
            }
          }
        }
      }
      // if "vertical" mode, calculate the sum of the heights of the children
      if(slider.settings.mode == 'vertical'){
        children.each(function(index) {
          height += $(this).outerHeight();
        });
        // add user-supplied margins
        if(slider.settings.slideMargin > 0){
          height += slider.settings.slideMargin * (slider.settings.minSlides - 1);
        }
        // if not "vertical" mode, calculate the max height of the children
      }else{
        height = Math.max.apply(Math, children.map(function(){
          return $(this).outerHeight(false);
        }).get());
      }

      if(slider.viewport.css('box-sizing') == 'border-box'){
        height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom')) +
          parseFloat(slider.viewport.css('border-top-width')) + parseFloat(slider.viewport.css('border-bottom-width'));
      }else if(slider.viewport.css('box-sizing') == 'padding-box'){
        height +=	parseFloat(slider.viewport.css('padding-top')) + parseFloat(slider.viewport.css('padding-bottom'));
      }

      return height;
    }

    /**
		 * Returns the calculated width to be used for the outer wrapper / viewport
		 */
    var getViewportMaxWidth = function(){
      var width = '100%';
      if(slider.settings.slideWidth > 0){
        if(slider.settings.mode == 'horizontal'){
          width = (slider.settings.maxSlides * slider.settings.slideWidth) + ((slider.settings.maxSlides - 1) * slider.settings.slideMargin);
        }else{
          width = slider.settings.slideWidth;
        }
      }
      return width;
    }

    /**
		 * Returns the calculated width to be applied to each slide
		 */
    var getSlideWidth = function(){
      // start with any user-supplied slide width
      var newElWidth = slider.settings.slideWidth;
      // get the current viewport width
      var wrapWidth = slider.viewport.width();
      // if slide width was not supplied, or is larger than the viewport use the viewport width
      if(slider.settings.slideWidth == 0 ||
         (slider.settings.slideWidth > wrapWidth && !slider.carousel) ||
         slider.settings.mode == 'vertical'){
        newElWidth = wrapWidth;
        // if carousel, use the thresholds to determine the width
      }else if(slider.settings.maxSlides > 1 && slider.settings.mode == 'horizontal'){
        if(wrapWidth > slider.maxThreshold){
          // newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.maxSlides - 1))) / slider.settings.maxSlides;
        }else if(wrapWidth < slider.minThreshold){
          newElWidth = (wrapWidth - (slider.settings.slideMargin * (slider.settings.minSlides - 1))) / slider.settings.minSlides;
        }
      }
      return newElWidth;
    }

    /**
		 * Returns the number of slides currently visible in the viewport (includes partially visible slides)
		 */
    var getNumberSlidesShowing = function(){
      var slidesShowing = 1;
      if(slider.settings.mode == 'horizontal' && slider.settings.slideWidth > 0){
        // if viewport is smaller than minThreshold, return minSlides
        if(slider.viewport.width() < slider.minThreshold){
          slidesShowing = slider.settings.minSlides;
          // if viewport is larger than minThreshold, return maxSlides
        }else if(slider.viewport.width() > slider.maxThreshold){
          slidesShowing = slider.settings.maxSlides;
          // if viewport is between min / max thresholds, divide viewport width by first child width
        }else{
          var childWidth = slider.children.first().width() + slider.settings.slideMargin;
          slidesShowing = Math.floor((slider.viewport.width() +
                                      slider.settings.slideMargin) / childWidth);
        }
        // if "vertical" mode, slides showing will always be minSlides
      }else if(slider.settings.mode == 'vertical'){
        slidesShowing = slider.settings.minSlides;
      }
      return slidesShowing;
    }

    /**
		 * Returns the number of pages (one full viewport of slides is one "page")
		 */
    var getPagerQty = function(){
      var pagerQty = 0;
      // if moveSlides is specified by the user
      if(slider.settings.moveSlides > 0){
        if(slider.settings.infiniteLoop){
          pagerQty = Math.ceil(slider.children.length / getMoveBy());
        }else{
          // use a while loop to determine pages
          var breakPoint = 0;
          var counter = 0
          // when breakpoint goes above children length, counter is the number of pages
          while (breakPoint < slider.children.length){
            ++pagerQty;
            breakPoint = counter + getNumberSlidesShowing();
            counter += slider.settings.moveSlides <= getNumberSlidesShowing() ? slider.settings.moveSlides : getNumberSlidesShowing();
          }
        }
        // if moveSlides is 0 (auto) divide children length by sides showing, then round up
      }else{
        pagerQty = Math.ceil(slider.children.length / getNumberSlidesShowing());
      }
      return pagerQty;
    }

    /**
		 * Returns the number of indivual slides by which to shift the slider
		 */
    var getMoveBy = function(){
      // if moveSlides was set by the user and moveSlides is less than number of slides showing
      if(slider.settings.moveSlides > 0 && slider.settings.moveSlides <= getNumberSlidesShowing()){
        return slider.settings.moveSlides;
      }
      // if moveSlides is 0 (auto)
      return getNumberSlidesShowing();
    }

    /**
		 * Sets the slider's (el) left or top position
		 */
    var setSlidePosition = function(){
      // if last slide, not infinite loop, and number of children is larger than specified maxSlides
      if(slider.children.length > slider.settings.maxSlides && slider.active.last && !slider.settings.infiniteLoop){
        if (slider.settings.mode == 'horizontal'){
          // get the last child's position
          var lastChild = slider.children.last();
          var position = lastChild.position();
          // set the left position
          setPositionProperty(-(position.left - (slider.viewport.width() - lastChild.outerWidth())), 'reset', 0);
        }else if(slider.settings.mode == 'vertical'){
          // get the last showing index's position
          var lastShowingIndex = slider.children.length - slider.settings.minSlides;
          var position = slider.children.eq(lastShowingIndex).position();
          // set the top position
          setPositionProperty(-position.top, 'reset', 0);
        }
        // if not last slide
      }else{
        // get the position of the first showing slide
        var position = slider.children.eq(slider.active.index * getMoveBy()).position();
        // check for last slide
        if (slider.active.index == getPagerQty() - 1) slider.active.last = true;
        // set the repective position
        if (position != undefined){
          if (slider.settings.mode == 'horizontal') setPositionProperty(-position.left, 'reset', 0);
          else if (slider.settings.mode == 'vertical') setPositionProperty(-position.top, 'reset', 0);
        }
      }
    }

    /**
		 * Sets the el's animating property position (which in turn will sometimes animate el).
		 * If using CSS, sets the transform property. If not using CSS, sets the top / left property.
		 *
		 * @param value (int)
		 *  - the animating property's value
		 *
		 * @param type (string) 'slider', 'reset', 'ticker'
		 *  - the type of instance for which the function is being
		 *
		 * @param duration (int)
		 *  - the amount of time (in ms) the transition should occupy
		 *
		 * @param params (array) optional
		 *  - an optional parameter containing any variables that need to be passed in
		 */
    var setPositionProperty = function(value, type, duration, params){
      // use CSS transform
      if(slider.usingCSS){
        // determine the translate3d value
        var propValue = slider.settings.mode == 'vertical' ? 'translate3d(0, ' + value + 'px, 0)' : 'translate3d(' + value + 'px, 0, 0)';
        // add the CSS transition-duration
        el.css('-' + slider.cssPrefix + '-transition-duration', duration / 1000 + 's');
        if(type == 'slide'){
          // set the property value
          el.css(slider.animProp, propValue);
          // bind a callback method - executes when CSS transition completes
          el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            // unbind the callback
            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
            updateAfterSlideTransition();
          });
        }else if(type == 'reset'){
          el.css(slider.animProp, propValue);
        }else if(type == 'ticker'){
          // make the transition use 'linear'
          el.css('-' + slider.cssPrefix + '-transition-timing-function', 'linear');
          el.css(slider.animProp, propValue);
          // bind a callback method - executes when CSS transition completes
          el.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(){
            // unbind the callback
            el.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
            // reset the position
            setPositionProperty(params['resetValue'], 'reset', 0);
            // start the loop again
            tickerLoop();
          });
        }
        // use JS animate
      }else{
        var animateObj = {};
        animateObj[slider.animProp] = value;
        if(type == 'slide'){
          el.animate(animateObj, duration, slider.settings.easing, function(){
            updateAfterSlideTransition();
          });
        }else if(type == 'reset'){
          el.css(slider.animProp, value)
        }else if(type == 'ticker'){
          el.animate(animateObj, speed, 'linear', function(){
            setPositionProperty(params['resetValue'], 'reset', 0);
            // run the recursive loop after animation
            tickerLoop();
          });
        }
      }
    }

    /**
		 * Populates the pager with proper amount of pages
		 */
    var populatePager = function(){
      var pagerHtml = '';
      var pagerQty = getPagerQty();
      // loop through each pager item
      for(var i=0; i < pagerQty; i++){
        var linkContent = '';
        // if a buildPager function is supplied, use it to get pager link value, else use index + 1
        if(slider.settings.buildPager && $.isFunction(slider.settings.buildPager)){
          linkContent = slider.settings.buildPager(i);
          slider.pagerEl.addClass('bx-custom-pager');
        }else{
          linkContent = i + 1;
          slider.pagerEl.addClass('bx-default-pager');
        }
        // var linkContent = slider.settings.buildPager && $.isFunction(slider.settings.buildPager) ? slider.settings.buildPager(i) : i + 1;
        // add the markup to the string
        pagerHtml += '<div class="bx-pager-item"><a href="" data-slide-index="' + i + '" class="bx-pager-link">' + linkContent + '</a></div>';
      };
      // populate the pager element with pager links
      slider.pagerEl.html(pagerHtml);
    }

    /**
		 * Appends the pager to the controls element
		 */
    var appendPager = function(){
      if(!slider.settings.pagerCustom){
        // create the pager DOM element
        slider.pagerEl = $('<div class="bx-pager" />');
        // if a pager selector was supplied, populate it with the pager
        if(slider.settings.pagerSelector){
          $(slider.settings.pagerSelector).html(slider.pagerEl);
          // if no pager selector was supplied, add it after the wrapper
        }else{
          slider.controls.el.addClass('bx-has-pager').append(slider.pagerEl);
        }
        // populate the pager
        populatePager();
      }else{
        slider.pagerEl = $(slider.settings.pagerCustom);
      }
      // assign the pager click binding
      slider.pagerEl.on('click', 'a', clickPagerBind);
    }

    /**
		 * Appends prev / next controls to the controls element
		 */
    var appendControls = function(){
      slider.controls.next = $('<a class="bx-next" href="">' + slider.settings.nextText + '</a>');
      slider.controls.prev = $('<a class="bx-prev" href="">' + slider.settings.prevText + '</a>');
      // bind click actions to the controls
      slider.controls.next.bind('click', clickNextBind);
      slider.controls.prev.bind('click', clickPrevBind);
      // if nextSlector was supplied, populate it
      if(slider.settings.nextSelector){
        $(slider.settings.nextSelector).append(slider.controls.next);
      }
      // if prevSlector was supplied, populate it
      if(slider.settings.prevSelector){
        $(slider.settings.prevSelector).append(slider.controls.prev);
      }
      // if no custom selectors were supplied
      if(!slider.settings.nextSelector && !slider.settings.prevSelector){
        // add the controls to the DOM
        slider.controls.directionEl = $('<div class="bx-controls-direction" />');
        // add the control elements to the directionEl
        slider.controls.directionEl.append(slider.controls.prev).append(slider.controls.next);
        // slider.viewport.append(slider.controls.directionEl);
        slider.controls.el.addClass('bx-has-controls-direction').append(slider.controls.directionEl);
      }
    }

    /**
		 * Appends start / stop auto controls to the controls element
		 */
    var appendControlsAuto = function(){
      slider.controls.start = $('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + slider.settings.startText + '</a></div>');
      slider.controls.stop = $('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + slider.settings.stopText + '</a></div>');
      // add the controls to the DOM
      slider.controls.autoEl = $('<div class="bx-controls-auto" />');
      // bind click actions to the controls
      slider.controls.autoEl.on('click', '.bx-start', clickStartBind);
      slider.controls.autoEl.on('click', '.bx-stop', clickStopBind);
      // if autoControlsCombine, insert only the "start" control
      if(slider.settings.autoControlsCombine){
        slider.controls.autoEl.append(slider.controls.start);
        // if autoControlsCombine is false, insert both controls
      }else{
        slider.controls.autoEl.append(slider.controls.start).append(slider.controls.stop);
      }
      // if auto controls selector was supplied, populate it with the controls
      if(slider.settings.autoControlsSelector){
        $(slider.settings.autoControlsSelector).html(slider.controls.autoEl);
        // if auto controls selector was not supplied, add it after the wrapper
      }else{
        slider.controls.el.addClass('bx-has-controls-auto').append(slider.controls.autoEl);
      }
      // update the auto controls
      updateAutoControls(slider.settings.autoStart ? 'stop' : 'start');
    }

    /**
		 * Appends image captions to the DOM
		 */
    var appendCaptions = function(){
      // cycle through each child
      slider.children.each(function(index){
        // get the image title attribute
        var title = $(this).find('img:first').attr('title');
        // append the caption
        if (title != undefined && ('' + title).length) {
          $(this).append('<div class="bx-caption"><span>' + title + '</span></div>');
        }
      });
    }

    /**
		 * Click next binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var clickNextBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      el.goToNextSlide();
      e.preventDefault();
    }

    /**
		 * Click prev binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var clickPrevBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      el.goToPrevSlide();
      e.preventDefault();
    }

    /**
		 * Click start binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var clickStartBind = function(e){
      el.startAuto();
      e.preventDefault();
    }

    /**
		 * Click stop binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var clickStopBind = function(e){
      el.stopAuto();
      e.preventDefault();
    }

    /**
		 * Click pager binding
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var clickPagerBind = function(e){
      // if auto show is running, stop it
      if (slider.settings.auto) el.stopAuto();
      var pagerLink = $(e.currentTarget);
      if(pagerLink.attr('data-slide-index') !== undefined){
        var pagerIndex = parseInt(pagerLink.attr('data-slide-index'));
        // if clicked pager link is not active, continue with the goToSlide call
        if(pagerIndex != slider.active.index) el.goToSlide(pagerIndex);
        e.preventDefault();
      }
    }

    /**
		 * Updates the pager links with an active class
		 *
		 * @param slideIndex (int)
		 *  - index of slide to make active
		 */
    var updatePagerActive = function(slideIndex){
      // if "short" pager type
      var len = slider.children.length; // nb of children
      if(slider.settings.pagerType == 'short'){
        if(slider.settings.maxSlides > 1) {
          len = Math.ceil(slider.children.length/slider.settings.maxSlides);
        }
        slider.pagerEl.html( (slideIndex + 1) + slider.settings.pagerShortSeparator + len);
        return;
      }
      // remove all pager active classes
      slider.pagerEl.find('a').removeClass('active');
      // apply the active class for all pagers
      slider.pagerEl.each(function(i, el) { $(el).find('a').eq(slideIndex).addClass('active'); });
    }

    /**
		 * Performs needed actions after a slide transition
		 */
    var updateAfterSlideTransition = function(){
      // if infinte loop is true
      if(slider.settings.infiniteLoop){
        var position = '';
        // first slide
        if(slider.active.index == 0){
          // set the new position
          position = slider.children.eq(0).position();
          // carousel, last slide
        }else if(slider.active.index == getPagerQty() - 1 && slider.carousel){
          position = slider.children.eq((getPagerQty() - 1) * getMoveBy()).position();
          // last slide
        }else if(slider.active.index == slider.children.length - 1){
          position = slider.children.eq(slider.children.length - 1).position();
        }
        if(position){
          if (slider.settings.mode == 'horizontal') { setPositionProperty(-position.left, 'reset', 0); }
          else if (slider.settings.mode == 'vertical') { setPositionProperty(-position.top, 'reset', 0); }
        }
      }
      // declare that the transition is complete
      slider.working = false;
      // onSlideAfter callback
      slider.settings.onSlideAfter(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
    }

    /**
		 * Updates the auto controls state (either active, or combined switch)
		 *
		 * @param state (string) "start", "stop"
		 *  - the new state of the auto show
		 */
    var updateAutoControls = function(state){
      // if autoControlsCombine is true, replace the current control with the new state
      if(slider.settings.autoControlsCombine){
        slider.controls.autoEl.html(slider.controls[state]);
        // if autoControlsCombine is false, apply the "active" class to the appropriate control
      }else{
        slider.controls.autoEl.find('a').removeClass('active');
        slider.controls.autoEl.find('a:not(.bx-' + state + ')').addClass('active');
      }
    }

    /**
		 * Updates the direction controls (checks if either should be hidden)
		 */
    var updateDirectionControls = function(){
      if(getPagerQty() == 1){
        slider.controls.prev.addClass('disabled');
        slider.controls.next.addClass('disabled');
      }else if(!slider.settings.infiniteLoop && slider.settings.hideControlOnEnd){
        // if first slide
        if (slider.active.index == 0){
          slider.controls.prev.addClass('disabled');
          slider.controls.next.removeClass('disabled');
          // if last slide
        }else if(slider.active.index == getPagerQty() - 1){
          slider.controls.next.addClass('disabled');
          slider.controls.prev.removeClass('disabled');
          // if any slide in the middle
        }else{
          slider.controls.prev.removeClass('disabled');
          slider.controls.next.removeClass('disabled');
        }
      }
    }

    /**
		 * Initialzes the auto process
		 */
    var initAuto = function(){
      // if autoDelay was supplied, launch the auto show using a setTimeout() call
      if(slider.settings.autoDelay > 0){
        var timeout = setTimeout(el.startAuto, slider.settings.autoDelay);
        // if autoDelay was not supplied, start the auto show normally
      }else{
        el.startAuto();
      }
      // if autoHover is requested
      if(slider.settings.autoHover){
        // on el hover
        el.hover(function(){
          // if the auto show is currently playing (has an active interval)
          if(slider.interval){
            // stop the auto show and pass true agument which will prevent control update
            el.stopAuto(true);
            // create a new autoPaused value which will be used by the relative "mouseout" event
            slider.autoPaused = true;
          }
        }, function(){
          // if the autoPaused value was created be the prior "mouseover" event
          if(slider.autoPaused){
            // start the auto show and pass true agument which will prevent control update
            el.startAuto(true);
            // reset the autoPaused value
            slider.autoPaused = null;
          }
        });
      }
    }

    /**
		 * Initialzes the ticker process
		 */
    var initTicker = function(){
      var startPosition = 0;
      // if autoDirection is "next", append a clone of the entire slider
      if(slider.settings.autoDirection == 'next'){
        el.append(slider.children.clone().addClass('bx-clone'));
        // if autoDirection is "prev", prepend a clone of the entire slider, and set the left position
      }else{
        el.prepend(slider.children.clone().addClass('bx-clone'));
        var position = slider.children.first().position();
        startPosition = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
      }
      setPositionProperty(startPosition, 'reset', 0);
      // do not allow controls in ticker mode
      slider.settings.pager = false;
      slider.settings.controls = false;
      slider.settings.autoControls = false;
      // if autoHover is requested
      if(slider.settings.tickerHover && !slider.usingCSS){
        // on el hover
        slider.viewport.hover(function(){
          el.stop();
        }, function(){
          // calculate the total width of children (used to calculate the speed ratio)
          var totalDimens = 0;
          slider.children.each(function(index){
            totalDimens += slider.settings.mode == 'horizontal' ? $(this).outerWidth(true) : $(this).outerHeight(true);
          });
          // calculate the speed ratio (used to determine the new speed to finish the paused animation)
          var ratio = slider.settings.speed / totalDimens;
          // determine which property to use
          var property = slider.settings.mode == 'horizontal' ? 'left' : 'top';
          // calculate the new speed
          var newSpeed = ratio * (totalDimens - (Math.abs(parseInt(el.css(property)))));
          tickerLoop(newSpeed);
        });
      }
      // start the ticker loop
      tickerLoop();
    }

    /**
		 * Runs a continuous loop, news ticker-style
		 */
    var tickerLoop = function(resumeSpeed){
      speed = resumeSpeed ? resumeSpeed : slider.settings.speed;
      var position = {left: 0, top: 0};
      var reset = {left: 0, top: 0};
      // if "next" animate left position to last child, then reset left to 0
      if(slider.settings.autoDirection == 'next'){
        position = el.find('.bx-clone').first().position();
        // if "prev" animate left position to 0, then reset left to first non-clone child
      }else{
        reset = slider.children.first().position();
      }
      var animateProperty = slider.settings.mode == 'horizontal' ? -position.left : -position.top;
      var resetValue = slider.settings.mode == 'horizontal' ? -reset.left : -reset.top;
      var params = {resetValue: resetValue};
      setPositionProperty(animateProperty, 'ticker', speed, params);
    }

    /**
		 * Initializes touch events
		 */
    var initTouch = function(){
      // initialize object to contain all touch values
      slider.touch = {
        start: {x: 0, y: 0},
        end: {x: 0, y: 0}
      }
      slider.viewport.bind('touchstart', onTouchStart);
    }

    /**
		 * Event handler for "touchstart"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var onTouchStart = function(e){
      if(slider.working){
        e.preventDefault();
      }else{
        // record the original position when touch starts
        slider.touch.originalPos = el.position();
        var orig = e.originalEvent;
        // record the starting touch x, y coordinates
        slider.touch.start.x = orig.changedTouches[0].pageX;
        slider.touch.start.y = orig.changedTouches[0].pageY;
        // bind a "touchmove" event to the viewport
        slider.viewport.bind('touchmove', onTouchMove);
        // bind a "touchend" event to the viewport
        slider.viewport.bind('touchend', onTouchEnd);
      }
    }

    /**
		 * Event handler for "touchmove"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var onTouchMove = function(e){
      var orig = e.originalEvent;
      // if scrolling on y axis, do not prevent default
      var xMovement = Math.abs(orig.changedTouches[0].pageX - slider.touch.start.x);
      var yMovement = Math.abs(orig.changedTouches[0].pageY - slider.touch.start.y);
      // x axis swipe
      if((xMovement * 3) > yMovement && slider.settings.preventDefaultSwipeX){
        e.preventDefault();
        // y axis swipe
      }else if((yMovement * 3) > xMovement && slider.settings.preventDefaultSwipeY){
        e.preventDefault();
      }
      if(slider.settings.mode != 'fade' && slider.settings.oneToOneTouch){
        var value = 0;
        // if horizontal, drag along x axis
        if(slider.settings.mode == 'horizontal'){
          var change = orig.changedTouches[0].pageX - slider.touch.start.x;
          value = slider.touch.originalPos.left + change;
          // if vertical, drag along y axis
        }else{
          var change = orig.changedTouches[0].pageY - slider.touch.start.y;
          value = slider.touch.originalPos.top + change;
        }
        setPositionProperty(value, 'reset', 0);
      }
    }

    /**
		 * Event handler for "touchend"
		 *
		 * @param e (event)
		 *  - DOM event object
		 */
    var onTouchEnd = function(e){
      slider.viewport.unbind('touchmove', onTouchMove);
      var orig = e.originalEvent;
      var value = 0;
      // record end x, y positions
      slider.touch.end.x = orig.changedTouches[0].pageX;
      slider.touch.end.y = orig.changedTouches[0].pageY;
      // if fade mode, check if absolute x distance clears the threshold
      if(slider.settings.mode == 'fade'){
        var distance = Math.abs(slider.touch.start.x - slider.touch.end.x);
        if(distance >= slider.settings.swipeThreshold){
          slider.touch.start.x > slider.touch.end.x ? el.goToNextSlide() : el.goToPrevSlide();
          el.stopAuto();
        }
        // not fade mode
      }else{
        var distance = 0;
        // calculate distance and el's animate property
        if(slider.settings.mode == 'horizontal'){
          distance = slider.touch.end.x - slider.touch.start.x;
          value = slider.touch.originalPos.left;
        }else{
          distance = slider.touch.end.y - slider.touch.start.y;
          value = slider.touch.originalPos.top;
        }
        // if not infinite loop and first / last slide, do not attempt a slide transition
        if(!slider.settings.infiniteLoop && ((slider.active.index == 0 && distance > 0) || (slider.active.last && distance < 0))){
          setPositionProperty(value, 'reset', 200);
        }else{
          // check if distance clears threshold
          if(Math.abs(distance) >= slider.settings.swipeThreshold){
            distance < 0 ? el.goToNextSlide() : el.goToPrevSlide();
            el.stopAuto();
          }else{
            // el.animate(property, 200);
            setPositionProperty(value, 'reset', 200);
          }
        }
      }
      slider.viewport.unbind('touchend', onTouchEnd);
    }

    /**
		 * Window resize event callback
		 */
    var resizeWindow = function(e){
      // don't do anything if slider isn't initialized.
      if(!slider.initialized) return;
      // get the new window dimens (again, thank you IE)
      var windowWidthNew = $(window).width();
      var windowHeightNew = $(window).height();
      // make sure that it is a true window resize
      // *we must check this because our dinosaur friend IE fires a window resize event when certain DOM elements
      // are resized. Can you just die already?*
      if(windowWidth != windowWidthNew || windowHeight != windowHeightNew){
        // set the new window dimens
        windowWidth = windowWidthNew;
        windowHeight = windowHeightNew;
        // update all dynamic elements
        el.redrawSlider();
        // Call user resize handler
        slider.settings.onSliderResize.call(el, slider.active.index);
      }
    }

    /**
		 * ===================================================================================
		 * = PUBLIC FUNCTIONS
		 * ===================================================================================
		 */

    /**
		 * Performs slide transition to the specified slide
		 *
		 * @param slideIndex (int)
		 *  - the destination slide's index (zero-based)
		 *
		 * @param direction (string)
		 *  - INTERNAL USE ONLY - the direction of travel ("prev" / "next")
		 */
    el.goToSlide = function(slideIndex, direction){
      // if plugin is currently in motion, ignore request
      if(slider.working || slider.active.index == slideIndex) return;
      // declare that plugin is in motion
      slider.working = true;
      // store the old index
      slider.oldIndex = slider.active.index;
      // if slideIndex is less than zero, set active index to last child (this happens during infinite loop)
      if(slideIndex < 0){
        slider.active.index = getPagerQty() - 1;
        // if slideIndex is greater than children length, set active index to 0 (this happens during infinite loop)
      }else if(slideIndex >= getPagerQty()){
        slider.active.index = 0;
        // set active index to requested slide
      }else{
        slider.active.index = slideIndex;
      }
      // onSlideBefore, onSlideNext, onSlidePrev callbacks
      slider.settings.onSlideBefore(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      if(direction == 'next'){
        slider.settings.onSlideNext(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      }else if(direction == 'prev'){
        slider.settings.onSlidePrev(slider.children.eq(slider.active.index), slider.oldIndex, slider.active.index);
      }
      // check if last slide
      slider.active.last = slider.active.index >= getPagerQty() - 1;
      // update the pager with active class
      if(slider.settings.pager) updatePagerActive(slider.active.index);
      // // check for direction control update
      if(slider.settings.controls) updateDirectionControls();
      // if slider is set to mode: "fade"
      if(slider.settings.mode == 'fade'){
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        // fade out the visible child and reset its z-index value
        slider.children.filter(':visible').fadeOut(slider.settings.speed).css({zIndex: 0});
        // fade in the newly requested slide
        slider.children.eq(slider.active.index).css('zIndex', slider.settings.slideZIndex+1).fadeIn(slider.settings.speed, function(){
          $(this).css('zIndex', slider.settings.slideZIndex);
          updateAfterSlideTransition();
        });
        // slider mode is not "fade"
      }else{
        // if adaptiveHeight is true and next height is different from current height, animate to the new height
        if(slider.settings.adaptiveHeight && slider.viewport.height() != getViewportHeight()){
          slider.viewport.animate({height: getViewportHeight()}, slider.settings.adaptiveHeightSpeed);
        }
        var moveBy = 0;
        var position = {left: 0, top: 0};
        // if carousel and not infinite loop
        if(!slider.settings.infiniteLoop && slider.carousel && slider.active.last){
          if(slider.settings.mode == 'horizontal'){
            // get the last child position
            var lastChild = slider.children.eq(slider.children.length - 1);
            position = lastChild.position();
            // calculate the position of the last slide
            moveBy = slider.viewport.width() - lastChild.outerWidth();
          }else{
            // get last showing index position
            var lastShowingIndex = slider.children.length - slider.settings.minSlides;
            position = slider.children.eq(lastShowingIndex).position();
          }
          // horizontal carousel, going previous while on first slide (infiniteLoop mode)
        }else if(slider.carousel && slider.active.last && direction == 'prev'){
          // get the last child position
          var eq = slider.settings.moveSlides == 1 ? slider.settings.maxSlides - getMoveBy() : ((getPagerQty() - 1) * getMoveBy()) - (slider.children.length - slider.settings.maxSlides);
          var lastChild = el.children('.bx-clone').eq(eq);
          position = lastChild.position();
          // if infinite loop and "Next" is clicked on the last slide
        }else if(direction == 'next' && slider.active.index == 0){
          // get the last clone position
          position = el.find('> .bx-clone').eq(slider.settings.maxSlides).position();
          slider.active.last = false;
          // normal non-zero requests
        }else if(slideIndex >= 0){
          var requestEl = slideIndex * getMoveBy();
          position = slider.children.eq(requestEl).position();
        }

        /* If the position doesn't exist
				 * (e.g. if you destroy the slider on a next click),
				 * it doesn't throw an error.
				 */
        if ("undefined" !== typeof(position)) {
          var value = slider.settings.mode == 'horizontal' ? -(position.left - moveBy) : -position.top;
          // plugin values to be animated
          setPositionProperty(value, 'slide', slider.settings.speed);
        }
      }
    }

    /**
		 * Transitions to the next slide in the show
		 */
    el.goToNextSlide = function(){
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.last) return;
      var pagerIndex = parseInt(slider.active.index) + 1;
      el.goToSlide(pagerIndex, 'next');
    }

    /**
		 * Transitions to the prev slide in the show
		 */
    el.goToPrevSlide = function(){
      // if infiniteLoop is false and last page is showing, disregard call
      if (!slider.settings.infiniteLoop && slider.active.index == 0) return;
      var pagerIndex = parseInt(slider.active.index) - 1;
      el.goToSlide(pagerIndex, 'prev');
    }

    /**
		 * Starts the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
    el.startAuto = function(preventControlUpdate){
      // if an interval already exists, disregard call
      if(slider.interval) return;
      // create an interval
      slider.interval = setInterval(function(){
        slider.settings.autoDirection == 'next' ? el.goToNextSlide() : el.goToPrevSlide();
      }, slider.settings.pause);
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('stop');
    }

    /**
		 * Stops the auto show
		 *
		 * @param preventControlUpdate (boolean)
		 *  - if true, auto controls state will not be updated
		 */
    el.stopAuto = function(preventControlUpdate){
      // if no interval exists, disregard call
      if(!slider.interval) return;
      // clear the interval
      clearInterval(slider.interval);
      slider.interval = null;
      // if auto controls are displayed and preventControlUpdate is not true
      if (slider.settings.autoControls && preventControlUpdate != true) updateAutoControls('start');
    }

    /**
		 * Returns current slide index (zero-based)
		 */
    el.getCurrentSlide = function(){
      return slider.active.index;
    }

    /**
		 * Returns current slide element
		 */
    el.getCurrentSlideElement = function(){
      return slider.children.eq(slider.active.index);
    }

    /**
		 * Returns number of slides in show
		 */
    el.getSlideCount = function(){
      return slider.children.length;
    }

    /**
		 * Update all dynamic slider elements
		 */
    el.redrawSlider = function(){
      // resize all children in ratio to new screen size
      slider.children.add(el.find('.bx-clone')).width(getSlideWidth());
      // adjust the height
      slider.viewport.css('height', getViewportHeight());
      // update the slide position
      if(!slider.settings.ticker) setSlidePosition();
      // if active.last was true before the screen resize, we want
      // to keep it last no matter what screen size we end on
      if (slider.active.last) slider.active.index = getPagerQty() - 1;
      // if the active index (page) no longer exists due to the resize, simply set the index as last
      if (slider.active.index >= getPagerQty()) slider.active.last = true;
      // if a pager is being displayed and a custom pager is not being used, update it
      if(slider.settings.pager && !slider.settings.pagerCustom){
        populatePager();
        updatePagerActive(slider.active.index);
      }
    }

    /**
		 * Destroy the current instance of the slider (revert everything back to original state)
		 */
    el.destroySlider = function(){
      // don't do anything if slider has already been destroyed
      if(!slider.initialized) return;
      slider.initialized = false;
      $('.bx-clone', this).remove();
      slider.children.each(function() {
        $(this).data("origStyle") != undefined ? $(this).attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
      });
      $(this).data("origStyle") != undefined ? this.attr("style", $(this).data("origStyle")) : $(this).removeAttr('style');
      $(this).unwrap().unwrap();
      if(slider.controls.el) slider.controls.el.remove();
      if(slider.controls.next) slider.controls.next.remove();
      if(slider.controls.prev) slider.controls.prev.remove();
      if(slider.pagerEl && slider.settings.controls) slider.pagerEl.remove();
      $('.bx-caption', this).remove();
      if(slider.controls.autoEl) slider.controls.autoEl.remove();
      clearInterval(slider.interval);
      if(slider.settings.responsive) $(window).unbind('resize', resizeWindow);
    }

    /**
		 * Reload the slider (revert all DOM changes, and re-initialize)
		 */
    el.reloadSlider = function(settings){
      if (settings != undefined) options = settings;
      el.destroySlider();
      init();
    }

    init();

    // returns the current jQuery object
    return this;
  }

})(jQuery);
;/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2013 M. Alsup
 * Version: 3.0.3 (11-JUL-2013)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.7.1 or later
 */
;(function($, undefined) {
  "use strict";

  var ver = '3.0.3';

  function debug(s) {
    if ($.fn.cycle.debug)
      log(s);
  }
  function log() {
    /*global console */
    if (window.console && console.log)
      console.log('[cycle] ' + Array.prototype.join.call(arguments,' '));
  }
  $.expr[':'].paused = function(el) {
    return el.cyclePause;
  };


  // the options arg can be...
  //   a number  - indicates an immediate transition should occur to the given slide index
  //   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
  //   an object - properties to control the slideshow
  //
  // the arg2 arg can be...
  //   the name of an fx (only used in conjunction with a numeric value for 'options')
  //   the value true (only used in first arg == 'resume') and indicates
  //	 that the resume should occur immediately (not wait for next timeout)

  $.fn.cycle = function(options, arg2) {
    var o = { s: this.selector, c: this.context };

    // in 1.3+ we can fix mistakes with the ready state
    if (this.length === 0 && options != 'stop') {
      if (!$.isReady && o.s) {
        log('DOM not ready, queuing slideshow');
        $(function() {
          $(o.s,o.c).cycle(options,arg2);
        });
        return this;
      }
      // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
      log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
      return this;
    }

    // iterate the matched nodeset
    return this.each(function() {
      var opts = handleArguments(this, options, arg2);
      if (opts === false)
        return;

      opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;

      // stop existing slideshow for this container (if there is one)
      if (this.cycleTimeout)
        clearTimeout(this.cycleTimeout);
      this.cycleTimeout = this.cyclePause = 0;
      this.cycleStop = 0; // issue #108

      var $cont = $(this);
      var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
      var els = $slides.get();

      if (els.length < 2) {
        log('terminating; too few slides: ' + els.length);
        return;
      }

      var opts2 = buildOptions($cont, $slides, els, opts, o);
      if (opts2 === false)
        return;

      var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

      // if it's an auto slideshow, kick it off
      if (startTime) {
        startTime += (opts2.delay || 0);
        if (startTime < 10)
          startTime = 10;
        debug('first timeout: ' + startTime);
        this.cycleTimeout = setTimeout(function(){go(els,opts2,0,!opts.backwards);}, startTime);
      }
    });
  };

  function triggerPause(cont, byHover, onPager) {
    var opts = $(cont).data('cycle.opts');
    if (!opts)
      return;
    var paused = !!cont.cyclePause;
    if (paused && opts.paused)
      opts.paused(cont, opts, byHover, onPager);
    else if (!paused && opts.resumed)
      opts.resumed(cont, opts, byHover, onPager);
  }

  // process the args that were passed to the plugin fn
  function handleArguments(cont, options, arg2) {
    if (cont.cycleStop === undefined)
      cont.cycleStop = 0;
    if (options === undefined || options === null)
      options = {};
    if (options.constructor == String) {
      switch(options) {
        case 'destroy':
        case 'stop':
          var opts = $(cont).data('cycle.opts');
          if (!opts)
            return false;
          cont.cycleStop++; // callbacks look for change
          if (cont.cycleTimeout)
            clearTimeout(cont.cycleTimeout);
          cont.cycleTimeout = 0;
          if (opts.elements)
            $(opts.elements).stop();
          $(cont).removeData('cycle.opts');
          if (options == 'destroy')
            destroy(cont, opts);
          return false;
        case 'toggle':
          cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
          checkInstantResume(cont.cyclePause, arg2, cont);
          triggerPause(cont);
          return false;
        case 'pause':
          cont.cyclePause = 1;
          triggerPause(cont);
          return false;
        case 'resume':
          cont.cyclePause = 0;
          checkInstantResume(false, arg2, cont);
          triggerPause(cont);
          return false;
        case 'prev':
        case 'next':
          opts = $(cont).data('cycle.opts');
          if (!opts) {
            log('options not found, "prev/next" ignored');
            return false;
          }
          if (typeof arg2 == 'string')
            opts.oneTimeFx = arg2;
          $.fn.cycle[options](opts);
          return false;
        default:
          options = { fx: options };
      }
      return options;
    }
    else if (options.constructor == Number) {
      // go to the requested slide
      var num = options;
      options = $(cont).data('cycle.opts');
      if (!options) {
        log('options not found, can not advance slide');
        return false;
      }
      if (num < 0 || num >= options.elements.length) {
        log('invalid slide index: ' + num);
        return false;
      }
      options.nextSlide = num;
      if (cont.cycleTimeout) {
        clearTimeout(cont.cycleTimeout);
        cont.cycleTimeout = 0;
      }
      if (typeof arg2 == 'string')
        options.oneTimeFx = arg2;
      go(options.elements, options, 1, num >= options.currSlide);
      return false;
    }
    return options;

    function checkInstantResume(isPaused, arg2, cont) {
      if (!isPaused && arg2 === true) { // resume now!
        var options = $(cont).data('cycle.opts');
        if (!options) {
          log('options not found, can not resume');
          return false;
        }
        if (cont.cycleTimeout) {
          clearTimeout(cont.cycleTimeout);
          cont.cycleTimeout = 0;
        }
        go(options.elements, options, 1, !options.backwards);
      }
    }
  }

  function removeFilter(el, opts) {
    if (!$.support.opacity && opts.cleartype && el.style.filter) {
      try { el.style.removeAttribute('filter'); }
      catch(smother) {} // handle old opera versions
    }
  }

  // unbind event handlers
  function destroy(cont, opts) {
    if (opts.next)
      $(opts.next).unbind(opts.prevNextEvent);
    if (opts.prev)
      $(opts.prev).unbind(opts.prevNextEvent);

    if (opts.pager || opts.pagerAnchorBuilder)
      $.each(opts.pagerAnchors || [], function() {
        this.unbind().remove();
      });
    opts.pagerAnchors = null;
    $(cont).unbind('mouseenter.cycle mouseleave.cycle');
    if (opts.destroy) // callback
      opts.destroy(opts);
  }

  // one-time initialization
  function buildOptions($cont, $slides, els, options, o) {
    var startingSlideSpecified;
    // support metadata plugin (v1.0 and v2.0)
    var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
    var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
    if (meta)
      opts = $.extend(opts, meta);
    if (opts.autostop)
      opts.countdown = opts.autostopCount || els.length;

    var cont = $cont[0];
    $cont.data('cycle.opts', opts);
    opts.$cont = $cont;
    opts.stopCount = cont.cycleStop;
    opts.elements = els;
    opts.before = opts.before ? [opts.before] : [];
    opts.after = opts.after ? [opts.after] : [];

    // push some after callbacks
    if (!$.support.opacity && opts.cleartype)
      opts.after.push(function() { removeFilter(this, opts); });
    if (opts.continuous)
      opts.after.push(function() { go(els,opts,0,!opts.backwards); });

    saveOriginalOpts(opts);

    // clearType corrections
    if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
      clearTypeFix($slides);

    // container requires non-static position so that slides can be position within
    if ($cont.css('position') == 'static')
      $cont.css('position', 'relative');
    if (opts.width)
      $cont.width(opts.width);
    if (opts.height && opts.height != 'auto')
      $cont.height(opts.height);

    if (opts.startingSlide !== undefined) {
      opts.startingSlide = parseInt(opts.startingSlide,10);
      if (opts.startingSlide >= els.length || opts.startSlide < 0)
        opts.startingSlide = 0; // catch bogus input
      else
        startingSlideSpecified = true;
    }
    else if (opts.backwards)
      opts.startingSlide = els.length - 1;
    else
      opts.startingSlide = 0;

    // if random, mix up the slide array
    if (opts.random) {
      opts.randomMap = [];
      for (var i = 0; i < els.length; i++)
        opts.randomMap.push(i);
      opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
      if (startingSlideSpecified) {
        // try to find the specified starting slide and if found set start slide index in the map accordingly
        for ( var cnt = 0; cnt < els.length; cnt++ ) {
          if ( opts.startingSlide == opts.randomMap[cnt] ) {
            opts.randomIndex = cnt;
          }
        }
      }
      else {
        opts.randomIndex = 1;
        opts.startingSlide = opts.randomMap[1];
      }
    }
    else if (opts.startingSlide >= els.length)
      opts.startingSlide = 0; // catch bogus input
    opts.currSlide = opts.startingSlide || 0;
    var first = opts.startingSlide;

    // set position and zIndex on all the slides
    $slides.css({position: 'absolute', top:0, left:0}).hide().each(function(i) {
      var z;
      if (opts.backwards)
        z = first ? i <= first ? els.length + (i-first) : first-i : els.length-i;
      else
        z = first ? i >= first ? els.length - (i-first) : first-i : els.length-i;
      $(this).css('z-index', z);
    });

    // make sure first slide is visible
    $(els[first]).css('opacity',1).show(); // opacity bit needed to handle restart use case
    removeFilter(els[first], opts);

    // stretch slides
    if (opts.fit) {
      if (!opts.aspect) {
        if (opts.width)
          $slides.width(opts.width);
        if (opts.height && opts.height != 'auto')
          $slides.height(opts.height);
      } else {
        $slides.each(function(){
          var $slide = $(this);
          var ratio = (opts.aspect === true) ? $slide.width()/$slide.height() : opts.aspect;
          if( opts.width && $slide.width() != opts.width ) {
            $slide.width( opts.width );
            $slide.height( opts.width / ratio );
          }

          if( opts.height && $slide.height() < opts.height ) {
            $slide.height( opts.height );
            $slide.width( opts.height * ratio );
          }
        });
      }
    }

    if (opts.center && ((!opts.fit) || opts.aspect)) {
      $slides.each(function(){
        var $slide = $(this);
        $slide.css({
          "margin-left": opts.width ?
          ((opts.width - $slide.width()) / 2) + "px" :
          0,
          "margin-top": opts.height ?
          ((opts.height - $slide.height()) / 2) + "px" :
          0
        });
      });
    }

    if (opts.center && !opts.fit && !opts.slideResize) {
      $slides.each(function(){
        var $slide = $(this);
        $slide.css({
          "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
          "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
        });
      });
    }

    // stretch container
    var reshape = (opts.containerResize || opts.containerResizeHeight) && $cont.innerHeight() < 1;
    if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
      var maxw = 0, maxh = 0;
      for(var j=0; j < els.length; j++) {
        var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
        if (!w) w = e.offsetWidth || e.width || $e.attr('width');
        if (!h) h = e.offsetHeight || e.height || $e.attr('height');
        maxw = w > maxw ? w : maxw;
        maxh = h > maxh ? h : maxh;
      }
      if (opts.containerResize && maxw > 0 && maxh > 0)
        $cont.css({width:maxw+'px',height:maxh+'px'});
      if (opts.containerResizeHeight && maxh > 0)
        $cont.css({height:maxh+'px'});
    }

    var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
    if (opts.pause)
      $cont.bind('mouseenter.cycle', function(){
        pauseFlag = true;
        this.cyclePause++;
        triggerPause(cont, true);
      }).bind('mouseleave.cycle', function(){
        if (pauseFlag)
          this.cyclePause--;
        triggerPause(cont, true);
      });

    if (supportMultiTransitions(opts) === false)
      return false;

    // apparently a lot of people use image slideshows without height/width attributes on the images.
    // Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
    var requeue = false;
    options.requeueAttempts = options.requeueAttempts || 0;
    $slides.each(function() {
      // try to get height/width of each slide
      var $el = $(this);
      this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
      this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

      if ( $el.is('img') ) {
        var loading = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
        // don't requeue for images that are still loading but have a valid size
        if (loading) {
          if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
            log(options.requeueAttempts,' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
            setTimeout(function() {$(o.s,o.c).cycle(options);}, opts.requeueTimeout);
            requeue = true;
            return false; // break each loop
          }
          else {
            log('could not determine size of image: '+this.src, this.cycleW, this.cycleH);
          }
        }
      }
      return true;
    });

    if (requeue)
      return false;

    opts.cssBefore = opts.cssBefore || {};
    opts.cssAfter = opts.cssAfter || {};
    opts.cssFirst = opts.cssFirst || {};
    opts.animIn = opts.animIn || {};
    opts.animOut = opts.animOut || {};

    $slides.not(':eq('+first+')').css(opts.cssBefore);
    $($slides[first]).css(opts.cssFirst);

    if (opts.timeout) {
      opts.timeout = parseInt(opts.timeout,10);
      // ensure that timeout and speed settings are sane
      if (opts.speed.constructor == String)
        opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed,10);
      if (!opts.sync)
        opts.speed = opts.speed / 2;

      var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
      while((opts.timeout - opts.speed) < buffer) // sanitize timeout
        opts.timeout += opts.speed;
    }
    if (opts.easing)
      opts.easeIn = opts.easeOut = opts.easing;
    if (!opts.speedIn)
      opts.speedIn = opts.speed;
    if (!opts.speedOut)
      opts.speedOut = opts.speed;

    opts.slideCount = els.length;
    opts.currSlide = opts.lastSlide = first;
    if (opts.random) {
      if (++opts.randomIndex == els.length)
        opts.randomIndex = 0;
      opts.nextSlide = opts.randomMap[opts.randomIndex];
    }
    else if (opts.backwards)
      opts.nextSlide = opts.startingSlide === 0 ? (els.length-1) : opts.startingSlide-1;
    else
      opts.nextSlide = opts.startingSlide >= (els.length-1) ? 0 : opts.startingSlide+1;

    // run transition init fn
    if (!opts.multiFx) {
      var init = $.fn.cycle.transitions[opts.fx];
      if ($.isFunction(init))
        init($cont, $slides, opts);
      else if (opts.fx != 'custom' && !opts.multiFx) {
        log('unknown transition: ' + opts.fx,'; slideshow terminating');
        return false;
      }
    }

    // fire artificial events
    var e0 = $slides[first];
    if (!opts.skipInitializationCallbacks) {
      if (opts.before.length)
        opts.before[0].apply(e0, [e0, e0, opts, true]);
      if (opts.after.length)
        opts.after[0].apply(e0, [e0, e0, opts, true]);
    }
    if (opts.next)
      $(opts.next).bind(opts.prevNextEvent,function(){return advance(opts,1);});
    if (opts.prev)
      $(opts.prev).bind(opts.prevNextEvent,function(){return advance(opts,0);});
    if (opts.pager || opts.pagerAnchorBuilder)
      buildPager(els,opts);

    exposeAddSlide(opts, els);

    return opts;
  }

  // save off original opts so we can restore after clearing state
  function saveOriginalOpts(opts) {
    opts.original = { before: [], after: [] };
    opts.original.cssBefore = $.extend({}, opts.cssBefore);
    opts.original.cssAfter  = $.extend({}, opts.cssAfter);
    opts.original.animIn	= $.extend({}, opts.animIn);
    opts.original.animOut   = $.extend({}, opts.animOut);
    $.each(opts.before, function() { opts.original.before.push(this); });
    $.each(opts.after,  function() { opts.original.after.push(this); });
  }

  function supportMultiTransitions(opts) {
    var i, tx, txs = $.fn.cycle.transitions;
    // look for multiple effects
    if (opts.fx.indexOf(',') > 0) {
      opts.multiFx = true;
      opts.fxs = opts.fx.replace(/\s*/g,'').split(',');
      // discard any bogus effect names
      for (i=0; i < opts.fxs.length; i++) {
        var fx = opts.fxs[i];
        tx = txs[fx];
        if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
          log('discarding unknown transition: ',fx);
          opts.fxs.splice(i,1);
          i--;
        }
      }
      // if we have an empty list then we threw everything away!
      if (!opts.fxs.length) {
        log('No valid transitions named; slideshow terminating.');
        return false;
      }
    }
    else if (opts.fx == 'all') {  // auto-gen the list of transitions
      opts.multiFx = true;
      opts.fxs = [];
      for (var p in txs) {
        if (txs.hasOwnProperty(p)) {
          tx = txs[p];
          if (txs.hasOwnProperty(p) && $.isFunction(tx))
            opts.fxs.push(p);
        }
      }
    }
    if (opts.multiFx && opts.randomizeEffects) {
      // munge the fxs array to make effect selection random
      var r1 = Math.floor(Math.random() * 20) + 30;
      for (i = 0; i < r1; i++) {
        var r2 = Math.floor(Math.random() * opts.fxs.length);
        opts.fxs.push(opts.fxs.splice(r2,1)[0]);
      }
      debug('randomized fx sequence: ',opts.fxs);
    }
    return true;
  }

  // provide a mechanism for adding slides after the slideshow has started
  function exposeAddSlide(opts, els) {
    opts.addSlide = function(newSlide, prepend) {
      var $s = $(newSlide), s = $s[0];
      if (!opts.autostopCount)
        opts.countdown++;
      els[prepend?'unshift':'push'](s);
      if (opts.els)
        opts.els[prepend?'unshift':'push'](s); // shuffle needs this
      opts.slideCount = els.length;

      // add the slide to the random map and resort
      if (opts.random) {
        opts.randomMap.push(opts.slideCount-1);
        opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
      }

      $s.css('position','absolute');
      $s[prepend?'prependTo':'appendTo'](opts.$cont);

      if (prepend) {
        opts.currSlide++;
        opts.nextSlide++;
      }

      if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
        clearTypeFix($s);

      if (opts.fit && opts.width)
        $s.width(opts.width);
      if (opts.fit && opts.height && opts.height != 'auto')
        $s.height(opts.height);
      s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
      s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

      $s.css(opts.cssBefore);

      if (opts.pager || opts.pagerAnchorBuilder)
        $.fn.cycle.createPagerAnchor(els.length-1, s, $(opts.pager), els, opts);

      if ($.isFunction(opts.onAddSlide))
        opts.onAddSlide($s);
      else
        $s.hide(); // default behavior
    };
  }

  // reset internal state; we do this on every pass in order to support multiple effects
  $.fn.cycle.resetState = function(opts, fx) {
    fx = fx || opts.fx;
    opts.before = []; opts.after = [];
    opts.cssBefore = $.extend({}, opts.original.cssBefore);
    opts.cssAfter  = $.extend({}, opts.original.cssAfter);
    opts.animIn	= $.extend({}, opts.original.animIn);
    opts.animOut   = $.extend({}, opts.original.animOut);
    opts.fxFn = null;
    $.each(opts.original.before, function() { opts.before.push(this); });
    $.each(opts.original.after,  function() { opts.after.push(this); });

    // re-init
    var init = $.fn.cycle.transitions[fx];
    if ($.isFunction(init))
      init(opts.$cont, $(opts.elements), opts);
  };

  // this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
  function go(els, opts, manual, fwd) {
    var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

    // opts.busy is true if we're in the middle of an animation
    if (manual && opts.busy && opts.manualTrump) {
      // let manual transitions requests trump active ones
      debug('manualTrump in go(), stopping active transition');
      $(els).stop(true,true);
      opts.busy = 0;
      clearTimeout(p.cycleTimeout);
    }

    // don't begin another timeout-based transition if there is one active
    if (opts.busy) {
      debug('transition active, ignoring new tx request');
      return;
    }


    // stop cycling if we have an outstanding stop request
    if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
      return;

    // check to see if we should stop cycling based on autostop options
    if (!manual && !p.cyclePause && !opts.bounce &&
        ((opts.autostop && (--opts.countdown <= 0)) ||
         (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
      if (opts.end)
        opts.end(opts);
      return;
    }

    // if slideshow is paused, only transition on a manual trigger
    var changed = false;
    if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
      changed = true;
      var fx = opts.fx;
      // keep trying to get the slide size if we don't have it yet
      curr.cycleH = curr.cycleH || $(curr).height();
      curr.cycleW = curr.cycleW || $(curr).width();
      next.cycleH = next.cycleH || $(next).height();
      next.cycleW = next.cycleW || $(next).width();

      // support multiple transition types
      if (opts.multiFx) {
        if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
          opts.lastFx = 0;
        else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
          opts.lastFx = opts.fxs.length - 1;
        fx = opts.fxs[opts.lastFx];
      }

      // one-time fx overrides apply to:  $('div').cycle(3,'zoom');
      if (opts.oneTimeFx) {
        fx = opts.oneTimeFx;
        opts.oneTimeFx = null;
      }

      $.fn.cycle.resetState(opts, fx);

      // run the before callbacks
      if (opts.before.length)
        $.each(opts.before, function(i,o) {
          if (p.cycleStop != opts.stopCount) return;
          o.apply(next, [curr, next, opts, fwd]);
        });

      // stage the after callacks
      var after = function() {
        opts.busy = 0;
        $.each(opts.after, function(i,o) {
          if (p.cycleStop != opts.stopCount) return;
          o.apply(next, [curr, next, opts, fwd]);
        });
        if (!p.cycleStop) {
          // queue next transition
          queueNext();
        }
      };

      debug('tx firing('+fx+'); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);

      // get ready to perform the transition
      opts.busy = 1;
      if (opts.fxFn) // fx function provided?
        opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
      else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
        $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
      else
        $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
    }
    else {
      queueNext();
    }

    if (changed || opts.nextSlide == opts.currSlide) {
      // calculate the next slide
      var roll;
      opts.lastSlide = opts.currSlide;
      if (opts.random) {
        opts.currSlide = opts.nextSlide;
        if (++opts.randomIndex == els.length) {
          opts.randomIndex = 0;
          opts.randomMap.sort(function(a,b) {return Math.random() - 0.5;});
        }
        opts.nextSlide = opts.randomMap[opts.randomIndex];
        if (opts.nextSlide == opts.currSlide)
          opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
      }
      else if (opts.backwards) {
        roll = (opts.nextSlide - 1) < 0;
        if (roll && opts.bounce) {
          opts.backwards = !opts.backwards;
          opts.nextSlide = 1;
          opts.currSlide = 0;
        }
        else {
          opts.nextSlide = roll ? (els.length-1) : opts.nextSlide-1;
          opts.currSlide = roll ? 0 : opts.nextSlide+1;
        }
      }
      else { // sequence
        roll = (opts.nextSlide + 1) == els.length;
        if (roll && opts.bounce) {
          opts.backwards = !opts.backwards;
          opts.nextSlide = els.length-2;
          opts.currSlide = els.length-1;
        }
        else {
          opts.nextSlide = roll ? 0 : opts.nextSlide+1;
          opts.currSlide = roll ? els.length-1 : opts.nextSlide-1;
        }
      }
    }
    if (changed && opts.pager)
      opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);

    function queueNext() {
      // stage the next transition
      var ms = 0, timeout = opts.timeout;
      if (opts.timeout && !opts.continuous) {
        ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
        if (opts.fx == 'shuffle')
          ms -= opts.speedOut;
      }
      else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
        ms = 10;
      if (ms > 0)
        p.cycleTimeout = setTimeout(function(){ go(els, opts, 0, !opts.backwards); }, ms);
    }
  }

  // invoked after transition
  $.fn.cycle.updateActivePagerLink = function(pager, currSlide, clsName) {
    $(pager).each(function() {
      $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
    });
  };

  // calculate timeout value for current transition
  function getTimeout(curr, next, opts, fwd) {
    if (opts.timeoutFn) {
      // call user provided calc fn
      var t = opts.timeoutFn.call(curr,curr,next,opts,fwd);
      while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
        t += opts.speed;
      debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
      if (t !== false)
        return t;
    }
    return opts.timeout;
  }

  // expose next/prev function, caller must pass in state
  $.fn.cycle.next = function(opts) { advance(opts,1); };
  $.fn.cycle.prev = function(opts) { advance(opts,0);};

  // advance slide forward or back
  function advance(opts, moveForward) {
    var val = moveForward ? 1 : -1;
    var els = opts.elements;
    var p = opts.$cont[0], timeout = p.cycleTimeout;
    if (timeout) {
      clearTimeout(timeout);
      p.cycleTimeout = 0;
    }
    if (opts.random && val < 0) {
      // move back to the previously display slide
      opts.randomIndex--;
      if (--opts.randomIndex == -2)
        opts.randomIndex = els.length-2;
      else if (opts.randomIndex == -1)
        opts.randomIndex = els.length-1;
      opts.nextSlide = opts.randomMap[opts.randomIndex];
    }
    else if (opts.random) {
      opts.nextSlide = opts.randomMap[opts.randomIndex];
    }
    else {
      opts.nextSlide = opts.currSlide + val;
      if (opts.nextSlide < 0) {
        if (opts.nowrap) return false;
        opts.nextSlide = els.length - 1;
      }
      else if (opts.nextSlide >= els.length) {
        if (opts.nowrap) return false;
        opts.nextSlide = 0;
      }
    }

    var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
    if ($.isFunction(cb))
      cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
    go(els, opts, 1, moveForward);
    return false;
  }

  function buildPager(els, opts) {
    var $p = $(opts.pager);
    $.each(els, function(i,o) {
      $.fn.cycle.createPagerAnchor(i,o,$p,els,opts);
    });
    opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
  }

  $.fn.cycle.createPagerAnchor = function(i, el, $p, els, opts) {
    var a;
    if ($.isFunction(opts.pagerAnchorBuilder)) {
      a = opts.pagerAnchorBuilder(i,el);
      debug('pagerAnchorBuilder('+i+', el) returned: ' + a);
    }
    else
      a = '<a href="#">'+(i+1)+'</a>';

    if (!a)
      return;
    var $a = $(a);
    // don't reparent if anchor is in the dom
    if ($a.parents('body').length === 0) {
      var arr = [];
      if ($p.length > 1) {
        $p.each(function() {
          var $clone = $a.clone(true);
          $(this).append($clone);
          arr.push($clone[0]);
        });
        $a = $(arr);
      }
      else {
        $a.appendTo($p);
      }
    }

    opts.pagerAnchors =  opts.pagerAnchors || [];
    opts.pagerAnchors.push($a);

    var pagerFn = function(e) {
      e.preventDefault();
      opts.nextSlide = i;
      var p = opts.$cont[0], timeout = p.cycleTimeout;
      if (timeout) {
        clearTimeout(timeout);
        p.cycleTimeout = 0;
      }
      var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
      if ($.isFunction(cb))
        cb(opts.nextSlide, els[opts.nextSlide]);
      go(els,opts,1,opts.currSlide < i); // trigger the trans
      //		return false; // <== allow bubble
    };

    if ( /mouseenter|mouseover/i.test(opts.pagerEvent) ) {
      $a.hover(pagerFn, function(){/* no-op */} );
    }
    else {
      $a.bind(opts.pagerEvent, pagerFn);
    }

    if ( ! /^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
      $a.bind('click.cycle', function(){return false;}); // suppress click

    var cont = opts.$cont[0];
    var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
    if (opts.pauseOnPagerHover) {
      $a.hover(
        function() {
          pauseFlag = true;
          cont.cyclePause++;
          triggerPause(cont,true,true);
        }, function() {
          if (pauseFlag)
            cont.cyclePause--;
          triggerPause(cont,true,true);
        }
      );
    }
  };

  // helper fn to calculate the number of slides between the current and the next
  $.fn.cycle.hopsFromLast = function(opts, fwd) {
    var hops, l = opts.lastSlide, c = opts.currSlide;
    if (fwd)
      hops = c > l ? c - l : opts.slideCount - l;
    else
      hops = c < l ? l - c : l + opts.slideCount - c;
    return hops;
  };

  // fix clearType problems in ie6 by setting an explicit bg color
  // (otherwise text slides look horrible during a fade transition)
  function clearTypeFix($slides) {
    debug('applying clearType background-color hack');
    function hex(s) {
      s = parseInt(s,10).toString(16);
      return s.length < 2 ? '0'+s : s;
    }
    function getBg(e) {
      for ( ; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
        var v = $.css(e,'background-color');
        if (v && v.indexOf('rgb') >= 0 ) {
          var rgb = v.match(/\d+/g);
          return '#'+ hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
        }
        if (v && v != 'transparent')
          return v;
      }
      return '#ffffff';
    }
    $slides.each(function() { $(this).css('background-color', getBg(this)); });
  }

  // reset common props before the next transition
  $.fn.cycle.commonReset = function(curr,next,opts,w,h,rev) {
    $(opts.elements).not(curr).hide();
    if (typeof opts.cssBefore.opacity == 'undefined')
      opts.cssBefore.opacity = 1;
    opts.cssBefore.display = 'block';
    if (opts.slideResize && w !== false && next.cycleW > 0)
      opts.cssBefore.width = next.cycleW;
    if (opts.slideResize && h !== false && next.cycleH > 0)
      opts.cssBefore.height = next.cycleH;
    opts.cssAfter = opts.cssAfter || {};
    opts.cssAfter.display = 'none';
    $(curr).css('zIndex',opts.slideCount + (rev === true ? 1 : 0));
    $(next).css('zIndex',opts.slideCount + (rev === true ? 0 : 1));
  };

  // the actual fn for effecting a transition
  $.fn.cycle.custom = function(curr, next, opts, cb, fwd, speedOverride) {
    var $l = $(curr), $n = $(next);
    var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut, animInDelay = opts.animInDelay, animOutDelay = opts.animOutDelay;
    $n.css(opts.cssBefore);
    if (speedOverride) {
      if (typeof speedOverride == 'number')
        speedIn = speedOut = speedOverride;
      else
        speedIn = speedOut = 1;
      easeIn = easeOut = null;
    }
    var fn = function() {
      $n.delay(animInDelay).animate(opts.animIn, speedIn, easeIn, function() {
        cb();
      });
    };
    $l.delay(animOutDelay).animate(opts.animOut, speedOut, easeOut, function() {
      $l.css(opts.cssAfter);
      if (!opts.sync)
        fn();
    });
    if (opts.sync) fn();
  };

  // transition definitions - only fade is defined here, transition pack defines the rest
  $.fn.cycle.transitions = {
    fade: function($cont, $slides, opts) {
      $slides.not(':eq('+opts.currSlide+')').css('opacity',0);
      opts.before.push(function(curr,next,opts) {
        $.fn.cycle.commonReset(curr,next,opts);
        opts.cssBefore.opacity = 0;
      });
      opts.animIn	   = { opacity: 1 };
      opts.animOut   = { opacity: 0 };
      opts.cssBefore = { top: 0, left: 0 };
    }
  };

  $.fn.cycle.ver = function() { return ver; };

  // override these globally if you like (they are all optional)
  $.fn.cycle.defaults = {
    activePagerClass: 'activeSlide', // class name used for the active pager link
    after:            null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
    allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
    animIn:           null,     // properties that define how the slide animates in
    animInDelay:      0,        // allows delay before next slide transitions in
    animOut:          null,     // properties that define how the slide animates out
    animOutDelay:     0,        // allows delay before current slide transitions out
    aspect:           false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
    autostop:         0,        // true to end slideshow after X transitions (where X == slide count)
    autostopCount:    0,        // number of transitions (optionally used with autostop to define X)
    backwards:        false,    // true to start slideshow at last slide and move backwards through the stack
    before:           null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
    center:           null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
    cleartype:        !$.support.opacity,  // true if clearType corrections should be applied (for IE)
    cleartypeNoBg:    false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
    containerResize:  1,        // resize container to fit largest slide
    containerResizeHeight:  0,  // resize containers height to fit the largest slide but leave the width dynamic
    continuous:       0,        // true to start next transition immediately after current one completes
    cssAfter:         null,     // properties that defined the state of the slide after transitioning out
    cssBefore:        null,     // properties that define the initial state of the slide before transitioning in
    delay:            0,        // additional delay (in ms) for first transition (hint: can be negative)
    easeIn:           null,     // easing for "in" transition
    easeOut:          null,     // easing for "out" transition
    easing:           null,     // easing method for both in and out transitions
    end:              null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
    fastOnEvent:      0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
    fit:              0,        // force slides to fit container
    fx:               'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
    fxFn:             null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
    height:           'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
    manualTrump:      true,     // causes manual transition to stop an active transition instead of being ignored
    metaAttr:         'cycle',  // data- attribute that holds the option data for the slideshow
    next:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
    nowrap:           0,        // true to prevent slideshow from wrapping
    onPagerEvent:     null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
    onPrevNextEvent:  null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
    pager:            null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
    pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
    pagerEvent:       'click.cycle', // name of event which drives the pager navigation
    pause:            0,        // true to enable "pause on hover"
    pauseOnPagerHover: 0,       // true to pause when hovering over pager link
    prev:             null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
    prevNextEvent:    'click.cycle',// event which drives the manual transition to the previous or next slide
    random:           0,        // true for random, false for sequence (not applicable to shuffle fx)
    randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
    requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
    requeueTimeout:   250,      // ms delay for requeue
    rev:              0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
    shuffle:          null,     // coords for shuffle animation, ex: { top:15, left: 200 }
    skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
    slideExpr:        null,     // expression for selecting slides (if something other than all children is required)
    slideResize:      1,        // force slide width/height to fixed size before every transition
    speed:            1000,     // speed of the transition (any valid fx speed value)
    speedIn:          null,     // speed of the 'in' transition
    speedOut:         null,     // speed of the 'out' transition
    startingSlide:    undefined,// zero-based index of the first slide to be displayed
    sync:             1,        // true if in/out transitions should occur simultaneously
    timeout:          4000,     // milliseconds between slide transitions (0 to disable auto advance)
    timeoutFn:        null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
    updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
    width:            null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
  };

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($) {
  "use strict";

  //
  // These functions define slide initialization and properties for the named
  // transitions. To save file size feel free to remove any of these that you
  // don't need.
  //
  $.fn.cycle.transitions.none = function($cont, $slides, opts) {
    opts.fxFn = function(curr,next,opts,after){
      $(next).show();
      $(curr).hide();
      after();
    };
  };

  // not a cross-fade, fadeout only fades out the top slide
  $.fn.cycle.transitions.fadeout = function($cont, $slides, opts) {
    $slides.not(':eq('+opts.currSlide+')').css({ display: 'block', 'opacity': 1 });
    opts.before.push(function(curr,next,opts,w,h,rev) {
      $(curr).css('zIndex',opts.slideCount + (rev !== true ? 1 : 0));
      $(next).css('zIndex',opts.slideCount + (rev !== true ? 0 : 1));
    });
    opts.animIn.opacity = 1;
    opts.animOut.opacity = 0;
    opts.cssBefore.opacity = 1;
    opts.cssBefore.display = 'block';
    opts.cssAfter.zIndex = 0;
  };

  // scrollUp/Down/Left/Right
  $.fn.cycle.transitions.scrollUp = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push($.fn.cycle.commonReset);
    var h = $cont.height();
    opts.cssBefore.top = h;
    opts.cssBefore.left = 0;
    opts.cssFirst.top = 0;
    opts.animIn.top = 0;
    opts.animOut.top = -h;
  };
  $.fn.cycle.transitions.scrollDown = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push($.fn.cycle.commonReset);
    var h = $cont.height();
    opts.cssFirst.top = 0;
    opts.cssBefore.top = -h;
    opts.cssBefore.left = 0;
    opts.animIn.top = 0;
    opts.animOut.top = h;
  };
  $.fn.cycle.transitions.scrollLeft = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push($.fn.cycle.commonReset);
    var w = $cont.width();
    opts.cssFirst.left = 0;
    opts.cssBefore.left = w;
    opts.cssBefore.top = 0;
    opts.animIn.left = 0;
    opts.animOut.left = 0-w;
  };
  $.fn.cycle.transitions.scrollRight = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push($.fn.cycle.commonReset);
    var w = $cont.width();
    opts.cssFirst.left = 0;
    opts.cssBefore.left = -w;
    opts.cssBefore.top = 0;
    opts.animIn.left = 0;
    opts.animOut.left = w;
  };
  $.fn.cycle.transitions.scrollHorz = function($cont, $slides, opts) {
    $cont.css('overflow','hidden').width();
    opts.before.push(function(curr, next, opts, fwd) {
      if (opts.rev)
        fwd = !fwd;
      $.fn.cycle.commonReset(curr,next,opts);
      opts.cssBefore.left = fwd ? (next.cycleW-1) : (1-next.cycleW);
      opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
    });
    opts.cssFirst.left = 0;
    opts.cssBefore.top = 0;
    opts.animIn.left = 0;
    opts.animOut.top = 0;
  };
  $.fn.cycle.transitions.scrollVert = function($cont, $slides, opts) {
    $cont.css('overflow','hidden');
    opts.before.push(function(curr, next, opts, fwd) {
      if (opts.rev)
        fwd = !fwd;
      $.fn.cycle.commonReset(curr,next,opts);
      opts.cssBefore.top = fwd ? (1-next.cycleH) : (next.cycleH-1);
      opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
    });
    opts.cssFirst.top = 0;
    opts.cssBefore.left = 0;
    opts.animIn.top = 0;
    opts.animOut.left = 0;
  };

  // slideX/slideY
  $.fn.cycle.transitions.slideX = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $(opts.elements).not(curr).hide();
      $.fn.cycle.commonReset(curr,next,opts,false,true);
      opts.animIn.width = next.cycleW;
    });
    opts.cssBefore.left = 0;
    opts.cssBefore.top = 0;
    opts.cssBefore.width = 0;
    opts.animIn.width = 'show';
    opts.animOut.width = 0;
  };
  $.fn.cycle.transitions.slideY = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $(opts.elements).not(curr).hide();
      $.fn.cycle.commonReset(curr,next,opts,true,false);
      opts.animIn.height = next.cycleH;
    });
    opts.cssBefore.left = 0;
    opts.cssBefore.top = 0;
    opts.cssBefore.height = 0;
    opts.animIn.height = 'show';
    opts.animOut.height = 0;
  };

  // shuffle
  $.fn.cycle.transitions.shuffle = function($cont, $slides, opts) {
    var i, w = $cont.css('overflow', 'visible').width();
    $slides.css({left: 0, top: 0});
    opts.before.push(function(curr,next,opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,true,true);
    });
    // only adjust speed once!
    if (!opts.speedAdjusted) {
      opts.speed = opts.speed / 2; // shuffle has 2 transitions
      opts.speedAdjusted = true;
    }
    opts.random = 0;
    opts.shuffle = opts.shuffle || {left:-w, top:15};
    opts.els = [];
    for (i=0; i < $slides.length; i++)
      opts.els.push($slides[i]);

    for (i=0; i < opts.currSlide; i++)
      opts.els.push(opts.els.shift());

    // custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
    opts.fxFn = function(curr, next, opts, cb, fwd) {
      if (opts.rev)
        fwd = !fwd;
      var $el = fwd ? $(curr) : $(next);
      $(next).css(opts.cssBefore);
      var count = opts.slideCount;
      $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function() {
        var hops = $.fn.cycle.hopsFromLast(opts, fwd);
        for (var k=0; k < hops; k++) {
          if (fwd)
            opts.els.push(opts.els.shift());
          else
            opts.els.unshift(opts.els.pop());
        }
        if (fwd) {
          for (var i=0, len=opts.els.length; i < len; i++)
            $(opts.els[i]).css('z-index', len-i+count);
        }
        else {
          var z = $(curr).css('z-index');
          $el.css('z-index', parseInt(z,10)+1+count);
        }
        $el.animate({left:0, top:0}, opts.speedOut, opts.easeOut, function() {
          $(fwd ? this : curr).hide();
          if (cb) cb();
        });
      });
    };
    $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
  };

  // turnUp/Down/Left/Right
  $.fn.cycle.transitions.turnUp = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,false);
      opts.cssBefore.top = next.cycleH;
      opts.animIn.height = next.cycleH;
      opts.animOut.width = next.cycleW;
    });
    opts.cssFirst.top = 0;
    opts.cssBefore.left = 0;
    opts.cssBefore.height = 0;
    opts.animIn.top = 0;
    opts.animOut.height = 0;
  };
  $.fn.cycle.transitions.turnDown = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,false);
      opts.animIn.height = next.cycleH;
      opts.animOut.top   = curr.cycleH;
    });
    opts.cssFirst.top = 0;
    opts.cssBefore.left = 0;
    opts.cssBefore.top = 0;
    opts.cssBefore.height = 0;
    opts.animOut.height = 0;
  };
  $.fn.cycle.transitions.turnLeft = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,false,true);
      opts.cssBefore.left = next.cycleW;
      opts.animIn.width = next.cycleW;
    });
    opts.cssBefore.top = 0;
    opts.cssBefore.width = 0;
    opts.animIn.left = 0;
    opts.animOut.width = 0;
  };
  $.fn.cycle.transitions.turnRight = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,false,true);
      opts.animIn.width = next.cycleW;
      opts.animOut.left = curr.cycleW;
    });
    $.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
    opts.animIn.left = 0;
    opts.animOut.width = 0;
  };

  // zoom
  $.fn.cycle.transitions.zoom = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,false,false,true);
      opts.cssBefore.top = next.cycleH/2;
      opts.cssBefore.left = next.cycleW/2;
      $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
      $.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH/2, left: curr.cycleW/2 });
    });
    opts.cssFirst.top = 0;
    opts.cssFirst.left = 0;
    opts.cssBefore.width = 0;
    opts.cssBefore.height = 0;
  };

  // fadeZoom
  $.fn.cycle.transitions.fadeZoom = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,false,false);
      opts.cssBefore.left = next.cycleW/2;
      opts.cssBefore.top = next.cycleH/2;
      $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
    });
    opts.cssBefore.width = 0;
    opts.cssBefore.height = 0;
    opts.animOut.opacity = 0;
  };

  // blindX
  $.fn.cycle.transitions.blindX = function($cont, $slides, opts) {
    var w = $cont.css('overflow','hidden').width();
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts);
      opts.animIn.width = next.cycleW;
      opts.animOut.left   = curr.cycleW;
    });
    opts.cssBefore.left = w;
    opts.cssBefore.top = 0;
    opts.animIn.left = 0;
    opts.animOut.left = w;
  };
  // blindY
  $.fn.cycle.transitions.blindY = function($cont, $slides, opts) {
    var h = $cont.css('overflow','hidden').height();
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts);
      opts.animIn.height = next.cycleH;
      opts.animOut.top   = curr.cycleH;
    });
    opts.cssBefore.top = h;
    opts.cssBefore.left = 0;
    opts.animIn.top = 0;
    opts.animOut.top = h;
  };
  // blindZ
  $.fn.cycle.transitions.blindZ = function($cont, $slides, opts) {
    var h = $cont.css('overflow','hidden').height();
    var w = $cont.width();
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts);
      opts.animIn.height = next.cycleH;
      opts.animOut.top   = curr.cycleH;
    });
    opts.cssBefore.top = h;
    opts.cssBefore.left = w;
    opts.animIn.top = 0;
    opts.animIn.left = 0;
    opts.animOut.top = h;
    opts.animOut.left = w;
  };

  // growX - grow horizontally from centered 0 width
  $.fn.cycle.transitions.growX = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,false,true);
      opts.cssBefore.left = this.cycleW/2;
      opts.animIn.left = 0;
      opts.animIn.width = this.cycleW;
      opts.animOut.left = 0;
    });
    opts.cssBefore.top = 0;
    opts.cssBefore.width = 0;
  };
  // growY - grow vertically from centered 0 height
  $.fn.cycle.transitions.growY = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,false);
      opts.cssBefore.top = this.cycleH/2;
      opts.animIn.top = 0;
      opts.animIn.height = this.cycleH;
      opts.animOut.top = 0;
    });
    opts.cssBefore.height = 0;
    opts.cssBefore.left = 0;
  };

  // curtainX - squeeze in both edges horizontally
  $.fn.cycle.transitions.curtainX = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,false,true,true);
      opts.cssBefore.left = next.cycleW/2;
      opts.animIn.left = 0;
      opts.animIn.width = this.cycleW;
      opts.animOut.left = curr.cycleW/2;
      opts.animOut.width = 0;
    });
    opts.cssBefore.top = 0;
    opts.cssBefore.width = 0;
  };
  // curtainY - squeeze in both edges vertically
  $.fn.cycle.transitions.curtainY = function($cont, $slides, opts) {
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,false,true);
      opts.cssBefore.top = next.cycleH/2;
      opts.animIn.top = 0;
      opts.animIn.height = next.cycleH;
      opts.animOut.top = curr.cycleH/2;
      opts.animOut.height = 0;
    });
    opts.cssBefore.height = 0;
    opts.cssBefore.left = 0;
  };

  // cover - curr slide covered by next slide
  $.fn.cycle.transitions.cover = function($cont, $slides, opts) {
    var d = opts.direction || 'left';
    var w = $cont.css('overflow','hidden').width();
    var h = $cont.height();
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts);
      opts.cssAfter.display = '';
      if (d == 'right')
        opts.cssBefore.left = -w;
      else if (d == 'up')
        opts.cssBefore.top = h;
      else if (d == 'down')
        opts.cssBefore.top = -h;
      else
        opts.cssBefore.left = w;
    });
    opts.animIn.left = 0;
    opts.animIn.top = 0;
    opts.cssBefore.top = 0;
    opts.cssBefore.left = 0;
  };

  // uncover - curr slide moves off next slide
  $.fn.cycle.transitions.uncover = function($cont, $slides, opts) {
    var d = opts.direction || 'left';
    var w = $cont.css('overflow','hidden').width();
    var h = $cont.height();
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,true,true);
      if (d == 'right')
        opts.animOut.left = w;
      else if (d == 'up')
        opts.animOut.top = -h;
      else if (d == 'down')
        opts.animOut.top = h;
      else
        opts.animOut.left = -w;
    });
    opts.animIn.left = 0;
    opts.animIn.top = 0;
    opts.cssBefore.top = 0;
    opts.cssBefore.left = 0;
  };

  // toss - move top slide and fade away
  $.fn.cycle.transitions.toss = function($cont, $slides, opts) {
    var w = $cont.css('overflow','visible').width();
    var h = $cont.height();
    opts.before.push(function(curr, next, opts) {
      $.fn.cycle.commonReset(curr,next,opts,true,true,true);
      // provide default toss settings if animOut not provided
      if (!opts.animOut.left && !opts.animOut.top)
        $.extend(opts.animOut, { left: w*2, top: -h/2, opacity: 0 });
      else
        opts.animOut.opacity = 0;
    });
    opts.cssBefore.left = 0;
    opts.cssBefore.top = 0;
    opts.animIn.left = 0;
  };

  // wipe - clip animation
  $.fn.cycle.transitions.wipe = function($cont, $slides, opts) {
    var w = $cont.css('overflow','hidden').width();
    var h = $cont.height();
    opts.cssBefore = opts.cssBefore || {};
    var clip;
    if (opts.clip) {
      if (/l2r/.test(opts.clip))
        clip = 'rect(0px 0px '+h+'px 0px)';
      else if (/r2l/.test(opts.clip))
        clip = 'rect(0px '+w+'px '+h+'px '+w+'px)';
      else if (/t2b/.test(opts.clip))
        clip = 'rect(0px '+w+'px 0px 0px)';
      else if (/b2t/.test(opts.clip))
        clip = 'rect('+h+'px '+w+'px '+h+'px 0px)';
      else if (/zoom/.test(opts.clip)) {
        var top = parseInt(h/2,10);
        var left = parseInt(w/2,10);
        clip = 'rect('+top+'px '+left+'px '+top+'px '+left+'px)';
      }
    }

    opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

    var d = opts.cssBefore.clip.match(/(\d+)/g);
    var t = parseInt(d[0],10), r = parseInt(d[1],10), b = parseInt(d[2],10), l = parseInt(d[3],10);

    opts.before.push(function(curr, next, opts) {
      if (curr == next) return;
      var $curr = $(curr), $next = $(next);
      $.fn.cycle.commonReset(curr,next,opts,true,true,false);
      opts.cssAfter.display = 'block';

      var step = 1, count = parseInt((opts.speedIn / 13),10) - 1;
      (function f() {
        var tt = t ? t - parseInt(step * (t/count),10) : 0;
        var ll = l ? l - parseInt(step * (l/count),10) : 0;
        var bb = b < h ? b + parseInt(step * ((h-b)/count || 1),10) : h;
        var rr = r < w ? r + parseInt(step * ((w-r)/count || 1),10) : w;
        $next.css({ clip: 'rect('+tt+'px '+rr+'px '+bb+'px '+ll+'px)' });
        (step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
      })();
    });
    $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
    opts.animIn	   = { left: 0 };
    opts.animOut   = { left: 0 };
  };

})(jQuery);
;/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
              {
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
    //alert(jQuery.easing.default);
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (a < Math.abs(c)) { a=c; var s=p/4; }
    else var s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158; 
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
    return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;// Foggy, v1.1.1
//
// Description: jQuery plugin for blurring page elements
// Homepage:    http://nbartlomiej.github.com/foggy
// Author:      nbartlomiej@gmail.com

(function(e){e.fn.foggy=function(t){var n={opacity:.8,blurRadius:2,quality:16,cssFilterSupport:true};var r={opacity:1,blurRadius:0};var i;if(t==false){i=e.extend(n,r)}else{i=e.extend(n,t)}var s=function(e,t,n,r){this.content=e;this.position=t;this.offset=n;this.opacity=r};s.prototype.render=function(t){e("<div/>",{html:this.content,"class":"foggy-pass-"+this.position}).css({position:this.position,opacity:this.opacity,top:this.offset[0],left:this.offset[1]}).appendTo(t)};var o=function(e){this.radius=e};o.prototype.includes=function(e,t){if(Math.pow(e,2)+Math.pow(t,2)<=Math.pow(this.radius,2)){return true}else{return false}};o.prototype.points=function(){var e=[];for(var t=-this.radius;t<=this.radius;t++){for(var n=-this.radius;n<=this.radius;n++){if(this.includes(t,n)){e.push([t,n])}}}return e};var u=function(e,t){this.element=e;this.settings=t};u.prototype.calculateOffsets=function(t,n){var r=e.grep((new o(t)).points(),function(e){return e[0]!=0||e[1]!=0});var i;if(r.length<=n){i=r}else{var s=r.length-n;var u=[];for(var a=0;a<s;a++){u.push(Math.round(a*(r.length/s)))}i=e.grep(r,function(t,n){if(e.inArray(n,u)>=0){return false}else{return true}})}return i};u.prototype.getContent=function(){var t=e(this.element).find(".foggy-pass-relative")[0];if(t){return e(t).html()}else{return e(this.element).html()}};u.prototype.render=function(){var t=this.getContent();e(this.element).empty();var n=e("<div/>").css({position:"relative"});var r=this.calculateOffsets(this.settings.blurRadius*2,this.settings.quality);var i=this.settings.opacity*1.2/(r.length+1);(new s(t,"relative",[0,0],i)).render(n);e(r).each(function(e,r){(new s(t,"absolute",r,i)).render(n)});n.appendTo(this.element)};var a=function(e,t){this.element=e;this.settings=t};a.prototype.render=function(){var t=(""+i.opacity).slice(2,4);var n=this.settings.blurRadius;e(this.element).css({"-webkit-filter":"blur("+n+"px)",opacity:i.opacity})};return this.each(function(e,t){if(i.cssFilterSupport&&"-webkit-filter"in document.body.style){(new a(t,i)).render()}else{(new u(t,i)).render()}})}})(jQuery)
;/*!
 * jQuery Form Plugin
 * version: 3.50.0-2014.02.05
 * Requires jQuery v1.5 or later
 * Copyright (c) 2013 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
/*global ActiveXObject */

// AMD support
(function (factory) {
  "use strict";
  if (typeof define === 'function' && define.amd) {
    // using AMD; register as anon module
    define(['jquery'], factory);
  } else {
    // no AMD; invoke directly
    factory( (typeof(jQuery) != 'undefined') ? jQuery : window.Zepto );
  }
}

 (function($) {
  "use strict";

  /*
    Usage Note:
    -----------
    Do not use both ajaxSubmit and ajaxForm on the same form.  These
    functions are mutually exclusive.  Use ajaxSubmit if you want
    to bind your own submit handler to the form.  For example,

    $(document).ready(function() {
        $('#myForm').on('submit', function(e) {
            e.preventDefault(); // <-- important
            $(this).ajaxSubmit({
                target: '#output'
            });
        });
    });

    Use ajaxForm when you want the plugin to manage all the event binding
    for you.  For example,

    $(document).ready(function() {
        $('#myForm').ajaxForm({
            target: '#output'
        });
    });

    You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
    form does not have to exist when you invoke ajaxForm:

    $('#myForm').ajaxForm({
        delegation: true,
        target: '#output'
    });

    When using ajaxForm, the ajaxSubmit function will be invoked for you
    at the appropriate time.
*/

  /**
 * Feature detection
 */
  var feature = {};
  feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
  feature.formdata = window.FormData !== undefined;

  var hasProp = !!$.fn.prop;

  // attr2 uses prop when it can but checks the return type for
  // an expected string.  this accounts for the case where a form 
  // contains inputs with names like "action" or "method"; in those
  // cases "prop" returns the element
  $.fn.attr2 = function() {
    if ( ! hasProp ) {
      return this.attr.apply(this, arguments);
    }
    var val = this.prop.apply(this, arguments);
    if ( ( val && val.jquery ) || typeof val === 'string' ) {
      return val;
    }
    return this.attr.apply(this, arguments);
  };

  /**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
  $.fn.ajaxSubmit = function(options) {
    /*jshint scripturl:true */

    // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
    if (!this.length) {
      log('ajaxSubmit: skipping submit process - no element selected');
      return this;
    }

    var method, action, url, $form = this;

    if (typeof options == 'function') {
      options = { success: options };
    }
    else if ( options === undefined ) {
      options = {};
    }

    method = options.type || this.attr2('method');
    action = options.url  || this.attr2('action');

    url = (typeof action === 'string') ? $.trim(action) : '';
    url = url || window.location.href || '';
    if (url) {
      // clean url (don't include hash vaue)
      url = (url.match(/^([^#]+)/)||[])[1];
    }

    options = $.extend(true, {
      url:  url,
      success: $.ajaxSettings.success,
      type: method || $.ajaxSettings.type,
      iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, options);

    // hook for manipulating the form data before it is extracted;
    // convenient for use with rich editors like tinyMCE or FCKEditor
    var veto = {};
    this.trigger('form-pre-serialize', [this, options, veto]);
    if (veto.veto) {
      log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
      return this;
    }

    // provide opportunity to alter form data before it is serialized
    if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
      log('ajaxSubmit: submit aborted via beforeSerialize callback');
      return this;
    }

    var traditional = options.traditional;
    if ( traditional === undefined ) {
      traditional = $.ajaxSettings.traditional;
    }

    var elements = [];
    var qx, a = this.formToArray(options.semantic, elements);
    if (options.data) {
      options.extraData = options.data;
      qx = $.param(options.data, traditional);
    }

    // give pre-submit callback an opportunity to abort the submit
    if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
      log('ajaxSubmit: submit aborted via beforeSubmit callback');
      return this;
    }

    // fire vetoable 'validate' event
    this.trigger('form-submit-validate', [a, this, options, veto]);
    if (veto.veto) {
      log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
      return this;
    }

    var q = $.param(a, traditional);
    if (qx) {
      q = ( q ? (q + '&' + qx) : qx );
    }
    if (options.type.toUpperCase() == 'GET') {
      options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
      options.data = null;  // data is null for 'get'
    }
    else {
      options.data = q; // data is the query string for 'post'
    }

    var callbacks = [];
    if (options.resetForm) {
      callbacks.push(function() { $form.resetForm(); });
    }
    if (options.clearForm) {
      callbacks.push(function() { $form.clearForm(options.includeHidden); });
    }

    // perform a load on the target only if dataType is not provided
    if (!options.dataType && options.target) {
      var oldSuccess = options.success || function(){};
      callbacks.push(function(data) {
        var fn = options.replaceTarget ? 'replaceWith' : 'html';
        $(options.target)[fn](data).each(oldSuccess, arguments);
      });
    }
    else if (options.success) {
      callbacks.push(options.success);
    }

    options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
      var context = options.context || this ;    // jQuery 1.4+ supports scope context
      for (var i=0, max=callbacks.length; i < max; i++) {
        callbacks[i].apply(context, [data, status, xhr || $form, $form]);
      }
    };

    if (options.error) {
      var oldError = options.error;
      options.error = function(xhr, status, error) {
        var context = options.context || this;
        oldError.apply(context, [xhr, status, error, $form]);
      };
    }

    if (options.complete) {
      var oldComplete = options.complete;
      options.complete = function(xhr, status) {
        var context = options.context || this;
        oldComplete.apply(context, [xhr, status, $form]);
      };
    }

    // are there files to upload?

    // [value] (issue #113), also see comment:
    // https://github.com/malsup/form/commit/588306aedba1de01388032d5f42a60159eea9228#commitcomment-2180219
    var fileInputs = $('input[type=file]:enabled', this).filter(function() { return $(this).val() !== ''; });

    var hasFileInputs = fileInputs.length > 0;
    var mp = 'multipart/form-data';
    var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

    var fileAPI = feature.fileapi && feature.formdata;
    log("fileAPI :" + fileAPI);
    var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

    var jqxhr;

    // options.iframe allows user to force iframe mode
    // 06-NOV-09: now defaulting to iframe mode if file input is detected
    if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
      // hack to fix Safari hang (thanks to Tim Molendijk for this)
      // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
      if (options.closeKeepAlive) {
        $.get(options.closeKeepAlive, function() {
          jqxhr = fileUploadIframe(a);
        });
      }
      else {
        jqxhr = fileUploadIframe(a);
      }
    }
    else if ((hasFileInputs || multipart) && fileAPI) {
      jqxhr = fileUploadXhr(a);
    }
    else {
      jqxhr = $.ajax(options);
    }

    $form.removeData('jqxhr').data('jqxhr', jqxhr);

    // clear element array
    for (var k=0; k < elements.length; k++) {
      elements[k] = null;
    }

    // fire 'notify' event
    this.trigger('form-submit-notify', [this, options]);
    return this;

    // utility fn for deep serialization
    function deepSerialize(extraData){
      var serialized = $.param(extraData, options.traditional).split('&');
      var len = serialized.length;
      var result = [];
      var i, part;
      for (i=0; i < len; i++) {
        // #252; undo param space replacement
        serialized[i] = serialized[i].replace(/\+/g,' ');
        part = serialized[i].split('=');
        // #278; use array instead of object storage, favoring array serializations
        result.push([decodeURIComponent(part[0]), decodeURIComponent(part[1])]);
      }
      return result;
    }

    // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
    function fileUploadXhr(a) {
      var formdata = new FormData();

      for (var i=0; i < a.length; i++) {
        formdata.append(a[i].name, a[i].value);
      }

      if (options.extraData) {
        var serializedData = deepSerialize(options.extraData);
        for (i=0; i < serializedData.length; i++) {
          if (serializedData[i]) {
            formdata.append(serializedData[i][0], serializedData[i][1]);
          }
        }
      }

      options.data = null;

      var s = $.extend(true, {}, $.ajaxSettings, options, {
        contentType: false,
        processData: false,
        cache: false,
        type: method || 'POST'
      });

      if (options.uploadProgress) {
        // workaround because jqXHR does not expose upload property
        s.xhr = function() {
          var xhr = $.ajaxSettings.xhr();
          if (xhr.upload) {
            xhr.upload.addEventListener('progress', function(event) {
              var percent = 0;
              var position = event.loaded || event.position; /*event.position is deprecated*/
              var total = event.total;
              if (event.lengthComputable) {
                percent = Math.ceil(position / total * 100);
              }
              options.uploadProgress(event, position, total, percent);
            }, false);
          }
          return xhr;
        };
      }

      s.data = null;
      var beforeSend = s.beforeSend;
      s.beforeSend = function(xhr, o) {
        //Send FormData() provided by user
        if (options.formData) {
          o.data = options.formData;
        }
        else {
          o.data = formdata;
        }
        if(beforeSend) {
          beforeSend.call(this, xhr, o);
        }
      };
      return $.ajax(s);
    }

    // private function for handling file uploads (hat tip to YAHOO!)
    function fileUploadIframe(a) {
      var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
      var deferred = $.Deferred();

      // #341
      deferred.abort = function(status) {
        xhr.abort(status);
      };

      if (a) {
        // ensure that every serialized input is still enabled
        for (i=0; i < elements.length; i++) {
          el = $(elements[i]);
          if ( hasProp ) {
            el.prop('disabled', false);
          }
          else {
            el.removeAttr('disabled');
          }
        }
      }

      s = $.extend(true, {}, $.ajaxSettings, options);
      s.context = s.context || s;
      id = 'jqFormIO' + (new Date().getTime());
      if (s.iframeTarget) {
        $io = $(s.iframeTarget);
        n = $io.attr2('name');
        if (!n) {
          $io.attr2('name', id);
        }
        else {
          id = n;
        }
      }
      else {
        $io = $('<iframe name="' + id + '" src="'+ s.iframeSrc +'" />');
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
      }
      io = $io[0];


      xhr = { // mock object
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: 'n/a',
        getAllResponseHeaders: function() {},
        getResponseHeader: function() {},
        setRequestHeader: function() {},
        abort: function(status) {
          var e = (status === 'timeout' ? 'timeout' : 'aborted');
          log('aborting upload... ' + e);
          this.aborted = 1;

          try { // #214, #257
            if (io.contentWindow.document.execCommand) {
              io.contentWindow.document.execCommand('Stop');
            }
          }
          catch(ignore) {}

          $io.attr('src', s.iframeSrc); // abort op in progress
          xhr.error = e;
          if (s.error) {
            s.error.call(s.context, xhr, e, status);
          }
          if (g) {
            $.event.trigger("ajaxError", [xhr, s, e]);
          }
          if (s.complete) {
            s.complete.call(s.context, xhr, e);
          }
        }
      };

      g = s.global;
      // trigger ajax global events so that activity/block indicators work like normal
      if (g && 0 === $.active++) {
        $.event.trigger("ajaxStart");
      }
      if (g) {
        $.event.trigger("ajaxSend", [xhr, s]);
      }

      if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
        if (s.global) {
          $.active--;
        }
        deferred.reject();
        return deferred;
      }
      if (xhr.aborted) {
        deferred.reject();
        return deferred;
      }

      // add submitting element to data if we know it
      sub = form.clk;
      if (sub) {
        n = sub.name;
        if (n && !sub.disabled) {
          s.extraData = s.extraData || {};
          s.extraData[n] = sub.value;
          if (sub.type == "image") {
            s.extraData[n+'.x'] = form.clk_x;
            s.extraData[n+'.y'] = form.clk_y;
          }
        }
      }

      var CLIENT_TIMEOUT_ABORT = 1;
      var SERVER_ABORT = 2;

      function getDoc(frame) {
        /* it looks like contentWindow or contentDocument do not
             * carry the protocol property in ie8, when running under ssl
             * frame.document is the only valid response document, since
             * the protocol is know but not on the other two objects. strange?
             * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
             */

        var doc = null;

        // IE8 cascading access check
        try {
          if (frame.contentWindow) {
            doc = frame.contentWindow.document;
          }
        } catch(err) {
          // IE8 access denied under ssl & missing protocol
          log('cannot get iframe.contentWindow document: ' + err);
        }

        if (doc) { // successful getting content
          return doc;
        }

        try { // simply checking may throw in ie8 under ssl or mismatched protocol
          doc = frame.contentDocument ? frame.contentDocument : frame.document;
        } catch(err) {
          // last attempt
          log('cannot get iframe.contentDocument: ' + err);
          doc = frame.document;
        }
        return doc;
      }

      // Rails CSRF hack (thanks to Yvan Barthelemy)
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');
      if (csrf_param && csrf_token) {
        s.extraData = s.extraData || {};
        s.extraData[csrf_param] = csrf_token;
      }

      // take a breath so that pending repaints get some cpu time before the upload starts
      function doSubmit() {
        // make sure form attrs are set
        var t = $form.attr2('target'), 
            a = $form.attr2('action'), 
            mp = 'multipart/form-data',
            et = $form.attr('enctype') || $form.attr('encoding') || mp;

        // update form attrs in IE friendly way
        form.setAttribute('target',id);
        if (!method || /post/i.test(method) ) {
          form.setAttribute('method', 'POST');
        }
        if (a != s.url) {
          form.setAttribute('action', s.url);
        }

        // ie borks in some cases when setting encoding
        if (! s.skipEncodingOverride && (!method || /post/i.test(method))) {
          $form.attr({
            encoding: 'multipart/form-data',
            enctype:  'multipart/form-data'
          });
        }

        // support timout
        if (s.timeout) {
          timeoutHandle = setTimeout(function() { timedOut = true; cb(CLIENT_TIMEOUT_ABORT); }, s.timeout);
        }

        // look for server aborts
        function checkState() {
          try {
            var state = getDoc(io).readyState;
            log('state = ' + state);
            if (state && state.toLowerCase() == 'uninitialized') {
              setTimeout(checkState,50);
            }
          }
          catch(e) {
            log('Server abort: ' , e, ' (', e.name, ')');
            cb(SERVER_ABORT);
            if (timeoutHandle) {
              clearTimeout(timeoutHandle);
            }
            timeoutHandle = undefined;
          }
        }

        // add "extra" data to form if provided in options
        var extraInputs = [];
        try {
          if (s.extraData) {
            for (var n in s.extraData) {
              if (s.extraData.hasOwnProperty(n)) {
                // if using the $.param format that allows for multiple values with the same name
                if($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                  extraInputs.push(
                    $('<input type="hidden" name="'+s.extraData[n].name+'">').val(s.extraData[n].value)
                    .appendTo(form)[0]);
                } else {
                  extraInputs.push(
                    $('<input type="hidden" name="'+n+'">').val(s.extraData[n])
                    .appendTo(form)[0]);
                }
              }
            }
          }

          if (!s.iframeTarget) {
            // add iframe to doc and submit the form
            $io.appendTo('body');
          }
          if (io.attachEvent) {
            io.attachEvent('onload', cb);
          }
          else {
            io.addEventListener('load', cb, false);
          }
          setTimeout(checkState,15);

          try {
            form.submit();
          } catch(err) {
            // just in case form has element with name/id of 'submit'
            var submitFn = document.createElement('form').submit;
            submitFn.apply(form);
          }
        }
        finally {
          // reset attrs and remove "extra" input elements
          form.setAttribute('action',a);
          form.setAttribute('enctype', et); // #380
          if(t) {
            form.setAttribute('target', t);
          } else {
            $form.removeAttr('target');
          }
          $(extraInputs).remove();
        }
      }

      if (s.forceSync) {
        doSubmit();
      }
      else {
        setTimeout(doSubmit, 10); // this lets dom updates render
      }

      var data, doc, domCheckCount = 50, callbackProcessed;

      function cb(e) {
        if (xhr.aborted || callbackProcessed) {
          return;
        }

        doc = getDoc(io);
        if(!doc) {
          log('cannot access response document');
          e = SERVER_ABORT;
        }
        if (e === CLIENT_TIMEOUT_ABORT && xhr) {
          xhr.abort('timeout');
          deferred.reject(xhr, 'timeout');
          return;
        }
        else if (e == SERVER_ABORT && xhr) {
          xhr.abort('server abort');
          deferred.reject(xhr, 'error', 'server abort');
          return;
        }

        if (!doc || doc.location.href == s.iframeSrc) {
          // response not received yet
          if (!timedOut) {
            return;
          }
        }
        if (io.detachEvent) {
          io.detachEvent('onload', cb);
        }
        else {
          io.removeEventListener('load', cb, false);
        }

        var status = 'success', errMsg;
        try {
          if (timedOut) {
            throw 'timeout';
          }

          var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
          log('isXml='+isXml);
          if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
            if (--domCheckCount) {
              // in some browsers (Opera) the iframe DOM is not always traversable when
              // the onload callback fires, so we loop a bit to accommodate
              log('requeing onLoad callback, DOM not available');
              setTimeout(cb, 250);
              return;
            }
            // let this fall through because server response could be an empty document
            //log('Could not access iframe DOM after mutiple tries.');
            //throw 'DOMException: not available';
          }

          //log('response detected');
          var docRoot = doc.body ? doc.body : doc.documentElement;
          xhr.responseText = docRoot ? docRoot.innerHTML : null;
          xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
          if (isXml) {
            s.dataType = 'xml';
          }
          xhr.getResponseHeader = function(header){
            var headers = {'content-type': s.dataType};
            return headers[header.toLowerCase()];
          };
          // support for XHR 'status' & 'statusText' emulation :
          if (docRoot) {
            xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
            xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
          }

          var dt = (s.dataType || '').toLowerCase();
          var scr = /(json|script|text)/.test(dt);
          if (scr || s.textarea) {
            // see if user embedded response in textarea
            var ta = doc.getElementsByTagName('textarea')[0];
            if (ta) {
              xhr.responseText = ta.value;
              // support for XHR 'status' & 'statusText' emulation :
              xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
              xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
            }
            else if (scr) {
              // account for browsers injecting pre around json response
              var pre = doc.getElementsByTagName('pre')[0];
              var b = doc.getElementsByTagName('body')[0];
              if (pre) {
                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
              }
              else if (b) {
                xhr.responseText = b.textContent ? b.textContent : b.innerText;
              }
            }
          }
          else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
            xhr.responseXML = toXml(xhr.responseText);
          }

          try {
            data = httpData(xhr, dt, s);
          }
          catch (err) {
            status = 'parsererror';
            xhr.error = errMsg = (err || status);
          }
        }
        catch (err) {
          log('error caught: ',err);
          status = 'error';
          xhr.error = errMsg = (err || status);
        }

        if (xhr.aborted) {
          log('upload aborted');
          status = null;
        }

        if (xhr.status) { // we've set xhr.status
          status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
        }

        // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
        if (status === 'success') {
          if (s.success) {
            s.success.call(s.context, data, 'success', xhr);
          }
          deferred.resolve(xhr.responseText, 'success', xhr);
          if (g) {
            $.event.trigger("ajaxSuccess", [xhr, s]);
          }
        }
        else if (status) {
          if (errMsg === undefined) {
            errMsg = xhr.statusText;
          }
          if (s.error) {
            s.error.call(s.context, xhr, status, errMsg);
          }
          deferred.reject(xhr, 'error', errMsg);
          if (g) {
            $.event.trigger("ajaxError", [xhr, s, errMsg]);
          }
        }

        if (g) {
          $.event.trigger("ajaxComplete", [xhr, s]);
        }

        if (g && ! --$.active) {
          $.event.trigger("ajaxStop");
        }

        if (s.complete) {
          s.complete.call(s.context, xhr, status);
        }

        callbackProcessed = true;
        if (s.timeout) {
          clearTimeout(timeoutHandle);
        }

        // clean up
        setTimeout(function() {
          if (!s.iframeTarget) {
            $io.remove();
          }
          else { //adding else to clean up existing iframe response.
            $io.attr('src', s.iframeSrc);
          }
          xhr.responseXML = null;
        }, 100);
      }

      var toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
        if (window.ActiveXObject) {
          doc = new ActiveXObject('Microsoft.XMLDOM');
          doc.async = 'false';
          doc.loadXML(s);
        }
        else {
          doc = (new DOMParser()).parseFromString(s, 'text/xml');
        }
        return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
      };
      var parseJSON = $.parseJSON || function(s) {
        /*jslint evil:true */
        return window['eval']('(' + s + ')');
      };

      var httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

        var ct = xhr.getResponseHeader('content-type') || '',
            xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
            data = xml ? xhr.responseXML : xhr.responseText;

        if (xml && data.documentElement.nodeName === 'parsererror') {
          if ($.error) {
            $.error('parsererror');
          }
        }
        if (s && s.dataFilter) {
          data = s.dataFilter(data, type);
        }
        if (typeof data === 'string') {
          if (type === 'json' || !type && ct.indexOf('json') >= 0) {
            data = parseJSON(data);
          } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
            $.globalEval(data);
          }
        }
        return data;
      };

      return deferred;
    }
  };

  /**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *    is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *    used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
  $.fn.ajaxForm = function(options) {
    options = options || {};
    options.delegation = options.delegation && $.isFunction($.fn.on);

    // in jQuery 1.3+ we can fix mistakes with the ready state
    if (!options.delegation && this.length === 0) {
      var o = { s: this.selector, c: this.context };
      if (!$.isReady && o.s) {
        log('DOM not ready, queuing ajaxForm');
        $(function() {
          $(o.s,o.c).ajaxForm(options);
        });
        return this;
      }
      // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
      log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
      return this;
    }

    if ( options.delegation ) {
      $(document)
        .off('submit.form-plugin', this.selector, doAjaxSubmit)
        .off('click.form-plugin', this.selector, captureSubmittingElement)
        .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
        .on('click.form-plugin', this.selector, options, captureSubmittingElement);
      return this;
    }

    return this.ajaxFormUnbind()
      .bind('submit.form-plugin', options, doAjaxSubmit)
      .bind('click.form-plugin', options, captureSubmittingElement);
  };

  // private event handlers
  function doAjaxSubmit(e) {
    /*jshint validthis:true */
    var options = e.data;
    if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
      e.preventDefault();
      $(e.target).ajaxSubmit(options); // #365
    }
  }

  function captureSubmittingElement(e) {
    /*jshint validthis:true */
    var target = e.target;
    var $el = $(target);
    if (!($el.is("[type=submit],[type=image]"))) {
      // is this a child element of the submit el?  (ex: a span within a button)
      var t = $el.closest('[type=submit]');
      if (t.length === 0) {
        return;
      }
      target = t[0];
    }
    var form = this;
    form.clk = target;
    if (target.type == 'image') {
      if (e.offsetX !== undefined) {
        form.clk_x = e.offsetX;
        form.clk_y = e.offsetY;
      } else if (typeof $.fn.offset == 'function') {
        var offset = $el.offset();
        form.clk_x = e.pageX - offset.left;
        form.clk_y = e.pageY - offset.top;
      } else {
        form.clk_x = e.pageX - target.offsetLeft;
        form.clk_y = e.pageY - target.offsetTop;
      }
    }
    // clear form vars
    setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
  }


  // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
  $.fn.ajaxFormUnbind = function() {
    return this.unbind('submit.form-plugin click.form-plugin');
  };

  /**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
  $.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
      return a;
    }

    var form = this[0];
    var formId = this.attr('id');
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    var els2;

    if (els && !/MSIE [678]/.test(navigator.userAgent)) { // #390
      els = $(els).get();  // convert to standard array
    }

    // #386; account for inputs outside the form which use the 'form' attribute
    if ( formId ) {
      els2 = $(':input[form=' + formId + ']').get();
      if ( els2.length ) {
        els = (els || []).concat(els2);
      }
    }

    if (!els || !els.length) {
      return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
      el = els[i];
      n = el.name;
      if (!n || el.disabled) {
        continue;
      }

      if (semantic && form.clk && el.type == "image") {
        // handle image inputs on the fly when semantic == true
        if(form.clk == el) {
          a.push({name: n, value: $(el).val(), type: el.type });
          a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
        continue;
      }

      v = $.fieldValue(el, true);
      if (v && v.constructor == Array) {
        if (elements) {
          elements.push(el);
        }
        for(j=0, jmax=v.length; j < jmax; j++) {
          a.push({name: n, value: v[j]});
        }
      }
      else if (feature.fileapi && el.type == 'file') {
        if (elements) {
          elements.push(el);
        }
        var files = el.files;
        if (files.length) {
          for (j=0; j < files.length; j++) {
            a.push({name: n, value: files[j], type: el.type});
          }
        }
        else {
          // #180
          a.push({ name: n, value: '', type: el.type });
        }
      }
      else if (v !== null && typeof v != 'undefined') {
        if (elements) {
          elements.push(el);
        }
        a.push({name: n, value: v, type: el.type, required: el.required});
      }
    }

    if (!semantic && form.clk) {
      // input type=='image' are not found in elements array! handle it here
      var $input = $(form.clk), input = $input[0];
      n = input.name;
      if (n && !input.disabled && input.type == 'image') {
        a.push({name: n, value: $input.val()});
        a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
      }
    }
    return a;
  };

  /**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
  $.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
  };

  /**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
  $.fn.fieldSerialize = function(successful) {
    var a = [];
    this.each(function() {
      var n = this.name;
      if (!n) {
        return;
      }
      var v = $.fieldValue(this, successful);
      if (v && v.constructor == Array) {
        for (var i=0,max=v.length; i < max; i++) {
          a.push({name: n, value: v[i]});
        }
      }
      else if (v !== null && typeof v != 'undefined') {
        a.push({name: this.name, value: v});
      }
    });
    //hand off to jQuery.param for proper encoding
    return $.param(a);
  };

  /**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *      <input name="A" type="text" />
 *      <input name="A" type="text" />
 *      <input name="B" type="checkbox" value="B1" />
 *      <input name="B" type="checkbox" value="B2"/>
 *      <input name="C" type="radio" value="C1" />
 *      <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $('input[type=text]').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $('input[type=checkbox]').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $('input[type=radio]').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *    array will be empty, otherwise it will contain one or more values.
 */
  $.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
      var el = this[i];
      var v = $.fieldValue(el, successful);
      if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
        continue;
      }
      if (v.constructor == Array) {
        $.merge(val, v);
      }
      else {
        val.push(v);
      }
    }
    return val;
  };

  /**
 * Returns the value of the field element.
 */
  $.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
      successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
                       (t == 'checkbox' || t == 'radio') && !el.checked ||
                       (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
                       tag == 'select' && el.selectedIndex == -1)) {
      return null;
    }

    if (tag == 'select') {
      var index = el.selectedIndex;
      if (index < 0) {
        return null;
      }
      var a = [], ops = el.options;
      var one = (t == 'select-one');
      var max = (one ? index+1 : ops.length);
      for(var i=(one ? index : 0); i < max; i++) {
        var op = ops[i];
        if (op.selected) {
          var v = op.value;
          if (!v) { // extra pain for IE...
            v = (op.attributes && op.attributes.value && !(op.attributes.value.specified)) ? op.text : op.value;
          }
          if (one) {
            return v;
          }
          a.push(v);
        }
      }
      return a;
    }
    return $(el).val();
  };

  /**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
  $.fn.clearForm = function(includeHidden) {
    return this.each(function() {
      $('input,select,textarea', this).clearFields(includeHidden);
    });
  };

  /**
 * Clears the selected form elements.
 */
  $.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
      var t = this.type, tag = this.tagName.toLowerCase();
      if (re.test(t) || tag == 'textarea') {
        this.value = '';
      }
      else if (t == 'checkbox' || t == 'radio') {
        this.checked = false;
      }
      else if (tag == 'select') {
        this.selectedIndex = -1;
      }
      else if (t == "file") {
        if (/MSIE/.test(navigator.userAgent)) {
          $(this).replaceWith($(this).clone(true));
        } else {
          $(this).val('');
        }
      }
      else if (includeHidden) {
        // includeHidden can be the value true, or it can be a selector string
        // indicating a special test; for example:
        //  $('#myForm').clearForm('.special:hidden')
        // the above would clean hidden inputs that have the class of 'special'
        if ( (includeHidden === true && /hidden/.test(t)) ||
            (typeof includeHidden == 'string' && $(this).is(includeHidden)) ) {
          this.value = '';
        }
      }
    });
  };

  /**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
  $.fn.resetForm = function() {
    return this.each(function() {
      // guard against an input with the name of 'reset'
      // note that IE reports the reset function as an 'object'
      if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
        this.reset();
      }
    });
  };

  /**
 * Enables or disables any matching elements.
 */
  $.fn.enable = function(b) {
    if (b === undefined) {
      b = true;
    }
    return this.each(function() {
      this.disabled = !b;
    });
  };

  /**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
  $.fn.selected = function(select) {
    if (select === undefined) {
      select = true;
    }
    return this.each(function() {
      var t = this.type;
      if (t == 'checkbox' || t == 'radio') {
        this.checked = select;
      }
      else if (this.tagName.toLowerCase() == 'option') {
        var $sel = $(this).parent('select');
        if (select && $sel[0] && $sel[0].type == 'select-one') {
          // deselect all other options
          $sel.find('option').selected(false);
        }
        this.selected = select;
      }
    });
  };

  // expose debug var
  $.fn.ajaxSubmit.debug = false;

  // helper fn for console logging
  function log() {
    if (!$.fn.ajaxSubmit.debug) {
      return;
    }
    var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
    if (window.console && window.console.log) {
      window.console.log(msg);
    }
    else if (window.opera && window.opera.postError) {
      window.opera.postError(msg);
    }
  }

}));
;/*
 jquery.fullscreen 1.1.5
 https://github.com/kayahr/jquery-fullscreen-plugin
 Copyright (C) 2012-2013 Klaus Reimer <k@ailis.de>
 Licensed under the MIT license
 (See http://www.opensource.org/licenses/mit-license)
*/
function d(c){var b,a;if(!this.length)return this;b=this[0];b.ownerDocument?a=b.ownerDocument:(a=b,b=a.documentElement);if(null==c){if(!a.exitFullscreen&&!a.webkitExitFullscreen&&!a.webkitCancelFullScreen&&!a.msExitFullscreen&&!a.mozCancelFullScreen)return null;c=!!a.fullscreenElement||!!a.msFullscreenElement||!!a.webkitIsFullScreen||!!a.mozFullScreen;return!c?c:a.fullscreenElement||a.webkitFullscreenElement||a.webkitCurrentFullScreenElement||a.msFullscreenElement||a.mozFullScreenElement||c}c?(c=
b.requestFullscreen||b.webkitRequestFullscreen||b.webkitRequestFullScreen||b.msRequestFullscreen||b.mozRequestFullScreen)&&c.call(b):(c=a.exitFullscreen||a.webkitExitFullscreen||a.webkitCancelFullScreen||a.msExitFullscreen||a.mozCancelFullScreen)&&c.call(a);return this}jQuery.fn.fullScreen=d;jQuery.fn.toggleFullScreen=function(){return d.call(this,!d.call(this))};var e,f,g;e=document;
e.webkitCancelFullScreen?(f="webkitfullscreenchange",g="webkitfullscreenerror"):e.msExitFullscreen?(f="MSFullscreenChange",g="MSFullscreenError"):e.mozCancelFullScreen?(f="mozfullscreenchange",g="mozfullscreenerror"):(f="fullscreenchange",g="fullscreenerror");jQuery(document).bind(f,function(){jQuery(document).trigger(new jQuery.Event("fullscreenchange"))});jQuery(document).bind(g,function(){jQuery(document).trigger(new jQuery.Event("fullscreenerror"))});;/*
== malihu jquery custom scrollbar plugin == 
Version: 3.0.2 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright 2010 Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/

;(function($,window,document,undefined){

  /* 
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
	----------------------------------------
	*/

  var pluginNS="mCustomScrollbar",
      pluginPfx="mCS",
      defaultSelector=".mCustomScrollbar",





      /* 
	----------------------------------------
	DEFAULT OPTIONS 
	----------------------------------------
	*/

      defaults={
        /* 
			set element/content width programmatically 
			values: boolean, pixels, percentage 
			*/
        setWidth:false,
        /* 
			set element/content height programmatically 
			values: boolean, pixels, percentage 
			*/
        setHeight:false,
        /*
			set the initial css top property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setTop:0,
        /*
			set the initial css left property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
        setLeft:0,
        /* 
			scrollbar axis (vertical and/or horizontal scrollbars) 
			values (string): "y", "x", "yx"
			*/
        axis:"y",
        /*
			position of scrollbar relative to content  
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
        scrollbarPosition:"inside",
        /*
			scrolling inertia
			values: integer (milliseconds)
			*/
        scrollInertia:950,
        /* 
			auto-adjust scrollbar dragger length
			values: boolean
			*/
        autoDraggerLength:true,
        /*
			auto-hide scrollbar when idle 
			values: boolean
			*/
        autoHideScrollbar:false,
        /*
			auto-expands scrollbar on mouse-over and dragging
			*/
        autoExpandScrollbar:false,
        /*
			always show scrollbar, even when there's nothing to scroll 
			values: integer (0=disable, 1=always show dragger rail, 2=always show dragger rail, dragger and buttons), boolean
			*/
        alwaysShowScrollbar:0,
        /*
			scrolling always snaps to a multiple of this number in pixels
			values: integer
			*/
        snapAmount:null,
        /*
			when snapping, snap with this number in pixels as an offset 
			values: integer
			*/
        snapOffset:0,
        /* 
			mouse-wheel scrolling
			*/
        mouseWheel:{
          /* 
				enable mouse-wheel scrolling
				values: boolean
				*/
          enable:true,
          /* 
				scrolling amount in pixels
				values: "auto", integer 
				*/
          scrollAmount:"auto",
          /* 
				mouse-wheel scrolling axis 
				the default scrolling direction when both vertical and horizontal scrollbars are present 
				values (string): "y", "x" 
				*/
          axis:"y",
          /* 
				prevent the default behaviour which automatically scrolls the parent element(s) 
				when end of scrolling is reached 
				values: boolean
				*/
          preventDefault:false,
          /*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
				values: "auto", integer 
				"auto" uses the default OS/browser value 
				*/
          deltaFactor:"auto",
          /*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
				values: boolean
				*/
          normalizeDelta:false,
          /*
				invert mouse-wheel scrolling direction 
				values: boolean
				*/
          invert:false,
          /*
				the tags that disable mouse-wheel when cursor is over them
				*/
          disableOver:["select","option","keygen","datalist","textarea"]
        },
        /* 
			scrollbar buttons
			*/
        scrollButtons:{ 
          /*
				enable scrollbar buttons
				values: boolean
				*/
          enable:false,
          /*
				scrollbar buttons scrolling type 
				values (string): "stepless", "stepped"
				*/
          scrollType:"stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer 
				*/
          scrollAmount:"auto"
        },
        /* 
			keyboard scrolling
			*/
        keyboard:{ 
          /*
				enable scrolling via keyboard
				values: boolean
				*/
          enable:true,
          /*
				keyboard scrolling type 
				values (string): "stepless", "stepped"
				*/
          scrollType:"stepless",
          /*
				scrolling amount in pixels
				values: "auto", integer 
				*/
          scrollAmount:"auto"
        },
        /*
			enable content touch-swipe scrolling 
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
        contentTouchScroll:25,
        /*
			advanced option parameters
			*/
        advanced:{
          /*
				auto-expand content horizontally (for "x" or "yx" axis) 
				values: boolean
				*/
          autoExpandHorizontalScroll:false,
          /*
				auto-scroll to elements with focus
				*/
          autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
          /*
				auto-update scrollbars on content, element or viewport resize 
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
				values: boolean
				*/
          updateOnContentResize:true,
          /*
				auto-update scrollbars each time each image inside the element is fully loaded 
				values: boolean
				*/
          updateOnImageLoad:true,
          /*
				auto-update scrollbars based on the amount and size changes of specific selectors 
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
				a value of true (boolean) will auto-update scrollbars each time any element is changed
				*/
          updateOnSelectorChange:false
        },
        /* 
			scrollbar theme 
			values: string 
			ready-to-use themes: "light", "dark", "light-2", "dark-2", "light-3", "dark-3", "light-thick", "dark-thick", "light-thin", "dark-thin", 
			"rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "minimal", "minimal-dark", 
			"inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"
			*/
        theme:"light",
        /*
			user defined callback functions
			*/
        callbacks:{
          /*
				function to call when a scroll event starts 
				values (function): function(){}
				*/
          onScrollStart:false,
          /*
				function to call when a scroll event is complete 
				values (function): function(){}
				*/
          onScroll:false,
          /*
				function to call when a scroll event is complete and content is scrolled all the way to the end (bottom/right)
				values (function): function(){}
				*/
          onTotalScroll:false,
          /*
				function to call when a scroll event is complete and content is scrolled back to the beginning (top/left)
				values (function): function(){}
				*/
          onTotalScrollBack:false,
          /*
				function to call when a scroll event is running 
				values (function): function(){}
				*/
          whileScrolling:false,
          /*
				onTotalScroll offset value
				values: integer (pixels)
				*/
          onTotalScrollOffset:0,
          /*
				onTotalScrollBack offset value
				values: integer (pixels)
				*/
          onTotalScrollBackOffset:0,
          /*
				callback offsets will trigger even if content is already scrolled to the end or beginning
				values: boolean
				*/
          alwaysTriggerOffsets:true
        },
        /*
			add scrollbar(s) on all elements matching the current selector, now and in the future 
			values: boolean, string 
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			*/
        live:false,
        /*
			the matching set of elements (instead of the current selector) to add scrollbar(s), now and in the future
			values: string (selector)
			*/
        liveSelector:null
      },





      /* 
	----------------------------------------
	VARS, CONSTANTS 
	----------------------------------------
	*/

      totalInstances=0, /* plugin instances amount */
      liveTimers={}, /* live option timers */
      /* live option timers removal */
      removeLiveTimers=function(selector){
        if(liveTimers[selector]){
          clearTimeout(liveTimers[selector]);
          functions._delete.call(null,liveTimers[selector]);
        }
      },
      oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
      touchActive=false, /* global touch state (for touch and pointer events) */





      /* 
	----------------------------------------
	METHODS 
	----------------------------------------
	*/

      methods={

        /* 
			plugin initialization method 
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/

        init:function(options){

          var options=$.extend(true,{},defaults,options),
              selector=functions._selector.call(this); /* validate selector */

          /* 
				if live option is enabled, monitor for elements matching the current selector and 
				apply scrollbar(s) when found (now and in the future) 
				*/
          if(options.live){
            var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
                $liveSelector=$(liveSelector); /* live selector(s) as jquery object */
            if(options.live==="off"){
              /* 
						disable live if requested 
						usage: $(selector).mCustomScrollbar({live:"off"}); 
						*/
              removeLiveTimers(liveSelector);
              return;
            }
            liveTimers[liveSelector]=setTimeout(function(){
              /* call mCustomScrollbar fn on live selector(s) every half-second */
              $liveSelector.mCustomScrollbar(options);
              if(options.live==="once" && $liveSelector.length){
                /* disable live after first invocation */
                removeLiveTimers(liveSelector);
              }
            },500);
          }else{
            removeLiveTimers(liveSelector);
          }

          /* options backward compatibility (for versions < 3.0.0) and normalization */
          options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
          options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
          options.axis=(options.horizontalScroll) ? "x" : functions._findAxis.call(null,options.axis);
          options.scrollInertia=options.scrollInertia<17 ? 17 : options.scrollInertia;
          if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
            options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
          }
          options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
          options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
          options.scrollButtons.scrollType=functions._findScrollButtonsType.call(null,options.scrollButtons.scrollType); 

          functions._theme.call(null,options); /* theme-specific options */

          /* plugin constructor */
          return $(selector).each(function(){

            var $this=$(this);

            if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */

              /* store options and create objects in jquery data */
              $this.data(pluginPfx,{
                idx:++totalInstances, /* instance index */
                opt:options, /* options */
                scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
                overflowed:null, /* overflowed axis */
                bindEvents:false, /* object to check if events are bound */
                tweenRunning:false, /* object to check if tween is running */
                sequential:{}, /* sequential scrolling object */
                langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
                cbOffsets:null, /* object to check whether callback offsets always trigger */
                /* 
							object to check how scrolling events where last triggered 
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
							usage: object.data("mCS").trigger
							*/
                trigger:null
              });

              /* HTML data attributes */
              var o=$this.data(pluginPfx).opt,
                  htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
              if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
              if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
              if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
                o.theme=htmlDataTheme;
                functions._theme.call(null,o); /* theme-specific options */
              }

              functions._pluginMarkup.call(this); /* add plugin markup */

              methods.update.call(null,$this); /* call the update method */

            }

          });

        },
        /* ---------------------------------------- */



        /* 
			plugin update method 
			updates content and scrollbar(s) values, events and status 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/

        update:function(el){

          var selector=el || functions._selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt,
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];

              if(!mCSB_container.length){return;}

              if(d.tweenRunning){functions._stop.call(null,$this);} /* stop any running tweens while updating */

              /* if element was disabled or destroyed, remove class(es) */
              if($this.hasClass("mCS_disabled")){$this.removeClass("mCS_disabled");}
              if($this.hasClass("mCS_destroyed")){$this.removeClass("mCS_destroyed");}

              functions._maxHeight.call(this); /* detect/set css max-height value */

              functions._expandContentHorizontally.call(this); /* expand content horizontally */

              if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
                mCSB_container.css("width",functions._contentWidth(mCSB_container.children()));
              }

              d.overflowed=functions._overflowed.call(this); /* determine if scrolling is required */

              functions._scrollbarVisibility.call(this); /* show/hide scrollbar(s) */

              /* auto-adjust scrollbar dragger length analogous to content */
              if(o.autoDraggerLength){functions._setDraggerLength.call(this);}

              functions._scrollRatio.call(this); /* calculate and store scrollbar to content ratio */

              functions._bindEvents.call(this); /* bind scrollbar events */

              /* reset scrolling position and/or events */
              var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
              if(o.axis!=="x"){ /* y/yx axis */
                if(!d.overflowed[0]){ /* y scrolling is not required */
                  functions._resetContentPosition.call(this); /* reset content position */
                  if(o.axis==="y"){
                    functions._unbindEvents.call(this);
                  }else if(o.axis==="yx" && d.overflowed[1]){
                    functions._scrollTo.call(this,$this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                  }
                }else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
                  functions._resetContentPosition.call(this); /* reset content position */
                }else{ /* y scrolling is required */
                  functions._scrollTo.call(this,$this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                }
              }
              if(o.axis!=="y"){ /* x/yx axis */
                if(!d.overflowed[1]){ /* x scrolling is not required */
                  functions._resetContentPosition.call(this); /* reset content position */
                  if(o.axis==="x"){
                    functions._unbindEvents.call(this);
                  }else if(o.axis==="yx" && d.overflowed[0]){
                    functions._scrollTo.call(this,$this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
                  }
                }else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
                  functions._resetContentPosition.call(this); /* reset content position */
                }else{ /* x scrolling is required */
                  functions._scrollTo.call(this,$this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
                }
              }

              functions._autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */

            }

          });

        },
        /* ---------------------------------------- */



        /* 
			plugin scrollTo method 
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/

        scrollTo:function(val,options){

          /* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
          if(typeof val=="undefined" || val==null){return;}

          var selector=functions._selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt,
                  /* method default options */
                  methodDefaults={
                    trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
                    scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
                    scrollEasing:"mcsEaseInOut", /* animation easing */
                    moveDragger:false, /* move dragger instead of content */
                    callbacks:true, /* enable/disable callbacks */
                    onStart:true,
                    onUpdate:true,
                    onComplete:true
                  },
                  methodOptions=$.extend(true,{},methodDefaults,options),
                  to=functions._arr.call(this,val),dur=methodOptions.scrollInertia < 17 ? 17 : methodOptions.scrollInertia;

              /* translate yx values to actual scroll-to positions */
              to[0]=functions._to.call(this,to[0],"y");
              to[1]=functions._to.call(this,to[1],"x");

              /* 
						check if scroll-to value moves the dragger instead of content. 
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
						*/
              if(methodOptions.moveDragger){
                to[0]*=d.scrollRatio.y;
                to[1]*=d.scrollRatio.x;
              }

              methodOptions.dur=dur;

              setTimeout(function(){ 
                /* do the scrolling */
                if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
                  methodOptions.dir="y";
                  methodOptions.overwrite="all";
                  functions._scrollTo.call(this,$this,to[0].toString(),methodOptions);
                }
                if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
                  methodOptions.dir="x";
                  methodOptions.overwrite="none";
                  functions._scrollTo.call(this,$this,to[1].toString(),methodOptions);
                }
              },60);

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin stop method 
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
        stop:function(){

          var selector=functions._selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              functions._stop.call(null,$this);

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin disable method 
			temporarily disables the scrollbar(s) 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset); 
			reset (boolean): resets content position to 0 
			*/
        disable:function(r){

          var selector=functions._selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt;

              functions._autoUpdate.call(this,"remove"); /* remove automatic updating */

              functions._unbindEvents.call(this); /* unbind events */

              if(r){functions._resetContentPosition.call(this);} /* reset content position */

              functions._scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */

              $this.addClass("mCS_disabled"); /* add disable class */

            }

          });

        },
        /* ---------------------------------------- */



        /*
			plugin destroy method 
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy"); 
			*/
        destroy:function(){

          var selector=functions._selector.call(this); /* validate selector */

          return $(selector).each(function(){

            var $this=$(this);

            if($this.data(pluginPfx)){ /* check if plugin has initialized */

              var d=$this.data(pluginPfx),o=d.opt,
                  mCustomScrollBox=$("#mCSB_"+d.idx),
                  mCSB_container=$("#mCSB_"+d.idx+"_container"),
                  scrollbar=$(".mCSB_"+d.idx+"_scrollbar");

              if(o.live){removeLiveTimers(selector);} /* remove live timer */

              functions._autoUpdate.call(this,"remove"); /* remove automatic updating */

              functions._unbindEvents.call(this); /* unbind events */

              functions._resetContentPosition.call(this); /* reset content position */

              $this.removeData(pluginPfx); /* remove plugin data object */

              functions._delete.call(null,this.mcs); /* delete callbacks object */

              /* remove plugin markup */
              scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
              mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
              /* remove plugin classes from the element and add destroy class */
              $this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" mCS-autoHide mCS-dir-rtl mCS_no_scrollbar mCS_disabled").addClass("mCS_destroyed");

            }

          });

        }
        /* ---------------------------------------- */

      },





      /* 
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/

      functions={

        /* validates selector (if selector is invalid or undefined uses the default one) */
        _selector:function(){
          return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
        },
        /* -------------------- */

        /* changes options according to theme */
        _theme:function(obj){
          var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
              nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
              disabledScrollButtonsThemes=["minimal","minimal-dark"],
              enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
              scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
          obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
          obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
          obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
          obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
          obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
        },
        /* -------------------- */


        /* normalizes axis option to valid values: "y", "x", "yx" */
        _findAxis:function(val){
          return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
        },
        /* -------------------- */


        /* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
        _findScrollButtonsType:function(val){
          return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
        },
        /* -------------------- */


        /* generates plugin markup */
        _pluginMarkup:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              expandClass=o.autoExpandScrollbar ? " mCSB_scrollTools_onDrag_expand" : "",
              scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='mCSB_draggerContainer'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
              wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
              scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
              contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
              autoHideClass=o.autoHideScrollbar ? " mCS-autoHide" : "",
              scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " mCS-dir-rtl" : "";
          if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
          if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
          o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
          $this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir="+d.langDir+" /></div>");
          var mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
            mCSB_container.css("width",functions._contentWidth(mCSB_container.children()));
          }
          if(o.scrollbarPosition==="outside"){
            if($this.css("position")==="static"){ /* requires elements with non-static position */
              $this.css("position","relative");
            }
            $this.css("overflow","visible");
            mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
          }else{
            mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
            mCSB_container.wrap(contentWrapper);
          }
          functions._scrollButtons.call(this); /* add scrollbar buttons */
          /* minimum dragger length */
          var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
          mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
          mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
        },
        /* -------------------- */


        /* calculates content width */
        _contentWidth:function(el){
          return Math.max.apply(Math,el.map(function(){return $(this).outerWidth(true);}).get());
        },
        /* -------------------- */


        /* expands content horizontally */
        _expandContentHorizontally:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
            /* 
					wrap content with an infinite width div and set its position to absolute and width to auto. 
					Setting width to auto before calculating the actual width is important! 
					We must let the browser set the width as browser zoom values are impossible to calculate.
					*/
            mCSB_container.css({"position":"absolute","width":"auto"})
              .wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
              .css({ /* set actual width, original position and un-wrap */
              /* 
							get the exact width (with decimals) and then round-up. 
							Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
							*/
              "width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
              "position":"relative"
            }).unwrap();
          }
        },
        /* -------------------- */


        /* adds scrollbar buttons */
        _scrollButtons:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
              btnHTML=[
                "<a href='#' class='mCSB_buttonUp' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonDown' oncontextmenu='return false;' />",
                "<a href='#' class='mCSB_buttonLeft' oncontextmenu='return false;' />","<a href='#' class='mCSB_buttonRight' oncontextmenu='return false;' />"
              ],
              btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
          if(o.scrollButtons.enable){
            mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
          }
        },
        /* -------------------- */


        /* detects/sets css max-height value */
        _maxHeight:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mh=$this.css("max-height"),pct=mh.indexOf("%")!==-1,
              bs=$this.css("box-sizing");
          if(mh!=="none"){
            var val=pct ? $this.parent().height()*parseInt(mh)/100 : parseInt(mh);
            /* if element's css box-sizing is "border-box", subtract any paddings and/or borders from max-height value */
            if(bs==="border-box"){val-=(($this.innerHeight()-$this.height())+($this.outerHeight()-$this.innerHeight()));}
            mCustomScrollBox.css("max-height",Math.round(val));
          }
        },
        /* -------------------- */


        /* auto-adjusts scrollbar dragger length */
        _setDraggerLength:function(){
          var $this=$(this),d=$this.data(pluginPfx),
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
              ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
              l=[
                parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
                parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
              ],
              h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
          mCSB_dragger[0].css({
            "height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
          }).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
          mCSB_dragger[1].css({
            "width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
          });
        },
        /* -------------------- */


        /* calculates scrollbar to content ratio */
        _scrollRatio:function(){
          var $this=$(this),d=$this.data(pluginPfx),
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
              scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
              ratio=[
                scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
                scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
              ];
          d.scrollRatio={y:ratio[0],x:ratio[1]};
        },
        /* -------------------- */


        /* toggles scrolling classes */
        _onDragClasses:function(el,action,xpnd){
          var expandClass=xpnd ? "mCSB_dragger_onDrag_expanded" : "",classes=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag"],
              scrollbar=el.closest(".mCSB_scrollTools");
          if(action==="active"){
            el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
            el[0]._draggable=el[0]._draggable ? 0 : 1;
          }else{
            if(!el[0]._draggable){
              if(action==="hide"){
                el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
              }else{
                el.addClass(classes[0]); scrollbar.addClass(classes[1]);
              }
            }
          }
        },
        /* -------------------- */


        /* checks if content overflows its container to determine if scrolling is required */
        _overflowed:function(){
          var $this=$(this),d=$this.data(pluginPfx),
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
              contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false);
          return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
        },
        /* -------------------- */


        /* resets content position to 0 */
        _resetContentPosition:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
          functions._stop($this); /* stop any current scrolling before resetting */
          if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){mCSB_dragger[0].add(mCSB_container).css("top",0);} /* reset y */
          if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
            var cx=dx=0;
            if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
              cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
              dx=Math.abs(cx/d.scrollRatio.x);
            }
            mCSB_container.css("left",cx);
            mCSB_dragger[1].css("left",dx);
          }
        },
        /* -------------------- */


        /* binds scrollbar events */
        _bindEvents:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
          if(!d.bindEvents){ /* check if events are already bound */
            functions._draggable.call(this);
            if(o.contentTouchScroll){functions._contentDraggable.call(this);}
            if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
              function _mwt(){
                mousewheelTimeout=setTimeout(function(){
                  if(!$.event.special.mousewheel){
                    _mwt();
                  }else{
                    clearTimeout(mousewheelTimeout);
                    functions._mousewheel.call($this[0]);
                  }
                },1000);
              }
              var mousewheelTimeout;
              _mwt();
            }
            functions._draggerRail.call(this);
            functions._wrapperScroll.call(this);
            if(o.advanced.autoScrollOnFocus){functions._focus.call(this);}
            if(o.scrollButtons.enable){functions._buttons.call(this);}
            if(o.keyboard.enable){functions._keyboard.call(this);}
            d.bindEvents=true;
          }
        },
        /* -------------------- */


        /* unbinds scrollbar events */
        _unbindEvents:function(){
          var $this=$(this),d=$this.data(pluginPfx),
              namespace=pluginPfx+"_"+d.idx,
              sb=".mCSB_"+d.idx+"_scrollbar",
              sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" .mCSB_draggerContainer,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
              mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(d.bindEvents){ /* check if events are bound */
            /* unbind namespaced events from document/selectors */
            $(document).unbind("."+namespace);
            sel.each(function(){
              $(this).unbind("."+namespace);
            });
            /* clear and delete timeouts/objects */
            clearTimeout($this[0]._focusTimeout); functions._delete.call(null,$this[0]._focusTimeout);
            clearTimeout(d.sequential.step); functions._delete.call(null,d.sequential.step);
            clearTimeout(mCSB_container[0].onCompleteTimeout); functions._delete.call(null,mCSB_container[0].onCompleteTimeout);
            d.bindEvents=false;
          }
        },
        /* -------------------- */


        /* toggles scrollbar visibility */
        _scrollbarVisibility:function(disabled){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
              content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
              scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
              mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
          if(o.axis!=="x"){
            if(d.overflowed[0] && !disabled){
              scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
              content.removeClass("mCS_no_scrollbar_y mCS_y_hidden");
            }else{
              if(o.alwaysShowScrollbar){
                if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].add(scrollbar[0].children("a")).css("display","none");}
                content.removeClass("mCS_y_hidden");
              }else{
                scrollbar[0].css("display","none");
                content.addClass("mCS_y_hidden");
              }
              content.addClass("mCS_no_scrollbar_y");
            }
          }
          if(o.axis!=="y"){
            if(d.overflowed[1] && !disabled){
              scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
              content.removeClass("mCS_no_scrollbar_x mCS_x_hidden");
            }else{
              if(o.alwaysShowScrollbar){
                if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].add(scrollbar[1].children("a")).css("display","none");}
                content.removeClass("mCS_x_hidden");
              }else{
                scrollbar[1].css("display","none");
                content.addClass("mCS_x_hidden");
              }
              content.addClass("mCS_no_scrollbar_x");
            }
          }
          if(!d.overflowed[0] && !d.overflowed[1]){
            $this.addClass("mCS_no_scrollbar");
          }else{
            $this.removeClass("mCS_no_scrollbar");
          }
        },
        /* -------------------- */


        /* returns input coordinates of pointer, touch and mouse events (relative to document) */
        _coordinates:function(e){
          var t=e.type;
          switch(t){
            case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
              return [e.originalEvent.pageY,e.originalEvent.pageX];
              break;
            case "touchstart": case "touchmove": case "touchend":
              var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
              return [touch.pageY,touch.pageX];
              break;
            default:
              return [e.pageY,e.pageX];
          }
        },
        /* -------------------- */


        /* 
			SCROLLBAR DRAG EVENTS
			scrolls content via scrollbar dragging 
			*/
        _draggable:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              namespace=pluginPfx+"_"+d.idx,
              draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
              draggable,dragY,dragX;
          mCSB_dragger.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            if(!functions._mouseBtnLeft(e)){return;} /* left mouse button only */
            touchActive=true;
            if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
            _iframe(false); /* enable scrollbar dragging over iframes by disabling their events */
            functions._stop($this);
            draggable=$(this);
            var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left,
                h=draggable.height()+offset.top,w=draggable.width()+offset.left;
            if(y<h && y>0 && x<w && x>0){
              dragY=y; 
              dragX=x;
            }
            functions._onDragClasses(draggable,"active",o.autoExpandScrollbar); 
          }).bind("touchmove."+namespace,function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
            _drag(dragY,dragX,y,x);
          });
          $(document).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
            if(draggable){
              var offset=draggable.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
              if(dragY===y){return;} /* has it really moved? */
              _drag(dragY,dragX,y,x);
            }
          }).add(mCSB_dragger).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
            if(draggable){
              functions._onDragClasses(draggable,"active",o.autoExpandScrollbar); 
              draggable=null;
            }
            touchActive=false;
            if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
            _iframe(true); /* enable iframes events */
          });
          function _iframe(evt){
            var el=mCSB_container.find("iframe");
            if(!el.length){return;} /* check if content contains iframes */
            var val=!evt ? "none" : "auto";
            el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
          }
          function _drag(dragY,dragX,y,x){
            mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
            if(draggable.attr("id")===draggerId[1]){
              var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
            }else{
              var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
            }
            functions._scrollTo($this,to.toString(),{dir:dir,drag:true});
          }
        },
        /* -------------------- */


        /* 
			TOUCH SWIPE EVENTS
			scrolls content via touch swipe 
			Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
			*/
        _contentDraggable:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              namespace=pluginPfx+"_"+d.idx,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
              dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
              durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all";
          mCSB_container.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            var offset=mCSB_container.offset();
            dragY=functions._coordinates(e)[0]-offset.top;
            dragX=functions._coordinates(e)[1]-offset.left;
          }).bind("touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            e.stopImmediatePropagation();
            runningTime=functions._getTime();
            var offset=mCustomScrollBox.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left,
                easing="mcsLinearOut";
            touchMoveY.push(y);
            touchMoveX.push(x);
            if(d.overflowed[0]){
              var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                  prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y));
            }
            if(d.overflowed[1]){
              var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                  preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x));
            }
            if(prevent || preventX){e.preventDefault();} /* prevent native document scrolling */
            amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
            mCSB_container[0].idleTimer=250;
            if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
            if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
          });
          mCustomScrollBox.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            e.stopImmediatePropagation();
            functions._stop($this);
            startTime=functions._getTime();
            var offset=mCustomScrollBox.offset();
            touchStartY=functions._coordinates(e)[0]-offset.top;
            touchStartX=functions._coordinates(e)[1]-offset.left;
            touchMoveY=[]; touchMoveX=[];
          }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
            if(!functions._pointerTouch(e) || touchActive){return;}
            e.stopImmediatePropagation();
            endTime=functions._getTime();
            var offset=mCustomScrollBox.offset(),y=functions._coordinates(e)[0]-offset.top,x=functions._coordinates(e)[1]-offset.left;
            if((endTime-runningTime)>30){return;}
            speed=1000/(endTime-startTime);
            var easing="mcsEaseOut",slow=speed<2.5,
                diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
            distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
            var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
            speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
            var a=[
              Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
              Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
            ];
            amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
            durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
            var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
            amount[0]=absDistance[0]>md ? amount[0] : 0;
            amount[1]=absDistance[1]>md ? amount[1] : 0;
            if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
            if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
          });
          function _m(ds,s){
            var r=[s*1.5,s*2,s/1.5,s/2];
            if(ds>90){
              return s>4 ? r[0] : r[3];
            }else if(ds>60){
              return s>3 ? r[3] : r[2];
            }else if(ds>30){
              return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
            }else{
              return s>8 ? s : r[3];
            }
          }
          function _drag(amount,dur,easing,dir,overwrite,drag){
            if(!amount){return;}
            functions._scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
          }
        },
        /* -------------------- */


        /* 
			MOUSE WHEEL EVENT
			scrolls content via mouse-wheel 
			via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
			*/
        _mousewheel:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              namespace=pluginPfx+"_"+d.idx,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
          mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
            functions._stop($this);
            if(functions._disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
            var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor<40 ? 40 : e.deltaFactor || 100;
            if(o.axis==="x" || o.mouseWheel.axis==="x"){
              var dir="x",
                  px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
                  amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
                  contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
                  draggerPos=mCSB_dragger[1][0].offsetLeft,
                  limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
                  dlt=e.deltaX || e.deltaY || delta;
            }else{
              var dir="y",
                  px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
                  amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
                  contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
                  draggerPos=mCSB_dragger[0][0].offsetTop,
                  limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
                  dlt=e.deltaY || delta;
            }
            if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
            if(o.mouseWheel.invert){dlt=-dlt;}
            if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
            if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
              e.stopImmediatePropagation();
              e.preventDefault();
            }
            functions._scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir});
          });
        },
        /* -------------------- */


        /* disables mouse-wheel when hovering specific elements like select, datalist etc. */
        _disableMousewheel:function(el,target){
          var tag=target.nodeName.toLowerCase(),
              tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
              /* elements that require focus */
              focusTags=["select","textarea"];
          return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
        },
        /* -------------------- */


        /* 
			DRAGGER RAIL CLICK EVENT
			scrolls content via dragger rail 
			*/
        _draggerRail:function(){
          var $this=$(this),d=$this.data(pluginPfx),
              namespace=pluginPfx+"_"+d.idx,
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              wrapper=mCSB_container.parent(),
              mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar .mCSB_draggerContainer");
          mCSB_draggerContainer.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
            touchActive=true;
          }).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
            touchActive=false;
          }).bind("click."+namespace,function(e){
            if($(e.target).hasClass("mCSB_draggerContainer") || $(e.target).hasClass("mCSB_draggerRail")){
              functions._stop($this);
              var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
              if(el.parent(".mCSB_scrollTools_horizontal").length>0){
                if(!d.overflowed[1]){return;}
                var dir="x",
                    clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
                    to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
              }else{
                if(!d.overflowed[0]){return;}
                var dir="y",
                    clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
                    to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
              }
              functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
            }
          });
        },
        /* -------------------- */


        /* 
			FOCUS EVENT
			scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
			*/
        _focus:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              namespace=pluginPfx+"_"+d.idx,
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              wrapper=mCSB_container.parent();
          mCSB_container.bind("focusin."+namespace,function(e){
            var el=$(document.activeElement),
                nested=mCSB_container.find(".mCustomScrollBox").length,
                dur=0;
            if(!el.is(o.advanced.autoScrollOnFocus)){return;}
            functions._stop($this);
            clearTimeout($this[0]._focusTimeout);
            $this[0]._focusTimer=nested ? (dur+17)*nested : 0;
            $this[0]._focusTimeout=setTimeout(function(){
              var	to=[el.offset().top-mCSB_container.offset().top,el.offset().left-mCSB_container.offset().left],
                  contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
                  isVisible=[
                    (contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
                    (contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
                  ],
                  overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
              if(o.axis!=="x" && !isVisible[0]){
                functions._scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
              }
              if(o.axis!=="y" && !isVisible[1]){
                functions._scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
              }
            },$this[0]._focusTimer);
          });
        },
        /* -------------------- */


        /* sets content wrapper scrollTop/scrollLeft always to 0 */
        _wrapperScroll:function(){
          var $this=$(this),d=$this.data(pluginPfx),
              namespace=pluginPfx+"_"+d.idx,
              wrapper=$("#mCSB_"+d.idx+"_container").parent();
          wrapper.bind("scroll."+namespace,function(e){
            wrapper.scrollTop(0).scrollLeft(0);
          });
        },
        /* -------------------- */


        /* 
			BUTTONS EVENTS
			scrolls content via up, down, left and right buttons 
			*/
        _buttons:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
              namespace=pluginPfx+"_"+d.idx,
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              sel=".mCSB_"+d.idx+"_scrollbar",
              btn=$(sel+">a");
          btn.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
            e.preventDefault();
            if(!functions._mouseBtnLeft(e)){return;} /* left mouse button only */
            var btnClass=$(this).attr("class");
            seq.type=o.scrollButtons.scrollType;
            switch(e.type){
              case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
                if(seq.type==="stepped"){return;}
                touchActive=true;
                d.tweenRunning=false;
                _seq("on",btnClass);
                break;
              case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
              case "mouseout": case "pointerout": case "MSPointerOut":
                if(seq.type==="stepped"){return;}
                touchActive=false;
                if(seq.dir){_seq("off",btnClass);}
                break;
              case "click":
                if(seq.type!=="stepped" || d.tweenRunning){return;}
                _seq("on",btnClass);
                break;
            }
            function _seq(a,c){
              seq.scrollAmount=o.snapAmount || o.scrollButtons.scrollAmount;
              functions._sequentialScroll.call(this,$this,a,c);
            }
          });
        },
        /* -------------------- */


        /* 
			KEYBOARD EVENTS
			scrolls content via keyboard 
			Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
			*/
        _keyboard:function(){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
              namespace=pluginPfx+"_"+d.idx,
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              wrapper=mCSB_container.parent(),
              editables="input,textarea,select,datalist,keygen,[contenteditable='true']";
          mCustomScrollBox.attr("tabindex","0").bind("blur."+namespace+" keydown."+namespace+" keyup."+namespace,function(e){
            switch(e.type){
              case "blur":
                if(d.tweenRunning && seq.dir){_seq("off",null);}
                break;
              case "keydown": case "keyup":
                var code=e.keyCode ? e.keyCode : e.which,action="on";
                if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
                  /* up (38), down (40), left (37), right (39) arrows */
                  if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
                  if(e.type==="keyup"){action="off";}
                  if(!$(document.activeElement).is(editables)){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    _seq(action,code);
                  }
                }else if(code===33 || code===34){
                  /* PgUp (33), PgDn (34) */
                  if(d.overflowed[0] || d.overflowed[1]){
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                  if(e.type==="keyup"){
                    functions._stop($this);
                    var keyboardDir=code===34 ? -1 : 1;
                    if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                      var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
                    }else{
                      var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
                    }
                    functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                  }
                }else if(code===35 || code===36){
                  /* End (35), Home (36) */
                  if(!$(document.activeElement).is(editables)){
                    if(d.overflowed[0] || d.overflowed[1]){
                      e.preventDefault();
                      e.stopImmediatePropagation();
                    }
                    if(e.type==="keyup"){
                      if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
                        var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
                      }else{
                        var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
                      }
                      functions._scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
                    }
                  }
                }
                break;
            }
            function _seq(a,c){
              seq.type=o.keyboard.scrollType;
              seq.scrollAmount=o.snapAmount || o.keyboard.scrollAmount;
              if(seq.type==="stepped" && d.tweenRunning){return;}
              functions._sequentialScroll.call(this,$this,a,c);
            }
          });
        },
        /* -------------------- */


        /* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
        _sequentialScroll:function(el,action,trigger){
          var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              once=seq.type==="stepped" ? true : false;
          switch(action){
            case "on":
              seq.dir=[
                (trigger==="mCSB_buttonRight" || trigger==="mCSB_buttonLeft" || trigger===39 || trigger===37 ? "x" : "y"),
                (trigger==="mCSB_buttonUp" || trigger==="mCSB_buttonLeft" || trigger===38 || trigger===37 ? -1 : 1)
              ];
              functions._stop(el);
              if(functions._isNumeric(trigger) && seq.type==="stepped"){return;}
              _start(once);
              break;
            case "off":
              _stop();
              if(once || (d.tweenRunning && seq.dir)){
                _start(true);
              }
              break;
          }
          /* starts sequence */
          function _start(once){
            var c=seq.type!=="stepped", /* continuous scrolling */
                t=!once ? 1000/60 : c ? o.scrollInertia/1.5 : o.scrollInertia, /* timer */
                  m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
                  contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
                  ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
                  amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
                  px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
                  to=seq.scrollAmount!=="auto" ? px : amount,
                  easing=!once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
                  onComplete=!once ? false : true;
            if(once && t<17){
              to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
            }
            functions._scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
            if(once){
              seq.dir=false;
              return;
            }
            clearTimeout(seq.step);
            seq.step=setTimeout(function(){
              _start();
            },t);
          }
          /* stops sequence */
          function _stop(){
            clearTimeout(seq.step);
            functions._stop(el);
          }
        },
        /* -------------------- */


        /* returns a yx array from value */
        _arr:function(val){
          var o=$(this).data(pluginPfx).opt,vals=[];
          if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
          /* check if value is object or array, its length and create an array with yx values */
          if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
            vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
            vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
          }else{ /* array value (e.g. [100,100]) */
            vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
          }
          /* check if array values are anonymous functions */
          if(typeof vals[0]==="function"){vals[0]=vals[0]();}
          if(typeof vals[1]==="function"){vals[1]=vals[1]();}
          return vals;
        },
        /* -------------------- */


        /* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
        _to:function(val,dir){
          if(val==null || typeof val=="undefined"){return;}
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              wrapper=mCSB_container.parent(),
              t=typeof val;
          if(!dir){dir=o.axis==="x" ? "x" : "y";}
          var contentLength=dir==="x" ? mCSB_container.outerWidth(false) : mCSB_container.outerHeight(false),
              contentOffset=dir==="x" ? mCSB_container.offset().left : mCSB_container.offset().top,
              contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
              cssProp=dir==="x" ? "left" : "top";
          switch(t){
            case "function": /* this currently is not used. Consider removing it */
              return val();
              break;
            case "object":
              if(val.nodeType){ /* DOM */
                var objOffset=dir==="x" ? $(val).offset().left : $(val).offset().top;
              }else if(val.jquery){ /* jquery object */
                if(!val.length){return;}
                var objOffset=dir==="x" ? val.offset().left : val.offset().top;
              }
              return objOffset-contentOffset;
              break;
            case "string": case "number":
              if(functions._isNumeric.call(null,val)){ /* numeric value */
                return Math.abs(val);
              }else if(val.indexOf("%")!==-1){ /* percentage value */
                return Math.abs(contentLength*parseInt(val)/100);
              }else if(val.indexOf("-=")!==-1){ /* decrease value */
                return Math.abs(contentPos-parseInt(val.split("-=")[1]));
              }else if(val.indexOf("+=")!==-1){ /* inrease value */
                var p=(contentPos+parseInt(val.split("+=")[1]));
                return p>=0 ? 0 : Math.abs(p);
              }else if(val.indexOf("px")!==-1 && functions._isNumeric.call(null,val.split("px")[0])){ /* pixels string value (e.g. "100px") */
                return Math.abs(val.split("px")[0]);
              }else{
                if(val==="top" || val==="left"){ /* special strings */
                  return 0;
                }else if(val==="bottom"){
                  return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
                }else if(val==="right"){
                  return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
                }else if(val==="first" || val==="last"){
                  var obj=mCSB_container.find(":"+val),
                      objOffset=dir==="x" ? $(obj).offset().left : $(obj).offset().top;
                  return objOffset-contentOffset;
                }else{
                  if($(val).length){ /* jquery selector */
                    var objOffset=dir==="x" ? $(val).offset().left : $(val).offset().top;
                    return objOffset-contentOffset;
                  }else{ /* other values (e.g. "100em") */
                    mCSB_container.css(cssProp,val);
                    methods.update.call(null,$this[0]);
                    return;
                  }
                }
              }
              break;
          }
        },
        /* -------------------- */


        /* calls the update method automatically */
        _autoUpdate:function(rem){
          var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
              mCSB_container=$("#mCSB_"+d.idx+"_container");
          if(rem){
            /* 
					removes autoUpdate timer 
					usage: functions._autoUpdate.call(this,"remove");
					*/
            clearTimeout(mCSB_container[0].autoUpdate);
            functions._delete.call(null,mCSB_container[0].autoUpdate);
            return;
          }
          var	wrapper=mCSB_container.parent(),
              scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
              scrollbarSize=function(){return [
                scrollbar[0].is(":visible") ? scrollbar[0].outerHeight(true) : 0, /* returns y-scrollbar height */
                scrollbar[1].is(":visible") ? scrollbar[1].outerWidth(true) : 0 /* returns x-scrollbar width */
              ]},
              oldSelSize=sizesSum(),newSelSize,
              os=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]],ns,
              oldImgsLen=imgSum(),newImgsLen;
          upd();
          function upd(){
            clearTimeout(mCSB_container[0].autoUpdate);
            mCSB_container[0].autoUpdate=setTimeout(function(){
              /* update on specific selector(s) length and size change */
              if(o.advanced.updateOnSelectorChange){
                newSelSize=sizesSum();
                if(newSelSize!==oldSelSize){
                  doUpd();
                  oldSelSize=newSelSize;
                  return;
                }
              }
              /* update on main element and scrollbar size changes */
              if(o.advanced.updateOnContentResize){
                ns=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]];
                if(ns[0]!==os[0] || ns[1]!==os[1] || ns[2]!==os[2] || ns[3]!==os[3] || ns[4]!==os[4] || ns[5]!==os[5]){
                  doUpd();
                  os=ns;
                }
              }
              /* update on image load */
              if(o.advanced.updateOnImageLoad){
                newImgsLen=imgSum();
                if(newImgsLen!==oldImgsLen){
                  mCSB_container.find("img").each(function(){
                    imgLoader(this.src);
                  });
                  oldImgsLen=newImgsLen;
                }
              }
              if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
            },60);
          }
          /* returns images amount */
          function imgSum(){
            var total=0
            if(o.advanced.updateOnImageLoad){total=mCSB_container.find("img").length;}
            return total;
          }
          /* a tiny image loader */
          function imgLoader(src){
            var img=new Image();
            function createDelegate(contextObject,delegateMethod){
              return function(){return delegateMethod.apply(contextObject,arguments);}
            }
            function imgOnLoad(){
              this.onload=null;
              doUpd();
            }
            img.onload=createDelegate(img,imgOnLoad);
            img.src=src;
          }
          /* returns the total height and width sum of all elements matching the selector */
          function sizesSum(){
            if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
            var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
            if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=$(this).height()+$(this).width();});}
            return total;
          }
          /* calls the update method */
          function doUpd(){
            clearTimeout(mCSB_container[0].autoUpdate); 
            methods.update.call(null,$this[0]);
          }
        },
        /* -------------------- */


        /* snaps scrolling to a multiple of a pixels number */
        _snapAmount:function(to,amount,offset){
          return (Math.round(to/amount)*amount-offset); 
        },
        /* -------------------- */


        /* stops content and scrollbar animations */
        _stop:function(el){
          var d=el.data(pluginPfx),
              sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
          sel.each(function(){
            functions._stopTween.call(this);
          });
        },
        /* -------------------- */


        /* 
			ANIMATES CONTENT 
			This is where the actual scrolling happens
			*/
        _scrollTo:function(el,to,options){
          var d=el.data(pluginPfx),o=d.opt,
              defaults={
                trigger:"internal",
                dir:"y",
                scrollEasing:"mcsEaseOut",
                drag:false,
                dur:o.scrollInertia,
                overwrite:"all",
                callbacks:true,
                onStart:true,
                onUpdate:true,
                onComplete:true
              },
              options=$.extend(defaults,options),
              dur=[options.dur,(options.drag ? 0 : options.dur)],
              mCustomScrollBox=$("#mCSB_"+d.idx),
              mCSB_container=$("#mCSB_"+d.idx+"_container"),
              totalScrollOffsets=o.callbacks.onTotalScrollOffset ? functions._arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
              totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? functions._arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
          d.trigger=options.trigger;
          if(o.snapAmount){to=functions._snapAmount(to,o.snapAmount,o.snapOffset);} /* scrolling snapping */
          switch(options.dir){
            case "x":
              var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
                  property="left",
                  contentPos=mCSB_container[0].offsetLeft,
                  limit=[
                    mCustomScrollBox.width()-mCSB_container.outerWidth(false),
                    mCSB_dragger.parent().width()-mCSB_dragger.width()
                  ],
                  scrollTo=[to,(to/d.scrollRatio.x)],
                  tso=totalScrollOffsets[1],
                  tsbo=totalScrollBackOffsets[1],
                  totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
                  totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
              break;
            case "y":
              var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
                  property="top",
                  contentPos=mCSB_container[0].offsetTop,
                  limit=[
                    mCustomScrollBox.height()-mCSB_container.outerHeight(false),
                    mCSB_dragger.parent().height()-mCSB_dragger.height()
                  ],
                  scrollTo=[to,(to/d.scrollRatio.y)],
                  tso=totalScrollOffsets[0],
                  tsbo=totalScrollBackOffsets[0],
                  totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
                  totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
              break;
          }
          if(scrollTo[1]<0){
            scrollTo=[0,0];
          }else if(scrollTo[1]>=limit[1]){
            scrollTo=[limit[0],limit[1]];
          }else{
            scrollTo[0]=-scrollTo[0];
          }
          clearTimeout(mCSB_container[0].onCompleteTimeout);
          if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
          functions._tweenTo.call(null,mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
          functions._tweenTo.call(null,mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
            onStart:function(){
              if(options.callbacks && options.onStart && !d.tweenRunning){
                /* callbacks: onScrollStart */
                if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
                d.tweenRunning=true;
                functions._onDragClasses(mCSB_dragger);
                d.cbOffsets=_cbOffsets();
              }
            },onUpdate:function(){
              if(options.callbacks && options.onUpdate){
                /* callbacks: whileScrolling */
                if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
              }
            },onComplete:function(){
              if(options.callbacks && options.onComplete){
                if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
                var t=mCSB_container[0].idleTimer || 0;
                mCSB_container[0].onCompleteTimeout=setTimeout(function(){
                  /* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
                  if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
                  if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
                  if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
                  d.tweenRunning=false;
                  mCSB_container[0].idleTimer=0;
                  functions._onDragClasses(mCSB_dragger,"hide");
                },t);
              }
            }
          });
          /* checks if callback function exists */
          function _cb(cb){
            return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
          }
          /* checks whether callback offsets always trigger */
          function _cbOffsets(){
            return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
          }
          /* 
				populates object with useful values for the user 
				values: 
					content: this.mcs.content
					content top position: this.mcs.top 
					content left position: this.mcs.left 
					dragger top position: this.mcs.draggerTop 
					dragger left position: this.mcs.draggerLeft 
					scrolling y percentage: this.mcs.topPct 
					scrolling x percentage: this.mcs.leftPct 
					scrolling direction: this.mcs.direction
				*/
          function _mcs(){
            var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
                dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
                cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
                pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
            el[0].mcs={
              content:mCSB_container, /* original content wrapper as jquery object */
              top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
              topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
              direction:options.dir
            };
            /* 
					this refers to the original element containing the scrollbar(s)
					usage: this.mcs.top, this.mcs.leftPct etc. 
					*/
          }
        },
        /* -------------------- */


        /* 
			CUSTOM JAVASCRIPT ANIMATION TWEEN 
			Lighter and faster than jquery animate() and css transitions 
			Animates top/left properties and includes easings 
			*/
        _tweenTo:function(el,prop,to,duration,easing,overwrite,callbacks){
          var callbacks=callbacks || {},
              onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
              startTime=functions._getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style;
          if(prop==="left"){from=el.offsetLeft;}
          var diff=to-from;
          el._mcsstop=0;
          if(overwrite!=="none"){_cancelTween();}
          _startTween();
          function _step(){
            if(el._mcsstop){return;}
            if(!progress){onStart.call();}
            progress=functions._getTime()-startTime;
            _tween();
            if(progress>=el._mcstime){
              el._mcstime=(progress>el._mcstime) ? progress+_delay-(progress- el._mcstime) : progress+_delay-1;
              if(el._mcstime<progress+1){el._mcstime=progress+1;}
            }
            if(el._mcstime<duration){el._mcsid=_request(_step);}else{onComplete.call();}
          }
          function _tween(){
            if(duration>0){
              el._mcscurrVal=_ease(el._mcstime,from,diff,duration,easing);
              elStyle[prop]=Math.round(el._mcscurrVal)+"px";
            }else{
              elStyle[prop]=to+"px";
            }
            onUpdate.call();
          }
          function _startTween(){
            _delay=1000/60;
            el._mcstime=progress+_delay;
            _request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
            el._mcsid=_request(_step);
          }
          function _cancelTween(){
            if(el._mcsid==null){return;}
            if(!window.requestAnimationFrame){clearTimeout(el._mcsid);
                                             }else{window.cancelAnimationFrame(el._mcsid);}
            el._mcsid=null;
          }
          function _ease(t,b,c,d,type){
            switch(type){
              case "linear": case "mcsLinear":
                return c*t/d + b;
                break;
              case "mcsLinearOut":
                t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
                break;
              case "easeInOutSmooth":
                t/=d/2;
                if(t<1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
                break;
              case "easeInOutStrong":
                t/=d/2;
                if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
                t--;
                return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
                break;
              case "easeInOut": case "mcsEaseInOut":
                t/=d/2;
                if(t<1) return c/2*t*t*t + b;
                t-=2;
                return c/2*(t*t*t + 2) + b;
                break;
              case "easeOutSmooth":
                t/=d; t--;
                return -c * (t*t*t*t - 1) + b;
                break;
              case "easeOutStrong":
                return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
                break;
              case "easeOut": case "mcsEaseOut": default:
                var ts=(t/=d)*t,tc=ts*t;
                return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
            }
          }
        },
        /* -------------------- */


        /* returns current time */
        _getTime:function(){
          if(window.performance && window.performance.now){
            return window.performance.now();
          }else{
            if(window.performance && window.performance.webkitNow){
              return window.performance.webkitNow();
            }else{
              if(Date.now){return Date.now();}else{return new Date().getTime();}
            }
          }
        },
        /* -------------------- */


        /* stops a tween */
        _stopTween:function(){
          var el=this;
          if(el._mcsid==null){return;}
          if(!window.requestAnimationFrame){clearTimeout(el._mcsid);
                                           }else{window.cancelAnimationFrame(el._mcsid);}
          el._mcsid=null;
          el._mcsstop=1;
        },
        /* -------------------- */


        /* deletes a property (avoiding the exception thrown by IE) */
        _delete:function(p){
          try{delete p;}catch(e){p=null;}
        },
        /* -------------------- */


        /* detects left mouse button */
        _mouseBtnLeft:function(e){
          return !(e.which && e.which!==1);
        },
        /* -------------------- */


        /* detects if pointer type event is touch */
        _pointerTouch:function(e){
          var t=e.originalEvent.pointerType;
          return !(t && t!=="touch" && t!==2);
        },
        /* -------------------- */


        /* checks if value is numeric */
        _isNumeric:function(val){
          return !isNaN(parseFloat(val)) && isFinite(val);
        }
        /* -------------------- */

      };





  /* 
	----------------------------------------
	PLUGIN SETUP 
	----------------------------------------
	*/

  /* plugin constructor functions */
  $.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
    if(methods[method]){
      return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
    }else if(typeof method==="object" || !method){
      return methods.init.apply(this,arguments);
    }else{
      $.error("Method "+method+" does not exist");
    }
  };
  $[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
    if(methods[method]){
      return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
    }else if(typeof method==="object" || !method){
      return methods.init.apply(this,arguments);
    }else{
      $.error("Method "+method+" does not exist");
    }
  };

  /* 
	allow setting plugin default options. 
	usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
	to apply any changed default options on default selectors (below), use inside document ready fn 
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
  $[pluginNS].defaults=defaults;

  /* 
	add window object (window.mCustomScrollbar) 
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
  window[pluginNS]=true;

  $(window).load(function(){
    $(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
  });

})(jQuery,window,document);;/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS style for Browserify
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
      toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
      ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
      slice  = Array.prototype.slice,
      nullLowestDeltaTimeout, lowestDelta;

  if ( $.event.fixHooks ) {
    for ( var i = toFix.length; i; ) {
      $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
    }
  }

  var special = $.event.special.mousewheel = {
    version: '3.1.11',

    setup: function() {
      if ( this.addEventListener ) {
        for ( var i = toBind.length; i; ) {
          this.addEventListener( toBind[--i], handler, false );
        }
      } else {
        this.onmousewheel = handler;
      }
      // Store the line height and page height for this particular element
      $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
      $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
    },

    teardown: function() {
      if ( this.removeEventListener ) {
        for ( var i = toBind.length; i; ) {
          this.removeEventListener( toBind[--i], handler, false );
        }
      } else {
        this.onmousewheel = null;
      }
      // Clean up the data we added to the element
      $.removeData(this, 'mousewheel-line-height');
      $.removeData(this, 'mousewheel-page-height');
    },

    getLineHeight: function(elem) {
      var $parent = $(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
      if (!$parent.length) {
        $parent = $('body');
      }
      return parseInt($parent.css('fontSize'), 10);
    },

    getPageHeight: function(elem) {
      return $(elem).height();
    },

    settings: {
      adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
      normalizeOffset: true  // calls getBoundingClientRect for each event
    }
  };

  $.fn.extend({
    mousewheel: function(fn) {
      return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
    },

    unmousewheel: function(fn) {
      return this.unbind('mousewheel', fn);
    }
  });


  function handler(event) {
    var orgEvent   = event || window.event,
        args       = slice.call(arguments, 1),
        delta      = 0,
        deltaX     = 0,
        deltaY     = 0,
        absDelta   = 0,
        offsetX    = 0,
        offsetY    = 0;
    event = $.event.fix(orgEvent);
    event.type = 'mousewheel';

    // Old school scrollwheel delta
    if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
    if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
    if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
    if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

    // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
    if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
      deltaX = deltaY * -1;
      deltaY = 0;
    }

    // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
    delta = deltaY === 0 ? deltaX : deltaY;

    // New school wheel delta (wheel event)
    if ( 'deltaY' in orgEvent ) {
      deltaY = orgEvent.deltaY * -1;
      delta  = deltaY;
    }
    if ( 'deltaX' in orgEvent ) {
      deltaX = orgEvent.deltaX;
      if ( deltaY === 0 ) { delta  = deltaX * -1; }
    }

    // No change actually happened, no reason to go any further
    if ( deltaY === 0 && deltaX === 0 ) { return; }

    // Need to convert lines and pages to pixels if we aren't already in pixels
    // There are three delta modes:
    //   * deltaMode 0 is by pixels, nothing to do
    //   * deltaMode 1 is by lines
    //   * deltaMode 2 is by pages
    if ( orgEvent.deltaMode === 1 ) {
      var lineHeight = $.data(this, 'mousewheel-line-height');
      delta  *= lineHeight;
      deltaY *= lineHeight;
      deltaX *= lineHeight;
    } else if ( orgEvent.deltaMode === 2 ) {
      var pageHeight = $.data(this, 'mousewheel-page-height');
      delta  *= pageHeight;
      deltaY *= pageHeight;
      deltaX *= pageHeight;
    }

    // Store lowest absolute delta to normalize the delta values
    absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

    if ( !lowestDelta || absDelta < lowestDelta ) {
      lowestDelta = absDelta;

      // Adjust older deltas if necessary
      if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
        lowestDelta /= 40;
      }
    }

    // Adjust older deltas if necessary
    if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
      // Divide all the things by 40!
      delta  /= 40;
      deltaX /= 40;
      deltaY /= 40;
    }

    // Get a whole, normalized value for the deltas
    delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
    deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
    deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

    // Normalise offsetX and offsetY properties
    if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
      var boundingRect = this.getBoundingClientRect();
      offsetX = event.clientX - boundingRect.left;
      offsetY = event.clientY - boundingRect.top;
    }

    // Add information to the event object
    event.deltaX = deltaX;
    event.deltaY = deltaY;
    event.deltaFactor = lowestDelta;
    event.offsetX = offsetX;
    event.offsetY = offsetY;
    // Go ahead and set deltaMode to 0 since we converted to pixels
    // Although this is a little odd since we overwrite the deltaX/Y
    // properties with normalized deltas.
    event.deltaMode = 0;

    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);

    // Clearout lowestDelta after sometime to better
    // handle multiple device types that give different
    // a different lowestDelta
    // Ex: trackpad = 3 and mouse wheel = 120
    if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
    nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

    return ($.event.dispatch || $.event.handle).apply(this, args);
  }

  function nullLowestDelta() {
    lowestDelta = null;
  }

  function shouldAdjustOldDeltas(orgEvent, absDelta) {
    // If this is an older event and the delta is divisable by 120,
    // then we are assuming that the browser is treating this as an
    // older mouse wheel event and that we should divide the deltas
    // by 40 to try and get a more usable deltaFactor.
    // Side note, this actually impacts the reported scroll distance
    // in older browsers and can cause scrolling to be slower than native.
    // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
    return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
  }

}));;/* ОЧЕНЬ красивый выпадающий список
    Параметры:
    topList : false - если тру то список выпадает вверх
    firstTitle: '' - если задано, то будет отображаться в заголовке списка
                       так же у селекта может быть data-title, которая отображается
                       только в самый первый раз
    theme: '' - класс добавляемый к обертке
    scrollbarTheme: 'blue' - тема для кастомного скроллбара
    afterChange : function() {} - колбеки 
    afterClose : function() {} - колбеки
    afterOpen : function() {} - колбеки

    Так же формируются события:
    niceClose
    niceOpen
    niceChange

*/
(function ($) {
  $.niceSelect = function(elem, opt) {
    var $this = this
    ,context = ''
    ,el = {}
    ,options = {}
    ,customScrollFlag = false;

    init(elem, opt);

    function closeSelect() {
      context.removeClass('_active');
      options.afterClose();
      $(window).trigger('niceClose');
    }

    function openSelect() {
      context.addClass('_active');
      options.afterOpen();
      $(window).trigger('niceOpen');
    }

    function setNewValue(newVal) {
      el.hiddenSelect.val(newVal);
      context.data('val', newVal);
    }

    function customScrollUpdate(elem) {
      elem.mCustomScrollbar('destroy');
      elem.mCustomScrollbar({
        theme: options.scrollbarTheme
      });
      customScrollFlag = true;
    }

    function renderSelect($elem) {
      var modClass = {
        'top' : ''
        ,'disabled' : ''
      }
      ,selectedOpt
      ,noSelected = false
      ,selectName = $elem.data('title') || '';

      $elem.hide();

      if (options.topList) modClass.top = '_top';
      if ($elem.hasClass('_disabled')) modClass.disabled = '_disabled';

      // Создаем обертку вокруг селекта
      context = $elem
        .wrap('<div class="nice-select '+modClass.top+' '+options.theme+' '+modClass.disabled+'" data-name="'+$elem.attr('name')+'" data-val=""></div>')
        .closest('.nice-select')
        .prepend('<div class="nice-select__inner js-nice-select__inner">'+
                 '<ul class="nice-select-list js-nice-select-list"></ul>'+
                 '</div>');

      // Первые элементы: внутрянка обертки и список
      el = {
        'selectInner' : $('.js-nice-select__inner', context)
        ,'selectList' : $('.js-nice-select-list', context)
        ,'hiddenSelect' : $elem
      }

      // Заполняем списков из опшинов
      $elem.find('option').each(function(index) {
        var $that = $(this)
        ,val = $that.val()
        ,html = $that.html()
        ,activeClass = ''
        ,newItem;

        // Если есть selected то добавляем активный класс к li
        // и записываем этот опшин в переменную для дальнейших действий
        if ($that.attr('selected')) {
          selectedOpt = $that;
          activeClass = 'class="_active"';
        } else {
          activeClass = '';
        }

        newItem = '<li '+activeClass+' data-val="'+val+'"><span>'+html+'</span></li>';

        el.selectList.append(newItem)
      });
      el.selectItem = $('.js-nice-select__inner li', context)

      // Если не было у опшинов selected то добавляем активный класс к
      // первому li
      if (selectedOpt === undefined) {
        noSelected = true;
        selectedOpt = $elem.find('option');
        el.selectItem.eq(0).addClass('_active');
      }

      // Делаем кнопку с выбранным элементом из списка
      var titleHtml = selectedOpt.html()
      titleVal = selectedOpt.val();

      // Если заголовок не пункт селекта, а заданный пользователем,
      // то показываем все li
      if (options.firstTitle !== '' && noSelected) {
        el.selectItem.removeClass('_active');
        titleHtml = options.firstTitle;
        titleVal = '';
      } 

      // Если задано ПЕРВЫЙ тайтл для селекта
      if (selectName !== '') {
        el.selectItem.removeClass('_active');
        titleHtml = selectName;
        titleVal = '';
      }

      context.prepend('<h6 class="nice-select-head js-nice-head" data-val="'+titleVal+'"><span>'+titleHtml+'</span></h6>')
      el.selectBtn = $('.js-nice-head', context);
      el.selectBtn.attr('title', $('.js-nice-head SPAN', context).html())
      el.selectHeadInner = $('.js-nice-head SPAN', context);
    }

    function init($element, opt) {
      var defaults = {
        'topList' : false
        ,'firstTitle': ''
        ,'theme': ''
        ,'scrollbarTheme': 'blue'
        ,'afterChange' : function() {}
        ,'afterClose' : function() {}
        ,'afterOpen' : function() {}
      };

      options = $.extend(defaults, opt);

      renderSelect($element);

      el.selectBtn.on('click', selectBtnClick);
      el.selectItem.on('click', selectItemClick);

      $(document).on('click', function(event){
        var $et = $(event.target);
        if (!$et.closest(context).length) {
          closeSelect();
        }
      });

      function selectBtnClick(e) {
        var $that = $(this);

        if (context.hasClass('_active')) {
          closeSelect();
        } else {
          openSelect();
        }

        if (!customScrollFlag) customScrollUpdate(el.selectList);
      }

      function selectItemClick() {
        var $that = $(this)
        ,ctx = $that.closest('.js-nice-select')
        ,innerItem = $that.find('span').html()
        ,newVal = $that.data('val')

        // if ($that.hasClass('_active')) return;

        $that.addClass('_active').siblings('li').removeClass('_active');


        // if (options.firstTitle == '' && $that.index() == 0) {
        //     context.removeClass('_checked');
        // } else {
        //     context.addClass('_checked');
        // }

        context.addClass('_checked');

        el.selectBtn.attr('title', innerItem)
        el.selectHeadInner.html(innerItem);
        setNewValue(newVal);

        options.afterChange($that);

        $(window).trigger('niceChange');

        closeSelect();
      }   

    }

    $this.closeSelect = function() {
      closeSelect();
    }

    return $this;
  };

  $.fn.niceSelect = function(options){
    return this.each(function(){
      var np = new $.niceSelect($(this), options);
    });
  };

})(jQuery);;/*! http://mths.be/placeholder v2.0.8 by @mathias */
;(function(window, document, $) {

  // Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
        .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
        .not('.placeholder')
        .bind({
        'focus.placeholder': clearPlaceholder,
        'blur.placeholder': setPlaceholder
      })
        .data('placeholder-enabled', true)
        .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }

        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != safeActiveElement()) {
            // We can't use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
      // Look for forms
      $(document).delegate('form', 'submit.placeholder', function() {
        // Clear the placeholder values so they don't get submitted
        var $inputs = $('.placeholder', this).each(clearPlaceholder);
        setTimeout(function() {
          $inputs.each(setPlaceholder);
        }, 10);
      });
    });

    // Clear placeholder values upon page reload
    $(window).bind('beforeunload.placeholder', function() {
      $('.placeholder').each(function() {
        this.value = '';
      });
    });

  }

  function args(elem) {
    // Return an object of element attributes
    var newAttrs = {};
    var rinlinejQuery = /^jQuery\d+$/;
    $.each(elem.attributes, function(i, attr) {
      if (attr.specified && !rinlinejQuery.test(attr.name)) {
        newAttrs[attr.name] = attr.value;
      }
    });
    return newAttrs;
  }

  function clearPlaceholder(event, value) {
    var input = this;
    var $input = $(input);
    if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
      if ($input.data('placeholder-password')) {
        $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
        // If `clearPlaceholder` was called from `$.valHooks.input.set`
        if (event === true) {
          return $input[0].value = value;
        }
        $input.focus();
      } else {
        input.value = '';
        $input.removeClass('placeholder');
        input == safeActiveElement() && input.select();
      }
    }
  }

  function setPlaceholder() {
    var $replacement;
    var input = this;
    var $input = $(input);
    var id = this.id;
    if (input.value == '') {
      if (input.type == 'password') {
        if (!$input.data('placeholder-textinput')) {
          try {
            $replacement = $input.clone().attr({ 'type': 'text' });
          } catch(e) {
            $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
          }
          $replacement
            .removeAttr('name')
            .data({
            'placeholder-password': $input,
            'placeholder-id': id
          })
            .bind('focus.placeholder', clearPlaceholder);
          $input
            .data({
            'placeholder-textinput': $replacement,
            'placeholder-id': id
          })
            .before($replacement);
        }
        $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
        // Note: `$input[0] != input` now!
      }
      $input.addClass('placeholder');
      $input[0].value = $input.attr('placeholder');
    } else {
      $input.removeClass('placeholder');
    }
  }

  function safeActiveElement() {
    // Avoid IE9 `document.activeElement` of death
    // https://github.com/mathiasbynens/jquery-placeholder/pull/99
    try {
      return document.activeElement;
    } catch (exception) {}
  }

}(this, document, jQuery));
;/**
          @@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@          @@@@@@@@
  @@@@@@@                @@@@@@@
 @@@@@@@                  @@@@@@@
 @@@@@@@                  @@@@@@@
 @@@@@@@@     @          @@@@@@@@
  @@@@@@@@@  @@@       @@@@@@@@@
   @@@@@@@@@@@@@@   @@@@@@@@@@@
     @@@@@@@@@@@@@    @@@@@@@
       @@@@@@@@@@@@     @@@
          @@@@@@
         @@@@
        @@
 *
 * jQuery Reel
 * ===========
 * The 360° plugin for jQuery
 *
 * @license Copyright (c) 2009-2013 Petr Vostrel (http://petr.vostrel.cz/)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * jQuery Reel
 * http://reel360.org
 * Version: 1.3.0
 * Updated: 2013-11-04
 *
 * Requires jQuery 1.6.2 or higher
 */

/*
 * CDN
 * ---
 * - http://code.vostrel.net/jquery.reel-bundle.js (recommended)
 * - http://code.vostrel.net/jquery.reel.js
 * - http://code.vostrel.net/jquery.reel-debug.js
 * - or http://code.vostrel.net/jquery.reel-edge.js if you feel like it ;)
 *
 * Optional Plugins
 * ----------------
 * - jQuery.mouseWheel [B] (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 *
 * [B] Marked plugins are contained (with permissions) in the "bundle" version from the CDN
 */

(function(factory){

  // -----------------------
  // [NEW] AMD Compatibility
  // -----------------------
  //
  // Reel registers as an asynchronous module with dependency on jQuery for [AMD][1] compatible script loaders.
  // Besides that it also complies with [CommonJS][2] module definition for Node and such.
  // Of course, no fancy script loader is necessary and good old plain script tag still works too.
  //
  // [1]:http://en.wikipedia.org/wiki/Asynchronous_module_definition
  // [2]:http://en.wikipedia.org/wiki/CommonJS
  //
  var
  amd= typeof define == 'function' && define.amd && (define(['jquery'], factory) || true),
      commonjs= !amd && typeof module == 'object' && typeof module.exports == 'object' && (module.exports= factory),
      plain= !amd && !commonjs && factory()

  })(function(){ return jQuery.reel || (function($, window, document, undefined){

  // ------
  // jQuery
  // ------
  //
  // One vital requirement is the correct jQuery. Reel requires at least version 1.6.2
  // and a make sure check is made at the very beginning.
  //
  if (!$) return;
  var
  version= $ && $().jquery.split(/\./)
  if (!version || +(twochar(version[0])+twochar(version[1])+twochar(version[2] || '')) < 10602)
    return error('Too old jQuery library. Please upgrade your jQuery to version 1.6.2 or higher');
  // ----------------
  // Global Namespace
  // ----------------
  //
  // `$.reel` (or `jQuery.reel`) namespace is provided for storage of all Reel belongings.
  // It is locally referenced as just `reel` for speedier access.
  //
  var
  reel= $.reel= {

    // ### `$.reel.version`
    //
    // `String` (major.minor.patch), since 1.1
    //
    version: '1.3.0',

    // Options
    // -------
    //
    // When calling `.reel()` method you have plenty of options (far too many) available.
    // You collect them into one hash and supply them with your call.
    //
    // _**Example:** Initiate a non-looping Reel with 12 frames:_
    //
    //     .reel({
    //       frames: 12,
    //       looping: false
    //     })
    //
    //
    // All options are optional and if omitted, default value is used instead.
    // Defaults are being housed as members of `$.reel.def` hash.
    // If you customize any default value therein, all subsequent `.reel()` calls
    // will use the new value as default.
    //
    // _**Example:** Change default initial frame to 5th:_
    //
    //     $.reel.def.frame = 5
    //
    // ---

    // ### `$.reel.def` ######
    // `Object`, since 1.1
    //
    def: {
      //
      // ### Basic Definition ######
      //
      // Reel is just fine with you not setting any options, however if you don't have
      // 36 frames or beginning at frame 1, you will want to set total number
      // of `frames` and pick a different starting `frame`.
      //
      // ---

      // #### `frame` Option ####
      // `Number` (frames), since 1.0
      //
      frame:                  1,

      // #### `frames` Option ####
      // `Number` (frames), since 1.0
      //
      frames:                36,

      // ~~~
      //
      // Another common characteristics of any Reel is whether it `loops` and covers
      // entire 360° or not.
      //
      // ---

      // #### `loops` Option ####
      // `Boolean`, since 1.0
      //
      loops:               true,


      // ### Interaction ######
      //
      // Using boolean switches many user interaction aspects can be turned on and off.
      // You can disable the mouse wheel control with `wheelable`, the drag & throw
      // action with `throwable`, disallow the dragging completely with `draggable`,
      // on touch devices you can disable the browser's decision to scroll the page
      // instead of Reel script and you can of course disable the stepping of Reel by
      // clicking on either half of the image with `steppable`.
      //
      // You can even enable `clickfree` operation,
      // which will cause Reel to bind to mouse enter/leave events instead of mouse down/up,
      // thus allowing a click-free dragging.
      //
      // ---

      // #### `clickfree` Option ####
      // `Boolean`, since 1.1
      //
      clickfree:          false,

      // #### `draggable` Option ####
      // `Boolean`, since 1.1
      //
      draggable:           true,

      // #### `scrollable` Option ####
      // `Boolean`, since 1.2
      //
      scrollable:          true,

      // #### `steppable` Option ####
      // `Boolean`, since 1.2
      //
      steppable:           true,

      // #### `throwable` Option ####
      // `Boolean`, since 1.1; or `Number`, since 1.2.1
      //
      throwable:           true,

      // #### `wheelable` Option ####
      // `Boolean`, since 1.1
      //
      wheelable:           true,


      // ### [NEW] Gyroscope Support ######
      //
      // When enabled allows gyro-enabled devices (iPad2 for example) to control rotational
      // position using the device's attitude in space. In this more, Reel directly maps the
      // 360° range of your gyro's primary (alpha) axis directly to the value of `fraction`.
      //
      // #### `orientable` Option ####
      // [NEW] `Boolean`, since 1.3
      //
      orientable:         false,


      // ### Order of Images ######
      //
      // Reel presumes counter-clockwise order of the pictures taken. If the nearer facing
      // side doesn't follow your cursor/finger, you did clockwise. Use the `cw` option to
      // correct this.
      //
      // ---

      // #### `cw` Option ####
      // `Boolean`, since 1.1
      //
      cw:                 false,


      // ### Sensitivity ######
      //
      // In Reel sensitivity is set through the `revolution` parameter, which represents horizontal
      // dragging distance one must cover to perform one full revolution. By default this value
      // is calculated based on the setup you have - it is either twice the width of the image
      // or half the width of stitched panorama. You may also set your own.
      //
      // Optionally `revolution` can be set as an Object with `x` member for horizontal revolution
      // and/or `y` member for vertical revolution in multi-row movies.
      //
      // ---

      // #### `revolution` Option ####
      // `Number` (pixels) or `Object`, since 1.1, `Object` support since 1.2
      //
      revolution:     undefined,


      // ### Rectilinear Panorama ######
      //
      // The easiest of all is the stitched panorama mode. For this mode, instead of the sprite,
      // a single seamlessly stitched stretched image is used and the view scrolls the image.
      // This mode is triggered by setting a pixel width of the `stitched` image.
      //
      // ---

      // #### `stitched` Option ####
      // `Number` (pixels), since 1.0
      //
      stitched:               0,


      // ### Directional Mode ######
      //
      // As you may have noticed on Reel's homepage or in [`example/object-movie-directional-sprite`][1]
      // when you drag the arrow will point to either direction. In such `directional` mode, the sprite
      // is actually 2 in 1 - one file contains two sprites one tightly following the other, one
      // for visually going one way (`A`) and one for the other (`B`).
      //
      //     A01 A02 A03 A04 A05 A06
      //     A07 A08 A09 A10 A11 A12
      //     A13 A14 A15 B01 B02 B03
      //     B04 B05 B06 B07 B08 B09
      //     B10 B11 B12 B13 B14 B15
      //
      // Switching between `A` and `B` frames is based on direction of the drag. Directional mode isn't
      // limited to sprites only, sequences also apply. The figure below shows the very same setup like
      // the above figure, only translated into actual frames of the sequence.
      //
      //     001 002 003 004 005 006
      //     007 008 009 010 011 012
      //     013 014 015 016 017 018
      //     019 020 021 022 023 024
      //     025 026 027 028 029 030
      //
      // Frame `016` represents the `B01` so it actually is first frame of the other direction.
      //
      // [1]:../example/object-movie-directional-sprite/
      //
      // ---

      // #### `directional` Option ####
      // `Boolean`, since 1.1
      //
      directional:        false,


      // ### Multi-Row Mode ######
      //
      // As [`example/object-movie-multirow-sequence`][1] very nicely demonstrates, in multi-row arrangement
      // you can perform two-axis manipulation allowing you to add one or more vertical angles. Think of it as
      // a layered cake, each new elevation of the camera during shooting creates one layer of the cake -
      // - a _row_. One plain horizontal object movie full spin is one row:
      //
      //     A01 A02 A03 A04 A05 A06
      //     A07 A08 A09 A10 A11 A12
      //     A13 A14 A15
      //
      // Second row tightly follows after the first one:
      //
      //     A01 A02 A03 A04 A05 A06
      //     A07 A08 A09 A10 A11 A12
      //     A13 A14 A15 B01 B02 B03
      //     B04 B05 B06 B07 B08 B09
      //     B10 B11 B12 B13 B14 B15
      //     C01...
      //
      // This way you stack up any number of __`rows`__ you wish and set the initial `row` to start with.
      // Again, not limited to sprites, sequences also apply.
      //
      // [1]:../example/object-movie-multirow-sequence/
      //
      // ---

      // #### `row` Option ####
      // `Number` (rows), since 1.1
      //
      row:                    1,

      // #### `rows` Option ####
      // `Number` (rows), since 1.1
      //
      rows:                   0,


      // ### [NEW] Multi-Row Locks ######
      //
      // Optionally you can apply a lock on either of the two axes with `rowlock` and/or `framelock`.
      // That will disable direct mouse interaction and will leave using of `.reel()` the only way
      // of changing position on the locked axis.
      //
      // ---

      // #### `rowlock` Option ####
      // [NEW] `Boolean`, since 1.3
      //
      rowlock:            false,

      // #### `framelock` Option ####
      // [NEW] `Boolean`, since 1.3
      //
      framelock:          false,


      // ### Dual-Orbit Mode ######
      //
      // Special form of multi-axis movie is the dual-axis mode. In this mode the object offers two plain
      // spins - horizontal and vertical orbits combined together crossing each other at the `frame`
      // forming sort of a cross if envisioned. [`example/object-movie-dual-orbit-sequence`][1] demonstrates
      // this setup. When the phone in the example is facing you (marked in the example with green square
      // in the top right), you are at the center. That is within the distance (in frames) defined
      // by the `orbital` option. Translation from horizontal to vertical orbit can be achieved on this sweet-spot.
      // By default horizontal orbit is chosen first, unless `vertical` option is used against.
      //
      // In case the image doesn't follow the vertical drag, you may have your vertical orbit `inversed`.
      //
      // Technically it is just a two-layer movie:
      //
      //     A01 A02 A03 A04 A05 A06
      //     A07 A08 A09 A10 A11 A12
      //     A13 A14 A15 B01 B02 B03
      //     B04 B05 B06 B07 B08 B09
      //     B10 B11 B12 B13 B14 B15
      //
      // [1]:../example/object-movie-dual-orbit-sequence/
      //
      // ---

      // #### `orbital` Option ####
      // `Number` (frames), since 1.1
      //
      orbital:                0,

      // #### `vertical` Option ####
      // `Boolean`, since 1.1
      //
      vertical:           false,

      // #### `inversed` Option ####
      // `Boolean`, since 1.1
      //
      inversed:           false,


      // ### Sprite Layout ######
      //
      // For both object movies and panoramas Reel presumes you use a combined _Sprite_ to hold all your
      // frames in a single file. This powerful technique of using a sheet of several individual images
      // has many advantages in terms of compactness, loading, caching, etc. However, know your enemy,
      // be also aware of the limitations, which stem from memory limits of mobile
      // (learn more in [FAQ](https://github.com/pisi/Reel/wiki/FAQ)).
      //
      // Inside the sprite, individual frames are laid down one by one, to the right of the previous one
      // in a straight _Line_:
      //
      //     01 02 03 04 05 06
      //     07...
      //
      // Horizontal length of the line is reffered to as `footage`. Unless frames `spacing` in pixels
      // is set, edges of frames must touch.
      //
      //     01 02 03 04 05 06
      //     07 08 09 10 11 12
      //     13 14 15 16 17 18
      //     19 20 21 22 23 24
      //     25 26 27 28 29 30
      //     31 32 33 34 35 36
      //
      // This is what you'll get by calling `.reel()` without any options. All frames laid out 6 in line.
      // By default nicely even 6 x 6 grid like, which also inherits the aspect ratio of your frames.
      //
      // By setting `horizontal` to `false`, instead of forming lines, frames are expected to form
      // _Columns_. All starts at the top left corner in both cases.
      //
      //     01 07 13 19 25 31
      //     02 08 14 20 26 32
      //     03 09 15 21 27 33
      //     04 10 16 22 28 34
      //     05 11 17 23 29 35
      //     06 12 18 24 30 36
      //
      // URL for the sprite image file is being build from the name of the original `<img>` `src` image
      // by adding a `suffix` to it. By default this results in `"object-reel.jpg"` for `"object.jpg"`.
      // You can also take full control over the sprite `image` URL that will be used.
      //
      // ---

      // #### `footage` Option ####
      // `Number` (frames), since 1.0
      //
      footage:                6,

      // #### `spacing` Option ####
      // `Number` (pixels), since 1.0
      //
      spacing:                0,

      // #### `horizontal` Option ####
      // `Boolean`, since 1.0
      //
      horizontal:          true,

      // #### `suffix` Option ####
      // `String`, since 1.0
      //
      suffix:           '-reel',

      // #### `image` Option ####
      // `String`, since 1.1
      //
      image:          undefined,


      // ### Sequence ######
      //
      // Collection of individual frame images is called _Sequence_ and it this way one HTTP request per
      // frame is made carried out as opposed to sprite with one request per entire sprite. Define it with
      // string like: `"image_###.jpg"`. The `#` placeholders will be replaced with a numeric +1 counter
      // padded to the placeholders length.
      // Learn more about [sequences](Sequences).
      //
      // In case you work with hashed filenames like `64bc654d21cb.jpg`, where no counter element can
      // be indentified, or you prefer direct control, `images` can also accept array of plain URL strings.
      //
      // All images are retrieved from a specified `path`.
      //
      // ---

      // #### `images` Option ####
      // [IMPROVED] `String` or `Array`, since 1.1
      //
      images:                '',

      // #### `path` Option ####
      // `String` (URL path), since 1.1
      //
      path:                  '',


      // ### Images Preload Order ######
      //
      // Given sequence images can be additionally reordered to achieve a perceived faster preloading.
      // Value given to `preload` option must match a name of a pre-registered function within
      // `$.reel.preload` object. There are two functions built-in:
      //
      // - `"fidelity"` - non-linear way that ensures even spreading of preloaded images around the entire
      //   revolution leaving the gaps in-between as small as possible. This results in a gradually
      //   increasing fidelity of the image rather than having one large shrinking gap. This is the default
      //   behavior.
      // - `"linear"` - linear order of preloading
      //
      // ---

      // #### `preload` Option ####
      // `String`, since 1.2
      //
      preload:       'fidelity',

      // ### [NEW] Shy Initialization ######
      //
      // Sometimes, on-demand activation is desirable in order to conserve device resources or bandwidth
      // especially with multiple instances on a single page. If so, enable _shy mode_, in which Reel will
      // hold up the initialization process until the image is clicked by the user. Alternativelly you can
      // initialize shy instance by triggering `"setup"` event.
      //
      // ---

      // #### `shy` Option ####
      // [NEW] `Boolean`, since 1.3
      //
      shy:                false,


      // ### Animation ######
      //
      // Your object movie or a panorama can perform an autonomous sustained motion in one direction.
      // When `speed` is set in revolutions per second (Hz), after a given `delay` the instance will
      // animate and advance frames by itself.
      //
      //     t
      //     |-------›|-----------›
      //       Delay    Animation
      //
      // Start and resume of animation happens when given `timeout` has elapsed since user became idle.
      //
      //     t
      //     |-----------›|= == ==  = === = = |          |-----------›
      //       Animation    User interaction    Timeout    Animation
      //
      // When a scene doesn't loop (see [`loops`](#loops-Option)) and the animation reaches one end,
      // it stays there for a while and then reversing the direction of the animation it bounces back
      // towards the other end. The time spent on the edge can be customized with `rebound`.
      //
      // ---

      // #### `speed` Option ####
      // `Number` (Hz), since 1.1
      //
      speed:                  0,

      // #### `delay` Option ####
      // `Number` (seconds), since 1.1
      //
      delay:                  0,

      // #### `timeout` Option ####
      // `Number` (seconds), since 1.1
      //
      timeout:                2,

      // #### `duration` Option ####
      // `Number` (seconds), since 1.3
      //
      duration:       undefined,

      // #### `rebound` Option ####
      // `Number` (seconds), since 1.1
      //
      rebound:              0.5,


      // ### Opening Animation ######
      //
      // Chance is you want the object to spin a little to attract attention and then stop and wait
      // for the user to engage. This is called "opening animation" and it is performed for given number
      // of seconds (`opening`) at dedicated `entry` speed. The `entry` speed defaults to value of `speed`
      // option. After the opening animation has passed, regular animation procedure begins starting with
      // the delay (if any).
      //
      //     t
      //     |--------›|-------›|-----------›
      //       Opening   Delay    Animation
      //
      // ---

      // #### `entry` Option ####
      // `Number` (Hz), since 1.1
      //
      entry:          undefined,

      // #### `opening` Option ####
      // `Number` (seconds), since 1.1
      //
      opening:                0,


      // ### Momentum ######
      //
      // Often also called inertial motion is a result of measuring a velocity of dragging. This velocity
      // builds up momentum, so when a drag is released, the image still retains the momentum and continues
      // to spin on itself. Naturally the momentum soon wears off as `brake` is being applied.
      //
      // One can utilize this momentum for a different kind of an opening animation. By setting initial
      // `velocity`, the instance gets artificial momentum and spins to slow down to stop.
      //
      // ---

      // #### `brake` Option ####
      // `Number`, since 1.1, where it also has a different default `0.5`
      //
      brake:               0.23,

      // #### `velocity` Option ####
      // `Number`, since 1.2
      //
      velocity:               0,


      // ### Ticker ######
      //
      // For purposes of animation, Reel starts and maintains a timer device which emits ticks timing all
      // animations. There is only one ticker running in the document and all instances subscribe to this
      // one ticker. Ticker is equipped with a mechanism, which compensates for the  measured costs
      // of running Reels to ensure the ticker ticks on time. The `tempo` (in Hz) of the ticker can be
      // specified.
      //
      // Please note, that ticker is synchronized with a _leader_, the oldest living instance on page,
      // and adjusts to his tempo.
      //
      // ---

      // #### `tempo` Option ####
      // `Number` (Hz, ticks per second), since 1.1
      //
      tempo:                 36,

      // ~~~
      //
      // Since many mobile devices are sometimes considerably underpowered in comparison with desktops,
      // they often can keep up with the 36 Hz rhythm. In Reel these are called __lazy devices__
      // and everything mobile qualifies as lazy for the sake of the battery and interaction fluency.
      // The ticker is under-clocked for them by a `laziness` factor, which is used to divide the `tempo`.
      // Default `laziness` of `6` will effectively use 6 Hz instead (6 = 36 / 6) on lazy devices.
      //
      // ---

      // #### `laziness` Option ####
      // `Number`, since 1.1
      //
      laziness:               6,


      // ### Customization ######
      //
      // You can customize Reel on both functional and visual front. The most visible thing you can
      // customize is probably the `cursor`, size of the `preloader`, perhaps add visual `indicator`(s)
      // of Reel's position within the range. You can also set custom `hint` for the tooltip, which appears
      // when you mouse over the image area. Last but not least you can also add custom class name `klass`
      // to the instance.
      //
      // ---

      // #### `cursor` Option ####
      // `String`, since 1.2
      //
      cursor:         undefined,

      // #### `hint` Option ####
      // `String`, since 1.0
      //
      hint:                  '',

      // #### `indicator` Option ####
      // `Number` (pixels), since 1.0
      //
      indicator:              0,

      // #### `klass` Option ####
      // `String`, since 1.0
      //
      klass:                 '',

      // #### `preloader` Option ####
      // `Number` (pixels), since 1.1
      //
      preloader:              2,

      // ~~~
      //
      // You can use custom attributes (`attr`) on the node - it accepts the same name-value pairs object
      // jQuery `.attr()` does. In case you want to delegate full interaction control over the instance
      // to some other DOM element(s) on page, you can with `area`.
      //
      // ---

      // #### `area` Option ####
      // `jQuery`, since 1.1
      //
      area:           undefined,

      // #### `attr` Option ####
      // `Object`, since 1.2
      //
      attr:                  {},


      // ### Annotations ######
      //
      // To further visually describe your scene you can place all kinds of in-picture HTML annotations
      // by defining an `annotations` object. Learn more about [Annotations][1] in a dedicated article.
      //
      // [1]:https://github.com/pisi/Reel/wiki/Annotations
      //
      // ---

      // #### `annotations` Option ####
      // `Object`, since 1.2
      //
      annotations:    undefined,


      // ### [NEW] Responsiveness ######
      //
      // By default, dimensions of Reel are fixed and pixel-match the dimensions of the original image
      // and the responsive mode is disabled. Using `responsive` option you can enable responsiveness.
      // In such a case Reel will adopt dimensions of its parent container element and scale all relevant
      // data store values accordingly.
      // The scale applied is stored in `"ratio"` data key, where `1.0` means 100% or no scale.
      //
      // To take full advantage of this, you can setup your URLs to contain actual dimensions and
      // serve images in appropriate detail.
      // Learn more about [data values in URLs](#Data-Values-in-URLs).
      //
      // ---

      // #### `responsive` Option ####
      // [NEW] `Boolean`, since 1.3
      //
      responsive:         false,


      // ### Mathematics ######
      //
      // When reeling, instance conforms to a graph function, which defines whether it will loop
      // (`$.reel.math.hatch`) or it won't (`$.reel.math.envelope`). My math is far from flawless
      // and I'm sure there are much better ways how to handle things. the `graph` option is there for you
      // shall you need it. It accepts a function, which should process given criteria and return
      // a fraction of 1.
      //
      //     function( x, start, revolution, lo, hi, cwness, y ){
      //       return fraction  // 0.0 - 1.0
      //     }
      //
      // ---

      // #### `graph` Option ####
      // `Function`, since 1.1
      //
      graph:          undefined,


      // ### Monitor ######
      //
      // Specify a string data key and you will see its real-time value dumped in the upper-left corner
      // of the viewport. Its visual can be customized by CSS using `.jquery-reel-monitor` selector.
      //
      // ---

      // #### `monitor` Option ####
      // `String` (data key), since 1.1
      //
      monitor:        undefined

    },

    // -----------------
    // [NEW] Quick Start
    // -----------------
    //
    // For basic Reel initialization, you don't even need to write any Javascript!
    // All it takes is to add __class name__ `"reel"` to your `<img>` HTML tag,
    // assign an unique __`id` attribute__ and decorate the tag with configuration __data attributes__.
    // Result of which will be interactive Reel projection.
    //
    //     <img src="some/image.jpg" width="300" height="200"
    //       id="my_image"
    //       class="reel"
    //       data-images="some/images/01.jpg, some/images/02.jpg"
    //       data-speed="0.5">
    //
    // All otherwise Javascript [options](#Options) are made available as HTML `data-*` attributes.
    //
    // Only the `annotations` option doesn't work this way. To quickly create annotations,
    // simply have any HTML node (`<div>` prefferably) anywhere in the DOM,
    // assign it __class name__ `"reel-annotation"`, an unique __`id` attribute__
    // and add configuration __data attributes__.
    //
    //     <div id="my_annotation"
    //       class="reel-annotation"
    //       data-for="my_image"
    //       data-x="120"
    //       data-y="60">
    //       Whatever HTML I'd like to have in the annotation
    //     </div>
    //
    // Most important is the `data-for` attribute, which references target Reel instance by `id`.
    //
    // ---

    //
    // Responsible for discovery and subsequent conversion of data-configured Reel images is
    // `$.reel.scan()` method, which is being called automagically when the DOM becomes ready.
    // Under normal circumstances you don't need to scan by yourself.
    //
    // It however comes in handy to re-scan when you happen to inject a data-configured Reel `<img>`
    // into already ready DOM.
    //
    // ---

    // ### `$.reel.scan()` Method ######
    // [NEW] returns `jQuery`, since 1.3
    //
    scan: function(){
      return $(dot(klass)+':not('+dot(overlay_klass)+' > '+dot(klass)+')').each(function(ix, image){
        var
        $image= $(image),
            options= $image.data(),
            images= options.images= soft_array(options.images),
            annotations= {}
        $(dot(annotation_klass)+'[data-for='+$image.attr(_id_)+']').each(function(ix, annotation){
          var
          $annotation= $(annotation),
              def= $annotation.data(),
              x= def.x= numerize_array(soft_array(def.x)),
              y= def.y= numerize_array(soft_array(def.y)),
              id= $annotation.attr(_id_),
              node= def.node= $annotation.removeData()
          annotations[id] = def;
        });
        options.annotations = annotations;
        $image.removeData().reel(options);
      });
    },

    // -------
    // Methods
    // -------
    //
    // Reel's methods extend jQuery core functions with members of its `$.reel.fn` object. Despite Reel
    // being a typical one-method plug-in with its `.reel()` function, for convenience it also offers
    // its bipolar twin `.unreel()`.
    //
    // ---

    // ### `$.reel.fn` ######
    // returns `Object`, since 1.1
    //
    fn: {
      // ------------
      // Construction
      // ------------
      //
      // `.reel()` method is the core of Reel and similar to some jQuery functions, it has adaptive interface.
      // It either builds, [reads & writes data](#Data) or [causes events](#Control-Events).
      //
      // ---

      // ### `.reel( [options] )` Method ######
      // returns `jQuery`, since 1.0
      //
      reel: function(){
        var
        args= arguments,
            t= $(this),
            data= t.data(),
            name= args[0] || {},
            value= args[1]

        // The main [core of this procedure](#Construction-Core) is rather bulky, so let's skip it for now
        // and instead let me introduce the other uses first.

        // --------------------
        // [NEW] Control Events
        // --------------------
        //
        // [Event][1] messages are what ties and binds all Reel's internal working components together.
        // Besides being able to binding to any of these events from your script and react on Reel status changes
        // (e.g. position), you can also trigger some of them in order to control Reel's attitude.
        //
        // You can:
        //
        // * control the playback of animated Reels with [`play`](#play-Event), [`pause`](#pause-Event)
        // or [`stop`](#stop-Event)
        // * step the Reel in any direction with [`stepRight`](#stepRight-Event), [`stepLeft`](#stepLeft-Event),
        // [`stepUp`](#stepUp-Event), [`stepDown`](#stepDown-Event), 
        // * reach certain frame with [`reach`](#reach-Event)
        //
        // Triggering Reel's control event is as simple as passing the desired event name to `.reel()`.
        //
        // _**Example:** Stop the animation in progress:_
        //
        //     .reel(':stop')
        //
        // Think of `.reel()` as a convenient shortcut to and synonym for [`.trigger()`][2], only prefix
        // the event name with `:`. Of course you can use simple `.trigger()` instead and without the colon.
        //
        //
        // [1]:http://api.jquery.com/category/events/event-object/
        // [2]:http://api.jquery.com/trigger
        //
        // ---

        // #### `.reel( event, [arguments] )` ######
        // returns `jQuery`, since 1.3
        //
        if (typeof name != 'object'){

          if (name.slice(0, 1) == ':'){
            return t.trigger(name.slice(1), value);
          }

          // ----
          // Data
          // ----
          //
          // Reel stores all its inner state values with the standard DOM [data interface][1] interface
          // while adding an additional change-detecting event layer, which makes Reel entirely data-driven.
          //
          // [1]:http://api.jquery.com/data
          //
          // _**Example:** Find out on what frame a Reel instance currently is:_
          //
          //     .reel('frame') // Returns the frame number
          //
          // This time think of `.reel(data)` as a synonym for `.data()`. Note, that you can therefore easily
          // inspect the entire datastore with `.data()` (without arguments). Use it for debugging only.
          // For real-time data watch use [`monitor`](#Monitor) option instead of manually hooking into
          // the data.
          //
          // ---

          // #### `.reel( data )` ######
          // can return anything, since 1.2
          //
          else{
            if (args.length == 1){
              return data[name]
            }

            // ### Write Access ###
            //
            // You can store any value the very same way by passing the value as the second function
            // argument.
            //
            // _**Example:** Jump to frame 12:_
            //
            //     .reel('frame', 12)
            //
            // Only a handful of data keys is suitable for external manipulation. These include `area`,
            // `backwards`, `brake`, __`fraction`__, __`frame`__, `playing`, `reeling`, __`row`__, `speed`,
            // `stopped`, `velocity` and `vertical`. Use the rest of the keys for reading only, you can
            // mess up easily changing them.
            //
            // ---

            // #### `.reel( data, value )` ######
            // returns `jQuery`, since 1.2
            //
            else{
              if (value !== undefined){
                reel.normal[name] && (value= reel.normal[name](value, data));

                // ### Changes ######
                //
                // Any value that does not equal (`===`) the old value is considered _new value_ and
                // in such a case Reel will trigger a _change event_ to announce the change. The event
                // type takes form of _`key`_`Change`, where _`key`_ will be the data key/name you've
                // just assigned.
                //
                // _**Example:** Setting `"frame"` to `12` in the above example will trigger
                // `"frameChange"`._
                //
                // Some of these _change events_ (like `frame` or `fraction`) have a
                // default handler attached.
                //
                // You can easily bind to any of the data key change with standard event
                // binding methods.
                //
                // _**Example:** React on instance being manipulated or not:_
                //
                //     .bind('reelingChange', function(evnt, nothing, reeling){
                //       if (reeling) console.log('Rock & reel!')
                //       else console.log('Not reeling...')
                //     })
                //
                // ---

                // The handler function will be executed every time the value changes and
                // it will be supplied with three arguments. First one is the event object
                // as usual, second is `undefined` and the third will be the actual value.
                // In this case it was a boolean type value.
                // If the second argument is not `undefined` it is the backward compatible
                // "before" event triggered from outside Reel.
                //
                if (data[name] === undefined) data[name]= value
                else if (data[name] !== value) t.trigger(name+'Change', [ undefined, data[name]= value ]);
              }
              return t
            }
          }
        }

        //
        // -----------------
        // Construction Core
        // -----------------
        //
        // Now, back to the procedure of [constructing](#Construction) a Reel instance
        // and binding its event handlers.
        //
        // Establish local `opt` object made by extending the defaults.
        //
        else{

          var
          opt= $.extend({}, reel.def, name),
              // Limit the given jQuery collection to just `<img>` tags with `src` attribute
              // and dimensions defined.
              applicable= t.filter(_img_).unreel().filter(function(){
                var
                $this= $(this),
                    attr= opt.attr,
                    src= attr.src || $this.attr(_src_),
                    width= attr.width || $this.attr(_height_) || $this.width(),
                    height= attr.height || $this.attr(_width_) || $this.height()
                if (!src) return error('`src` attribute missing on target image');
                if (!width || !height) return error('Dimension(s) of the target image unknown');
                return true;
              }),
              instances= []

          applicable.each(function(){
            var
            t= $(this),

                // Quick data interface
                set= function(name, value){ return t.reel(name, value) && get(name) },
                get= function(name){ return t.data(name) },

                on= {

                  // --------------
                  // Initialization
                  // --------------
                  //
                  // This internally called private pseudo-handler:
                  //
                  // - initiates all data store keys,
                  // - binds to ticker
                  // - and triggers `"setup"` Event when finished.
                  //
                  setup: function(e){
                    if (t.hasClass(klass) && t.parent().hasClass(overlay_klass)) return;
                    set(_options_, opt);
                    var
                    attr= {
                      src: t.attr(_src_),
                      width: t.attr(_width_) || null,
                      height: t.attr(_height_) || null,
                      style: t.attr(_style_) || null,
                      'class': t.attr(_class_) || null
                    },
                        src= t.attr(opt.attr).attr(_src_),
                        id= set(_id_, t.attr(_id_) || t.attr(_id_, klass+'-'+(+new Date())).attr(_id_)),
                        data= $.extend({}, t.data()),
                        images= set(_images_, opt.images || []),
                        stitched= set(_stitched_, opt.stitched),
                        is_sprite= !images.length || stitched,
                        responsive= set(_responsive_, opt.responsive && (knows_background_size ? true : !is_sprite)),
                        truescale= set(_truescale_, {}),
                        loops= opt.loops,
                        orbital= opt.orbital,
                        revolution= opt.revolution,
                        rows= opt.rows,
                        footage= set(_footage_, min(opt.footage, opt.frames)),
                        spacing= set(_spacing_, opt.spacing),
                        width= set(_width_, +t.attr(_width_) || t.width()),
                        height= set(_height_, +t.attr(_height_) || t.height()),
                        shy= set(_shy_, opt.shy),
                        frames= set(_frames_, orbital && footage || rows <= 1 && images.length || opt.frames),
                        multirow= rows > 1 || orbital,
                        revolution_x= set(_revolution_, axis('x', revolution) || stitched / 2 || width * 2),
                        revolution_y= set(_revolution_y_, !multirow ? 0 : (axis('y', revolution) || (rows > 3 ? height : height / (5 - rows)))),
                        rows= stitched ? 1 : ceil(frames / footage),
                        stitched_travel= set(_stitched_travel_, stitched - (loops ? 0 : width)),
                        stitched_shift= set(_stitched_shift_, 0),
                        stage_id= hash(id+opt.suffix),
                        img_class= t.attr(_class_),
                        classes= !img_class ? __ : img_class+___,
                        $overlay= $(tag(_div_), { id: stage_id.substr(1), 'class': classes+___+overlay_klass+___+frame_klass+'0' }),
                        $instance= t.wrap($overlay.addClass(opt.klass)).addClass(klass),
                        instances_count= instances.push(add_instance($instance)[0]),
                        $overlay= $instance.parent().bind(on.instance)
                    set(_image_, images.length ? __ : opt.image || src.replace(reel.re.image, '$1' + opt.suffix + '.$2'));
                    set(_cache_, $(tag(_div_), { 'class': cache_klass }).appendTo('body'));
                    set(_area_, $()),
                      set(_cached_, []);
                    set(_frame_, null);
                    set(_fraction_, null);
                    set(_row_, opt.row);
                    set(_tier_, 0);
                    set(_rows_, rows);
                    set(_rowlock_, opt.rowlock);
                    set(_framelock_, opt.framelock);
                    set(_departure_, set(_destination_, set(_distance_, 0)));
                    set(_bit_, 1 / frames);
                    set(_stage_, stage_id);
                    set(_backwards_, set(_speed_, opt.speed) < 0);
                    set(_loading_, false);
                    set(_velocity_, 0);
                    set(_vertical_, opt.vertical);
                    set(_preloaded_, 0);
                    set(_cwish_, negative_when(1, !opt.cw && !stitched));
                    set(_clicked_location_, {});
                    set(_clicked_, false);
                    set(_clicked_on_, set(_clicked_tier_, 0));
                    set(_lo_, set(_hi_, 0));
                    set(_reeling_, false);
                    set(_reeled_, false);
                    set(_opening_, false);
                    set(_brake_, opt.brake);
                    set(_center_, !!orbital);
                    set(_tempo_, opt.tempo / (reel.lazy? opt.laziness : 1));
                    set(_opening_ticks_, -1);
                    set(_ticks_, -1);
                    set(_annotations_, opt.annotations || $overlay.unbind(dot(_annotations_)) && {});
                    set(_ratio_, 1);
                    set(_backup_, {
                      attr: attr,
                      data: data
                    });
                    opt.steppable || $overlay.unbind('up.steppable');
                    opt.indicator || $overlay.unbind('.indicator');
                    css(__, { overflow: _hidden_, position: 'relative' });
                    responsive || css(__, { width: width, height: height });
                    responsive && $.each(responsive_keys, function(i, key){ truescale[key]= get(key) });
                    css(____+___+dot(klass), { display: _block_ });
                    css(dot(cache_klass), { position: 'fixed', left: px(-100), top: px(-100) }, true);
                    css(dot(cache_klass)+___+_img_, { position: _absolute_, width: 10, height: 10 }, true);
                    pool.bind(on.pool);
                    t.trigger(shy ? 'prepare' : 'setup')
                  },

                  // ------
                  // Events
                  // ------
                  //
                  // Reel is completely event-driven meaning there are many events, which can be called
                  // (triggered). By binding event handler to any of the events you can easily hook on to any
                  // event to inject your custom behavior where and when this event was triggered.
                  //
                  // _**Example:** Make `#image` element reel and execute some code right after the newly
                  // created instance is initialized and completely loaded:_
                  //
                  //     $("#image")
                  //     .reel()
                  //     .bind("loaded", function(ev){
                  //       // Your code
                  //     })
                  //

                  // Events bound to all individual instances.
                  //
                  instance: {

                    // ### `teardown` Event ######
                    // `Event`, since 1.1
                    //
                    // This event does do how it sounds like. It will teardown an instance with all its
                    // belongings leaving no trace.
                    //
                    // - It reconstructs the original `<img>` element,
                    // - wipes out the data store,
                    // - removes instance stylesheet
                    // - and unbinds all its events.
                    //
                    teardown: function(e){
                      var
                      backup= t.data(_backup_)
                      t.parent().unbind(on.instance);
                      if (get(_shy_)) t.parent().unbind(_click_, shy_setup)
                      else get(_style_).remove() && get(_area_).unbind(ns);
                      get(_cache_).empty();
                      clearTimeout(delay);
                      clearTimeout(gauge_delay);
                      $(window).unbind(_resize_, slow_gauge);
                      $(window).unbind(ns);
                      pool.unbind(on.pool);
                      pools.unbind(pns);
                      t.siblings().unbind(ns).remove();
                      no_bias();
                      t.removeAttr('onloaded');
                      remove_instance(t.unbind(ns).removeData().unwrap().attr(backup.attr).data(backup.data));
                      t.attr(_style_) == __ && t.removeAttr(_style_);
                    },

                    // ### `setup` Event ######
                    // `Event`, since 1.0
                    //
                    // `"setup"` Event continues with what has been started by the private `on.setup()`
                    // handler.
                    //
                    // - It prepares all additional on-stage DOM elements
                    // - and cursors for the instance stylesheet.
                    //
                    setup: function(e){
                      var
                      $overlay= t.parent().append(preloader()),
                          $area= set(_area_, $(opt.area || $overlay )),
                          multirow= opt.rows > 1,
                          cursor= opt.cursor,
                          cursor_up= cursor == _hand_ ? drag_cursor : cursor || reel_cursor,
                          cursor_down= cursor == _hand_ ? drag_cursor_down+___+'!important' : undefined
                      css(___+dot(klass), { MozUserSelect: _none_, WebkitUserSelect: _none_, MozTransform: 'translateZ(0)' });
                      t.unbind(_click_, shy_setup);
                      $area
                        .bind(_touchstart_, press)
                        .bind(opt.clickfree ? _mouseenter_ : _mousedown_, press)
                        .bind(opt.wheelable ? _mousewheel_ : null, wheel)
                        .bind(_dragstart_, function(){ return false })
                      css(__, { cursor: cdn(cursor_up) });
                      css(dot(loading_klass), { cursor: 'wait' });
                      css(dot(panning_klass)+____+dot(panning_klass)+' *', { cursor: cdn(cursor_down || cursor_up) }, true);
                      if (get(_responsive_)){
                        css(___+dot(klass), { width: '100%', height: _auto_ });
                        $(window).bind(_resize_, slow_gauge);
                      }
                      function press(e){ return t.trigger('down', [pointer(e).clientX, pointer(e).clientY, e]) && e.give }
                      function wheel(e, delta){ return !delta || t.trigger('wheel', [delta, e]) && e.give }
                      opt.hint && $area.attr('title', opt.hint);
                      opt.indicator && $overlay.append(indicator('x'));
                      multirow && opt.indicator && $overlay.append(indicator('y'));
                      opt.monitor && $overlay.append($monitor= $(tag(_div_), { 'class': monitor_klass }))
                      && css(___+dot(monitor_klass), { position: _absolute_, left: 0, top: 0 });
                    },

                    // ### `preload` Event ######
                    // `Event`, since 1.1
                    //
                    // Reel keeps a cache of all images it needs for its operation. Either a sprite or all
                    // sequence images. It first determines the order of requesting the images and then
                    // asynchronously loads all of them.
                    //
                    // - It preloads all frames and sprites.
                    //
                    preload: function(e){
                      var
                      $overlay= t.parent(),
                          images= get(_images_),
                          is_sprite= !images.length,
                          order= reel.preload[opt.preload] || reel.preload[reel.def.preload],
                          preload= is_sprite ? [get(_image_)] : order(images.slice(0), opt, get),
                          to_load= preload.length,
                          preloaded= set(_preloaded_, is_sprite ? 0.5 : 0),
                          simultaneous= 0,
                          $cache= get(_cache_).empty(),
                          uris= []
                      $overlay.addClass(loading_klass);
                      // It also finalizes the instance stylesheet and prepends it to the head.
                      set(_style_, get(_style_) || $('<'+_style_+' type="text/css">'+css.rules.join('\n')+'</'+_style_+'>').prependTo(_head_));
                      set(_loading_, true);
                      t.trigger('stop');
                      opt.responsive && gauge();
                      t.trigger('resize', true);
                      while(preload.length){
                        var
                        uri= reel.substitute(opt.path+preload.shift(), get),
                            $img= $(tag(_img_)).data(_src_, uri).appendTo($cache)
                        // Each image, which finishes the load triggers `"preloaded"` Event.
                        $img.bind('load error abort', function(e){
                          e.type != 'load' && t.trigger(e.type);
                          return !detached($overlay) && t.trigger('preloaded') && load() && false;
                        });
                        uris.push(uri);
                      }
                      setTimeout(function(){ while (++simultaneous < reel.concurrent_requests) load(); }, 0);
                      set(_cached_, uris);
                      set(_shy_, false);
                      function load(){
                        var
                        $img= $cache.children(':not([src]):first')
                        return $img.attr(_src_, $img.data(_src_))
                      }
                    },

                    // ### `preloaded` Event ######
                    // `Event`, since 1.1
                    //
                    // This event is fired by every preloaded image and adjusts the preloader indicator's
                    // target position. Once all images are preloaded, `"loaded"` Event is triggered.
                    //
                    preloaded: function(e){
                      var
                      images= get(_images_).length || 1,
                          preloaded= set(_preloaded_, min(get(_preloaded_) + 1, images))
                      if (preloaded === 1) var
                      frame= t.trigger('frameChange', [undefined, get(_frame_)])
                      if (preloaded === images){
                        t.parent().removeClass(loading_klass);
                        t.trigger('loaded');
                      }
                    },

                    // ### `loaded` Event ######
                    // `Event`, since 1.1
                    //
                    // `"loaded"` Event is the one announcing when the instance is "locked and loaded".
                    // At this time, all is prepared, preloaded and configured for user interaction
                    // or animation.
                    //
                    loaded: function(e){
                      get(_images_).length > 1 || t.css({ backgroundImage: url(reel.substitute(opt.path+get(_image_), get)) }).attr({ src: cdn(transparent) });
                      get(_stitched_) && t.attr({ src: cdn(transparent) });
                      get(_reeled_) || set(_velocity_, opt.velocity || 0);
                      set(_loading_, false);
                      loaded= true;
                    },

                    // ### `prepare` Event ######
                    // [NEW] `Event`, since 1.3
                    //
                    // In case of `shy` activation, `"prepare"` event is called instead of the full `"setup"`.
                    // It lefts the target image untouched waiting to be clicked to actually setup.
                    //
                    prepare: function(e){
                      t.css('display', _block_).parent().one(_click_, shy_setup);
                    },

                    // ----------------
                    // Animation Events
                    // ----------------
                    //
                    // ### `opening` Event ######
                    // `Event`, since 1.1
                    //
                    // When [opening animation](#Opening-Animation) is configured for the instance, `"opening"`
                    // event engages the animation by pre-calculating some of its properties, which will make
                    // the tick handler
                    //
                    opening: function(e){
                      /*
                  - initiates opening animation
                  - or simply plays the reel when without opening
                  */
                      if (!opt.opening) return t.trigger('openingDone');
                      var
                      opening= set(_opening_, true),
                          stopped= set(_stopped_, !get(_speed_)),
                          speed= opt.entry || opt.speed,
                          end= get(_fraction_),
                          duration= opt.opening,
                          start= set(_fraction_, end - speed * duration),
                          ticks= set(_opening_ticks_, ceil(duration * leader(_tempo_)))
                      },

                    // ### `openingDone` Event ######
                    // `Event`, since 1.1
                    //
                    // `"openingDone"` is fired onceWhen [opening animation](#Opening-Animation) is configured for the instance, `"opening"`
                    // event engages the animation by pre-calculating some of its properties, which will make
                    // the tick handler
                    //
                    openingDone: function(e){
                      var
                      playing= set(_playing_, false),
                          opening= set(_opening_, false),
                          evnt= _tick_+dot(_opening_)
                      pool.unbind(evnt, on.pool[evnt]);
                      opt.orientable && $(window).bind(_deviceorientation_, orient);
                      if (opt.delay > 0) delay= setTimeout(function(){ t.trigger('play') }, opt.delay * 1000)
                      else t.trigger('play');
                      function orient(e){ return t.trigger('orient', [gyro(e).alpha, gyro(e).beta, gyro(e).gamma, e]) && e.give }
                    },

                    // -----------------------
                    // Playback Control Events
                    // -----------------------
                    //
                    // ### `play` Event ######
                    // `Event`, since 1.1
                    //
                    // `"play"` event can optionally accept a `speed` parameter (in Hz) to change the animation
                    // speed on the fly.
                    //
                    play: function(e, speed){
                      var
                      speed= speed ? set(_speed_, speed) : (get(_speed_) * negative_when(1, get(_backwards_))),
                          duration= opt.duration,
                          ticks= duration && set(_ticks_, ceil(duration * leader(_tempo_))),
                          backwards= set(_backwards_, speed < 0),
                          playing= set(_playing_, !!speed),
                          stopped= set(_stopped_, !playing)
                      idle();
                    },

                    // ### `reach` Event ######
                    // [NEW] `Event`, since 1.3
                    //
                    // Use this event to instruct Reel to play and reach a given frame. `"reach"` event requires
                    // `target` parameter, which is the frame to which Reel should animate to and stop.
                    // Optional `speed` parameter allows for custom speed independent on the regular speed.
                    //
                    reach: function(e, target, speed){
                      if (target == get(_frame_)) return;
                      var
                      frames= get(_frames_),
                          row= set(_row_, ceil(target / frames)),
                          departure= set(_departure_, get(_frame_)),
                          target= set(_destination_, target),
                          shortest = set(_distance_, reel.math.distance(departure, target, frames)),
                          speed= abs(speed || get(_speed_)) * negative_when(1, shortest < 0)
                      t.trigger('play', speed);
                    },

                    // ### `pause` Event ######
                    // `Event`, since 1.1
                    //
                    // Triggering `"pause"` event will halt the playback for a time period designated
                    // by the `timeout` option. After this timenout, the playback is resumed again.
                    //
                    pause: function(e){
                      unidle();
                    },

                    // ### `stop` Event ######
                    // `Event`, since 1.1
                    //
                    // After `"stop"` event is triggered, the playback stops and stays still until `"play"`ed again.
                    //
                    stop: function(e){
                      var
                      stopped= set(_stopped_, true),
                          playing= set(_playing_, !stopped)
                      },

                    // ------------------------
                    // Human Interaction Events
                    // ------------------------
                    //
                    // ### `down` Event ######
                    // `Event`, since 1.1
                    //
                    // Marks the very beginning of touch or mouse interaction. It receives `x` and `y`
                    // coordinates in arguments.
                    //
                    // - It calibrates the center point (origin),
                    // - considers user active not idle,
                    // - flags the `<html>` tag with `.reel-panning` class name
                    // - and binds dragging events for move and lift. These
                    // are usually bound to the pool (document itself) to get a consistent treating regardless
                    // the event target element. However in click-free mode, it binds directly to the instance.
                    //
                    down: function(e, x, y, ev){
                      if (!opt.clickfree && ev && ev.button !== undefined && ev.button != DRAG_BUTTON) return;
                      if (opt.draggable){
                        var
                        clicked= set(_clicked_, get(_frame_)),
                            clickfree= opt.clickfree,
                            velocity= set(_velocity_, 0),
                            $area= clickfree ? get(_area_) : pools,
                            origin= last= recenter_mouse(get(_revolution_), x, y)
                        unidle();
                        no_bias();
                        panned= 0;
                        $(_html_, pools).addClass(panning_klass);
                        $area
                          .bind(_touchmove_+___+_mousemove_, drag)
                          .bind(_touchend_+___+_touchcancel_, lift)
                          .bind(clickfree ? _mouseleave_ : _mouseup_, lift)
                      }
                      function drag(e){ return t.trigger('pan', [pointer(e).clientX, pointer(e).clientY, e]) && e.give }
                      function lift(e){ return t.trigger('up', [e]) && e.give }
                    },

                    // ### `up` Event ######
                    // `Event`, since 1.1
                    //
                    // This marks the termination of user's interaction. She either released the mouse button
                    // or lift the finger of the touch screen. This event handler:
                    //
                    // - calculates the velocity of the drag at that very moment,
                    // - removes the `.reel-panning` class from `<body>`
                    // - and unbinds dragging events from the pool.
                    //
                    up: function(e, ev){
                      var
                      clicked= set(_clicked_, false),
                          reeling= set(_reeling_, false),
                          throwable = opt.throwable,
                          biases= abs(bias[0] + bias[1]) / 60,
                          velocity= set(_velocity_, !throwable ? 0 : throwable === true ? biases : min(throwable, biases)),
                          brakes= braking= velocity ? 1 : 0
                      unidle();
                      no_bias();
                      $(_html_, pools).removeClass(panning_klass);
                      (opt.clickfree ? get(_area_) : pools).unbind(pns);
                    },

                    // ### `pan` Event ######
                    // [RENAMED] `Event`, since 1.2
                    //
                    // Regardles the actual source of movement (mouse or touch), this event is always triggered
                    // in response and similar to the `"down"` Event it receives `x` and `y` coordinates
                    // in arguments and in addition it is passed a reference to the original browser event.
                    // This handler:
                    //
                    // - syncs with timer to achieve good performance,
                    // - calculates the distance from drag center and applies graph on it to get `fraction`,
                    // - recenters the drag when dragged over limits,
                    // - detects the direction of the motion
                    // - and builds up inertial motion bias.
                    //
                    // Historically `pan` was once called `slide` (conflicted with Mootools - [GH-51][1])
                    // or `drag` (that conflicted with MSIE).
                    //
                    // [1]:https://github.com/pisi/Reel/issues/51
                    //
                    pan: function(e, x, y, ev){
                      if (opt.draggable && slidable){
                        slidable= false;
                        unidle();
                        var
                        rows= opt.rows,
                            orbital= opt.orbital,
                            scrollable= !get(_reeling_) && rows <= 1 && !orbital && opt.scrollable,
                            delta= { x: x - last.x, y: y - last.y },
                            abs_delta= { x: abs(delta.x), y: abs(delta.y) }
                        if (ev && scrollable && abs_delta.x < abs_delta.y) return ev.give = true;
                        if (abs_delta.x > 0 || abs_delta.y > 0){
                          ev && (ev.give = false);
                          panned= max(abs_delta.x, abs_delta.y);
                          last= { x: x, y: y };
                          var
                          revolution= get(_revolution_),
                              origin= get(_clicked_location_),
                              vertical= get(_vertical_)
                          if (!get(_framelock_)) var
                          fraction= set(_fraction_, graph(vertical ? y - origin.y : x - origin.x, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_), vertical ? y - origin.y : x - origin.x)),
                              reeling= set(_reeling_, get(_reeling_) || get(_frame_) != get(_clicked_)),
                              motion= to_bias(vertical ? delta.y : delta.x || 0),
                              backwards= motion && set(_backwards_, motion < 0)
                          if (orbital && get(_center_)) var
                          vertical= set(_vertical_, abs(y - origin.y) > abs(x - origin.x)),
                              origin= recenter_mouse(revolution, x, y)
                          if (rows > 1 && !get(_rowlock_)) var
                          revolution_y= get(_revolution_y_),
                              start= get(_clicked_tier_),
                              lo= - start * revolution_y,
                              tier= set(_tier_, reel.math.envelope(y - origin.y, start, revolution_y, lo, lo + revolution_y, -1))
                          if (!(fraction % 1) && !opt.loops) var
                          origin= recenter_mouse(revolution, x, y)
                          }
                      }
                    },

                    // ### `wheel` Event ######
                    // `Event`, since 1.0
                    //
                    // Maps Reel to mouse wheel position change event which is provided by a nifty plug-in
                    // written by Brandon Aaron - the [Mousewheel plug-in][1], which you will need to enable
                    // the mousewheel wheel for reeling. You can also choose to use [Wheel Special Event
                    // plug-in][2] by Three Dub Media instead. Either way `"wheel"` Event handler receives
                    // the positive or negative wheeled distance in arguments. This event:
                    //
                    // - calculates wheel input delta and adjusts the `fraction` using the graph,
                    // - recenters the "drag" each and every time,
                    // - detects motion direction
                    // - and nullifies the velocity.
                    //
                    // [1]:https://github.com/brandonaaron/jquery-mousewheel
                    // [2]:http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
                    //
                    wheel: function(e, distance, ev){
                      if (!distance) return;
                      wheeled= true;
                      var
                      delta= ceil(math.sqrt(abs(distance)) / 2),
                          delta= negative_when(delta, distance > 0),
                          revolution= 0.0833 * get(_revolution_), // Wheel's revolution is 1/12 of full revolution
                          origin= recenter_mouse(revolution),
                          backwards= delta && set(_backwards_, delta < 0),
                          velocity= set(_velocity_, 0),
                          fraction= set(_fraction_, graph(delta, get(_clicked_on_), revolution, get(_lo_), get(_hi_), get(_cwish_)))
                      ev && ev.preventDefault();
                      ev && (ev.give = false);
                      unidle();
                      t.trigger('up', [ev]);
                    },

                    // ### `orient` Event ######
                    // [NEW] `Event`, since 1.3
                    //
                    // Maps Reel to device orientation event which is provided by some touch enabled devices
                    // with gyroscope inside. Event handler receives all three device orientation angles 
                    // in arguments. This event:
                    //
                    // - maps alpha angle directly to `fraction`
                    //
                    orient: function(e, alpha, beta, gamma, ev){
                      if (!slidable || operated) return;
                      oriented= true;
                      var
                      alpha_fraction= alpha / 360
                      fraction= set(_fraction_, +((opt.stitched || opt.cw ? 1 - alpha_fraction : alpha_fraction)).toFixed(2))
                      slidable = false;
                    },

                    // ------------------
                    // Data Change Events
                    // ------------------
                    //
                    // Besides Reel being event-driven, it also is data-driven respectively data-change-driven
                    // meaning that there is a mechanism in place, which detects real changes in data being
                    // stored with `.reel(name, value)`. Learn more about [data changes](#Changes).
                    //
                    // These data change bindings are for internal use only and you don't ever trigger them
                    // per se, you change data and that will trigger respective change event. If the value
                    // being stored is the same as the one already stored, nothing will be triggered.
                    //
                    // _**Example:** Change Reel's current `frame`:_
                    //
                    //     .reel("frame", 15)
                    //
                    // Change events always receive the actual data key value in the third argument.
                    //
                    // _**Example:** Log each viewed frame number into the developers console:_
                    //
                    //     .bind("frameChange", function(e, d, frame){
                    //         console.log(frame)
                    //     })
                    //
                    // ---

                    // ### `fractionChange` Event ######
                    // `Event`, since 1.0
                    //
                    // Internally Reel doesn't really work with the frames you set it up with. It uses
                    // __fraction__, which is a numeric value ranging from 0.0 to 1.0. When `fraction` changes
                    // this handler basically calculates and sets new value of `frame`.
                    //
                    fractionChange: function(e, nil, fraction){
                      if (nil !== undefined) return;
                      var
                      frame= 1 + floor(fraction / get(_bit_)),
                          multirow= opt.rows > 1,
                          orbital= opt.orbital,
                          center= set(_center_, !!orbital && (frame <= orbital || frame >= get(_footage_) - orbital + 2))
                      if (multirow) var
                      frame= frame + (get(_row_) - 1) * get(_frames_)
                      var
                      frame= set(_frame_, frame)
                      },

                    // ### `tierChange` Event ######
                    // `Event`, since 1.2
                    //
                    // The situation of `tier` is very much similar to the one of `fraction`. In multi-row
                    // movies, __tier__ is an internal value for the vertical axis. Its value also ranges from
                    // 0.0 to 1.0. Handler calculates and sets new value of `frame`.
                    //
                    tierChange: function(e, nil, tier){
                      if (nil === undefined) var
                      row= set(_row_, round(interpolate(tier, 1, opt.rows))),
                          frames= get(_frames_),
                          frame= get(_frame_) % frames || frames,
                          frame= set(_frame_, frame + row * frames - frames)
                      },

                    // ### `rowChange` Event ######
                    // `Event`, since 1.1
                    //
                    // The physical vertical position of Reel is expressed in __rows__ and ranges
                    // from 1 to the total number of rows defined with [`rows`](#rows-Option). This handler
                    // only converts `row` value to `tier` and sets it.
                    //
                    rowChange: function(e, nil, row){
                      if (nil === undefined) var
                      tier= may_set(_tier_, undefined, row, opt.rows)
                      },

                    // ### `frameChange` Event ######
                    // `Event`, since 1.0
                    //
                    // The physical horizontal position of Reel is expressed in __frames__ and ranges
                    // from 1 to the total number of frames configured with [`frames`](#frames-Option).
                    // This handler converts `row` value to `tier` and sets it. This default handler:
                    //
                    // - flags the instance's outter wrapper with `.frame-X` class name
                    //   (where `X` is the actual frame number),
                    // - calculates and eventually sets `fraction` (and `tier` for multi-rows) from given frame,
                    // - for sequences, it switches the `<img>`'s `src` to the right frame
                    // - and for sprites it recalculates sprite's 'background position shift and applies it.
                    //
                    frameChange: function(e, nil, frame){
                      if (nil !== undefined) return;
                      this.className= this.className.replace(reel.re.frame_klass, frame_klass + frame);
                      var
                      frames= get(_frames_),
                          rows= opt.rows,
                          path= opt.path,
                          base= frame % frames || frames,
                          frame_row= (frame - base) / frames + 1,
                          frame_tier= (frame_row - 1) / (rows - 1),
                          row= get(_row_),
                          tier= !rows ? get(_tier_) : may_set(_tier_, frame_tier, row, rows),
                          fraction= may_set(_fraction_, undefined, base, frames),
                          footage= get(_footage_)
                      if (opt.orbital && get(_vertical_)) var
                      frame= opt.inversed ? footage + 1 - frame : frame,
                          frame= frame + footage
                      var
                      stitched= get(_stitched_),
                          images= get(_images_),
                          is_sprite= !images.length || stitched
                      if (!is_sprite){
                        get(_responsive_) && gauge();
                        get(_preloaded_) && t.attr({ src: reen(reel.substitute(path + images[frame - 1], get)) });
                      }else{
                        var
                        spacing= get(_spacing_),
                            width= get(_width_),
                            height= get(_height_)
                        if (!stitched) var
                        horizontal= opt.horizontal,
                            minor= (frame % footage) - 1,
                            minor= minor < 0 ? footage - 1 : minor,
                            major= floor((frame - 0.1) / footage),
                            major= major + (rows > 1 ? 0 : (get(_backwards_) ? 0 : !opt.directional ? 0 : get(_rows_))),
                            a= major * ((horizontal ? height : width) + spacing),
                            b= minor * ((horizontal ? width : height) + spacing),
                            shift= images.length ? [0, 0] : horizontal ? [px(-b), px(-a)] : [px(-a), px(-b)]
                        else{
                          var
                          x= set(_stitched_shift_, round(interpolate(fraction, 0, get(_stitched_travel_))) % stitched),
                              y= rows <= 1 ? 0 : (height + spacing) * (rows - row),
                              shift= [px(-x), px(-y)],
                              image= images.length > 1 && images[row - 1],
                              fullpath= reel.substitute(path + image, get)
                          image && t.css('backgroundImage').search(fullpath) < 0 && t.css({ backgroundImage: url(fullpath) })
                        }
                        t.css({ backgroundPosition: shift.join(___) })
                      }
                    },

                    // This extra binding takes care of watching frame position while animating the `"reach"` event.
                    //
                    'frameChange.reach': function(e, nil, frame){
                      if (!get(_destination_) || nil !== undefined) return;
                      var
                      travelled= reel.math.distance(get(_departure_), frame, get(_frames_)),
                          onorover= abs(travelled) >= abs(get(_distance_))
                      if (!onorover) return;
                      set(_frame_, set(_destination_));
                      set(_destination_, set(_distance_, set(_departure_, 0)));
                      t.trigger('stop');
                    },

                    // ~~~
                    //
                    // When `image` or `images` is changed on the fly, this handler resets the loading cache and triggers
                    // new preload sequence. Images are actually switched only after the new image is fully loaded.
                    //
                    'imageChange imagesChange': function(e, nil, image){
                      t.trigger('preload');
                    },

                    // ---------
                    // Indicator
                    // ---------
                    //
                    // When configured with the [`indicator`](#indicator-Option) option, Reel adds to the scene
                    // a visual indicator in a form of a black rectangle traveling along the bottom edge
                    // of the image. It bears two distinct messages:
                    //
                    // - its horizontal position accurately reflects actual `fraction`
                    // - and its width reflect one frame's share on the whole (more frames mean narrower
                    //   indicator).
                    //
                    'fractionChange.indicator': function(e, nil, fraction){
                      if (opt.indicator && nil === undefined) var
                      size= opt.indicator,
                          orbital= opt.orbital,
                          travel= orbital && get(_vertical_) ? get(_height_) : get(_width_),
                          slots= orbital ? get(_footage_) : opt.images.length || get(_frames_),
                          weight= ceil(travel / slots),
                          travel= travel - weight,
                          indicate= round(interpolate(fraction, 0, travel)),
                          indicate= !opt.cw || get(_stitched_) ? indicate : travel - indicate,
                          $indicator= indicator.$x.css(get(_vertical_)
                                                       ? { left: 0, top: px(indicate), bottom: _auto_, width: size, height: weight }
                                                       : { bottom: 0, left: px(indicate), top: _auto_, width: weight, height: size })
                      },

                    // For multi-row object movies, there's a second indicator sticked to the left edge
                    // and communicates:
                    //
                    // - its vertical position accurately reflects actual `tier`
                    // - and its height reflect one row's share on the whole (more rows mean narrower
                    //   indicator).
                    //
                    'tierChange.indicator': function(e, nil, tier){
                      if (opt.rows > 1 && opt.indicator && nil === undefined) var
                      travel= get(_height_),
                          size= opt.indicator,
                          weight= ceil(travel / opt.rows),
                          travel= travel - weight,
                          indicate= round(tier * travel),
                          $yindicator= indicator.$y.css({ left: 0, top: indicate, width: size, height: weight })
                      },

                    // Indicators are bound to `fraction` or `row` changes, meaning they alone can consume
                    // more CPU resources than the entire Reel scene. Use them for development only.
                    //

                    // -----------
                    // Annotations
                    // -----------
                    //
                    // If you want to annotate features of your scene to better describe the subject,
                    // there's annotations for you. Annotations feature allows you to place virtually any
                    // HTML content over or into the image and have its position and visibility synchronized
                    // with the position of Reel. These two easy looking handlers do a lot more than to fit
                    // in here.
                    //
                    // Learn more about [Annotations][1] in the wiki, where a great care has been taken
                    // to in-depth explain this new exciting functionality.
                    //
                    // [1]:https://github.com/pisi/Reel/wiki/Annotations
                    //
                    'setup.annotations': function(e){
                      var
                      $overlay= t.parent()
                      $.each(get(_annotations_), function(ida, note){
                        var
                        $note= typeof note.node == _string_ ? $(note.node) : note.node || {},
                            $note= $note.jquery ? $note : $(tag(_div_), $note),
                            $note= $note.attr({ id: ida }).addClass(annotation_klass),
                            $image= note.image ? $(tag(_img_), note.image) : $(),
                            $link= note.link ? $(tag('a'), note.link).click(function(){ t.trigger('up.annotations', { target: $link }); }) : $()
                        css(hash(ida), { display: _none_, position: _absolute_ }, true);
                        note.image || note.link && $note.append($link);
                        note.link || note.image && $note.append($image);
                        note.link && note.image && $note.append($link.append($image));
                        $note.appendTo($overlay);
                      });
                    },
                    'prepare.annotations': function(e){
                      $.each(get(_annotations_), function(ida, note){
                        $(hash(ida)).hide();
                      });
                    },
                    'frameChange.annotations': function(e, nil, frame){
                      if (!get(_preloaded_) || nil !== undefined) return;
                      var
                      width= get(_width_),
                          stitched= get(_stitched_),
                          ss= get(_stitched_shift_)
                      $.each(get(_annotations_), function(ida, note){
                        var
                        $note= $(hash(ida)),
                            start= note.start || 1,
                            end= note.end,
                            frame= frame || get(_frame_),
                            offset= frame - 1,
                            at= note.at ? (note.at[offset] == '+') : false,
                            offset= note.at ? offset : offset - start + 1,
                            x= typeof note.x!=_object_ ? note.x : note.x[offset],
                            y= typeof note.y!=_object_ ? note.y : note.y[offset],
                            placed= x !== undefined && y !== undefined,
                            visible= placed && (note.at ? at : (offset >= 0 && (!end || offset <= end - start)))
                        if (stitched) var
                        on_edge= x < width && ss > stitched - width,
                            after_edge= x > stitched - width && ss >= 0 && ss < width,
                            x= !on_edge ? x : x + stitched,
                            x= !after_edge ? x : x - stitched,
                            x= x - ss
                        if (get(_responsive_)) var
                        ratio= get(_ratio_),
                            x= x && x * ratio,
                            y= y && y * ratio
                        var
                        style= { display: visible ? _block_:_none_, left: px(x), top: px(y) }
                        $note.css(style);
                      });
                    },
                    'up.annotations': function(e, ev){
                      if (panned > 10 || wheeled) return;
                      var
                      $target= $(ev.target),
                          $link= ($target.is('a') ? $target : $target.parents('a')),
                          href= $link.attr('href')
                      href && (panned= 10);
                    },

                    // ---------------------
                    // Click Stepping Events
                    // ---------------------
                    //
                    // For devices without drag support or for developers, who want to use some sort
                    // of left & right buttons on their site to control your instance from outside, Reel
                    // supports ordinary click with added detection of left half or right half and resulting
                    // triggering of `stepLeft` and `stepRight` events respectively.
                    //
                    // This behavior can be disabled by the [`steppable`](#steppable-Option) option.
                    //
                    'up.steppable': function(e, ev){
                      if (panned || wheeled) return;
                      t.trigger(get(_clicked_location_).x - t.offset().left > 0.5 * get(_width_) ? 'stepRight' : 'stepLeft')
                    },
                    'stepLeft stepRight': function(e){
                      unidle();
                    },

                    // ### `stepLeft` Event ######
                    // `Event`, since 1.2
                    //
                    stepLeft: function(e){
                      set(_backwards_, false);
                      set(_fraction_, get(_fraction_) - get(_bit_) * get(_cwish_));
                    },

                    // ### `stepRight` Event ######
                    // `Event`, since 1.2
                    //
                    stepRight: function(e){
                      set(_backwards_, true);
                      set(_fraction_, get(_fraction_) + get(_bit_) * get(_cwish_));
                    },

                    // ### `stepUp` Event ######
                    // [NEW] `Event`, since 1.3
                    //
                    stepUp: function(e){
                      set(_row_, get(_row_) - 1);
                    },

                    // ### `stepDown` Event ######
                    // [NEW] `Event`, since 1.3
                    //
                    stepDown: function(e){
                      set(_row_, get(_row_) + 1);
                    },

                    // -----------------------
                    // [NEW] Responsive Events
                    // -----------------------
                    //
                    // In responsive mode in case of parent's size change, in addition to actual recalculations,
                    // the instance starts to emit throttled `resize` events. This handler in turn emulates
                    // images changes event leading to reload of frames.
                    //
                    // ---
                    //
                    // ### `resize` Event ######
                    // [NEW] `Event`, since 1.3
                    //
                    resize: function(e, force){
                      if (get(_loading_) && !force) return;
                      var
                      stitched= get(_stitched_),
                          spacing= get(_spacing_),
                          height= get(_height_),
                          is_sprite= !get(_images_).length || stitched,
                          rows= opt.rows || 1,
                          size= get(_images_).length
                      ? !stitched ? undefined : px(stitched)+___+px(height)
                      : stitched && px(stitched)+___+px((height + spacing) * rows - spacing)
                      || px((get(_width_) + spacing) * get(_footage_) - spacing)+___+px((height + spacing) * get(_rows_) * rows * (opt.directional? 2:1) - spacing)
                      t.css({
                        height: is_sprite ? px(height) : null,
                        backgroundSize: size || null
                      });
                      force || t.trigger('imagesChange');
                    },

                    // ----------------
                    // Follow-up Events
                    // ----------------
                    //
                    // When some event as a result triggers another event, it preferably is not triggered
                    // directly, because it would disallow preventing the event propagation / chaining
                    // to happen. Instead a followup handler is bound to the first event and it triggers the
                    // second one.
                    //
                    'setup.fu': function(e){
                      var
                      frame= set(_frame_, opt.frame + (get(_row_) - 1) * get(_frames_))
                      t.trigger('preload')
                    },
                    'wheel.fu': function(){ wheeled= false },
                    'clean.fu': function(){ t.trigger('teardown') },
                    'loaded.fu': function(){ t.trigger('opening') }
                  },

                  // -------------
                  // Tick Handlers
                  // -------------
                  //
                  // As opposed to the events bound to the instance itself, there is a [ticker](#Ticker)
                  // in place, which emits `tick.reel` event on the document level by default every 1/36
                  // of a second and drives all the animations. Three handlers currently bind each instance
                  // to the tick.
                  //
                  pool: {

                    // This handler has a responsibility of continuously updating the preloading indicator
                    // until all images are loaded and to unbind itself then.
                    //
                    'tick.reel.preload': function(e){
                      if (!(loaded || get(_loading_)) || get(_shy_)) return;
                      var
                      width= get(_width_),
                          current= number(preloader.$.css(_width_)),
                          images= get(_images_).length || 1,
                          target= round(1 / images * get(_preloaded_) * width)
                      preloader.$.css({ width: current + (target - current) / 3 + 1 })
                      if (get(_preloaded_) === images && current > width - 1){
                        loaded= false;
                        preloader.$.fadeOut(300, function(){ preloader.$.css({ opacity: 1, width: 0 }) });
                      }
                    },

                    // This handler binds to the document's ticks at all times, regardless the situation.
                    // It serves several tasks:
                    //
                    // - keeps track of how long the instance is being operated by the user,
                    // - or for how long it is braking the velocity inertia,
                    // - decreases gained velocity by applying power of the [`brake`](#brake-Option) option,
                    // - flags the instance as `slidable` again, so that `pan` event handler can be executed
                    //   again,
                    // - updates the [`monitor`](#monitor-Option) value,
                    // - bounces off the edges for non-looping panoramas,
                    // - and most importantly it animates the Reel if [`speed`](#speed-Option) is configured.
                    //
                    'tick.reel': function(e){
                      if (get(_shy_)) return;
                      var
                      velocity= get(_velocity_),
                          leader_tempo= leader(_tempo_),
                          monitor= opt.monitor
                      if (!reel.intense && offscreen()) return;
                      if (braking) var
                      braked= velocity - (get(_brake_) / leader_tempo * braking),
                          velocity= set(_velocity_, braked > 0.1 ? braked : (braking= operated= 0))
                      monitor && $monitor.text(get(monitor));
                      velocity && braking++;
                      operated && operated++;
                      to_bias(0);
                      slidable= true;
                      if (operated && !velocity) return mute(e);
                      if (get(_clicked_)) return mute(e, unidle());
                      if (get(_opening_ticks_) > 0) return;
                      if (!opt.loops && opt.rebound) var
                      edgy= !operated && !(get(_fraction_) % 1) ? on_edge++ : (on_edge= 0),
                          bounce= on_edge >= opt.rebound * 1000 / leader_tempo,
                          backwards= bounce && set(_backwards_, !get(_backwards_))
                      var
                      direction= get(_cwish_) * negative_when(1, get(_backwards_)),
                          ticks= get(_ticks_),
                          step= (!get(_playing_) || oriented || !ticks ? velocity : abs(get(_speed_)) + velocity) / leader(_tempo_),
                          fraction= set(_fraction_, get(_fraction_) - step * direction),
                          ticks= !opt.duration ? ticks : ticks > 0 && set(_ticks_, ticks - 1)
                      !ticks && get(_playing_) && t.trigger('stop');
                    },

                    // This handler performs the opening animation duty when during it the normal animation
                    // is halted until the opening finishes.
                    //
                    'tick.reel.opening': function(e){
                      if (!get(_opening_)) return;
                      var
                      speed= opt.entry || opt.speed,
                          step= speed / leader(_tempo_) * (opt.cw? -1:1),
                          ticks= set(_opening_ticks_, get(_opening_ticks_) - 1),
                          fraction= set(_fraction_, get(_fraction_) + step)
                      ticks || t.trigger('openingDone');
                    }
                  }
                },

                loaded= false,

                // ------------------------
                // Instance Private Helpers
                // ------------------------
                //
                // - Events propagation stopper / muter
                //
                mute= function(e, result){ return e.stopImmediatePropagation() || result },

                // - Shy initialization helper
                //
                shy_setup= function(){ t.trigger('setup') },

                // - User idle control
                //
                operated,
                braking= 0,
                idle= function(){ return operated= 0 },
                unidle= function(){
                  clearTimeout(delay);
                  pool.unbind(_tick_+dot(_opening_), on.pool[_tick_+dot(_opening_)]);
                  set(_opening_ticks_, 0);
                  set(_reeled_, true);
                  return operated= -opt.timeout * leader(_tempo_)
                },
                panned= 0,
                wheeled= false,
                oriented= false,

                // - Constructors of UI elements
                //
                $monitor= $(),
                preloader= function(){
                  css(___+dot(preloader_klass), {
                    position: _absolute_,
                    left: 0, bottom: 0,
                    height: opt.preloader,
                    overflow: _hidden_,
                    backgroundColor: '#000'
                  });
                  return preloader.$= $(tag(_div_), { 'class': preloader_klass })
                },
                indicator= function(axis){
                  css(___+dot(indicator_klass)+dot(axis), {
                    position: _absolute_,
                    width: 0, height: 0,
                    overflow: _hidden_,
                    backgroundColor: '#000'
                  });
                  return indicator['$'+axis]= $(tag(_div_), { 'class': indicator_klass+___+axis })
                },

                // - CSS rules & stylesheet
                //
                css= function(selector, definition, global){
                  var
                  stage= global ? __ : get(_stage_),
                      selector= selector.replace(/^/, stage).replace(____, ____+stage)
                  return css.rules.push(selector+cssize(definition)) && definition
                  function cssize(values){
                    var rules= [];
                    $.each(values, function(key, value){ rules.push(key.replace(/([A-Z])/g, '-$1').toLowerCase()+':'+px(value)+';') });
                    return '{'+rules.join(__)+'}'
                  }
                },
                $style,

                // - Off screen detection (vertical only for performance)
                //
                offscreen= function(){
                  var
                  height= get(_height_),
                      width= get(_width_),
                      rect= t[0].getBoundingClientRect()
                  return rect.top < -height
                  || rect.left < -width
                  || rect.right > width + $(window).width()
                  || rect.bottom > height + $(window).height()
                },

                // - Inertia rotation control
                //
                on_edge= 0,
                last= { x: 0, y: 0 },
                to_bias= function(value){ return bias.push(value) && bias.shift() && value },
                no_bias= function(){ return bias= [0,0] },
                bias= no_bias(),

                // - Graph function to be used
                //
                graph= opt.graph || reel.math[opt.loops ? 'hatch' : 'envelope'],
                normal= reel.normal,

                // - Response to the size changes in responsive mode
                //
                slow_gauge= function(){
                  clearTimeout(gauge_delay);
                  gauge_delay= setTimeout(gauge, reel.resize_gauge);
                },
                gauge= function(){
                  if (t.width() == get(_width_)) return;
                  var
                  truescale= get(_truescale_),
                      ratio= set(_ratio_, t.width() / truescale.width)
                  $.each(truescale, function(key, value){ set(key, round(value * ratio)) })
                  t.trigger('resize');
                },

                // - Delay timer pointers
                //
                delay, // openingDone's delayed play
                gauge_delay, // slow_gauge's throttle

                // - Interaction graph's zero point reset
                //
                recenter_mouse= function(revolution, x, y){
                  var
                  fraction= set(_clicked_on_, get(_fraction_)),
                      tier= set(_clicked_tier_, get(_tier_)),
                      loops= opt.loops,
                      lo= set(_lo_, loops ? 0 : - fraction * revolution),
                      hi= set(_hi_, loops ? revolution : revolution - fraction * revolution)
                  return x !== undefined && set(_clicked_location_, { x: x, y: y }) || undefined
                },
                slidable= true,

                // ~~~
                //
                // Data interface used to set `fraction` and `tier` with the value recalculated through their
                // _cousin_ keys (`frame` for `fraction` and `row` for `tier`). This value is actually set
                // only if it does make a difference in the cousin value.
                //
                may_set= function(key, value, cousin, maximum){
                  if (!maximum) return;
                  var
                  current= get(key) || 0,
                      recalculated= value !== undefined ? value : (cousin - 1) / (maximum - 1),
                      recalculated= key != _fraction_ ? recalculated : min( recalculated, 0.9999),
                      worthy= +abs(current - recalculated).toFixed(8) >= +(1 / (maximum - 1)).toFixed(8),
                      value= worthy ? set(key, recalculated) : value || current
                  return value
                },

                // ~~~
                //
                // Global events are bound to the pool (`document`), but to make it work inside an `<iframe>`
                // we need to bind to the parent document too to maintain the dragging even outside the area
                // of the `<iframe>`.
                //
                pools= pool
            try{ if (pool[0] != top.document) pools= pool.add(top.document) }
            catch(e){}

            // A private flag `$iframe` is established to indicate Reel being viewed inside `<iframe>`.
            //
            var
            $iframe= top === self ? $() : (function sense_iframe($ifr){
              $('iframe', pools.last()).each(function(){
                try{ if ($(this).contents().find(_head_).html() == $(_head_).html()) return ($ifr= $(this)) && false }
                catch(e){}
              })
              return $ifr
            })()
            css.rules= [];
            on.setup();
          });

          // ~~~
          //
          // Reel maintains a ticker, which guides all animations. There's only one ticker per document
          // and all instances bind to it. Ticker's mechanism measures and compares times before and after
          // the `tick.reel` event trigger to estimate the time spent on executing `tick.reel`'s handlers.
          // The actual timeout time is then adjusted by the amount to run as close to expected tempo
          // as possible.
          //
          ticker= ticker || (function tick(){
            var
            start= +new Date(),
                tempo= leader(_tempo_)
            if (!tempo) return ticker= null;
            pool.trigger(_tick_);
            reel.cost= (+new Date() + reel.cost - start) / 2;
            return ticker= setTimeout(tick, max(4, 1000 / tempo - reel.cost));
          })();

          return $(instances);
        }
      },

      // -----------
      // Destruction
      // -----------
      //
      // The evil-twin of `.reel()`. Tears down and wipes off entire instance.
      //
      // ---

      // ### `.unreel()` Method ######
      // returns `jQuery`, since 1.2
      //
      unreel: function(){
        return this.trigger('teardown');
      }
    },

    // -------------------
    // Regular Expressions
    // -------------------
    //
    // Few regular expressions is used here and there mostly for options validation and verification
    // levels of user agent's capabilities.
    //
    // ---

    // ### `$.reel.re` ######
    // `RegExp`, since 1.1
    //
    re: {
      /* Valid image file format */
      image:         /^(.*)\.(jpg|jpeg|png|gif)\??.*$/i,
      /* User agent failsafe stack */
      ua: [
        /(msie|opera|firefox|chrome|safari)[ \/:]([\d.]+)/i,
        /(webkit)\/([\d.]+)/i,
        /(mozilla)\/([\d.]+)/i
      ],
      /* Array in a string (comma-separated values) */
      array:         / *, */,
      /* Lazy (low-CPU mobile devices) */
      lazy_agent:    /\(iphone|ipod|android|fennec|blackberry/i,
      /* Format of frame class flag on the instance */
      frame_klass:   /frame-\d+/,
      /* Mask for substitutions in URL */
      substitution:  /(@([A-Z]))/g,
      /* Used for cross-browser detection of Regexp no match situation */
      no_match:      /^(undefined|)$/,
      /* [Sequence](#Sequence) string format */
      sequence:      /(^[^#|]*([#]+)[^#|]*)($|[|]([0-9]+)\.\.([0-9]+))($|[|]([0-9]+)$)/
    },

    // ------------------------
    // Content Delivery Network
    // ------------------------
    //
    // [CDN][1] is used for distributing mouse cursors to all instances running world-wide. It runs
    // on Google cloud infrastructure. If you want to ease up on the servers, please consider setting up
    // your own location with the cursors.
    //
    // [1]:https://github.com/pisi/Reel/wiki/CDN
    //
    // ---

    // ### `$.reel.cdn` ######
    // `String` (URL path), since 1.1
    //
    cdn: 'http://code.vostrel.net/',

    // -----------
    // Math Behind
    // -----------
    //
    // Surprisingly there's very little math behind Reel. Two equations (graph functions), which
    // drive Reel motion and receive the same set of options.
    //
    // ---

    // ### `$.reel.math` ######
    // `Object`, since 1.1
    //
    math: {

      //     1 |  ********
      //       |          **
      //       |            **
      //       |              **
      //       |                **
      //       |                  ********
      //     0  ----------------------------›
      //
      envelope: function(x, start, revolution, lo, hi, cwness, y){
        return start + min_max(lo, hi, - x * cwness) / revolution
      },

      //     1 |        **          **
      //       |          **          **
      //       |            **          **
      //       |  **          **
      //       |    **          **
      //       |      **          **
      //     0  ----------------------------›
      //
      hatch: function(x, start, revolution, lo, hi, cwness, y){
        var
        x= (x < lo ? hi : 0) + x % hi, // Looping
            fraction= start + (- x * cwness) / revolution
        return fraction - floor(fraction)
      },

      // Plus equation for interpolating `fraction` (and `tier`) value into `frame` and `row`.
      //
      interpolate: function(fraction, lo, hi){
        return lo + fraction * (hi - lo)
      },

      // And one for calculation of the shortest frame distance from start to the end.
      // 
      distance: function(start, end, total){
        var
        half= total / 2,
            d= end - start
        return d < -half ? d + total : d > half ? d - total : d
      }
    },

    // ----------------
    // Preloading Modes
    // ----------------
    //
    // Reel doesn't load frames in a linear manner from first to last (alhough it can if configured
    // that way with the [`preload`](#preload-Option) option). Reel will take the linear configured
    // sequence and hand it over to one of `$.reel.preload` functions, along with reference to options
    // and the RO data intearface, and it expects the function to reorder the incoming Array and return
    // it back.
    //
    // ---

    // ### `$.reel.preload` ######
    // `Object`, since 1.2
    //
    preload: {

      // The best (and default) option is the `fidelity` processor, which is designed for a faster and
      // better perceived loading.
      //
      // ![Example](https://camo.githubapp.com/74b73060a50f3cbaf522ec31530d34e3fa5cbcb9/687474703a2f2f6a71756572792e766f737472656c2e637a2f7265656c2f7363617474657265642e6c6f6164696e672e676966)
      //
      fidelity: function(sequence, opt, get){
        var
        orbital= opt.orbital,
            rows= orbital ? 2 : opt.rows || 1,
            frames= orbital ? get(_footage_) : get(_frames_),
            start= (opt.row-1) * frames,
            values= new Array().concat(sequence),
            present= new Array(sequence.length + 1),
            priority= rows < 2 ? [] : values.slice(start, start + frames)
        return spread(priority, 1, start).concat(spread(values, rows, 0))

        function spread(sequence, rows, offset){
          if (!sequence.length) return [];
          var
          order= [],
              passes= 4 * rows,
              start= opt.frame,
              frames= sequence.length,
              plus= true,
              granule= frames / passes
          for(var i= 0; i < passes; i++)
            add(start + round(i * granule));
          while(granule > 1)
            for(var i= 0, length= order.length, granule= granule / 2, p= plus= !plus; i < length; i++)
              add(order[i] + (plus? 1:-1) * round(granule));
          for(var i=0; i <= frames; i++) add(i);
          for(var i= 0; i < order.length; i++)
            order[i]= sequence[order[i] - 1];
          return order
          function add(frame){
            while(!(frame >= 1 && frame <= frames))
              frame+= frame < 1 ? +frames : -frames;
            return present[offset + frame] || (present[offset + frame]= !!order.push(frame))
          }
        }
      },

      // You can opt for a `linear` loading order too, but that has a drawback of leaving large gap
      // of unloaded frames.
      //
      linear: function(sequence, opt, get){
        return sequence
      }
    },

    // -------------------------
    // [NEW] Data Values in URLs
    // -------------------------
    //
    // Reel will process each and every image resource URL and substitute special markup
    // with actual values from the data store. Marks made of `@` character followed by upper case
    // letter will be substituted with values either directly from data store (`@W` and `@H`
    // for `width` and `height`) or calculated (`@T` is substituted with momentary timestamp
    // in milliseconds).
    // Markup can appear anywhere in the folder name, file name or the query params
    // (also in [`path`](#path-Option)) and even multiple times.
    //
    // Comes handy in product configurators
    // and works magic in conjunction with [responsive](#responsive-Option) option.
    //
    // _**Example:** Following URLs:_
    //
    //     image.jpg?size=@Wx@H
    //     pic/@W/@H/rabbit.png
    //     image.php?nocache=@T
    //
    // _... will come out like this for Reel 320 pixels wide and 180 high:_
    //
    //     image.jpg?size=320x180
    //     pic/320/180/rabbit.png
    //     image.php?nocache=1377604502788
    //
    // ---

    // ### `$.reel.substitute()` ######
    // [NEW] `Function`, since 1.3
    //
    substitute: function(uri, get){
      return uri.replace(reel.re.substitution, function(match, mark, key){
        return typeof reel.substitutes[key] == 'function'
          ? reel.substitutes[key](get) : substitution_keys[key]
          ? get(substitution_keys[key]) : mark;
      });
    },
    // ### `$.reel.substitutes` ######
    // [NEW] `Object` of `Function`s, since 1.3
    //
    substitutes: {
      T: function(get){ return +new Date() }
    },

    // ------------------------
    // Data Value Normalization
    // ------------------------
    //
    // On all data values being stored with `.reel()` an attempt is made to normalize the value. Like
    // for example normalization of frame `55` when there's just `45` frames total. These are the built-in
    // normalizations. Normalization function has the same name as the data key it is assigned to
    // and is given the raw value in arguments, along with reference to the instances data object,
    // and it has to return the normalized value.
    //
    // ---

    // ### `$.reel.normal` ######
    // `Object`, since 1.2
    //
    normal: {
      fraction: function(fraction, data){
        if (fraction === null) return fraction;
        return data[_options_].loops ? fraction - floor(fraction) : min_max(0, 1, fraction)
      },
      tier: function(tier, data){
        if (tier === null) return tier;
        return min_max(0, 1, tier)
      },
      row: function(row, data){
        if (row === null) return row;
        return round(min_max(1, data[_options_].rows, row))
      },
      frame: function(frame, data){
        if (frame === null) return frame;
        var
        opt= data[_options_],
            frames= data[_frames_] * (opt.orbital ? 2 : opt.rows || 1),
            result= round(opt.loops ? frame % frames || frames : min_max(1, frames, frame))
        return result < 0 ? result + frames : result
      },
      images: function(images, data){
        var
        sequence= reel.re.sequence.exec(images),
            result= !sequence ? images : reel.sequence(sequence, data[_options_])
        return result;
      }
    },

    // -----------------
    // Sequence Build-up
    // -----------------
    //
    // When configured with a String value for [`images`](#images-Option) like `image##.jpg`, it first has
    // to be converted into an actual Array by engaging the counter placeholder.
    //
    // ---

    // ### `$.reel.sequence()` ######
    // `Function`, since 1.2
    //
    sequence: function(sequence, opt){
      if (sequence.length <= 1) return opt.images;
      var
      images= [],
          orbital= opt.orbital,
          url= sequence[1],
          placeholder= sequence[2],
          start= sequence[4],
          start= reel.re.no_match.test(start+__) ? 1 : +start,
          rows= orbital ? 2 : opt.rows || 1,
          frames= orbital ? opt.footage : opt.stitched ? 1 : opt.frames,
          end= +(sequence[5] || rows * frames),
          total= end - start,
          increment= +sequence[7] || 1,
          counter= 0
      while(counter <= total){
        images.push(url.replace(placeholder, pad((start + counter + __), placeholder.length, '0')));
        counter+= increment;
      }
      return images;
    },

    // --------------
    // Reel Instances
    // --------------
    //
    // `$.reel.instances` holds an inventory of all running instances in the DOM document.
    //
    // ---

    // ### `$.reel.instances` ######
    // `jQuery`, since 1.1
    //
    instances: $(),

    // For ticker-synchronization-related purposes Reel maintains a reference to the leaders data object
    // all the time.
    //
    // ---

    // ### `$.reel.leader` ######
    // `Object` (DOM data), since 1.1
    //
    leader: leader,

    // `$.reel.resize_gauge` specifies a throttling interval for triggering of `resize` events,
    // in milliseconds.
    //
    // ---

    // ### `$.reel.resize_gauge` ######
    // [NEW] `Number`, since 1.3
    //
    resize_gauge: 300,

    // `$.reel.concurrent_requests` specifies how many preloading requests will run simultaneously.
    //
    // ---

    // ### `$.reel.concurrent_requests` ######
    // [NEW] `Number`, since 1.3
    //
    concurrent_requests: 4,

    // `$.reel.cost` holds document-wide costs in miliseconds of running all Reel instances. It is used
    // to adjust actual timeout of the ticker.
    //
    // ---

    // ### `$.reel.cost` ######
    // `Number`, since 1.1
    //
    cost: 0
  },

      // ------------------------
      // Private-scoped Variables
      // ------------------------
      //
      pool= $(document),
      client= navigator.userAgent,
      browser= reel.re.ua[0].exec(client) || reel.re.ua[1].exec(client) || reel.re.ua[2].exec(client),
      browser_version= +browser[2].split('.').slice(0,2).join('.'),
      ie= browser[1] == 'MSIE',
      knows_data_urls= !(ie && browser_version < 8),
      knows_background_size= !(ie && browser_version < 9),
      ticker,

      // ---------------
      // CSS Class Names
      // ---------------
      //
      // These are all the class names assigned by Reel to various DOM elements during initialization of the UI
      // and they all share same base `"reel"`, which in isolation also is the class of the `<img>` node you
      // converted into Reel.
      //
      klass= 'reel',

      // Rest of the class names only extend this base class forming for example `.reel-overlay`, a class
      // assigned to the outter instance wrapper (`<img>`'s injected parent).
      //
      overlay_klass= klass + '-overlay',
      cache_klass= klass + '-cache',
      indicator_klass= klass + '-indicator',
      preloader_klass= klass + '-preloader',
      monitor_klass= klass + '-monitor',
      annotation_klass= klass + '-annotation',
      panning_klass= klass + '-panning',
      loading_klass= klass + '-loading',

      // The instance wrapper is flagged with actual frame number using a this class.
      //
      // _**Example:** Reel on frame 10 will carry a class name `frame-10`._
      //
      frame_klass= 'frame-',

      // --------------------------------
      // Shortcuts And Minification Cache
      // --------------------------------
      //
      // Several math functions are referenced inside the private scope to yield smaller filesize
      // when the code is minified.
      //
      math= Math,
      round= math.round, floor= math.floor, ceil= math.ceil,
      min= math.min, max= math.max, abs= math.abs,
      number= parseInt,
      interpolate= reel.math.interpolate,

      // For the very same reason all storage key Strings are cached into local vars.
      //
      _annotations_= 'annotations', _area_= 'area', _auto_= 'auto',
      _backup_= 'backup', _backwards_= 'backwards', _bit_= 'bit', _brake_= 'brake',
      _cache_= 'cache', _cached_=_cache_+'d', _center_= 'center', _class_= 'class', _click_= 'click',
      _clicked_= _click_+'ed', _clicked_location_= _clicked_+'_location', _clicked_on_= _clicked_+'_on',
      _clicked_tier_= _clicked_+'_tier', _cwish_= 'cwish',
      _departure_= 'departure', _destination_= 'destination', _distance_= 'distance',
      _footage_= 'footage', _fraction_= 'fraction', _frame_= 'frame', _framelock_= 'framelock', _frames_= 'frames',
      _height_= 'height', _hi_= 'hi', _hidden_= 'hidden',
      _image_= 'image', _images_= 'images',
      _lo_= 'lo', _loading_= 'loading',
      _mouse_= 'mouse',
      _opening_= 'opening', _opening_ticks_= _opening_+'_ticks', _options_= 'options',
      _playing_= 'playing', _preloaded_= 'preloaded',
      _ratio_= 'ratio', _reeling_= 'reeling', _reeled_= 'reeled', _responsive_= 'responsive', _revolution_= 'revolution',
      _revolution_y_= 'revolution_y', _row_= 'row', _rowlock_= 'rowlock', _rows_= 'rows',
      _shy_= 'shy', _spacing_= 'spacing', _speed_= 'speed', _src_= 'src', _stage_= 'stage', _stitched_= 'stitched',
      _stitched_shift_= _stitched_+'_shift', _stitched_travel_= _stitched_+'_travel', _stopped_= 'stopped',
      _style_= 'style',
      _tempo_= 'tempo', _ticks_= 'ticks', _tier_= 'tier', _touch_= 'touch', _truescale_= 'truescale',
      _velocity_= 'velocity', _vertical_= 'vertical',
      _width_= 'width',

      // And the same goes for browser events too.
      //
      ns= dot(klass),
      pns= dot('pan') + ns,
      _deviceorientation_= 'deviceorientation'+ns, _dragstart_= 'dragstart'+ns,
      _mousedown_= _mouse_+'down'+ns, _mouseenter_= _mouse_+'enter'+ns, _mouseleave_= _mouse_+'leave'+pns,
      _mousemove_= _mouse_+'move'+pns, _mouseup_= _mouse_+'up'+pns, _mousewheel_= _mouse_+'wheel'+ns,
      _tick_= 'tick'+ns, _touchcancel_= _touch_+'cancel'+pns, _touchend_= _touch_+'end'+pns,
      _touchstart_= _touch_+'start'+ns, _touchmove_= _touch_+'move'+pns,
      _resize_= 'resize'+ns,

      // And some other frequently used Strings.
      //
      __= '', ___= ' ', ____=',', _absolute_= 'absolute', _block_= 'block', _cdn_= '@CDN@', _div_= 'div',
      _hand_= 'hand', _head_= 'head', _html_= 'html', _id_= 'id',
      _img_= 'img', _jquery_reel_= 'jquery.'+klass, _move_= 'move', _none_= 'none', _object_= 'object',
      _preload_= 'preload', _string_= 'string',

      // Collection of data keys holding scalable pixel values responsive to the scale ratio
      // 
      responsive_keys= [_width_, _height_, _spacing_, _revolution_, _revolution_y_, _stitched_, _stitched_shift_, _stitched_travel_],
      substitution_keys= { W: _width_, H: _height_ },

      // ---------------
      // Image Resources
      // ---------------
      //
      // Alhough we do what we can to hide the fact, Reel actually needs a few image resources to support
      // some of its actions. First, we may need a transparent image for the original `<img>` to uncover
      // the sprite applied to its background. This one is embedded in the code as it is very small.
      //
      transparent= knows_data_urls ? embedded('CAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7') : _cdn_+'blank.gif',

      // Proper cross-browser cursors however need to come in an odd format, which essentially is not
      // compressed at all and this means bigger filesize. While it is no more than ~15k, it is unfit
      // for embedding directly here, so a [`CDN`](#Content-Delivery-Network) is employed to retrieve
      // the images from in an effective gzipped and cachable manner.
      //
      reel_cursor= url(_cdn_+_jquery_reel_+'.cur')+____+_move_,
      drag_cursor= url(_cdn_+_jquery_reel_+'-drag.cur')+____+_move_,
      drag_cursor_down= url(_cdn_+_jquery_reel_+'-drag-down.cur')+____+_move_,

      // ~~~
      //
      // We then only route around MSIE's left button identification quirk (IE 8- reports left as right).
      //
      lazy= reel.lazy= (reel.re.lazy_agent).test(client),

      DRAG_BUTTON= ie && browser_version < 9 ? 1 : 0,

      // ~~~
      //
      // So far jQuery doesn't have a proper built-in mechanism to detect/report DOM node removal.
      // But internally, jQuery calls `$.cleanData()` to flush the DOM data and minimize memory leaks.
      // Reel wraps this function and as a result `clean` event handler is triggered for every element.
      // Note, that the `clean` event does not bubble.
      //
      cleanData= $.cleanData,
      cleanDataEvent= $.cleanData= function(elements){
        $(elements).each(function(){ $(this).triggerHandler('clean'); });
        return cleanData.apply(this, arguments);
      }

  // Expose plugin functions as jQuery methods, do the initial global scan for data-configured
  // `<img`> tags to become enhanced and export the entire namespace module.
  //
  $.extend($.fn, reel.fn) && $(reel.scan);
  return reel;

  // Bunch of very useful helpers.
  //
  function add_instance($instance){ return (reel.instances.push($instance[0])) && $instance }
  function remove_instance($instance){ return (reel.instances= reel.instances.not(hash($instance.attr(_id_)))) && $instance }
  function leader(key){ return reel.instances.first().data(key) }
  function embedded(image){ return 'data:image/gif;base64,R0lGODlh' + image }
  function tag(string){ return '<' + string + '/>' }
  function dot(string){ return '.' + (string || '') }
  function cdn(path){ return path.replace(_cdn_, reel.cdn) }
  function url(location){ return 'url(\'' + reen(location) + '\')' }
  function axis(key, value){ return typeof value == _object_ ? value[key] : value }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function negative_when(value, condition){ return abs(value) * (condition ? -1 : 1) }
  function pointer(e){ return e.touch || e.originalEvent.touches && e.originalEvent.touches[0] || e }
  function gyro(e){ return e.originalEvent }
  function px(value){ return value === undefined ? 0 : typeof value == _string_ ? value : value + 'px' }
  function hash(value){ return '#' + value }
  function pad(string, len, fill){ while (string.length < len) string= fill + string; return string }
  function twochar(string){ return pad(string, 2, '0') }
  function reen(uri){ return encodeURI(decodeURI(uri)) }
  function soft_array(string){ return reel.re.array.exec(string) ? string.split(reel.re.array) : string }
  function detached($node){ return !$node.parents(_html_).length }
  function numerize_array(array){ return typeof array == _string_ ? array : $.each(array, function(ix, it){ array[ix]= it ? +it : undefined }) }
  function error(message){ try{ console.error('[ Reel ] '+message) }catch(e){} }
})(jQuery, window, document);

               });
;/*!
 * jQuery Validation Plugin v1.12.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
(function($) {

  $.extend($.fn, {
    // http://jqueryvalidation.org/validate/
    validate: function( options ) {

      // if nothing is selected, return nothing; can't chain anyway
      if ( !this.length ) {
        if ( options && options.debug && window.console ) {
          console.warn( "Nothing selected, can't validate, returning nothing." );
        }
        return;
      }

      // check if a validator for this form was already created
      var validator = $.data( this[0], "validator" );
      if ( validator ) {
        return validator;
      }

      // Add novalidate tag if HTML5.
      this.attr( "novalidate", "novalidate" );

      validator = new $.validator( options, this[0] );
      $.data( this[0], "validator", validator );

      if ( validator.settings.onsubmit ) {

        this.validateDelegate( ":submit", "click", function( event ) {
          if ( validator.settings.submitHandler ) {
            validator.submitButton = event.target;
          }
          // allow suppressing validation by adding a cancel class to the submit button
          if ( $(event.target).hasClass("cancel") ) {
            validator.cancelSubmit = true;
          }

          // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
          if ( $(event.target).attr("formnovalidate") !== undefined ) {
            validator.cancelSubmit = true;
          }
        });

        // validate the form on submit
        this.submit( function( event ) {
          if ( validator.settings.debug ) {
            // prevent form submit to be able to see console output
            event.preventDefault();
          }
          function handle() {
            var hidden;
            if ( validator.settings.submitHandler ) {
              if ( validator.submitButton ) {
                // insert a hidden input as a replacement for the missing submit button
                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
              }
              validator.settings.submitHandler.call( validator, validator.currentForm, event );
              if ( validator.submitButton ) {
                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                hidden.remove();
              }
              return false;
            }
            return true;
          }

          // prevent submit for invalid forms or custom submit handlers
          if ( validator.cancelSubmit ) {
            validator.cancelSubmit = false;
            return handle();
          }
          if ( validator.form() ) {
            if ( validator.pendingRequest ) {
              validator.formSubmitted = true;
              return false;
            }
            return handle();
          } else {
            validator.focusInvalid();
            return false;
          }
        });
      }

      return validator;
    },
    // http://jqueryvalidation.org/valid/
    valid: function() {
      var valid, validator;

      if ( $(this[0]).is("form")) {
        valid = this.validate().form();
      } else {
        valid = true;
        validator = $(this[0].form).validate();
        this.each(function() {
          valid = validator.element(this) && valid;
        });
      }
      return valid;
    },
    // attributes: space separated list of attributes to retrieve and remove
    removeAttrs: function( attributes ) {
      var result = {},
          $element = this;
      $.each(attributes.split(/\s/), function( index, value ) {
        result[value] = $element.attr(value);
        $element.removeAttr(value);
      });
      return result;
    },
    // http://jqueryvalidation.org/rules/
    rules: function( command, argument ) {
      var element = this[0],
          settings, staticRules, existingRules, data, param, filtered;

      if ( command ) {
        settings = $.data(element.form, "validator").settings;
        staticRules = settings.rules;
        existingRules = $.validator.staticRules(element);
        switch (command) {
          case "add":
            $.extend(existingRules, $.validator.normalizeRule(argument));
            // remove messages from rules, but allow them to be set separately
            delete existingRules.messages;
            staticRules[element.name] = existingRules;
            if ( argument.messages ) {
              settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
            }
            break;
          case "remove":
            if ( !argument ) {
              delete staticRules[element.name];
              return existingRules;
            }
            filtered = {};
            $.each(argument.split(/\s/), function( index, method ) {
              filtered[method] = existingRules[method];
              delete existingRules[method];
              if ( method === "required" ) {
                $(element).removeAttr("aria-required");
              }
            });
            return filtered;
        }
      }

      data = $.validator.normalizeRules(
        $.extend(
          {},
          $.validator.classRules(element),
          $.validator.attributeRules(element),
          $.validator.dataRules(element),
          $.validator.staticRules(element)
        ), element);

      // make sure required is at front
      if ( data.required ) {
        param = data.required;
        delete data.required;
        data = $.extend({ required: param }, data );
        $(element).attr( "aria-required", "true" );
      }

      // make sure remote is at back
      if ( data.remote ) {
        param = data.remote;
        delete data.remote;
        data = $.extend( data, { remote: param });
      }

      return data;
    }
  });

  // Custom selectors
  $.extend($.expr[":"], {
    // http://jqueryvalidation.org/blank-selector/
    blank: function( a ) { return !$.trim("" + $(a).val()); },
    // http://jqueryvalidation.org/filled-selector/
    filled: function( a ) { return !!$.trim("" + $(a).val()); },
    // http://jqueryvalidation.org/unchecked-selector/
    unchecked: function( a ) { return !$(a).prop("checked"); }
  });

  // constructor for validator
  $.validator = function( options, form ) {
    this.settings = $.extend( true, {}, $.validator.defaults, options );
    this.currentForm = form;
    this.init();
  };

  // http://jqueryvalidation.org/jQuery.validator.format/
  $.validator.format = function( source, params ) {
    if ( arguments.length === 1 ) {
      return function() {
        var args = $.makeArray(arguments);
        args.unshift(source);
        return $.validator.format.apply( this, args );
      };
    }
    if ( arguments.length > 2 && params.constructor !== Array  ) {
      params = $.makeArray(arguments).slice(1);
    }
    if ( params.constructor !== Array ) {
      params = [ params ];
    }
    $.each(params, function( i, n ) {
      source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
        return n;
      });
    });
    return source;
  };

  $.extend($.validator, {

    defaults: {
      messages: {},
      groups: {},
      rules: {},
      errorClass: "error",
      validClass: "valid",
      errorElement: "label",
      focusInvalid: true,
      errorContainer: $([]),
      errorLabelContainer: $([]),
      onsubmit: true,
      ignore: ":hidden",
      ignoreTitle: false,
      onfocusin: function( element ) {
        this.lastActive = element;

        // hide error label and remove error class on focus if enabled
        if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
          if ( this.settings.unhighlight ) {
            this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
          }
          this.addWrapper(this.errorsFor(element)).hide();
        }
      },
      onfocusout: function( element ) {
        if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
          this.element(element);
        }
      },
      onkeyup: function( element, event ) {
        if ( event.which === 9 && this.elementValue(element) === "" ) {
          return;
        } else if ( element.name in this.submitted || element === this.lastElement ) {
          this.element(element);
        }
      },
      onclick: function( element ) {
        // click on selects, radiobuttons and checkboxes
        if ( element.name in this.submitted ) {
          this.element(element);

          // or option elements, check parent select in that case
        } else if ( element.parentNode.name in this.submitted ) {
          this.element(element.parentNode);
        }
      },
      highlight: function( element, errorClass, validClass ) {
        if ( element.type === "radio" ) {
          this.findByName(element.name).addClass(errorClass).removeClass(validClass);
        } else {
          $(element).addClass(errorClass).removeClass(validClass);
        }
      },
      unhighlight: function( element, errorClass, validClass ) {
        if ( element.type === "radio" ) {
          this.findByName(element.name).removeClass(errorClass).addClass(validClass);
        } else {
          $(element).removeClass(errorClass).addClass(validClass);
        }
      }
    },

    // http://jqueryvalidation.org/jQuery.validator.setDefaults/
    setDefaults: function( settings ) {
      $.extend( $.validator.defaults, settings );
    },

    messages: {
      required: "This field is required.",
      remote: "Please fix this field.",
      email: "Please enter a valid email address.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date (ISO).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      creditcard: "Please enter a valid credit card number.",
      equalTo: "Please enter the same value again.",
      maxlength: $.validator.format("Please enter no more than {0} characters."),
      minlength: $.validator.format("Please enter at least {0} characters."),
      rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
      range: $.validator.format("Please enter a value between {0} and {1}."),
      max: $.validator.format("Please enter a value less than or equal to {0}."),
      min: $.validator.format("Please enter a value greater than or equal to {0}.")
    },

    autoCreateRanges: false,

    prototype: {

      init: function() {
        this.labelContainer = $(this.settings.errorLabelContainer);
        this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
        this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
        this.submitted = {};
        this.valueCache = {};
        this.pendingRequest = 0;
        this.pending = {};
        this.invalid = {};
        this.reset();

        var groups = (this.groups = {}),
            rules;
        $.each(this.settings.groups, function( key, value ) {
          if ( typeof value === "string" ) {
            value = value.split(/\s/);
          }
          $.each(value, function( index, name ) {
            groups[name] = key;
          });
        });
        rules = this.settings.rules;
        $.each(rules, function( key, value ) {
          rules[key] = $.validator.normalizeRule(value);
        });

        function delegate(event) {
          var validator = $.data(this[0].form, "validator"),
              eventType = "on" + event.type.replace(/^validate/, ""),
              settings = validator.settings;
          if ( settings[eventType] && !this.is( settings.ignore ) ) {
            settings[eventType].call(validator, this[0], event);
          }
        }
        $(this.currentForm)
          .validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
                            "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                            "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                            "[type='week'], [type='time'], [type='datetime-local'], " +
                            "[type='range'], [type='color'] ",
                            "focusin focusout keyup", delegate)
          .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

        if ( this.settings.invalidHandler ) {
          $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
        }

        // Add aria-required to any Static/Data/Class required fields before first validation
        // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
        $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
      },

      // http://jqueryvalidation.org/Validator.form/
      form: function() {
        this.checkForm();
        $.extend(this.submitted, this.errorMap);
        this.invalid = $.extend({}, this.errorMap);
        if ( !this.valid() ) {
          $(this.currentForm).triggerHandler("invalid-form", [ this ]);
        }
        this.showErrors();
        return this.valid();
      },

      checkForm: function() {
        this.prepareForm();
        for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
          this.check( elements[i] );
        }
        return this.valid();
      },

      // http://jqueryvalidation.org/Validator.element/
      element: function( element ) {
        var cleanElement = this.clean( element ),
            checkElement = this.validationTargetFor( cleanElement ),
            result = true;

        this.lastElement = checkElement;

        if ( checkElement === undefined ) {
          delete this.invalid[ cleanElement.name ];
        } else {
          this.prepareElement( checkElement );
          this.currentElements = $( checkElement );

          result = this.check( checkElement ) !== false;
          if (result) {
            delete this.invalid[checkElement.name];
          } else {
            this.invalid[checkElement.name] = true;
          }
        }
        // Add aria-invalid status for screen readers
        $( element ).attr( "aria-invalid", !result );

        if ( !this.numberOfInvalids() ) {
          // Hide error containers on last error
          this.toHide = this.toHide.add( this.containers );
        }
        this.showErrors();
        return result;
      },

      // http://jqueryvalidation.org/Validator.showErrors/
      showErrors: function( errors ) {
        if ( errors ) {
          // add items to error list and map
          $.extend( this.errorMap, errors );
          this.errorList = [];
          for ( var name in errors ) {
            this.errorList.push({
              message: errors[name],
              element: this.findByName(name)[0]
            });
          }
          // remove items from success list
          this.successList = $.grep( this.successList, function( element ) {
            return !(element.name in errors);
          });
        }
        if ( this.settings.showErrors ) {
          this.settings.showErrors.call( this, this.errorMap, this.errorList );
        } else {
          this.defaultShowErrors();
        }
      },

      // http://jqueryvalidation.org/Validator.resetForm/
      resetForm: function() {
        if ( $.fn.resetForm ) {
          $(this.currentForm).resetForm();
        }
        this.submitted = {};
        this.lastElement = null;
        this.prepareForm();
        this.hideErrors();
        this.elements()
          .removeClass( this.settings.errorClass )
          .removeData( "previousValue" )
          .removeAttr( "aria-invalid" );
      },

      numberOfInvalids: function() {
        return this.objectLength(this.invalid);
      },

      objectLength: function( obj ) {
        /* jshint unused: false */
        var count = 0,
            i;
        for ( i in obj ) {
          count++;
        }
        return count;
      },

      hideErrors: function() {
        this.addWrapper( this.toHide ).hide();
      },

      valid: function() {
        return this.size() === 0;
      },

      size: function() {
        return this.errorList.length;
      },

      focusInvalid: function() {
        if ( this.settings.focusInvalid ) {
          try {
            $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
              .filter(":visible")
              .focus()
            // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
              .trigger("focusin");
          } catch(e) {
            // ignore IE throwing errors when focusing hidden elements
          }
        }
      },

      findLastActive: function() {
        var lastActive = this.lastActive;
        return lastActive && $.grep(this.errorList, function( n ) {
          return n.element.name === lastActive.name;
        }).length === 1 && lastActive;
      },

      elements: function() {
        var validator = this,
            rulesCache = {};

        // select all valid inputs inside the form (no submit or reset buttons)
        return $(this.currentForm)
          .find("input, select, textarea")
          .not(":submit, :reset, :image, [disabled]")
          .not( this.settings.ignore )
          .filter(function() {
          if ( !this.name && validator.settings.debug && window.console ) {
            console.error( "%o has no name assigned", this);
          }

          // select only the first element for each name, and only those with rules specified
          if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
            return false;
          }

          rulesCache[this.name] = true;
          return true;
        });
      },

      clean: function( selector ) {
        return $(selector)[0];
      },

      errors: function() {
        var errorClass = this.settings.errorClass.split(" ").join(".");
        return $(this.settings.errorElement + "." + errorClass, this.errorContext);
      },

      reset: function() {
        this.successList = [];
        this.errorList = [];
        this.errorMap = {};
        this.toShow = $([]);
        this.toHide = $([]);
        this.currentElements = $([]);
      },

      prepareForm: function() {
        this.reset();
        this.toHide = this.errors().add( this.containers );
      },

      prepareElement: function( element ) {
        this.reset();
        this.toHide = this.errorsFor(element);
      },

      elementValue: function( element ) {
        var val,
            $element = $(element),
            type = $element.attr("type");

        if ( type === "radio" || type === "checkbox" ) {
          return $("input[name='" + $element.attr("name") + "']:checked").val();
        }

        val = $element.val();
        if ( typeof val === "string" ) {
          return val.replace(/\r/g, "");
        }
        return val;
      },

      check: function( element ) {
        element = this.validationTargetFor( this.clean( element ) );

        var rules = $(element).rules(),
            rulesCount = $.map( rules, function(n, i) {
              return i;
            }).length,
            dependencyMismatch = false,
            val = this.elementValue(element),
            result, method, rule;

        for (method in rules ) {
          rule = { method: method, parameters: rules[method] };
          try {

            result = $.validator.methods[method].call( this, val, element, rule.parameters );

            // if a method indicates that the field is optional and therefore valid,
            // don't mark it as valid when there are no other rules
            if ( result === "dependency-mismatch" && rulesCount === 1 ) {
              dependencyMismatch = true;
              continue;
            }
            dependencyMismatch = false;

            if ( result === "pending" ) {
              this.toHide = this.toHide.not( this.errorsFor(element) );
              return;
            }

            if ( !result ) {
              this.formatAndAdd( element, rule );
              return false;
            }
          } catch(e) {
            if ( this.settings.debug && window.console ) {
              console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
            }
            throw e;
          }
        }
        if ( dependencyMismatch ) {
          return;
        }
        if ( this.objectLength(rules) ) {
          this.successList.push(element);
        }
        return true;
      },

      // return the custom message for the given element and validation method
      // specified in the element's HTML5 data attribute
      // return the generic message if present and no method specific message is present
      customDataMessage: function( element, method ) {
        return $( element ).data( "msg" + method[ 0 ].toUpperCase() +
                                 method.substring( 1 ).toLowerCase() ) || $( element ).data("msg");
      },

      // return the custom message for the given element name and validation method
      customMessage: function( name, method ) {
        var m = this.settings.messages[name];
        return m && (m.constructor === String ? m : m[method]);
      },

      // return the first defined argument, allowing empty strings
      findDefined: function() {
        for (var i = 0; i < arguments.length; i++) {
          if ( arguments[i] !== undefined ) {
            return arguments[i];
          }
        }
        return undefined;
      },

      defaultMessage: function( element, method ) {
        return this.findDefined(
          this.customMessage( element.name, method ),
          this.customDataMessage( element, method ),
          // title is never undefined, so handle empty string as undefined
          !this.settings.ignoreTitle && element.title || undefined,
          $.validator.messages[method],
          "<strong>Warning: No message defined for " + element.name + "</strong>"
        );
      },

      formatAndAdd: function( element, rule ) {
        var message = this.defaultMessage( element, rule.method ),
            theregex = /\$?\{(\d+)\}/g;
        if ( typeof message === "function" ) {
          message = message.call(this, rule.parameters, element);
        } else if (theregex.test(message)) {
          message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
        }
        this.errorList.push({
          message: message,
          element: element,
          method: rule.method
        });

        this.errorMap[element.name] = message;
        this.submitted[element.name] = message;
      },

      addWrapper: function( toToggle ) {
        if ( this.settings.wrapper ) {
          toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
        }
        return toToggle;
      },

      defaultShowErrors: function() {
        var i, elements, error;
        for ( i = 0; this.errorList[i]; i++ ) {
          error = this.errorList[i];
          if ( this.settings.highlight ) {
            this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
          }
          this.showLabel( error.element, error.message );
        }
        if ( this.errorList.length ) {
          this.toShow = this.toShow.add( this.containers );
        }
        if ( this.settings.success ) {
          for ( i = 0; this.successList[i]; i++ ) {
            this.showLabel( this.successList[i] );
          }
        }
        if ( this.settings.unhighlight ) {
          for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
            this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
          }
        }
        this.toHide = this.toHide.not( this.toShow );
        this.hideErrors();
        this.addWrapper( this.toShow ).show();
      },

      validElements: function() {
        return this.currentElements.not(this.invalidElements());
      },

      invalidElements: function() {
        return $(this.errorList).map(function() {
          return this.element;
        });
      },

      showLabel: function( element, message ) {
        var label = this.errorsFor( element );
        if ( label.length ) {
          // refresh error/success class
          label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
          // replace message on existing label
          label.html(message);
        } else {
          // create label
          label = $("<" + this.settings.errorElement + ">")
            .attr("for", this.idOrName(element))
            .addClass(this.settings.errorClass)
            .html(message || "");
          if ( this.settings.wrapper ) {
            // make sure the element is visible, even in IE
            // actually showing the wrapped element is handled elsewhere
            label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
          }
          if ( !this.labelContainer.append(label).length ) {
            if ( this.settings.errorPlacement ) {
              this.settings.errorPlacement(label, $(element) );
            } else {
              label.insertAfter(element);
            }
          }
        }
        if ( !message && this.settings.success ) {
          label.text("");
          if ( typeof this.settings.success === "string" ) {
            label.addClass( this.settings.success );
          } else {
            this.settings.success( label, element );
          }
        }
        this.toShow = this.toShow.add(label);
      },

      errorsFor: function( element ) {
        var name = this.idOrName(element);
        return this.errors().filter(function() {
          return $(this).attr("for") === name;
        });
      },

      idOrName: function( element ) {
        return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
      },

      validationTargetFor: function( element ) {
        // if radio/checkbox, validate first element in group instead
        if ( this.checkable(element) ) {
          element = this.findByName( element.name ).not(this.settings.ignore)[0];
        }
        return element;
      },

      checkable: function( element ) {
        return (/radio|checkbox/i).test(element.type);
      },

      findByName: function( name ) {
        return $(this.currentForm).find("[name='" + name + "']");
      },

      getLength: function( value, element ) {
        switch ( element.nodeName.toLowerCase() ) {
          case "select":
            return $("option:selected", element).length;
          case "input":
            if ( this.checkable( element) ) {
              return this.findByName(element.name).filter(":checked").length;
            }
        }
        return value.length;
      },

      depend: function( param, element ) {
        return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
      },

      dependTypes: {
        "boolean": function( param ) {
          return param;
        },
        "string": function( param, element ) {
          return !!$(param, element.form).length;
        },
        "function": function( param, element ) {
          return param(element);
        }
      },

      optional: function( element ) {
        var val = this.elementValue(element);
        return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
      },

      startRequest: function( element ) {
        if ( !this.pending[element.name] ) {
          this.pendingRequest++;
          this.pending[element.name] = true;
        }
      },

      stopRequest: function( element, valid ) {
        this.pendingRequest--;
        // sometimes synchronization fails, make sure pendingRequest is never < 0
        if ( this.pendingRequest < 0 ) {
          this.pendingRequest = 0;
        }
        delete this.pending[element.name];
        if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
          $(this.currentForm).submit();
          this.formSubmitted = false;
        } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
          $(this.currentForm).triggerHandler("invalid-form", [ this ]);
          this.formSubmitted = false;
        }
      },

      previousValue: function( element ) {
        return $.data(element, "previousValue") || $.data(element, "previousValue", {
          old: null,
          valid: true,
          message: this.defaultMessage( element, "remote" )
        });
      }

    },

    classRuleSettings: {
      required: { required: true },
      email: { email: true },
      url: { url: true },
      date: { date: true },
      dateISO: { dateISO: true },
      number: { number: true },
      digits: { digits: true },
      creditcard: { creditcard: true }
    },

    addClassRules: function( className, rules ) {
      if ( className.constructor === String ) {
        this.classRuleSettings[className] = rules;
      } else {
        $.extend(this.classRuleSettings, className);
      }
    },

    classRules: function( element ) {
      var rules = {},
          classes = $(element).attr("class");

      if ( classes ) {
        $.each(classes.split(" "), function() {
          if ( this in $.validator.classRuleSettings ) {
            $.extend(rules, $.validator.classRuleSettings[this]);
          }
        });
      }
      return rules;
    },

    attributeRules: function( element ) {
      var rules = {},
          $element = $(element),
          type = element.getAttribute("type"),
          method, value;

      for (method in $.validator.methods) {

        // support for <input required> in both html5 and older browsers
        if ( method === "required" ) {
          value = element.getAttribute(method);
          // Some browsers return an empty string for the required attribute
          // and non-HTML5 browsers might have required="" markup
          if ( value === "" ) {
            value = true;
          }
          // force non-HTML5 browsers to return bool
          value = !!value;
        } else {
          value = $element.attr(method);
        }

        // convert the value to a number for number inputs, and for text for backwards compability
        // allows type="date" and others to be compared as strings
        if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
          value = Number(value);
        }

        if ( value || value === 0 ) {
          rules[method] = value;
        } else if ( type === method && type !== "range" ) {
          // exception: the jquery validate 'range' method
          // does not test for the html5 'range' type
          rules[method] = true;
        }
      }

      // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
      if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
        delete rules.maxlength;
      }

      return rules;
    },

    dataRules: function( element ) {
      var method, value,
          rules = {}, $element = $( element );
      for ( method in $.validator.methods ) {
        value = $element.data( "rule" + method[ 0 ].toUpperCase() + method.substring( 1 ).toLowerCase() );
        if ( value !== undefined ) {
          rules[ method ] = value;
        }
      }
      return rules;
    },

    staticRules: function( element ) {
      var rules = {},
          validator = $.data(element.form, "validator");

      if ( validator.settings.rules ) {
        rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
      }
      return rules;
    },

    normalizeRules: function( rules, element ) {
      // handle dependency check
      $.each(rules, function( prop, val ) {
        // ignore rule when param is explicitly false, eg. required:false
        if ( val === false ) {
          delete rules[prop];
          return;
        }
        if ( val.param || val.depends ) {
          var keepRule = true;
          switch (typeof val.depends) {
            case "string":
              keepRule = !!$(val.depends, element.form).length;
              break;
            case "function":
              keepRule = val.depends.call(element, element);
              break;
          }
          if ( keepRule ) {
            rules[prop] = val.param !== undefined ? val.param : true;
          } else {
            delete rules[prop];
          }
        }
      });

      // evaluate parameters
      $.each(rules, function( rule, parameter ) {
        rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
      });

      // clean number parameters
      $.each([ "minlength", "maxlength" ], function() {
        if ( rules[this] ) {
          rules[this] = Number(rules[this]);
        }
      });
      $.each([ "rangelength", "range" ], function() {
        var parts;
        if ( rules[this] ) {
          if ( $.isArray(rules[this]) ) {
            rules[this] = [ Number(rules[this][0]), Number(rules[this][1]) ];
          } else if ( typeof rules[this] === "string" ) {
            parts = rules[this].split(/[\s,]+/);
            rules[this] = [ Number(parts[0]), Number(parts[1]) ];
          }
        }
      });

      if ( $.validator.autoCreateRanges ) {
        // auto-create ranges
        if ( rules.min && rules.max ) {
          rules.range = [ rules.min, rules.max ];
          delete rules.min;
          delete rules.max;
        }
        if ( rules.minlength && rules.maxlength ) {
          rules.rangelength = [ rules.minlength, rules.maxlength ];
          delete rules.minlength;
          delete rules.maxlength;
        }
      }

      return rules;
    },

    // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
    normalizeRule: function( data ) {
      if ( typeof data === "string" ) {
        var transformed = {};
        $.each(data.split(/\s/), function() {
          transformed[this] = true;
        });
        data = transformed;
      }
      return data;
    },

    // http://jqueryvalidation.org/jQuery.validator.addMethod/
    addMethod: function( name, method, message ) {
      $.validator.methods[name] = method;
      $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
      if ( method.length < 3 ) {
        $.validator.addClassRules(name, $.validator.normalizeRule(name));
      }
    },

    methods: {

      // http://jqueryvalidation.org/required-method/
      required: function( value, element, param ) {
        // check if dependency is met
        if ( !this.depend(param, element) ) {
          return "dependency-mismatch";
        }
        if ( element.nodeName.toLowerCase() === "select" ) {
          // could be an array for select-multiple or a string, both are fine this way
          var val = $(element).val();
          return val && val.length > 0;
        }
        if ( this.checkable(element) ) {
          return this.getLength(value, element) > 0;
        }
        return $.trim(value).length > 0;
      },

      // http://jqueryvalidation.org/email-method/
      email: function( value, element ) {
        // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
        // Retrieved 2014-01-14
        // If you have a problem with this implementation, report a bug against the above spec
        // Or use custom methods to implement your own email validation
        // return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(value);
      },

      // http://jqueryvalidation.org/url-method/
      url: function( value, element ) {
        // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
        return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
      },

      // http://jqueryvalidation.org/date-method/
      date: function( value, element ) {
        return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
      },

      // http://jqueryvalidation.org/dateISO-method/
      dateISO: function( value, element ) {
        return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
      },

      // http://jqueryvalidation.org/number-method/
      number: function( value, element ) {
        return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
      },

      // http://jqueryvalidation.org/digits-method/
      digits: function( value, element ) {
        return this.optional(element) || /^\d+$/.test(value);
      },

      // http://jqueryvalidation.org/creditcard-method/
      // based on http://en.wikipedia.org/wiki/Luhn/
      creditcard: function( value, element ) {
        if ( this.optional(element) ) {
          return "dependency-mismatch";
        }
        // accept only spaces, digits and dashes
        if ( /[^0-9 \-]+/.test(value) ) {
          return false;
        }
        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;

        value = value.replace(/\D/g, "");

        // Basing min and max length on
        // http://developer.ean.com/general_info/Valid_Credit_Card_Types
        if ( value.length < 13 || value.length > 19 ) {
          return false;
        }

        for ( n = value.length - 1; n >= 0; n--) {
          cDigit = value.charAt(n);
          nDigit = parseInt(cDigit, 10);
          if ( bEven ) {
            if ( (nDigit *= 2) > 9 ) {
              nDigit -= 9;
            }
          }
          nCheck += nDigit;
          bEven = !bEven;
        }

        return (nCheck % 10) === 0;
      },

      // http://jqueryvalidation.org/minlength-method/
      minlength: function( value, element, param ) {
        var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
        return this.optional(element) || length >= param;
      },

      // http://jqueryvalidation.org/maxlength-method/
      maxlength: function( value, element, param ) {
        var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
        return this.optional(element) || length <= param;
      },

      // http://jqueryvalidation.org/rangelength-method/
      rangelength: function( value, element, param ) {
        var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
        return this.optional(element) || ( length >= param[0] && length <= param[1] );
      },

      // http://jqueryvalidation.org/min-method/
      min: function( value, element, param ) {
        return this.optional(element) || value >= param;
      },

      // http://jqueryvalidation.org/max-method/
      max: function( value, element, param ) {
        return this.optional(element) || value <= param;
      },

      // http://jqueryvalidation.org/range-method/
      range: function( value, element, param ) {
        return this.optional(element) || ( value >= param[0] && value <= param[1] );
      },

      // http://jqueryvalidation.org/equalTo-method/
      equalTo: function( value, element, param ) {
        // bind to the blur event of the target in order to revalidate whenever the target field is updated
        // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
        var target = $(param);
        if ( this.settings.onfocusout ) {
          target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
            $(element).valid();
          });
        }
        return value === target.val();
      },

      // http://jqueryvalidation.org/remote-method/
      remote: function( value, element, param ) {
        if ( this.optional(element) ) {
          return "dependency-mismatch";
        }

        var previous = this.previousValue(element),
            validator, data;

        if (!this.settings.messages[element.name] ) {
          this.settings.messages[element.name] = {};
        }
        previous.originalMessage = this.settings.messages[element.name].remote;
        this.settings.messages[element.name].remote = previous.message;

        param = typeof param === "string" && { url: param } || param;

        if ( previous.old === value ) {
          return previous.valid;
        }

        previous.old = value;
        validator = this;
        this.startRequest(element);
        data = {};
        data[element.name] = value;
        $.ajax($.extend(true, {
          url: param,
          mode: "abort",
          port: "validate" + element.name,
          dataType: "json",
          data: data,
          context: validator.currentForm,
          success: function( response ) {
            var valid = response === true || response === "true",
                errors, message, submitted;

            validator.settings.messages[element.name].remote = previous.originalMessage;
            if ( valid ) {
              submitted = validator.formSubmitted;
              validator.prepareElement(element);
              validator.formSubmitted = submitted;
              validator.successList.push(element);
              delete validator.invalid[element.name];
              validator.showErrors();
            } else {
              errors = {};
              message = response || validator.defaultMessage( element, "remote" );
              errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
              validator.invalid[element.name] = true;
              validator.showErrors(errors);
            }
            previous.valid = valid;
            validator.stopRequest(element, valid);
          }
        }, param));
        return "pending";
      }

    }

  });

  $.format = function deprecated() {
    throw "$.format has been deprecated. Please use $.validator.format instead.";
  };

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
  var pendingRequests = {},
      ajax;
  // Use a prefilter if available (1.5+)
  if ( $.ajaxPrefilter ) {
    $.ajaxPrefilter(function( settings, _, xhr ) {
      var port = settings.port;
      if ( settings.mode === "abort" ) {
        if ( pendingRequests[port] ) {
          pendingRequests[port].abort();
        }
        pendingRequests[port] = xhr;
      }
    });
  } else {
    // Proxy ajax
    ajax = $.ajax;
    $.ajax = function( settings ) {
      var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
          port = ( "port" in settings ? settings : $.ajaxSettings ).port;
      if ( mode === "abort" ) {
        if ( pendingRequests[port] ) {
          pendingRequests[port].abort();
        }
        pendingRequests[port] = ajax.apply(this, arguments);
        return pendingRequests[port];
      }
      return ajax.apply(this, arguments);
    };
  }
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
  $.extend($.fn, {
    validateDelegate: function( delegate, type, handler ) {
      return this.bind(type, function( event ) {
        var target = $(event.target);
        if ( target.is(delegate) ) {
          return handler.apply(target, arguments);
        }
      });
    }
  });
}(jQuery));


;/*
 * Retina.js v1.1.0
 *
 * Copyright 2013 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
(function() {

  var root = (typeof exports == 'undefined' ? window : exports);

  var config = {
    // Ensure Content-Type is an image before trying to load @2x image
    // https://github.com/imulus/retinajs/pull/45)
    check_mime_type: true
  };

  root.Retina = Retina;

  function Retina() {}

  Retina.configure = function(options) {
    if (options == null) options = {};
    for (var prop in options) config[prop] = options[prop];
  };

  Retina.init = function(context) {
    if (context == null) context = root;

    var existing_onload = context.onload || new Function;

    context.onload = function() {
      var images = document.getElementsByTagName("img"), retinaImages = [], i, image;
      for (i = 0; i < images.length; i++) {
        image = images[i];
        retinaImages.push(new RetinaImage(image));
      }
      existing_onload();
    }
  };

  Retina.isRetina = function(){
    var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
(min--moz-device-pixel-ratio: 1.5),\
(-o-min-device-pixel-ratio: 3/2),\
(min-resolution: 1.5dppx)";

    if (root.devicePixelRatio > 1)
      return true;

    if (root.matchMedia && root.matchMedia(mediaQuery).matches)
      return true;

    return false;
  };


  root.RetinaImagePath = RetinaImagePath;

  function RetinaImagePath(path, at_2x_path) {
    this.path = path;
    if (typeof at_2x_path !== "undefined" && at_2x_path !== null) {
      this.at_2x_path = at_2x_path;
      this.perform_check = false;
    } else {
      this.at_2x_path = path.replace(/\.\w+$/, function(match) { return "@2x" + match; });
      this.perform_check = true;
    }
  }

  RetinaImagePath.confirmed_paths = [];

  RetinaImagePath.prototype.is_external = function() {
    return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) )
  }

  RetinaImagePath.prototype.check_2x_variant = function(callback) {
    var http, that = this;
    if (this.is_external()) {
      return callback(false);
    } else if (!this.perform_check && typeof this.at_2x_path !== "undefined" && this.at_2x_path !== null) {
      return callback(true);
    } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
      return callback(true);
    } else {
      http = new XMLHttpRequest;
      http.open('HEAD', this.at_2x_path);
      http.onreadystatechange = function() {
        if (http.readyState != 4) {
          return callback(false);
        }

        if (http.status >= 200 && http.status <= 399) {
          if (config.check_mime_type) {
            var type = http.getResponseHeader('Content-Type');
            if (type == null || !type.match(/^image/i)) {
              return callback(false);
            }
          }

          RetinaImagePath.confirmed_paths.push(that.at_2x_path);
          return callback(true);
        } else {
          return callback(false);
        }
      }
      http.send();
    }
  }

  function RetinaImage(el) {
    this.el = el;
    this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
    var that = this;
    this.path.check_2x_variant(function(hasVariant) {
      if (hasVariant) that.swap();
    });
  }

  root.RetinaImage = RetinaImage;

  RetinaImage.prototype.swap = function(path) {
    if (typeof path == 'undefined') path = this.path.at_2x_path;

    var that = this;
    function load() {
      if (! that.el.complete) {
        setTimeout(load, 5);
      } else {
        that.el.setAttribute('width', that.el.offsetWidth);
        that.el.setAttribute('height', that.el.offsetHeight);
        that.el.setAttribute('src', path);
      }
    }
    load();
  }

  if (Retina.isRetina()) {
    Retina.init(root);
  }

})();

;// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url http://closure-compiler.googlecode.com/svn/trunk/contrib/externs/maps/google_maps_api_v3.js
// @output_wrapper (function() {%output%})();
// ==/ClosureCompiler==

/**
 * @license
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A RichMarker that allows any HTML/DOM to be added to a map and be draggable.
 *
 * @param {Object.<string, *>=} opt_options Optional properties to set.
 * @extends {google.maps.OverlayView}
 * @constructor
 */
function RichMarker(opt_options) {
  var options = opt_options || {};

  /**
   * @type {boolean}
   * @private
   */
  this.ready_ = false;

  /**
   * @type {boolean}
   * @private
   */
  this.dragging_ = false;

  if (opt_options['visible'] == undefined) {
    opt_options['visible'] = true;
  }

  if (opt_options['shadow'] == undefined) {
    opt_options['shadow'] = '7px -3px 5px rgba(88,88,88,0.7)';
  }

  if (opt_options['anchor'] == undefined) {
    opt_options['anchor'] = RichMarkerPosition['BOTTOM'];
  }

  this.setValues(options);
}
RichMarker.prototype = new google.maps.OverlayView();
window['RichMarker'] = RichMarker;


/**
 * Returns the current visibility state of the marker.
 *
 * @return {boolean} The visiblity of the marker.
 */
RichMarker.prototype.getVisible = function() {
  return /** @type {boolean} */ (this.get('visible'));
};
RichMarker.prototype['getVisible'] = RichMarker.prototype.getVisible;


/**
 * Sets the visiblility state of the marker.
 *
 * @param {boolean} visible The visiblilty of the marker.
 */
RichMarker.prototype.setVisible = function(visible) {
  this.set('visible', visible);
};
RichMarker.prototype['setVisible'] = RichMarker.prototype.setVisible;


/**
 *  The visible changed event.
 */
RichMarker.prototype.visible_changed = function() {
  if (this.ready_) {
    this.markerWrapper_.style['display'] = this.getVisible() ? '' : 'none';
    this.draw();
  }
};
RichMarker.prototype['visible_changed'] = RichMarker.prototype.visible_changed;


/**
 * Sets the marker to be flat.
 *
 * @param {boolean} flat If the marker is to be flat or not.
 */
RichMarker.prototype.setFlat = function(flat) {
  this.set('flat', !!flat);
};
RichMarker.prototype['setFlat'] = RichMarker.prototype.setFlat;


/**
 * If the makrer is flat or not.
 *
 * @return {boolean} True the marker is flat.
 */
RichMarker.prototype.getFlat = function() {
  return /** @type {boolean} */ (this.get('flat'));
};
RichMarker.prototype['getFlat'] = RichMarker.prototype.getFlat;


/**
 * Get the width of the marker.
 *
 * @return {Number} The width of the marker.
 */
RichMarker.prototype.getWidth = function() {
  return /** @type {Number} */ (this.get('width'));
};
RichMarker.prototype['getWidth'] = RichMarker.prototype.getWidth;


/**
 * Get the height of the marker.
 *
 * @return {Number} The height of the marker.
 */
RichMarker.prototype.getHeight = function() {
  return /** @type {Number} */ (this.get('height'));
};
RichMarker.prototype['getHeight'] = RichMarker.prototype.getHeight;


/**
 * Sets the marker's box shadow.
 *
 * @param {string} shadow The box shadow to set.
 */
RichMarker.prototype.setShadow = function(shadow) {
  this.set('shadow', shadow);
  this.flat_changed();
};
RichMarker.prototype['setShadow'] = RichMarker.prototype.setShadow;


/**
 * Gets the marker's box shadow.
 *
 * @return {string} The box shadow.
 */
RichMarker.prototype.getShadow = function() {
  return /** @type {string} */ (this.get('shadow'));
};
RichMarker.prototype['getShadow'] = RichMarker.prototype.getShadow;


/**
 * Flat changed event.
 */
RichMarker.prototype.flat_changed = function() {
  if (!this.ready_) {
    return;
  }

  this.markerWrapper_.style['boxShadow'] =
    this.markerWrapper_.style['webkitBoxShadow'] =
    this.markerWrapper_.style['MozBoxShadow'] =
    this.getFlat() ? '' : this.getShadow();
};
RichMarker.prototype['flat_changed'] = RichMarker.prototype.flat_changed;


/**
 * Sets the zIndex of the marker.
 *
 * @param {Number} index The index to set.
 */
RichMarker.prototype.setZIndex = function(index) {
  this.set('zIndex', index);
};
RichMarker.prototype['setZIndex'] = RichMarker.prototype.setZIndex;


/**
 * Gets the zIndex of the marker.
 *
 * @return {Number} The zIndex of the marker.
 */
RichMarker.prototype.getZIndex = function() {
  return /** @type {Number} */ (this.get('zIndex'));
};
RichMarker.prototype['getZIndex'] = RichMarker.prototype.getZIndex;


/**
 * zIndex changed event.
 */
RichMarker.prototype.zIndex_changed = function() {
  if (this.getZIndex() && this.ready_) {
    this.markerWrapper_.style.zIndex = this.getZIndex();
  }
};
RichMarker.prototype['zIndex_changed'] = RichMarker.prototype.zIndex_changed;

/**
 * Whether the marker is draggable or not.
 *
 * @return {boolean} True if the marker is draggable.
 */
RichMarker.prototype.getDraggable = function() {
  return /** @type {boolean} */ (this.get('draggable'));
};
RichMarker.prototype['getDraggable'] = RichMarker.prototype.getDraggable;


/**
 * Sets the marker to be draggable or not.
 *
 * @param {boolean} draggable If the marker is draggable or not.
 */
RichMarker.prototype.setDraggable = function(draggable) {
  this.set('draggable', !!draggable);
};
RichMarker.prototype['setDraggable'] = RichMarker.prototype.setDraggable;


/**
 * Draggable property changed callback.
 */
RichMarker.prototype.draggable_changed = function() {
  if (this.ready_) {
    if (this.getDraggable()) {
      this.addDragging_(this.markerWrapper_);
    } else {
      this.removeDragListeners_();
    }
  }
};
RichMarker.prototype['draggable_changed'] =
  RichMarker.prototype.draggable_changed;


/**
 * Gets the postiton of the marker.
 *
 * @return {google.maps.LatLng} The position of the marker.
 */
RichMarker.prototype.getPosition = function() {
  return /** @type {google.maps.LatLng} */ (this.get('position'));
};
RichMarker.prototype['getPosition'] = RichMarker.prototype.getPosition;


/**
 * Sets the position of the marker.
 *
 * @param {google.maps.LatLng} position The position to set.
 */
RichMarker.prototype.setPosition = function(position) {
  this.set('position', position);
};
RichMarker.prototype['setPosition'] = RichMarker.prototype.setPosition;


/**
 * Position changed event.
 */
RichMarker.prototype.position_changed = function() {
  this.draw();
};
RichMarker.prototype['position_changed'] =
  RichMarker.prototype.position_changed;


/**
 * Gets the anchor.
 *
 * @return {google.maps.Size} The position of the anchor.
 */
RichMarker.prototype.getAnchor = function() {
  return /** @type {google.maps.Size} */ (this.get('anchor'));
};
RichMarker.prototype['getAnchor'] = RichMarker.prototype.getAnchor;


/**
 * Sets the anchor.
 *
 * @param {RichMarkerPosition|google.maps.Size} anchor The anchor to set.
 */
RichMarker.prototype.setAnchor = function(anchor) {
  this.set('anchor', anchor);
};
RichMarker.prototype['setAnchor'] = RichMarker.prototype.setAnchor;


/**
 * Anchor changed event.
 */
RichMarker.prototype.anchor_changed = function() {
  this.draw();
};
RichMarker.prototype['anchor_changed'] = RichMarker.prototype.anchor_changed;


/**
 * Converts a HTML string to a document fragment.
 *
 * @param {string} htmlString The HTML string to convert.
 * @return {Node} A HTML document fragment.
 * @private
 */
RichMarker.prototype.htmlToDocumentFragment_ = function(htmlString) {
  var tempDiv = document.createElement('DIV');
  tempDiv.innerHTML = htmlString;
  if (tempDiv.childNodes.length == 1) {
    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
  } else {
    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
};


/**
 * Removes all children from the node.
 *
 * @param {Node} node The node to remove all children from.
 * @private
 */
RichMarker.prototype.removeChildren_ = function(node) {
  if (!node) {
    return;
  }

  var child;
  while (child = node.firstChild) {
    node.removeChild(child);
  }
};


/**
 * Sets the content of the marker.
 *
 * @param {string|Node} content The content to set.
 */
RichMarker.prototype.setContent = function(content) {
  this.set('content', content);
};
RichMarker.prototype['setContent'] = RichMarker.prototype.setContent;


/**
 * Get the content of the marker.
 *
 * @return {string|Node} The marker content.
 */
RichMarker.prototype.getContent = function() {
  return /** @type {Node|string} */ (this.get('content'));
};
RichMarker.prototype['getContent'] = RichMarker.prototype.getContent;


/**
 * Sets the marker content and adds loading events to images
 */
RichMarker.prototype.content_changed = function() {
  if (!this.markerContent_) {
    // Marker content area doesnt exist.
    return;
  }

  this.removeChildren_(this.markerContent_);
  var content = this.getContent();
  if (content) {
    if (typeof content == 'string') {
      content = content.replace(/^\s*([\S\s]*)\b\s*$/, '$1');
      content = this.htmlToDocumentFragment_(content);
    }
    this.markerContent_.appendChild(content);

    var that = this;
    var images = this.markerContent_.getElementsByTagName('IMG');
    for (var i = 0, image; image = images[i]; i++) {
      // By default, a browser lets a image be dragged outside of the browser,
      // so by calling preventDefault we stop this behaviour and allow the image
      // to be dragged around the map and now out of the browser and onto the
      // desktop.
      google.maps.event.addDomListener(image, 'mousedown', function(e) {
        if (that.getDraggable()) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.returnValue = false;
        }
      });

      // Because we don't know the size of an image till it loads, add a
      // listener to the image load so the marker can resize and reposition
      // itself to be the correct height.
      google.maps.event.addDomListener(image, 'load', function() {
        that.draw();
      });
    }

    google.maps.event.trigger(this, 'domready');
  }

  if (this.ready_) {
    this.draw();
  }
};
RichMarker.prototype['content_changed'] = RichMarker.prototype.content_changed;

/**
 * Sets the cursor.
 *
 * @param {string} whichCursor What cursor to show.
 * @private
 */
RichMarker.prototype.setCursor_ = function(whichCursor) {
  if (!this.ready_) {
    return;
  }

  var cursor = '';
  if (navigator.userAgent.indexOf('Gecko/') !== -1) {
    // Moz has some nice cursors :)
    if (whichCursor == 'dragging') {
      cursor = '-moz-grabbing';
    }

    if (whichCursor == 'dragready') {
      cursor = '-moz-grab';
    }

    if (whichCursor == 'draggable') {
      cursor = 'pointer';
    }
  } else {
    if (whichCursor == 'dragging' || whichCursor == 'dragready') {
      cursor = 'move';
    }

    if (whichCursor == 'draggable') {
      cursor = 'pointer';
    }
  }

  if (this.markerWrapper_.style.cursor != cursor) {
    this.markerWrapper_.style.cursor = cursor;
  }
};

/**
 * Start dragging.
 *
 * @param {Event} e The event.
 */
RichMarker.prototype.startDrag = function(e) {
  if (!this.getDraggable()) {
    return;
  }

  if (!this.dragging_) {
    this.dragging_ = true;
    var map = this.getMap();
    this.mapDraggable_ = map.get('draggable');
    map.set('draggable', false);

    // Store the current mouse position
    this.mouseX_ = e.clientX;
    this.mouseY_ = e.clientY;

    this.setCursor_('dragready');

    // Stop the text from being selectable while being dragged
    this.markerWrapper_.style['MozUserSelect'] = 'none';
    this.markerWrapper_.style['KhtmlUserSelect'] = 'none';
    this.markerWrapper_.style['WebkitUserSelect'] = 'none';

    this.markerWrapper_['unselectable'] = 'on';
    this.markerWrapper_['onselectstart'] = function() {
      return false;
    };

    this.addDraggingListeners_();

    google.maps.event.trigger(this, 'dragstart');
  }
};


/**
 * Stop dragging.
 */
RichMarker.prototype.stopDrag = function() {
  if (!this.getDraggable()) {
    return;
  }

  if (this.dragging_) {
    this.dragging_ = false;
    this.getMap().set('draggable', this.mapDraggable_);
    this.mouseX_ = this.mouseY_ = this.mapDraggable_ = null;

    // Allow the text to be selectable again
    this.markerWrapper_.style['MozUserSelect'] = '';
    this.markerWrapper_.style['KhtmlUserSelect'] = '';
    this.markerWrapper_.style['WebkitUserSelect'] = '';
    this.markerWrapper_['unselectable'] = 'off';
    this.markerWrapper_['onselectstart'] = function() {};

    this.removeDraggingListeners_();

    this.setCursor_('draggable');
    google.maps.event.trigger(this, 'dragend');

    this.draw();
  }
};


/**
 * Handles the drag event.
 *
 * @param {Event} e The event.
 */
RichMarker.prototype.drag = function(e) {
  if (!this.getDraggable() || !this.dragging_) {
    // This object isn't draggable or we have stopped dragging
    this.stopDrag();
    return;
  }

  var dx = this.mouseX_ - e.clientX;
  var dy = this.mouseY_ - e.clientY;

  this.mouseX_ = e.clientX;
  this.mouseY_ = e.clientY;

  var left = parseInt(this.markerWrapper_.style['left'], 10) - dx;
  var top = parseInt(this.markerWrapper_.style['top'], 10) - dy;

  this.markerWrapper_.style['left'] = left + 'px';
  this.markerWrapper_.style['top'] = top + 'px';

  var offset = this.getOffset_();

  // Set the position property and adjust for the anchor offset
  var point = new google.maps.Point(left - offset.width, top - offset.height);
  var projection = this.getProjection();
  this.setPosition(projection.fromDivPixelToLatLng(point));

  this.setCursor_('dragging');
  google.maps.event.trigger(this, 'drag');
};


/**
 * Removes the drag listeners associated with the marker.
 *
 * @private
 */
RichMarker.prototype.removeDragListeners_ = function() {
  if (this.draggableListener_) {
    google.maps.event.removeListener(this.draggableListener_);
    delete this.draggableListener_;
  }
  this.setCursor_('');
};


/**
 * Add dragability events to the marker.
 *
 * @param {Node} node The node to apply dragging to.
 * @private
 */
RichMarker.prototype.addDragging_ = function(node) {
  if (!node) {
    return;
  }

  var that = this;
  this.draggableListener_ =
    google.maps.event.addDomListener(node, 'mousedown', function(e) {
    that.startDrag(e);
  });

  this.setCursor_('draggable');
};


/**
 * Add dragging listeners.
 *
 * @private
 */
RichMarker.prototype.addDraggingListeners_ = function() {
  var that = this;
  if (this.markerWrapper_.setCapture) {
    this.markerWrapper_.setCapture(true);
    this.draggingListeners_ = [
      google.maps.event.addDomListener(this.markerWrapper_, 'mousemove', function(e) {
        that.drag(e);
      }, true),
      google.maps.event.addDomListener(this.markerWrapper_, 'mouseup', function() {
        that.stopDrag();
        that.markerWrapper_.releaseCapture();
      }, true)
    ];
  } else {
    this.draggingListeners_ = [
      google.maps.event.addDomListener(window, 'mousemove', function(e) {
        that.drag(e);
      }, true),
      google.maps.event.addDomListener(window, 'mouseup', function() {
        that.stopDrag();
      }, true)
    ];
  }
};


/**
 * Remove dragging listeners.
 *
 * @private
 */
RichMarker.prototype.removeDraggingListeners_ = function() {
  if (this.draggingListeners_) {
    for (var i = 0, listener; listener = this.draggingListeners_[i]; i++) {
      google.maps.event.removeListener(listener);
    }
    this.draggingListeners_.length = 0;
  }
};


/**
 * Get the anchor offset.
 *
 * @return {google.maps.Size} The size offset.
 * @private
 */
RichMarker.prototype.getOffset_ = function() {
  var anchor = this.getAnchor();
  if (typeof anchor == 'object') {
    return /** @type {google.maps.Size} */ (anchor);
  }

  var offset = new google.maps.Size(0, 0);
  if (!this.markerContent_) {
    return offset;
  }

  var width = this.markerContent_.offsetWidth;
  var height = this.markerContent_.offsetHeight;

  switch (anchor) {
    case RichMarkerPosition['TOP_LEFT']:
      break;
    case RichMarkerPosition['TOP']:
      offset.width = -width / 2;
      break;
    case RichMarkerPosition['TOP_RIGHT']:
      offset.width = -width;
      break;
    case RichMarkerPosition['LEFT']:
      offset.height = -height / 2;
      break;
    case RichMarkerPosition['MIDDLE']:
      offset.width = -width / 2;
      offset.height = -height / 2;
      break;
    case RichMarkerPosition['RIGHT']:
      offset.width = -width;
      offset.height = -height / 2;
      break;
    case RichMarkerPosition['BOTTOM_LEFT']:
      offset.height = -height;
      break;
    case RichMarkerPosition['BOTTOM']:
      offset.width = -width / 2;
      offset.height = -height;
      break;
    case RichMarkerPosition['BOTTOM_RIGHT']:
      offset.width = -width;
      offset.height = -height;
      break;
  }

  return offset;
};


/**
 * Adding the marker to a map.
 * Implementing the interface.
 */
RichMarker.prototype.onAdd = function() {
  if (!this.markerWrapper_) {
    this.markerWrapper_ = document.createElement('DIV');
    this.markerWrapper_.style['position'] = 'absolute';
  }

  if (this.getZIndex()) {
    this.markerWrapper_.style['zIndex'] = this.getZIndex();
  }

  this.markerWrapper_.style['display'] = this.getVisible() ? '' : 'none';

  if (!this.markerContent_) {
    this.markerContent_ = document.createElement('DIV');
    this.markerWrapper_.appendChild(this.markerContent_);

    var that = this;
    google.maps.event.addDomListener(this.markerContent_, 'click', function(e) {
      google.maps.event.trigger(that, 'click');
    });
    google.maps.event.addDomListener(this.markerContent_, 'mouseover', function(e) {
      google.maps.event.trigger(that, 'mouseover');
    });
    google.maps.event.addDomListener(this.markerContent_, 'mouseout', function(e) {
      google.maps.event.trigger(that, 'mouseout');
    });
  }

  this.ready_ = true;
  this.content_changed();
  this.flat_changed();
  this.draggable_changed();

  var panes = this.getPanes();
  if (panes) {
    panes.overlayMouseTarget.appendChild(this.markerWrapper_);
  }

  google.maps.event.trigger(this, 'ready');
};
RichMarker.prototype['onAdd'] = RichMarker.prototype.onAdd;


/**
 * Impelementing the interface.
 */
RichMarker.prototype.draw = function() {
  if (!this.ready_ || this.dragging_) {
    return;
  }

  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
  var pos = projection.fromLatLngToDivPixel(latLng);

  var offset = this.getOffset_();
  this.markerWrapper_.style['top'] = (pos.y + offset.height) + 'px';
  this.markerWrapper_.style['left'] = (pos.x + offset.width) + 'px';

  var height = this.markerContent_.offsetHeight;
  var width = this.markerContent_.offsetWidth;

  if (width != this.get('width')) {
    this.set('width', width);
  }

  if (height != this.get('height')) {
    this.set('height', height);
  }
};
RichMarker.prototype['draw'] = RichMarker.prototype.draw;


/**
 * Removing a marker from the map.
 * Implementing the interface.
 */
RichMarker.prototype.onRemove = function() {
  if (this.markerWrapper_ && this.markerWrapper_.parentNode) {
    this.markerWrapper_.parentNode.removeChild(this.markerWrapper_);
  }
  this.removeDragListeners_();
};
RichMarker.prototype['onRemove'] = RichMarker.prototype.onRemove;


/**
 * RichMarker Anchor positions
 * @enum {number}
 */
var RichMarkerPosition = {
  'TOP_LEFT': 1,
  'TOP': 2,
  'TOP_RIGHT': 3,
  'LEFT': 4,
  'MIDDLE': 5,
  'RIGHT': 6,
  'BOTTOM_LEFT': 7,
  'BOTTOM': 8,
  'BOTTOM_RIGHT': 9
};
window['RichMarkerPosition'] = RichMarkerPosition;;/*!
 * jQuery Validation Plugin v1.12.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
(function() {

  function stripHtml(value) {
    // remove html tags and space chars
    return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
    // remove punctuation
      .replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
  }

  jQuery.validator.addMethod("maxWords", function(value, element, params) {
    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
  }, jQuery.validator.format("Please enter {0} words or less."));

  jQuery.validator.addMethod("minWords", function(value, element, params) {
    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
  }, jQuery.validator.format("Please enter at least {0} words."));

  jQuery.validator.addMethod("rangeWords", function(value, element, params) {
    var valueStripped = stripHtml(value),
        regex = /\b\w+\b/g;
    return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
  }, jQuery.validator.format("Please enter between {0} and {1} words."));

}());

// Accept a value from a file input based on a required mimetype
jQuery.validator.addMethod("accept", function(value, element, param) {
  // Split mime on commas in case we have multiple types we can accept
  var typeParam = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
      optionalValue = this.optional(element),
      i, file;

  // Element is optional
  if (optionalValue) {
    return optionalValue;
  }

  if (jQuery(element).attr("type") === "file") {
    // If we are using a wildcard, make it regex friendly
    typeParam = typeParam.replace(/\*/g, ".*");

    // Check if the element has a FileList before checking each file
    if (element.files && element.files.length) {
      for (i = 0; i < element.files.length; i++) {
        file = element.files[i];

        // Grab the mimetype from the loaded file, verify it matches
        if (!file.type.match(new RegExp( ".?(" + typeParam + ")$", "i"))) {
          return false;
        }
      }
    }
  }

  // Either return true because we've validated each file, or because the
  // browser does not support element.files and the FileList feature
  return true;
}, jQuery.validator.format("Please enter a value with a valid mimetype."));

jQuery.validator.addMethod("alphanumeric", function(value, element) {
  return this.optional(element) || /^\w+$/i.test(value);
}, "Letters, numbers, and underscores only please");

/*
 * Dutch bank account numbers (not 'giro' numbers) have 9 digits
 * and pass the '11 check'.
 * We accept the notation with spaces, as that is common.
 * acceptable: 123456789 or 12 34 56 789
 */
jQuery.validator.addMethod("bankaccountNL", function(value, element) {
  if (this.optional(element)) {
    return true;
  }
  if (!(/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(value))) {
    return false;
  }
  // now '11 check'
  var account = value.replace(/ /g, ""), // remove spaces
      sum = 0,
      len = account.length,
      pos, factor, digit;
  for ( pos = 0; pos < len; pos++ ) {
    factor = len - pos;
    digit = account.substring(pos, pos + 1);
    sum = sum + factor * digit;
  }
  return sum % 11 === 0;
}, "Please specify a valid bank account number");

jQuery.validator.addMethod("bankorgiroaccountNL", function(value, element) {
  return this.optional(element) ||
    ($.validator.methods.bankaccountNL.call(this, value, element)) ||
    ($.validator.methods.giroaccountNL.call(this, value, element));
}, "Please specify a valid bank or giro account number");

/**
 * BIC is the business identifier code (ISO 9362). This BIC check is not a guarantee for authenticity.
 *
 * BIC pattern: BBBBCCLLbbb (8 or 11 characters long; bbb is optional)
 *
 * BIC definition in detail:
 * - First 4 characters - bank code (only letters)
 * - Next 2 characters - ISO 3166-1 alpha-2 country code (only letters)
 * - Next 2 characters - location code (letters and digits)
 *   a. shall not start with '0' or '1'
 *   b. second character must be a letter ('O' is not allowed) or one of the following digits ('0' for test (therefore not allowed), '1' for passive participant and '2' for active participant)
 * - Last 3 characters - branch code, optional (shall not start with 'X' except in case of 'XXX' for primary office) (letters and digits)
 */
jQuery.validator.addMethod("bic", function(value, element) {
  return this.optional( element ) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test( value );
}, "Please specify a valid BIC code");

/*
 * Código de identificación fiscal ( CIF ) is the tax identification code for Spanish legal entities
 * Further rules can be found in Spanish on http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 */
jQuery.validator.addMethod( "cifES", function( value ) {
  "use strict";

  var num = [],
      controlDigit, sum, i, count, tmp, secondDigit;

  value = value.toUpperCase();

  // Quick format test
  if ( !value.match( "((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)" ) ) {
    return false;
  }

  for ( i = 0; i < 9; i++ ) {
    num[ i ] = parseInt( value.charAt( i ), 10 );
  }

  // Algorithm for checking CIF codes
  sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
  for ( count = 1; count < 8; count += 2 ) {
    tmp = ( 2 * num[ count ] ).toString();
    secondDigit = tmp.charAt( 1 );

    sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === "" ? 0 : parseInt( secondDigit, 10 ) );
  }

  /* The first (position 1) is a letter following the following criteria:
	 *	A. Corporations
	 *	B. LLCs
	 *	C. General partnerships
	 *	D. Companies limited partnerships
	 *	E. Communities of goods
	 *	F. Cooperative Societies
	 *	G. Associations
	 *	H. Communities of homeowners in horizontal property regime
	 *	J. Civil Societies
	 *	K. Old format
	 *	L. Old format
	 *	M. Old format
	 *	N. Nonresident entities
	 *	P. Local authorities
	 *	Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
	 *	R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
	 *	S. Organs of State Administration and regions
	 *	V. Agrarian Transformation
	 *	W. Permanent establishments of non-resident in Spain
	 */
  if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
    sum += "";
    controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
    value += controlDigit;
    return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
  }

  return false;

}, "Please specify a valid CIF number." );

/* NOTICE: Modified version of Castle.Components.Validator.CreditCardValidator
 * Redistributed under the the Apache License 2.0 at http://www.apache.org/licenses/LICENSE-2.0
 * Valid Types: mastercard, visa, amex, dinersclub, enroute, discover, jcb, unknown, all (overrides all other settings)
 */
jQuery.validator.addMethod("creditcardtypes", function(value, element, param) {
  if (/[^0-9\-]+/.test(value)) {
    return false;
  }

  value = value.replace(/\D/g, "");

  var validTypes = 0x0000;

  if (param.mastercard) {
    validTypes |= 0x0001;
  }
  if (param.visa) {
    validTypes |= 0x0002;
  }
  if (param.amex) {
    validTypes |= 0x0004;
  }
  if (param.dinersclub) {
    validTypes |= 0x0008;
  }
  if (param.enroute) {
    validTypes |= 0x0010;
  }
  if (param.discover) {
    validTypes |= 0x0020;
  }
  if (param.jcb) {
    validTypes |= 0x0040;
  }
  if (param.unknown) {
    validTypes |= 0x0080;
  }
  if (param.all) {
    validTypes = 0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0010 | 0x0020 | 0x0040 | 0x0080;
  }
  if (validTypes & 0x0001 && /^(5[12345])/.test(value)) { //mastercard
    return value.length === 16;
  }
  if (validTypes & 0x0002 && /^(4)/.test(value)) { //visa
    return value.length === 16;
  }
  if (validTypes & 0x0004 && /^(3[47])/.test(value)) { //amex
    return value.length === 15;
  }
  if (validTypes & 0x0008 && /^(3(0[012345]|[68]))/.test(value)) { //dinersclub
    return value.length === 14;
  }
  if (validTypes & 0x0010 && /^(2(014|149))/.test(value)) { //enroute
    return value.length === 15;
  }
  if (validTypes & 0x0020 && /^(6011)/.test(value)) { //discover
    return value.length === 16;
  }
  if (validTypes & 0x0040 && /^(3)/.test(value)) { //jcb
    return value.length === 16;
  }
  if (validTypes & 0x0040 && /^(2131|1800)/.test(value)) { //jcb
    return value.length === 15;
  }
  if (validTypes & 0x0080) { //unknown
    return true;
  }
  return false;
}, "Please enter a valid credit card number.");

/**
 * Validates currencies with any given symbols by @jameslouiz
 * Symbols can be optional or required. Symbols required by default
 *
 * Usage examples:
 *  currency: ["£", false] - Use false for soft currency validation
 *  currency: ["$", false]
 *  currency: ["RM", false] - also works with text based symbols such as "RM" - Malaysia Ringgit etc
 *
 *  <input class="currencyInput" name="currencyInput">
 *
 * Soft symbol checking
 *  currencyInput: {
 *     currency: ["$", false]
 *  }
 *
 * Strict symbol checking (default)
 *  currencyInput: {
 *     currency: "$"
 *     //OR
 *     currency: ["$", true]
 *  }
 *
 * Multiple Symbols
 *  currencyInput: {
 *     currency: "$,£,¢"
 *  }
 */
jQuery.validator.addMethod("currency", function(value, element, param) {
  var isParamString = typeof param === "string",
      symbol = isParamString ? param : param[0],
      soft = isParamString ? true : param[1],
      regex;

  symbol = symbol.replace(/,/g, "");
  symbol = soft ? symbol + "]" : symbol + "]?";
  regex = "^[" + symbol + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$";
  regex = new RegExp(regex);
  return this.optional(element) || regex.test(value);

}, "Please specify a valid currency");

/**
 * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
 *
 * @example jQuery.validator.methods.date("01/01/1900")
 * @result true
 *
 * @example jQuery.validator.methods.date("01/13/1990")
 * @result false
 *
 * @example jQuery.validator.methods.date("01.01.1900")
 * @result false
 *
 * @example <input name="pippo" class="{dateITA:true}" />
 * @desc Declares an optional input element whose value must be a valid date.
 *
 * @name jQuery.validator.methods.dateITA
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
jQuery.validator.addMethod("dateITA", function(value, element) {
  var check = false,
      re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
      adata, gg, mm, aaaa, xdata;
  if ( re.test(value)) {
    adata = value.split("/");
    gg = parseInt(adata[0],10);
    mm = parseInt(adata[1],10);
    aaaa = parseInt(adata[2],10);
    xdata = new Date(aaaa, mm - 1, gg, 12, 0, 0, 0);
    if ( ( xdata.getFullYear() === aaaa ) && ( xdata.getMonth() === mm - 1 ) && ( xdata.getDate() === gg ) ){
      check = true;
    } else {
      check = false;
    }
  } else {
    check = false;
  }
  return this.optional(element) || check;
}, "Please enter a correct date");

jQuery.validator.addMethod("dateNL", function(value, element) {
  return this.optional(element) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(value);
}, "Please enter a correct date");

// Older "accept" file extension method. Old docs: http://docs.jquery.com/Plugins/Validation/Methods/accept
jQuery.validator.addMethod("extension", function(value, element, param) {
  param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|gif";
  return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
}, jQuery.validator.format("Please enter a value with a valid extension."));

/**
 * Dutch giro account numbers (not bank numbers) have max 7 digits
 */
jQuery.validator.addMethod("giroaccountNL", function(value, element) {
  return this.optional(element) || /^[0-9]{1,7}$/.test(value);
}, "Please specify a valid giro account number");

/**
 * IBAN is the international bank account number.
 * It has a country - specific format, that is checked here too
 */
jQuery.validator.addMethod("iban", function(value, element) {
  // some quick simple tests to prevent needless work
  if (this.optional(element)) {
    return true;
  }

  // remove spaces and to upper case
  var iban = value.replace(/ /g,"").toUpperCase(),
      ibancheckdigits = "",
      leadingZeroes = true,
      cRest = "",
      cOperator = "",
      countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

  if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
    return false;
  }

  // check the country code and find the country specific format
  countrycode = iban.substring(0,2);
  bbancountrypatterns = {
    "AL": "\\d{8}[\\dA-Z]{16}",
    "AD": "\\d{8}[\\dA-Z]{12}",
    "AT": "\\d{16}",
    "AZ": "[\\dA-Z]{4}\\d{20}",
    "BE": "\\d{12}",
    "BH": "[A-Z]{4}[\\dA-Z]{14}",
    "BA": "\\d{16}",
    "BR": "\\d{23}[A-Z][\\dA-Z]",
    "BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
    "CR": "\\d{17}",
    "HR": "\\d{17}",
    "CY": "\\d{8}[\\dA-Z]{16}",
    "CZ": "\\d{20}",
    "DK": "\\d{14}",
    "DO": "[A-Z]{4}\\d{20}",
    "EE": "\\d{16}",
    "FO": "\\d{14}",
    "FI": "\\d{14}",
    "FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
    "GE": "[\\dA-Z]{2}\\d{16}",
    "DE": "\\d{18}",
    "GI": "[A-Z]{4}[\\dA-Z]{15}",
    "GR": "\\d{7}[\\dA-Z]{16}",
    "GL": "\\d{14}",
    "GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
    "HU": "\\d{24}",
    "IS": "\\d{22}",
    "IE": "[\\dA-Z]{4}\\d{14}",
    "IL": "\\d{19}",
    "IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
    "KZ": "\\d{3}[\\dA-Z]{13}",
    "KW": "[A-Z]{4}[\\dA-Z]{22}",
    "LV": "[A-Z]{4}[\\dA-Z]{13}",
    "LB": "\\d{4}[\\dA-Z]{20}",
    "LI": "\\d{5}[\\dA-Z]{12}",
    "LT": "\\d{16}",
    "LU": "\\d{3}[\\dA-Z]{13}",
    "MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
    "MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
    "MR": "\\d{23}",
    "MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
    "MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
    "MD": "[\\dA-Z]{2}\\d{18}",
    "ME": "\\d{18}",
    "NL": "[A-Z]{4}\\d{10}",
    "NO": "\\d{11}",
    "PK": "[\\dA-Z]{4}\\d{16}",
    "PS": "[\\dA-Z]{4}\\d{21}",
    "PL": "\\d{24}",
    "PT": "\\d{21}",
    "RO": "[A-Z]{4}[\\dA-Z]{16}",
    "SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
    "SA": "\\d{2}[\\dA-Z]{18}",
    "RS": "\\d{18}",
    "SK": "\\d{20}",
    "SI": "\\d{15}",
    "ES": "\\d{20}",
    "SE": "\\d{20}",
    "CH": "\\d{5}[\\dA-Z]{12}",
    "TN": "\\d{20}",
    "TR": "\\d{5}[\\dA-Z]{17}",
    "AE": "\\d{3}\\d{16}",
    "GB": "[A-Z]{4}\\d{14}",
    "VG": "[\\dA-Z]{4}\\d{16}"
  };

  bbanpattern = bbancountrypatterns[countrycode];
  // As new countries will start using IBAN in the
  // future, we only check if the countrycode is known.
  // This prevents false negatives, while almost all
  // false positives introduced by this, will be caught
  // by the checksum validation below anyway.
  // Strict checking should return FALSE for unknown
  // countries.
  if (typeof bbanpattern !== "undefined") {
    ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
    if (!(ibanregexp.test(iban))) {
      return false; // invalid country specific format
    }
  }

  // now check the checksum, first convert to digits
  ibancheck = iban.substring(4,iban.length) + iban.substring(0,4);
  for (i = 0; i < ibancheck.length; i++) {
    charAt = ibancheck.charAt(i);
    if (charAt !== "0") {
      leadingZeroes = false;
    }
    if (!leadingZeroes) {
      ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
    }
  }

  // calculate the result of: ibancheckdigits % 97
  for (p = 0; p < ibancheckdigits.length; p++) {
    cChar = ibancheckdigits.charAt(p);
    cOperator = "" + cRest + "" + cChar;
    cRest = cOperator % 97;
  }
  return cRest === 1;
}, "Please specify a valid IBAN");

jQuery.validator.addMethod("integer", function(value, element) {
  return this.optional(element) || /^-?\d+$/.test(value);
}, "A positive or negative non-decimal number please");

jQuery.validator.addMethod("ipv4", function(value, element) {
  return this.optional(element) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(value);
}, "Please enter a valid IP v4 address.");

jQuery.validator.addMethod("ipv6", function(value, element) {
  return this.optional(element) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(value);
}, "Please enter a valid IP v6 address.");

jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");

jQuery.validator.addMethod("url", function(value, element) {
  return this.optional(element) || /^[\u0400-\u04FF\sa-z]+$/gi.test(value);
}, "Letters only please");

jQuery.validator.addMethod("letterswithbasicpunc", function(value, element) {
  return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
}, "Letters or punctuation only please");

jQuery.validator.addMethod("mobileNL", function(value, element) {
  return this.optional(element) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
}, "Please specify a valid mobile number");

/* For UK phone functions, do the following server side processing:
 * Compare original input with this RegEx pattern:
 * ^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
 * Extract $1 and set $prefix to '+44<space>' if $1 is '44', otherwise set $prefix to '0'
 * Extract $2 and remove hyphens, spaces and parentheses. Phone number is combined $prefix and $2.
 * A number of very detailed GB telephone number RegEx patterns can also be found at:
 * http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
 */
jQuery.validator.addMethod("mobileUK", function(phone_number, element) {
  phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/);
}, "Please specify a valid mobile number");

/*
 * The número de identidad de extranjero ( NIE )is a code used to identify the non-nationals in Spain
 */
jQuery.validator.addMethod( "nieES", function( value ) {
  "use strict";

  value = value.toUpperCase();

  // Basic format test
  if ( !value.match( "((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)" ) ) {
    return false;
  }

  // Test NIE
  //T
  if ( /^[T]{1}/.test( value ) ) {
    return ( value[ 8 ] === /^[T]{1}[A-Z0-9]{8}$/.test( value ) );
  }

  //XYZ
  if ( /^[XYZ]{1}/.test( value ) ) {
    return (
      value[ 8 ] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(
        value.replace( "X", "0" )
        .replace( "Y", "1" )
        .replace( "Z", "2" )
        .substring( 0, 8 ) % 23
      )
    );
  }

  return false;

}, "Please specify a valid NIE number." );

/*
 * The Número de Identificación Fiscal ( NIF ) is the way tax identification used in Spain for individuals
 */
jQuery.validator.addMethod( "nifES", function( value ) {
  "use strict";

  value = value.toUpperCase();

  // Basic format test
  if ( !value.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ) {
    return false;
  }

  // Test NIF
  if ( /^[0-9]{8}[A-Z]{1}$/.test( value ) ) {
    return ( "TRWAGMYFPDXBNJZSQVHLCKE".charAt( value.substring( 8, 0 ) % 23 ) === value.charAt( 8 ) );
  }
  // Test specials NIF (starts with K, L or M)
  if ( /^[KLM]{1}/.test( value ) ) {
    return ( value[ 8 ] === String.fromCharCode( 64 ) );
  }

  return false;

}, "Please specify a valid NIF number." );

jQuery.validator.addMethod("nowhitespace", function(value, element) {
  return this.optional(element) || /^\S+$/i.test(value);
}, "No white space please");

/**
* Return true if the field value matches the given format RegExp
*
* @example jQuery.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
* @result true
*
* @example jQuery.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
* @result false
*
* @name jQuery.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
jQuery.validator.addMethod("pattern", function(value, element, param) {
  if (this.optional(element)) {
    return true;
  }
  if (typeof param === "string") {
    param = new RegExp(param);
  }
  return param.test(value);
}, "Invalid format.");

/**
 * Dutch phone numbers have 10 digits (or 11 and start with +31).
 */
jQuery.validator.addMethod("phoneNL", function(value, element) {
  return this.optional(element) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(value);
}, "Please specify a valid phone number.");

/* For UK phone functions, do the following server side processing:
 * Compare original input with this RegEx pattern:
 * ^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
 * Extract $1 and set $prefix to '+44<space>' if $1 is '44', otherwise set $prefix to '0'
 * Extract $2 and remove hyphens, spaces and parentheses. Phone number is combined $prefix and $2.
 * A number of very detailed GB telephone number RegEx patterns can also be found at:
 * http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
 */
jQuery.validator.addMethod("phoneUK", function(phone_number, element) {
  phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/);
}, "Please specify a valid phone number");

/**
 * matches US phone number format
 *
 * where the area code may not start with 1 and the prefix may not start with 1
 * allows '-' or ' ' as a separator and allows parens around area code
 * some people may want to put a '1' in front of their number
 *
 * 1(212)-999-2345 or
 * 212 999 2344 or
 * 212-999-0983
 *
 * but not
 * 111-123-5434
 * and not
 * 212 123 4567
 */
jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
  phone_number = phone_number.replace(/\s+/g, "");
  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
}, "Please specify a valid phone number");

/* For UK phone functions, do the following server side processing:
 * Compare original input with this RegEx pattern:
 * ^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
 * Extract $1 and set $prefix to '+44<space>' if $1 is '44', otherwise set $prefix to '0'
 * Extract $2 and remove hyphens, spaces and parentheses. Phone number is combined $prefix and $2.
 * A number of very detailed GB telephone number RegEx patterns can also be found at:
 * http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
 */
//Matches UK landline + mobile, accepting only 01-3 for landline or 07 for mobile to exclude many premium numbers
jQuery.validator.addMethod("phonesUK", function(phone_number, element) {
  phone_number = phone_number.replace(/\(|\)|\s+|-/g, "");
  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/);
}, "Please specify a valid uk phone number");

jQuery.validator.addMethod("postalcodeNL", function(value, element) {
  return this.optional(element) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(value);
}, "Please specify a valid postal code");

// Matches UK postcode. Does not match to UK Channel Islands that have their own postcodes (non standard UK)
jQuery.validator.addMethod("postcodeUK", function(value, element) {
  return this.optional(element) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(value);
}, "Please specify a valid UK postcode");

/*
 * Lets you say "at least X inputs that match selector Y must be filled."
 *
 * The end result is that neither of these inputs:
 *
 *	<input class="productinfo" name="partnumber">
 *	<input class="productinfo" name="description">
 *
 *	...will validate unless at least one of them is filled.
 *
 * partnumber:	{require_from_group: [1,".productinfo"]},
 * description: {require_from_group: [1,".productinfo"]}
 *
 * options[0]: number of fields that must be filled in the group
 * options[1]: CSS selector that defines the group of conditionally required fields
 */
jQuery.validator.addMethod("require_from_group", function(value, element, options) {
  var $fields = $(options[1], element.form),
      $fieldsFirst = $fields.eq(0),
      validator = $fieldsFirst.data("valid_req_grp") ? $fieldsFirst.data("valid_req_grp") : $.extend({}, this),
      isValid = $fields.filter(function() {
        return validator.elementValue(this);
      }).length >= options[0];

  // Store the cloned validator for future validation
  $fieldsFirst.data("valid_req_grp", validator);

  // If element isn't being validated, run each require_from_group field's validation rules
  if (!$(element).data("being_validated")) {
    $fields.data("being_validated", true);
    $fields.each(function() {
      validator.element(this);
    });
    $fields.data("being_validated", false);
  }
  return isValid;
}, jQuery.validator.format("Please fill at least {0} of these fields."));

/*
 * Lets you say "either at least X inputs that match selector Y must be filled,
 * OR they must all be skipped (left blank)."
 *
 * The end result, is that none of these inputs:
 *
 *	<input class="productinfo" name="partnumber">
 *	<input class="productinfo" name="description">
 *	<input class="productinfo" name="color">
 *
 *	...will validate unless either at least two of them are filled,
 *	OR none of them are.
 *
 * partnumber:	{skip_or_fill_minimum: [2,".productinfo"]},
 * description: {skip_or_fill_minimum: [2,".productinfo"]},
 * color:		{skip_or_fill_minimum: [2,".productinfo"]}
 *
 * options[0]: number of fields that must be filled in the group
 * options[1]: CSS selector that defines the group of conditionally required fields
 *
 */
jQuery.validator.addMethod("skip_or_fill_minimum", function(value, element, options) {
  var $fields = $(options[1], element.form),
      $fieldsFirst = $fields.eq(0),
      validator = $fieldsFirst.data("valid_skip") ? $fieldsFirst.data("valid_skip") : $.extend({}, this),
      numberFilled = $fields.filter(function() {
        return validator.elementValue(this);
      }).length,
      isValid = numberFilled === 0 || numberFilled >= options[0];

  // Store the cloned validator for future validation
  $fieldsFirst.data("valid_skip", validator);

  // If element isn't being validated, run each skip_or_fill_minimum field's validation rules
  if (!$(element).data("being_validated")) {
    $fields.data("being_validated", true);
    $fields.each(function() {
      validator.element(this);
    });
    $fields.data("being_validated", false);
  }
  return isValid;
}, jQuery.validator.format("Please either skip these fields or fill at least {0} of them."));

// TODO check if value starts with <, otherwise don't try stripping anything
jQuery.validator.addMethod("strippedminlength", function(value, element, param) {
  return jQuery(value).text().length >= param;
}, jQuery.validator.format("Please enter at least {0} characters"));

jQuery.validator.addMethod("time", function(value, element) {
  return this.optional(element) || /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(value);
}, "Please enter a valid time, between 00:00 and 23:59");

jQuery.validator.addMethod("time12h", function(value, element) {
  return this.optional(element) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(value);
}, "Please enter a valid time in 12-hour am/pm format");

// same as url, but TLD is optional
jQuery.validator.addMethod("url2", function(value, element) {
  return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}, jQuery.validator.messages.url);

/**
 * Return true, if the value is a valid vehicle identification number (VIN).
 *
 * Works with all kind of text inputs.
 *
 * @example <input type="text" size="20" name="VehicleID" class="{required:true,vinUS:true}" />
 * @desc Declares a required input element whose value must be a valid vehicle identification number.
 *
 * @name jQuery.validator.methods.vinUS
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
jQuery.validator.addMethod("vinUS", function(v) {
  if (v.length !== 17) {
    return false;
  }

  var LL = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
      VL = [ 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9 ],
      FL = [ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ],
      rs = 0,
      i, n, d, f, cd, cdv;

  for (i = 0; i < 17; i++){
    f = FL[i];
    d = v.slice(i,i + 1);
    if (i === 8) {
      cdv = d;
    }
    if (!isNaN(d)) {
      d *= f;
    } else {
      for (n = 0; n < LL.length; n++) {
        if (d.toUpperCase() === LL[n]) {
          d = VL[n];
          d *= f;
          if (isNaN(cdv) && n === 8) {
            cdv = LL[n];
          }
          break;
        }
      }
    }
    rs += d;
  }
  cd = rs % 11;
  if (cd === 10) {
    cd = "X";
  }
  if (cd === cdv) {
    return true;
  }
  return false;
}, "The specified vehicle identification number (VIN) is invalid.");

jQuery.validator.addMethod("zipcodeUS", function(value, element) {
  return this.optional(element) || /^\d{5}-\d{4}$|^\d{5}$/.test(value);
}, "The specified US ZIP Code is invalid");

jQuery.validator.addMethod("ziprange", function(value, element) {
  return this.optional(element) || /^90[2-5]\d\{2\}-\d{4}$/.test(value);
}, "Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx");


jQuery.validator.addMethod("fio", function(value, element) {
  return this.optional(element) || /^[\u0400-\u04FF\sa-z.]+$/gi.test(value);
}, "Английские и русские буквы + пробел");


jQuery.validator.addMethod("basicphone", function(value, element) {
  return this.optional(element) || /^[0-9\-+()\s]+$/i.test(value);
}, "Введите корректный номер телефона");

// @preserve jQuery.floatThead 1.3.2 - http://mkoryak.github.io/floatThead/ - Copyright (c) 2012 - 2015 Misha Koryak
// @license MIT

/* @author Misha Koryak
 * @projectDescription lock a table header in place while scrolling - without breaking styles or events bound to the header
 *
 * Dependencies:
 * jquery 1.9.0 + [required] OR jquery 1.7.0 + jquery UI core
 *
 * http://mkoryak.github.io/floatThead/
 *
 * Tested on FF13+, Chrome 21+, IE8, IE9, IE10, IE11
 *
 */
(function( $ ) {
  /**
   * provides a default config object. You can modify this after including this script if you want to change the init defaults
   * @type {Object}
   */
  $.floatThead = $.floatThead || {};
  $.floatThead.defaults = {
    headerCellSelector: 'tr:visible:first>*:visible', //thead cells are this.
    zIndex: 1001, //zindex of the floating thead (actually a container div)
    position: 'auto', // 'fixed', 'absolute', 'auto'. auto picks the best for your table scrolling type.
    top: 0, //String or function($table) - offset from top of window where the header should not pass above
    bottom: 0, //String or function($table) - offset from the bottom of the table where the header should stop scrolling
    scrollContainer: function($table){
      return $([]); //if the table has horizontal scroll bars then this is the container that has overflow:auto and causes those scroll bars
    },
    getSizingRow: function($table, $cols, $fthCells){ // this is only called when using IE,
      // override it if the first row of the table is going to contain colgroups (any cell spans greater than one col)
      // it should return a jquery object containing a wrapped set of table cells comprising a row that contains no col spans and is visible
      return $table.find('tbody tr:visible:first>*:visible');
    },
    floatTableClass: 'floatThead-table',
    floatWrapperClass: 'floatThead-wrapper',
    floatContainerClass: 'floatThead-container',
    copyTableClass: true, //copy 'class' attribute from table into the floated table so that the styles match.
    enableAria: false, //will copy header text from the floated header back into the table for screen readers. Might cause the css styling to be off. beware!
    autoReflow: false, //(undocumented) - use MutationObserver api to reflow automatically when internal table DOM changes
    debug: false //print possible issues (that don't prevent script loading) to console, if console exists.
  };

  var util = window._;

  var canObserveMutations = typeof MutationObserver !== 'undefined';


  //browser stuff
  var ieVersion = function(){for(var a=3,b=document.createElement("b"),c=b.all||[];a = 1+a,b.innerHTML="<!--[if gt IE "+ a +"]><i><![endif]-->",c[0];);return 4<a?a:document.documentMode}();
  var isFF = /Gecko\//.test(navigator.userAgent);
  var isWebkit = /WebKit\//.test(navigator.userAgent);

  //safari 7 (and perhaps others) reports table width to be parent container's width if max-width is set on table. see: https://github.com/mkoryak/floatThead/issues/108
  var isTableWidthBug = function(){
    if(isWebkit) {
      var $test = $('<div style="width:0px"><table style="max-width:100%"><tr><th><div style="min-width:100px;">X</div></th></tr></table></div>');
      $("body").append($test);
      var ret = ($test.find("table").width() == 0);
      $test.remove();
      return ret;
    }
    return false;
  };

  var createElements = !isFF && !ieVersion; //FF can read width from <col> elements, but webkit cannot

  var $window = $(window);

  /**
   * @param debounceMs
   * @param cb
   */
  function windowResize(eventName, cb){
    if(ieVersion == 8){ //ie8 is crap: https://github.com/mkoryak/floatThead/issues/65
      var winWidth = $window.width();
      var debouncedCb = util.debounce(function(){
        var winWidthNew = $window.width();
        if(winWidth != winWidthNew){
          winWidth = winWidthNew;
          cb();
        }
      }, 1);
      $window.on(eventName, debouncedCb);
    } else {
      $window.on(eventName, util.debounce(cb, 1));
    }
  }


  function debug(str){
    window && window.console && window.console.error && window.console.error("jQuery.floatThead: " + str);
  }

  //returns fractional pixel widths
  function getOffsetWidth(el) {
    var rect = el.getBoundingClientRect();
    return rect.width || rect.right - rect.left;
  }

  /**
   * try to calculate the scrollbar width for your browser/os
   * @return {Number}
   */
  function scrollbarWidth() {
    var $div = $( //borrowed from anti-scroll
      '<div style="width:50px;height:50px;overflow-y:scroll;'
      + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%">'
      + '</div>'
    );
    $('body').append($div);
    var w1 = $div.innerWidth();
    var w2 = $('div', $div).innerWidth();
    $div.remove();
    return w1 - w2;
  }
  /**
   * Check if a given table has been datatableized (http://datatables.net)
   * @param $table
   * @return {Boolean}
   */
  function isDatatable($table){
    if($table.dataTableSettings){
      for(var i = 0; i < $table.dataTableSettings.length; i++){
        var table = $table.dataTableSettings[i].nTable;
        if($table[0] == table){
          return true;
        }
      }
    }
    return false;
  }

  function tableWidth($table, $fthCells, isOuter){
    // see: https://github.com/mkoryak/floatThead/issues/108
    var fn = isOuter ? "outerWidth": "width";
    if(isTableWidthBug && $table.css("max-width")){
      var w = 0;
      if(isOuter) {
        w += parseInt($table.css("borderLeft"), 10);
        w += parseInt($table.css("borderRight"), 10);
      }
      for(var i=0; i < $fthCells.length; i++){
        w += $fthCells.get(i).offsetWidth;
      }
      return w;
    } else {
      return $table[fn]();
    }
  }
  $.fn.floatThead = function(map){
    map = map || {};
    if(!util){ //may have been included after the script? lets try to grab it again.
      util = window._ || $.floatThead._;
      if(!util){
        throw new Error("jquery.floatThead-slim.js requires underscore. You should use the non-lite version since you do not have underscore.");
      }
    }

    if(ieVersion < 8){
      return this; //no more crappy browser support.
    }

    var mObs = null; //mutation observer lives in here if we can use it / make it

    if(util.isFunction(isTableWidthBug)) {
      isTableWidthBug = isTableWidthBug();
    }

    if(util.isString(map)){
      var command = map;
      var ret = this;
      this.filter('table').each(function(){
        var $this = $(this);
        var opts = $this.data('floatThead-lazy');
        if(opts){
          $this.floatThead(opts);
        }
        var obj = $this.data('floatThead-attached');
        if(obj && util.isFunction(obj[command])){
          var r = obj[command]();
          if(typeof r !== 'undefined'){
            ret = r;
          }
        }
      });
      return ret;
    }
    var opts = $.extend({}, $.floatThead.defaults || {}, map);

    $.each(map, function(key, val){
      if((!(key in $.floatThead.defaults)) && opts.debug){
        debug("Used ["+key+"] key to init plugin, but that param is not an option for the plugin. Valid options are: "+ (util.keys($.floatThead.defaults)).join(', '));
      }
    });
    if(opts.debug){
      var v = $.fn.jquery.split(".");
      if(parseInt(v[0], 10) == 1 && parseInt(v[1], 10) <= 7){
        debug("jQuery version "+$.fn.jquery+" detected! This plugin supports 1.8 or better, or 1.7.x with jQuery UI 1.8.24 -> http://jqueryui.com/resources/download/jquery-ui-1.8.24.zip")
      }
    }

    this.filter(':not(.'+opts.floatTableClass+')').each(function(){
      var floatTheadId = util.uniqueId();
      var $table = $(this);
      if($table.data('floatThead-attached')){
        return true; //continue the each loop
      }
      if(!$table.is('table')){
        throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();');
      }
      canObserveMutations = opts.autoReflow && canObserveMutations; //option defaults to false!
      var $header = $table.children('thead:first');
      var $tbody = $table.children('tbody:first');
      if($header.length == 0 || $tbody.length == 0){
        $table.data('floatThead-lazy', opts);
        $table.unbind("reflow").one('reflow', function(){
          $table.floatThead(opts);
        });
        return;
      }
      if($table.data('floatThead-lazy')){
        $table.unbind("reflow");
      }
      $table.data('floatThead-lazy', false);

      var headerFloated = true;
      var scrollingTop, scrollingBottom;
      var scrollbarOffset = {vertical: 0, horizontal: 0};
      var scWidth = scrollbarWidth();
      var lastColumnCount = 0; //used by columnNum()
      var $scrollContainer = opts.scrollContainer($table) || $([]); //guard against returned nulls
      var locked = $scrollContainer.length > 0;

      var useAbsolutePositioning = null;
      if(typeof opts.useAbsolutePositioning !== 'undefined'){
        opts.position = 'auto';
        if(opts.useAbsolutePositioning){
          opts.position = opts.useAbsolutePositioning ? 'absolute' : 'fixed';
        }
        debug("option 'useAbsolutePositioning' has been removed in v1.3.0, use `position:'"+opts.position+"'` instead. See docs for more info: http://mkoryak.github.io/floatThead/#options")
      }
      if(typeof opts.scrollingTop !== 'undefined'){
        opts.top = opts.scrollingTop;
        debug("option 'scrollingTop' has been renamed to 'top' in v1.3.0. See docs for more info: http://mkoryak.github.io/floatThead/#options");
      }
      if(typeof opts.scrollingBottom !== 'undefined'){
        opts.bottom = opts.scrollingBottom;
        debug("option 'scrollingBottom' has been renamed to 'bottom' in v1.3.0. See docs for more info: http://mkoryak.github.io/floatThead/#options");
      }


      if (opts.position == 'auto') {
        useAbsolutePositioning = null;
      } else if (opts.position == 'fixed') {
        useAbsolutePositioning = false;
      } else if (opts.position == 'absolute'){
        useAbsolutePositioning = true;
      } else if (opts.debug) {
        debug('Invalid value given to "position" option, valid is "fixed", "absolute" and "auto". You passed: ', opts.position);
      }

      if(useAbsolutePositioning == null){ //defaults: locked=true, !locked=false
        useAbsolutePositioning = locked;
      }
      var $caption = $table.find("caption");
      var haveCaption = $caption.length == 1;
      if(haveCaption){
        var captionAlignTop = ($caption.css("caption-side") || $caption.attr("align") || "top") === "top";
      }

      var $fthGrp = $('<fthfoot style="display:table-footer-group;border-spacing:0;height:0;border-collapse:collapse;visibility:hidden"/>');

      var wrappedContainer = false; //used with absolute positioning enabled. did we need to wrap the scrollContainer/table with a relative div?
      var $wrapper = $([]); //used when absolute positioning enabled - wraps the table and the float container
      var absoluteToFixedOnScroll = ieVersion <= 9 && !locked && useAbsolutePositioning; //on IE using absolute positioning doesn't look good with window scrolling, so we change position to fixed on scroll, and then change it back to absolute when done.
      var $floatTable = $("<table/>");
      var $floatColGroup = $("<colgroup/>");
      var $tableColGroup = $table.children('colgroup:first');
      var existingColGroup = true;
      if($tableColGroup.length == 0){
        $tableColGroup = $("<colgroup/>");
        existingColGroup = false;
      }
      var $fthRow = $('<fthtr style="display:table-row;border-spacing:0;height:0;border-collapse:collapse"/>'); //created unstyled elements (used for sizing the table because chrome can't read <col> width)
      var $floatContainer = $('<div style="overflow: hidden;" aria-hidden="true"></div>');
      var floatTableHidden = false; //this happens when the table is hidden and we do magic when making it visible
      var $newHeader = $("<thead/>");
      var $sizerRow = $('<tr class="size-row"/>');
      var $sizerCells = $([]);
      var $tableCells = $([]); //used for sizing - either $sizerCells or $tableColGroup cols. $tableColGroup cols are only created in chrome for borderCollapse:collapse because of a chrome bug.
      var $headerCells = $([]);
      var $fthCells = $([]); //created elements

      $newHeader.append($sizerRow);
      $table.prepend($tableColGroup);
      if(createElements){
        $fthGrp.append($fthRow);
        $table.append($fthGrp);
      }

      $floatTable.append($floatColGroup);
      $floatContainer.append($floatTable);
      if(opts.copyTableClass){
        $floatTable.attr('class', $table.attr('class'));
      }
      $floatTable.attr({ //copy over some deprecated table attributes that people still like to use. Good thing people don't use colgroups...
        'cellpadding': $table.attr('cellpadding'),
        'cellspacing': $table.attr('cellspacing'),
        'border': $table.attr('border')
      });
      var tableDisplayCss = $table.css('display');
      $floatTable.css({
        'borderCollapse': $table.css('borderCollapse'),
        'border': $table.css('border'),
        'display': tableDisplayCss
      });
      if(tableDisplayCss == 'none'){
        floatTableHidden = true;
      }

      $floatTable.addClass(opts.floatTableClass).css({'margin': 0, 'border-bottom-width': 0}); //must have no margins or you won't be able to click on things under floating table

      if(useAbsolutePositioning){
        var makeRelative = function($container, alwaysWrap){
          var positionCss = $container.css('position');
          var relativeToScrollContainer = (positionCss == "relative" || positionCss == "absolute");
          var $containerWrap = $container;
          if(!relativeToScrollContainer || alwaysWrap){
            var css = {"paddingLeft": $container.css('paddingLeft'), "paddingRight": $container.css('paddingRight')};
            $floatContainer.css(css);
            $containerWrap = $container.data('floatThead-containerWrap') || $container.wrap("<div class='"+opts.floatWrapperClass+"' style='position: relative; clear:both;'></div>").parent();
            $container.data('floatThead-containerWrap', $containerWrap); //multiple tables inside one scrolling container - #242
            wrappedContainer = true;
          }
          return $containerWrap;
        };
        if(locked){
          $wrapper = makeRelative($scrollContainer, true);
          $wrapper.prepend($floatContainer);
        } else {
          $wrapper = makeRelative($table);
          $table.before($floatContainer);
        }
      } else {
        $table.before($floatContainer);
      }


      $floatContainer.css({
        position: useAbsolutePositioning ? 'absolute' : 'fixed',
        marginTop: 0,
        top:  useAbsolutePositioning ? 0 : 'auto',
        zIndex: opts.zIndex
      });
      $floatContainer.addClass(opts.floatContainerClass);
      updateScrollingOffsets();

      var layoutFixed = {'table-layout': 'fixed'};
      var layoutAuto = {'table-layout': $table.css('tableLayout') || 'auto'};
      var originalTableWidth = $table[0].style.width || ""; //setting this to auto is bad: #70
      var originalTableMinWidth = $table.css('minWidth') || "";

      function eventName(name){
        return name+'.fth-'+floatTheadId+'.floatTHead'
      }

      function setHeaderHeight(){
        var headerHeight = 0;
        $header.children("tr:visible").each(function(){
          headerHeight += $(this).outerHeight(true);
        });
        if($table.css('border-collapse') == 'collapse') {
          var tableBorderTopHeight = parseInt($table.css('border-top-width'), 10);
          var cellBorderTopHeight = parseInt($table.find("thead tr:first").find(">*:first").css('border-top-width'), 10);
          if(tableBorderTopHeight > cellBorderTopHeight) {
            headerHeight -= (tableBorderTopHeight / 2); //id love to see some docs where this magic recipe is found..
          }
        }
        $sizerRow.outerHeight(headerHeight);
        $sizerCells.outerHeight(headerHeight);
      }


      function setFloatWidth(){
        var tw = tableWidth($table, $fthCells, true);
        var width = $scrollContainer.width() || tw;
        var floatContainerWidth = $scrollContainer.css("overflow-y") != 'hidden' ? width - scrollbarOffset.vertical : width;
        $floatContainer.width(floatContainerWidth);
        if(locked){
          var percent = 100 * tw / (floatContainerWidth);
          $floatTable.css('width', percent+'%');
        } else {
          $floatTable.outerWidth(tw);
        }
      }

      function updateScrollingOffsets(){
        scrollingTop = (util.isFunction(opts.top) ? opts.top($table) : opts.top) || 0;
        scrollingBottom = (util.isFunction(opts.bottom) ? opts.bottom($table) : opts.bottom) || 0;
      }

      /**
       * get the number of columns and also rebuild resizer rows if the count is different than the last count
       */
      function columnNum(){
        var count;
        var $headerColumns = $header.find(opts.headerCellSelector);
        if(existingColGroup){
          count = $tableColGroup.find('col').length;
        } else {
          count = 0;
          $headerColumns.each(function () {
            count += parseInt(($(this).attr('colspan') || 1), 10);
          });
        }
        if(count != lastColumnCount){
          lastColumnCount = count;
          var cells = [], cols = [], psuedo = [], content;
          for(var x = 0; x < count; x++){
            if (opts.enableAria && (content = $headerColumns.eq(x).text()) ) {
              cells.push('<th scope="col" class="floatThead-col">' + content + '</th>');
            } else {
              cells.push('<th class="floatThead-col"/>');
            }
            cols.push('<col/>');
            psuedo.push("<fthtd style='display:table-cell;height:0;width:auto;'/>");
          }

          cols = cols.join('');
          cells = cells.join('');

          if(createElements){
            psuedo = psuedo.join('');
            $fthRow.html(psuedo);
            $fthCells = $fthRow.find('fthtd');
          }

          $sizerRow.html(cells);
          $sizerCells = $sizerRow.find("th");
          if(!existingColGroup){
            $tableColGroup.html(cols);
          }
          $tableCells = $tableColGroup.find('col');
          $floatColGroup.html(cols);
          $headerCells = $floatColGroup.find("col");

        }
        return count;
      }

      function refloat(){ //make the thing float
        if(!headerFloated){
          headerFloated = true;
          if(useAbsolutePositioning){ //#53, #56
            var tw = tableWidth($table, $fthCells, true);
            var wrapperWidth = $wrapper.width();
            if(tw > wrapperWidth){
              $table.css('minWidth', tw);
            }
          }
          $table.css(layoutFixed);
          $floatTable.css(layoutFixed);
          $floatTable.append($header); //append because colgroup must go first in chrome
          $tbody.before($newHeader);
          setHeaderHeight();
        }
      }
      function unfloat(){ //put the header back into the table
        if(headerFloated){
          headerFloated = false;
          if(useAbsolutePositioning){ //#53, #56
            $table.width(originalTableWidth);
          }
          $newHeader.detach();
          $table.prepend($header);
          $table.css(layoutAuto);
          $floatTable.css(layoutAuto);
          $table.css('minWidth', originalTableMinWidth); //this looks weird, but it's not a bug. Think about it!!
          $table.css('minWidth', tableWidth($table, $fthCells)); //#121
        }
      }
      var isHeaderFloatingLogical = false; //for the purpose of this event, the header is/isnt floating, even though the element
      //might be in some other state. this is what the header looks like to the user
      function triggerFloatEvent(isFloating){
        if(isHeaderFloatingLogical != isFloating){
          isHeaderFloatingLogical = isFloating;
          $table.triggerHandler("floatThead", [isFloating, $floatContainer])
        }
      }
      function changePositioning(isAbsolute){
        if(useAbsolutePositioning != isAbsolute){
          useAbsolutePositioning = isAbsolute;
          $floatContainer.css({
            position: useAbsolutePositioning ? 'absolute' : 'fixed'
          });
        }
      }
      function getSizingRow($table, $cols, $fthCells, ieVersion){
        if(createElements){
          return $fthCells;
        } else if(ieVersion) {
          return opts.getSizingRow($table, $cols, $fthCells);
        } else {
          return $cols;
        }
      }

      /**
       * returns a function that updates the floating header's cell widths.
       * @return {Function}
       */
      function reflow(){
        var i;
        var numCols = columnNum(); //if the tables columns changed dynamically since last time (datatables), rebuild the sizer rows and get a new count

        return function(){
          $tableCells = $tableColGroup.find('col');
          var $rowCells = getSizingRow($table, $tableCells, $fthCells, ieVersion);

          if($rowCells.length == numCols && numCols > 0){
            if(!existingColGroup){
              for(i=0; i < numCols; i++){
                $tableCells.eq(i).css('width', '');
              }
            }
            unfloat();
            var widths = [];
            for(i=0; i < numCols; i++){
              widths[i] = getOffsetWidth($rowCells.get(i));
            }
            for(i=0; i < numCols; i++){
              $headerCells.eq(i).width(widths[i]);
              $tableCells.eq(i).width(widths[i]);
            }
            refloat();
          } else {
            $floatTable.append($header);
            $table.css(layoutAuto);
            $floatTable.css(layoutAuto);
            setHeaderHeight();
          }
          $table.triggerHandler("reflowed", [$floatContainer]);
        };
      }

      function floatContainerBorderWidth(side){
        var border = $scrollContainer.css("border-"+side+"-width");
        var w = 0;
        if (border && ~border.indexOf('px')) {
          w = parseInt(border, 10);
        }
        return w;
      }
      /**
       * first performs initial calculations that we expect to not change when the table, window, or scrolling container are scrolled.
       * returns a function that calculates the floating container's top and left coords. takes into account if we are using page scrolling or inner scrolling
       * @return {Function}
       */
      function calculateFloatContainerPosFn(){
        var scrollingContainerTop = $scrollContainer.scrollTop();

        //this floatEnd calc was moved out of the returned function because we assume the table height doesn't change (otherwise we must reinit by calling calculateFloatContainerPosFn)
        var floatEnd;
        var tableContainerGap = 0;
        var captionHeight = haveCaption ? $caption.outerHeight(true) : 0;
        var captionScrollOffset = captionAlignTop ? captionHeight : -captionHeight;

        var floatContainerHeight = $floatContainer.height();
        var tableOffset = $table.offset();
        var tableLeftGap = 0; //can be caused by border on container (only in locked mode)
        var tableTopGap = 0;
        if(locked){
          var containerOffset = $scrollContainer.offset();
          tableContainerGap = tableOffset.top - containerOffset.top + scrollingContainerTop;
          if(haveCaption && captionAlignTop){
            tableContainerGap += captionHeight;
          }
          tableLeftGap = floatContainerBorderWidth('left');
          tableTopGap = floatContainerBorderWidth('top');
          tableContainerGap -= tableTopGap;
        } else {
          floatEnd = tableOffset.top - scrollingTop - floatContainerHeight + scrollingBottom + scrollbarOffset.horizontal;
        }
        var windowTop = $window.scrollTop();
        var windowLeft = $window.scrollLeft();
        var scrollContainerLeft =  $scrollContainer.scrollLeft();

        return function(eventType){
          var isTableHidden = $table[0].offsetWidth <= 0 && $table[0].offsetHeight <= 0;
          if(!isTableHidden && floatTableHidden) {
            floatTableHidden = false;
            setTimeout(function(){
              $table.triggerHandler("reflow");
            }, 1);
            return null;
          }
          if(isTableHidden){ //it's hidden
            floatTableHidden = true;
            if(!useAbsolutePositioning){
              return null;
            }
          }

          if(eventType == 'windowScroll'){
            windowTop = $window.scrollTop();
            windowLeft = $window.scrollLeft();
          } else if(eventType == 'containerScroll'){
            scrollingContainerTop = $scrollContainer.scrollTop();
            scrollContainerLeft =  $scrollContainer.scrollLeft();
          } else if(eventType != 'init') {
            windowTop = $window.scrollTop();
            windowLeft = $window.scrollLeft();
            scrollingContainerTop = $scrollContainer.scrollTop();
            scrollContainerLeft =  $scrollContainer.scrollLeft();
          }
          if(isWebkit && (windowTop < 0 || windowLeft < 0)){ //chrome overscroll effect at the top of the page - breaks fixed positioned floated headers
            return;
          }

          if(absoluteToFixedOnScroll){
            if(eventType == 'windowScrollDone'){
              changePositioning(true); //change to absolute
            } else {
              changePositioning(false); //change to fixed
            }
          } else if(eventType == 'windowScrollDone'){
            return null; //event is fired when they stop scrolling. ignore it if not 'absoluteToFixedOnScroll'
          }

          tableOffset = $table.offset();
          if(haveCaption && captionAlignTop){
            tableOffset.top += captionHeight;
          }
          var top, left;
          var tableHeight = $table.outerHeight();

          if(locked && useAbsolutePositioning){ //inner scrolling, absolute positioning
            if (tableContainerGap >= scrollingContainerTop) {
              var gap = tableContainerGap - scrollingContainerTop + tableTopGap;
              top = gap > 0 ? gap : 0;
              triggerFloatEvent(false);
            } else {
              top = wrappedContainer ? tableTopGap : scrollingContainerTop;
              //headers stop at the top of the viewport
              triggerFloatEvent(true);
            }
            left = tableLeftGap;
          } else if(!locked && useAbsolutePositioning) { //window scrolling, absolute positioning
            if(windowTop > floatEnd + tableHeight + captionScrollOffset){
              top = tableHeight - floatContainerHeight + captionScrollOffset; //scrolled past table
            } else if (tableOffset.top >= windowTop + scrollingTop) {
              top = 0; //scrolling to table
              unfloat();
              triggerFloatEvent(false);
            } else {
              top = scrollingTop + windowTop - tableOffset.top + tableContainerGap + (captionAlignTop ? captionHeight : 0);
              refloat(); //scrolling within table. header floated
              triggerFloatEvent(true);
            }
            left =  0;
          } else if(locked && !useAbsolutePositioning){ //inner scrolling, fixed positioning
            if (tableContainerGap > scrollingContainerTop || scrollingContainerTop - tableContainerGap > tableHeight) {
              top = tableOffset.top - windowTop;
              unfloat();
              triggerFloatEvent(false);
            } else {
              top = tableOffset.top + scrollingContainerTop  - windowTop - tableContainerGap;
              refloat();
              triggerFloatEvent(true);
              //headers stop at the top of the viewport
            }
            left = tableOffset.left + scrollContainerLeft - windowLeft;
          } else if(!locked && !useAbsolutePositioning) { //window scrolling, fixed positioning
            if(windowTop > floatEnd + tableHeight + captionScrollOffset){
              top = tableHeight + scrollingTop - windowTop + floatEnd + captionScrollOffset;
              //scrolled past the bottom of the table
            } else if (tableOffset.top > windowTop + scrollingTop) {
              top = tableOffset.top - windowTop;
              refloat();
              triggerFloatEvent(false); //this is a weird case, the header never gets unfloated and i have no no way to know
              //scrolled past the top of the table
            } else {
              //scrolling within the table
              top = scrollingTop;
              triggerFloatEvent(true);
            }
            left = tableOffset.left - windowLeft;
          }
          return {top: top, left: left};
        };
      }
      /**
       * returns a function that caches old floating container position and only updates css when the position changes
       * @return {Function}
       */
      function repositionFloatContainerFn(){
        var oldTop = null;
        var oldLeft = null;
        var oldScrollLeft = null;
        return function(pos, setWidth, setHeight){
          if(pos != null && (oldTop != pos.top || oldLeft != pos.left)){
            $floatContainer.css({
              top: pos.top,
              left: pos.left
            });
            oldTop = pos.top;
            oldLeft = pos.left;
          }
          if(setWidth){
            setFloatWidth();
          }
          if(setHeight){
            setHeaderHeight();
          }
          var scrollLeft = $scrollContainer.scrollLeft();
          if(!useAbsolutePositioning || oldScrollLeft != scrollLeft){
            $floatContainer.scrollLeft(scrollLeft);
            oldScrollLeft = scrollLeft;
          }
        }
      }

      /**
       * checks if THIS table has scrollbars, and finds their widths
       */
      function calculateScrollBarSize(){ //this should happen after the floating table has been positioned
        if($scrollContainer.length){
          if($scrollContainer.data().perfectScrollbar){
            scrollbarOffset = {horizontal:0, vertical:0};
          } else {
            var sw = $scrollContainer.width(), sh = $scrollContainer.height(), th = $table.height(), tw = tableWidth($table, $fthCells);
            var offseth = sw < tw ? scWidth : 0;
            var offsetv = sh < th ? scWidth : 0;
            scrollbarOffset.horizontal = sw - offsetv < tw ? scWidth : 0;
            scrollbarOffset.vertical = sh - offseth < th ? scWidth : 0;
          }
        }
      }
      //finish up. create all calculation functions and bind them to events
      calculateScrollBarSize();

      var flow;

      var ensureReflow = function(){
        flow = reflow();
        flow();
      };

      ensureReflow();

      var calculateFloatContainerPos = calculateFloatContainerPosFn();
      var repositionFloatContainer = repositionFloatContainerFn();

      repositionFloatContainer(calculateFloatContainerPos('init'), true); //this must come after reflow because reflow changes scrollLeft back to 0 when it rips out the thead

      var windowScrollDoneEvent = util.debounce(function(){
        repositionFloatContainer(calculateFloatContainerPos('windowScrollDone'), false);
      }, 1);

      var windowScrollEvent = function(){
        repositionFloatContainer(calculateFloatContainerPos('windowScroll'), false);
        if(absoluteToFixedOnScroll){
          windowScrollDoneEvent();
        }
      };
      var containerScrollEvent = function(){
        repositionFloatContainer(calculateFloatContainerPos('containerScroll'), false);
      };


      var windowResizeEvent = function(){
        if($table.is(":hidden")){
          return;
        }
        updateScrollingOffsets();
        calculateScrollBarSize();
        ensureReflow();
        calculateFloatContainerPos = calculateFloatContainerPosFn();
        repositionFloatContainer = repositionFloatContainerFn();
        repositionFloatContainer(calculateFloatContainerPos('resize'), true, true);
      };
      var reflowEvent = util.debounce(function(){
        if($table.is(":hidden")){
          return;
        }
        calculateScrollBarSize();
        updateScrollingOffsets();
        ensureReflow();
        calculateFloatContainerPos = calculateFloatContainerPosFn();
        repositionFloatContainer(calculateFloatContainerPos('reflow'), true);
      }, 1);
      if(locked){ //internal scrolling
        if(useAbsolutePositioning){
          $scrollContainer.on(eventName('scroll'), containerScrollEvent);
        } else {
          $scrollContainer.on(eventName('scroll'), containerScrollEvent);
          $window.on(eventName('scroll'), windowScrollEvent);
        }
      } else { //window scrolling
        $window.on(eventName('scroll'), windowScrollEvent);
      }

      $window.on(eventName('load'), reflowEvent); //for tables with images

      windowResize(eventName('resize'), windowResizeEvent);
      $table.on('reflow', reflowEvent);
      if(isDatatable($table)){
        $table
          .on('filter', reflowEvent)
          .on('sort',   reflowEvent)
          .on('page',   reflowEvent);
      }

      $window.on(eventName('shown.bs.tab'), reflowEvent); // people cant seem to figure out how to use this plugin with bs3 tabs... so this :P
      $window.on(eventName('tabsactivate'), reflowEvent); // same thing for jqueryui


      if (canObserveMutations) {
        var mutationElement = null;
        if(util.isFunction(opts.autoReflow)){
          mutationElement = opts.autoReflow($table, $scrollContainer)
        }
        if(!mutationElement) {
          mutationElement = $scrollContainer.length ? $scrollContainer[0] : $table[0]
        }
        mObs = new MutationObserver(function(e){
          var wasTableRelated = function(nodes){
            return nodes && nodes[0] && (nodes[0].nodeName == "THEAD" || nodes[0].nodeName == "TD"|| nodes[0].nodeName == "TH");
          };
          for(var i=0; i < e.length; i++){
            if(!(wasTableRelated(e[i].addedNodes) || wasTableRelated(e[i].removedNodes))){
              reflowEvent();
              break;
            }
          }
        });
        mObs.observe(mutationElement, {
          childList: true,
          subtree: true
        });
      }

      //attach some useful functions to the table.
      $table.data('floatThead-attached', {
        destroy: function(){
          var ns = '.fth-'+floatTheadId;
          unfloat();
          $table.css(layoutAuto);
          $tableColGroup.remove();
          createElements && $fthGrp.remove();
          if($newHeader.parent().length){ //only if it's in the DOM
            $newHeader.replaceWith($header);
          }
          if(canObserveMutations){
            mObs.disconnect();
            mObs = null;
          }
          $table.off('reflow reflowed');
          $scrollContainer.off(ns);
          if (wrappedContainer) {
            if ($scrollContainer.length) {
              $scrollContainer.unwrap();
            }
            else {
              $table.unwrap();
            }
          }
          if(locked){
            $scrollContainer.data('floatThead-containerWrap', false);
          } else {
            $table.data('floatThead-containerWrap', false);
          }
          $table.css('minWidth', originalTableMinWidth);
          $floatContainer.remove();
          $table.data('floatThead-attached', false);
          $window.off(ns);
        },
        reflow: function(){
          reflowEvent();
        },
        setHeaderHeight: function(){
          setHeaderHeight();
        },
        getFloatContainer: function(){
          return $floatContainer;
        },
        getRowGroups: function(){
          if(headerFloated){
            return $floatContainer.find('>table>thead').add($table.children("tbody,tfoot"));
          } else {
            return $table.children("thead,tbody,tfoot");
          }
        }
      });
    });
    return this;
  };
})(jQuery);

/* jQuery.floatThead.utils - http://mkoryak.github.io/floatThead/ - Copyright (c) 2012 - 2014 Misha Koryak
 * License: MIT
 *
 * This file is required if you do not use underscore in your project and you want to use floatThead.
 * It contains functions from underscore that the plugin uses.
 *
 * YOU DON'T NEED TO INCLUDE THIS IF YOU ALREADY INCLUDE UNDERSCORE!
 *
 */

(function($){

  $.floatThead = $.floatThead || {};

  $.floatThead._  = window._ || (function(){
    var that = {};
    var hasOwnProperty = Object.prototype.hasOwnProperty, isThings = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
    that.has = function(obj, key) {
      return hasOwnProperty.call(obj, key);
    };
    that.keys = function(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object');
      var keys = [];
      for (var key in obj) if (that.has(obj, key)) keys.push(key);
      return keys;
    };
    var idCounter = 0;
    that.uniqueId = function(prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
    };
    $.each(isThings, function(){
      var name = this;
      that['is' + name] = function(obj) {
        return Object.prototype.toString.call(obj) == '[object ' + name + ']';
      };
    });
    that.debounce = function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;
      return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var later = function() {
          var last = (new Date()) - timestamp;
          if (last < wait) {
            timeout = setTimeout(later, wait - last);
          } else {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
          timeout = setTimeout(later, wait);
        }
        if (callNow) result = func.apply(context, args);
        return result;
      };
    };
    return that;
  })();
})(jQuery);


