import* as models from '../models/models.js'
import { ApiError } from '../error/ApiError.js'

export class BrandController {
    async create (req,res) {
        const {name} = req.body
        const brand = await models.default.Brand.create({name})
        res.json(brand)
    }
    async getAll (req,res) {
        const brands = await models.default.Brand.findAll();
        res.json(brands)
    }
}
