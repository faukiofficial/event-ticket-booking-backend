const mongoose = require("mongoose");

const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(() => {
            console.log('Database connected');
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = databaseConnect