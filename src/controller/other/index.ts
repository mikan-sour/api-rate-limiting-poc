import { Request, Response } from "express";
import * as CONFIG from "../../config";
import { getErrorMessage } from "../../utils";

export const marcoController =  (_:Request, res:Response) => {
    res.send(`Polo`);
};

export const environmentVariablesController = async (_req:Request, res:Response) => {
    try {
        res.status(200).send({...CONFIG});
    } catch (error) {
        const msg = getErrorMessage(error)
        res.status(500).send({msg});
    }
}

