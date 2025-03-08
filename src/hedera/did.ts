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

// 确保密钥生成正确
export const generateDID = async () => {
  try {
    const client = getHederaClient();
    // const privateKey = await PrivateKey.generate(); // generate new private key per user // deprecated
    
    // // generate and save privatekey

    // const generateAndSavePrivateKey = async () => {
    // const privateKey = await PrivateKey.generate();
    // localStorage.setItem("userPrivateKey", privateKey.toString());
    // return privateKey;
    // };

    // // read privatekey
    // const getPrivateKey = () => {
    // const privateKeyStr = localStorage.getItem("userPrivateKey");
    // if (!privateKeyStr) throw new Error("私钥未找到");
    // return PrivateKey.fromString(privateKeyStr);
    // };
    const privateKey = PrivateKey.fromString(import.meta.env.VITE_HEDERA_PRIVATE_KEY); // system level static private key
    const publicKey = privateKey.publicKey;
    
    // check if publicKey exists
    if (!publicKey) throw new Error("Failed to generate public key");
    
    const did = `did:hedera:testnet:${publicKey.toString()}`;
    return { did, privateKey: privateKey.toString(), publicKey: publicKey.toString() };
  } catch (error) {
    throw new Error("Error: " + (error instanceof Error ? error.message : "Unknown error"));
  }
};
// export const generateDID = async () => {
//   const client = getHederaClient();
//   const privateKey = PrivateKey.generate();
//   const publicKey = privateKey.publicKey;
  
//   // suppose we use HCS to store (need implementation)
//   const did = `did:hedera:testnet:${publicKey.toString()}`;
  
//   return { did, privateKey: privateKey.toString(), publicKey: publicKey.toString() };
// };