import express from "express";
const router = express.Router()
import { controller } from "../controllers/authController.js";

router.post('/', (req, res) => controller.signIn(req, res))

router.get('/',(req,res)=>controller.getUser(req,res))

export { router } 