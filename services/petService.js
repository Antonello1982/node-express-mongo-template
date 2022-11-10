const { MongoClient } = require("mongodb");
require('dotenv').config();

class PetService {
    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI);
        this.dataBase = this.client.db('animals');
    }
    async getPets() {
        const collection = this.dataBase.collection('pet')
        const result = await collection.find().toArray();
        return result

    }

    async getSpeciesPets() {
        const collection = this.dataBase.collection('pet')
        const result = await collection.aggregate([{
            $lookup: {
                from: 'species',
                localField: 'id_specie',
                foreignField: 'id_specie',
                as: 'speciesDetails'

            }
        }]).toArray();
        return result
    }
    async insertPet(pet) {
        const count = await this.counter();
        const collection = this.dataBase.collection('pet')
        pet.id_pet = count.seq_value;
        const result = collection.insertOne(pet)
        return result;
    }
    async counter() {
        const collection = this.dataBase.collection('counters');
        const result = await collection.findOneAndUpdate(
            { _id: 'petCount' },
            { $inc: { seq_value: 1 } });
        return result.value;
    }

}



module.exports = PetService;