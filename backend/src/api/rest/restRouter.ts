import { Collection } from "@/common/db/dbCollection";
import express, { NextFunction, type Request, type Response, type Router } from "express";

export const restRouter: Router = express.Router();

restRouter.get("/register/admin", async (req: Request, res: Response) => {
    const collection: Collection = new Collection("admin");
    const newAdmin = collection.INSERT({ eventOwnerDID: [] });
    res.cookie("adminToken", newAdmin);

    return res.send("Success");
});

restRouter.get("/register/participant", async (req: Request, res: Response) => {
    const collection: Collection = new Collection("participant");
    const newParticipant = collection.INSERT({ ticketOwnerDID: [] });
    res.cookie("participantToken", newParticipant);

    return res.send("Success");
});

restRouter.get("/event", async (req: Request, res: Response) => {
});

restRouter.get("/event/join", async (req: Request, res: Response) => {
});

restRouter.post(
    "/event/create",
    async (req: Request, res: Response, next: NextFunction) => {
        const adminToken = req.cookies["adminToken"]

        console.log(adminToken)
        if (!adminToken.uuid)
            return res.send("No Permission");

        console.log("aaa")

        const adminCollection: Collection = new Collection("admin");
        console.log(adminToken)
        const query = adminCollection.QUERY({ uuid: (adminToken as any).uuid });
        console.log(query)
        if (!query)
            return res.send("No Permission");

        console.log("aaa")

        next();
    }, async (req: Request, res: Response) => {
        const adminCollection: Collection = new Collection("admin");
        const admin = adminCollection.QUERY({ uuid: req.cookies["adminToken"] });
        console.log(admin);

        const eventCollection: Collection = new Collection("event");
        const newEvent = eventCollection.INSERT({
            name: req.body.name,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            capacity: req.body.capacity,
            ticketPrice: req.body.ticketPrice,
        });

        const eventOwnerDIDCollection: Collection = new Collection("eventOwnerDID");
        const newEventOwnerDID = eventOwnerDIDCollection.INSERT({
            admin: (admin as any).uuid,
            event: (newEvent as any).uuid
        });

        // res.cookie("eventOwnerDID", JSON.stringify((req.cookies["eventOwnerDID"] || []).push((newEventOwnerDID as any).uuid)));
        res.cookie("eventOwnerDID", "Test");

        console.log("AAA")

        return res.send("Success");
    }
);

restRouter.delete("/event/cancel", async (req: Request, res: Response) => {
});

restRouter.get("/event/participants", async (req: Request, res: Response) => {
});

restRouter.post("/event/ticket/give", async (req: Request, res: Response) => {
});

restRouter.post("/event/ticket/revoke", async (req: Request, res: Response) => {
});