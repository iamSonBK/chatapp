const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
    accessKeyId: 'AKIAJNEAFB67C2R7TGRQ',
    secretAccessKey: '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',
    region: 'ap-southeast-1'
});

const s0 = new AWS.S3({
    // accessKeyId: 'AKIAJXDORACNVWTCDSPQ',
    //     secretAccessKey: 'RXiu9FDpUtKoVuY7RcKcHJ00KgO9a4Eimtxz / TFM',
    //     region: 'ap-southeast-1'
});
const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'chattapppp',
        acl: 'public-read',
        metadata(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key(req, file, cb){
            console.log(file.originalname);
            
            cb(null, file.originalname);
        },
        rename(fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase();
        }
    })
})

exports.Upload = upload;