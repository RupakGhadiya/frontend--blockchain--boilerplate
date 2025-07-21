/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import { useConnect, useDisconnect, useSwitchChain } from "wagmi";
import toast from "react-hot-toast";
import { CONNECTOR } from "../wagmi/web3.config";

// Sepolia change as per need
const activeChainId = 11155111;

export const useWallet = () => {
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const connectWallet = async (mode: string) => {
    try {
      const connector = CONNECTOR[mode];
      const res = await connectAsync({ connector });
      // Check if connected chain is mainnet (Ethereum)
      if (res?.chainId !== activeChainId) {
        try {
          await switchChain({ chainId: Number(activeChainId) });
        } catch (switchError: any) {
          console.error("Failed to switch network", switchError);
          toast.error("Please switch to Ethereum Mainnet in your wallet.");
          throw switchError;
        }
      }
      return res?.accounts[0];
    } catch (error: any) {
      console.error("Error in connectWallet:", error);
      if (error.code === 4001) {
        toast.error("Wallet Connection request rejected.");
      } else {
        console.error(error.message || "Failed to connect wallet", "error");
      }
      throw error;
    }
  };

  const switchNetwork = async (chainId: number) => {
    await switchChain(
      { chainId },
      {
        onError: () => {
          console.error("error");
        },
      }
    );
  };

  const disconnectWallet = async () => {
    await disconnect();

    // write things need to clear after wallet get's disconnected
  };

  return { connectWallet, switchNetwork, disconnectWallet };
};
