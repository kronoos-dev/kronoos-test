const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:8081/kronos';
const dbName = 'kronos';
const collectionName = 'collection_csv';

const client = new MongoClient(uri);

async function connectToMongo() {
  try {
    await client.connect({ useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function disconnectFromMongo() {
  try {
    client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}

function getMongoCollection() {
  return client.db(dbName).collection(collectionName);
}

async function getRecordsFromMongoDB() {
  try {
    const collection = getMongoCollection();
    const records = await collection.find({}).toArray();
    return records;
  } catch (error) {
    console.error('Error fetching records from MongoDB:', error);
    throw error;
  }
}

async function getRecordsWithPagination(page, pageSize) {
  try {
    const collection = getMongoCollection();
    const records = await collection.find({}).skip((page - 1) * pageSize).limit(pageSize).toArray();
    return records;
  } catch (error) {
    console.error('Error fetching paginated records from MongoDB:', error);
    throw error;
  }
}

async function saveJsonToMongoDB(jsonArray) {
  try {
    const collection = getMongoCollection();
    await collection.insertMany(jsonArray);
    console.log('JSON data saved to MongoDB');
  } catch (error) {
    console.error('Error saving JSON data to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectToMongo,
  disconnectFromMongo,
  getMongoCollection,
  getRecordsFromMongoDB,
  getRecordsWithPagination,
  saveJsonToMongoDB,
  // Add other MongoDB-related functions as needed
};
