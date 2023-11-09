require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1/e-commerce',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )

    console.log('DB Connected')
  } catch (error) {
    console.error('Error in DB Connection')
    process.exit(1)
  }
}

module.exports = {connectDB}
