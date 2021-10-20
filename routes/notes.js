const notes = require('express').Router();
const fs = require('fs');

notes.get('/', (req,res) => {
    fs.readFileSync('../db/db.json', 'utf-8', (err,data) => {
        if(err) {console.log(err);}
        else {
            res.json(JSON.parse(data));
            }
        })
});

notes.post('/', (req,res) => {
    console.log(req.body);

    const{ title, text} = req.body;

    fs.readFileSync('../db/db.json', 'utf-8', (err,data) => {
        if(err) {console.log(err);}
        else {
            if(req.body) {
                const newNote = {
                    title: title,
                    text: text,
                }
                let newData = JSON.parse(data);
                newData.push(newNote);
                fs.writeFileSync('../db/db.json', JSON.stringify(newData, null, 4), (err) => {
                    if(err) {console.error(err);}
                    else{
                        res.json(newData);
                        console.info('\nNew note has been written');
                    }
                })
            };
            
        }
    })
});

module.exports = notes;

