import express from 'express'
const router = express.Router()
import { History } from '../models/History.js'

router.get('/', async (req, res, next) => {
    try {
        const history = await History.find({})

        return res.status(200).json({
            count: history.length,
            data: history
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const newcategory = req.body.hcategory
        const newname = req.body.hname
        const newstatus = req.body.hstatus ? "on" : "off"

        const newHistory = {
            hcategory: newcategory,
            hname: newname,
            hstatus: req.body.hstatus,
            hnotification: `The ${newcategory} ${newname} is ${newstatus}`
        }
        const history = await History.create(newHistory)
        return res.status(201).send(history)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router