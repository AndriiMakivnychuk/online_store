import* as models from '../models/models.js'
import { ApiError } from "../error/ApiError.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'

const generateJwt = (id, email, role) => {
    return jsonwebtoken.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

export class UserController {
    async registration (req,res,next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('invalid email or password'))
        }
        const candidate = await models.default.User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('User is alrady exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await models.default.User.create({email, role, password: hashPassword})
        const basket = await models.default.Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login (req,res,next) {
        const {email, password} = req.body
        const user = await models.default.User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('not found'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check (req,res,next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

