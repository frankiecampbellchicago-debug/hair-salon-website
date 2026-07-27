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
      { name: 'Voluminous Curls', price: '$240' },
      { name: 'Pixie Cut', price: '$150' },
      { name: 'Beach Waves', price: '$200' }
    ];

    var gradients = [
      'linear-gradient(135deg, #EC4899, #8B5CF6)',
      'linear-gradient(135deg, #F9A8D4, #EC4899)',
      'linear-gradient(135deg, #C4B5FD, #8B5CF6)',
      'linear-gradient(135deg, #8B5CF6, #5B21B6)',
      'linear-gradient(135deg, #FBCFE8, #EC4899)',
      'linear-gradient(135deg, #F472B6, #C026D3)'
    ];

    var images = [
      'https://placehold.co/400x600/8B5CF6/FFFFFF?text=Classic+Bob',
      'https://placehold.co/400x600/EC4899/FFFFFF?text=Soft+Waves',
      'https://placehold.co/400x600/8B5CF6/FFFFFF?text=Sleek+Straight',
      'https://placehold.co/400x600/5B21B6/FFFFFF?text=Voluminous+Curls',
      'https://placehold.co/400x600/EC4899/FFFFFF?text=Pixie+Cut',
      'https://placehold.co/400x600/C026D3/FFFFFF?text=Beach+Waves'
    ];

    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.wig-thumb'));
    var centerMedia = document.getElementById('wig-center-media');
    var centerImg = document.getElementById('wig-center-img');
    var centerLabel = document.getElementById('wig-center-label');
    var priceEl = document.getElementById('wig-price');
    var announceEl = document.getElementById('wig-announce');
    var stageEl = document.getElementById('wig-stage');

    var activeIndex = 0;

    function showStyle(index) {
      activeIndex = index;
      var style = styles[index];

      centerMedia.style.background = gradients[index];
      centerImg.src = images[index];
      centerImg.alt = 'Model wearing the ' + style.name + ' style';
      centerLabel.textContent = style.name;
      priceEl.textContent = style.price;
      announceEl.textContent = 'Now viewing: ' + style.name + ', from ' + style.price;

      thumbs.forEach(function (thumb, i) {
        thumb.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
    }

    function goToNext() {
      showStyle((activeIndex + 1) % styles.length);
    }

    function goToPrev() {
      showStyle((activeIndex - 1 + styles.length) % styles.length);
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        showStyle(parseInt(thumb.getAttribute('data-index'), 10));
      });
    });

    var nextBtn = document.getElementById('wig-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', goToNext);
    }

    var wheelCooldown = false;
    stageEl.addEventListener('wheel', function (e) {
      if (wheelCooldown || Math.abs(e.deltaY) < 4) return;
      wheelCooldown = true;
      if (e.deltaY > 0) goToNext(); else goToPrev();
      setTimeout(function () { wheelCooldown = false; }, 450);
    }, { passive: true });

    stageEl.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      }
    });

    showStyle(0);
  }
});
