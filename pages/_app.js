import '../styles/globals.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID })]
);

const { connectors } = getDefaultWallets({
  appName: 'Wagmi',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;

// const { chains, provider } = configureChains(
//   [localHostChain, chain.hardhat, chain.polygonMumbai],
//   [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
// );

// const localHostChain = {
//   id: 1_337,
//   name: 'Localhost',
//   network: 'localhost',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'LOCALTOKEN',
//     symbol: 'LCL',
//   },
//   rpcUrls: {
//     default: 'http://127.0.0.1:8545/',
//   },
//   testnet: true,
// };

// const { chains, provider } = configureChains(
//   [chain.hardhat, localHostChain],
//   [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
// );
