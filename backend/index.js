import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
