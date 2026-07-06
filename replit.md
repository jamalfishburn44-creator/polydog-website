# PolyDog

**The Guardian of Polygon** — community-first token project built on the Polygon blockchain.

## Stack

- **Vite** (v5) — multi-page build tool, dev server on port 5000
- **Reown AppKit** (v1.6) + **WagmiAdapter** — WalletConnect modal for desktop and mobile
- **wagmi** v2 + **viem** v2 — chain/account subscription

## Project Structure

```
/
├── index.html          # Main landing page
├── launch.html         # Community Launch portal
├── whitepaper.html     # Project whitepaper
├── src/
│   ├── appkit.js       # Reown AppKit init (shared, projectId here)
│   ├── main.js         # JS entry for index.html
│   ├── launch.js       # JS entry for launch.html (includes copyContract)
│   └── style.css       # Shared styles
├── public/
│   └── logo.png        # Served at /logo.png
├── vite.config.js      # Multi-page input + dev server config
└── package.json
```

## Running

```bash
npm run dev      # dev server at http://localhost:5000
npm run build    # production build → dist/
npm run preview  # preview production build
```

## WalletConnect Project ID

The Reown project ID is set in `src/appkit.js`. To change it, update the `projectId` constant. Get a project ID at https://cloud.reown.com.

## User Preferences

- Keep the existing design exactly — dark purple theme (#0b1020 background, #7c3aed accent)
- Connect Wallet button must work on both desktop (MetaMask) and mobile (WalletConnect)
- Polygon network only
