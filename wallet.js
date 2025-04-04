let currentAccount = null;

window.addEventListener('DOMContentLoaded', () => {
  const connectBtn = document.getElementById('connectBtn');
  const walletInfo = document.getElementById('walletInfo');

  connectBtn.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });

        currentAccount = accounts[0];
        window.currentAccount = currentAccount; // make global for other scripts

        walletInfo.innerText = currentAccount;
        walletInfo.style.cursor = 'pointer';

        walletInfo.addEventListener('click', () => {
          navigator.clipboard.writeText(currentAccount).then(() => {
            alert('Address copied to clipboard');
          });
        });

        console.log("✅ Connected:", currentAccount);
      } catch (err) {
        console.error("❌ Wallet connection failed:", err);
        alert("Failed to connect wallet.");
      }
    } else {
      alert('🦊 Please install MetaMask!');
    }
  });
});
