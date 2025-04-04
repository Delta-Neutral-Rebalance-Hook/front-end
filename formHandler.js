async function sendDataToServer(data) {
  console.log("Sending data to server...", data); // Debug log

  const response = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log("✅ Server responded:", result.message);
}

async function sendDataToEther(data) {
  console.log("📤 Preparing transaction to Ethereum via MetaMask...", data);

  if (!window.ethereum) {
    alert("🦊 MetaMask is not installed.");
    return;
  }

  try {
    // Ensure wallet is connected
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const sender = accounts[0];
    
    // Example: convert ETH amount to hex (in wei)
    const amountInWei = window.ethereum.utils
      ? window.ethereum.utils.toHex(window.ethereum.utils.toWei(data.fromValue, 'ether'))
      : BigInt(parseFloat(data.fromValue) * 1e18).toString(16); // fallback if utils is unavailable

    const txParams = {
      from: sender,
      to: data.toToken, // assuming this is a recipient address, not a token name
      value: '0x' + amountInWei, // in hex
    };

    console.log("📝 Transaction params:", txParams);

    // Send transaction via MetaMask
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txParams],
    });

    console.log("✅ Transaction sent. Hash:", txHash);
    alert("Transaction submitted!\nHash: " + txHash);

  } catch (error) {
    console.error("❌ MetaMask transaction failed:", error);
    alert("Transaction failed:\n" + error.message);
  }
}

const tokenAddressMap = {
  'ETH': '0x0000000000000000000000000000000000000000', // 代表原生 ETH，可自定義處理
  'USDC': '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // 主網 USDC
  // 其他支援的代幣...
};

// Pool page
async function handlePool() {
  console.log("handleSwap called");

  const fromValue = document.getElementById('swap-from-amount').value;
  const fromToken = document.getElementById('swap-from-token').value;
  const toValue = tokenAddressMap[document.getElementById('swap-to-amount').value];
  const toToken = tokenAddressMap[document.getElementById('swap-to-token').value];
  const walletAddress = window.currentAccount || 'not connected';

  console.log("Collected values:", { fromValue, fromToken, toValue, toToken, walletAddress });

  const data = {
    type: 'swap',
    walletAddress,
    fromValue,
    fromToken,
    toValue,
    toToken
  };

  try {
    await sendDataToEther(data);
    alert('Pool succeed');
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}

// formHandler.js
async function handleSwap() {
  console.log("handleSwap called");

  const fromValue = document.getElementById('swap-from-amount').value;
  const fromToken = document.getElementById('swap-from-token').value;
  const toValue = document.getElementById('swap-to-amount').value;
  const toToken = document.getElementById('swap-to-token').value;
  const walletAddress = window.currentAccount || 'not connected';

  console.log("Collected values:", { fromValue, fromToken, toValue, toToken, walletAddress });

  const data = {
    type: 'swap',
    walletAddress,
    fromValue,
    fromToken,
    toValue,
    toToken
  };

  try {
    await sendDataToServer(data);
    alert('Swap succeed');
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}