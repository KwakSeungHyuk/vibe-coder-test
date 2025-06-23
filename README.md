# Vibe Coder Kwak - Portfolio Website

![Vibe Coder Kwak](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8)

> **빠르고 감각적인 제품 개발을 위한 바이브 코딩**  
> 스타트업부터 MVP까지, 당신의 아이디어를 현실로 만들어보세요.

## 🚀 프로젝트 소개

Vibe Coder Kwak은 바이브 코딩 방법론을 통해 빠르고 효율적인 제품 개발 서비스를 제공하는 개인 브랜드 웹사이트입니다. 

### ✨ 주요 특징

- **⚡ 빠른 속도**: 전통적인 개발보다 3배 빠른 개발 속도
- **💎 최고 품질**: 99.9% 안정성을 보장하는 확장 가능한 아키텍처
- **🤝 완벽한 협업**: 100% 투명한 프로세스와 실시간 소통

### 🎯 타겟 사용자

- 스타트업 Founder / 기획자
- IT 비전공 창업 준비자
- 빠른 MVP 제작이 필요한 기업 팀장

## 🛠 기술 스택

### Frontend
- **Next.js 14** - App Router 사용
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 퍼스트 CSS
- **Framer Motion** - 부드러운 애니메이션
- **GSAP** - 고성능 애니메이션

### UI/UX
- **Glassmorphism** 디자인
- **모바일 퍼스트** 반응형 디자인
- **다크 테마** 기본 적용
- **접근성** 고려한 UX

### 배포 & 인프라
- **Vercel** - 자동 배포 및 CDN
- **ISR** - 정적 사이트 재생성
- **SEO** 최적화

## 📱 페이지 구성

1. **Hero Section** - 임팩트 있는 첫인상과 CTA
2. **About Section** - 타임라인 형태의 개발 여정
3. **Portfolio Gallery** - 실제 프로젝트 케이스
4. **Vibe Advantage** - 바이브 코딩의 3가지 핵심 가치
5. **Testimonials** - 클라이언트 후기 및 성과 지표
6. **Featured Video** - 개발 프로세스 영상
7. **Tech Stack** - 기술 스택 및 개발 프로세스
8. **Contact** - 다양한 연락 방법 및 문의 폼

## 🎨 디자인 시스템

### 컬러 팔레트
```css
/* Primary Colors */
--brand-bg: #101010       /* 메인 배경 */
--brand-primary: #23E0A1  /* 브랜드 포인트 컬러 */
--brand-text: #FFFFFF     /* 메인 텍스트 */

/* Secondary Colors */
--gray-900: #111827       /* 섹션 배경 */
--gray-800: #1F2937       /* 카드 배경 */
--gray-700: #374151       /* 경계선 */
--gray-300: #D1D5DB       /* 보조 텍스트 */
```

### 타이포그래피
- **헤드라인**: Pretendard 700 (Bold)
- **본문**: Inter 400 (Regular)
- **아이콘**: Phosphor Icons (24px 일관성)

### 애니메이션 원칙
- **Duration**: 600ms 이하
- **Easing**: ease-out-quart
- **Scroll Trigger**: 한 번에 1요소씩 등장
- **Reduced Motion**: 접근성을 위한 모션 비활성화 지원

## 🚀 시작하기

### 필요 조건
- Node.js 18.17.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **레포지토리 클론**
```bash
git clone https://github.com/yourusername/vibe-coder-kwak.git
cd vibe-coder-kwak
```

2. **의존성 설치**
```bash
npm install
# 또는
yarn install
```

3. **개발 서버 실행**
```bash
npm run dev
# 또는
yarn dev
```

4. **브라우저에서 확인**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 로컬에서 프로덕션 미리보기
npm run start

# 코드 린팅
npm run lint
```

## 📁 프로젝트 구조

```
vibe-coder-kwak/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 메인 페이지
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── PortfolioSection.tsx
│   │   ├── VibeAdvantageSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── FeaturedVideoSection.tsx
│   │   ├── TechStackSection.tsx
│   │   └── ContactSection.tsx
│   └── styles/
│       └── globals.css      # 글로벌 스타일
├── public/                  # 정적 파일
├── tailwind.config.ts       # Tailwind 설정
├── next.config.js           # Next.js 설정
└── package.json
```

## 🎯 성능 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **코드 분할**: 컴포넌트별 동적 임포트
- **폰트 최적화**: Google Fonts 사전 로드
- **SEO**: 메타데이터 자동 생성
- **웹 바이탈**: Core Web Vitals 최적화

## 📊 라이트하우스 점수 목표

- **Performance**: 95+ 
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

## 🔧 커스터마이징

### 색상 변경
`tailwind.config.ts`에서 브랜드 컬러를 수정하세요:

```typescript
colors: {
  'brand-bg': '#YOUR_BG_COLOR',
  'brand-primary': '#YOUR_PRIMARY_COLOR',
  'brand-text': '#YOUR_TEXT_COLOR',
}
```

### 콘텐츠 수정
각 섹션 컴포넌트에서 텍스트와 이미지를 직접 수정할 수 있습니다.

### 애니메이션 조정
Framer Motion과 GSAP 설정을 조정하여 원하는 애니메이션 효과를 만들 수 있습니다.

## 📝 연락처

프로젝트에 대한 문의나 협업 제안은 아래 연락처로 연락해주세요:

- **Email**: contact@vibecoderkwak.com
- **카카오톡**: [오픈채팅방 링크]
- **화상미팅**: [캘린들리 링크]

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<div align="center">
  <p>
    <strong>Building the future, one project at a time.</strong>
  </p>
  <p>
    Made with ❤️ by <a href="https://github.com/yourusername">Vibe Coder Kwak</a>
  </p>
</div> 