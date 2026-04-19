import express from "express";
import * as ItemsController from "../Controller/ItemsController.js";

const ItemsRouter = express.Router();

ItemsRouter.post("/", ItemsController.postAddItems);
ItemsRouter.get("/" , ItemsController.getItems);
ItemsRouter.delete("/:_id" , ItemsController.deleteItem);
ItemsRouter.put("/:_id" , ItemsController.updateItem);

export default ItemsRouter;