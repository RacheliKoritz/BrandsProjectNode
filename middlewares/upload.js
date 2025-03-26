import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/images/'); // מיקום שבו ישמרו התמונות
    },
    filename: function (req, file, cb) {
      const originalFilename = file.originalname; // שם הקובץ המקורי
      cb(null, originalFilename);
    }
  });
  
  
// פונקציה להעלאת התמונה
const upload = multer({ storage: storage }).single('file'); // קובץ בודד תחת המפתח 'file'

export  function uploadImage(req, res, next)  {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading image.');
    }
    next(); // אחרי שהעלאת התמונה הצליחה, נמשיך לפונקציה הבאה
  });
};

