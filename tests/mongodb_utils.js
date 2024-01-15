//https://www.mongodb.com/docs/manual/reference/method/js-collection/
const mongodb = require('mongodb');

const { execSync } = require('child_process');
const Chance = require('chance');

const uri = 'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai';
const chance = new Chance();

const connectToMongoDB = async () => {
	const mongouri = `mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai`;

	const client = new mongodb.MongoClient(mongouri);

	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('alagamai');
		const collection = db.collection('myData');
		const query = {};

		const results = await collection.find(query).toArray();

		console.log('Found the following documents:');
		console.log(results);

		return results;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	} finally {
		await client.close();
		console.log('Closed MongoDB connection');
	}
};

const dump_all = async () => {
	try {
		execSync(`mongodump --uri ${uri} --out="mongo-output-files/db-dump-all"`);
		console.log('mongodump completed successfully');
	} catch (error) {
		console.error('mongodump failed:', error);
	}
	return null;
};

const get_collection = async col => {
	try {
		execSync(
			`mongodump --collection=${col} --uri ${uri} --out="mongo-output-files/db-dump-col"`
		);
		console.log('mongodump completed successfully');
	} catch (error) {
		console.error('mongodump failed:', error);
	}
	return null;
};

const insert_one_record = async () => {
	const mongouri =
		'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai';

	const client = new mongodb.MongoClient(mongouri);

	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('alagamai');
		const collection = db.collection('myData');

		const data1 = {
			// _id: new ObjectId(), // You can uncomment this line if you want MongoDB to generate the _id
			name: chance.first(),
			email: chance.email(),
			phone: chance.phone(),
			address: chance.address(),
			city: chance.city(),
		};

		// Log the generated data
		console.log(data1);

		// Insert the record into MongoDB
		const result = await collection.insertOne(data1);
		//console.log('Inserted record:', result.ops[0]);

		return result;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	} finally {
		await client.close();
		console.log('Closed MongoDB connection');
	}
};

const insert_many_record = async () => {
	let data;
	const dataArr = [];

	const mongouri =
		'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai';

	const client = new mongodb.MongoClient(mongouri);

	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('alagamai');
		const collection = db.collection('myData');

		for (let i = 0; i <= 3; i++) {
			data = {
				// _id: new ObjectId(), // You can uncomment this line if you want MongoDB to generate the _id
				name: chance.first(),
				email: chance.email(),
				phone: chance.phone(),
				address: chance.address(),
				city: chance.city(),
			};
			dataArr.push(data);
		}

		// Log the generated data
		console.log(dataArr);

		// Insert the record into MongoDB
		const result = await collection.insertMany(dataArr);
		//console.log('Inserted record:', result.ops[0]);

		return result;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	} finally {
		await client.close();
		console.log('Closed MongoDB connection');
	}
};

const get_collection_count = async () => {
	const mongouri =
		'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai';

	const client = new mongodb.MongoClient(mongouri);

	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('alagamai');
		const collection = db.collection('myData');

		// Insert the record into MongoDB
		const count = await collection.countDocuments();
		console.log('Total record:', count);

		return count;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	} finally {
		await client.close();
		console.log('Closed MongoDB connection');
	}
};

const sort_collection_by_field = async sort_field => {
	const mongouri =
		'mongodb+srv://alagamai:Pass@cluster0.qirvbfz.mongodb.net/alagamai';

	const client = new mongodb.MongoClient(mongouri);

	try {
		await client.connect();
		console.log('Connected to MongoDB');

		const db = client.db('alagamai');
		const collection = db.collection('myData');

		// Insert the record into MongoDB
		const result = await collection.find().sort({ salary: 1 });
		console.log('Sorted records in asc order:', result);

		return result;
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		throw err;
	} finally {
		await client.close();
		console.log('Closed MongoDB connection');
	}
};

// Export both functions
module.exports = {
	connectToMongoDB,
	dump_all,
	get_collection,
	insert_one_record,
	insert_many_record,
	get_collection_count,
	sort_collection_by_field,
};
