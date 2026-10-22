(() => {
  'use strict';
  document.documentElement.classList.add('js-ready');

  const welcome = document.getElementById('welcome');
  const startButton = document.getElementById('startExperience');
  const introPlayer = document.getElementById('introPlayer');
  const introVideo = document.getElementById('introVideo');
  const introSound = document.getElementById('introSound');
  const introSoundText = document.getElementById('introSoundText');
  const skipIntro = document.getElementById('skipIntro');
  const introProgress = document.getElementById('introProgress');
  const introCounter = document.querySelector('.film-counter');
  const artworkSection = document.getElementById('artwork');
  const artworkVideo = document.getElementById('artworkVideo');
  const artworkSound = document.getElementById('artworkSound');
  const artworkSoundText = document.getElementById('artworkSoundText');
  const siteNav = document.getElementById('siteNav');
  const menuToggle = document.getElementById('menuToggle');
  let introFinished = false;

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '00';
    return String(Math.floor(seconds)).padStart(2, '0');
  };

  function setIntroSound(muted) {
    introVideo.muted = muted;
    introSound.setAttribute('aria-pressed', String(muted));
    introSound.setAttribute('aria-label', muted ? 'Turn intro audio on' : 'Mute intro audio');
    introSoundText.textContent = muted ? 'Sound off' : 'Sound on';
  }

  function openIntro() {
    document.body.classList.add('no-scroll');
    welcome.classList.add('is-dismissed');
    introPlayer.classList.add('is-active');
    introPlayer.setAttribute('aria-hidden', 'false');
    introPlayer.inert = false;
    // Start with sound after the visitor's explicit click; fall back to muted if the browser blocks it.
    setIntroSound(false);
    const playPromise = introVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setIntroSound(true);
        introVideo.play().catch(() => {
          // Poster, skip button, and controls remain available if playback is blocked.
        });
      });
    }
  }

  function leaveIntro() {
    if (introFinished) return;
    introFinished = true;
    introVideo.pause();
    introPlayer.classList.remove('is-active');
    introPlayer.setAttribute('aria-hidden', 'true');
    introPlayer.inert = true;
    document.body.classList.remove('no-scroll');
    // If the artwork video has not started on a constrained mobile browser, try again here.
    artworkVideo.play().catch(() => {});
    window.setTimeout(() => {
      artworkSection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }, 100);
  }

  startButton.addEventListener('click', openIntro);
  skipIntro.addEventListener('click', leaveIntro);
  introVideo.addEventListener('ended', leaveIntro);
  introSound.addEventListener('click', () => setIntroSound(!introVideo.muted));

  introVideo.addEventListener('timeupdate', () => {
    if (!Number.isFinite(introVideo.duration) || introVideo.duration <= 0) return;
    introProgress.style.width = `${Math.min(100, introVideo.currentTime / introVideo.duration * 100)}%`;
    introCounter.textContent = `${formatTime(introVideo.currentTime)} / ${formatTime(introVideo.duration)}`;
  });
  introVideo.addEventListener('loadedmetadata', () => {
    introCounter.textContent = `00 / ${formatTime(introVideo.duration)}`;
  });
  introVideo.addEventListener('error', () => {
    // Keep navigation available even if media cannot be decoded.
    if (introPlayer.classList.contains('is-active')) {
      const fallback = document.createElement('p');
      fallback.className = 'media-fallback';
      fallback.textContent = 'The film could not load. Continue to the artwork below.';
      const bottom = introPlayer.querySelector('.intro-player-bottom');
      if (bottom && !bottom.querySelector('.media-fallback')) bottom.prepend(fallback);
    }
  });

  artworkSound.addEventListener('click', () => {
    artworkVideo.muted = !artworkVideo.muted;
    const isMuted = artworkVideo.muted;
    artworkSound.setAttribute('aria-pressed', String(!isMuted));
    artworkSound.setAttribute('aria-label', isMuted ? 'Turn artwork video sound on' : 'Mute artwork video sound');
    artworkSoundText.textContent = isMuted ? 'Sound off' : 'Sound on';
    if (!isMuted) artworkVideo.play().catch(() => {});
  });
  // The artwork loops silently at first to avoid surprise audio, but the visitor can enable its track.
  artworkVideo.muted = true;

  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });

  // Reveal content as it enters the viewport, with a no-IntersectionObserver fallback.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Smooth anchor links except where reduced-motion is requested.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      const target = id && document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
