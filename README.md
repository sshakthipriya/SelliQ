
SelliQ is a sales intelligence dashboard that surfaces AI-powered insights across three domains:

- **Competitor Intelligence** — track competitor website changes, LinkedIn activity, and positioning shifts in real time
- **Email Insights** — surface churn risks, upsell signals, and outreach opportunities from connected inboxes
- **Investor Discovery** — find and prioritize high-fit investors based on market relevance and portfolio alignment

---

## Tech Stack - This repo is a Frontend repo

| Technology | Role |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool and dev server |
| Ant Design 5 | Component library |
| Recharts | Charts and data visualization |
| React Router DOM 7 | Client-side routing |
| Axios | API communication |
| SCSS / Sass | Component styling |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/sshakthipriya/SelliQ.git
cd SelliQ
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

---

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── pages/           # Route-level page components
├── services/        # Axios API calls
├── hooks/           # Custom React hooks
├── utils/           # Helper functions
└── App.jsx          # Root component and routing
```

---

## Demo

📽️ [Watch the full demo on Google Drive](https://drive.google.com/file/d/18KQECnT1jAtjx_TXquSi6fSI5ZZ9AH_5/view?usp=sharing)

---
