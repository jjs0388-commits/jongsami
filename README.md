# 🌌 정종삼(丁鍾三) | 사미의 일상생활 (Jongsami)

<p align="center">
  <b>"AI와 함께 이것저것 여러가지 만들어 보기"</b><br>
  바이브코딩 안티그래비티 2.0 기반 인터랙티브 퍼스널 링크트리 & 무중력 미니게임
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Author-%EC%A0%95%EC%8Client%EC%82%BC(%E4%B8%81%E9%8D%BE%E4%B8%89)-blueviolet?style=flat-square" alt="Author" />
  <img src="https://img.shields.io/badge/Platform-Mobile%20%7C%20Web-blue?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange?style=flat-square" alt="Stack" />
  <img src="https://img.shields.io/badge/Audio-Web%20Audio%20API-informational?style=flat-square" alt="Audio" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square" alt="License" />
</p>

---

## 📖 프로젝트 소개

**사미의 일상생활(Jongsami)**은 정종삼(丁鍾三) 님의 다양한 활동(도서, 음악, 프로젝트, 유튜브, 일상 스냅)과 직접 플레이할 수 있는 인터랙티브 미니게임을 한곳에 담은 **모바일 퍼스트 인터랙티브 링크트리(Link-in-bio) 웹 애플리케이션**입니다.

바이브코딩(Vibe Coding)과 안티그래비티(Antigravity) 2.0 환경에서 구축되었으며, 세련된 글래스모피즘(Glassmorphism) 다크 우주 테마와 부드러운 인터랙션을 제공합니다.

- 🔗 **저장소 주소**: [https://github.com/jjs0388-commits/jongsami](https://github.com/jjs0388-commits/jongsami)
- ✉️ **문의 메일**: [jjs0388@gmail.com](mailto:jjs0388@gmail.com)

---

## ✨ 주요 구성 및 기능

### 1. 👤 프로필 & 최신 소식
- **프로필 정보**: 대표 프로필 이미지와 함께 한자 성명 `정종삼(丁鍾三)` 및 슬로건 `"AI와 함께 이것저것 여러가지 만들어 보기"` 노출
- **🔔 최신 소식 팝업**: 프로필 이미지 우측 하단 알림 벨 아이콘 클릭 시, 현재 집중하고 있는 관심사(웹 개발, React, 안티그래비티) 안내 모달 팝업

### 2. 🎮 사미의 미니게임: 무중력 별잡기 챌린지
웹 브라우저에서 바로 즐길 수 있는 경쾌한 아케이드 탭 게임입니다.
- **게임 룰**: 20초 제한 시간 동안 화면 아래에서 무중력으로 떠오르는 아이템을 탭
  - ⭐ **별**: +10점
  - 💎 **보석**: +30점
  - 💣 **우주 폭탄**: -20점 (감점 아이템)
- **Web Audio API 효과음**: 외부 음원 파일 의존 없이 브라우저 오디오 합성 엔진을 이용한 실시간 비프 사운드 구현 (음소거 토글 가능)
- **점수 및 랭크 시스템**: 최고 기록 로컬스토리지 영구 보관, 최종 점수별 랭크 배지(수습 우주비행사 ~ 우주 마스터) 부여

### 3. 🔗 라이프스타일 & 프로젝트 링크 카드
- 📘 **사미의 일상생활**: 바이브코딩 안티그래비티 2.0 (교보문고 도서 링크)
- 🎵 **사미와 노래한곡**: 오늘 오후에 벤치에서.. (유튜브 쇼츠 연동)
- 💼 **사미의 프로젝트**: KB 현대화 프로젝트 진행 안내 모달 (비대면 채널 개인금융 자산관리 업무파트 개발, 2027년 10월 오픈 목표)
- 📚 **사미의 도서탐험**: 책과 함께하는 사미의 도서탐험 (유튜브 채널 연동)
- 📷 **사미의 일상스냅**: 소소한 일상을 사진으로 담아봅니다 (네이버 밴드 연동)
- ✉️ **이메일 보내기**: `jjs0388@gmail.com` 다이렉트 메일 발송 연결

---

## 🎨 디자인 시스템 & UI/UX

- **모바일 퍼스트 레이아웃**: 스마트폰 비율에 최적화된 최대 430px 모바일 뷰 컨테이너
- **다크 스페이스 테마**: 딥 네이비(`rgba(15, 23, 42)`)와 인디고/퍼플 그라데이션 바탕의 몰입감 넘치는 우주 배경
- **글래스모피즘**: 반투명 배경(`backdrop-filter: blur`), 은은한 테두리 하이라이트 및 호버 인터랙션
- **타이포그래피 & 아이콘**: Pretendard 웹폰트와 Lucide Vector Icons를 통한 선명한 UI

---

## 📂 프로젝트 구조

```plaintext
jongsami/
├── index.html              # 메인 프로필 및 미니게임 웹 페이지
├── css/
│   └── style.css           # 모바일 퍼스트 레이아웃 & 글래스모피즘 스타일시트
├── js/
│   └── main.js             # 모달 제어, Web Audio 사운드 및 무중력 미니게임 로직
├── images/                 # 프로필, 카드 썸네일 고화질 이미지
│   ├── profile.jpg         # 메인 프로필 사진
│   ├── daily.jpg           # 사미의 일상생활 썸네일
│   ├── song.jpg            # 노래한곡 썸네일
│   ├── project.jpg         # 프로젝트 썸네일
│   ├── youtube.jpg         # 도서탐험 썸네일
│   ├── snap.jpg            # 일상스냅 썸네일
│   └── mail.jpg            # 메일 썸네일
└── README.md               # 프로젝트 안내 문서
```

---

## 🚀 실행 방법

정적 웹 애플리케이션으로 별도의 백엔드 설치 없이 웹 브라우저에서 바로 실행할 수 있습니다.

1. **저장소 클론**
   ```bash
   git clone https://github.com/jjs0388-commits/jongsami.git
   cd jongsami
   ```

2. **브라우저 실행**
   - `index.html` 파일을 더블 클릭하여 크롬/사파리 등의 브라우저로 엽니다.
   - 또는 VS Code의 Live Server나 간단한 로컬 웹 서버를 이용해 실행할 수 있습니다:
     ```bash
     npx serve .
     ```

---

## 📄 라이선스 (License)

Copyright © 2026 **정종삼(丁鍾三)**. All rights reserved.  
This project is licensed under the MIT License.
