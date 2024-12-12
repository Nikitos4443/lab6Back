const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');

app.use(express.json());
app.use(cors({
    origin: 'https://lab6front.railway.internal',
}));
app.use('/', router);

app.listen(5000, () => {
    console.log('Server is working on localhost:5000');
})
