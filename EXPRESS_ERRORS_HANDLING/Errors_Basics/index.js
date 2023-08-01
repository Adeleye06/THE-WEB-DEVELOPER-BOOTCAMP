const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError')
app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS');
    next();
})

const verifyPassword = ((req, res, next) => {
    const {password} = req.query;
    if(password === 'chickennuggets'){
        next();
    }
    throw new AppError('password required', 401);
  /* res.send('SORRY YOU NEED A PASSWORD'); */
  /* throw new AppError(401,'Password required') */
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`);
    res.send('HOME PAGE');
})
app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so i do not have to talk to anyone');
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND');
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log('**************************************');
    console.log('****************ERROR*****************');
    console.log('**************************************');
    console.log(err);
    next(err);
})
app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})