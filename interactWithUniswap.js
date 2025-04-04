import { connectWallet } from './connectWallet';
import { ethers } from 'ethers';
import uniswapRouterAbi from './uniswapRouterAbi.json'; // UniswapV2/V3 router ABI here

const routerAddress = '0xUniswapRouterAddress'; // Replace with actual Uniswap Router address

export async function swapTokens(tokenIn, tokenOut, amountIn, userAddress) {
  const { signer } = await connectWallet();

  const contract = new ethers.Contract(routerAddress, uniswapRouterAbi, signer);

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

  try {
    const tx = await contract.swapExactTokensForTokens(
      ethers.utils.parseUnits(amountIn, 18),
      0,
      [tokenIn, tokenOut],
      userAddress,
      deadline
    );

    console.log('Swap transaction sent:', tx.hash);
    await tx.wait();
    console.log('Swap completed!');
  } catch (err) {
    console.error('Swap failed:', err);
  }
}