const walletButton = document.getElementById("connectWallet");

walletButton.addEventListener("click", async (e) => {

e.preventDefault();

if (typeof window.ethereum === "undefined") {
alert("Please install MetaMask.");
return;
}

try {

const accounts = await ethereum.request({
method: "eth_requestAccounts"
});

walletButton.innerHTML =
accounts[0].slice(0,6) +
"..." +
accounts[0].slice(-4);

}
catch(err){

console.log(err);

}

});
