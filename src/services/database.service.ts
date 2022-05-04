// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { dispatchRiders?: mongoDB.Collection } = {}
// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const riderCollection: mongoDB.Collection = db.collection(process.env.DISPATCHER_COLLECTION_NAME);
 
  collections.dispatchRiders = riderCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${riderCollection.collectionName}`);
 }