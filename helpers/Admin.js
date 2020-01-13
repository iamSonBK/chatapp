module.exports = function(async, Users, Message){
    return {
        countMessage: function(callback){
            if(req.body.chatId){
                Message.aggregate({
                    '_id': req.body.chatId
                }, (err, done) => {
                    callback(err, done);
                })
            }
        }
    }
    
};
