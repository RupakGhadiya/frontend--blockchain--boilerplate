import { create } from "zustand";

interface WalletState {
  walletConnectModel: boolean;
  setWalletConnectModel: (value: boolean) => void;

  successWalletModel: boolean;
  setSuccessWalletModel: (value: boolean) => void;

  walletConnectWithSignModel: boolean;
  setWalletConnectWithSignModel: (value: boolean) => void;

  successWalletWithSignModel: boolean;
  setSuccessWalletWithSignModel: (value: boolean) => void;
}

const useWalletState = create<WalletState>((set) => ({
  walletConnectModel: false,
  setWalletConnectModel: (value) => set({ walletConnectModel: value }),

  successWalletModel: false,
  setSuccessWalletModel: (value) => set({ successWalletModel: value }),

  walletConnectWithSignModel: false,
  setWalletConnectWithSignModel: (value) =>
    set({ walletConnectWithSignModel: value }),

  successWalletWithSignModel: false,
  setSuccessWalletWithSignModel: (value) => set({ successWalletModel: value }),
}));

export default useWalletState;
