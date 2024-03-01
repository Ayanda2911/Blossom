
import { MongoClient, ServerApiVersion} from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();

const uri = `mongodb+srv://mcanyanaayanda:${encodeURIComponent(process.env.DB_PASSWORD)}@cluster0.2jw9wmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
});

// check if the connection is successful
try{
    await client.connect();
    console.log('connected');
}
catch(e){
    console.error(e);
    await client.close();
    console.log('closed');
}


export default client;