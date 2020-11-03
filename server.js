//csv 
//import { Parser } from 'json2csv';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

app.get('/', (req, res) => {
    res.send("hello back")
})
var r_s = [] //returned string
app.post('/', (req, res) => {
    console.log(req.body)
    const csvWriter = createCsvWriter({


        console.log(data)
    csvWriter
        .writeRecords(data)
            .then(() => console.log('The CSV file was written successfully'));
        res.send("ok done")
    })
    app.listen(port, () => console.log(`Server is listening to port ${port}`))


// header: [
//     { id: 'firstName', title: 'FirstName' },
//     { id: 'lastName', title: 'LastName' },
//     { id: 'county', title: 'Country' },
//     { id: 'city', title: 'City' },
//     { id: 'role', title: 'Role' },
//     { id: 'sales', title: 'Sales' },
// ]
// });

// const data = req.body;
// console.log(data)
