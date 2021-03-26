const multer = require('multer');
const fs = require('fs').promises;

// Определяем место хранения загружаемых файлов
const storageConfig = multer.diskStorage({
  destination: async (req, file, cb) => {
    // const { englishName } = req.body;
    // if(await !fs.access(`public/image/${name}`)){
    // await fs.mkdir(`public/image/kangaroo`);
    // }
    cb(null, `public/image`);
  },
  // Устанавливаем правила именования файлов
  filename: (req, file, cb) => {
    const { englishName } = req.body;
    const { name } = req.query;
    const addName = englishName === undefined ? name : englishName;
    cb(null, `${addName}-${file.originalname}`);
  },
});

// middleware для загрузки файлов на сервер
const upload = multer({ storage: storageConfig });


module.exports = upload;
