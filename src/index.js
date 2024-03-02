import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import routes from './routes/index.js';
import fileUpload from "express-fileupload";
import { errorHandler } from './middleware/error-handler.js';
import cron from 'node-cron';
import { discountService } from './features/discounts/discounts.service.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ credentials:true, origin:'http://localhost:5173' }));
app.use(cookieParser());
app.use(fileUpload());
app.use(routes);
app.use(express.static("public"));

app.use(errorHandler);

// cron.schedule('* * * * *', async () => { 
//     console.log('Running cron job to update discount status...');
//     await discountService.updateDiscountStatus();
// });

const currentServerTime = new Date();
console.log(currentServerTime);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
