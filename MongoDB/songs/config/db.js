import 'dotenv/config'
import {MongoClient} from 'mongodb';

let db = null;

export const connection = async () => {
    const client = new MongoClient(process.env.MONGO_URL)
    await client.connect();
    db = client.db()
    console.log("Connected to MongoDB");

}

export const getDB = () => {
    if(!db){
        throw new Error("No database found !")
    }
    return db
}