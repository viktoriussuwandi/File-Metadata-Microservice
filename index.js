var express = require('express');
var cors = require('cors');
const multer  = require('multer');

require('dotenv').config();

var app = express();
const upload = multer({ dest: 'public/uploads' })

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/*-----------------------------------------------------------------------------------------*/
/*---------------------------------------MY CODE-------------------------------------------*/
/*-----------------------------------------------------------------------------------------*/

//Array is the name of html element with type file
app.post("/api/fileanalyse", upload.array("upfile"), uploadFiles);

function uploadFiles(req, res) {
  
    if (req.files) {
      // let name; let type; let size;
      let files = req.files[0];
      console.log(files);
      data = {name : files.originalname, type : files.mimetype, size : files.size };
      res.json(data); 
    }
  else { res.json({ message : "no files" }); }
  
}

/*=========================================================================================*/

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});