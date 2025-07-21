import { DUMMY_ERC20_ADDRESS } from '@/constants/DummyERC20';
import { useCallback, useEffect, useState } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

export function useReadTokenName() {
    const { address } = useAccount();
    const publicClient = usePublicClient();
  
    const [balance, setBalance] = useState<string | null>(null);
    const [name, setName] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    const fetchBalance = useCallback(async () => {
      if (!address || !publicClient || !DUMMY_ERC20_ADDRESS) {
        setBalance(null);
        return;
      }
  
      setIsLoading(true);
      try {
        const [rawBalance, decimals, tokenName] = await Promise.all([
          publicClient.readContract({
            address: DUMMY_ERC20_ADDRESS,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          }),
          publicClient.readContract({
            address: DUMMY_ERC20_ADDRESS,
            abi: erc20Abi,
            functionName: "decimals",
          }),
          publicClient.readContract({
            address: DUMMY_ERC20_ADDRESS,
            abi: erc20Abi,
            functionName: "name",
          }),
        ]);
        setName(tokenName)
        setBalance(formatUnits(BigInt(rawBalance), decimals));
      } catch (error) {
        console.error("Failed to fetch ERC20 balance:", error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    }, [address, publicClient]);
  
    useEffect(() => {
      fetchBalance();
    }, [fetchBalance]);
  
    return {
      balance,
      name,
      isLoading,
      refetchERC20: fetchBalance,
    };
  }
// you can keep all reade contract function as per need 