var cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 8080;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;

// A Twilio number you control
// Specify, e.g. "+16519998877"
cfg.twilioNumber = process.env.TWILIO_NUMBER;

// Your Authy production key
cfg.authyKey = process.env.AUTHY_API_KEY;

// MongoDB connection string - MONGO_URL is for local dev,
// MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
// MONGO_PORT_27017_TCP_ADDR is for connecting to the Mongo container
// when using docker-compose
cfg.mongoUrl = process.env.MONGOLAB_URI || process.env.MONGO_URL || process.env.MONGO_PORT_27017_TCP_ADDR;

// Enable SMS 2FA processes
cfg.enableValidationSMS = process.env.enableValidationSMS;

// Export configuration object
module.exports = cfg;
