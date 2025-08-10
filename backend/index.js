const express = require('express');
const cors = require('cors');
const fs = require('fs');

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
        res.json(JSON.parse(data));
    })
})

app.get('/characters/:id', (req, res) => {
    fs.readFile('./characters.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        let characters = JSON.parse(data).characters;
        const id = parseInt(req.params.id, 10);

        const foundCharacter = characters.find((character) => character.id === id);

        if (!foundCharacter) {
            return res.status(404).send({ error: 'Character not found' });
        }
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

app.put('/characters/:id', (req, res) => {
    fs.readFile('./characters.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        try {
            let characters = JSON.parse(data).characters;
            const {id, name, realName, universe} = req.body;

            const paramsId = parseInt(req.params.id, 10);

            const characterIndex = characters.findIndex((character) => character.id === paramsId);

            if (characterIndex === -1) {
                return res.status(404).send({ error: "Character not found" });
            }

            if(!id || !name || !realName || !universe) {
                return res.status(400).send({error: 'Missing id, name, realName or universe'});
            }

            for(const character of characters) {
                if (character.id === id &&  character.id !== paramsId) {
                    return res.status(400).send({error: 'id must be unique'});
                }
            }

            characters[characterIndex] = {id, name, realName, universe};

            fs.writeFile('./characters.json', JSON.stringify({ characters }), (err) => {
                if (err) {
                    res.send(err);
                }
                res.send(characters[characterIndex]);
            })
        }

        catch(err){
            res.status(500).send("Error writing characters.");
        }

    })
})

app.delete('/characters/:id', (req, res) => {
    fs.readFile('./characters.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
        }
        try {
            let characters = JSON.parse(data).characters;
            const paramsId = parseInt(req.params.id, 10);
            const characterIndex = characters.findIndex((character) => character.id === paramsId);

            if (characterIndex === -1) {
                return res.status(404).send({ error: "Character not found" });
            }

            const [deletedCharacter] = characters.splice(characterIndex, 1);

            fs.writeFile('./characters.json', JSON.stringify({ characters }), (err) => {
                if (err) {
                    res.send(err);
                }
                res.send({message: 'Characters deleted successfully.', character: deletedCharacter});
            })
        }
        catch (err) {
            res.status(500).send("Error deleting character.");
        }
    })
})

module.exports = app;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

