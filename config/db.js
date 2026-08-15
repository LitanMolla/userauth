const mongoose = require('mongoose')
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.eluznep.mongodb.net/${process.env.MONGODB_DBNAME}?appName=Cluster0`
const dbConnect = () => {
    return mongoose.connect(MONGO_URI)
        .then(() => { console.log('Database connected') })
        .catch((error) => { console.log("Database connect error:", error.message) })
}
module.exports = dbConnect