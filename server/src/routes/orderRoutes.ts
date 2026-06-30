import express from "express";
const router = express.Router()
import { controller } from "../controllers/orderController.js";

router.post('/', (req, res) => controller.createOrder(req, res))

router.get('/:id', (req, res) => controller.getOrder(req, res))

router.get('customer/:customerId', (req, res) => controller.getOrders(req, res))

router.get('/all', (req, res) => controller.getAllOrders(req, res))

router.put('/:id', (req, res) => controller.updateOrder(req, res))

router.delete('/:id', (req, res) => controller.deleteOrder(req, res))

export { router } 