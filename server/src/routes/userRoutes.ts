import express from "express";
const router = express.Router()
import { controller } from "../controllers/userController.js";

router.post('/', (req, res) => controller.createUser(req, res))

router.get('/:id', (req, res) => controller.getUser(req, res))

export { router } 