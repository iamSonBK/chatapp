'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
var dbName = "chatapp";
var port = "27017";
var host = "localhost";

passport.serializeUser((user, done) => {
    done(null, user.id);

});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
function getNumOfDocs (collectionName, host, port, dbName, callback) {
    MongoClient.connect("mongodb://" + host + ":" + port + "/" + dbName, function (error, db){
        if(error) return callback(error);

        db.collection(collectionName).count({}, function(error, numOfDocs){
            if(error) return callback(error);

            db.close();
            callback(null, numOfDocs);
        });
    }); 
} 
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({
        'email': email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, req.flash('error', 'User with email already exist'));
        }
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.save((err) => {
            done(null, newUser);
        });
    });


}));
passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({
        'email': email }, (err, user) => {
        if (err) {
            return done(err);
        }
        const messages = [];
        if(!user || !user.validUserPassword(password)){
            messages.push('Email Does Not Exist or Password is Invalid')
            return done(null, false, req.flash('error', messages));
        }
      if (user) {
            const agg = User.count();
            console.log(agg.length);
   
        }
        return done(null, user); 
    });
}));