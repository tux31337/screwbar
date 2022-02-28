const multer = require('multer');
const path = require('path');
const fs = require('fs');

const postsUpload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        if(!fs.existsSync(`public/uploads/posts/${req.userId}`)) {
          fs.mkdirSync(`public/uploads/posts/${req.userId}`);
        }
        cb(null, `public/uploads/posts/${req.userId}`);
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname); 
        console.log('file.originalname', file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
  });


  const presentUpload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        if(!fs.existsSync(`public/uploads/present/${req.userId}`)) {
          fs.mkdirSync(`public/uploads/present/${req.userId}`);
        }
        cb(null, `public/uploads/present/${req.userId}`);
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname); 
        console.log('file.originalname', file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
  });

module.exports.postsUpload = postsUpload;
module.exports.presentUpload = presentUpload;