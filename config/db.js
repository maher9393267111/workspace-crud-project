import mongoose from 'mongoose'
import Product from '../models/product';

// an emoty object to store whether we are connected to database or not
const connection = {}

// connecting to database
async function connect() {
	// check if we are connected to database
	if (connection.isConnected) {
		console.log('database - already connected.')
		return
	}

	// check for previously connected database
	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState
		if (connection.isConnected === 1) {
			console.log('database - previous connection used.')
			return
		}
		// if not connected to any database disconnect
		await mongoose.disconnect()
	}

	// create a new connection
	const db = await mongoose.connect("mongodb+srv://maher:maher9326@cluster0.nf63j.mongodb.net/theme?retryWrites=true&w=majority")
	console.log('database - new connection created.')

	db.on('error', console.error.bind(console, 'connection error:'));
	var a1= db.once('open',function(){
	  Products.find({},{},function (err, users) {
		mongoose.connection.close();
		console.log("Username supplied"+username);
		//doSomethingHere 
	  })
	});





	//connection.isConnected = db.connections[0].readyState
}




// disconnecting database
async function disconnect() {
	// if already connected
	if (connection.isConnected) {
		// if in production mode
		if (process.env.NODE_ENV === 'production') {
			// disconnect database
			await mongoose.disconnect()
			connection.isConnected = false
		} else {
			// do not disconnect database
			console.log('database - not disconnected')
		}
	}
}




// converting mongodb id, createdAt, updatedAt to string
function convertDocToObj(doc) {
	doc._id = doc._id.toString()
	doc.createdAt = doc.createdAt.toString()
	doc.updatedAt = doc.updatedAt.toString()

	return doc
}

const db = { connect, disconnect, convertDocToObj }
export default db






// import mongoose from 'mongoose';
// const connection = {}

// const connectDb = async () => {
//     if(connection.isConnected){
//         // Using existing database connection
//          console.log("Using existing connection")
//         return;
//     }
    
//     mongoose.set("strictQuery", false);
//     const db = await mongoose.connect(
//       //  "mongodb+srv://maher:maher9326@serverlessinstance0.cd9ml.mongodb.net/server-one?retryWrites=true&w=majority"
//         "mongodb+srv://maher:maher9326@cluster0.nf63j.mongodb.net/theme?retryWrites=true&w=majority"
//         , 
//     {

//         useNewUrlParser: true,
//         useUnifiedTopology: true,

        

//         // useCreateIndex: true,
//         // useFindAndModify: false,
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true
//     });

//     // console.log("DB Connected");

//     connection.isConnected = db.connections[0].isReadyState;
// } 

// export default connectDb;