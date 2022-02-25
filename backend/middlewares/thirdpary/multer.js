const multer = require('multer');
const path = require('path');

const postsUpload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        console.log(req);
        cb(null, 'public/uploads/posts');
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
        // makeDir(`${req.userId}`);
        // ${req.userId}
        cb(null, `public/uploads/present`);
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