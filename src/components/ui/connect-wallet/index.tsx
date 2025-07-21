/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
import { type FC, type ReactNode, useState } from "react";

import toast from "react-hot-toast";

import PopupModal from "../modal";
import { useWallet } from "../../../hooks/useWallet";
import useWalletState from "../../../state/walletStore";
import { CONNECT_WALLET_OPTIONS } from "../../../wagmi/web3.config";
import { isMobileDevice } from "../../functions/sharedFunction";
import { WalletSuccessIcon } from "../../../assets/icons/icon";

const ConnectWalletModal: FC = () => {
  const { connectWallet } = useWallet();
  const {
    walletConnectModel,
    setWalletConnectModel,
    successWalletModel,
    setSuccessWalletModel,
  } = useWalletState();

  const [selectedOptionIcon, setSelectedOptionIcon] = useState<ReactNode>(null);
  const [connectStatus, setConnectStatus] = useState<
    "idle" | "processing" | "success"
  >("idle");
  const handleCloseModal = () => {
    setWalletConnectModel(false);
    setConnectStatus("idle");
  };

  const handleCloseModal2 = async () => {
    setWalletConnectModel(false);
    setSuccessWalletModel(false);
    setConnectStatus("idle");
  };

  const connectWalletHandle = async (mode: string, Icon?: ReactNode) => {
    setSelectedOptionIcon(Icon || null);

    if (mode === "metamask") {
      const provider =
        typeof window !== "undefined" ? (window as any).ethereum : null;
      if (!provider || !provider.isMetaMask) {
        handleCloseModal();
        handleCloseModal2();
        toast.error("MetaMask extension not detected!");
        return;
      }
    }

    try {
      if (mode === "metamask") {
        setConnectStatus("processing");
      } else {
        handleCloseModal();
      }

      const walletAddress = await connectWallet(mode);

      if (!walletAddress) throw new Error("Wallet connection failed");

      setConnectStatus("success");
      setWalletConnectModel(false);
      setSuccessWalletModel(true);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setConnectStatus("idle");
    }
  };

  const getHeadingTitle = (status: string): string => {
    switch (status) {
      case "idle":
        return "Connect a wallet";
      case "processing":
        return "Connecting Wallet...";
      case "success":
        return "Wallet Connected Successfully";
      default:
        return "Connect a wallet";
    }
  };

  const headingTitle = getHeadingTitle(connectStatus);

  return (
    <>
      <PopupModal
        isOpen={walletConnectModel}
        onCloseModal={handleCloseModal}
        headerTitle={headingTitle}
        fixwidth="362px"
        showClose={connectStatus !== "processing"}
        isSuccess={connectStatus === "success" ? false : true}
        isSignatureMessage={false}
      >
        <div className="flex flex-col items-center justify-center gap-[8px] mt-[30px] w-full">
          {connectStatus === "idle" && (
            <>
              {CONNECT_WALLET_OPTIONS.map(
                (option, i) =>
                  ((option.isInMobileVisible && isMobileDevice()) ||
                    (option.isInDesktopVisible && !isMobileDevice())) && (
                    <ul
                      key={i}
                      className="flex justify-center flex-col gap-[8px] rounded-[12px] w-full h-[52px] px-[16px] cursor-pointer border border-primary-dark dark:border-primary-light ease-linear !bg-transparent "
                    >
                      <li
                        className="flex items-center justify-between text-primary-dark dark:text-primary-light text-[16px]"
                        onClick={() =>
                          connectWalletHandle(option.name, <option.Icon />)
                        }
                      >
                        <span className="p-2 pl-0">{option.title}</span>
                        <option.Icon />
                      </li>
                    </ul>
                  )
              )}
            </>
          )}
          {connectStatus === "processing" && (
            <div className="flex flex-col items-center justify-center gap-[20px] mt-[15px] w-full">
              <div className="flex flex-row w-full items-center justify-center gap-[10px] relative overflow-hidden">
                {/* Keep your logo */}
                <span className="flex flex-row gap-[3px] text-primary-dark dark:text-primary-light text-[24px] uppercase items-center justify-center">
                  Logo
                </span>
                <div className="relative w-[99px] h-[2px] overflow-hidden rounded-[2px]">
                  <div className="absolute top-0 left-0 w-[200%] h-full bg-[radial-gradient(circle,_black_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-repeat-x bg-size-[8px_2px] animate-moveDotLine" />
                </div>
                <span>
                  {selectedOptionIcon ? (
                    selectedOptionIcon
                  ) : (
                    <div className="h-16 w-16 border-t-2 border-b-2 border-primary-dark dark:border-primary-light rounded-full" />
                  )}
                </span>
              </div>

              <p className="text-primary-dark dark:text-primary-light text-[12px] mb-[27px]">
                Proceed in your wallet
              </p>
            </div>
          )}
        </div>
      </PopupModal>

      <PopupModal
        isOpen={successWalletModel}
        onCloseModal={handleCloseModal2}
        headerTitle="Connect Wallet"
        isSuccess={false}
        fixwidth="362px"
      >
        <div className="flex flex-col items-center justify-center gap-[8px] mt-[30px] w-full">
          <div className="flex flex-col items-center justify-center gap-6 mt-[-25px]">
            <WalletSuccessIcon />
            <p className="flex !items-center !justify-center text-center text-primary-dark dark:text-primary-light text-[20px] w-[70%] mb-[-2.8px] mt-[0px]">
              Wallet Connected Successfully{" "}
            </p>
            <button
              className="text-primary-dark dark:text-primary-light border border-primary-dark dark:border-primary-light !px-[32px] !pt-[10px] !pb-[10px] w-full !rounded-[100px] text-[20px] uppercase"
              onClick={handleCloseModal2}
            >
              Continue
            </button>
          </div>
        </div>
      </PopupModal>
    </>
  );
};

export default ConnectWalletModal;
