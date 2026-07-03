const connectButton = document.getElementById("connectWallet");

connectButton.addEventListener("click", connectWallet);

async function connectWallet() {

if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask to connect your wallet.");
    window.open("https://metamask.io/download/", "_blank");
    return;
}

try {

const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
});

const account = accounts[0];

connectButton.innerText =
account.substring(0,6) + "..." +
account.substring(account.length-4);

} catch (err) {

console.error(err);

alert("Wallet connection cancelled.");

}

}
