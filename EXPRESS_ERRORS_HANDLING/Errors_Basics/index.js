const express = require('express');
const app = express();
const morgan = require('morgan');

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
  res.send('SORRY YOU NEED A PASSWORD');
  throw new Error('Password required')
})
/* app.use((req, res, next) => {
    console.log('THIS IS MY FIRST MIDDLEWARE')
    return next();
})
app.use((req, res, next) => {
    console.log('THIS IS MY SECOND MIDDLEWARE');
    next();
})
 */
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

app.use((err, req, res, next) => {
    console.log('**************************************');
    console.log('****************ERROR*****************');
    console.log('**************************************');
})
app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})