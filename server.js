const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');

app.use(express.json());
app.use(cors({
    origin: 'https://github.com/Nikitos4443/lab6front',
}));
app.use('/', router);

app.listen(5000, () => {
    console.log('Server is working on localhost:5000');
})
