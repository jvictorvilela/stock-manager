const express = require('express'); 
const cors = require('cors');
require('dotenv/config');
const db = require('./src/db/connection.js');

const app = new express();
const port = process.env.APP_PORT ?? 3000;

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

app.use(express.json());

//app.use('/api')

app.get('/', (req, res) => {
    res.send('Backend aqui :)');
});

app.listen(port, () => {
    console.log(`Aplicação backend rodando na porta ${port}.`);
});

db.authenticate().then(() => {
    console.log('Conexão estabelecida com o banco.');
}).catch((err) => {
    console.log('Erro ao se conectar com o banco:', err);
})