const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const app = express();

const bcryptSalt = bcrypt.genSaltSync(8);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: '*',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(user);
});

app.listen(4000);