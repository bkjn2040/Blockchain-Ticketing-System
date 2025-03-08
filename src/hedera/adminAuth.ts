import { 
  Client, 
  PrivateKey, 
  TopicMessageSubmitTransaction, 
  TopicCreateTransaction, 
  ReceiptStatusError 
} from "@hashgraph/sdk";

// Initialize Hedera Client
export const getHederaClient = (): Client => {
  if (!import.meta.env.VITE_HEDERA_ACCOUNT_ID || !import.meta.env.VITE_HEDERA_PRIVATE_KEY) {
    throw new Error("Missing Hedera environment variables");
  }
  const client = Client.forTestnet();
  client.setOperator(
    import.meta.env.VITE_HEDERA_ACCOUNT_ID,
    import.meta.env.VITE_HEDERA_PRIVATE_KEY
  );
  return client;
};

// Generate DID from an existing private key (without generating a new one)
export const generateDID = (privateKeyStr: string): { did: string; privateKey: string; publicKey: string } => {
  try {
    const privateKey = PrivateKey.fromString(privateKeyStr);
    const publicKey = privateKey.publicKey;
    const did = `did:hedera:testnet:${publicKey.toString()}`;
    return { did, privateKey: privateKey.toString(), publicKey: publicKey.toString() };
  } catch (error) {
    throw new Error("Error generating DID: " + (error as Error).message);
  }
};

// Read existing private key from file
export const readPrivateKeyFromFile = async (): Promise<string> => {
  if (!("showOpenFilePicker" in window)) {
    alert("Your browser does not support the File System Access API. Please use a modern browser.");
    throw new Error("File System Access API not supported");
  }

  try {
    const [fileHandle] = await (window as any).showOpenFilePicker({
      types: [
        {
          description: "Private Key File",
          accept: { "text/plain": [".pem"] },
        },
      ],
    });
    const file = await fileHandle.getFile();
    return await file.text();
  } catch (error) {
    throw new Error("Private key file selection canceled or error reading file.");
  }
};

// Validate DID on Hedera Network using the provided private key
export const validateDIDOnHedera = async (did: string, privateKeyStr: string): Promise<boolean> => {
  try {
    const client = getHederaClient();
    const key = PrivateKey.fromString(privateKeyStr);
    
    // Create Topic using the provided key for submit and admin roles
    const topicTransaction = new TopicCreateTransaction()
      .setSubmitKey(key)
      .setAdminKey(key);

    const topicResponse = await topicTransaction.execute(client);
    const topicReceipt = await topicResponse.getReceipt(client);

    if (!topicReceipt.topicId) {
      throw new Error("Failed to create topic");
    }

    // Submit a DID verification message
    const messageTransaction = new TopicMessageSubmitTransaction()
      .setTopicId(topicReceipt.topicId)
      .setMessage(JSON.stringify({ did }));

    const messageResponse = await messageTransaction.execute(client);
    const messageReceipt = await messageResponse.getReceipt(client);

    return messageReceipt.status.toString() === "SUCCESS";

  } catch (error) {
    if (error instanceof ReceiptStatusError) {
      console.error(`Transaction failed: ${error.status}`);
    }
    throw new Error("Validation error: " + (error as Error).message);
  }
};

// Main Admin Authentication Functionality
export const authenticateAdmin = async (setAdminAuthenticated: (isAuthenticated: boolean) => void): Promise<boolean> => {
  try {
    // 1. Read existing private key from file
    const privateKey = await readPrivateKeyFromFile();
    
    // 2. Generate DID from the existing private key
    const { did } = generateDID(privateKey);

    // 3. Validate DID on Hedera using the provided private key
    const isValid = await validateDIDOnHedera(did, privateKey);
    
    if (isValid) {
      console.log("DID validated successfully:", did);
      setAdminAuthenticated(true);
      return true;
    } else {
      console.error("DID validation failed.");
      alert("DID validation failed. Please try again.");
      return false;
    }
  } catch (error) {
    console.error("Authentication Error:", (error as Error).message);
    alert("Error: " + (error as Error).message);
    return false;
  }
};
