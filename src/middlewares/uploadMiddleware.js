// 
const multer = require(`multer`);
const path = require("path");
const fs = require('fs')

class MyCustomStorage {
  _handleFile(req, file, callback) {
    // Faylni qayerga saqlashni belgilaymiz
    const uploadPath = path.join(__dirname, '../uploads/', Date.now() + path.extname(file.originalname));

    // Fayl ma'lumotlarini stream orqali o‘qib, faylga yozamiz
    const outStream = fs.createWriteStream(uploadPath);

    file.stream.pipe(outStream);

    outStream.on('error', (err) => callback(err));

    outStream.on('finish', () => {
      callback(null, {
        filename: path.basename(uploadPath),
        path: uploadPath
      });
    });
  }

  _removeFile(req, file, callback) {
    fs.unlink(file.path, callback);
  }
}

const storage = new MyCustomStorage();
const upload = multer({ storage: storage });




const uploadMiddlewareFn = (key) => {
    try {
        
      return  upload.single(key)
    } catch (error) {
        throw new error.message
    }
}

module.exports = uploadMiddlewareFn

