import* as models from '../models/models.js'
import { ApiError } from '../error/ApiError.js'
import { v4 as uuidv4} from 'uuid';
import path from 'path'


export class DeviceController {
    async create (req,res,next) {

        try {
            let {name,price,brandId,typeId,info} = req.body
            const {img} = req.files
            const filename = uuidv4() + ".jpg"
            const currentDir = new URL(import.meta.url).pathname;
            const dirPath = path.resolve(currentDir, '../../', 'static', filename);

            img.mv(dirPath);
    
            const device = await models.default.Device.create({name,price,brandId,typeId,info,img:filename})


            if (info) {
                info = await JSON.parse(info)
                console.log(info);
                console.log(Array.isArray(info));
                info.forEach(i =>
                    models.default.DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
    
    
            res.json(device)
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }


    }
    async getAll (req,res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await models.default.Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            devices = await models.default.Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            devices = await models.default.Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await models.default.Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
        
    }
    async getOne (req,res) {
        const {id} = req.params
        const device = await models.default.Device.findOne(
            {
                where: {id},
                include: [{model: models.default.DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}
