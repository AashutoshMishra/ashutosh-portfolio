$(document).ready(function() {

    // Utility function for debouncing
    // Ensures a function is not called too frequently, especially useful for scroll events.
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
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
    if ($header.length) { // Check if header element exists
        var headerOffset = $header.offset().top;
        var initialHeaderHeight = $header.outerHeight();
        // Set initial padding-top on body to prevent content jump
        $('body').css('padding-top', initialHeaderHeight);

        function toggleStickyHeader() {
            // Recalculate header height on scroll to account for potential changes (e.g., responsive)
            var currentHeaderHeight = $header.outerHeight();
            if ($(window).scrollTop() > headerOffset) { // Check if scrolled past initial header position
                $header.addClass('sticky');
                // Ensure body padding matches current sticky header height
                $('body').css('padding-top', currentHeaderHeight);
            } else {
                $header.removeClass('sticky');
                // Reset body padding to initial header height when not sticky
                $('body').css('padding-top', initialHeaderHeight);
            }
        }

        // Debounce the scroll event for sticky header to improve performance
        $(window).on('scroll', debounce(toggleStickyHeader, 10));
        // Initial check on load
        toggleStickyHeader();
    }

    // --- Smooth Scroll for Navigation Links ---
    $('#header nav a').on('click', function(event) {
        // Ensure it's a hash link and not an external URL
        if (this.hash !== '' && $(this.hash).length) { // Check if target section exists
            event.preventDefault();
            var hash = this.hash;
            // Calculate scroll position, accounting for the *current* fixed header height
            var scrollTarget = $(hash).offset().top - $('#header').outerHeight();

            $('html, body').animate({
                scrollTop: scrollTarget
            }, 800, function() {
                // Add hash to URL after animation for bookmarking/history
                window.location.hash = hash;
            });
        }
    });

    // --- Fade-in Animation on Scroll ---
    var $fadeInElements = $('.fade-in');
    if ($fadeInElements.length) { // Check if any fade-in elements exist
        function checkFadeInElements() {
            var windowHeight = $(window).height();
            var scrollFromTop = $(window).scrollTop();

            $fadeInElements.each(function() {
                var $this = $(this);
                // Only animate if element is not already visible
                if (!$this.hasClass('appear')) {
                    // Element is considered in view if its top is within the bottom 100px of the viewport
                    if ($this.offset().top < scrollFromTop + windowHeight - 100) {
                        $this.addClass('appear');
                    }
                }
            });
        }

        // Debounce the scroll event for fade-in animations
        $(window).on('scroll', debounce(checkFadeInElements, 50));
        // Trigger on load to check elements already in view
        checkFadeInElements();
    }

    // --- Scroll-to-Top Button Logic ---
    var $scrollToTopButton = $('.scroll-to-top');
    if ($scrollToTopButton.length) { // Check if button exists
        function toggleScrollToTopButton() {
            if ($(window).scrollTop() > 300) { // Show button after scrolling 300px
                $scrollToTopButton.addClass('show');
            } else {
                $scrollToTopButton.removeClass('show');
            }
        }

        // Debounce the scroll event for button visibility
        $(window).on('scroll', debounce(toggleScrollToTopButton, 10));
        // Initial check on load
        toggleScrollToTopButton();

        $scrollToTopButton.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
    }

    // Note: Image placeholders are handled by the HTML and CSS. No JS needed here.
    // In a real project, consider lazy loading images for performance.
});