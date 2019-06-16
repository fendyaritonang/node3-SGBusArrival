const express = require('express')
const path = require('path')
const hbs = require('hbs')
const arrival = require('./utils/arrival')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/arrival', (req, res) => {
    if (!req.query.buscode){
        return res.send({
            error: 'You must provide bust stop code'
        })
    }
    
    arrival(req.query.buscode, (error, busService = {}) => {
        if (error){
            return res.send({ error })
        }

        res.send(busService)
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Fendy',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Service is up on port ' + port)
})