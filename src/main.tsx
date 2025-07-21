import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "antd";
import { WAGMI_CONFIG } from "./wagmi/web3.config";
import App from "./App";
import { queryClient } from "./utils/queryClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider>
      <WagmiProvider config={WAGMI_CONFIG}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster />
        </QueryClientProvider>
      </WagmiProvider>
    </ConfigProvider>
  </StrictMode>
);
