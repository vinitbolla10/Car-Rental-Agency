const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri:
        'mongodb+srv://dbVinit:vinit@cluster0-w8hks.mongodb.net/test?retryWrites=true&w=majority'
};

module.exports = config;

