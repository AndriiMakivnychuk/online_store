import* as models from '../models/models.js'
import { ApiError } from '../error/ApiError.js'

export class TypeController {
    async create (req,res) {
        const {name} = req.body
        const type = await models.default.Type.create({name})
        res.json(type)
    }
    async getAll (req,res) {
        const types = await models.default.Type.findAll();
        res.json(types)
    }
}
