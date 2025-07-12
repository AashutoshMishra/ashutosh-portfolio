$(document).ready(function () {

    // Utility function for debouncing
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // --- Sticky Navigation Logic ---
    var $header = $('#header');
    if ($header.length) {
        var headerOffset = $header.offset().top;
        var initialHeaderHeight = $header.outerHeight();
        $('body').css('padding-top', initialHeaderHeight);

        function toggleStickyHeader() {
            var currentHeaderHeight = $header.outerHeight();
            if ($(window).scrollTop() > headerOffset) {
                $header.addClass('sticky');
                $('body').css('padding-top', currentHeaderHeight);
            } else {
                $header.removeClass('sticky');
                $('body').css('padding-top', initialHeaderHeight);
            }
        }

        $(window).on('scroll', debounce(toggleStickyHeader, 10));
        toggleStickyHeader();
    }

    // --- Smooth Scroll for Navigation Links ---
    $('#header nav a').on('click', function (event) {
        if (this.hash !== '' && $(this.hash).length) {
            event.preventDefault();
            var hash = this.hash;
            var scrollTarget = $(hash).offset().top - $('#header').outerHeight();

            $('html, body').animate({
                scrollTop: scrollTarget
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    // --- Fade-in Animation on Scroll ---
    var $fadeInElements = $('.fade-in');
    if ($fadeInElements.length) {
        function checkFadeInElements() {
            var windowHeight = $(window).height();
            var scrollFromTop = $(window).scrollTop();

            $fadeInElements.each(function () {
                var $this = $(this);
                if (!$this.hasClass('appear')) {
                    if ($this.offset().top < scrollFromTop + windowHeight - 100) {
                        $this.addClass('appear');
                    }
                }
            });
        }

        $(window).on('scroll', debounce(checkFadeInElements, 50));
        checkFadeInElements();
    }

    // --- Scroll-to-Top Button Logic ---
    var $scrollToTopButton = $('.scroll-to-top');
    if ($scrollToTopButton.length) {
        function toggleScrollToTopButton() {
            if ($(window).scrollTop() > 300) {
                $scrollToTopButton.addClass('show');
            } else {
                $scrollToTopButton.removeClass('show');
            }
        }

        $(window).on('scroll', debounce(toggleScrollToTopButton, 10));
        toggleScrollToTopButton();

        $scrollToTopButton.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
    }

    // --- Typed.js Initialization ---
    if ($('.typed').length && typeof Typed !== 'undefined') {
        new Typed('.typed', {
            strings: ["Senior Software Engineer", ".Net Core + Azure", "Tech Enthusiast"],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true
        });
    }

    // --- Dark Mode Toggle ---
    const $themeToggleBtn = $('#theme-toggle');
    const rootElement = document.documentElement;

    function setTheme(theme) {
        rootElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        $themeToggleBtn.text(theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode");
    }

    function toggleTheme() {
        const currentTheme = rootElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
    }

    // Initialize theme on load
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    $themeToggleBtn.on('click', toggleTheme);
});
