import multer from "multer";

import { Request, Response, Router } from "express";
import { ClientRepository } from "./repositories/ClientRepository";

const routes = Router();
const clientRepository = new ClientRepository();

const upload = multer({
  dest: "./tmp",
});

routes.post(
  "/client/add",
  upload.single("file"),
  (request: Request, response: Response) => {
    const { file } = request;

    if (!file) {
      return response.status(400).json({ message: "File not found! :/" });
    }

    clientRepository.import(file);
    
    return response.status(201).json({ message: "OK!" });
  
  }
);

routes.get("/client/list", (request: Request, response: Response) => {
  const clients = clientRepository.list();

  return response.status(200).json({ clients });
})

export { routes };