#!/usr/bin/env node
const {
  readPath, validateAbsolutePath, validatePath
} = require('./cli.js');

let UserPath = process.argv[2];
let UserOptions = process.argv[3];
mdLinks(UserPath);
const mdLinks = (path, /* options */) => /*new Promise((resolve, reject) =>*/ {
  let resultsLinks= [];
  if (!path){
    console.log(chalk.red('*** DEBES INGRESAR UNA RUTA ***'));
  }
  else {
    let absoluteUserPath = validateAbsolutePath(path);
    if(validatePath(absoluteUserPath)){
      console.log('*** La ruta es valida ***');
      resultsLinks = readPath(absoluteUserPath);
      if(resultsLinks.length > 0){        
        console.log('else'+resultsLinks);      
      }
      else{
        console.log(chalk.red('--- No existen links en la ruta especificada ---'));  
      }
    } else{
      console.log(chalk.red('--- La ruta ingresada no existe ---'));
    }
  }
}
module.exports = () => {
  mdLinks
};