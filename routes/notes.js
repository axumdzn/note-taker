const notes = require('express').Router();
const fs = require('fs');

notes.get('/', (req,res) => {
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) {console.log(err);}
        else {
            res.json(JSON.parse(data));
            }
        })
});

notes.post('/', (req,res) => {
    console.log(req.body);

    const{ title, text} = req.body;

    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) {console.log(err);}
        else {
                
                let newData = JSON.parse(data);
                let newID = 1;
                console.log(newData);
                if(newData.length !== 0){
                    newID = newData[newData.length-1].id + 1;
                }
                const newNote = {
                    id: newID,
                    title: title,
                    text: text,
                }
                newData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(newData, null, 4), (err) => {
                    if(err) {console.error(err);}
                    else{
                        res.json(newData);
                        console.info('\nNew note has been written');
                    }
                })
            };
            
        }
    )
});


notes.delete('/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) {console.log(err);}
        else {
                let nData = JSON.parse(data);
                let newData= nData.filter(nata => nata.id != req.params.id);
                console.log(req.params.id);
                console.log(newData);
                fs.writeFile('./db/db.json', JSON.stringify(newData, null, 4), (err) => {
                    if(err) {console.error(err);}
                    else{
                        res.json(newData);
                        console.info('\nNote has been Deleted');
                    }
                })
            };
            
        }
    )
})


module.exports = notes;

