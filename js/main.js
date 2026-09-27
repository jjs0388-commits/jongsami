// 0. Lucide Icons 안전 초기화 (네트워크 차단/iOS 로컬 환경 대응)
    function safeCreateIcons() {
      try {
        if (typeof lucide !== "undefined" && lucide.createIcons) {
          lucide.createIcons();
        }
      } catch (err) {
        console.warn("Lucide icon load skipped:", err);
      }
    }

    document.addEventListener("DOMContentLoaded", function() {
      safeCreateIcons();
    });
    safeCreateIcons();


    // ----------------------------------------------------
    // 1. 최신 소식 모달 팝업 기능
    // ----------------------------------------------------
    const noticeModal = document.getElementById('noticeModal');
    const openNoticeBtn = document.getElementById('openNoticeBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalCloseIconBtn = document.getElementById('modalCloseIconBtn');

    function showNoticeModal(e) {
      if (e) e.preventDefault();
      if (noticeModal) noticeModal.classList.remove('hidden');
    }

    function hideNoticeModal() {
      if (noticeModal) noticeModal.classList.add('hidden');
    }

    if (openNoticeBtn) openNoticeBtn.addEventListener('click', showNoticeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideNoticeModal);
    if (modalCloseIconBtn) modalCloseIconBtn.addEventListener('click', hideNoticeModal);
    if (noticeModal) {
      noticeModal.addEventListener('click', (e) => {
        if (e.target === noticeModal) hideNoticeModal();
      });
    }

    // ----------------------------------------------------
    // 2. 프로젝트 안내 모달 팝업 기능
    // ----------------------------------------------------
    const projectModal = document.getElementById('projectModal');
    const projectLink = document.getElementById('project-link');
    const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');
    const projectModalCloseIconBtn = document.getElementById('projectModalCloseIconBtn');

    function showProjectModal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (projectModal) projectModal.classList.remove('hidden');
    }

    function hideProjectModal() {
      if (projectModal) projectModal.classList.add('hidden');
    }

    if (projectLink) projectLink.addEventListener('click', showProjectModal);
    if (projectModalCloseBtn) projectModalCloseBtn.addEventListener('click', hideProjectModal);
    if (projectModalCloseIconBtn) projectModalCloseIconBtn.addEventListener('click', hideProjectModal);
    if (projectModal) {
      projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) hideProjectModal();
      });
    }

    // ESC 키를 누르면 모든 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideNoticeModal();
        hideProjectModal();
      }
    });

    // ----------------------------------------------------
    // 🎮 3. 사미의 무중력 별잡기 미니 게임 엔진
    // ----------------------------------------------------
    const gameScreen = document.getElementById('gameScreen');
    const gameStartOverlay = document.getElementById('gameStartOverlay');
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    const gameStartBtn = document.getElementById('gameStartBtn');
    const gameRestartBtn = document.getElementById('gameRestartBtn');
    const gameTimerDisplay = document.getElementById('gameTimerDisplay');
    const gameScoreDisplay = document.getElementById('gameScoreDisplay');
    const gameBestDisplay = document.getElementById('gameBestDisplay');
    const gameOverTitle = document.getElementById('gameOverTitle');
    const gameOverScoreDesc = document.getElementById('gameOverScoreDesc');
    const gameRankText = document.getElementById('gameRankText');
    const gameSoundToggleBtn = document.getElementById('gameSoundToggleBtn');

    // 게임 상태 변수
    let gameScore = 0;
    let gameTimeLeft = 20;
    let isGameRunning = false;
    let gameTimerInterval = null;
    let gameSpawnInterval = null;
    let isSoundEnabled = true;

    // 로컬 스토리지 최고 기록 안전 로드
    let bestScore = 0;
    try {
      const savedBest = localStorage.getItem('jongsami_star_best') || localStorage.getItem('biggly_star_best');
      if (savedBest !== null) {
        bestScore = parseInt(savedBest, 10) || 0;
      }
    } catch(err) {
      bestScore = 0;
    }
    gameBestDisplay.textContent = bestScore;

    // Web Audio API 기반 신스 사운드 생성기
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) audioCtx = new AudioContextClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playSynthSound(type) {
      if (!isSoundEnabled) return;
      initAudio();
      if (!audioCtx) return;

      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'star') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
          osc.start(now);
          osc.stop(now + 0.15);
        } else if (type === 'gem') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(659.25, now);
          osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.18);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          osc.start(now);
          osc.stop(now + 0.2);
        } else if (type === 'rocket') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(440, now);
          osc.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === 'bomb') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(180, now);
          osc.frequency.linearRampToValueAtTime(40, now + 0.25);
          gain.gain.setValueAtTime(0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === 'gameover') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.08);
          osc.frequency.setValueAtTime(783.99, now + 0.16);
          osc.frequency.setValueAtTime(1046.5, now + 0.24);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.start(now);
          osc.stop(now + 0.45);
        }
      } catch (e) {}
    }

    // 사운드 토글 버튼
    if (gameSoundToggleBtn) {
            const svgVolume2 = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="sound-icon-svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
      const svgVolumeX = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="sound-icon-svg"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line></svg>`;

      gameSoundToggleBtn.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        if (isSoundEnabled) {
          gameSoundToggleBtn.classList.remove('muted');
          gameSoundToggleBtn.innerHTML = svgVolume2;
          playSynthSound('star');
        } else {
          gameSoundToggleBtn.classList.add('muted');
          gameSoundToggleBtn.innerHTML = svgVolumeX;
        }
      });
    }

    // 게임 시작
    function startGame() {
      initAudio();
      isGameRunning = true;
      gameScore = 0;
      gameTimeLeft = 20;
      gameScoreDisplay.textContent = '0';
      gameTimerDisplay.textContent = '20s';
      gameTimerDisplay.style.color = '#facc15';

      gameStartOverlay.classList.add('hidden');
      gameOverOverlay.classList.add('hidden');
      clearTargets();

      if (gameTimerInterval) clearInterval(gameTimerInterval);
      gameTimerInterval = setInterval(() => {
        if (!isGameRunning) return;
        gameTimeLeft--;
        gameTimerDisplay.textContent = gameTimeLeft + 's';

        if (gameTimeLeft <= 5) {
          gameTimerDisplay.style.color = '#ef4444';
        } else {
          gameTimerDisplay.style.color = '#facc15';
        }

        if (gameTimeLeft <= 0) {
          endGame();
        }
      }, 1000);

      if (gameSpawnInterval) clearInterval(gameSpawnInterval);
      spawnTarget();
      gameSpawnInterval = setInterval(spawnTarget, 450);
    }

    // 타겟 생성 로직
    function spawnTarget() {
      if (!isGameRunning) return;

      const screenWidth = gameScreen.clientWidth || 320;
      const target = document.createElement('div');
      target.className = 'game-target';

      const rand = Math.random();
      let type = 'star';
      let icon = '⭐';
      let points = 10;
      let duration = 2.2 + Math.random() * 0.8;

      if (rand < 0.55) {
        type = 'star';
        icon = '⭐';
        points = 10;
      } else if (rand < 0.78) {
        type = 'gem';
        icon = '💎';
        points = 30;
        duration = 1.8 + Math.random() * 0.5;
      } else if (rand < 0.88) {
        type = 'rocket';
        icon = '🚀';
        points = 50;
        duration = 1.5 + Math.random() * 0.4;
      } else {
        type = 'bomb';
        icon = '💣';
        points = -20;
        duration = 2.4 + Math.random() * 0.6;
      }

      target.classList.add(type);
      target.textContent = icon;
      target.style.animationDuration = duration + 's';

      const posX = 28 + Math.random() * (screenWidth - 56);
      target.style.left = posX + 'px';
      target.style.bottom = '-10px';

      let isHit = false;
      const handleHit = (e) => {
        if (!isGameRunning || isHit) return;
        isHit = true;
        e.preventDefault();
        e.stopPropagation();

        gameScore = Math.max(0, gameScore + points);
        gameScoreDisplay.textContent = gameScore;

        playSynthSound(type);

        const screenRect = gameScreen.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const relY = targetRect.top - screenRect.top;
        showScorePopup(posX, relY, points, type);

        if (type === 'bomb') {
          gameScreen.classList.remove('screen-shake');
          void gameScreen.offsetWidth;
          gameScreen.classList.add('screen-shake');
        }

        target.remove();
      };

      target.addEventListener('pointerdown', handleHit);

      target.addEventListener('animationend', () => {
        target.remove();
      });

      gameScreen.appendChild(target);
    }

    function showScorePopup(x, y, points, type) {
      const popup = document.createElement('div');
      popup.className = 'score-popup';

      if (points > 0) {
        popup.textContent = '+' + points;
        popup.classList.add(points >= 30 ? 'bonus' : 'plus');
      } else {
        popup.textContent = points;
        popup.classList.add('minus');
      }

      popup.style.left = x + 'px';
      popup.style.top = Math.max(20, Math.min(180, y)) + 'px';

      gameScreen.appendChild(popup);
      popup.addEventListener('animationend', () => popup.remove());
    }

    function clearTargets() {
      const targets = gameScreen.querySelectorAll('.game-target, .score-popup');
      targets.forEach(t => t.remove());
    }

    // 게임 종료 및 점수 판정
    function endGame() {
      isGameRunning = false;
      if (gameTimerInterval) clearInterval(gameTimerInterval);
      if (gameSpawnInterval) clearInterval(gameSpawnInterval);
      clearTargets();
      playSynthSound('gameover');

      let isNewRecord = false;
      if (gameScore > 0 && gameScore > bestScore) {
        isNewRecord = true;
        bestScore = gameScore;
        try {
          localStorage.setItem('jongsami_star_best', bestScore);
        } catch(e) {}
        gameBestDisplay.textContent = bestScore;
      }

      let rank = '수습 우주비행사';
      let descHtml = '';

      if (gameScore === 0) {
        rank = '😴 잠자는 별 탐험가';
        gameOverTitle.textContent = '게임 종료';
        descHtml = '획득한 점수가 없습니다.<br>다음엔 떠오르는 별을 꼭 터치해보세요!';
      } else if (isNewRecord) {
        gameOverTitle.textContent = '🎉 신기록 달성!';
        if (gameScore >= 350) rank = '🌌 우주 정복 마스터';
        else if (gameScore >= 200) rank = '🚀 안티그래비티 베테랑';
        else if (gameScore >= 100) rank = '⭐ 열정적인 별 탐험가';
        else rank = '🛸 우주 비행사';
        descHtml = '새로운 최고 기록: <strong style="color: #38bdf8;">' + gameScore + '점</strong> 달성!';
      } else {
        gameOverTitle.textContent = '게임 종료!';
        if (gameScore >= 350) rank = '🌌 우주 정복 마스터';
        else if (gameScore >= 200) rank = '🚀 안티그래비티 베테랑';
        else if (gameScore >= 100) rank = '⭐ 열정적인 별 탐험가';
        else rank = '🛸 우주 비행사';
        descHtml = '최종 점수: <strong style="color: #38bdf8;">' + gameScore + '점</strong> (최고: ' + bestScore + '점)';
      }

      gameRankText.textContent = rank;
      gameOverScoreDesc.innerHTML = descHtml;

      gameOverOverlay.classList.remove('hidden');
      safeCreateIcons();
    }

    if (gameStartBtn) gameStartBtn.addEventListener('click', startGame);
    if (gameRestartBtn) gameRestartBtn.addEventListener('click', startGame);
