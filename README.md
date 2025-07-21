# 🧪 Frontend Blockchain Boilerplate (React + Vite)

A **production-ready, scalable, and developer-friendly** frontend boilerplate built with **React + Vite**, designed especially for **Web3/blockchain dApps**.

It includes support for:
- Wallet connection (via Wagmi)
- Blockchain interactions (read/write/estimate gas)
- Tailwind CSS styling
- Zustand for global state management
- React Query for async state/data fetching
- Fully reusable component structure
- Light/dark mode support
- TypeScript (optional: can be enabled if not already)
- Multi-language support
- Tanstack for API fetching and it's components

---

## 📁 Folder Structure
```
src/
├── assets/                # Static assets like icons/images
├── components/            # Reusable UI components
│   ├── ui/                # Basic UI primitives (Button, Input)
│   └── shared/            # Shared logic-based components (Navbar, Footer)
├── constants/             # Constants like chains, env configs, ABIs
├── hooks/                 # Custom React hooks (useWallet, useTxStatus)
├── i18n/                  # Language setup and translations
│   ├── locales/           # JSON translation files
│   └── index.ts           # i18next config
├── layouts/               # App layout components (MainLayout)
├── pages/                 # App pages (Home, Dashboard, 404)
├── router/                # React Router config
├── services/              # Blockchain logic (read/write/gas functions)
├── state/                 # Zustand global state stores
├── styles/                # Global Tailwind + theming styles
├── utils/                 # Helper functions (formatters, validators)
├── wagmi/                 # Wagmi client, config, connectors
├── App.tsx                # Root app component
├── main.tsx               # App entry point
└── vite-env.d.ts
```


---

## ⚙️ Tech Stack

| Category         | Tech Used                     |
|------------------|-------------------------------|
| Core Framework   | [React](https://reactjs.org/) |
| Build Tool       | [Vite](https://vitejs.dev/)   |
| Styling          | [Tailwind CSS](https://tailwindcss.com/) |
| State Management | [Zustand](https://github.com/pmndrs/zustand) |
| API Fetching     | [React Query](https://tanstack.com/query/latest) |
| Web3 Integration | [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/) |
| Wallet Support   | MetaMask, WalletConnect, Coinbase Wallet |
| Type Checking    | JavaScript / TypeScript ready |
| Theme Support    | Dark/Light via Tailwind classes |
| Multi language Support    | [i18next](https://www.i18next.com/) |
|React query | [@tanstack](https://tanstack.com/)


---

## 🚀 Features

- ✅ Connect Wallet (with Wagmi + multiple connectors)
- ✅ Dummy blockchain transactions:
  - Write contract interaction
  - Read contract call
  - Estimate gas usage
- ✅ TailwindCSS with theme customization
- ✅ Zustand for lightweight global state
- ✅ React Query for API/Web3 data fetching
- ✅ Toast notifications using `react-hot-toast`
- ✅ Component-based architecture
- ✅ Responsive and mobile-friendly layout
- ✅ Pre-configured for environment variables (`.env` support)
- ✅ Clean reusable modal and input components
- ✅ Multi language support with i18next


---

## 🧠 How to Use

### 1. 📦 Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 2. 🛠️ Project Configuration

#### 🔗 Web3 Network Setup

Update the `web3.config.ts` file inside the `src/wagmi/` folder to:

- Add or modify blockchain networks
- Configure custom RPCs or chain-specific settings

---

### 3. 🧩 Wallet Connection

Choose the appropriate wallet connection modal in `App.tsx`:

```tsx
// Without signature
<ConnectWalletModal />

// With signature verification
<ConnectWalletModalWithSignature />
```

---

### 4. 🌍 Internationalization (i18n)

- All language files are located in `src/i18n/locales/`
- Use `index.ts` to add new languages or configure i18next
- Example folder structure:
  ```
  i18n/
  ├── locales/
  │   ├── en.json
  │   └── hi.json
  └── index.ts
  ```

---

### 5. 🎨 Styling and Themes

- Global styles are defined in `src/styles/global.css`
- Tailwind config is pre-set with:
  - Custom colors
  - Font variables
  - Responsive breakpoints
- Use the `dark:` keyword to apply dark theme styles using Tailwind

---

### 6. 🧵 Custom Hooks (📁 `src/hooks/`)

Prebuilt hooks to simplify integrations:

- API requests: `useGet`, `usePost`, `usePut`, `useDelete`
- Web3 interactions: `useReadContract`, `useWriteContract`, `useEstimateGas`

> 📌 Refer to `components/dummyWeb3` for example usage.

---

### 7. 📦 Global State with Zustand

- Use the `src/state/` folder to define global states
- Just create a store using Zustand and import it anywhere:

```tsx
import { useMyStore } from "@/state/myStore";
```

---

### 8. 🔔 Toast Notifications

Toast is pre-integrated using `react-hot-toast`:

```tsx
import { toast } from "react-hot-toast";

toast.success("Transaction complete!");
```

---

### 9. 🧱 UI Components

- Reusable primitives and shared UI are inside `src/components/`
- Ant Design (`antd`) is fully configured and ready to use:

```tsx
import { Button } from "antd";
```

---

### 10. ⚙️ Environment Variables

Use a `.env` file at the root level:

```
VITE_ALCHEMY_ID=your_alchemy_project_id
VITE_CONTRACT_ADDRESS=0xYourContractAddress
VITE_CHAIN_ID=137
```

---

### 11. 🔗 Entry Point Configuration (`main.tsx`)

The following libraries are pre-configured in `src/main.tsx`:

- 🧰 **Wagmi** — Web3 wallet and contract setup
- 🍞 **React Hot Toast** — Notifications
- 🌐 **Ant Design (antd)** — Component library
- ⚡ **TanStack Query (React Query)** — Data fetching and caching

---
---

## *Change current data as per usage.