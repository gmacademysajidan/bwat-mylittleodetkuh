// ============================================================
//  MESSAGES (8 Halaman Surat - Mempertahankan Emoji Teks Asli)
// ============================================================
const messages = [
  {
    text: "Haii.. 😁 kenalin ini Jidan, hehe maaf yaa... atas kelalaian ku sendiri tadi. Aku emang ada niatan ngajak mabar sama kamu kok — tadi aku juga coba pake laptop 😏🤔 ... tapii...",
    showHug: false
  },
  {
    text: "Tiba tiba loading berat... 😥 Aku bener bener minta maaf yaa... Makasih ya udah nyempetin waktu buat mabar sama aku, tapi aku kurang menghargai kamu.. untuk hari ini.",
    showHug: false
  },
  {
    text: "Amuu udah effort banget.. Akuu tau kamu cape kalo digitiuin terus... Peluk jauh yaa.. 💗",
    showHug: true
  },
  {
    text: "Setiap kali mabar aku yang selalu ada kendala.. Bukan berarti aku sengaja.. Aku main sama kamu udah cukup berarti buat aku.. 😏",
    showHug: false
  },
  {
    text: "Maafin temen mu yang teledor gini yaa.. Walaupun aku ngomong gini aku tetep mau berubah lebih baik... Aku juga ngga mau bikin kamu cape di effort 🙃",
    showHug: false
  },
  {
    text: "Jujur... Kamu salah satu seseorang yang punya sabar sebesar itu. Orang tua kamu dan orang yang menyanyangimu pasti bangga banget punya seseorang yang sesabar kamu 💗",
    showHug: true
  },
  {
    text: "Walaupun gituu kamu juga pasti ada cape nya, tetep semangat yaa... Semoga kamu selalu dikelilingi orang yang mendukungmu dan dikelilingi orang yang baik, semangat terus..! ✨",
    showHug: false
  },
  {
    text: "Kalo emang ada unek-unek tentang apapun ceritain aja yaa... Aku siap dengerin 😊 💗",
    showHug: false
  }
];

let currentIndex = 0;
let courierTriggered = false;

// ============================================================
//  DOM CONTENT LOADED
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  createAmbientParticles();
  createStars();
  initMusicPlayer();
  initEnvelope();
  initDots();
  initSlider();
  initSwipeGesture();
});

// ============================================================
//  BACKGROUND AMBIENT (No Emojis)
// ============================================================
function createAmbientParticles() {
  const container = document.getElementById('particlesBg');
  if (!container) return;
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement('div');
    dot.className = 'ambient-dot';
    const size = 6 + Math.random() * 12;
    dot.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${12 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(dot);
  }
}

function createStars() {
  const container = document.getElementById('starsBg');
  if (!container) return;
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star-dot';
    const sz = 1.2 + Math.random() * 2.2;
    star.style.cssText = `
      width: ${sz}px;
      height: ${sz}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation-duration: ${2.5 + Math.random() * 3.5}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    container.appendChild(star);
  }
}

// ============================================================
//  AUDIO & BACKSOUND PLAYER
// ============================================================
let audioCtxActive = false;

function initMusicPlayer() {
  const bgAudio = document.getElementById('bgAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const player = document.getElementById('musicPlayer');
  const uploadInput = document.getElementById('musicUploadInput');
  const titleSpan = document.getElementById('musicTitle');

  if (!bgAudio || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        player.classList.add('playing');
        audioCtxActive = true;
      }).catch(err => {
        console.log("Audio play blocked", err);
      });
    } else {
      bgAudio.pause();
      player.classList.remove('playing');
    }
  });

  // User upload custom song
  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        bgAudio.src = fileUrl;
        bgAudio.play().then(() => {
          player.classList.add('playing');
          audioCtxActive = true;
          if (titleSpan) {
            titleSpan.textContent = file.name.length > 14 ? file.name.substring(0, 11) + '...' : file.name;
          }
          showToast('Lagu pilihanmu berhasil diputar');
        }).catch(err => console.log(err));
      }
    });
  }
}

function tryPlayAudio() {
  const bgAudio = document.getElementById('bgAudio');
  const player = document.getElementById('musicPlayer');
  if (bgAudio && bgAudio.paused && !audioCtxActive) {
    bgAudio.play().then(() => {
      if (player) player.classList.add('playing');
      audioCtxActive = true;
    }).catch(err => {
      console.log("Autoplay waiting for interaction:", err);
    });
  }
}

// ============================================================
//  ENVELOPE OPENING
// ============================================================
function initEnvelope() {
  const envWrapper = document.getElementById('envWrapper');
  if (!envWrapper) return;

  envWrapper.addEventListener('click', openEnvelope, { once: true });
}

function openEnvelope() {
  tryPlayAudio();

  const flap = document.getElementById('envFlapTop');
  const peek = document.getElementById('letterPeek');
  const hint = document.getElementById('envHint');
  const wax  = document.getElementById('waxSeal');

  if (wax) {
    wax.style.transition = 'transform 0.35s, opacity 0.4s';
    wax.style.transform = 'scale(1.3) rotate(15deg)';
    wax.style.opacity = '0';
  }

  setTimeout(() => {
    if (flap) flap.classList.add('open');
    setTimeout(() => {
      if (peek) peek.classList.add('show');
    }, 350);
    if (hint) {
      hint.style.transition = 'opacity 0.4s';
      hint.style.opacity = '0';
    }
  }, 180);

  setTimeout(showLetterPage, 1400);
}

function showLetterPage() {
  const envScene = document.getElementById('envelopeScene');
  const letterPage = document.getElementById('letterPage');

  if (envScene) {
    envScene.style.transition = 'opacity 0.6s ease';
    envScene.style.opacity = '0';
  }

  setTimeout(() => {
    if (envScene) envScene.style.display = 'none';
    if (letterPage) letterPage.classList.add('visible');
    // Load page 0 immediately
    displayMessage(0);
  }, 600);
}

// ============================================================
//  PAGINATION & DISPLAY MESSAGE
// ============================================================
function initDots() {
  const container = document.getElementById('pageDots');
  if (!container) return;
  container.innerHTML = '';

  messages.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `page-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('title', `Halaman ${idx + 1}`);
    dot.addEventListener('click', () => {
      displayMessage(idx);
    });
    container.appendChild(dot);
  });

  const prevBtn = document.getElementById('prevPageBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        displayMessage(currentIndex - 1);
      }
    });
  }
}

function displayMessage(index) {
  if (index < 0 || index >= messages.length) return;
  currentIndex = index;

  const body = document.getElementById('letterBody');
  const hugAnim = document.getElementById('hugAnim');
  const pageNum = document.getElementById('currentPageNum');
  const prevBtn = document.getElementById('prevPageBtn');
  const sliderText = document.getElementById('swipeSliderText');
  const msg = messages[index];

  if (pageNum) pageNum.textContent = index + 1;
  if (prevBtn) prevBtn.disabled = (index === 0);

  // Update slider prompt on final page
  if (sliderText) {
    if (index === messages.length - 1) {
      sliderText.innerHTML = 'Geser ke kanan untuk kiriman kurir &rarr;';
    } else {
      sliderText.innerHTML = 'Geser ke kanan untuk halaman berikutnya &rarr;';
    }
  }

  // Update dots
  const dots = document.querySelectorAll('.page-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    if (i < index) dot.classList.add('read');
  });

  // Animate text update
  if (body) {
    body.style.opacity = '0';
    body.style.transform = 'translateY(6px)';

    setTimeout(() => {
      body.innerHTML = `
        <p class="letter-msg-text">${msg.text}</p>
      `;
      body.style.opacity = '1';
      body.style.transform = 'translateY(0)';
    }, 200);
  }

  // Hug visual
  if (hugAnim) {
    hugAnim.classList.remove('show');
    if (msg.showHug) {
      setTimeout(() => hugAnim.classList.add('show'), 350);
    }
  }

  // If reaching last message, prepare or notify
  if (index === messages.length - 1 && !courierTriggered) {
    // When last page is opened, show subtle hint
    setTimeout(() => {
      showToast('Halaman terakhir dibuka · Geser sekali lagi untuk kejutan kurir');
    }, 600);
  }
}

// ============================================================
//  SINGLE SEQUENTIAL SLIDER (Geser ke Kanan)
// ============================================================
function initSlider() {
  const track = document.getElementById('swipeSliderTrack');
  const thumb = document.getElementById('swipeSliderThumb');
  const fill = document.getElementById('swipeProgressFill');
  const text = document.getElementById('swipeSliderText');

  if (!track || !thumb) return;

  let isDragging = false;
  let startX = 0;
  let currentTranslateX = 0;

  function getMaxDistance() {
    return track.offsetWidth - thumb.offsetWidth - 8;
  }

  // Pointer Events (Mouse + Touch unified)
  thumb.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    thumb.setPointerCapture(e.pointerId);
    thumb.style.transition = 'none';
    if (fill) fill.style.transition = 'none';
  });

  thumb.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const maxDist = getMaxDistance();

    if (deltaX < 0) {
      currentTranslateX = 0;
    } else if (deltaX > maxDist) {
      currentTranslateX = maxDist;
    } else {
      currentTranslateX = deltaX;
    }

    thumb.style.transform = `translateX(${currentTranslateX}px)`;
    if (fill) fill.style.width = `${currentTranslateX + thumb.offsetWidth / 2}px`;

    const progress = currentTranslateX / maxDist;
    if (text) {
      text.style.opacity = Math.max(0.1, 1 - progress * 1.4);
    }
  });

  function handleRelease(e) {
    if (!isDragging) return;
    isDragging = false;

    try {
      thumb.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const maxDist = getMaxDistance();
    const progress = currentTranslateX / maxDist;

    // Threshold 65% of track triggers next
    if (progress >= 0.65) {
      // Completed swipe to right
      triggerNextStep();
    }

    // Smoothly snap thumb back
    thumb.style.transition = 'transform 0.3s cubic-bezier(.34,1.56,.64,1)';
    thumb.style.transform = 'translateX(0px)';
    if (fill) {
      fill.style.transition = 'width 0.3s ease';
      fill.style.width = '0px';
    }
    if (text) {
      text.style.opacity = '1';
    }
    currentTranslateX = 0;
  }

  thumb.addEventListener('pointerup', handleRelease);
  thumb.addEventListener('pointercancel', handleRelease);

  // Click on track also advances
  track.addEventListener('click', (e) => {
    if (e.target === thumb || thumb.contains(e.target)) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    if (clickX > rect.width * 0.55) {
      triggerNextStep();
    }
  });
}

function triggerNextStep() {
  if (currentIndex < messages.length - 1) {
    displayMessage(currentIndex + 1);
  } else {
    // Reached end: trigger Courier arrival
    triggerCourierArrival();
  }
}

// ============================================================
//  TOUCH SWIPE GESTURE ON LETTER PAPER (Left/Right)
// ============================================================
function initSwipeGesture() {
  const paper = document.getElementById('letterPaper');
  if (!paper) return;

  let touchStartX = 0;
  let touchEndX = 0;

  paper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  paper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  }, { passive: true });

  function handleGesture() {
    const diff = touchEndX - touchStartX;
    if (diff < -50) {
      // Swiped left -> Next page
      triggerNextStep();
    } else if (diff > 50) {
      // Swiped right -> Prev page
      if (currentIndex > 0) {
        displayMessage(currentIndex - 1);
      }
    }
  }
}

// ============================================================
//  COURIER ARRIVAL & FEEDBACK SECTION
// ============================================================
function triggerCourierArrival() {
  const courierSection = document.getElementById('courierSection');
  const van = document.getElementById('courierVan');
  const man = document.getElementById('courierMan');

  if (!courierSection) return;

  courierSection.classList.add('show');
  courierSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

  if (courierTriggered) return;
  courierTriggered = true;

  // Van drives in
  setTimeout(() => {
    if (van) van.classList.add('drive-in');
  }, 300);

  // Kang Kurir steps out with package
  setTimeout(() => {
    if (man) man.classList.add('show-man');
    showToast('Ada kiriman paket khusus dari kurir untukmu');
  }, 2600);
}

// ============================================================
//  FEEDBACK SUBMISSION
// ============================================================
function handleSendFeedback(e) {
  e.preventDefault();
  const textarea = document.getElementById('feedbackText');
  const successBox = document.getElementById('feedbackSuccess');
  const form = document.getElementById('feedbackForm');

  if (!textarea) return;
  const content = textarea.value.trim();
  if (!content) return;

  // Save to localStorage
  try {
    const stored = JSON.parse(localStorage.getItem('jidan_unek_unek') || '[]');
    stored.push({
      date: new Date().toISOString(),
      message: content
    });
    localStorage.setItem('jidan_unek_unek', JSON.stringify(stored));
  } catch (err) {
    console.log(err);
  }

  // Hide form, show warm confirmation
  if (form) form.style.display = 'none';
  if (successBox) successBox.classList.add('show');

  showToast('Terima kasih banyak sudah mau berbagi cerita');

  // Add optional direct WhatsApp action button for convenience
  const actions = document.createElement('div');
  actions.style.marginTop = '18px';
  actions.style.display = 'flex';
  actions.style.justifyContent = 'center';
  actions.style.gap = '10px';

  const waBtn = document.createElement('a');
  waBtn.href = `https://wa.me/?text=${encodeURIComponent('Hai Jidan, ini unek-unek dari aku: ' + content)}`;
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.className = 'submit-feedback-btn';
  waBtn.style.textDecoration = 'none';
  waBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  waBtn.textContent = 'Kirim juga ke WhatsApp Jidan';

  actions.appendChild(waBtn);
  successBox.appendChild(actions);
}

// ============================================================
//  TOAST MESSAGE (Clean, No Emojis)
// ============================================================
let toastTimer;
function showToast(msg) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
