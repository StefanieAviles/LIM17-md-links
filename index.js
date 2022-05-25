#!/usr/bin/env node
const chalk = require ('chalk');
const {
  readPath, validateAbsolutePath, validatePath, makeArrayObject, validateLinks
} = require('./cli.js');
const axios = require('axios');

let UserPath = process.argv[2];
let UserOptions = process.argv[3];
async function mdLinks(path, options) /*new Promise((resolve, reject) =>*/ {
  let resultsLinks= [];
  if (!path){
    console.log(chalk.red('*** DEBES INGRESAR UNA RUTA ***'));
  }
  else {
    let absoluteUserPath = validateAbsolutePath(path);
    if(validatePath(absoluteUserPath)){
      // console.log('*** La ruta es valida ***');
      resultsLinks = readPath(absoluteUserPath);
      if(resultsLinks.length > 0){        
        // console.log(resultsLinks); 
        let arrayObjects = makeArrayObject(resultsLinks);
        if(!options){
          console.log(arrayObjects); 
        }
        else if(options === '--validate'){
          let newArr=[];
          for(i=0; i<arrayObjects.length; i++){          
            newArr.push(await validateLinks(arrayObjects[i]));
          }
          console.log(newArr);
        }
        else {
          console.log(chalk.yellow('Las opciones correctas de validacion son:')); 
          console.log(chalk.yellow('--validate '));
          console.log(chalk.yellow('--stats ')); 
          console.log(chalk.yellow('--stats --validate '));    
        }
        
      }
      else{
        console.log(chalk.red('--- No existen links en la ruta especificada ---'));  
      }
    } else{
      console.log(chalk.red('--- La ruta ingresada no existe ---'));
    }
  }
}

mdLinks(UserPath, UserOptions);

module.exports = () => {
  mdLinks
};