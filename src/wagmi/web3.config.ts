'use client';
import { createConfig, createStorage, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { CoinBaseIcon, MetamaskIcon, WalletConnectIcon } from '../assets/icons/icon';
// import { environment } from '../environment';

export const WALLET_OPTION = {
	metaMask: 'metamask',
	walletConnect: 'walletconnect',
	coinBase: 'coinBase',
};

const metadata = {
	name: 'Virtuals Pepe',
	icons: ['icon']
};

export const metaMaskConnector = injected({ target: 'metaMask' });

export const walletConnector = walletConnect({
	projectId: 'e199692e56eced12e2ccaa3c7cde496a',
	showQrModal: true,
	qrModalOptions: {
		explorerRecommendedWalletIds: [
			'fe68cea63541aa53ce020de7398968566dfe8f3725663a564cac89490247ed49',
			'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
			'4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
		]
	}
});

export const uriConnector = walletConnect({
	showQrModal: false,
	projectId: 'e199692e56eced12e2ccaa3c7cde496a'
});

export const coinbaseWalletConnector = coinbaseWallet({
	appName: metadata.name,
	appLogoUrl: metadata.icons[0]
});

export const WAGMI_CONFIG = createConfig({
	chains: [sepolia,mainnet],
	syncConnectedChain: true,
	storage: createStorage({
	  storage: typeof window !== 'undefined' ? window.localStorage : ({} as Storage),
	}),
	connectors: [
	  walletConnector,
	  metaMaskConnector,
	  coinbaseWalletConnector,
	  uriConnector,
	],
	transports: {
	  [mainnet.id]: http(),
	  [sepolia.id]: http()
	}
  });

export const CONNECT_WALLET_OPTIONS = [
	{
		name: WALLET_OPTION.metaMask,
		Icon: MetamaskIcon,
		title: 'MetaMask',
		isInMobileVisible: false,
		isInDesktopVisible: true
	},
	{
		name: WALLET_OPTION.coinBase,
		Icon: CoinBaseIcon,
		title: 'CoinBase',
		isInMobileVisible: false,
		isInDesktopVisible: true
	},	
	{
		name: WALLET_OPTION.walletConnect,
		Icon: WalletConnectIcon,
		title: 'WalletConnect',
		isInMobileVisible: true,
		isInDesktopVisible: true
	}
];

export const CONNECTOR = {
	[WALLET_OPTION.metaMask]: metaMaskConnector,
	[WALLET_OPTION.walletConnect]: walletConnector,
	[WALLET_OPTION.coinBase]: coinbaseWalletConnector,
};
