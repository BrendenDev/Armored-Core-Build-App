'use server'
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://ReadUser:${process.env.dbPassword}@acbuildsite.id5i3hu.mongodb.net/?retryWrites=true&w=majority`; //for production

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

async function checkDBUpdated(version) {
  const data = await client.db("ACDatabasePreRelease").collection("Version").find().sort({version: -1}).limit(1).toArray();
  const currentVersion = data[0]['version'];

  //if not version does not exist, return false
  if(version === null) {
    console.log("no recorded db version, retrieving info")
    return [false, currentVersion];
  }

  //if there is version and it is up-to-date return true and the current version. If not,  return false, and the current version.
  const recordedVersion = parseFloat(version);

  if(recordedVersion !== currentVersion) {
    console.log("db versions do not match, updating info");
    return [false, currentVersion];
  }
  else {
    console.log("db versions do match");
    return [true, currentVersion];
  }
}

async function loadData() { //here we can check for which database like "ACPreRelease" or "ACv1.0.0"
  const unitData = await client.db("ACDatabasePreRelease").collection("ACUnitSpecs").find().toArray();
  const frameData = await client.db("ACDatabasePreRelease").collection("ACFrameSpecs").find().toArray();
  const innerData = await client.db("ACDatabasePreRelease").collection("ACInnerSpecs").find().toArray();
  const expansionData = await client.db("ACDatabasePreRelease").collection("ACExpansionSpecs").find().toArray();

  const data = [unitData, frameData, innerData, expansionData];
  return data;
}



export async function preloadData(recordedVersion) {
  await connectDB(); 
  const [updated, currentVersion] = await checkDBUpdated(recordedVersion); 
  
  //if version is up-to-date, return version. If it is not, preload data and return current version with preloaded data.
  //no matter what, it'll still record the version
  if(updated) {
    console.log("everything up-to-date!");
    client.close();
    return [currentVersion, null]; 
  }

  else {
    const data = await loadData();
    return [currentVersion, data];
  }
  
}

    //console.log(await data.findOne({name: "VP-67LD"}));
/*const data = await client.db("ACDatabasePreRelease").collection(menuQuery);
  const organizedData = await data.find(partQuery).toArray(function(err, documents) {
    if (err) {
      console.log(err);
    }

    const partData = Object.values(organizedData)
    .filter(obj => obj.hasOwnProperty('name'))
    .map(obj => obj.name);
  }); */
