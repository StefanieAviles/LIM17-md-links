const chalk = require ('chalk');
const path = require("node:path");
const fs = require("node:fs");
// const mdLinks = require('./index.js');

// "C:/Users/stef_/LIM17-md-links/test/"
/* let UserPath = process.argv[2];
let UserOptions = process.argv[3]; */
let fileContent = '';
let results = [];
let arrayResults = [];



// Funcion que verifica si la ruta es valida
const validatePath = (absolutePath) => (fs.existsSync(absolutePath)) ? true : false; 

/* if (!UserPath){
  console.log(chalk.red('*** DEBES INGRESAR UNA RUTA ***'));
}
else {
  let absoluteUserPath = validateAbsolutePath(UserPath);
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
} */
// Funcion que valida si la ruta es absoluta y si es relativa la convierte en absoluta
function validateAbsolutePath(myDir){
  let absolutePath= '';
  // path.isAbsolute me indica si la ruta es absoluta, devuelve true o false
  if ((path.isAbsolute(myDir))){ 
    absolutePath= myDir; 
    console.log('*** Ingresaste una ruta absoluta ***');
  }
  else{
    console.log('*** Ingresaste una ruta relativa ***');
    absolutePath = toAbsolute(myDir);
    console.log('Se convierte a absoluta');
  }
  return absolutePath;
}
// Funcion que convierte una ruta absoluta en relativa
function toAbsolute (dir){
  let completeDir = path.resolve(dir);
  console.log('*** Ingresaste una ruta relativa ***');
  return completeDir;
}
//Funcion que devuelve true si el archivo es .md , caso contrario devuelve false
function isMarkdownFile (absoluteDir){
  if (path.extname(absoluteDir) === ".md") {
    return true;
  } else{
    return false;
  } 
} 
// Funcion que verifica si la ruta es un directorio o un archivo
function readPath(absoluteDir) {
  let arrayLinks = [];
  let links = [];
  if(fs.lstatSync(absoluteDir).isFile()){
    console.log('... Esta ruta pertenece a un archivo ...');
    if (isMarkdownFile(absoluteDir)){
      fileContent = ReadFile(absoluteDir);  
      links = findlinks(fileContent);
      if(links) {
        links.forEach(link => {
          arrayLinks.push(absoluteDir+link);
        }); 
      }
    }
    else{
      console.log(chalk.red('--- No existen archivos md en la ruta ingresada ---'));
    }     
  } else{
    console.log(' +++ Esta ruta pertenece a un directorio +++');
    let arrayPaths = [];
    results = ReadDir(absoluteDir, arrayPaths);
    console.log(results);
    if(results.length === 0){
      console.log(chalk.red('--- No existen archivos md en la ruta ingresada ---'));
    }
    else{
      results.forEach(element => {
        //fileContent+=ReadFile(element)
        fileContent = ReadFile(element);
        links = findlinks(fileContent);
        links.forEach(link => {
          arrayLinks.push(element+link);
        });        
      });
    }
  }
  return arrayLinks;
}// Funcion que lee el directorio de una ruta especificada y devuelve un array de archivos md
function ReadDir(absoluteDir, arrayFiles) {
  // fs.readdirSync lee el directorio y me devuelve un array con los archivos dentro del directorio
  fs.readdirSync(absoluteDir).forEach(file => {
    let newPathJoined = path.join(absoluteDir,file);
    let newPathReplaced = newPathJoined.replaceAll('\\','/');
    if(fs.statSync(newPathJoined).isFile()){ 
      if (isMarkdownFile(file)) {        
        return arrayFiles.push(newPathReplaced); 
      }      
    } else{
      return ReadDir(newPathJoined, arrayFiles);
    }
  })
  return arrayFiles;
}
// Funcion que lee los archivos md
function ReadFile(absoluteDir){
  let text = fs.readFileSync(absoluteDir, { encoding: "utf8", flag: "r" })
  // console.log(text);
  return text;
}
// Funcion q extrae los links http y https que encuentre en el archivo md
function findlinks(content){
  let finalArray=[];
  const linkExpression = /\[([^\[]+)\]\((.*)\)/gm; 
  const matches = content.match(linkExpression);
  if(matches){
    for(i=0; i<matches.length; i++){
      let index = matches[i].indexOf(']');
      if(matches[i].substring(index+2,index+6) === 'http'){      
        finalArray.push(matches[i]);
      }
    }  
  }
  return finalArray;
}

module.exports = {
  ReadDir, toAbsolute, validateAbsolutePath, validatePath, readPath
};
