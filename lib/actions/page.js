#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { createDir,checkDir } = require('../../utils/check_dir')
class Page {

    static generate(pageName,other) {
          this.createPage(pageName)
          for(let i=0;i<other.length;i++){
             this.createPage(other[i])
          }
          console.log('Page created!');
    }

    static createPage(pageName){
        const pageNameLowered = pageName.toLowerCase();
        fs.readFile(path.resolve(__dirname, '../snippets/page'), function(err, data) {
            data = data.toString().split('<PageName>').join(pageName);
            data = data.toString().split('<PageNameSeat>').join(pageNameLowered);
            let pagePath = './pages'
            if(checkDir('./src/pages')){
                pagePath = './src/pages'
            }
            if(!checkDir('./src/pages')  && !checkDir('./pages')){
                createDir('./pages')
            }
            fs.writeFileSync(`${pagePath}/${pageNameLowered}.js`, data.toString());
        });

      
    }

    static undo(pageName) {
        const pageNameLowered = pageName.toLowerCase();
        fs.unlinkSync(`pages/${pageNameLowered}.js`);
        console.log('Page removed!');
    }

}

module.exports = Page;