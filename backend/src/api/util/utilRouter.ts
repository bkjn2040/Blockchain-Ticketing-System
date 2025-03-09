import { DidDocumentBase, HcsDid, HcsDidMessage, MessageEnvelope } from "@hashgraph/did-sdk-js";
import { FileId, PrivateKey, PublicKey } from "@hashgraph/sdk";
import axios from "axios";
import express, { type Request, type Response, type Router } from "express";

export const utilRouter: Router = express.Router();

const instance = axios.create({
    baseURL: "http://localhost:5050",
    timeout: 1000
});

utilRouter.get("/be-admin", async (req: Request, res: Response) => {
    const privateKey: PrivateKey = PrivateKey.generate();
    const publicKey: PublicKey = privateKey.publicKey;
    const fileId: string = await instance.get("/util").then(res => res.data).catch(err => console.log(err));

    const did: HcsDid = new HcsDid("testnet", publicKey, FileId.fromString(fileId));
    const doc: DidDocumentBase = did.generateDidDocument();

    interface ConcreteDidDocument extends DidDocumentBase {
        type: string;
        name: string;
    }

    const json: ConcreteDidDocument = JSON.parse(doc.toJSON());
    json.type = "perms";
    json.name = "admin";

    const create = await instance.post("/did", json).then(res => res.data).catch(err => /*console.log(err)*/err);

    const envelope = MessageEnvelope.fromJson(JSON.stringify(create), HcsDidMessage);
    const signed = envelope.sign(m => privateKey.sign(m));

    let str = "";
    for (let i = 0; i < signed.length; i++)
        str += '%' + ('0' + signed[i].toString(16)).slice(-2);
    str = decodeURIComponent(str);

    await instance.post("/did-submit", str).then(res => res).catch(err => console.log(err));
    
    return res.json(JSON.parse(str));
});

utilRouter.get("/generate-admin-did", async (_req: Request, res: Response) => {
    const privateKey: PrivateKey = PrivateKey.generate();
    const publicKey: PublicKey = privateKey.publicKey;
    const fileId: string = await instance.get("/util").then(res => res.data).catch(err => console.log(err));

    const did: HcsDid = new HcsDid("testnet", publicKey, FileId.fromString(fileId));
    const doc: DidDocumentBase = did.generateDidDocument();

    interface ConcreteDidDocument extends DidDocumentBase {
        type: string;
        name: string;
    }

    const json: ConcreteDidDocument = JSON.parse(doc.toJSON());
    json.type = "perms";
    json.name = "admin";
    
    return res.json(json);
});

utilRouter.get("/generate-participant-did", async (_req: Request, res: Response) => {
    const privateKey: PrivateKey = PrivateKey.generate();
    const publicKey: PublicKey = privateKey.publicKey;
    const fileId: string = await instance.get("/util").then(res => res.data).catch(err => console.log(err));

    const did: HcsDid = new HcsDid("testnet", publicKey, FileId.fromString(fileId));
    const doc: DidDocumentBase = did.generateDidDocument();

    interface ConcreteDidDocument extends DidDocumentBase {
        type: string;
        name: string;
    }

    const json: ConcreteDidDocument = JSON.parse(doc.toJSON());
    json.type = "perms";
    json.name = "participant";
    
    return res.json(json);
});

utilRouter.get("/generate-ticket-did", async (_req: Request, res: Response) => {
    const privateKey: PrivateKey = PrivateKey.generate();
    const publicKey: PublicKey = privateKey.publicKey;
    const fileId: string = await instance.get("/util").then(res => res.data).catch(err => console.log(err));

    const did: HcsDid = new HcsDid("testnet", publicKey, FileId.fromString(fileId));
    const doc: DidDocumentBase = did.generateDidDocument();

    interface ConcreteDidDocument extends DidDocumentBase {
        type: string;
        name: string;
    }

    const json: ConcreteDidDocument = JSON.parse(doc.toJSON());
    json.type = "obj";
    json.name = "ticket";
    
    return res.json(json);
});
