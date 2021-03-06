/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  const $window = $(window);

  const $body = $('body');

  const $sidebar = $('#sidebar');

  // Breakpoints.
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px'],
  });

  // Hack: Enable IE flexbox workarounds.
  if (browser.name == 'ie') $body.addClass('is-ie');

  // Play initial animations on page load.
  $window.on('load', () => {
    window.setTimeout(() => {
      $body.removeClass('is-preload');
    }, 100);
  });

  // Forms.

  // Hack: Activate non-input submits.
  $('form').on('click', '.submit', function (event) {
    // Stop propagation, default.
    event.stopPropagation();
    event.preventDefault();

    // Submit form.
    $(this)
      .parents('form')
      .submit();
  });

  // Sidebar.
  if ($sidebar.length > 0) {
    const $sidebar_a = $sidebar.find('a');

    $sidebar_a
      .addClass('scrolly')
      .on('click', function () {
        const $this = $(this);

        // External link? Bail.
        if ($this.attr('href').charAt(0) != '#') return;

        // Deactivate all links.
        $sidebar_a.removeClass('active');

        // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
        $this.addClass('active').addClass('active-locked');
      })
      .each(function () {
        const $this = $(this);

        const id = $this.attr('href');

        const $section = $(id);

        // No section for this link? Bail.
        if ($section.length < 1) return;

        // Scrollex.
        $section.scrollex({
          mode: 'middle',
          top: '-20vh',
          bottom: '-20vh',
          initialize() {
            // Deactivate section.
            $section.addClass('inactive');
          },
          enter() {
            // Activate section.
            $section.removeClass('inactive');

            // No locked links? Deactivate all links and activate this section's one.
            if ($sidebar_a.filter('.active-locked').length == 0) {
              $sidebar_a.removeClass('active');
              $this.addClass('active');
            }

            // Otherwise, if this section's link is the one that's locked, unlock it.
            else if ($this.hasClass('active-locked')) $this.removeClass('active-locked');
          },
        });
      });
  }

  // Scrolly.
  $('.scrolly').scrolly({
    speed: 1000,
    offset() {
      // If <=large, >small, and sidebar is present, use its height as the offset.
      if (breakpoints.active('<=large') && !breakpoints.active('<=small') && $sidebar.length > 0) {
        return $sidebar.height();
      }

      return 0;
    },
  });

  // Features.
  $('.features').scrollex({
    mode: 'middle',
    top: '-20vh',
    bottom: '-20vh',
    initialize() {
      // Deactivate section.
      $(this).addClass('inactive');
    },
    enter() {
      // Activate section.
      $(this).removeClass('inactive');
    },
  });
}(jQuery));
