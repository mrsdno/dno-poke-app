const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/dno-poke-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// logs queries
mongoose.set('debug', true);

module.exports = mongoose.connection;

