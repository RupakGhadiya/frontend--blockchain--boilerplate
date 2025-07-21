/* eslint-disable @typescript-eslint/no-explicit-any */
import { estimateGas } from 'viem/actions';
import { encodeFunctionData } from 'viem';
import { WAGMI_CONFIG } from '@/wagmi/web3.config';

export const estimateContractGas = async ({
  contractAddress,
  abi,
  functionName,
  args,
  account,
}: {
  contractAddress: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  account: `0x${string}`;
}) => {
  const client = WAGMI_CONFIG.getClient()

  const data = encodeFunctionData({
    abi,
    functionName,
    args,
  });

  const gas = await estimateGas(client, {
    to: contractAddress,
    data,
    account,
  });

  return gas;
};
