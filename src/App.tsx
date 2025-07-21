import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import './styles/global.css'
import "./i18n";
import ConnectWalletModalWithSignature from "./components/ui/connect-wallet-signature";
import ConnectWalletModal from "./components/ui/connect-wallet";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />

      {/* option of just to connect wallet or to connect wallet and then get signature from it flows  */}
      <ConnectWalletModal />
      <ConnectWalletModalWithSignature />
    </>
  );
}
