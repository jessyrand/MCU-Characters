import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

function newId(characters) {
    characters.sort((a, b) => a.id - b.id);
    return characters[characters.length - 1].id + 1 ;
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('MCU Characters API running');
});

app.get('/characters', (req, res) => {
    fs.readFile('./characters.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    })
})

app.get('/characters/:id', (req, res) => {
    fs.readFile('./characters.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        let characters = JSON.parse(data).characters;
        const id = req.params.id;

        const foundCharacter = characters.find((character) => character.id === id);

        res.send(foundCharacter);
    })
})

app.post('/characters', (req, res) => {
    fs.readFile('./characters.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        try {
            let characters = JSON.parse(data).characters;

            const {name, realName, universe} = req.body;
            if(!name || !realName || !universe) {
                return res.status(400).send({error: 'Missing name, realName or universe'});
            }

            const id = newId(characters)
            const newCharacter = {id, name, realName, universe}
            characters.push(newCharacter);

            fs.writeFile('./characters.json', JSON.stringify({ characters }), (err) => {
                if (err) {
                    res.send(err);
                }
                res.status(201).send(newCharacter);
            })

        } catch (err){
            res.status(500).send("Error writing characters.");
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
