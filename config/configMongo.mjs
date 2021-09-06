import mongoose from 'mongoose';

export default async function getConnection(){
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return 'Connected with mongo';
    } catch (error) {
        console.log(error);
        console.log(process.env.NODE_ENV);
        return 'Connected with mongo failed';
    }
}