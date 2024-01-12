import express from 'express';
import { router as controllerRouter } from './src/routes/controller.routes.js';
import { router as ecgRouter } from './src/routes/ecg.routes.js';
import { router as emgRouter } from './src/routes/emg.routes.js';
import { router as temperatureRouter } from './src/routes/temperature.routes.js';
import { router as userRouter } from './src/routes/user.routes.js';
import {swaggerDocs as V1SwaggerDocs} from './routes/swagger.js'; // Asegúrate de proporcionar la ruta correcta

const PORT = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//swagger
V1SwaggerDocs(app, PORT);
// Rutas
app.use('/controller', controllerRouter);
app.use('/ecg', ecgRouter);
app.use('/emg', emgRouter);
app.use('/temperature', temperatureRouter);
app.use('/user', userRouter);

// Swagger Docs
swaggerDocs(app, PORT);

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

console.log(`Server on port ${PORT}`);
