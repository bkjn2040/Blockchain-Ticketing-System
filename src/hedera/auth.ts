import { PrivateKey } from "@hashgraph/sdk";

export const signChallenge = (challenge: string, privateKeyStr: string) => {
    const privateKey = PrivateKey.fromString(privateKeyStr);
    const signature = privateKey.sign(Buffer.from(challenge));
    return Buffer.from(signature).toString("hex"); // 正确转换 Buffer 为十六进制
};
// 可扩展验证逻辑（如与后端交互验证签名）