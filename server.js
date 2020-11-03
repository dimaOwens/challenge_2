//csv 
//import { Parser } from 'json2csv';
const express = require('express');
const app = express();
const path = require("path")
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const csv = require('csv-parser');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;




app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.get('/', (req, res) => {
    res.send("hello back")
})
var data = [] //returned string

app.post('/', (req, res) => {


    const pathA = './out.csv'

    try {
        fs.unlinkSync(pathA)
        console.log("REMOVED")
        //file removed
    } catch (err) {
        console.log("OOps")
    }
    data = []

    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            { id: 'firstName', title: 'FirstName' },
            { id: 'lastName', title: 'LastName' },
            { id: 'county', title: 'County' },
            { id: 'city', title: 'City' },
            { id: 'role', title: 'Role' },
            { id: 'sales', title: 'Sales' },
            { id: 'children', title: 'Children' }
        ]
    });
    var g_a = function (all) {
        console.log(all)
        console.log(typeof all)
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


    if (typeof req.body.full === 'string') {
        g_a(JSON.parse(req.body.full));
    }
    else {
        g_a(req.body.full);
    }

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'))
        .catch(() => console.log("ERR in writing CSV file"))
        .then(() => res.sendFile(path.join(__dirname, '/out.csv')))


})
app.listen(port, () => console.log(`Server is listening to port ${port}`))





