const connectButton = document.getElementById("connectWallet");

const contractAddress =
"0xca3b716582b4790c9fdd2672425e82c183b8e3d5";

// Connect Wallet
if (connectButton) {
connectButton.addEventListener("click", connectWallet);
}

async function connectWallet() {

if (!window.ethereum) {
alert("Please install MetaMask.");
return;
}

try {

const accounts = await window.ethereum.request({
method: "eth_requestAccounts"
});

const account = accounts[0];

connectButton.innerHTML =
account.substring(0,6) +
"..." +
account.substring(account.length-4);

}
catch(err){

console.log(err);

}

}

// Copy Contract
function copyContract(){

navigator.clipboard.writeText(contractAddress);

const btn =
document.getElementById("copyButton");

btn.innerHTML="✅ Copied!";

setTimeout(function(){

btn.innerHTML="📋 Copy Contract";

},2000);

}
