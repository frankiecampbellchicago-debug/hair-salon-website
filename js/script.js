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

  var revBody = document.getElementById('rev-body');
  if (revBody) {
    var reviews = [
      {
        quote: "Best haircut I've had in years. The team actually listens to what you want instead of just doing their own thing.",
        name: 'Maria T.',
        meta: 'Signature haircut · Downtown Studio'
      },
      {
        quote: "My balayage came out exactly like the photo I brought in. Three months later it's still growing out beautifully.",
        name: 'Jasmine R.',
        meta: 'Balayage · Downtown Studio'
      },
      {
        quote: "Clean, relaxing space and they always start on time. I'm in and out on my lunch break without feeling rushed.",
        name: 'Devon K.',
        meta: 'Men’s cut · Downtown Studio'
      },
      {
        quote: "They talked me out of a color that would have wrecked my hair and suggested something better. That honesty earned my trust.",
        name: 'Priya N.',
        meta: 'Color consultation · Downtown Studio'
      },
      {
        quote: "The keratin treatment completely changed my mornings. My routine went from forty minutes down to about ten.",
        name: 'Alicia M.',
        meta: 'Keratin smoothing · Downtown Studio'
      },
      {
        quote: "Booked for my wedding party and every single one of us looked incredible. They kept the whole morning on schedule.",
        name: 'Rachel B.',
        meta: 'Special occasion styling · Downtown Studio'
      }
    ];

    var revQuote = document.getElementById('rev-quote');
    var revName = document.getElementById('rev-name');
    var revMeta = document.getElementById('rev-meta');
    var revCurrent = document.getElementById('rev-current');
    var revIndex = 0;

    document.getElementById('rev-total').textContent = reviews.length;

    function showReview(index) {
      revIndex = (index % reviews.length + reviews.length) % reviews.length;
      var review = reviews[revIndex];

      revBody.classList.add('is-swapping');

      setTimeout(function () {
        revQuote.textContent = '"' + review.quote + '"';
        revName.textContent = review.name;
        revMeta.textContent = review.meta;
        revCurrent.textContent = revIndex + 1;
        revBody.classList.remove('is-swapping');
      }, 200);
    }

    document.getElementById('rev-next').addEventListener('click', function () {
      showReview(revIndex + 1);
    });

    document.getElementById('rev-prev').addEventListener('click', function () {
      showReview(revIndex - 1);
    });
  }

  var svcGrid = document.getElementById('svc-grid');
  if (svcGrid) {
    var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.svc-filter'));
    var svcCards = Array.prototype.slice.call(svcGrid.querySelectorAll('.svc-card'));
    var svcEmpty = document.getElementById('svc-empty');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        var shown = 0;

        filterBtns.forEach(function (other) {
          var isActive = other === btn;
          other.classList.toggle('is-active', isActive);
          other.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        svcCards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-cat') === filter;
          card.classList.toggle('is-hidden', !match);
          if (match) shown++;
        });

        if (svcEmpty) svcEmpty.hidden = shown > 0;
      });
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
      { name: 'Beach Waves', price: '$200' },
      { name: 'Layered Shag', price: '$190' }
    ];

    var gradients = [
      'linear-gradient(135deg, #EC4899, #8B5CF6)',
      'linear-gradient(135deg, #F9A8D4, #EC4899)',
      'linear-gradient(135deg, #C4B5FD, #8B5CF6)',
      'linear-gradient(135deg, #8B5CF6, #5B21B6)',
      'linear-gradient(135deg, #FBCFE8, #EC4899)',
      'linear-gradient(135deg, #F472B6, #C026D3)',
      'linear-gradient(135deg, #F9A8D4, #DB2777)'
    ];

    var images = [
      'https://placehold.co/400x600/8B5CF6/FFFFFF?text=Classic+Bob',
      'https://placehold.co/400x600/EC4899/FFFFFF?text=Soft+Waves',
      'https://placehold.co/400x600/8B5CF6/FFFFFF?text=Sleek+Straight',
      'https://placehold.co/400x600/5B21B6/FFFFFF?text=Voluminous+Curls',
      'https://placehold.co/400x600/EC4899/FFFFFF?text=Pixie+Cut',
      'https://placehold.co/400x600/C026D3/FFFFFF?text=Beach+Waves',
      'https://placehold.co/400x600/DB2777/FFFFFF?text=Layered+Shag'
    ];

    var thumbs = Array.prototype.slice.call(document.querySelectorAll('.wig-thumb'));
    var centerMedia = document.getElementById('wig-center-media');
    var centerImg = document.getElementById('wig-center-img');
    var centerLabel = document.getElementById('wig-center-label');
    var priceEl = document.getElementById('wig-price');
    var announceEl = document.getElementById('wig-announce');
    var stageEl = document.getElementById('wig-stage');

    var centerEl = document.getElementById('wig-center');
    var thumbsEl = document.getElementById('wig-thumbs');
    var total = styles.length;
    var half = Math.floor(total / 2);
    var activeIndex = 0;

    function showStyle(index, animate) {
      activeIndex = index;
      var style = styles[index];

      centerMedia.style.background = gradients[index];
      centerImg.src = images[index];
      centerImg.alt = 'Model wearing the ' + style.name + ' style';
      centerLabel.textContent = style.name;
      priceEl.textContent = style.price;
      announceEl.textContent = 'Now viewing: ' + style.name + ', from ' + style.price;

      if (animate) {
        centerMedia.classList.remove('is-swapping');
        void centerMedia.offsetWidth;
        centerMedia.classList.add('is-swapping');
      }

      thumbs.forEach(function (thumb) {
        var i = parseInt(thumb.getAttribute('data-index'), 10);

        // Signed distance from the active card, wrapped to [-half, half],
        // so the whole arc rotates by one seat per step.
        var rel = ((i - index) % total + total) % total;
        if (rel > half) rel -= total;

        thumb.style.setProperty('--slot', rel);
        thumb.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
    }

    function goToNext() {
      showStyle((activeIndex + 1) % total, true);
    }

    function goToPrev() {
      showStyle((activeIndex - 1 + total) % total, true);
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        showStyle(parseInt(thumb.getAttribute('data-index'), 10), true);
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

    // Pointer parallax: the arc drifts one way, the hero card leans the
    // other, which reads as depth between the two planes.
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var desktop = window.matchMedia('(min-width: 768px)');
    var parallaxFrame = null;

    function resetParallax() {
      centerEl.style.setProperty('--px', '0px');
      centerEl.style.setProperty('--py', '0px');
      centerEl.style.setProperty('--rx', '0deg');
      centerEl.style.setProperty('--ry', '0deg');
      thumbsEl.style.setProperty('--tx', '0px');
      thumbsEl.style.setProperty('--ty', '0px');
    }

    stageEl.addEventListener('mousemove', function (e) {
      if (reducedMotion.matches || !desktop.matches) return;
      if (parallaxFrame) return;

      parallaxFrame = requestAnimationFrame(function () {
        parallaxFrame = null;
        var rect = stageEl.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        centerEl.style.setProperty('--px', (x * 34).toFixed(1) + 'px');
        centerEl.style.setProperty('--py', (y * 20).toFixed(1) + 'px');
        centerEl.style.setProperty('--ry', (x * 10).toFixed(1) + 'deg');
        centerEl.style.setProperty('--rx', (y * -7).toFixed(1) + 'deg');
        thumbsEl.style.setProperty('--tx', (x * -26).toFixed(1) + 'px');
        thumbsEl.style.setProperty('--ty', (y * -14).toFixed(1) + 'px');
      });
    });

    stageEl.addEventListener('mouseleave', resetParallax);

    showStyle(0, false);
  }
});
