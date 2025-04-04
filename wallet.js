// wallet.js
const connectBtn = document.getElementById('connectBtn');
const walletInfo = document.getElementById('walletInfo');

async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it: https://metamask.io/");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const ethBalance = ethers.formatEther(balance);

    walletInfo.innerHTML = `
      <div><strong>Address:</strong> <span id="addr">${address.slice(0, 6)}...${address.slice(-4)}</span></div>
      <div><strong>Balance:</strong> ${ethBalance} ETH</div>
      <div class="copy-hint" onclick="navigator.clipboard.writeText('${address}'); alert('Copied!')">Click to copy full address</div>
    `;
    connectBtn.textContent = "Connected";
    connectBtn.disabled = true;

  } catch (err) {
    console.error("Wallet connection failed", err);
    alert("Wallet connection failed.");
  }
}

connectBtn.addEventListener('click', connectWallet);

window.addEventListener("load", async () => {
  if (window.ethereum && ethereum.selectedAddress) {
    await connectWallet();
  }
});
