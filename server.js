const express = require('express');
const app = express();

const connection = require('./db/connection');
connection();


const authController = require('./controllers/authController');

app.use(express.json());

app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
/*app.get('/auth/profile', authController.profile);
app.delete('/auth/logout', authController.logout);
app.post('/auth/refresh', authController.refresh); */

app.listen(3000, () => {   
    console.log('Server is running on port 3000');
});
