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
var data = [] //returned string

app.post('/', (req, res) => {


    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            { id: 'firstName', title: 'FirstName' },
            { id: 'lastName', title: 'LastName' },
            { id: 'county', title: 'County' },
            { id: 'city', title: 'City' },
            { id: 'role', title: 'Role' },
            { id: 'sales', title: 'Sales' },
        ]
    });
    var g_a = function (all) {
        var obj = {}
        obj["firstName"] = all["firstName"]
        obj["lastName"] = all["lastName"]
        obj["county"] = all["county"]
        obj["city"] = all["city"]
        obj["role"] = all["role"]
        obj["sales"] = all["sales"]
        data.push(obj)
        if (all["children"].length !== 0) {
            for (var i = 0; i < all["children"].length; i++) {
                g_a(all["children"][i])
            }

        }
    }

    g_a(req.body);






    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
    // res.set('Content-Type', 'application/octet-stream');
    // res.send(out.csv);
    res.send(Buffer.from(out.csv));
})
app.listen(port, () => console.log(`Server is listening to port ${port}`))





