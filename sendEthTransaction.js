import { connectWallet } from './connectWallet';
import { ethers } from 'ethers';

export async function sendEthTransaction(toAddress, amountInEth) {
  try {
    const { signer } = await connectWallet();

    const tx = {
      to: toAddress,
      value: ethers.utils.parseEther(amountInEth)
    };

    const txResponse = await signer.sendTransaction(tx);
    console.log('Transaction sent:', txResponse.hash);
    await txResponse.wait();
    console.log('Transaction confirmed!');
  } catch (err) {
    console.error('Transaction failed:', err);
  }
}