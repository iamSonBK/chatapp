

module.exports = function(async,Club,formidable,Users, aws){
    return {
        SetRouting: function(router){
            router.get('/dashboard', this.adminPage);
            
            router.post('/uploadFile', aws.Upload.any(), this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
            router.get('/deleteGroup', this.adminDeleteGroup);
            router.get('/deleteUser', this.adminDeleteUser);
        },
        
        adminPage: function(req, res){
            async.parallel([
                function(callback){
                    Club.find({}, (err, result)=>{
                        callback(err, result)
                    })
                },
                function(callback){
                    Users.find({},(err,result)=>{
                        callback(err,result)
                    })
                },
            ],(err, result)=>{
                let groupName = result[0];
                
                let user = result[1];
                res1 = Object.values(result[0]).length;
                res2 =Object.values(result[1]).length;
                res.render('admin/dashboard',{club:res1, users: res2,groupName:groupName, user: user});
            })
           
    }, 
        adminPostPage: function(req, res){
            const newClub = new Club();
            newClub.name = req.body.club;
            newClub.country = req.body.country;
            newClub.image = req.body.upload;
            newClub.save((err) => {
              
            })
            res.redirect('/home');
        },
        
        uploadFile: function(req, res) {
            const form = new formidable.IncomingForm();
            
            form.on('file', (field, file) => {

            });
            
            form.on('error', (err) => {
            });
            
            form.on('end', () => {
                
            });
            
            form.parse(req);
        },
        adminDeleteGroup: function(req, res){
            async.parallel([
                function(callback){
                    Club.deleteOne({
                        'name':req.body.name,
                        // 'fans.username': {$ne: req.user.username}
                    },  (err, count) => {
                        callback(err, count);
                    });
                },
                function(callback){
                    Users.deleteOne({
                        'username':req.body.username,
                        // 'fans.username': {$ne: req.user.username}
                    },  (err, count) => {
                        callback(err, count);
                    });
                }
            ], (err, results) => {
                res.redirect('/dashboard');
            });
        },
        adminDeleteUser: function(req, res){
            console.log(req);
            async.parallel([
                function(callback){
                    Users.deleteOne({
                        'username':req.body.username,
                    },  (err, count) => {
                        callback(err, count);
                    });
                }
            ], (err, results) => {
                res.redirect('/dashboard');
            });
        }
    }
}
