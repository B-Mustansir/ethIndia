import React, { useCallback } from 'react';
import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import { Button } from "../../components/ui/button"; // Ensure the correct import path

const sdk = new createCoinbaseWalletSDK({
  appName: 'My Dapp',
  appLogoUrl: 'https://example.com/logo.png',
  appChainIds: [84532],
});

const provider = sdk.getProvider();

export default function BlueCreateWalletButton({ handleSuccess, handleError }) {
  const createWallet = useCallback(async () => {
    try {
      const [address] = await provider.request({
        method: 'eth_requestAccounts',
      });
      handleSuccess(address);
    } catch (error) {
      handleError(error);
    }
  }, [handleSuccess, handleError]);

  return <Button variant="ghost" onClick={createWallet}>Sign In</Button>;
}
