const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nrovuja.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectCollection = client.db("developerPortfolio").collection("projects");


        app.get('/projects', async (req, res) => {
            const projects = await projectCollection.find({}).toArray();
            res.send(projects);
        });

        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const project = await projectCollection.findOne({ _id: ObjectId(id) });
            res.send(project);
        });
    }
    catch (err) {
        console.log(err);
    }
    finally {

    }
}

run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Developer Portfolio server is running');
});

app.listen(port, () => {
    console.log(`Developer Portfolio server is running: ${port}`);
});

