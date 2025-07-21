
export const formatWalletAddress = (
    address: string,
    startLength: number = 10,
    lastLength: number = 10
  ) => {
    return address
      ? `${address.slice(0, startLength)}.....${address.slice(-lastLength)} `
      : address;
  };
  
  export const isMobileDevice = () => {
    if (typeof window !== "undefined" && navigator && navigator?.userAgent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
    return false;
  };