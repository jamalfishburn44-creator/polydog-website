const connectButton = document.getElementById("connectWallet");

window.addEventListener("load", checkConnection);

connectButton.addEventListener("click", connectWallet);

async function checkConnection() {
    if (!window.ethereum) return;

    try {
        const accounts = await ethereum.request({
            method: "eth_accounts"
        });

        if (accounts.length > 0) {
            updateButton(accounts[0]);
        }
    } catch (err) {
        console.error(err);
    }
}

async function connectWallet() {

    if (!window.ethereum) {
        alert("Please install MetaMask to connect your wallet.");
        window.open("https://metamask.io/download/", "_blank");
        return;
    }

    try {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });

        updateButton(accounts[0]);

    } catch (err) {
        console.error(err);
        alert("Wallet connection cancelled.");
    }
}

function updateButton(account) {
    connectButton.innerText =
        account.slice(0, 6) + "..." + account.slice(-4);
}
async function loadTokenData() {

    // Temporary values until liquidity is added

    document.getElementById("price").innerText = "Launching Soon";
    document.getElementById("marketcap").innerText = "TBA";
    document.getElementById("holders").innerText = "Live After Launch";
    document.getElementById("liquidity").innerText = "Pending";

}

loadTokenData();
