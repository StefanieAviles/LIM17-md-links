#!/usr/bin/env node
const chalk = require ('chalk');
const {
  readPath, validateAbsolutePath, validatePath, makeArrayObject, validateLinks,
  getStats, getStatsAndValidate
} = require('./cli.js');
const axios = require('axios');

const UserPath = process.argv[2];
//const UserPath = UPath.replaceAll('\\','/');
//console.log(UserPath);
const UserOptions = process.argv[3];


//Funcion que crea el objeto options segun las opciones ingresadas por el usuario
function objectOptions(optionUser){
  if(optionUser === '--validate'){
     return {
      validate: true,
      stats: false
    };
  }
  else if (optionUser === '--stats'){
    return {
      validate: false,
      stats: true
    };
  }
  else if (optionUser === '--validate--stats'){
    return {
      validate: true,
      stats: true
    };
  }
  else if (!optionUser){
    return {
      validate: false,
      stats: false
    };
  }
  else {
    return {
      validate: null,
      stats: null
    };
  }
}
// Funcion que retorna una promesa que resuelve un arreglo con los links validados
function mdLinks(path, options) /*new Promise((resolve, reject) =>*/ {
  return new Promise((resolve, reject) => {
    let resultsLinks= [];
    if (!path){
      reject (chalk.red('*** DEBES INGRESAR UNA RUTA ***'));
    }
    else {
      const absoluteUserPath = validateAbsolutePath(path);
      if(validatePath(absoluteUserPath)){
      // console.log('*** La ruta es valida ***');
        resultsLinks = readPath(absoluteUserPath);
        if(resultsLinks.length > 0){        
        // console.log(resultsLinks); 
          const arrayObjects = makeArrayObject(resultsLinks);
          if(options.validate === true){
            validateLinks(arrayObjects).then((response) =>{
              resolve (response);
            })
          }
          else if (options.validate === false){
            resolve (arrayObjects);
          }
          else {
            resolve(chalk.yellow('Las opciones correctas de validacion son:'+'\n'+'--validate'+'\n'+'--stats'+'\n'+'--stats--validate'));   
          }
        }
        else{
          reject (chalk.red('--- No existen links en la ruta especificada ---'));  
        }
      } else{
        reject (chalk.red('--- La ruta ingresada no existe ---'));
      }
    }
  });
}
// Funcion que muestra resultados en consola
function showResults(arrayObjects, options){
  if(options.validate === false && options.stats === false){
    arrayObjects.forEach(element => {
      console.log(`${chalk.yellow(element.file)} | ${chalk.cyan(element.href)} | ${chalk.green(element.text)}`);
    });    
  }
  else if(options.validate === true && options.stats === false){
    arrayObjects.forEach(element => {
      if(element.ok === 'ok'){
        console.log(`${chalk.yellow(element.file)} | ${chalk.cyan(element.href)} | ${chalk.green(element.ok)} : ${chalk.green(element.status)} | ${chalk.blue(element.text)}`);
      }
      else{
        console.log(`${chalk.yellow(element.file)} | ${chalk.cyan(element.href)} | ${chalk.red(element.ok)} : ${chalk.red(element.status)} | ${chalk.blue(element.text)}`);
      }
      
    });  
  }
  else if(options.validate === false && options.stats === true){
    const stats = getStats (arrayObjects);
    console.log('STATS');
    console.log(chalk.greenBright('TOTAL:'+arrayObjects.length));
    console.log(chalk.cyan('UNIQUE:'+stats));
  }
  else if(options.validate === true && options.stats === true){
    console.log('VALIDATE AND STATS');
    const statsValidate = getStatsAndValidate(arrayObjects);
    console.log(chalk.greenBright('TOTAL:'+arrayObjects.length));
    console.log(chalk.cyan('UNIQUE:'+statsValidate[0]));
    console.log(chalk.redBright('BROKEN:'+statsValidate[1]));
    
  }
  else{
    console.log(arrayObjects);
  }
  return true;
}

const optionsObject = objectOptions(UserOptions);
mdLinks(UserPath, optionsObject)
.then(arrayResults =>{
  showResults(arrayResults, optionsObject);
})
.catch(reject =>{
  console.log (reject);
});

module.exports = {
  mdLinks, objectOptions, showResults
};