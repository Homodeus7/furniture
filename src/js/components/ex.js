var main = {
    init: function () {
      this.addTouchClass(),
        this.retinaLogo(),
        this.lazyloadImage(),
        this.retinaImage(),
        this.retinaProductImage(),
        this.searchAuto(),
        this.moveTop(),
        globalThemeSettings.isLocationSelect && this.locationChange(),
        globalThemeSettings.isCurrencySelect && this.currencyChange(),
        this.expandText(),
        this.expandAccordionText(),
        this.breadcrumbsScroll(),
        globalThemeSettings.isMobile ||
          (this.expandSidebarPluginsNav(), this.expandSidebarTags());
    },
    addTouchClass: function () {
      is_touch_device() && $("body").removeClass("no-touch").addClass("touch");
    },
    retinaLogo: function () {
      var e = $(".js-logo-retina");
      e.length && e.retina({ force_original_dimensions: !1 });
    },
    retinaImage: function () {
      var e = $(".js-img-retina");
      e.length && e.retina({ force_original_dimensions: !1 });
    },
    lazyloadImage: function () {
      var e = $(".js-image-lazy");
      e.length && e.lazy({ bind: "event" });
    },
    retinaProductImage: function () {
      var e = $(".js-product-img-retina img");
      e.length && e.retina({ force_original_dimensions: !1 });
    },
    searchAuto: function () {
      var e = $(".js-search-auto");
      if (!e.length) return !1;
      e.on("keyup", function () {
        var e = $(this),
          t = e.val(),
          s = e.closest("form"),
          i = s.attr("action"),
          a = s.find(".js-search-auto-result");
        t.length >= 3
          ? $.get(i + "?query=" + t + "&ajax=1", function (e) {
              var t = $(e).find(".js-auto-search");
              t.length ? (a.show(), a.html(t)) : a.html("");
            })
          : (a.html(""), a.hide());
      }),
        $("body").click(function (e) {
          var t = $(".js-search-auto-result");
          $(".js-search-auto").is(e.target) ||
            t.is(e.target) ||
            0 != t.has(e.target).length ||
            t.hide();
        });
    },
    moveTop: function () {
      var e = $("#move-to-top"),
        t = $(".js-content-move");
      t.length &&
        e.length &&
        ($(window).scroll(function () {
          $(document).scrollTop() >= t.offset().top ? e.fadeIn() : e.fadeOut();
        }),
        e.click(function (e) {
          e.preventDefault(), $("html,body").animate({ scrollTop: 0 }, 500);
        }));
    },
    locationChange: function () {
      if (!$(".js-language").length) return !1;
      $(".js-language").on("click", function (e) {
        e.preventDefault();
        var t = location.href;
        t.indexOf("#") > -1 && (t = t.substr(0, t.indexOf("#"))),
          -1 == t.indexOf("?") ? (t += "?") : (t += "&"),
          (location.href = t + "locale=" + $(this).data("value"));
      });
    },
    currencyChange: function () {
      if (!$(".js-currency").length) return !1;
      $(".js-currency").on("click", function (e) {
        e.preventDefault();
        var t = location.href;
        t.indexOf("#") > -1 && (t = t.substr(0, t.indexOf("#"))),
          -1 == t.indexOf("?") ? (t += "?") : (t += "&"),
          (location.href = t + "currency=" + $(this).data("value"));
      });
    },
    expandText: function () {
      $("body").on("click", ".js-open-expand-text", function () {
        var e = $(this).closest(".js-expand-text-item"),
          t = e.find(".js-expand-text");
        t.is(":visible")
          ? t.slideUp(250, function () {
              e.addClass("close").removeClass("open");
            })
          : t.slideDown(250, function () {
              e.addClass("open").removeClass("close");
            });
      });
    },
    expandAccordionText: function () {
      $("body").on("click", ".js-extend-accordion-title", function () {
        var e = $(this)
            .closest(".extend-accordion__list")
            .find(".js-extend-accordion-item.open"),
          t = $(this).closest(".js-extend-accordion-item"),
          s = t.find(".js-extend-accordion-text");
        e.length &&
          e.find(".js-extend-accordion-text").slideUp(250, function () {
            e.addClass("close").removeClass("open");
          });
        s.is(":visible")
          ? s.slideUp(250, function () {
              t.addClass("close").removeClass("open");
            })
          : s.slideDown(250, function () {
              t.addClass("open").removeClass("close");
            });
      });
    },
    breadcrumbsScroll: function () {
      var e = $(".js-breadcrumbs-scroll");
      if (e.length) {
        var t = e[0].scrollWidth;
        e.scrollLeft(t);
      }
    },
    expandSidebarPluginsNav: function () {
      $(".js-sidebar-plugins-nav").each(function () {
        var e = $(this);
        if (e.find(".menu-v li:hidden").length) {
          var t = e.find(".js-sidebar-plugins-nav-more");
          t.removeClass("hide"),
            t.on("click", function () {
              $(this)
                .closest(".js-sidebar-plugins-nav")
                .find(".menu-v li:hidden, .menu-v li.show")
                .toggleClass("show"),
                $(this).toggleClass("open");
            });
        }
      });
    },
    expandSidebarTags: function () {
      $(".js-show-tags").on("click", function () {
        var e = $(this),
          t = e.closest(".js-tags").find(".js-tag");
        e.hasClass("open")
          ? (e.removeClass("open"), t.addClass("hide"))
          : (e.addClass("open"), t.removeClass("hide"));
      });
    },
  },
  headerFixed = {
    init: function () {
      var e = this;
      if (!$(".js-header-fixed").length) return !1;
      e.showHide(),
        e.categoriesVerticalMenu(),
        $(window).scroll(function () {
          e.showHide();
        });
    },
    showHide: function () {
      var e = $(".js-header-fixed"),
        t = $(".js-content-move");
      t.length &&
        e.length &&
        ($(document).scrollTop() >= t.offset().top + 60
          ? e.show()
          : e.is(":visible") && (e.hide(), this.closeMenu()));
    },
    closeMenu: function () {
      var e = $(".js-header-fixed .js-categories-v"),
        t = $(".js-categories-menu-bg");
      if (!e.hasClass("close")) {
        e.addClass("close"), e.removeAttr("style");
        var s = $(".js-categories-v"),
          i = !1;
        s.each(function () {
          var e = $(this).find(".js-categories-menu");
          e.is(":visible") && "absolute" === e.css("position") && (i = !0);
        }),
          i || t.hide();
      }
    },
    categoriesVerticalMenu: function () {
      var e = $(".js-header-fixed .js-categories-menu-inner");
      e.on("click", function (t) {
        var s = e.find(".js-categories-menu");
        s.is(t.target) ||
          0 != s.has(t.target).length ||
          categoriesVerticalMenu.closeAll();
      }),
        $("body").click(function (e) {
          var t = $(".js-search-auto-result");
          $(".js-search-auto").is(e.target) ||
            t.is(e.target) ||
            0 != t.has(e.target).length ||
            t.hide();
        });
    },
    setHeightToMainMenu: function (e) {
      if (e.closest(".js-header-fixed").length) {
        var t = e.find(".js-categories-sub, .js-submenu").filter(":visible"),
          s = e.closest(".js-categories-menu-inner"),
          i = s.offset().top,
          a = e.outerHeight();
        t.size() &&
          (t.each(function () {
            var e = $(this),
              t = e.offset().top + e.outerHeight();
            a < t && (a = t);
          }),
          (a -= i) > 0 && s.css("min-height", a + "px"));
      }
    },
  },
  headerMobileFixed = {
    init: function () {
      var e = this,
        t = $(".js-m-header-top");
      if (!t.length && t.data("fixed")) return !1;
      e.showHide(),
        $(window).scroll(function () {
          e.showHide();
        });
    },
    showHide: function () {
      var e = $(".js-m-header-top"),
        t = $(".js-content-move");
      if (e.length && t.length) {
        var s = $(document).scrollTop(),
          i = t.offset().top;
        s > parseInt(i + 60)
          ? e.hasClass("fixed") ||
            (e.css("top", "-60px"),
            e.addClass("fixed"),
            e.animate({ top: "0" }, 300, function () {
              e.removeAttr("style");
            }))
          : 0 == s && e.removeClass("fixed");
      }
    },
  },
  mobilePopupBlocks = {
    init: function () {
      var e = this;
      e.open(),
        $(".js-close-m-popup").on("click", function () {
          e.close($(this).closest(".js-m-popup"));
        });
    },
    open: function () {
      var e = this;
      $(".js-open-m-popup").on("click", function () {
        var t = $(this).data("id");
        if (t) {
          var s = $("#" + t);
          s.length &&
            (s.is(":visible")
              ? e.close(s)
              : (s.css("top", "100%"),
                s.addClass("show"),
                s.animate({ top: "0" }, 300, function () {
                  s.removeAttr("style");
                }),
                $("body").addClass("overflow-hidden"),
                (t = "popup-contacts") && e.createMap(s)));
        }
      });
    },
    close: function (e) {
      e.length &&
        (e.animate({ top: "100%" }, 300, function () {
          e.removeAttr("style"), e.removeClass("show");
        }),
        $("body").removeClass("overflow-hidden"));
    },
    createMap: function (e) {
      var t = e.find(".js-popup-map");
      t.length &&
        !t.find("iframe").length &&
        t.data("link-map") &&
        t.html(
          '<iframe width="100%" height="400px" src="' +
            t.data("link-map") +
            '" frameborder="0" allowfullscreen=""></iframe>'
        );
    },
  },
  mobileMenu = {
    init: function () {
      this.open(), this.closeByButton(), this.closeByBg(), this.showSubmenu();
    },
    open: function () {
      var e = this;
      $(".js-open-mobile-menu").on("click", function () {
        var t = $(this).data("id");
        if (!t) return !1;
        var s = $("#" + t);
        if (s.length) {
          var i = s.data("lazy"),
            a = s.data("retina");
          i
            ? categoriesImages.lazyImages(s.find(".js-menu-m-image"), a)
            : a && categoriesImages.retinaImages(s.find(".js-menu-m-image")),
            s.is(":visible")
              ? e.close(s)
              : (s.css("left", "100%"),
                s.addClass("show"),
                s.animate({ left: "0" }, 300, function () {
                  s.removeAttr("style");
                }),
                $("body")
                  .addClass("overflow-hidden")
                  .append("<div class='js-m-bg m-bg'></div>"));
        }
      });
    },
    closeByButton: function () {
      var e = this;
      $(".js-mobile-menu-close").on("click", function () {
        var t = $(this).closest(".js-mobile-menu");
        e.close(t);
      });
    },
    closeByBg: function () {
      var e = this;
      $("body").on("click", ".js-m-bg", function () {
        e.close($(".js-mobile-menu"));
      });
    },
    close: function (e) {
      e.length &&
        e.animate({ left: "-100%" }, 300, function () {
          e.removeAttr("style"),
            e.removeClass("show"),
            $("body").removeClass("overflow-hidden"),
            $(".js-m-bg").first().remove();
        });
    },
    showSubmenu: function () {
      $(".js-m-submenu-open").on("click", function () {
        var e = $(this).parent();
        e.hasClass("open") ? e.removeClass("open") : e.addClass("open");
      });
    },
  },
  anchorLink = {
    init: function () {
      $(".js-move-to-tab").on("click", function (e) {
        e.preventDefault();
        var t = $(this),
          s = t.data("tab-content"),
          i = $(".js-tab-content#" + s),
          a = $(".js-accordion-tab-content#" + s),
          o = $("#" + s);
        if (i.length) tabs.moveToTabContent(t, i);
        else if (a.length) accordionTabs.moveToTabContent(t, a);
        else {
          var n = o.offset().top - 40;
          $(".js-header-fixed").length && (n -= 70),
            $("html,body").animate({ scrollTop: n }, 500);
        }
      });
    },
  },
  tabs = {
    init: function () {
      this.initSelectTab(), this.selectTab(), this.scrollMobile();
    },
    selectTab: function () {
      $("body").on("click", ".js-tab", function () {
        var e = $(this),
          t = e.data("tab-content"),
          s = e.closest(".js-tabs-outer").find(".js-tab-content"),
          i = e.closest(".js-tabs-outer").find(".js-tab"),
          a = e.closest(".js-tabs-outer").find("#" + t);
        i.removeClass("selected"),
          s.removeClass("selected"),
          e.addClass("selected"),
          a.addClass("selected");
      });
    },
    moveToTabContent: function (e, t) {
      var s = t.closest(".js-tabs-outer"),
        i = s.find(".js-tab-content"),
        a = s.find(".js-tab"),
        o = s.find('.js-tab[data-tab-content="' + e.data("tab-content") + '"]');
      a.removeClass("selected"),
        o.addClass("selected"),
        i.removeClass("selected"),
        t.addClass("selected");
      var n = t.offset().top - 115;
      $(".js-header-fixed").length && (n -= 75),
        $("html,body").animate({ scrollTop: n }, 500);
    },
    initSelectTab: function () {
      var e = $(".js-tabs-outer");
      e.length &&
        e.each(function () {
          var t = $(this),
            s = t.find(".js-tab.selected");
          if (!s.length && (s = t.find(".js-tab:first")).length) {
            var i = e.find("#" + s.data("tab-content"));
            i.length && (s.addClass("selected"), i.addClass("selected"));
          }
        });
    },
    scrollMobile: function () {
      var e = $(".js-tabs"),
        t = $("body").hasClass("touch");
      e.length &&
        t &&
        e.each(function () {
          var e = $(this);
          e[0].offsetWidth < e[0].scrollWidth && e.addClass("tabs--shadow");
        }),
        $(".js-tabs").on("scroll", function () {
          $(this).removeClass("tabs--shadow");
        });
    },
  },
  accordionTabs = {
    init: function () {
      this.initSelectTab(), this.selectTab();
    },
    selectTab: function () {
      $("body").on("click", ".js-accordion-tab", function () {
        var e = $(this),
          t = e.data("tab-content"),
          s = e.closest(".js-accordion-tabs-outer").find("#" + t);
        s.is(":visible")
          ? (e.removeClass("selected"), s.removeClass("selected"))
          : (e.addClass("selected"), s.addClass("selected"));
      });
    },
    moveToTabContent: function (e, t) {
      t
        .closest(".js-accordion-tabs-outer")
        .find(
          '.js-accordion-tab[data-tab-content="' + e.data("tab-content") + '"]'
        )
        .addClass("selected"),
        t.addClass("selected");
      var s = t.offset().top - 40;
      $(".js-header-fixed").length && (s -= 70),
        $("html,body").animate({ scrollTop: s }, 500);
    },
    initSelectTab: function () {
      var e = $(".js-accordion-tabs-outer");
      e.length &&
        e.each(function () {
          var t = $(this),
            s = t.find(".js-accordion-tab.selected");
          if (!s.length && (s = t.find(".js-accordion-tab:first")).length) {
            var i = e.find("#" + s.data("tab-content"));
            i.length && (s.addClass("selected"), i.addClass("selected"));
          }
        });
    },
  },
  slider = {
    init: function () {
      var e = this,
        t = $(".js-main-slider");
      t.length &&
        t.each(function () {
          var t = $(this);
          e.sliderAuto(t), e.sliderInteraction(t);
        });
      var s = $(".js-product-item:first-child").find(".js-slider-image");
      s.length && $.Retina && s.retina();
    },
    sliderAuto: function (e) {
      var t = this,
        s = 1e3 * parseInt(e.data("pause"));
      s > 0 &&
        setTimeout(function () {
          t.sliderInit(e, null, s);
        }, s);
    },
    sliderInteraction: function (e) {
      var t = this;
      $(".js-slider-init-interaction").on("click", function () {
        var e = $(this).closest(".js-slider-wrap").find(".js-main-slider");
        t.sliderInit(e, $(this).data("index"), !1),
          e.trigger("stop.owl.autoplay");
      }),
        (is_touch_device() || e.data("swipe")) &&
          e.swipe({
            allowPageScroll: "auto",
            threshold: 20,
            swipe: function (s, i, a, o, n, r) {
              "left" == i
                ? t.sliderInit(e, "next", !1)
                : "right" == i && t.sliderInit(e, "prev", !1),
                e.hasClass("owl-loaded") && e.trigger("stop.owl.autoplay");
            },
          });
    },
    sliderInit: function (e, t, s) {
      var i = this;
      if (e.hasClass("owl-loaded")) return !1;
      var a = !!s,
        o = e.data("swipe"),
        n = e.data("lazy"),
        r = e.closest(".js-slider-wrap").find(".js-slider-nav"),
        c = e.closest(".js-slider-wrap").find(".js-slider-dots"),
        d = {
          loop: !0,
          margin: 0,
          nav: !0,
          navElement: "div",
          navContainer: r,
          dotsContainer: c,
          navText: [
            '<span class="carousel-prev"></span>',
            '<span class="carousel-next"></span>',
          ],
          lazyLoad: n,
          autoHeight: !0,
          items: 1,
          mouseDrag: o,
          onInitialize: function () {
            r.html(""), c.html("");
          },
          onInitialized: function (e) {
            void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit();
            var t = $(e.currentTarget);
            n && i.setHeightNextSlide(t);
          },
          onTranslate: function () {
            e.addClass("_switch");
          },
          onDragged: function (e) {
            void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit();
          },
          onTranslated: function (e) {
            void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit();
          },
          onLoadedLazy: function (e) {
            var t = $(e.currentTarget),
              s = t.find(".owl-item.active");
            t.find(".js-slider-banner-inner").removeAttr("style"),
              s.length &&
                $.Retina &&
                s.find(".js-product-item .js-slider-image").retina();
            var a = s.find(".owl-lazy");
            a.removeClass("owl-lazy"),
              t
                .find(".owl-item img[src='" + a.attr("src") + "']")
                .removeClass("owl-lazy"),
              t.trigger("refresh.owl.carousel"),
              i.setHeightNextSlide(t);
          },
        };
      a &&
        ((d.autoplay = !0),
        (d.autoplayTimeout = s),
        (d.autoplayHoverPause = !0)),
        e.owlCarousel(d),
        $(
          ".js-slider-wrap .owl-prev, .js-slider-wrap .owl-next, .js-slider-wrap .owl-dot"
        ).on("click", function (t) {
          e.trigger("stop.owl.autoplay");
        }),
        t &&
          ("prev" == t
            ? e.trigger("prev.owl.carousel")
            : "next" == t
            ? e.trigger("next.owl.carousel")
            : e.trigger("to.owl.carousel", [parseInt(t)])),
        (is_touch_device() && !o) ||
          e.swipe({
            allowPageScroll: "auto",
            threshold: 20,
            swipe: function (t, s, i, a, o, n) {
              "left" == s
                ? e.trigger("next.owl.carousel")
                : "right" == s && e.trigger("prev.owl.carousel");
            },
          });
    },
    setHeightNextSlide: function (e) {
      if (e.find("img.owl-lazy").length) {
        var t = e.height(),
          s = e.find(".owl-item.active"),
          i = s.next(),
          a = s.prev();
        if (i.length && i.find("img.owl-lazy").length) {
          var o = i.find(".js-slider-banner-inner");
          o.length && o.css("height", t + "px");
        }
        if (a.length && a.find("img.owl-lazy").length) {
          var n = a.find(".js-slider-banner-inner");
          n.length && n.css("height", t + "px");
        }
      }
    },
  },
  countdown = {
    init: function () {
      $(".js-promo-countdown").each(function () {
        var e = $(this),
          t = e.data("end"),
          s = e.data("day-text"),
          i = e.data("wrap");
        e.countdown(t, function (t) {
          i
            ? (e.find(".js-countdown-days").html(t.strftime("%D")),
              e.find(".js-countdown-hours").html(t.strftime("%H")),
              e.find(".js-countdown-minutes").html(t.strftime("%M")),
              e.find(".js-countdown-seconds").html(t.strftime("%S")))
            : e.text(t.strftime("%D " + s + " %H:%M:%S"));
        });
      });
    },
  },
  form = {
    init: function () {
      this.formStyler(), this.submit(), this.numberType();
    },
    formStyler: function () {
      if (
        ($("body").on("change", 'input[type="checkbox"]', function () {
          $(this).is(":checked")
            ? ($(this)
                .closest(".jq-checkbox, .js-checkbox-styler")
                .addClass("checked"),
              $(this).closest("label").addClass("checked"))
            : ($(this)
                .closest(".jq-checkbox, label, .js-checkbox-styler")
                .removeClass("checked"),
              $(this).closest("label").removeClass("checked"));
        }),
        $("body").on("change", 'input[type="radio"]', function () {
          $('input[type="radio"][name="' + $(this).attr("name") + '"]').each(
            function () {
              var e = $(this);
              e.is(":checked")
                ? (e.closest(".jq-radio, .js-radio-styler").addClass("checked"),
                  e.closest("label").addClass("checked"))
                : (e
                    .closest(".jq-radio, .js-radio-styler")
                    .removeClass("checked"),
                  e.closest("label").removeClass("checked"));
            }
          );
        }),
        !globalThemeSettings.isFormStylerInit)
      )
        return !1;
      var e = $(
        'input[type="checkbox"]:not(.js-checkbox-styler-input):not(.js-none-styler):not(.shop-sk-callback__checkbox), input[type="radio"]:not(.js-radio-styler-input):not(.buy1step-auth__variant):not(.js-none-styler), .js-select'
      );
      if (!e.length) return !1;
      e.styler(),
        $(
          '.searchpro__page-filters input[type="checkbox"], .searchpro__page-filters input[type="radio"]'
        ).styler("destroy"),
        $(
          '.onestep-cart input[type="checkbox"], .onestep-cart input[type="radio"]'
        ).styler("destroy"),
        $('.js-addgifts__cart-item input[type="radio"]').styler("destroy");
    },
    submit: function () {
      $("body").on("click", ".js-submit-form", function () {
        var e = $(this),
          t = e.closest("form");
        e.hasClass("disabled") || t.submit();
      });
    },
    numberType: function () {
      $("body").on("keyup", ".js-number", function () {
        $(this).val(
          $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );
      });
    },
  },
  headerMenu = {
    init: function () {
      this.hoverByItem();
    },
    hoverByItem: function () {
      var e = this,
        t = $(".js-header-menu-outer");
      t
        .find(".js-header-menu-item, .js-header-submenu-item a")
        .click(function (e) {
          if ($("body").hasClass("touch")) {
            var t = $(this)
              .closest(".js-header-menu-item, .js-header-submenu-item")
              .find(".js-header-submenu-outer")
              .first();
            t.length && t.is(":hidden") && e.preventDefault();
          }
        }),
        $("body").on(
          "mouseover",
          ".js-header-menu-item, .js-header-submenu-item",
          function () {
            $(this)
              .find(".js-header-submenu-outer")
              .first()
              .stop(!0)
              .delay(150)
              .fadeIn(1, function () {
                $(this).closest(".js-header-menu-item").addClass("hover"),
                  $(".js-header-menu-bg").show(),
                  $(".js-header-top").css("z-index", "11"),
                  e.positionSubmenu(
                    t,
                    $(this).closest(".js-header-submenu-outer")
                  );
              });
          }
        ),
        $("body").on(
          "mouseout",
          ".js-header-menu-item, .js-header-submenu-item",
          function () {
            $(this)
              .find(".js-header-submenu-outer")
              .first()
              .stop(!0)
              .delay(150)
              .fadeOut(1, function () {
                $(this).closest(".js-header-menu-item").removeClass("hover");
              });
          }
        ),
        $(".js-header-top-inner, .js-header-menu-outer").mouseleave(
          function () {
            $(".js-header-menu-bg").hide(),
              $(".js-header-top").removeAttr("style");
          }
        );
    },
    positionSubmenu: function (e, t) {
      if (t.length) {
        var s = e.offset().left,
          i = parseFloat(s) + parseFloat(e.outerWidth(!0));
        t.removeClass("to-left").removeClass("to-right").removeAttr("style"),
          t.css("visibility", "hidden").css("display", "block");
        var a = t.offset().left,
          o = parseFloat(t.outerWidth(!0));
        i < parseFloat(a) + o && t.addClass("to-left"),
          t.removeAttr("style"),
          t.css("display", "block");
      }
    },
  },
  categoriesVerticalMenu = {
    init: function () {
      if (!$(".js-categories-v").length) return !1;
      this.open(),
        this.closeByBg(),
        this.openSubcategories(),
        this.retinaImagesFirstlvl(
          $(".js-categories-v:not(.close) .js-categories-menu")
        );
    },
    open: function () {
      var e = this,
        t = $(".js-categories-btn"),
        s = $(".js-categories-menu-bg");
      $(".js-categories-menu");
      t.on("click", function () {
        var t = $(this),
          i = t.closest(".js-categories-v"),
          a = i.find(".js-categories-menu");
        a.is(":visible")
          ? e.close(t)
          : (e.closeAll(),
            i.removeClass("close"),
            ("absolute" === a.css("position") ||
              a.closest(".js-header-fixed").length) &&
              (s.show(), i.css("z-index", 11)),
            e.retinaImagesFirstlvl(a));
      });
    },
    close: function (e) {
      var t = $(".js-categories-menu-bg"),
        s = $(".js-categories-v");
      e && (s = e.closest(".js-categories-v")),
        s.addClass("close"),
        t.hide(),
        s.removeAttr("style");
    },
    closeAll: function () {
      var e = this;
      $(".js-categories-menu").each(function () {
        var t = $(this),
          s = t.closest(".js-categories-v").find(".js-categories-btn");
        ("absolute" === t.css("position") ||
          t.closest(".js-header-fixed").length) &&
          e.close(s);
      });
    },
    closeByBg: function () {
      var e = this;
      $(".js-categories-menu-bg").on("click", function () {
        e.closeAll();
      });
    },
    retinaImagesFirstlvl: function (e) {
      if (e.length) {
        var t = e.data("lazy"),
          s = e.data("retina");
        t
          ? categoriesImages.lazyImages(e.find(".js-categories-v-image"), s)
          : s &&
            categoriesImages.retinaImages(e.find(".js-categories-v-image"));
      }
    },
    openSubcategories: function () {
      var e = $(".js-categories-menu");
      $("body").hasClass("touch");
      e.menuAim({
        rowSelector: "> .js-categories-v-item",
        activate: function (e) {
          var t = $("body").hasClass("touch"),
            s = $(e).closest(".js-categories-menu"),
            i = "absolute" === s.css("position"),
            a = s.closest(".js-header-fixed").length > 0,
            o = s.closest(".js-categories-v"),
            n = s.data("lazy"),
            r = s.data("retina"),
            c = $(e).find("a").first(),
            d = $(e).find(".js-categories-sub");
          t && c.size() && d.size() && "else" != $(e).data("type")
            ? c.click(function (t) {
                $(e).hasClass("hover") ||
                  (t.preventDefault(), $(e).addClass("hover"));
              })
            : $(e).addClass("hover"),
            n
              ? (categoriesImages.lazyImages($(e).find(".js-subcat-image"), r),
                categoriesImages.lazyImages($(e).find(".js-brand-image"), !1))
              : r &&
                categoriesImages.retinaImages($(e).find(".js-subcat-image")),
            $(e).find(".js-submenu-image-lazy").lazy(),
            i ||
              a ||
              !d.size() ||
              ($(".js-categories-menu-bg").show(), o.css("z-index", 11)),
            headerFixed.setHeightToMainMenu(s);
        },
        deactivate: function (e) {
          $(e).removeClass("hover");
        },
        enter: function (t) {
          if (!e.find(".js-categories-sub").filter(":visible").size()) {
            var s = $("body").hasClass("touch"),
              i = $(t).closest(".js-categories-menu"),
              a = "absolute" === i.css("position"),
              o = i.closest(".js-header-fixed").length > 0,
              n = i.closest(".js-categories-v"),
              r = $(t).find("a").first(),
              c = $(t).find(".js-categories-sub");
            s && r.size() && c.size()
              ? r.click(function (e) {
                  $(t).hasClass("hover") || e.preventDefault();
                })
              : $(t).addClass("hover"),
              a ||
                o ||
                !c.size() ||
                ($(".js-categories-menu-bg").show(), n.css("z-index", 11));
          }
        },
        exitMenu: function (e) {
          var t = "absolute" === $(e).css("position"),
            s = $(e).closest(".js-header-fixed").length > 0,
            i = $(e).closest(".js-categories-v");
          $(e).find(".js-categories-v-item").removeClass("hover"),
            t ||
              s ||
              ($(".js-categories-menu-bg").hide(), i.removeAttr("style"));
        },
      }),
        e.find(".js-subcategories-menu").each(function () {
          var e = $(this);
          e.menuAim({
            rowSelector: "> .js-categories-sub-item",
            activate: function (e) {
              var t = $("body").hasClass("touch"),
                s = $(e).find("a").first(),
                i = $(e).find(".js-submenu");
              t && s.size() && i.size()
                ? s.click(function (t) {
                    $(e).hasClass("hover") ||
                      (t.preventDefault(), $(e).addClass("hover"));
                  })
                : $(e).addClass("hover"),
                headerFixed.setHeightToMainMenu(
                  $(e).closest(".js-categories-menu")
                );
            },
            deactivate: function (e) {
              $(e).removeClass("hover");
            },
            enter: function (t) {
              if (!e.find(".js-submenu").filter(":visible").size()) {
                var s = $("body").hasClass("touch"),
                  i = $(t).find("a").first(),
                  a = $(t).find(".js-submenu");
                s && i.size() && a.size()
                  ? i.click(function (e) {
                      $(t).hasClass("hover") || e.preventDefault();
                    })
                  : $(t).addClass("hover");
              }
            },
            exitMenu: function () {
              $(".js-categories-sub-item").removeClass("hover");
            },
          });
        });
    },
  },
  categoriesHorizontalMenu = {
    init: function () {
      if (!$(".js-categories-h-outer").length) return !1;
      this.openSubcategories(),
        this.hideBg(),
        this.retinaImagesFirstlvl($(".js-categories-h-items"));
    },
    openSubcategories: function () {
      var e = this,
        t = $(".js-categories-h-items"),
        s = t.data("lazy"),
        i = t.data("retina");
      t.find(".js-h-categories-item a").click(function (e) {
        if ($("body").hasClass("touch")) {
          var t = $(this)
            .closest(".js-h-categories-item")
            .find(".js-categories-sub")
            .first();
          t.length && t.is(":hidden") && e.preventDefault();
        }
      }),
        t.find(".js-h-categories-item").hover(
          function () {
            $(this)
              .find(".js-categories-sub")
              .first()
              .stop(!0)
              .delay(150)
              .fadeIn(1, function () {
                $(this).closest(".js-h-categories-item").addClass("hover"),
                  s
                    ? (categoriesImages.lazyImages(
                        $(this).find(".js-subcat-image"),
                        i
                      ),
                      categoriesImages.lazyImages(
                        $(this).find(".js-brand-image"),
                        !1
                      ))
                    : i &&
                      categoriesImages.retinaImages(
                        $(this).find(".js-subcat-image")
                      ),
                  e.positionSubmenu(
                    $(this).closest(".js-categories-h-items"),
                    $(this)
                  ),
                  e.showBg();
              });
          },
          function () {
            $(this)
              .find(".js-categories-sub")
              .first()
              .stop(!0)
              .delay(150)
              .fadeOut(1, function () {
                $(this).closest(".js-h-categories-item").removeClass("hover");
              });
          }
        ),
        t.find(".js-subcategories-item a").click(function (e) {
          if ($("body").hasClass("touch")) {
            var t = $(this)
              .closest(".js-subcategories-item")
              .find(".js-categories-sub")
              .first();
            t.length && t.is(":hidden") && e.preventDefault();
          }
        }),
        t.find(".js-subcategories-item").hover(
          function () {
            $(this)
              .find(".js-categories-sub")
              .first()
              .stop(!0)
              .delay(150)
              .fadeIn(1, function () {
                $(this).closest(".js-h-categories-item").addClass("hover"),
                  e.positionSubmenu(
                    $(this).closest(".js-categories-h-items"),
                    $(this)
                  );
              });
          },
          function () {
            $(this)
              .find(".js-categories-sub")
              .first()
              .stop(!0)
              .delay(150)
              .fadeOut(1, function () {
                $(this).removeAttr("style");
              });
          }
        );
    },
    positionSubmenu: function (e, t) {
      if (t.length) {
        var s = e.offset().left,
          i = parseFloat(s) + parseFloat(e.outerWidth(!0));
        t.removeClass("to-left").removeClass("to-right").removeAttr("style"),
          t.css("visibility", "hidden").css("display", "block");
        var a = t.offset().left,
          o = parseFloat(t.outerWidth(!0));
        i < parseFloat(a) + o && t.addClass("to-left"),
          t.removeAttr("style"),
          t.css("display", "block");
      }
    },
    showBg: function () {
      $(".js-header-top, .js-categories-h-outer").css("z-index", 11),
        $(".js-header").css("z-index", 12),
        $(".js-categories-menu-bg").stop(!0).delay(150).fadeIn(1);
    },
    hideBg: function () {
      $(".js-categories-h-outer").on("mouseleave", function () {
        $(".js-categories-menu-bg")
          .stop(!0)
          .delay(150)
          .fadeOut(1, function () {
            $(".js-header, .js-header-top, .js-categories-h-outer").removeAttr(
              "style"
            );
          });
      });
    },
    retinaImagesFirstlvl: function (e) {
      if (e.length) {
        var t = e.data("lazy"),
          s = e.data("retina");
        t
          ? categoriesImages.lazyImages(e.find(".js-categories-h-image"), s)
          : s &&
            categoriesImages.retinaImages(e.find(".js-categories-h-image"));
      }
    },
  },
  categoriesVerticalMenuUnfolding = {
    init: function () {
      if (!$(".js-sidebar-cats-tree").length) return !1;
      this.sidebar(), this.categoriesImages();
    },
    sidebar: function () {
      this.sidebarInit(),
        $(".js-subcat-open").click(function () {
          var e = $(this),
            t = $(e.parent().find(".js-subcat")[0]);
          t.is(":visible")
            ? (t.slideUp(), e.removeClass("selected"))
            : (t.slideDown(), e.addClass("selected"));
        });
    },
    sidebarInit: function () {
      var e = $(".js-sidebar-cats-tree")
        .find(".selected")
        .parents(".js-subcat");
      e.removeClass("hide"),
        e.each(function () {
          $(this).parent().find(".js-subcat-open").first().addClass("selected");
        });
    },
    categoriesImages: function () {
      var e = $(".js-sidebar-cats-tree"),
        t = e.data("lazy"),
        s = e.data("retina");
      t
        ? categoriesImages.lazyImages(e.find(".js-sidebar-cat-image"), s)
        : s && categoriesImages.retinaImages(e.find(".js-sidebar-cat-image"));
    },
  },
  pagesTree = {
    init: function () {
      var e = $(".js-sidebar-pages-tree");
      if (!e.length) return !1;
      this.open();
      var t = e.find(".selected").parents(".js-subpages");
      t.removeClass("hide"),
        t.each(function () {
          $(this)
            .parent()
            .find(".js-subpages-open")
            .first()
            .addClass("selected");
        });
    },
    open: function () {
      $(".js-subpages-open").click(function () {
        var e = $(this),
          t = $(e.parent().find(".js-subpages")[0]);
        t.is(":visible")
          ? (t.slideUp(), e.removeClass("selected"))
          : (t.slideDown(), e.addClass("selected"));
      });
    },
  },
  dropDownList = {
    init: function () {
      this.open(
        ".js-drop-down-toggle",
        ".js-drop-down-list",
        ".js-drop-down-items"
      );
    },
    open: function (e, t, s) {
      $("body").on("click", e, function () {
        var e = $(this).closest(t),
          i = e.find(s);
        e.siblings().removeClass("open"),
          e.siblings().find(t).removeClass("open"),
          i.is(":visible") ? e.removeClass("open") : e.addClass("open");
      }),
        $("body").on("click", e + " a", function (e) {
          e.preventDefault();
        }),
        $(document).click(function (e) {
          $(e.target).closest(t).length ||
            $(t).each(function () {
              $(this).removeClass("open");
            });
        });
    },
  },
  MatchMedia = function (e) {
    var t = window.matchMedia;
    return !(!("function" == typeof t) || !e) && t(e).matches;
  },
  subscribeForm = {
    init: function () {
      this.submitForm(), this.openCaptcha();
    },
    openCaptcha: function () {
      var e = $(".js-subscribe-input");
      e.on("focus", function () {
        var t = e.closest("form").find(".js-subscribe-image");
        t.find(".wa-invisible-recaptcha").length || t.addClass("show");
      }),
        $(document).click(function (e) {
          $(e.target).closest("#mailer-subscribe-form").length ||
            $("#mailer-subscribe-form .js-subscribe-image").removeClass("show");
        });
    },
    submitForm: function () {
      $("#mailer-subscribe-form input.charset").val(
        document.charset || document.characterSet
      ),
        $("#mailer-subscribe-form").submit(function () {
          var e = $(this),
            t = e.find(".js-subscribe-input"),
            s = e.find(".js-submit-form"),
            i = e.find('input[name="agree"]'),
            a = e.find(".js-subscribe-load"),
            o = !1,
            n = e.find(".js-subscribe-image"),
            r = n.find(".wa-captcha-input"),
            c = $("#mailer-subscribe-error");
          if (
            (t.removeClass("error"),
            i.closest(".js-subscribe-agree").removeClass("error"),
            i.length > 0 &&
              !i.is(":checked") &&
              (i.closest(".js-subscribe-agree").addClass("error"), (o = !0)),
            t.val() && validateEmail(t.val())
              ? n.length || t.attr("name", "email")
              : (t.addClass("error"), (o = !0)),
            !1 === o)
          ) {
            s.hide(),
              a.show(),
              c.hide(),
              c.find(".js-text-error").remove(),
              r.removeClass("error");
            var d = e.attr("action");
            "http" === d.substr(0, 4) &&
              (d = d.replace("http:", "").replace("https:", "")),
              $.post(d, e.serialize(), function (e) {
                if ((n.length || t.attr("name", "username"), "ok" == e.status))
                  $(".js-subscribe-inputs").hide(),
                    e.data.html &&
                      $("#mailer-subscribe-thankyou").html(e.data.html),
                    $("#mailer-subscribe-thankyou").show(),
                    c.hide(),
                    c.find(".js-text-error").remove(),
                    r.removeClass("error");
                else {
                  if (e.errors) {
                    var i = Object.entries(e.errors).toString();
                    -1 !== (i = i.replace(",", " ")).indexOf("captcha") &&
                      r.length &&
                      (r.addClass("error"), n.addClass("show")),
                      c.append(
                        "<span class='js-text-error'>: " + i + "</span>"
                      );
                  }
                  c.show();
                }
                s.show(), a.hide();
              });
          } else n.length || t.attr("name", "username");
          return !1;
        });
    },
  },
  moreText = {
    init: function () {
      this.addLink(), this.open();
    },
    addLink: function () {
      $(".js-moretext-outer").each(function () {
        var e = $(this).find(".js-moretext-wrap"),
          t = e.data("max-height"),
          s = $(this).find(".js-moretext");
        if (
          ($(this).find(".js-moretext-more-wrap").remove(),
          e.removeClass("close"),
          e.length && t && e.css("max-height", t + "px"),
          e.length && s.length && e.outerHeight() < s.outerHeight())
        ) {
          var i = e.data("text-more");
          e.addClass("close"),
            e.after(
              "<div class='js-moretext-more-wrap linkmore-wrap'><span class='js-moretext-more bs-color read-more'>" +
                i +
                "</span></div>"
            );
        } else e.removeAttr("style");
      });
    },
    open: function () {
      $("body").on("click", ".js-moretext-more", function () {
        var e = $(this),
          t = e.closest(".js-moretext-outer").find(".js-moretext-wrap"),
          s = e.closest(".js-moretext-outer").find(".js-moretext"),
          i = t.data("max-height"),
          a = t.data("text-more"),
          o = t.data("text-hide");
        e.hasClass("open")
          ? (e.removeClass("open"),
            t.addClass("close"),
            e.text(a),
            t.animate({ maxHeight: i }, 500))
          : (t.animate({ maxHeight: s.outerHeight() + "px" }, 500),
            e.addClass("open"),
            t.removeClass("close"),
            e.text(o));
      });
    },
  },
  modalForm = {
    init: function () {
      this.loadContentForm("a.js-form-popup"),
        this.loadContentForm('.js-ajax-form a[href="/login/"]'),
        this.loadContentForm('.js-ajax-form a[href="/forgotpassword/"]'),
        this.submitForm();
    },
    loadContentForm: function (e) {
      var t = this;
      $("body").on("click", e, function (e) {
        e.preventDefault();
        var s = $(this).attr("href") + "?ajax=1";
        $.magnificPopup.close(),
          $("body").prepend(
            "<div class='js-loading-bg mfp-bg mfp-ready'><div class='mfp-preloader'></div></div>"
          ),
          $.get(s, function (e) {
            $(".js-loading-bg").remove();
            var i = $(e).find(".js-ajax-form");
            t.openModal(i, s);
          });
      });
    },
    openModal: function (e, t) {
      $(e).find("form").attr("action", t),
        $(e)
          .find('input[type="checkbox"], input[type="radio"], .js-select')
          .styler(),
        $.magnificPopup.open(
          {
            items: {
              src: "<div class='popup-content'>" + e.outerHTML() + "</div>",
            },
            type: "inline",
          },
          0
        );
    },
    submitForm: function () {
      var e = this;
      $("body").on("submit", ".js-ajax-form form", function (t) {
        var s = $(this).closest(".js-ajax-form");
        if (
          !s.find(".wa-login-form-wrapper").length &&
          !s.find(".wa-forgotpassword-form-wrapper").length
        ) {
          t.preventDefault();
          var i = $(this).attr("action"),
            a = $(this).serialize(),
            o = $(this).find('input[type="submit"]');
          o.hide(),
            o.after($('<i class="icon16 loading js-loading"></i>')),
            $.post(i, a, function (t) {
              var s = $(t).find(".js-ajax-form");
              s.length > 0
                ? (e.openModal(s, i),
                  o.show(),
                  $(this).find(".js-loading").remove())
                : window.location.reload();
            });
        }
      });
    },
  },
  cartPreview = {
    init: function () {
      if (!$(".js-cart-popup").length) return !1;
      $(".js-cart-preview").each(function () {
        var e = $(this),
          t = e.find(".js-cart-popup");
        t.length &&
          e.hover(function () {
            var s = e.data("url");
            t.html(""),
              $.get(s + "?ajax=1", function (e) {
                $(e).find(".js-cart-ajax").length && t.html(e);
              });
          });
      });
    },
  },
  productListUser = {
    init: function () {
      this.compare(), this.favorites(), this.clear(), this.viewed();
    },
    viewed: function () {
      var e = $("#product-cart");
      e.length && e.data("id") && this.add("viewed_list", e.data("id"), 32);
    },
    compare: function () {
      var e;
      e = $(".js-bar-fixed-bottom .js-preview-favorite").length
        ? $(".js-bar-fixed-bottom .js-preview-compare")
        : $(".js-bar-fixed-right .js-preview-compare").length
        ? $(".js-bar-fixed-right .js-preview-compare")
        : $(".js-header-fixed .js-preview-compare").length
        ? $(".js-header-fixed .js-preview-compare")
        : $(".js-preview-compare").first();
      var t = productListUser.get("shop_compare"),
        s = "/compare/";
      t && "null" != t && null !== t && (s = "/compare/" + t + "/");
      var i =
        "<a href='" + s + "'>" + globalThemeSettings.msgAddToCompare + "</a>";
      this.list(
        "shop_compare",
        $(".js-compare-count"),
        e,
        i,
        ".js-add-to-compare",
        compareProduct.add,
        null
      );
    },
    favorites: function () {
      var e;
      (e = $(".js-bar-fixed-bottom .js-preview-favorite").length
        ? $(".js-bar-fixed-bottom .js-preview-favorite")
        : $(".js-bar-fixed-right .js-preview-favorite").length
        ? $(".js-bar-fixed-right .js-preview-favorite")
        : $(".js-header-fixed .js-preview-favorite").length
        ? $(".js-header-fixed .js-preview-favorite")
        : $(".js-preview-favorite").first()),
        this.list(
          "favorites_list",
          $(".js-favorite-count"),
          e,
          globalThemeSettings.msgAddToFavorite,
          ".js-add-to-favorites",
          null,
          32
        );
    },
    list: function (e, t, s, i, a, o, n) {
      var r = this;
      $("body").on("click", a, function (c) {
        c.preventDefault();
        var d = $(this),
          l = 0,
          u = $(this).data("product"),
          f = !d.hasClass("selected");
        $(a + "[data-product='" + u + "']").toggleClass("selected"),
          f
            ? ((l = r.add(e, u, n)), r.showAddedMsg(s, i))
            : (l = r.remove(e, u)),
          t.html(l),
          l > 0 ? t.removeClass("empty") : t.addClass("empty"),
          o && o({ that: d, productId: u, isAdded: f });
      });
    },
    add: function (e, t, s) {
      var i = $.cookie(e),
        a = [];
      if (i && "null" != i && "0" != i) {
        a = (i = (i = i.replace(",null", "")).replace(",0", "")).split(",");
        var o = $.inArray(t + "", a);
        -1 != o && a.splice(o, 1);
      }
      return a.unshift(t), s && a.splice(s), this.save(a, e), a.length;
    },
    remove: function (e, t) {
      var s = $.cookie(e);
      s = s ? s.split(",") : [];
      var i = $.inArray(t + "", s);
      return -1 != i && s.splice(i, 1), this.save(s, e), s.length;
    },
    get: function (e) {
      return $.cookie(e);
    },
    save: function (e, t) {
      if (e.length > 0)
        for (var s = 0; s < e.length; s++) parseInt(e[s]) || e.splice(s, 1);
      e.length > 0
        ? $.cookie(t, e.join(","), { expires: 90, path: "/" })
        : $.cookie(t, null, { path: "/" });
    },
    clear: function () {
      var e = this;
      $(".js-clear-user-list").on("click", function () {
        var t = $(this).data("list") + "_list";
        e.save([], t), location.reload();
      });
    },
    showAddedMsg: function (e, t) {
      e.is(":visible")
        ? ($(
            ".js-preview-favorite, .js-preview-compare, .js-cart-preview"
          ).removeClass("active"),
          e.addClass("active"),
          setTimeout(function () {
            e.removeClass("active");
          }, 3e3))
        : messages.notifySuccess(t, 0);
    },
  },
  compareProduct = {
    addToSidebar: function (e) {
      var t = e.that,
        s = e.productId,
        i = e.isAdded,
        a = $(".js-compare-products-full"),
        o = $(".js-compare-products-empty"),
        n = $(".js-compare-products-list"),
        r = $(".js-compare-template");
      if (i) {
        if (n.length && t.data("name") && r) {
          var c = r.clone();
          c.removeClass("js-compare-template").addClass("js-compare-product"),
            c.attr("data-product", s),
            c
              .find(".js-add-to-compare")
              .attr("data-product", s)
              .addClass("active"),
            c.find(".js-compare-name").text(t.data("name")),
            c.find(".js-compare-name").attr("href", t.data("url")),
            c.find(".js-compare-img").attr("href", t.data("url")),
            t.data("img") &&
              c
                .find(".js-compare-img")
                .html("<img src='" + t.data("img") + "'>"),
            r.after(c),
            c.show();
        }
      } else $('.js-compare-product[data-product="' + s + '"]').remove();
      $(".js-compare-product").length
        ? (o.hide(), a.show())
        : (o.show(), a.hide());
    },
    add: function (e) {
      var t = $(".js-link-compare"),
        s = productListUser.get("shop_compare"),
        i = "/compare/";
      s &&
        "null" != s &&
        null !== s &&
        (i = t.attr("href").replace(/compare\/.*$/, "compare/" + s + "/")),
        t.attr("href", i),
        compareProduct.addToSidebar(e);
    },
  },
  cart = {
    init: function () {
      this.addToCart(),
        this.quantityCart(),
        this.cartDialog(),
        topMessageAddToCart.close();
    },
    cartDialog: function () {
      $("body").on("click", ".js-product-card-dialog", function () {
        var e = $(this),
          t = e.closest("[data-reload-cart='true']").length,
          s = e.closest(".js-add-to-cart").find("input[name=quantity]"),
          i = null,
          a = $(this).data("href"),
          o = -1 !== a.indexOf("select-options");
        s.length && (i = parseInt(s.val())) && (a = a + "&quantity=" + i),
          $.magnificPopup.open(
            {
              items: { src: a },
              type: "ajax",
              callbacks: {
                parseAjax: function (e) {
                  if ($(e.data).find(".js-product-cart-quick-view").length)
                    (e.data = $(e.data).find(".js-add-to-cart")),
                      o &&
                        ($(e.data).addClass("popup-content--dialog-options"),
                        $(e.data)
                          .find(".product-card__right")
                          .removeAttr("class"),
                        $(e.data)
                          .find(".product-card__popup")
                          .removeAttr("class"));
                  else if (
                    "string" == typeof e.data ||
                    e.data instanceof String
                  ) {
                    var t = "<div>" + e.data + "</div>";
                    e.data = $(t).find(".js-add-to-cart");
                  } else e.data = $(e.data);
                },
                ajaxContentAdded: function () {
                  this.content
                    .find(
                      'input[type="checkbox"]:not(.js-checkbox-styler-input):not(.js-none-styler):not(.shop-sk-callback__checkbox), input[type="radio"]:not(.js-radio-styler-input):not(.buy1step-auth__variant):not(.js-none-styler), .js-select'
                    )
                    .styler(),
                    t && this.content.attr("data-reload-cart", !0);
                  var e = this.content.find("#product-cart");
                  e.length &&
                    e.data("id") &&
                    productListUser.viewed(e.data("id")),
                    void 0 !== $.autobadgeFrontend &&
                      $.autobadgeFrontend.reinit(),
                    is_touch_device() ||
                      ProductCardGallery.productImageZoom(
                        this.content.find(".js-product-gallery-main-el").first()
                      ),
                    ProductCardGallery.swipeLargePhoto(
                      this.content.find(".js-product-gallery-main")
                    ),
                    ProductCardGallery.productPreviewsCarousel(
                      this.content.find(".js-gallery-previews-carousel")
                    );
                },
                open: function () {
                  $.magnificPopup.instance._onFocusIn = function (e) {
                    if ($(e.target).closest("#storequickorder")) return !0;
                    $.magnificPopup.proto._onFocusIn.call(this, e);
                  };
                },
              },
            },
            0
          );
      });
    },
    addToCart: function () {
      var e = this,
        t = ($(".js-add-to-cart"), $(".js-cart-preview")),
        s = $(".js-cart-preview-count"),
        i = $(".js-cart-preview-total");
      $("body").on("submit", ".js-add-to-cart", function (a) {
        a.preventDefault();
        var o = $(this),
          n = o.serialize(),
          r = o.serializeObject(),
          c = o.attr("action"),
          d = o.find(".js-submit-form");
        d.addClass("loading"),
          d.removeClass("added"),
          $.post(
            c + "?html=1",
            n,
            function (a) {
              (d.removeClass("loading"),
              globalThemeSettings.show_product_in_basket) &&
                (d.addClass("added"),
                void 0 !== r.product_id &&
                  $('input[name="product_id"][value="' + r.product_id + '"]')
                    .closest(".js-add-to-cart")
                    .find(".js-submit-form, .js-product-card-dialog")
                    .addClass("added"));
              if ("ok" == a.status) {
                i.html(a.data.total),
                  s.html(a.data.count),
                  s.removeClass("empty"),
                  t.removeClass("empty");
                var n = $("#cart-form-dialog");
                n.length > 0 && $.magnificPopup.close(),
                  "popup" == o.data("after-action")
                    ? e.popupAddCart(o)
                    : "top" == o.data("after-action")
                    ? topMessageAddToCart.show(o)
                    : "move" == o.data("after-action")
                    ? (e.animationMoveToCart(o),
                      n.length > 0 && $.magnificPopup.close(),
                      e.showMsg())
                    : "fixed" == o.data("after-action")
                    ? fixedCart.show()
                    : e.showMsg(),
                  sidebarCart.add(o),
                  o.closest("[data-reload-cart='true']").length &&
                    location.reload();
              } else
                "fail" == a.status &&
                  (d.removeClass("loading"), alert(a.errors));
            },
            "json"
          );
      });
    },
    animationMoveToCart: function (e) {
      var t = e.closest(".js-product").find(".js-product-gallery-main");
      if ((0 == t.length && (t = e.closest(".js-product-item")), t.length)) {
        var s = $("<div></div>").append(t.html()),
          i = $('.js-cart-preview[data-type="fixed"]');
        (i.length && i.is(":visible")) ||
          (i = $('.js-cart-preview[data-type="header"]')),
          s
            .css({
              "z-index": 100,
              top: t.offset().top,
              left: t.offset().left,
              width: t.width() + "px",
              height: t.height() + "px",
              position: "absolute",
              overflow: "hidden",
              background: "#FFF",
            })
            .insertAfter("#main-content")
            .animate(
              {
                top: i.offset().top,
                left: i.offset().left,
                width: 0,
                height: 0,
                opacity: 0.7,
              },
              650,
              function () {
                s.remove();
              }
            );
      }
    },
    popupAddCart: function (e) {
      var t = $("#popup-addcart"),
        s = e.data("name"),
        i = e.data("price"),
        a = e.data("image"),
        o = 1,
        n = e.find("input[name='quantity']");
      n.length && (o = n.val()),
        t.find(".js-popup-addcart-name").html(s),
        t.find(".js-popup-addcart-price").html(i),
        t.find(".js-popup-addcart-count").html("(x" + o + ")"),
        a
          ? t.find(".js-popup-addcart-image").html("<img src='" + a + "' />")
          : t.find(".js-popup-addcart-image").html(""),
        $.magnificPopup.open({
          items: { src: t, type: "inline" },
          callbacks: {
            afterClose: function () {
              t.find(".js-popup-addcart-name").html(""),
                t.find(".js-popup-addcart-price").html(""),
                t.find(".js-popup-addcart-count").html(""),
                t.find(".js-popup-addcart-image").html("");
            },
          },
        }),
        $(".js-close-popup-addcart").on("click", function () {
          $.magnificPopup.close();
        });
    },
    quantityCart: function () {
      $("body").on("click", ".js-qty-action", function () {
        var e = $(this),
          t = e.closest(".js-qty"),
          s = e.data("type"),
          i = t.find("input"),
          a = parseInt(i.val());
        "-" == s ? (a > 1 ? a-- : (a = 1)) : a ? a++ : (a = 1),
          i.val(a),
          i.change();
      });
    },
    showMsg: function () {
      var e;
      (e = $(".js-bar-fixed-bottom .js-cart-preview").length
        ? $(".js-bar-fixed-bottom .js-cart-preview")
        : $(".js-bar-fixed-right .js-cart-preview").length
        ? $(".js-bar-fixed-right .js-cart-preview")
        : $(".js-header-fixed .js-cart-preview").length &&
          $(".js-header-fixed .js-cart-preview").is(":visible")
        ? $(".js-header-fixed .js-cart-preview")
        : $(".js-header .js-cart-preview").length
        ? $(".js-header .js-cart-preview")
        : $(".js-cart-preview").first()),
        $(
          ".js-preview-compare, .js-preview-favorite, .js-cart-preview"
        ).removeClass("active"),
        e.addClass("active"),
        setTimeout(function () {
          e.removeClass("active");
        }, 2e3);
    },
  },
  topMessageAddToCart = {
    init: function () {
      this.close();
    },
    show: function (e) {
      var t = this,
        s = $("#top-msg-addcart"),
        i = e.data("name"),
        a = e.data("price"),
        o = e.data("image"),
        n = 1,
        r = e.find("input[name='quantity']");
      r.length && (n = r.val()),
        s.find(".js-top-msg-addcart-name").html(truncateText(i, 40)),
        s.find(".js-top-msg-addcart-price").html(a),
        s.find(".js-top-msg-addcart-count").html("(x" + n + ")"),
        o
          ? s.find(".js-top-msg-addcart-image").html("<img src='" + o + "' />")
          : s.find(".js-top-msg-addcart-image").html(""),
        s.slideDown(100),
        setTimeout(function () {
          t.hide();
        }, 5e3);
    },
    hide: function () {
      var e = $("#top-msg-addcart");
      e.length &&
        (e.slideUp(100),
        e.find(".js-top-msg-addcart-name").html(""),
        e.find(".js-top-msg-addcart-price").html(""),
        e.find(".js-top-msg-addcart-count").html(""),
        e.find(".js-top-msg-addcart-image").html(""));
    },
    close: function () {
      var e = this;
      $(".js-top-msg-addcart-close").on("click", function () {
        e.hide();
      });
    },
  },
  fixedCart = {
    init: function () {
      this.close();
    },
    show: function () {
      var e = $(".js-fixed-cart-outer");
      if (e.length) {
        var t = e.data("cart-url") + "?fixed=1";
        e.html(""),
          $.get(t, function (t) {
            $("<div>" + t + "</div>").find(".js-fixed-cart").length &&
              e.html(t);
          });
      }
    },
    close: function () {
      $("body").on("click", ".js-cart-fixed-close", function () {
        $(".js-fixed-cart-outer").html("");
      });
    },
  },
  sidebarCart = {
    add: function (e) {
      var t = $(".js-sidebar-cart"),
        s = e.find('input[name="product_id"]').val(),
        i = parseInt(e.find('input[name="quantity"]').val());
      if ((i || (i = 1), t.length)) {
        var a = t.find(".js-sidebar-cart-item[data-product-id=" + s + "]");
        if (a.length) {
          var o = a.find(".js-sidebar-cart-quantity"),
            n = parseInt(o.text()) + i;
          o.text(n);
        } else {
          var r = t.find(".js-sidebar-cart-template").clone(),
            c = e.data("name"),
            d = e.data("link"),
            l = e.data("price"),
            u = e.data("image");
          r
            .find(".js-sidebar-cart-template-img")
            .html('<a href="' + d + '"><img src="' + u + '"></a>'),
            r
              .find(".js-sidebar-cart-template-link")
              .html('<a href="' + d + '">' + c + "</a>"),
            r.find(".js-sidebar-cart-price").html(l),
            r.find(".js-sidebar-cart-quantity").html(i),
            r.attr("data-product-id", s),
            r
              .removeClass("js-sidebar-cart-template")
              .removeClass("display-none")
              .addClass("js-sidebar-cart-item"),
            $(".js-sidebar-cart-items").append(r),
            t.removeClass("hide");
        }
      }
    },
    clearItem: function (e, t) {
      var s = $(".js-sidebar-cart");
      if (s.length && (e || t)) {
        var i = $(".js-sidebar-cart-item[data-data-id=" + t + "]");
        0 == i.length &&
          (i = $(".js-sidebar-cart-item[data-product-id=" + e + "]")),
          i.length &&
            (i.remove(),
            0 == $(".js-sidebar-cart-item").length && s.addClass("hide"));
      }
    },
  },
  sidebarMobileMenu = {
    init: function () {
      this.openWrap(), this.openSubmenu();
    },
    openWrap: function () {
      $(".js-m-sidebar-menu-open").on("click", function () {
        $(this).closest(".js-m-sidebar-menu").toggleClass("open");
      });
    },
    openSubmenu: function () {
      $(".js-m-sidebar-submenu-open").on("click", function () {
        $(this).parent().toggleClass("open");
      });
    },
  },
  sidebarCarousel = {
    init: function () {
      var e = this;
      $(".js-carousel-products-sidebar").each(function () {
        e.carousel($(this));
      });
    },
    carousel: function (e) {
      var t = e.find(".js-carousel-items"),
        s = parseInt(t.data("count-visible")),
        i = t.data("image-lazy"),
        a = t.data("retina");
      t.jCarouselLite({
        btnNext: e.find(".js-carousel-next"),
        btnPrev: e.find(".js-carousel-prev"),
        vertical: !0,
        visible: s || 3,
        afterEnd: function (e) {
          if (i) {
            var t = e.find(".js-product-preview-img");
            t.length &&
              t.lazy({
                onFinishedAll: function (e) {
                  a && $(e).retina();
                },
              });
          }
        },
      });
    },
  },
  openMap = {
    init: function () {
      $(".js-popup-map").on("click", function () {
        $.magnificPopup.open(
          {
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !1,
            fixedContentPos: !1,
            items: { src: $(this).data("href"), type: "iframe" },
          },
          0
        );
      });
    },
  },
  switchVersionSite = {
    init: function () {
      this.switchVersion(), this.removeLink();
    },
    switchVersion: function () {
      $(".js-switch-version-link").on("click", function (e) {
        e.preventDefault(),
          $.cookie("is_desktop_for_mobile")
            ? $.cookie("is_desktop_for_mobile", "", { path: "/", expires: 5 })
            : $.cookie("is_desktop_for_mobile", 1, { path: "/", expires: 5 }),
          location.reload();
      });
    },
    removeLink: function () {
      $(".js-switch-version-remove").on("click", function (e) {
        e.preventDefault(),
          $.cookie("is_hide_link_version_site", 1, { path: "/", expires: 1 }),
          $(".js-switch-version").remove();
      });
    },
  },
  demoTest = {
    init: function () {
      var e = this;
      if (!$("#test-settings").length) return !1;
      $("#open-test-settings").on("click", function (e) {
        e.preventDefault(),
          $.magnificPopup.open({
            items: { src: "#test-settings" },
            type: "inline",
          });
      }),
        $("#open-test-settings").one("click", function (t) {
          t.preventDefault(), e.settings();
        });
    },
    settings: function () {
      var e = this,
        t = [
          "color_scheme",
          "button_type",
          "base_bg_color",
          "base_bg_font_color",
          "base_font_color",
          "ac_bg_color",
          "ac_bg_color",
          "ac_bg_color_font",
          "ac_font_color",
          "font",
          "header_fixed_desktop",
          "bar_fixed_bottom_desktop",
          "bar_fixed_right_desktop",
          "is_horizontal_menu",
          "horizontal_main_menu_brand_submenu_type",
          "vertical_main_menu_brand_submenu_type",
          "homepage_sidebar_left",
          "homepage_sidebar_right",
          "homepage_slider_over_content",
          "homepage_main_menu_left_of_slider",
          "categories_mainpage_design",
          "vertical_main_menu_brand_submenu_type",
          "horizontal_main_menu_brand_submenu_type",
          "product_gallery_previews",
          "product_card_type_main_content_desktop",
          "product_card_type_main_content_mobile",
          "product_tile_display_fastorder",
          "show_product_discount",
          "show_product_badge_saving",
          "cart_add_action_desktop",
        ];
      $("#test-settings .js-color").attr("type", "color"),
        $("#test-settings .js-color").on("change", function () {
          $(this).data("empty", 0);
        }),
        $("#test-settings .js-color-clear").on("click", function () {
          $("#" + $(this).data("id"))
            .val("#ffffff")
            .data("empty", 1);
        }),
        $("#settings-form").submit(function (s) {
          s.preventDefault();
          var i = $(this).serializeArray();
          e.saveSettings(i, t);
        }),
        $(".js-select-setting-color").on("click", function () {
          var e = $(this),
            t = e.data("value");
          $(".js-setting-color").val(t),
            $(".js-select-setting-color").removeClass("selected"),
            e.addClass("selected");
        }),
        $(".js-clear-test-settings").on("click", function () {
          e.clearTestSettings(t);
        });
    },
    saveSettings: function (e, t) {
      t.forEach(function (t) {
        var s = e.find(function (e) {
            return e.name == t;
          }),
          i = $("#settings-form").find('input[name="' + t + '"]');
        "color" == i.attr("type") && 1 == i.data("empty") && (s.value = null);
        var a = new Date();
        a.setTime(a.getTime() + 18e5),
          $.cookie(t, s.value, { expires: a, path: "/" }),
          window.location.reload();
      });
    },
    clearTestSettings: function (e) {
      e.forEach(function (e) {
        $.removeCookie(e, { path: "/" });
      }),
        window.location.reload();
    },
  };
if (!window.SocialWidgets)
  var SocialWidgets = (function (e) {
    "use strict";
    var t = function (e) {
      this.init(e);
    };
    return (
      (t.prototype = {
        _params: {
          container: ".js-social-widgets",
          timeAutoSwitch: 5e3,
          autoSwitch: !1,
        },
        getParams: function () {
          return this._params;
        },
        getParam: function (e) {
          return this._params[e];
        },
        setParam: function (e, t) {
          this._params[e] = t;
        },
        init: function (t) {
          var s = this;
          return (
            (s.autoTimer = null),
            (s._params = e.extend({}, s._params, t)),
            (s._params.preload = "switch"),
            s.initElements(),
            "undefined" != typeof vivaSocialWidgetsData &&
              ((s.data = vivaSocialWidgetsData),
              (s.dataInst = vivaSocialWidgetsInst),
              !!s.elements.container.size() &&
                ((s.active = Object.keys(s.elements.contentsArray)[0]),
                (s.autoSwitch = s.elements.container.data("auto")),
                parseInt(s.elements.container.data("time")) &&
                  (s._params.timeAutoSwitch = parseInt(
                    s.elements.container.data("time")
                  )),
                s.elements.container.data("preload") &&
                  (s._params.preload = s.elements.container.data("preload")),
                s.initTabs(),
                void setTimeout(function () {
                  s.initAuto();
                }, 3e3)))
          );
        },
        initElements: function () {
          var t = {};
          if (
            ((this.elements = t),
            (t.container = e(this._params.container)),
            !t.container.size())
          )
            return !1;
          (t.tabs = t.container.find(".js-social-widgets-tab")),
            (t.tabsArray = {}),
            t.tabs.each(function () {
              t.tabsArray[e(this).attr("data-tab")] = e(this);
            }),
            (t.contents = t.container.find(".js-social-widgets-content")),
            (t.contentsArray = {}),
            t.contents.each(function () {
              t.contentsArray[e(this).attr("data-content")] = e(this);
            }),
            (this.elements = t);
        },
        initTabs: function () {
          var t = this,
            s = t.elements,
            i = s.container;
          for (var a in (i.hover(
            function () {
              t.pauseAuto();
            },
            function () {
              t.initAuto();
            }
          ),
          t.data))
            if (
              void 0 !== s.contentsArray[a] &&
              ("instagram" == a
                ? t.runInstagram()
                : s.contentsArray[a].html(t.data[a]),
              "switch" == t._params.preload)
            )
              break;
          i.find("[data-tab]").on("click", function () {
            var i = e(this),
              a = s.tabs.filter("._active").attr("data-tab"),
              o = i.attr("data-tab");
            a != o && (t.stopAuto(), t.switch(o));
          });
        },
        switch: function (e) {
          var t = this.elements,
            s = t.tabsArray[e],
            i = t.contentsArray[e];
          (this.active = e),
            t.tabs.removeClass("_active"),
            s.addClass("_active"),
            t.contents.removeClass("_show"),
            i.html() ||
              ("instagram" == e ? this.runInstagram() : i.append(this.data[e])),
            i.addClass("_show");
        },
        initAuto: function () {
          var e = this,
            t = e.elements,
            s = e.getParam("timeAutoSwitch");
          if (!e.autoSwitch) return !1;
          e.autoTimer = setInterval(function () {
            var s = e.active,
              i = t.tabsArray[s].next(".js-social-widgets-tab");
            i.size() || (i = t.tabs.first());
            var a = i.attr("data-tab");
            (e.active = a), e.switch(a);
          }, s);
        },
        pauseAuto: function () {
          clearInterval(this.autoTimer);
        },
        stopAuto: function () {
          clearInterval(this.autoTimer), (this.autoSwitch = !1);
        },
        runInstagram: function () {
          (e("#social-widgets-content-instagram").html(
            "<div id='list-instagram' class='list-instagram'></div>"
          ),
          "undefined" != typeof Instafeed && this.dataInst) &&
            new Instafeed({
              get: "user",
              userId: this.dataInst.userId,
              target: "list-instagram",
              clientId: this.dataInst.clientId,
              accessToken: this.dataInst.accessToken,
              limit: this.dataInst.limit,
              template:
                '<div class="list-instagram__item"><a class="list-instagram__link" href="{{link}}" target="_blank"><img class="list-instagram__img" src="{{image}}" alt="{{caption}}" /></a></div>',
            }).run();
        },
      }),
      t
    );
  })(jQuery);
var videoPopup = {
    init: function () {
      $("body").on("click", ".js-video-popup", function (e) {
        e.preventDefault();
        var t = $(this).data("href");
        t &&
          $.magnificPopup.open(
            {
              items: { src: t },
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: !1,
              fixedContentPos: !1,
              iframe: {
                patterns: {
                  youtube_short: {
                    index: "youtu.be/",
                    id: "youtu.be/",
                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                  },
                },
              },
            },
            0
          );
      });
    },
  },
  infoMessage = {
    init: function (e) {
      if (!e.length) return !1;
      this.checkOpen(e) && (this.runOpen(e), this.onClose(e));
    },
    checkOpen: function (e) {
      var t = e.data("id");
      return !$.cookie("info_massage_close_" + t);
    },
    runOpen: function (e) {
      e.show();
    },
    onClose: function (e) {
      var t = e.data("id");
      e.find(".js-info-message-close").on("click", function () {
        e.detach(),
          $.cookie("info_massage_close_" + t, 1, { path: "/", expires: 365 });
      });
    },
  },
  popupAdvert = {
    init: function (e) {
      if (!e.length) return !1;
      (this.isNotTabu() || this.checkOpen(e)) && this.runLogic(e);
    },
    checkOpen: function (e) {
      var t = e.data("id");
      return !$.cookie("popup_advert_close_" + t);
    },
    isNotTabu: function () {
      var e = $.cookie("popup_advert_tabu");
      return void 0 === e && !e;
    },
    runLogic: function (e) {
      var t = parseInt(e.data("time")),
        s = parseInt(e.data("tabu")),
        i = e.data("id");
      t || (t = 10),
        s || (s = 10),
        setTimeout(function () {
          $.magnificPopup.open({
            items: { src: e, type: "inline" },
            callbacks: {
              open: function () {
                $.cookie("popup_advert_tabu", 1, { path: "/", expires: s }),
                  $.cookie("widget_popup_advert_close_" + i, 1, {
                    path: "/",
                    expires: 365,
                  });
              },
            },
          });
        }, 1e3 * t);
    },
  },
  productsPreviewList = {
    init: function () {
      var e = this;
      $(".js-preview-products").each(function () {
        e.images($(this));
      });
    },
    images: function (e) {
      var t = e.data("retina"),
        s = e.data("image-lazy"),
        i = e.find(".js-product-preview-img"),
        a = e.find(".js-image-lazy");
      s
        ? (i.lazy({
            afterLoad: function (e) {
              t && e.retina({ force_original_dimensions: !1 });
            },
          }),
          a.length && a.lazy({ bind: "event" }))
        : t && i.retina({ force_original_dimensions: !1 });
    },
  };
window.productTileGallery ||
  (productTileGallery = (function (e) {
    var t = function (e) {
      this.init(e);
    };
    return (
      (t.prototype = {
        _config: { images: {}, heightFixed: !0 },
        init: function (t) {
          if (e("body").hasClass("touch")) return !1;
          (this.params = e.extend({}, this._config, t)), this.runGallery();
        },
        runGallery: function () {
          var t = this;
          e(".js-tile-gallery").each(function () {
            var s = e(this),
              i = s.find(".js-tile-gallery-block"),
              a = s.find(".js-product-preview-img"),
              o = s.find(".js-tile-gallery-item").length;
            a.data("src") || a.attr("data-src", a.attr("src"));
            var n = a.data("src");
            if (
              !s.size() ||
              !i.size() ||
              !a.size() ||
              o < 2 ||
              s.hasClass("_tile-active")
            )
              return !0;
            s.addClass("_tile-active"),
              i.removeAttr("style"),
              i.removeClass("fixed"),
              s.find(".js-tile-gallery-item").on("mouseenter", function () {
                i.addClass("_tile_hover"),
                  t.params.heightFixed &&
                    (i.css("height", i.height() + "px"),
                    i.css("line-height", i.height() + "px"),
                    i.addClass("fixed"));
                var s = e(this).data("img");
                e("<img>")
                  .attr("src", s)
                  .load(function () {
                    i.hasClass("_tile_hover") && (a.attr("src", s), a.retina());
                  });
              }),
              i.on("mouseleave", function () {
                a.attr("src", n), a.retina(), i.removeClass("_tile_hover");
              });
          });
        },
      }),
      t
    );
  })(jQuery));
var productsCarousel = {
    carouselProductsWrap: $(".js-carousel-products"),
    init: function () {
      if (!this.carouselProductsWrap.length) return !1;
      this.prepareProductListCarousels(),
        this.carouselInteraction(),
        $(window).one("resize", this.carouselsInit);
    },
    carouselsInit: function () {
      productsCarousel.carouselProductsWrap.each(function () {
        var e = $(this);
        productsCarousel.carousel(e);
      });
    },
    prepareProductListCarousels: function () {
      this.carouselProductsWrap.each(function () {
        var e = $(this).find(".js-products-list"),
          t = e.outerWidth(),
          s = $(this).find(".js-product-item"),
          i = s.length;
        if (s.first().outerWidth(!0) * i > t + 20) {
          var a = $(this).find(".js-carousel-direction"),
            o = $(this).data("loop") ? "" : " disabled";
          a.append(
            '<div data-index="prev" class="js-slider-init-interaction owl-prev' +
              o +
              '"><span class="carousel-prev"></span></div>'
          ),
            a.append(
              '<div data-index="next" class="js-slider-init-interaction owl-next"><span class="carousel-next"></span></div>'
            );
        }
        var n = e.offset().left + e.outerWidth();
        s.slice(0, 5).each(function () {
          $(this).offset().left < n &&
            $(this)
              .find(".owl-lazy")
              .Lazy({
                afterLoad: function (e) {
                  e.removeClass("owl-lazy"), $.Retina && e.retina();
                },
              });
        });
      });
    },
    carouselInteraction: function () {
      var e = this;
      $(".js-slider-init-interaction").on("click", function () {
        var t = $(this).closest(".js-carousel-products");
        e.carousel(t, $(this).data("index"));
      }),
        is_touch_device() &&
          $(".js-products-list").each(function () {
            $(this).swipe({
              allowPageScroll: "auto",
              threshold: 20,
              swipe: function (t, s, i, a, o, n) {
                var r = $(this).closest(".js-carousel-products");
                "left" == s
                  ? e.carousel(r, "next")
                  : "right" == s && e.carousel(r, "prev");
              },
            });
          });
    },
    carousel: function (e, t) {
      if (e.hasClass("carousel-init")) return !1;
      var s = e.find(".js-products-list"),
        i = e.find(".js-carousel-direction"),
        a = !1,
        o = contentCols.getCount(s.closest(".js-content-cols")),
        n = e.data("swipe"),
        r = e.data("tile-mini"),
        c = e.data("loop"),
        d = e.find(".js-product-item").length,
        l = parseInt(s.find(".js-product-item").first().outerWidth()) + 11;
      c && s.outerWidth() < d * l && (a = !0);
      var u = {
        0: { items: 1 },
        480: { items: 2 },
        750: { items: 3 },
        1130: { items: 4 },
        1400: { items: 5 },
      };
      2 != o || globalThemeSettings.isMobile
        ? 3 != o ||
          globalThemeSettings.isMobile ||
          (u = { 0: { items: 1 }, 375: { items: 2 }, 750: { items: 3 } })
        : (u = { 0: { items: 2 }, 750: { items: 3 }, 1400: { items: 4 } }),
        r &&
          (u = {
            0: { items: 2 },
            750: { items: 3 },
            1130: { items: 4 },
            1400: { items: 5 },
          }),
        s.addClass("owl-carousel").addClass("owl-theme"),
        s.owlCarousel({
          loop: a,
          margin: 10,
          nav: !0,
          dots: !1,
          mouseDrag: n,
          navText: [
            '<span class="carousel-prev"></span>',
            '<span class="carousel-next"></span>',
          ],
          navElement: "div",
          navContainer: i,
          responsive: u,
          lazyLoad: !0,
          lazyLoadEager: 1,
          onInitialize: function (t) {
            e.find(".js-slider-init-interaction").remove();
          },
          onInitialized: function (t) {
            e.addClass("carousel-init");
          },
          onDragged: function (e) {
            void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit();
          },
          onTranslated: function (e) {
            void 0 !== $.autobadgeFrontend && $.autobadgeFrontend.reinit();
          },
          onLoadedLazy: function (e) {
            var t = $(e.currentTarget);
            t.length &&
              $.Retina &&
              t.find(".owl-item.active .owl-lazy").retina();
          },
        }),
        t &&
          ("prev" == t
            ? s.trigger("prev.owl.carousel")
            : "next" == t && s.trigger("next.owl.carousel"));
    },
  },
  contentCols = {
    getCount: function (e) {
      var t = 1;
      return (
        e.length && parseInt(e.data("count")) > 0 && (t = e.data("count")), t
      );
    },
  },
  categoriesImages = {
    init: function () {
      this.categoriesList();
    },
    categoriesList: function () {
      var e = this;
      $(".js-categories-list").each(function () {
        var t = $(this),
          s = t.data("retina"),
          i = t.data("lazy"),
          a = t.find(".js-categories-item-image");
        i ? e.lazyImages(a, s) : s && e.retinaImages(a);
      });
    },
    lazyImages: function (e, t) {
      var s = this;
      e.lazy({
        onFinishedAll: function (i) {
          t && s.retinaImages(e);
        },
      });
    },
    retinaImages: function (e) {
      e.each(function () {
        var e = $(this),
          t = e.attr("src");
        if (t.indexOf("?") >= 0) {
          var s = t.substring(t.lastIndexOf(".") + 1),
            i = t.replace("." + s, "@2x." + s);
          e.attr("data-at2x", i);
        }
      })
        .promise()
        .done(function () {
          e.retina();
        });
    },
  },
  customGalleryPopup = {
    init: function () {
      var e = this;
      $(".js-custom-gallery").on("click", function (t) {
        t.preventDefault();
        var s = [],
          i = $(this),
          a = $(this).data("group"),
          o = 0,
          n = [];
        if (
          (a && (n = $('.js-custom-gallery[data-group="' + a + '"]')),
          n.length > 1)
        )
          n.each(function (e) {
            var t = $(this).attr("href"),
              a = $(this).attr("title");
            t &&
              (i.attr("href") == t && (o = e), s.push({ href: t, title: a }));
          }),
            e.openGallery(s, o);
        else {
          var r = i.attr("href"),
            c = i.attr("title");
          r && (s.push({ href: r, title: c }), e.openGallery(s));
        }
      });
    },
    openGallery: function (e, t) {
      function s() {
        var e = $("#swipebox-close");
        e.length && e.trigger("click");
      }
      $(document).on(
        "click",
        "img, #swipebox-bottom-bar, .js-swipebox-thumbs-el",
        function (e) {
          e.stopPropagation();
        }
      ),
        $(document).on("scroll", s),
        $(document).on("click", "#swipebox-overlay", s),
        $.swipebox(e, {
          useSVG: !1,
          hideBarsDelay: !1,
          initialIndexOnArray: t,
          afterOpen: function () {
            $("#swipebox-overlay").addClass("opacity-black"),
              $("#swipebox-bottom-bar").addClass(
                "swipebox-bottom-bar--pos-center"
              ),
              $("#swipebox-arrows").addClass("swipebox-arrows--pos-center");
          },
        });
    },
  },
  contentPopup = {
    init: function () {
      this.loadPage(), this.loadInline();
    },
    loadPage: function () {
      var e = this;
      $("body").on("click", ".js-page-popup", function (t) {
        t.preventDefault();
        var s = $(this),
          i = s.attr("href");
        i || (i = s.data("href")),
          $.magnificPopup.close(),
          $("body").prepend(
            "<div class='js-loading-bg mfp-bg mfp-ready'><div class='mfp-preloader'></div></div>"
          ),
          $.get(i + "?popup=1", function (t) {
            $(".js-loading-bg").remove();
            var s = !1;
            t = $("<div>").append(t);
            $(t) &&
              ($(t).find(".js-page-popup-content").length &&
                (s = $(t).find(".js-page-popup-content")),
              s ? e.openModal(s, "page") : (location.href = i));
          });
      });
    },
    loadInline: function () {
      var e = this;
      $("body").on("click", ".js-content-popup", function (t) {
        t.preventDefault();
        var s = $(this).data("href");
        if (s) {
          var i = $("#" + s).clone();
          i.length && (i.removeClass("display-none"), e.openModal(i, "custom"));
        }
      });
    },
    openModal: function (e, t) {
      var s = null;
      t && (s = " popup-content--" + t),
        $.magnificPopup.open(
          {
            items: {
              src:
                "<div class='popup-content" +
                s +
                "'>" +
                e.outerHTML() +
                "</div>",
            },
            type: "inline",
          },
          0
        );
    },
  },
  messages = {
    notifySuccess: function (e, t) {
      e || (e = "Sent!"),
        $.notify(
          { message: e, icon: "fal fa-check" },
          {
            delay: 5e3,
            type: "success",
            offset: t,
            placement: { align: "right", from: "bottom" },
            template:
              '<div data-notify="container" class="alert alert-{0} alert-add-product bs-bg" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>',
          }
        );
    },
    notifyRemoveElement: function (e) {
      e || (e = "Deleted!"),
        $.notify(
          { message: e },
          {
            delay: 5e3,
            offset: 10,
            placement: { align: "right", from: "bottom" },
          }
        );
    },
    notifyDanger: function (e) {
      e || (e = "An error has occurred!"),
        $.notify(
          { message: e, icon: "fa fa-exclamation-circle" },
          {
            delay: 5e3,
            type: "danger",
            placement: { align: "right", from: "bottom" },
          }
        );
    },
  },
  displayFontAwesome = {
    init: function () {
      $("body").hasClass("icons-hidden") &&
        ($.isFunction(window.fontSpy)
          ? fontSpy("Font Awesome\\ 5 Brands", {
              glyphs: "",
              success: function () {
                $("body").removeClass("icons-hidden");
              },
              failure: function () {
                $("body").removeClass("icons-hidden");
              },
            })
          : $("body").removeClass("icons-hidden"));
    },
  },
  responsiveMenu = {
    init: function () {
      this.responsive(),
        window.addEventListener("resize", responsiveMenu.responsive);
    },
    responsive: function () {
      jQuery.each($(".js-resp-nav"), function () {
        responsiveMenu.responsived(
          $(".js-resp-nav"),
          ".js-resp-nav-el",
          ".js-header-nav-sub"
        );
      }),
        responsiveMenu.categoriesResponsived(
          $(".js-h-categories"),
          ".js-h-categories-item",
          ".js-categories-sub",
          $(".js-categories-h-else-items")
        ),
        responsiveMenu.responsived(
          $(".js-header-menu"),
          ".js-header-menu-item",
          ".js-header-submenu"
        ),
        responsiveMenu.responsived(
          $(".js-category-filter-list"),
          ".js-category-filter-el",
          ".js-category-filter-subwrap"
        );
    },
    responsived: function (e, t, s) {
      var i = e.width(),
        a = e.find(t + '[data-type="else"]'),
        o = a.find(s),
        n = a.find(t),
        r = parseFloat(a.removeClass("hide").outerWidth(!0)),
        c = e.data("class-el"),
        d = e.data("class-sub-el");
      n.length &&
        (d && n.removeClass(d), c && n.addClass(c), n.clone().insertBefore(a));
      a.addClass("hide"), o.html("");
      var l = e.children(t + ':not([data-type="else"])'),
        u = 0;
      jQuery.each(l, function () {
        var e = $(this),
          t = parseFloat(e.outerWidth(!0));
        if (u + t + r > i) {
          a.removeClass("hide");
          var s = e.clone();
          c && s.removeClass(c),
            d && s.addClass(d),
            s.appendTo(o),
            (t += e.outerWidth(!0)),
            e.remove();
        }
        u += t;
      }),
        e.css("overflow", "visible"),
        e.removeClass("responsived-before-init");
    },
    categoriesResponsived: function (e, t, s, i) {
      var a = e.width(),
        o = e.find(t + '[data-type="else"]'),
        n = parseFloat(o.removeClass("hide").outerWidth(!0)),
        r = e.children(t + ':not([data-type="else"])'),
        c = 0;
      r.removeClass("hide"),
        o.addClass("hide"),
        o.find(s).remove(),
        o.append(i.html()),
        o.find(".js-subcategories-item").addClass("hide"),
        jQuery.each(r, function () {
          var e = $(this),
            t = parseFloat(e.outerWidth(!0)),
            s = e.data("id");
          c + t + n > a &&
            (o.removeClass("hide"),
            o
              .find(".js-subcategories-item[data-id='" + s + "']")
              .removeClass("hide"),
            (t += e.outerWidth(!0)),
            e.addClass("hide")),
            (c += t);
        }),
        e.css("overflow", "visible"),
        e.removeClass("responsived-before-init");
    },
    positionSubmenu: function (e, t, s) {
      $("body").on("hover", e, function () {
        var e = $(this),
          i = e.closest(t),
          a = e.find(s).first();
        if (a.length) {
          var o = i.offset().left,
            n = parseFloat(o) + parseFloat(i.outerWidth(!0));
          a.removeClass("to-left").removeClass("to-right").removeAttr("style"),
            a.css("visibility", "hidden").css("display", "block");
          var r = a.offset().left,
            c = parseFloat(a.outerWidth(!0));
          n < parseFloat(r) + c && a.addClass("to-left"), a.removeAttr("style");
        }
      });
    },
  };
function Product(e, t) {
  for (var s in ((this.form = $(e)),
  (this.add2cart = this.form.find(".add2cart")),
  (this.skFastButton = this.form.find(".js-sk-button-fastorder")),
  (this.fastButton = this.form.find(".js-button-fastorder")),
  (this.discount = this.form
    .closest(".js-product")
    .find(".js-product-discount")),
  (this.savedWrap = this.form
    .closest(".js-product")
    .find(".js-product-saving")),
  (this.button = this.add2cart.find("input[type=submit], .js-submit-form")),
  (this.isSkuUrl = this.form.data("sku-url")),
  t))
    this[s] = t[s];
  var i = this;
  if (
    (this.form.find(".services input[type=checkbox]").change(function () {
      var e = $('select[name="service_variant[' + $(this).val() + ']"]');
      e.length &&
        ($(this).is(":checked")
          ? e.removeAttr("disabled")
          : e.attr("disabled", "disabled")),
        i.cartButtonVisibility(!0),
        i.updatePrice(),
        e.hasClass("js-select") && e.trigger("refresh");
    }),
    this.form.find(".services .service-variants").on("change", function () {
      i.cartButtonVisibility(!0), i.updatePrice();
    }),
    this.form.find(".inline-select a").click(function () {
      var e = $(this).closest(".inline-select");
      return (
        e.find("a.selected").removeClass("selected"),
        $(this).addClass("selected"),
        e.find(".sku-feature").val($(this).data("value")).change(),
        !1
      );
    }),
    this.form.find(".skus input[type=radio], .skus select").change(function () {
      var e = null,
        t = !1,
        s = $(this).val();
      "radio" == $(this).attr("type")
        ? ((e = $(this).data("image-id")), (t = $(this).data("disabled")))
        : ((e = $(this).find("option:selected").data("image-id")),
          (t = $(this).find("option:selected").data("disabled"))),
        e &&
          $("#product-image-" + e).length &&
          ProductCardGallery.selectLargePhoto(
            $(this)
              .closest(".js-product")
              .find("#product-image-" + e)
          ),
        t
          ? (i.button.attr("disabled", "disabled").addClass("disabled"),
            i.skFastButton.addClass("disabled"),
            i.fastButton.addClass("disabled"))
          : (i.button.removeAttr("disabled").removeClass("disabled"),
            i.skFastButton.removeClass("disabled"),
            i.fastButton.removeClass("disabled")),
        i.updateSkuServices(s),
        i.cartButtonVisibility(!0),
        i.updatePrice(),
        i.isSkuUrl && i.updateURLSku(s),
        i.updateFeaturesList(s);
    }),
    $(".skus input[type=radio]").length)
  ) {
    if (
      !(o = this.form.find(".skus input[type=radio]:checked:not(:disabled)"))
        .length
    ) {
      var a = this.form.find(".skus input[type=radio]:not(:disabled):first");
      a.length &&
        ((o = this.form
          .find(".skus input[type=radio]:not(:disabled):first")
          .click()
          .prop("checked", !0)),
        this.form.find(".js-radio-styler").removeClass("checked"),
        a.closest(".js-radio-styler").addClass("checked"));
    }
  } else if ($(".skus option").length) {
    var o;
    (o = this.form.find(".skus option:selected:not(:disabled)")).length ||
      (o = this.form
        .find(".skus option:not(:disabled):first")
        .click()
        .prop("selected", !0));
  }
  void 0 !== o &&
    o.length &&
    o.data("image-id") &&
    (o.change(),
    o.length &&
      o.data("image-id") &&
      $("#product-image-" + o.data("image-id")).length &&
      ProductCardGallery.selectLargePhoto(
        $(this)
          .closest(".js-product")
          .find("#product-image-" + o.data("image-id"))
      )),
    this.form.find(".sku-feature").change(function () {
      var e = "";
      i.form.find(".sku-feature").each(function () {
        e += $(this).data("feature-id") + ":" + $(this).val() + ";";
      });
      var t = i.features[e];
      t
        ? (t.image_id &&
            $("#product-image-" + t.image_id).length &&
            ProductCardGallery.selectLargePhoto(
              $(this)
                .closest(".js-product")
                .find("#product-image-" + t.image_id)
            ),
          i.updateSkuServices(t.id),
          t.available
            ? (i.button.removeAttr("disabled").removeClass("disabled"),
              i.skFastButton.removeClass("disabled"),
              i.fastButton.removeClass("disabled"))
            : (i.form.find("div.stocks div").hide(),
              i.form.find(".sku-no-stock").show(),
              i.button.attr("disabled", "disabled").addClass("disabled"),
              i.skFastButton.addClass("disabled"),
              i.fastButton.addClass("disabled")),
          i.add2cart.find(".price").data("price", t.price),
          i.updatePrice(t.price, t.compare_price),
          i.isSkuUrl && i.updateURLSku(t.id),
          i.updateFeaturesList(t.id))
        : (i.form.find("div.stocks div").hide(),
          i.form.find(".sku-no-stock").show(),
          i.button.attr("disabled", "disabled").addClass("disabled"),
          i.skFastButton.addClass("disabled"),
          i.fastButton.addClass("disabled"),
          i.form.find(".compare-at-price").hide(),
          i.form.find(".price").empty()),
        i.cartButtonVisibility(!0);
    }),
    this.form.find(".sku-feature:first").change(),
    this.form.find('.skus input[type="radio"]:checked').length ||
      this.form
        .find('.skus input[type="radio"]:enabled:first')
        .attr("checked", "checked"),
    this.form.find(".skus option:selected").length ||
      this.form.find(".skus option:enabled:first").attr("selected", "selected"),
    i.showAllSkus(),
    i.showAllStocks(),
    i.selectColor();
}
(Product.prototype.getEscapedText = function (e) {
  return $("<div>").text(e).html();
}),
  (Product.prototype.currencyFormat = function (e, t) {
    var s,
      i,
      a = this.currency.frac_digits,
      o = this.currency.decimal_point,
      n = this.currency.thousands_sep;
    isNaN((a = Math.abs(a))) && (a = 2),
      null == o && (o = ","),
      null == n && (n = "."),
      (i = (s = parseInt((e = (+e || 0).toFixed(a))) + "").length) > 3
        ? (i %= 3)
        : (i = 0);
    e =
      (i ? s.substr(0, i) + n : "") +
      s.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + n) +
      (a && e - s
        ? o +
          Math.abs(e - s)
            .toFixed(a)
            .replace(/-/, 0)
            .slice(2)
        : "");
    var r = t ? this.currency.sign : this.currency.sign_html;
    return this.currency.sign_position
      ? e + this.currency.sign_delim + r
      : r + this.currency.sign_delim + e;
  }),
  (Product.prototype.serviceVariantHtml = function (e, t, s) {
    return $('<option data-price="' + s + '" value="' + e + '"></option>').text(
      t + " (+" + this.currencyFormat(s, 1) + ")"
    );
  }),
  (Product.prototype.updateSkuServices = function (e) {
    this.form.find(".js-product-code").length > 0 &&
      (this.form.find(".js-product-code").hide(),
      this.form.find(".sku-" + e + "-product-code").show()),
      this.form.find("div.stocks div").hide();
    var t = this.form.find(".sku-" + e + "-stock");
    t.show();
    var s = this.button.data("cart-title"),
      i = this.button.data("cart-preorder-title");
    if (s && i) {
      var a = null;
      if (this.button.find(".js-icon").length)
        a = this.button.find(".js-icon").outerHTML();
      t.find(".js-stock-preorder").length
        ? this.button.html(a + i)
        : this.button.html(a + s);
    }
    for (var o in this.services[e]) {
      var n = this.services[e][o];
      if (!1 === n)
        this.form
          .find(".service-" + o)
          .hide()
          .find("input,select")
          .attr("disabled", "disabled")
          .removeAttr("checked"),
          this.form
            .find(".service-" + o)
            .find(".js-checkbox-styler, label")
            .addClass("disabled");
      else if (
        (this.form
          .find(".service-" + o)
          .show()
          .find("input")
          .removeAttr("disabled"),
        this.form
          .find(".service-" + o)
          .find(".js-checkbox-styler, label")
          .removeClass("disabled"),
        "string" == typeof n || "number" == typeof n)
      )
        this.form
          .find(".service-" + o + " .service-price")
          .html(this.currencyFormat(n)),
          this.form.find(".service-" + o + " input").data("price", n);
      else {
        var r = this.form.find(".service-" + o + " .service-variants"),
          c = r.val();
        for (var d in n) {
          var l = r.find("option[value=" + d + "]");
          !1 === n[d]
            ? (l.hide(),
              l.attr("disabled", "disabled"),
              l.attr("value") == c && (c = !1))
            : (c || (c = d),
              l.removeAttr("disabled"),
              l.replaceWith(this.serviceVariantHtml(d, n[d][0], n[d][1])));
        }
        c ||
          (c = this.form
            .find(".service-" + o + " .service-variants")
            .find("option:not(.disable):first")
            .attr("value")),
          this.form
            .find(".service-" + o + " .service-variants")
            .val(c)
            .trigger("refresh");
      }
    }
  }),
  (Product.prototype.updatePrice = function (e, t) {
    if (void 0 === e) {
      var s = this.form.find(
        '.skus input[type="radio"]:checked, .skus option:selected'
      );
      if (s.length)
        (e = parseFloat(s.data("price"))),
          (t = parseFloat(s.data("compare-price")));
      else e = parseFloat(this.add2cart.find(".price").data("price"));
    }
    var i = this;
    this.form.find(".services input:checked").each(function () {
      var t = $(this).val();
      i.form.find(".service-" + t + "  .service-variants").length
        ? (e += parseFloat(
            i.form
              .find(".service-" + t + "  .service-variants :selected")
              .data("price")
          ))
        : (e += parseFloat($(this).data("price")));
    }),
      t && e > 0
        ? this.form
            .find(".compare-at-price")
            .html(this.currencyFormat(t))
            .show()
        : this.form.find(".compare-at-price").hide();
    var a = this.add2cart.find(".price"),
      o = this.currencyFormat(e),
      n = a.data("text");
    0 == e && n
      ? a.html('<span class="product-card__zero-prices">' + n + "</span>")
      : a.html(o),
      i.updateDiscount(e, t),
      i.updateSaved(e, t);
  }),
  (Product.prototype.updateDiscount = function (e, t) {
    if (this.discount.length) {
      var s = 0,
        i = this.discount.data("round"),
        a = parseInt(this.discount.data("minimal"));
      this.discount.addClass("display-none"),
        t > e &&
          e > 0 &&
          ((s = ((t - e) / t) * 100),
          (s =
            "ceil" == i
              ? Math.ceil(s)
              : "floor" == i
              ? Math.floor(s)
              : Math.round(s)) >= a &&
            this.discount.html("-" + s + "%").removeClass("display-none"));
    }
  }),
  (Product.prototype.updateSaved = function (e, t) {
    if (
      this.savedWrap.length &&
      (this.savedWrap.addClass("display-none"), t > e && e > 0)
    ) {
      var s = e - t;
      this.savedWrap.html(this.currencyFormat(s)).removeClass("display-none");
    }
  }),
  (Product.prototype.cartButtonVisibility = function (e) {
    e &&
      (this.add2cart.find(".js-compare-at-price").show(),
      this.add2cart.find('input[type="submit"], .js-submit-form').show(),
      this.add2cart.find(".js-sk-button-fastorder").show(),
      this.add2cart.find(".price").show());
  }),
  (Product.prototype.showAllSkus = function () {
    $(".js-product-skus-show").on("click", function () {
      var e = $(this);
      e
        .closest(".js-product-skus")
        .find(".js-product-skus-item")
        .toggleClass("hide"),
        e.toggleClass("open");
    });
  }),
  (Product.prototype.showAllStocks = function () {
    $(".js-product-stocks-show").on("click", function () {
      var e = $(this);
      e
        .closest(".js-product-stocks")
        .find(".js-product-stocks-item")
        .toggleClass("hide"),
        e.toggleClass("open");
    });
  }),
  (Product.prototype.selectColor = function () {
    var e = this;
    $(".js-product-color").on("click", function () {
      e.writeTextColor($(this));
    });
    var t = $(".js-product-color.selected");
    t.length && e.writeTextColor(t);
  }),
  (Product.prototype.writeTextColor = function (e) {
    var t = e.closest("form").find(".js-product-selected-color-title"),
      s = e.data("color-title");
    t.length && s
      ? t.html('<i class="fal fa-minus icon"></i> ' + s)
      : t.html("");
  }),
  (Product.prototype.updateURLSku = function (e) {
    var t,
      s,
      i =
        ((t = window.location.search.substring(1)),
        (s = {}),
        (t = t.split("&")),
        $.each(t, function (e, t) {
          if (t) {
            var i = t.split("=");
            s[decodeURIComponent(i[0])] = decodeURIComponent(i[1] ? i[1] : "");
          }
        }),
        s);
    e ? (i.sku = e) : delete i.sku;
    var a = (function (e) {
        var t = "",
          s = [];
        $.each(e, function (e, t) {
          s.push(encodeURIComponent(e) + "=" + encodeURIComponent(t));
        }),
          s.length && (t = "?" + s.join("&"));
        return t;
      })(i),
      o = location.origin + location.pathname + a + location.hash;
    "function" == typeof history.replaceState &&
      history.replaceState(null, document.title, o);
  }),
  (Product.prototype.updateFeaturesList = function (e) {
    var t = $(".js-product-features");
    if (
      void 0 !== this.sku_features &&
      void 0 !== this.product_skus_features[e] &&
      t.length
    ) {
      var s = this.sku_features,
        i = this.product_skus_features[e],
        a = parseInt(this.short_features_count),
        o = this.short_features_codes
          ? this.short_features_codes.split(",")
          : [];
      t.each(function () {
        var e = $(this).find("table"),
          t = $(this).data("short");
        e.html("");
        var n,
          r = 1;
        for (var c in i) {
          var d = i[c],
            l = void 0 !== s[c].type && "divider" == s[c].type;
          if (
            (void 0 === s[c] &&
              void 0 !== s[c + ".0"] &&
              ((s[c] = s[c + ".0"]), (s[c].name = s[c + ".0"].name)),
            void 0 !== s[c].type)
          ) {
            if (t && a && r > a) break;
            if (t && o.length && -1 === $.inArray(c, o)) continue;
            if (t && l) continue;
            var u = "product_features-item";
            l && (u += " divider"),
              (n = '<tr class="' + u + '">'),
              (n += '<td class="product_features-title">'),
              (n += "<span>" + s[c].name + "</span>"),
              (n += "</td>"),
              (n += '<td class="product_features-value">'),
              l ||
                (t &&
                  "color" == s[c].type &&
                  (n += '<span class="product_features__colors-short">'),
                (n += d),
                t && "color" == s[c].type && (n += "</span>")),
              (n += "</td>"),
              (n += "</tr>"),
              e.append(n),
              r++;
          }
        }
      });
    }
  });
var ProductCardGallery = {
  init: function () {
    this.productPreviewsCarousel(),
      this.selectedPreviewImage(),
      this.popup(),
      this.popupVideo(),
      this.swipeLargePhoto($(".js-product-gallery-main")),
      is_touch_device() ||
        this.productImageZoom($(".js-product-gallery-main-el").first());
    var e = $(".js-product-gallery-main-el").first().find("img");
    e.length && $.Retina && e.retina();
  },
  productMainImageInitCarousel: function (e, t) {
    var s = this,
      i = 0;
    if (e.length && !e.hasClass("owl-loaded")) {
      var a = e.closest(".js-product").find(".js-gallery-preview.selected");
      a.length &&
        "0" != a.data("position") &&
        (i = parseInt(a.data("position"))),
        e.owlCarousel({
          loop: !1,
          nav: !1,
          margin: 0,
          items: 1,
          lazyLoad: !0,
          autoHeight: !1,
          dots: !1,
          startPosition: i,
          mouseDrag: !1,
          onLoadedLazy: function (e) {
            var t = $(e.currentTarget);
            t.length &&
              $.Retina &&
              t.find(".owl-item.active .owl-lazy").retina();
          },
          onInitialized: function () {
            is_touch_device() ||
              s.productImageZoom(e.find(".js-product-gallery-main-el")),
              s.displayImageTitle(e);
          },
          onChanged: function (e) {
            var t = $(e.currentTarget),
              s = e.item.index,
              i = t.find(
                '.js-product-gallery-main-el[data-position="' + s + '"]'
              ),
              a = i.data("id");
            if ("video" == i.data("id") && !i.find("iframe").length) {
              var o = i.data("video-url"),
                n = i.data("video-width"),
                r = i.data("video-height");
              i.html(
                '<iframe src="' +
                  o +
                  '" width="' +
                  n +
                  '" height="' +
                  r +
                  '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
              );
            }
            if (a) {
              var c = t.closest(".js-product").find(".js-gallery-preview");
              c.removeClass("selected"),
                c.filter("[data-id='" + a + "']").addClass("selected");
            }
          },
          onDragged: function (e) {
            var t = $(e.currentTarget);
            if (t.length) {
              var i = t.closest(".js-product").find(".js-gallery-preview"),
                a = $(t)
                  .find(".owl-item.active .js-product-gallery-main-el")
                  .data("id");
              if (a) {
                i.removeClass("selected");
                var o = i.filter("[data-id='" + a + "']");
                o.addClass("selected");
              }
              s.displayImageTitle(t),
                s.productPreviewsCarouselGoTo(o.data("position"));
            }
          },
        }),
        t &&
          ("prev" == t
            ? e.trigger("next.owl.carousel")
            : "next" == t && e.trigger("prev.owl.carousel"));
    }
  },
  productPreviewsCarousel: function (e) {
    e || (e = $(".js-gallery-previews-carousel"));
    var t = contentCols.getCount(e.closest(".js-content-cols")),
      s =
        (e.closest(".js-content-cols").length,
        e.find(".js-gallery-preview").length,
        {
          500: { items: 4 },
          600: { items: 5 },
          700: { items: 6 },
          800: { items: 3 },
          900: { items: 4 },
          1180: { items: 5 },
          1350: { items: 6 },
        });
    2 == t
      ? (s = {
          500: { items: 4 },
          600: { items: 5 },
          700: { items: 6 },
          800: { items: 3 },
          1300: { items: 4 },
          1450: { items: 5 },
        })
      : 3 == t &&
        (s = {
          500: { items: 4 },
          600: { items: 5 },
          700: { items: 6 },
          800: { items: 3 },
          1400: { items: 4 },
        });
    var i = {
      loop: !1,
      nav: !0,
      lazyLoad: !0,
      autoHeight: !1,
      dots: !1,
      startPosition: 0,
      responsive: s,
      navText: [
        '<span class="carousel-prev carousel-prev--mini bs-color"></span>',
        '<span class="carousel-next carousel-next--mini bs-color"></span>',
      ],
      navElement: "div",
      mouseDrag: !1,
      onInitialized: function (e) {
        var t = $(e.currentTarget);
        t.find(".owl-nav").hasClass("disabled")
          ? t.closest(".js-outer").addClass("none-nav")
          : t.closest(".js-outer").removeClass("none-nav");
      },
      onResized: function (e) {
        var t = $(e.currentTarget);
        t.find(".owl-nav").hasClass("disabled")
          ? t.closest(".js-outer").addClass("none-nav")
          : t.closest(".js-outer").removeClass("none-nav");
      },
    };
    e.length && e.owlCarousel(i),
      e.data("loop") &&
        e.find(".owl-item:not(.active)").length &&
        (e.trigger("destroy.owl.carousel"), (i.loop = !0), e.owlCarousel(i));
  },
  productPreviewsCarouselGoTo: function (e) {
    var t = $(".js-gallery-previews-carousel");
    t.length &&
      e &&
      (t
        .find(".js-gallery-preview")
        .filter("[data-position='" + e + "']")
        .parent()
        .is(".active") ||
        t.trigger("to.owl.carousel", [parseInt(e), 300]));
  },
  selectedPreviewImage: function () {
    var e = this;
    $("body").on("click", ".js-gallery-preview a", function (t) {
      t.preventDefault(), e.selectLargePhoto($(this), !1);
    });
  },
  popup: function () {
    var e = this;
    $("body").on(
      "click",
      ".js-product-image-popup, .js-gallery-preview-else",
      function (t) {
        t.preventDefault();
        var s = $(this).closest(".js-product").find(".js-product-gallery-main");
        s.data("photoswipe")
          ? e.popupPhotoswipe($(this), s)
          : e.popupSwipebox($(this), s);
      }
    );
  },
  popupPhotoswipe: function (e) {
    var t = e
      .closest(".js-product")
      .find(".js-product-image-popup")
      .closest(".js-product-gallery-main");
    $("body").on("click", ".pswp button", function (e) {
      e.preventDefault();
    });
    var s = e.closest(".js-product").find(".js-gallery-preview"),
      i = e.closest(".js-product").find(".js-product-gallery-main-el"),
      a = document.querySelectorAll(".pswp")[0],
      o = e.data("position"),
      n = [];
    t.find('[data-id="video"][data-position="0"]').length && o > 0 && (o -= 1),
      s.length
        ? s.each(function () {
            var e = $(this);
            e.data("video") ||
              n.push({ src: e.find("a").attr("href"), w: 0, h: 0 });
          })
        : i.length && n.push({ src: i.attr("href"), w: 0, h: 0 });
    var r = new PhotoSwipe(a, PhotoSwipeUI_Default, n, {
      index: o,
      shareEl: !1,
      history: !1,
    });
    r.listen("gettingData", function (e, t) {
      if (t.w < 1 || t.h < 1) {
        var s = new Image();
        (s.onload = function () {
          (t.w = this.width), (t.h = this.height), r.updateSize(!0);
        }),
          (s.src = t.src);
      }
    }),
      r.init();
  },
  popupSwipebox: function (e) {
    var t = e
        .closest(".js-product")
        .find(".js-product-image-popup")
        .closest(".js-product-gallery-main"),
      s = t.data("popup-previews"),
      i = e
        .closest(".js-product")
        .find(".owl-item:not(.cloned) .js-gallery-preview"),
      a = [],
      o = e.data("position");
    function n() {
      var e = $("#swipebox-close");
      e.length && e.trigger("click");
    }
    t.find('[data-id="video"][data-position="0"]').length && o > 0 && (o -= 1),
      i.length || (i = e.closest(".js-product").find(".js-gallery-preview")),
      i.length
        ? i.each(function () {
            $(this).data("video") ||
              a.push({
                href: $(this).find("a").attr("href"),
                src: $(this).find("img").attr("src"),
              });
          })
        : a.push({ href: e.attr("href"), src: e.find("img").attr("src") }),
      $(document).on("scroll", n),
      $(document).on("click", "#swipebox-overlay", n),
      $(document).on(
        "click",
        "img, #swipebox-bottom-bar, .js-swipebox-thumbs-el",
        function (e) {
          e.stopPropagation();
        }
      ),
      $.swipebox(a, {
        useSVG: !1,
        hideBarsDelay: !1,
        loopAtEnd: !0,
        thumbs: !0,
        initialIndexOnArray: o,
        afterOpen: function () {
          if (s && a.length > 1) {
            var e = "",
              t = parseInt($("#swipebox-slider .slide.current").data("index"));
            a.forEach(function (s, i) {
              var a = "swipebox-thumbs_el js-swipebox-thumbs-el";
              t === i && (a += " active"),
                1 == s.is_video
                  ? (e +=
                      '<a class="' +
                      a +
                      '" data-index="' +
                      i +
                      '" href="' +
                      s.href +
                      '"><i class="swipebox-preview-video fas fa-video bs-color"></i></a>')
                  : (e +=
                      '<a class="' +
                      a +
                      '" data-index="' +
                      i +
                      '" href="' +
                      s.href +
                      '"><img src="' +
                      s.src +
                      '" /></a>');
            }),
              $("#swipebox-container").append(
                '<div id="swipebox-thumbs" class="swipebox-thumbs">' +
                  e +
                  "</div>"
              ),
              $("#swipebox-slider").css(
                "padding-bottom",
                parseInt($("#swipebox-thumbs").outerHeight()) + 30 + "px"
              );
          }
          $("#swipebox-bottom-bar").addClass("swipebox-bottom-bar--pos-center"),
            $("#swipebox-arrows").addClass("swipebox-arrows--pos-center");
        },
      });
  },
  swipeLargePhoto: function (e) {
    is_touch_device() &&
      e.swipe({
        allowPageScroll: "auto",
        threshold: 20,
        swipe: function (e, t, s, i, a, o) {
          var n = $(e.target)
            .closest(".js-product")
            .find(".js-product-gallery-main");
          "left" == t
            ? ProductCardGallery.productMainImageInitCarousel(n, "prev")
            : "right" == t &&
              ProductCardGallery.productMainImageInitCarousel(n, "next");
        },
      });
  },
  selectLargePhoto: function (e, t) {
    var s = e.parent(),
      i = s.data("id"),
      a = e.closest(".js-product").find(".js-product-gallery-main"),
      o = a.find(".js-product-gallery-main-el");
    if (
      (a.hasClass("owl-loaded") || this.productMainImageInitCarousel(a),
      null == t && (t = !0),
      s
        .closest(".js-product")
        .find(".js-gallery-preview")
        .removeClass("selected"),
      s.addClass("selected"),
      i)
    ) {
      var n = o.filter("[data-id='" + i + "']").data("position");
      void 0 !== n &&
        (a.trigger("to.owl.carousel", [n, 300]), this.displayImageTitle(a)),
        t && this.productPreviewsCarouselGoTo(n);
    }
  },
  productImageZoom: function (e) {
    var t = e.closest(".js-product-gallery-main");
    e.length &&
      t.length &&
      t.data("zoom") &&
      e.each(function () {
        $(this).find("img").hasClass("zoomImg") ||
          $(this).zoom({
            url: $(this).attr("href"),
            onZoomIn: function () {
              $(this).parent().addClass("zooming");
            },
            onZoomOut: function () {
              $(this).parent().removeClass("zooming");
            },
          });
      });
  },
  displayImageTitle: function (e) {
    var t = e.closest(".js-product").find(".js-product-gallery-title"),
      s = e.find(".owl-item.active");
    if ((t.text(""), t.length && s.length)) {
      var i = s.find("img").attr("alt");
      i && t.text(i);
    }
  },
  popupVideo: function () {
    $("body").on(
      "touchstart touchend touchup",
      ".js-mfp-fade-product-video",
      function (e) {
        e.stopPropagation();
      }
    ),
      $("body").on("click", ".js-gallery-popup-video a", function (e) {
        e.preventDefault();
        var t = $(this).attr("href");
        t &&
          $.magnificPopup.open(
            {
              items: { src: t },
              type: "iframe",
              mainClass: "mfp-fade js-mfp-fade-product-video",
              removalDelay: 160,
              preloader: !1,
              fixedContentPos: !1,
              iframe: {
                patterns: {
                  youtube_short: {
                    index: "youtu.be/",
                    id: "youtu.be/",
                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                  },
                },
              },
            },
            0
          );
      });
  },
};
function is_touch_device() {
  const screenWidth = window.screen.width;
  var touch = false;
  if (screenWidth <= 640) {
    touch = true;
  } else {
    false;
  }
  return touch;
}

function viewport() {
  var e = window,
    t = "inner";
  return (
    "innerWidth" in window ||
      ((t = "client"), (e = document.documentElement || document.body)),
    { width: e[t + "Width"], height: e[t + "Height"] }
  );
}
function removeParam(e, t) {
  if (t) {
    var s = t.split("?")[0],
      i = [],
      a = -1 !== t.indexOf("?") ? t.split("?")[1] : "";
    if ("" !== a) {
      for (var o = (i = a.split("&")).length - 1; o >= 0; o -= 1)
        i[o].split("=")[0] === e && i.splice(o, 1);
      s = s + "?" + i.join("&");
    }
    return s;
  }
  return "";
}
function validateEmail(e) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    e
  );
}
function truncateText(e, t) {
  if (e && parseInt(t) && e.length > parseInt(t)) return e.slice(0, t) + "...";
  return e;
}
function currencyFormat(e, t) {
  var s,
    i,
    a = globalThemeSettings.currency.frac_digits,
    o = globalThemeSettings.currency.decimal_point,
    n = globalThemeSettings.currency.thousands_sep;
  isNaN((a = Math.abs(a))) && (a = 2),
    null == o && (o = ","),
    null == n && (n = "."),
    (i = (s = parseInt((e = (+e || 0).toFixed(a))) + "").length) > 3
      ? (i %= 3)
      : (i = 0);
  e =
    (i ? s.substr(0, i) + n : "") +
    s.substr(i).replace(/(\d{3})(?=\d)/g, "$1" + n) +
    (a && e - s
      ? o +
        Math.abs(e - s)
          .toFixed(a)
          .replace(/-/, 0)
          .slice(2)
      : "");
  var r = t
    ? globalThemeSettings.currency.sign
    : globalThemeSettings.currency.sign_html;
  return globalThemeSettings.currency.sign_position
    ? e + globalThemeSettings.currency.sign_delim + r
    : r + globalThemeSettings.currency.sign_delim + e;
}
function formatDate(e) {
  var t = e.split("-"),
    s = t[0],
    i = t[1] - 1,
    a = t[2];
  return new Date(s, i, a);
}
$(function () {
  globalThemeSettings.isMobile || responsiveMenu.init(),
    globalThemeSettings.isDisplayFontAwesome && displayFontAwesome.init(),
    slider.init(),
    ProductCardGallery.init(),
    main.init(),
    mobilePopupBlocks.init(),
    mobileMenu.init(),
    openMap.init(),
    form.init(),
    dropDownList.init(),
    subscribeForm.init(),
    moreText.init(),
    anchorLink.init(),
    tabs.init(),
    accordionTabs.init(),
    modalForm.init(),
    countdown.init(),
    productListUser.init(),
    cart.init(),
    sidebarMobileMenu.init(),
    pagesTree.init(),
    switchVersionSite.init(),
    videoPopup.init(),
    infoMessage.init($(".js-info-massage")),
    popupAdvert.init($(".js-popup-advert")),
    productsPreviewList.init(),
    productsCarousel.init(),
    categoriesImages.init(),
    customGalleryPopup.init(),
    contentPopup.init(),
    fixedCart.init(),
    globalThemeSettings.isFixedHeader && headerFixed.init(),
    globalThemeSettings.isFixedHeaderMobile && headerMobileFixed.init(),
    globalThemeSettings.isTileGalleryProductPreview && new productTileGallery(),
    globalThemeSettings.isDemoSettings && demoTest.init(),
    globalThemeSettings.isHorizontalMainMenu && categoriesHorizontalMenu.init(),
    globalThemeSettings.isMobile ||
      (categoriesVerticalMenu.init(),
      categoriesVerticalMenuUnfolding.init(),
      sidebarCarousel.init(),
      cartPreview.init(),
      headerMenu.init()),
    new SocialWidgets({ container: ".js-social-widgets", timeAutoSwitch: 5e3 });
}),
  ($.fn.elementRealWidth = function () {
    $clone = this.clone().css("visibility", "hidden").appendTo($("body"));
    var e = $clone.outerWidth(!0);
    return $clone.remove(), e;
  }),
  (jQuery.fn.outerHTML = function (e) {
    return e
      ? this.before(e).remove()
      : jQuery("<p>").append(this.eq(0).clone()).html();
  }),
  ($.fn.pop = function () {
    var e = this.get(-1);
    return this.splice(this.length - 1, 1), e;
  }),
  ($.fn.shift = function () {
    var e = this.get(0);
    return this.splice(0, 1), e;
  }),
  ($.urlParam = function (e, t) {
    var s = new RegExp("[?&]" + t + "=([^&#]*)").exec(e);
    return null == s ? null : s[1] || 0;
  }),
  ($.fn.serializeObject = function () {
    var e = {},
      t = this.serializeArray();
    return (
      $.each(t, function () {
        e[this.name]
          ? (e[this.name].push || (e[this.name] = [e[this.name]]),
            e[this.name].push(this.value || ""))
          : (e[this.name] = this.value || "");
      }),
      e
    );
  });
