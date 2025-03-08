import { PrivateKey } from "@hashgraph/sdk";

export const signChallenge = (challenge: string, privateKeyStr: string) => {
    const privateKey = PrivateKey.fromString(privateKeyStr);
    const signature = privateKey.sign(Buffer.from(challenge));
    return Buffer.from(signature).toString("hex"); // 正确转换 Buffer 为十六进制
};


export const verifyDID = (did: string) => {
    // 实际应调用Hedera网络验证
    return !!localStorage.getItem('userPrivateKey');
};
  
//   // 在需要签名处调用
//   import { signChallenge } from '../hedera/auth';
  
//   // 提交ticket时可添加签名验证
//   const signature = signChallenge(ticket.id, privateKey);

// // 可扩展验证逻辑（如与后端交互验证签名）