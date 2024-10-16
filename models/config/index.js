import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const uri =
  process.env.MONGODB_URI || 'mongodb+srv://iaajofficialextended1123:AfGT6nT62UtJCyJZ@cluster0.t1svg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!uri) {
  throw new Error("MONGO_DB Connection is not provided");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//To Export db and db.getCollection()
export const db = client.db("NotesApp");

export const getCollection = (collectionName) => {
  return db.collection(collectionName);
};
