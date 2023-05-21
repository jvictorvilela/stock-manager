import express from 'express'; 
import cors from 'cors';
import 'dotenv/config';
import bodyParser from 'body-parser';
import UserRoutes from './src/routes/UserRoutes.js';
import LoginRoutes from './src/routes/LoginRoutes.js';
import ProductRoutes from './src/routes/ProductRoutes.js';
import MovementRoutes from './src/routes/MovementRoutes.js';

const app = new express();
const port = process.env.APP_PORT ?? 3000;

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

app.use(express.json());
app.use(bodyParser.json());

app.use('/login', LoginRoutes);
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes)
app.use('/movements', MovementRoutes)

app.get('/', (req, res) => {
    res.send('Backend aqui :)');
});

app.listen(port, () => {
    console.log(`Aplicação backend rodando na porta ${port}.`);
});