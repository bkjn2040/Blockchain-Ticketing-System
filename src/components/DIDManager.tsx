import { useState } from 'react';
import { generateDID } from '../hedera/did';

// 移除未使用的状态变量
export default function DIDManager() {
  const [did, setDid] = useState<string>("");

  const handleCreateDID = async () => {
    try {
      const { did: newDID, privateKey: newKey } = await generateDID();
      setDid(newDID);
      localStorage.setItem("userDID", newDID);
      localStorage.setItem("userPrivateKey", newKey); // 直接保存，无需显示私钥
    } catch (error) {
      const message = error instanceof Error ? error.message : "未知错误";
      alert("DID 创建失败: " + message);
    }
  };

  // return (
  //   <div>
  //     <button onClick={handleCreateDID}>Create DID</button>
  //     {did && <p>DID: {did}</p>} {/* 仅显示 DID */}
  //   </div>
  // );
}