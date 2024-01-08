import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import sequelize from './db.js';
import router from './routes/index.js';
import { errorMiddleware } from './middleware/errorHandlingMiddleware.js';
import * as models from './models/models.js';
import path  from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)
app.use(errorMiddleware)

app.get('/', (req,res) => {
    res.status(200).json({message:"Working"})
})

const start = async () => {
 try{
    await sequelize.authenticate();
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
 }  
 catch(e) {
    console.log(e);
 } 
}

start()


