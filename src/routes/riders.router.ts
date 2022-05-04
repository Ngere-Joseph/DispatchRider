// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import dispatchRiders from "../models/rider";

// Global Config
export const ridersRouter = express.Router();

ridersRouter.use(express.json());
// GET
ridersRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const dispatchRiders = (await collections.dispatchRiders.find({}).toArray()) as unknown as dispatchRiders[];

        res.status(200).send(dispatchRiders);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

ridersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const dispatchRiders = (await collections.dispatchRiders.findOne(query)) as unknown as dispatchRiders;

        if (dispatchRiders) {
            res.status(200).send(dispatchRiders);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
ridersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as dispatchRiders;
        const result = await collections.dispatchRiders.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// PUT
ridersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedRider: dispatchRiders = req.body as dispatchRiders;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.dispatchRiders.updateOne(query, { $set: updatedRider });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// DELETE
ridersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.dispatchRiders.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});