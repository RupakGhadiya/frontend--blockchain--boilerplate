/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAccount } from "wagmi";
import { erc4626Abi, parseUnits } from "viem";
import toast from "react-hot-toast";
import { useReadTokenName } from "@/hooks/blockchain/useReadContract";
import { useMintToken } from "@/hooks/blockchain/useWriteContract";
import { DUMMY_ERC20_ADDRESS } from "@/constants/DummyERC20";
import { estimateContractGas } from "@/utils/estimateContractGas";

export const TokenMintForm = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState("");
  const [gasEstimate, setGasEstimate] = useState("");
  const {
    name: tokenName,
    balance: tokenBalance,
    isLoading: loadingName,
  } = useReadTokenName();
  const { writeContractAsync } = useMintToken();

  const handleEstimate = async () => {
    try {
      const gas = await estimateContractGas({
        contractAddress: DUMMY_ERC20_ADDRESS,
        abi: erc4626Abi,
        functionName: "mint",
        args: [parseUnits(amount, 18), address],
        account: address as `0x${string}`,
      });
      console.log("gas", gas);
      setGasEstimate(gas.toString());
    } catch (err) {
      console.error("Estimate failed:", err);
    }
  };

  const handleMint = async () => {
    if (!address || !amount) {
      toast.error("Wallet not connected or amount missing");
      return;
    }

    handleEstimate();

    try {
      const parsedAmount = parseUnits(amount, 18);
      toast.loading("Estimating gas...");

      toast.dismiss();
      const txHash = await toast.promise(
        writeContractAsync({
          abi: erc4626Abi,
          address: DUMMY_ERC20_ADDRESS,
          functionName: "mint",
          args: [parsedAmount, address],
        }),
        {
          loading: "Sending mint transaction...",
          success: "Mint successful!",
          error: (err) => err.message || "Mint failed",
        }
      );

      console.log("Mint tx:", txHash);
    } catch (err: any) {
      toast.dismiss();
      toast.error(err?.message || "Error minting token");
    }
  };

  return (
    <div className="space-y-4 max-w-md border rounded p-6 dark:bg-background-dark bg-background-light shadow-lg mt-10">
      <p className="text-[15px] text-red-500">
        {" "}
        this is just for refrance, actual transection might not work
      </p>
      <h2 className="text-lg font-semibold">
        Token: {loadingName ? "Loading..." : tokenName}
      </h2>
      <h2 className="text-lg font-semibold">
        Balance: {loadingName ? "Loading..." : tokenBalance}
      </h2>

      <input
        type="number"
        placeholder="Enter token amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800 text-primary-dark dark:text-primary-light"
      />

      {gasEstimate && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Estimated Gas: {gasEstimate.toString()}
        </p>
      )}

      <button
        onClick={handleMint}
        className="text-primary-dark dark:text-primary-light border border-primary-dark dark:border-primary-light !px-[32px] !pt-[10px] !pb-[10px] w-full !rounded-[10px] text-[20px] uppercase"
        >
        Mint Token
      </button>
    </div>
  );
};
