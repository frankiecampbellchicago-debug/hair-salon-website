document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navbar.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      contactForm.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#DC2626';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) return;

      var successMsg = document.getElementById('form-success');
      var submitBtn = contactForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(function () {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Request';
        if (successMsg) successMsg.style.display = 'block';
      }, 600);
    });
  }

  var wigStage = document.getElementById('wig-thumbs');
  if (wigStage) {
    var styles = [
      { name: 'Classic Bob', price: '$180' },
      { name: 'Soft Waves', price: '$220' },
      { name: 'Sleek Straight', price: '$160' },
      { name: 'Voluminous Curls', price: '$240' }
    ];

    var gradients = [
      'linear-gradient(135deg, #EC4899, #8B5CF6)',
      'linear-gradient(135deg, #F9A8D4, #EC4899)',
      'linear-gradient(135deg, #F9A8D4, #EC4899)',
      'linear-gradient(135deg, #8B5CF6, #5B21B6)'
    ];

    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.wig-thumb'));
    var centerMedia = document.getElementById('wig-center-media');
    var centerLabel = document.getElementById('wig-center-label');
    var priceEl = document.getElementById('wig-price');
    var announceEl = document.getElementById('wig-announce');
    var playPauseBtn = document.getElementById('wig-playpause');
    var progressTrack = document.querySelector('.wig-progress-track');
    var progressFill = document.getElementById('wig-progress-fill');
    var iconPause = playPauseBtn.querySelector('.icon-pause');
    var iconPlay = playPauseBtn.querySelector('.icon-play');

    var activeIndex = 0;
    var playing = true;
    var ROTATE_MS = 4500;

    function showStyle(index) {
      activeIndex = index;
      var style = styles[index];

      centerMedia.style.background = gradients[index];
      centerLabel.textContent = style.name;
      priceEl.textContent = style.price;
      announceEl.textContent = 'Now viewing: ' + style.name + ', from ' + style.price;

      thumbs.forEach(function (thumb, i) {
        thumb.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
    }

    function restartProgress() {
      progressFill.classList.remove('animate');
      void progressFill.offsetWidth;
      progressFill.classList.add('animate');
    }

    function goToNext() {
      showStyle((activeIndex + 1) % styles.length);
      restartProgress();
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        var index = parseInt(thumb.getAttribute('data-index'), 10);
        showStyle(index);
        restartProgress();
      });
    });

    progressFill.addEventListener('animationend', function () {
      if (playing) goToNext();
    });

    playPauseBtn.addEventListener('click', function () {
      playing = !playing;
      progressTrack.classList.toggle('paused', !playing);
      playPauseBtn.setAttribute('aria-pressed', playing ? 'false' : 'true');
      playPauseBtn.setAttribute('aria-label', playing ? 'Pause style rotation' : 'Resume style rotation');
      iconPause.hidden = !playing;
      iconPlay.hidden = playing;
    });

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    showStyle(0);
    if (!prefersReducedMotion) {
      restartProgress();
    } else {
      playing = false;
      progressTrack.classList.add('paused');
      iconPause.hidden = true;
      iconPlay.hidden = false;
    }
  }
});
