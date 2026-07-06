import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { polygon } from '@reown/appkit/networks'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
if (!projectId) throw new Error('VITE_WALLETCONNECT_PROJECT_ID is not set')

const networks = [polygon]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
})

export const wagmiConfig = wagmiAdapter.wagmiConfig

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'PolyDog',
    description: 'The Guardian of Polygon',
    url: 'https://polydog.xyz',
    icons: ['https://polydog.xyz/logo.png'],
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#7c3aed',
    '--w3m-border-radius-master': '999px',
  },
})
