import { initWallet } from './wallet-ui.js'

initWallet()

window.copyContract = function () {
  const address = '0xca3b716582b4790c9fdd2672425e82c183b8e3d5'
  navigator.clipboard.writeText(address).then(() => {
    const btn = document.getElementById('copyButton')
    btn.textContent = '✅ Copied!'
    setTimeout(() => {
      btn.textContent = '📋 Copy Contract'
    }, 2000)
  })
}
