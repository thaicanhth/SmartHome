import express from 'express';
const router = express.Router();
import { Device } from '../models/Device.js';


// Route for save new sensor
router.post('/', async (req, res, next) => {
    try {
        if (
            !req.body.namecategory ||
            !req.body.colorcategory ||
            !req.body.category.name ||
            !req.body.category.topic ||
            !req.body.category.color ||
            !req.body.category.voice ||
            !req.body.category.time ||
            !req.body.category.icon
        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }
        const newDevice = {
            namecategory: req.body.namecategory,
            colorcategory: req.body.colorcategory,
            category: {
                name: req.body.category.name,
                topic: req.body.category.topic,
                status: req.body.category.status,
                color: req.body.category.color,
                voice: req.body.category.voice,
                notification: req.body.category.notification,
                time: req.body.category.time,
                icon: req.body.category.icon
            }
        }
        const device = await Device.create(newDevice)
        return res.status(201).send(device)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Show all device
router.get('/', async (req, res, next) => {
    try {
        const devices = await Device.find({})

        return res.status(200).json({
            count: devices.length,
            data: devices
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Show one device
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const device = await Device.findById(id)

        return res.status(200).json(device)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update one device
router.put('/:id', async (req, res, next) => {
    try {
        if (
            !req.body.namecategory ||
            !req.body.colorcategory ||
            !req.body.category.name ||
            !req.body.category.topic ||
            !req.body.category.color ||
            !req.body.category.voice ||
            !req.body.category.time ||
            !req.body.category.icon

        ) {
            return res.status(400).send({
                message: 'Send all req fields'
            })
        }

        const { id } = req.params
        const result = await Device.findByIdAndUpdate(id, req.body)
        if (!result) {
            return res.status(404).json({ message: 'Device not found' })
        }
        return res.status(200).send({ message: 'Device update successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Delete one device
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await Device.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({ message: 'Device not found' })
        }
        return res.status(200).send({ message: 'Device delete successfully' })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;