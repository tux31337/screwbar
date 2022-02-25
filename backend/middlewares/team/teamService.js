const {v4} = require('uuid');
const db = require('../../config/db/database.js')
const fs = require('fs');

async function createTeam(req, res) {
    const teamId = v4();
    const {title, content, deleteUrl} = req.body;
    const IMG_URL = req.file ? `http://localhost:8080/uploads/present/${req.file.filename}` : null;
    const userId = req.userId;
    console.log(IMG_URL);
    if(deleteUrl) {
        deleteImg(deleteUrl);
    }
    // return db.execute(
    //     "INSERT INTO posts (post_id, title, content) VALUES (?,?,?)",
    //     [teamId, title, content]
    // ).then((result) => {
    //     console.log(result);
    //     return res.status(200).json({message: "생성성공"});
    // })
    return res.status(200).json({message: "생성성공"});
}

function postImg(req, res) {
        console.log(req.file);
        // ${req.userId}
        const IMG_URL = `http://localhost:8080/uploads/posts/${req.file.filename}`;
        console.log(IMG_URL);
        res.json({ url: IMG_URL });
}

function deleteImg(req, res) {
    let deleteArr = req.split(",");
    for(let i = 0; i < deleteArr.length; i++) {
        console.log(deleteArr[i].slice(36));
        fs.unlink(`public/uploads/posts/${deleteArr[i].slice(36)}`, err => {
            console.log(err);
        });
    }
}





module.exports.createTeam = createTeam;
module.exports.postImg = postImg;