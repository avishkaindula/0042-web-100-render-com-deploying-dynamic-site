const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUrl = "mongodb://localhost:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}
// This is how we create a environment variable.
// When we deploy this code to a remote machine, this will search for a environment
// variable called MONGODB_URL in that machine. If such environment variable is found,
// then the value of mongodbUrl will be replaced by the value of MONGODB_URL
// As this environment variable doesn't exist on our local machine, "mongodb://localhost:27017"
// will be used as the Url instead.

let database;

async function initDatabase() {
  // const client = await MongoClient.connect("mongodb://localhost:27017");
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db("deployment");
}

function getDb() {
  if (!database) {
    throw new Error("No database connected!");
  }

  return database;
}

module.exports = {
  initDatabase: initDatabase,
  getDb: getDb,
};
