import React, { useState } from 'react';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';

function App() {
  const [attestationUID, setAttestationUID] = useState(null);

  const handleAttest = async () => {
    try {
      const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e';
      const eas = new EAS(EASContractAddress);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      eas.connect(signer);

      const schema = 'string responseHash,string modelName,uint256 timestamp';
      const schemaUID = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

      const schemaEncoder = new SchemaEncoder(schema);
      const encodedData = schemaEncoder.encodeData([
        { name: 'responseHash', value: '0xabc123...', type: 'string' },
        { name: 'modelName', value: 'DummyModel', type: 'string' },
        { name: 'timestamp', value: Math.floor(Date.now() / 1000), type: 'uint256' },
      ]);

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: await signer.getAddress(),
          expirationTime: 0,
          revocable: true,
          data: encodedData,
        },
      });

      const receipt = await tx.wait();
      setAttestationUID(receipt.logs[0].data);
    } catch (error) {
      console.error('Error creating attestation:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>EAS Attestation Demo</h1>
        <button onClick={handleAttest}>Create Attestation</button>
        {attestationUID && (
          <p>Attestation created with UID: {attestationUID}</p>
        )}
      </header>
    </div>
  );
}

export default App;
