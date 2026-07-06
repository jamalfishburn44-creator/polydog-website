import { getBalance } from '@wagmi/core'
import { polygon } from '@reown/appkit/networks'
import { appKit, wagmiConfig } from './appkit.js'

// ── helpers ──────────────────────────────────────────────────────────────────

function shortAddr(addr) {
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4)
}

async function fetchPolBalance(address) {
  try {
    const bal = await getBalance(wagmiConfig, { address, chainId: polygon.id })
    const num = parseFloat(bal.formatted)
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 }) + ' POL'
  } catch {
    return '-- POL'
  }
}

// ── dropdown state ────────────────────────────────────────────────────────────

let dropdownOpen = false

function openDropdown() {
  const wrap = document.getElementById('walletWrap')
  if (!wrap) return
  dropdownOpen = true
  wrap.classList.add('open')
  const btn = document.getElementById('walletAddressBtn')
  if (btn) btn.setAttribute('aria-expanded', 'true')
}

function closeDropdown() {
  const wrap = document.getElementById('walletWrap')
  if (!wrap) return
  dropdownOpen = false
  wrap.classList.remove('open')
  const btn = document.getElementById('walletAddressBtn')
  if (btn) btn.setAttribute('aria-expanded', 'false')
}

function toggleDropdown() {
  dropdownOpen ? closeDropdown() : openDropdown()
}

// ── renderers ─────────────────────────────────────────────────────────────────

/** Update balance text in-place — no DOM rebuild needed. */
function updateBalance(balance) {
  const el = document.getElementById('walletBalanceText')
  if (el) el.textContent = balance
}

/**
 * Render the connected state exactly ONCE per address.
 * Subsequent calls for the same address only update the balance.
 */
function renderConnected(area, address) {
  const existing = document.getElementById('walletAddressBtn')
  if (existing && existing.dataset.address === address) {
    return // already rendered — just let updateBalance handle the balance
  }

  dropdownOpen = false
  area.innerHTML = `
    <div class="wallet-connected-wrap" id="walletWrap">
      <button
        class="wallet-button wallet-is-connected"
        id="walletAddressBtn"
        data-address="${address}"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span class="wallet-addr">${shortAddr(address)}</span>
        <span class="wallet-bal" id="walletBalanceText">-- POL</span>
      </button>

      <div class="wallet-dropdown" role="menu">
        <p class="wallet-dropdown-full">${address}</p>
        <hr class="wallet-dropdown-divider">
        <button class="wallet-dropdown-btn" id="copyAddressBtn">
          📋&nbsp; Copy Address
        </button>
        <button class="wallet-dropdown-btn wallet-dropdown-disconnect" id="disconnectBtn">
          🔌&nbsp; Disconnect Wallet
        </button>
      </div>
    </div>
  `

  // Toggle dropdown on address button tap
  document.getElementById('walletAddressBtn').addEventListener('click', (e) => {
    e.preventDefault()
    toggleDropdown()
  })

  // Copy full address to clipboard
  document.getElementById('copyAddressBtn').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address)
    } catch {
      // Fallback for WebViews that block navigator.clipboard
      const ta = document.createElement('textarea')
      ta.value = address
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    const btn = document.getElementById('copyAddressBtn')
    if (btn) {
      btn.textContent = '✓  Copied!'
      setTimeout(() => {
        if (btn.isConnected) btn.textContent = '📋\u00a0 Copy Address'
      }, 2000)
    }
  })

  // Disconnect: clear session, reset UI
  document.getElementById('disconnectBtn').addEventListener('click', async () => {
    closeDropdown()
    try {
      await appKit.disconnect()
    } catch (err) {
      console.error('disconnect error', err)
    }
    // Fallback: if subscribeAccount doesn't fire, force reset
    renderDisconnected(area)
  })
}

function renderDisconnected(area) {
  dropdownOpen = false
  area.innerHTML = `
    <button class="wallet-button" id="connectWallet">Connect Wallet</button>
  `
  document.getElementById('connectWallet').addEventListener('click', () => {
    appKit.open()
  })
}

// ── init ──────────────────────────────────────────────────────────────────────

export function initWallet() {
  const area = document.getElementById('walletArea')
  if (!area) throw new Error('#walletArea not found')

  // Close the dropdown when the user taps/clicks anywhere outside the wrap
  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('walletWrap')
    if (wrap && !wrap.contains(e.target)) {
      closeDropdown()
    }
  })

  // subscribeAccount fires immediately with the persisted session on page load
  // (handles auto-reconnect after refresh) and again on every state change.
  appKit.subscribeAccount(async (account) => {
    if (account.isConnected && account.address) {
      // Render shell once; balance updates in-place so no event listener loss
      renderConnected(area, account.address)
      const balance = await fetchPolBalance(account.address)
      updateBalance(balance)
    } else {
      renderDisconnected(area)
    }
  })
}
