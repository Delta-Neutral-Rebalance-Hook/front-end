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


// Pool page
async function handlePool() {
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
    alert('Pool succeed');
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}