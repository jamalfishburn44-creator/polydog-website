const connectButton = document.getElementById("connectWallet");

async function connectWallet() {

    if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
    }

    try {

        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });

        const account = accounts[0];

        connectButton.innerHTML =
            account.substring(0,6) +
            "..." +
            account.substring(account.length-4);

    } catch(err) {

        console.log(err);

    }

}

connectButton.addEventListener("click", connectWallet);
