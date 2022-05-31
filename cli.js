const chalk = require ('chalk');
const path = require("node:path");
const fs = require("node:fs");
const axios = require('axios');
// ------------------LINK DE PRUEBA-----------------------------------
// "C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/"

let fileContent = '';
let results = [];

// Funcion que verifica si la ruta es valida
const validatePath = (absolutePath) => (fs.existsSync(absolutePath)) ? true : false; 
// Funcion que valida si la ruta es absoluta y si es relativa la convierte en absoluta
function validateAbsolutePath(myDir){
  let absolutePath= '';
  // path.isAbsolute me indica si la ruta es absoluta, devuelve true o false
  if ((path.isAbsolute(myDir))){ 
    absolutePath= myDir; 
  }
  else{
    absolutePath = toAbsolute(myDir);
  }
  return absolutePath;
}
// Funcion que convierte una ruta absoluta en relativa
function toAbsolute (dir){
  let completeDir = path.resolve(dir);
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
// Funcion que lee la ruta y devuelve un array con los links encontrados
function readPath(absoluteDir) {
  let arrayLinks = [];
  let links = [];
  if(fs.lstatSync(absoluteDir).isFile()){
    //('... Esta ruta pertenece a un archivo ...');
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
    //(' +++ Esta ruta pertenece a un directorio +++');
    let arrayPaths = [];
    results = ReadDir(absoluteDir, arrayPaths);
    if(results.length === 0){
      console.log(chalk.red('--- No existen archivos md en la ruta ingresada ---'));
    }
    else{
      results.forEach(element => {
        fileContent = ReadFile(element);
        links = findlinks(fileContent);
        links.forEach(link => {
          arrayLinks.push(element+link);
        });        
      });
    }
  }
  return arrayLinks;
}
// Funcion que lee el directorio de una ruta especificada y devuelve un array de archivos md
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
//Funcion que genera un arreglo de objetos
function makeArrayObject(linksArray){
  let arrayObjects=[];
  for(i=0; i<linksArray.length; i++){
    const indexPath = linksArray[i].indexOf('[');
    const indexUrl = linksArray[i].indexOf(']');
    const path = linksArray[i].substring(0,indexPath);
    const text = linksArray[i].substring(indexPath+1,indexUrl);
    const url = linksArray[i].substring(indexUrl+2,linksArray[i].length-1);
    arrayObjects.push({
      file: path,
      text: text.substring(0,50), // Truncado a 50 caracteres
      href: url,
    });
  }
  return arrayObjects;
}
// Funcion que valida links
function validateLinks(arrayLinks){  
  const arrayValidatedLinks = arrayLinks.map(object =>{
    const validateInfo = axios(object.href)
    .then((link)=> {
      return {
        ...object,
        status:link.status,
        ok: 'ok'
      };
    })
    .catch((error)=> {
      return {
        ...object,
        status:error.code,
        ok: 'fail'
      };    
    })
    return validateInfo
  })  
  return Promise.all(arrayValidatedLinks);
}
// Funcion que devuelve estadisticas de los links encontrados
function getStats (array){
  let arrayLinks = array.map((item) => item.href);
  let result = arrayLinks.filter((item, index) => {
    return arrayLinks.indexOf(item) === index;
  });
  return result.length;
}
// Funcion que regresa estadisticas y validacion de los links encontrados
function getStatsAndValidate(array){
  const stats=[]
  arrayLinks = array.map((item) => item.href + '-' + item.ok);
  let broken = 0;
  result = arrayLinks.filter((item, index) => {
    return arrayLinks.indexOf(item) === index;
  });
  stats.push(result.length);
  result.forEach((element) => {
    let value = element.substring(element.indexOf('-') + 1, element.length);
    if (value === 'fail') {
      broken++;
    }
  });
  stats.push(broken);
  return stats;
}
module.exports = {
  ReadDir, toAbsolute, validateAbsolutePath, validatePath, readPath, isMarkdownFile, ReadFile, findlinks, validateLinks,
  makeArrayObject, getStats, getStatsAndValidate
};
