import mongoose from 'mongoose';

const db = async() => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db connected')
    } catch (error) {
        console.log('DB Connection error');
    }
}

export default db;