const multer = require('multer');
const fs = require('fs').promises;

// Определяем место хранения загружаемых файлов
const storageConfig = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log(req.body);
    const { name } = req.body;
    // if(await !fs.access(`public/image/${name}`)){
      await fs.mkdir(`public/image/${name}`);
    // }
    cb(null, `public/image/${name}`);
  },
  // Устанавливаем правила именования файлов
  filename: (req, file, cb) => {
    const { name } = req.body;
    cb(null, `${name}-${file.originalname}`);
  },
});

// middleware для загрузки файлов на сервер
const upload = multer({ storage: storageConfig });


module.exports = upload;
