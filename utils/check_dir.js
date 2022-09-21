const fs = require('fs-extra');


module.exports = {
  createDir(dir) {
    console.log(44444444,dir)
    if (!fs.existsSync(dir)) {
      console.log('33333333')
      fs.mkdirSync(dir);
    }
  },
  checkDir(dir){
    return fs.existsSync(dir)
  }
};
