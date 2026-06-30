import express from "express";
const router = express.Router()
import { controller } from "../controllers/itemController.js";

router.post('/', (req, res) => controller.createItem(req, res))

router.get('/:id', (req, res) => controller.getItem(req, res))

router.get('/', (req, res) => controller.getItems(req, res))

router.put('/:id', (req, res) => controller.updateItem(req, res))

router.delete('/:id', (req, res) => controller.deleteItem(req, res))

export { router } 