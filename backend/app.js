import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./Router/userRouter.js"
import ItemsRouter from "./Router/itemsRouter.js";
const app = express();
const PORT = 8000;
const pathDB =
"mongodb+srv://shirsathabhi512:shirsathabhi512@cluster0.x7v8wyq.mongodb.net/BigDream?retryWrites=true&w=majority";
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin:"http://localhost:5173",

}));
app.use("/api/user" , userRouter)
app.use("/api/items" , ItemsRouter)
mongoose.connect(pathDB).then( ()=>{
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
        console.log(`The server is running on ${PORT} `);
      });
})

