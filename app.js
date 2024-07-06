const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const checkURL = require('./helpers/checkURL')

const port = 5000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.post('/shorten', async(req, res) => {
    checkURL()
    try { 
        // GET DATA FROM FRONTEND
        const response = await fetch('https://cleanuri.com/api/v1/shorten', {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ url: req.body.url }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        // SEND DATA TO USER
        res.json(data);
    } catch (error) {
        console.error('Error while downloading data:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(port, () => {
	console.log('server running')
})
