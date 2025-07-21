import React from "react";
import { useWallet } from "../../../hooks/useWallet";
import useWalletState from "../../../state/walletStore";
import { useAccount } from "wagmi";
import { formatWalletAddress } from "@/components/functions/sharedFunction";

const ConnectWalletButton = () => {
  const { disconnectWallet } = useWallet();

  // use setWalletConnectModel for non signature version or use setWalletConnectWithSignModel
  const { setWalletConnectWithSignModel } = useWalletState();
  const { isConnected, address } = useAccount();

  const handleConnectButtonClick = async () => {
    if (isConnected) {
      await disconnectWallet();
      setTimeout(() => {
        disconnectWallet();
      }, 1000);
    } else {
      setWalletConnectWithSignModel(true);
    }
  };
  return (
    <div>
      {!address && !isConnected ? (
        <button
          className="border text-primary-dark border-primary-dark dark:text-primary-light dark:border-primary-light px-[20px] py-[8px] h-fit w-max rounded-[100px] text-[16px] uppercase cursor-pointer"
          onClick={handleConnectButtonClick}
        >
          connect wallet
        </button>
      ) : (
        <div
          className="border text-primary-dark border-primary-dark dark:text-primary-light dark:border-primary-light px-[20px] py-[8px] h-fit w-max rounded-[100px] text-[16px] cursor-pointer"
          onClick={handleConnectButtonClick}
        >
          {address && isConnected && formatWalletAddress(address, 4, 4)}
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
