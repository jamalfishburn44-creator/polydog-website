const connectBtn = document.getElementById("connectWallet");

async function connectWallet() {

if (typeof window.ethereum !== "undefined") {

try {

const accounts = await ethereum.request({
method: "eth_requestAccounts"
});

connectBtn.innerHTML =
"Connected<br>" +
accounts[0].substring(0,6) +
"..." +
accounts[0].substring(accounts[0].length-4);

} catch (err) {

alert("Wallet connection cancelled.");

}

} else {

alert("Please install MetaMask.");

}

}

connectBtn.addEventListener("click", connectWallet);
