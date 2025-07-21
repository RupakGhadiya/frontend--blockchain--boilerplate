import { useWriteContract } from 'wagmi';

export const useMintToken = () => {
  return useWriteContract();
};
