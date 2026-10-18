// ============================================================
//  KONFIGURASI TUJUAN PESAN (GMAIL JIDAN)
// ============================================================
const TARGET_EMAIL = "sajidanmuhammad56@gmail.com";

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
  initAlbumMusic();
  initKaraokeMode();
  initEnvelope();
  initDots();
  initSlider();
  initSwipeGesture();
  initMiniGame();
  initEasterEgg();
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

function updateTitleFromSrc(src) {
  const titleSpan = document.getElementById('musicTitle');
  if (!titleSpan || !src) return;
  try {
    const rawName = decodeURIComponent(src.split('/').pop().split('?')[0]);
    // Bersihkan ekstensi dan prefix umum
    let cleanName = rawName.replace(/\.(mp3|wav|ogg|m4a)$/i, '');
    if (cleanName.length > 18) {
      cleanName = cleanName.substring(0, 16) + '...';
    }
    titleSpan.textContent = cleanName;
  } catch (_) {}
}

function initMusicPlayer() {
  const bgAudio = document.getElementById('bgAudio');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const player = document.getElementById('musicPlayer');
  const uploadInput = document.getElementById('musicUploadInput');
  const titleSpan = document.getElementById('musicTitle');

  if (!bgAudio || !toggleBtn) return;

  // Deteksi file lagu aktif yang berhasil dimuat browser
  bgAudio.addEventListener('loadeddata', () => {
    if (bgAudio.currentSrc) {
      updateTitleFromSrc(bgAudio.currentSrc);
    }
  });

  toggleBtn.addEventListener('click', () => {
    if (bgAudio.paused) {
      bgAudio.play().then(() => {
        player.classList.add('playing');
        document.body.classList.add('is-music-playing');
        syncCassettePlayState(true);
        audioCtxActive = true;
      }).catch(err => {
        console.log("Audio play blocked", err);
      });
    } else {
      bgAudio.pause();
      player.classList.remove('playing');
      document.body.classList.remove('is-music-playing');
      syncCassettePlayState(false);
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
            titleSpan.textContent = file.name.length > 16 ? file.name.substring(0, 14) + '...' : file.name;
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
      document.body.classList.add('is-music-playing');
      syncCassettePlayState(true);
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
//  FEEDBACK SUBMISSION (LANGSUNG TERKIRIM KE GMAIL JIDAN)
// ============================================================
async function handleSendFeedback(e) {
  e.preventDefault();
  const textarea = document.getElementById('feedbackText');
  const successBox = document.getElementById('feedbackSuccess');
  const form = document.getElementById('feedbackForm');
  const sendBtn = document.getElementById('sendBtn');

  if (!textarea) return;
  const content = textarea.value.trim();
  if (!content) return;

  // Ubah status tombol saat mengirim
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<span>Sedang Mengirimkan...</span>`;
  }

  // Backup simpan di browser
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

  // Kirim langsung ke Gmail Jidan via FormSubmit
  try {
    await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: "Unek-Unek Khusus Buat Jidan (Dari Website Surat)",
        _template: "table",
        _captcha: "false",
        "Pesan Unek-Unek": content,
        "Waktu Kirim": new Date().toLocaleString("id-ID")
      })
    });
  } catch (err) {
    console.log("Kirim email latar belakang:", err);
  }

  // Tampilkan konfirmasi sukses yang hangat di halaman
  if (form) form.style.display = 'none';
  if (successBox) successBox.classList.add('show');

  showToast('Ceritamu sudah tersampaikan ke Jidan, makasih ya');
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

// ============================================================
//  MINI GAME INTERACTION (RUNAWAY BUTTON & CLAIM COUPON)
// ============================================================
function initMiniGame() {
  const btnNo = document.getElementById('btnForgiveNo');
  const btnYes = document.getElementById('btnForgiveYes');
  const rewardArea = document.getElementById('rewardArea');
  const buttonsArea = document.getElementById('gameButtonsArea');

  if (!btnNo || !btnYes) return;

  const teasingTexts = [
    "Engga Dulu",
    "Eitss, meleset :p",
    "Yakin gamau maafin?",
    "Tombolnya licin nih...",
    "Gabisa dipencet lohh",
    "Tuh kan kabur lagi",
    "Pencet yang hijau aja hehe"
  ];
  let textIndex = 0;
  let moveCount = 0;

  function moveButton(e) {
    if (e && e.cancelable) e.preventDefault();
    moveCount++;

    // Hitung posisi acak di dalam batas container
    const areaRect = buttonsArea.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxX = (areaRect.width / 2) - (btnRect.width / 2) - 10;
    const maxY = 35;

    // Gerak acak kiri/kanan dan atas/bawah
    const randomX = (Math.random() * (maxX * 2)) - maxX;
    const randomY = (Math.random() * (maxY * 2)) - maxY;

    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Ganti teks secara berurutan
    textIndex = (textIndex + 1) % teasingTexts.length;
    btnNo.querySelector('span').textContent = teasingTexts[textIndex];

    // Buat tombol "Iya, Dimaafin" sedikit membesar setiap kali tombol "Engga" dicoba diklik
    const currentScale = Math.min(1.35, 1 + (moveCount * 0.05));
    btnYes.style.transform = `scale(${currentScale})`;
  }

  // Kompatibel untuk mouse hover & touch di HP
  btnNo.addEventListener('mouseenter', moveButton);
  btnNo.addEventListener('touchstart', moveButton, { passive: false });
  btnNo.addEventListener('click', moveButton);

  // Klik tombol "Iya, Dimaafin"
  btnYes.addEventListener('click', () => {
    btnNo.style.display = 'none';
    btnYes.style.transform = 'scale(1)';
    btnYes.disabled = true;
    btnYes.querySelector('span').textContent = 'Sudah Dimaafin';

    if (rewardArea) {
      rewardArea.classList.add('show');
      rewardArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showToast('Makasih banyak ya sudah mau maafin temenmu ini');
  });
}

// Klaim Kupon Kompensasi
let claimedAny = false;
function claimCoupon(title, element) {
  if (claimedAny && element.classList.contains('claimed')) return;

  // Hapus tanda claimed dari kupon lain
  document.querySelectorAll('.coupon-item').forEach(c => c.classList.remove('claimed'));

  // Beri stempel klaim ke kupon yang dipilih
  element.classList.add('claimed');
  claimedAny = true;

  const statusEl = document.getElementById('couponStatus');
  if (statusEl) {
    statusEl.innerHTML = `Selamat! Kamu berhasil klaim <b>${title}</b>. Screenshot halaman ini ya buat ditagih ke Jidan`;
  }

  showToast(`Kupon berhasil diklaim: ${title}`);

  // Simpan kupon yang diklaim di localStorage
  try {
    localStorage.setItem('jidan_claimed_coupon', title);
  } catch (_) {}
}

// ============================================================
//  EASTER EGG (SURAT RAHASIA)
// ============================================================
function initEasterEgg() {
  const secretStampBtn = document.getElementById('secretStampBtn');
  const secretHeartBtn = document.getElementById('secretHeartBtn');
  const secretModal = document.getElementById('secretModalOverlay');
  const secretModalClose = document.getElementById('secretModalClose');
  const secretCloseBtn = document.getElementById('secretCloseBtn');

  function openSecretLetter(e) {
    if (e) e.preventDefault();
    if (!secretModal) return;
    secretModal.classList.add('active');
    secretModal.setAttribute('aria-hidden', 'false');
    showToast('Kamu menemukan surat rahasia... ✨');
  }

  function closeSecretLetter() {
    if (!secretModal) return;
    secretModal.classList.remove('active');
    secretModal.setAttribute('aria-hidden', 'true');
  }

  if (secretStampBtn) {
    secretStampBtn.addEventListener('click', openSecretLetter);
  }

  if (secretHeartBtn) {
    secretHeartBtn.addEventListener('click', openSecretLetter);
  }

  if (secretModalClose) {
    secretModalClose.addEventListener('click', closeSecretLetter);
  }

  if (secretCloseBtn) {
    secretCloseBtn.addEventListener('click', closeSecretLetter);
  }

  if (secretModal) {
    // Klik di latar belakang / overlay luar kartu untuk menutup
    secretModal.addEventListener('click', (e) => {
      if (e.target === secretModal) {
        closeSecretLetter();
      }
    });
  }

  // Support tombol Escape untuk menutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && secretModal && secretModal.classList.contains('active')) {
      closeSecretLetter();
    }
  });
}

// ============================================================
//  ALBUM MUSIK (POJOK KIRI) & CASSETTE PLAYLIST SYSTEM
// ============================================================
const cassetteList = [
  {
    id: "lalu-biru",
    title: "Lalu Biru x Panasea",
    artist: "Eleanor Whisper ft. RumahSakit",
    tag: "Kaset 01",
    src: "[Tiktok Version] Lalu Biru x Panasea - Eleanor Whisper ft. RumahSakit (Lyrics Video) - anotherpiece.mp3"
  },
  {
    id: "vierra-seandainya",
    title: "Seandainya",
    artist: "Vierra",
    tag: "Kaset 02",
    src: "Seandainya - Vierra (Official Audio Video).mp3"
  },
  {
    id: "lagu-custom",
    title: "Lagu Khusus (Folder)",
    artist: "lagu.mp3 / music.mp3",
    tag: "Kaset 03",
    src: "lagu.mp3"
  }
];

let currentCassetteId = "lalu-biru";

function initAlbumMusic() {
  const albumBtn = document.getElementById('musicAlbumBtn');
  const albumOverlay = document.getElementById('musicAlbumOverlay');
  const albumCloseBtn = document.getElementById('musicAlbumCloseBtn');
  const cassetteGrid = document.getElementById('cassetteGrid');
  const bgAudio = document.getElementById('bgAudio');

  // Render cards kaset
  if (cassetteGrid) {
    cassetteGrid.innerHTML = '';
    cassetteList.forEach((cassette) => {
      const card = document.createElement('div');
      card.className = `cassette-card ${cassette.id === currentCassetteId ? 'active' : ''}`;
      card.dataset.id = cassette.id;
      card.innerHTML = `
        <div class="cassette-tape-graphic">
          <div class="cassette-wheel"></div>
          <div class="cassette-wheel"></div>
        </div>
        <div class="cassette-info">
          <div class="cassette-tag">${cassette.tag}</div>
          <div class="cassette-title">${cassette.title}</div>
          <div class="cassette-artist">${cassette.artist}</div>
        </div>
        <div class="cassette-status">
          <div class="cassette-play-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        playCassette(cassette.id);
      });

      cassetteGrid.appendChild(card);
    });
  }

  // Buka / Tutup Drawer
  function openAlbum() {
    if (!albumOverlay) return;
    albumOverlay.classList.add('active');
    albumOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeAlbum() {
    if (!albumOverlay) return;
    albumOverlay.classList.remove('active');
    albumOverlay.setAttribute('aria-hidden', 'true');
  }

  if (albumBtn) albumBtn.addEventListener('click', openAlbum);
  if (albumCloseBtn) albumCloseBtn.addEventListener('click', closeAlbum);

  if (albumOverlay) {
    albumOverlay.addEventListener('click', (e) => {
      if (e.target === albumOverlay) {
        closeAlbum();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && albumOverlay && albumOverlay.classList.contains('active')) {
      closeAlbum();
    }
  });

  // Sinkronisasi status kaset awal dengan lagu yang sedang aktif
  if (bgAudio) {
    bgAudio.addEventListener('play', () => {
      document.body.classList.add('is-music-playing');
      syncCassettePlayState(true);
    });
    bgAudio.addEventListener('pause', () => {
      document.body.classList.remove('is-music-playing');
      syncCassettePlayState(false);
    });
  }
}

function playCassette(id) {
  const cassette = cassetteList.find(c => c.id === id);
  const bgAudio = document.getElementById('bgAudio');
  const player = document.getElementById('musicPlayer');
  const titleSpan = document.getElementById('musicTitle');

  if (!cassette || !bgAudio) return;

  currentCassetteId = id;
  bgAudio.src = cassette.src;

  bgAudio.play().then(() => {
    if (player) player.classList.add('playing');
    document.body.classList.add('is-music-playing');
    audioCtxActive = true;
    if (titleSpan) {
      titleSpan.textContent = cassette.title.length > 16 ? cassette.title.substring(0, 14) + '...' : cassette.title;
    }
    syncCassettePlayState(true);
    showToast(`Memutar: ${cassette.title}`);
  }).catch(err => {
    console.log("Audio play error:", err);
    showToast(`Memutar kaset: ${cassette.title}`);
  });

  // Jika overlay karaoke sedang aktif, refresh lirik langsung
  const karaokeOverlay = document.getElementById('karaokeOverlay');
  if (karaokeOverlay && karaokeOverlay.classList.contains('active')) {
    loadActiveLyrics();
  }

  // Update styling kartu aktif
  document.querySelectorAll('.cassette-card').forEach(card => {
    const isThis = card.dataset.id === id;
    card.classList.toggle('active', isThis);
    card.classList.toggle('is-playing', isThis);
  });
}

function syncCassettePlayState(isPlaying) {
  document.querySelectorAll('.cassette-card').forEach(card => {
    if (card.dataset.id === currentCassetteId) {
      card.classList.toggle('is-playing', isPlaying);
    } else {
      card.classList.remove('is-playing');
    }
  });
}

// ============================================================
//  REQUEST LAGU (OTOMATIS TERKIRIM LANGSUNG KE GMAIL JIDAN)
// ============================================================
async function handleSendSongRequest(e) {
  e.preventDefault();
  const titleInput = document.getElementById('reqSongTitle');
  const noteInput = document.getElementById('reqSongNote');
  const submitBtn = document.getElementById('reqSongBtn');
  const successBox = document.getElementById('reqSuccessMsg');
  const form = document.getElementById('reqMusicForm');

  if (!titleInput) return;
  const songTitle = titleInput.value.trim();
  const songNote = noteInput ? noteInput.value.trim() : "";

  if (!songTitle) return;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sedang Mengirim Request...</span>`;
  }

  // Backup simpan di browser
  try {
    const stored = JSON.parse(localStorage.getItem('jidan_req_lagu') || '[]');
    stored.push({
      date: new Date().toISOString(),
      song: songTitle,
      note: songNote
    });
    localStorage.setItem('jidan_req_lagu', JSON.stringify(stored));
  } catch (err) {
    console.log(err);
  }

  // Kirim langsung ke Gmail Jidan via FormSubmit
  try {
    await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: "Request Lagu Baru (Dari Album Musik Website Surat)",
        _template: "table",
        _captcha: "false",
        "Judul Lagu Request": songTitle,
        "Catatan Tambahan": songNote || "-",
        "Waktu Request": new Date().toLocaleString("id-ID")
      })
    });
  } catch (err) {
    console.log("Kirim request lagu latar belakang:", err);
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <span>Kirim Request ke Jidan</span>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
  }

  if (form) form.reset();
  if (successBox) {
    successBox.classList.add('show');
    setTimeout(() => {
      successBox.classList.remove('show');
    }, 6000);
  }

  showToast(`Request lagu "${songTitle}" sudah terkirim ke Jidan!`);
}

// ============================================================
//  SYNCHRONIZED KARAOKE & LYRICS SYSTEM (WITH RISING MIC)
// ============================================================
const lyricsDatabase = {
  "lalu-biru": {
    title: "Lalu Biru x Panasea",
    artist: "Eleanor Whisper ft. RumahSakit",
    lines: [
      { time: 0, text: "♪ (Intro Melodi Lalu Biru x Panasea) ♪" },
      { time: 9, text: "Terang selalu dirindukan gelap..." },
      { time: 18, text: "Tenang selalu dirindukan resah..." },
      { time: 27, text: "Dan berlalu wajahmu temani malamku yang penuh rindu" },
      { time: 38, text: "Bisikan tenang terdengar di malam panjangku sayang..." },
      { time: 48, text: "Begitu juga bila... jauh engkau berada..." },
      { time: 58, text: "Bila tubuhku membiru apakah kau datang sayang?" },
      { time: 69, text: "Bulan pun datang tuk merayu kupastikan tak tergantikan" },
      { time: 80, text: "Takkan ku berubah... walau tak bersama..." },
      { time: 91, text: "Kita tak pernah terpisah melintas ruang dan waktu" },
      { time: 102, text: "Selamanya..." },
      { time: 110, text: "Malamku tak bercahaya..." },
      { time: 119, text: "Mimpiku niscaya tak indah..." },
      { time: 129, text: "Tak punya arti terasa binasa..." },
      { time: 139, text: "Berlalu lagu sendu, nyanyikan nada indah..." },
      { time: 150, text: "Dimana dikau (yang tercinta) yang tercinta..." },
      { time: 161, text: "Apakah sang malam mendengarkan kata yang ku ucap?" },
      { time: 172, text: "Walau tak terucap akan terus terdengar" },
      { time: 183, text: "Nyanyian dalam hatimu... dalam angan dan nafasku" },
      { time: 194, text: "Selamanya..." },
      { time: 204, text: "Alam takkan menang... buat tak berdaya..." },
      { time: 216, text: "Melangkah senantiasa... kau panasea bagiku selamanya ✨" }
    ]
  },
  "vierra-seandainya": {
    title: "Seandainya",
    artist: "Vierra",
    lines: [
      { time: 0, text: "♪ (Intro Piano Seandainya - Vierra) ♪" },
      { time: 14, text: "Kelak kau 'kan menjalani hidupmu sendiri..." },
      { time: 27, text: "Melukai kenangan yang t'lah kita lalui..." },
      { time: 41, text: "Yang tersisa hanya aku sendiri di sini..." },
      { time: 54, text: "Kau akan terbang jauh menembus awan" },
      { time: 66, text: "Memulai kisah baru tanpa diriku..." },
      { time: 80, text: "Seandainya kau tahu ku tak ingin kau pergi 🎤" },
      { time: 92, text: "Meninggalkanku sendiri bersama bayanganku..." },
      { time: 105, text: "Seandainya kau tahu aku 'kan selalu cinta..." },
      { time: 118, text: "Jangan kau lupakan kenangan kita s'lama ini..." },
      { time: 132, text: "♪ (Melodi Indah) ♪" },
      { time: 146, text: "Kelak kau 'kan menjalani hidupmu sendiri..." },
      { time: 158, text: "Melukai kenangan yang t'lah kita lalui..." },
      { time: 171, text: "Seandainya kau tahu ku tak ingin kau pergi..." },
      { time: 184, text: "Meninggalkanku sendiri bersama bayanganku..." },
      { time: 197, text: "Seandainya kau tahu aku 'kan selalu cinta..." },
      { time: 210, text: "Jangan kau lupakan kenangan kita s'lama ini... 💗" }
    ]
  },
  "default": {
    title: "Lagu Pilihan",
    artist: "Audio Player",
    lines: [
      { time: 0, text: "♪ Sedang memutar lagu pilihanmu ♪" },
      { time: 10, text: "Bernyanyilah dan nikmati setiap alunannya..." },
      { time: 30, text: "Kapan pun kamu butuh teman cerita atau mabar..." },
      { time: 60, text: "Jidan selalu siap sedia nemenin kamu 😋🗿" },
      { time: 100, text: "♪ Nikmati lagunya yaa ♪" }
    ]
  }
};

let activeLyricIndex = -1;

function initKaraokeMode() {
  const triggerBtn = document.getElementById('karaokeTriggerBtn');
  const overlay = document.getElementById('karaokeOverlay');
  const closeBtn = document.getElementById('karaokeCloseBtn');
  const bgAudio = document.getElementById('bgAudio');
  const playBtn = document.getElementById('karaokePlayBtn');
  const prevBtn = document.getElementById('karaokePrevBtn');
  const nextBtn = document.getElementById('karaokeNextBtn');
  const track = document.getElementById('karaokeTimelineTrack');

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openKaraoke);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeKaraoke);
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeKaraoke();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
      closeKaraoke();
    }
  });

  // Sinkronisasi tombol play di dalam karaoke
  if (playBtn && bgAudio) {
    playBtn.addEventListener('click', () => {
      const player = document.getElementById('musicPlayer');
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          if (player) player.classList.add('playing');
          document.body.classList.add('is-music-playing');
          syncKaraokePlayIcon(true);
          syncCassettePlayState(true);
        }).catch(err => console.log(err));
      } else {
        bgAudio.pause();
        if (player) player.classList.remove('playing');
        document.body.classList.remove('is-music-playing');
        syncKaraokePlayIcon(false);
        syncCassettePlayState(false);
      }
    });
  }

  // Seek mundur 5 detik
  if (prevBtn && bgAudio) {
    prevBtn.addEventListener('click', () => {
      bgAudio.currentTime = Math.max(0, bgAudio.currentTime - 5);
      showToast('Mundur 5 detik');
    });
  }

  // Seek maju 5 detik
  if (nextBtn && bgAudio) {
    nextBtn.addEventListener('click', () => {
      bgAudio.currentTime = Math.min(bgAudio.duration || 9999, bgAudio.currentTime + 5);
      showToast('Maju 5 detik');
    });
  }

  // Klik timeline untuk seek lagu langsung
  if (track && bgAudio) {
    track.addEventListener('click', (e) => {
      const rect = track.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      if (bgAudio.duration) {
        bgAudio.currentTime = ratio * bgAudio.duration;
      }
    });
  }

  // Timeupdate listener untuk sinkronisasi lirik detik demi detik
  if (bgAudio) {
    bgAudio.addEventListener('timeupdate', syncKaraokeProgress);
    bgAudio.addEventListener('play', () => syncKaraokePlayIcon(true));
    bgAudio.addEventListener('pause', () => syncKaraokePlayIcon(false));
  }
}

function openKaraoke() {
  const overlay = document.getElementById('karaokeOverlay');
  const bgAudio = document.getElementById('bgAudio');
  if (!overlay) return;

  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');

  // Mulai audio jika belum berbunyi
  if (bgAudio && bgAudio.paused) {
    bgAudio.play().then(() => {
      const player = document.getElementById('musicPlayer');
      if (player) player.classList.add('playing');
      document.body.classList.add('is-music-playing');
      syncCassettePlayState(true);
    }).catch(err => console.log(err));
  }

  loadActiveLyrics();
  syncKaraokePlayIcon(bgAudio ? !bgAudio.paused : false);
  showToast('Selamat bernyanyi karoke! 🎤✨');
}

function closeKaraoke() {
  const overlay = document.getElementById('karaokeOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
}

function syncKaraokePlayIcon(isPlaying) {
  const playIcon = document.querySelector('.k-icon-play');
  const pauseIcon = document.querySelector('.k-icon-pause');
  if (playIcon && pauseIcon) {
    playIcon.style.display = isPlaying ? 'none' : 'block';
    pauseIcon.style.display = isPlaying ? 'block' : 'none';
  }
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

function loadActiveLyrics() {
  const songTitleEl = document.getElementById('karaokeSongTitle');
  const songArtistEl = document.getElementById('karaokeSongArtist');
  const container = document.getElementById('lyricsScrollContainer');
  const bgAudio = document.getElementById('bgAudio');

  // Tentukan lirik mana yang cocok dengan kaset atau file audio aktif
  let key = currentCassetteId;
  if (!lyricsDatabase[key]) {
    key = "default";
  }

  const data = lyricsDatabase[key];
  if (songTitleEl) songTitleEl.textContent = data.title;
  if (songArtistEl) songArtistEl.textContent = data.artist;

  if (!container) return;
  container.innerHTML = '';
  activeLyricIndex = -1;

  data.lines.forEach((item, index) => {
    const p = document.createElement('p');
    p.className = 'lyric-line';
    p.dataset.time = item.time;
    p.dataset.index = index;
    p.textContent = item.text;

    // Klik baris lirik untuk langsung lompat ke detik tersebut!
    p.addEventListener('click', () => {
      if (bgAudio) {
        bgAudio.currentTime = item.time;
        if (bgAudio.paused) bgAudio.play().catch(_=>{});
      }
    });

    container.appendChild(p);
  });
}

function syncKaraokeProgress() {
  const bgAudio = document.getElementById('bgAudio');
  const timeCurrent = document.getElementById('karaokeCurrentTime');
  const timeDuration = document.getElementById('karaokeDuration');
  const fill = document.getElementById('karaokeTimelineFill');
  const scrollWindow = document.getElementById('karaokeLyricsWindow');

  if (!bgAudio) return;

  const cur = bgAudio.currentTime || 0;
  const dur = bgAudio.duration || 0;

  if (timeCurrent) timeCurrent.textContent = formatTime(cur);
  if (timeDuration && dur > 0) timeDuration.textContent = formatTime(dur);

  if (fill && dur > 0) {
    fill.style.width = `${(cur / dur) * 100}%`;
  }

  // Sinkronkan highlight baris lirik
  const lines = document.querySelectorAll('.lyric-line');
  if (!lines || lines.length === 0) return;

  let currentLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const lineTime = parseFloat(lines[i].dataset.time);
    if (cur >= lineTime) {
      currentLineIndex = i;
    } else {
      break;
    }
  }

  if (currentLineIndex !== activeLyricIndex && currentLineIndex >= 0) {
    activeLyricIndex = currentLineIndex;

    lines.forEach((line, idx) => {
      line.classList.toggle('active', idx === currentLineIndex);
    });

    // Auto-scroll ke tengah jendela lirik
    const activeEl = lines[currentLineIndex];
    if (activeEl && scrollWindow) {
      const elOffsetTop = activeEl.offsetTop;
      const windowHeight = scrollWindow.clientHeight;
      scrollWindow.scrollTo({
        top: elOffsetTop - (windowHeight / 2) + (activeEl.clientHeight / 2),
        behavior: 'smooth'
      });
    }
  }
}

