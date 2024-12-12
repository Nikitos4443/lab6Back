const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:63342',
}));
app.use('/', router);

app.listen(5000, 'localhost', () => {
    console.log('Server is working on localhost:5000');
})