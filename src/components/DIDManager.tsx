import { useState } from 'react';
import { generateDID } from '../hedera/did';

export default function DIDManager() {
  const [did, setDid] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  const handleCreateDID = async () => {
    try {
      const { did: newDID, privateKey: newKey } = await generateDID();
      setDid(newDID);
      setPrivateKey(newKey);
      // safe storage ( example with localStorage, need encryption otherwise )
      localStorage.setItem("userDID", newDID);
      localStorage.setItem("userPrivateKey", newKey);
    } catch (error) {
      alert("DID creation failed: " + error.message);
    }
  };

  return (
    <div>
      <button onClick={handleCreateDID}>创建 DID</button>
      {did && (
        <div>
          <p>DID: {did}</p>
          <p>Private Key: *****（安全隐藏）</p>
        </div>
      )}
    </div>
  );
}