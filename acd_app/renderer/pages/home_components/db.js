'use server'
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
//change to process.env.dbPassword when going live on server
const uri = `mongodb+srv://WriteUser:${process.env.dbPassword}@acbuildsite.id5i3hu.mongodb.net/?retryWrites=true&w=majority`; //for production

//two databases: 
//one, the online that is retrieved only when recorded db version isn't matching most recent db version
//two, the offline that is stored in localStorage

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

export async function loadExistingDBData() { //here we can check for which database like "ACPreRelease" or "ACv1.0.0"
  const unitData = await client.db("ACDatabase1").collection("ACUnitSpecs").find().toArray();
  const frameData = await client.db("ACDatabase1").collection("ACFrameSpecs").find().toArray();
  const innerData = await client.db("ACDatabase1").collection("ACInnerSpecs").find().toArray();
  const expansionData = await client.db("ACDatabase1").collection("ACExpansionSpecs").find().toArray();

  const data = [unitData, frameData, innerData, expansionData];
  return data;
}

export async function uploadUnitData(data) {
  return await client.db("ACDatabase1").collection("ACUnitSpecs").insertMany(data);
}
export async function uploadFrameData(data) {
  return await client.db("ACDatabase1").collection("ACFrameSpecs").insertMany(data);
}
export async function uploadInnerData(data) {
  return await client.db("ACDatabase1").collection("ACInnerSpecs").insertMany(data);
}
export async function uploadExpansionData(data) {
  return await client.db("ACDatabase1").collection("ACExpansionSpecs").insertMany(data);
}
export async function uploadVersionData(ver, com) {
  const ver_com = {version: ver, comment: com};
  return await client.db("ACDatabase1").collection("Version").insertOne(ver_com);
}


export async function dbInit() {
  await connectDB();
  const data = await client.db("ACDatabase1").collection("Version").find().sort({version: -1}).limit(1).toArray();
  return data[0]['version'];
}

    //console.log(await data.findOne({name: "VP-67LD"}));
/*const data = await client.db("ACDatabase1").collection(menuQuery);
  const organizedData = await data.find(partQuery).toArray(function(err, documents) {
    if (err) {
      console.log(err);
    }

    const partData = Object.values(organizedData)
    .filter(obj => obj.hasOwnProperty('name'))
    .map(obj => obj.name);
  }); */
