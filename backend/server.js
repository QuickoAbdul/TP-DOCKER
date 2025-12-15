const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

/* Connexion MongoDB */

const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/testdb';

mongoose.connect(mongoUri)
    .then(() => {
        console.log('MongoDB connecté');
        app.listen(port, () => {
            console.log(`Serveur Node.js écoutant sur le port ${port}`);
        });
    })
    .catch(err => console.error('Erreur de connexion MongoDB :', err));

/* Schema */
const counterSchema = new mongoose.Schema({
    value: Number
});

/* Model */
const Counter = mongoose.model('Counter', counterSchema);

app.use(cors());
app.use(express.json());

app.post('/api/save', async (req, res) => {
    const { value } = req.body;
    console.log('Valeur reçue du compteur :', value);

    try {
        const newCounter = new Counter({ value });
        await newCounter.save();
        res.status(200).json({ message: 'Valeur reçue et sauvegardée avec succès' });
    } catch (err) {
        console.error('Erreur lors de la sauvegarde :', err);
        res.status(500).json({ message: 'Erreur serveur lors de la sauvegarde' });
    }
});
