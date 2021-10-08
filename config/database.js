const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    catch (err) {
        console.log(`Failed to connect to MongoDB`, err);
    }

}
connectDB();
const db = mongoose.connection;
db.on('open', () => {
    console.log(`Connected to MongoDB database on port ${db.port}`);
});

