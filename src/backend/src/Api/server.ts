import mongoose from "mongoose";
import { connectionString } from "../Infra/DbConfig/dbConfig"
import { app } from "./app"

mongoose.connect(connectionString)
  .then(() =>{
  app.listen(3333);
  console.log('Conectou ao banco')
}).catch((err) => console.log(err))

