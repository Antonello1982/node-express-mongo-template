const express = require('express');
const PetService = require('../services/petService');

const petAPI = (app) => {
    const route = express.Router();
    const petService = new PetService()

    app.use('/api', route);

    route.get('/getPets', async (req, res) => {
        const result = await petService.getPets();
        res.send(result)

    })
    route.get('/getSpeciesDetails', async (req, res) => {
        const result = await petService.getSpeciesPets();
        res.send(result);
    })

    route.post('/insertPet', async (req, res) => {
        console.log(req.body);
        const pet = req.body;
        const result = await petService.insertPet(pet);
        res.send(result)
    })

}
module.exports = petAPI;