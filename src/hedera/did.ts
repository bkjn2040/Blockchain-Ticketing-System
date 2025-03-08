import { Client, PrivateKey } from "@hashgraph/sdk";

// 初始化 Hedera 客户端
export const getHederaClient = () => {
  const client = Client.forTestnet();
  client.setOperator(
    import.meta.env.VITE_HEDERA_ACCOUNT_ID,
    import.meta.env.VITE_HEDERA_PRIVATE_KEY
  );
  return client;
};

// 生成 DID 和密钥对
export const generateDID = async () => {
  const client = getHederaClient();
  const privateKey = PrivateKey.generate();
  const publicKey = privateKey.publicKey;
  
  // suppose we use HCS to store (need implementation)
  const did = `did:hedera:testnet:${publicKey.toString()}`;
  
  return { did, privateKey: privateKey.toString(), publicKey: publicKey.toString() };
};