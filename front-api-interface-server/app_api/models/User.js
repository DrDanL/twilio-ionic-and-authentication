var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('../../config');

// Create authenticated Authy and Twilio API clients
var authy = require('authy')(config.authyKey);
var twilioClient = require('twilio')(config.accountSid, config.authToken);

// Used to generate password hash
var SALT_WORK_FACTOR = 10;

// Define user model schema
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    smsmobile: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    countryCode: Number,
    authyId: String,
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Middleware executed before save - hash the user's password
UserSchema.pre('save', function(next) {
    var self = this;

    // only hash the password if it has been modified (or is new)
    if (!self.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(self.password, salt, function(err, hash) {
            if (err) return next(err);

            // override password
            self.password = hash;
            next();
        });
    });
});

// Test and compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    var self = this;
    bcrypt.compare(candidatePassword, self.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Send a verification token to the user (two step auth for login)
UserSchema.methods.sendAuthyToken = function(cb) {
    var self = this;

    if (!self.authyId) {
        // Register this user if it's a new user
        authy.register_user(self.email, self.smsmobile, self.countryCode,
            function(err, response) {

                if (err || !response.user) return cb.call(self, err);
                self.authyId = response.user.id;
                self.save(function(err, doc) {
                    if (err || !doc) return cb.call(self, err);
                    self = doc;
                    sendToken();
                });
            });
    } else {
        // Otherwise send token to a known user
        sendToken();
    }

    // With a valid Authy ID, send the 2FA token for this user
    function sendToken() {
        authy.request_sms(self.authyId, true, function(err, response) {
            cb.call(self, err);
        });
    }
};

// Test a 2FA token
UserSchema.methods.verifyAuthyToken = function(otp, cb) {
    var self = this;
    authy.verify(self.authyId, otp, function(err, response) {
        cb.call(self, err, response);
    });
};

// Send a text message via twilio to this user
UserSchema.methods.sendMessage = function(message, cb) {
    var self = this;
    twilioClient.sendMessage({
        to: self.countryCode + self.smsmobile,
        from: config.twilioNumber,
        body: message
    }, function(err, response) {
        cb.call(self, err);
    });
};

// Export user model
module.exports = mongoose.model('User', UserSchema);
