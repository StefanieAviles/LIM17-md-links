#!/usr/bin/env node

const path = require("node:path");
const fs = require("node:fs");
// "C:/Users/stef_/OneDrive/Desktop/PROJECT/LIM17-md-links/test/"
let myDir = process.argv[2];
let absolutePath= '';
let fileDir = '';
// path.isAbsolute me indica si la ruta es absoluta, devuelve true o false
if ((path.isAbsolute(myDir))){ 
  absolutePath= myDir; 
  console.log('*** Ingresaste una ruta absoluta ***');
}
else{
  absolutePath = toAbsolute(myDir);
}
// Getting information for a file
fs.stat(absolutePath, (error, stats) => {
  if (error) {
    console.log('--- La ruta ingresada no existe ---');
  }
  else {
    console.log('*** La ruta es valida ***');
    readPath(absolutePath, stats);
  }
});
// Funcion que convierte una ruta absoluta en relativa
function toAbsolute (dir){
  let completeDir = path.resolve(dir);
  console.log('*** Ingresaste una ruta relativa ***');
  return completeDir;
}
// Funcion que verifica si la ruta es un directorio o un archivo
function readPath(absoluteDir, stats) {
  if(stats.isFile()){
    console.log('... Esta ruta pertenece a un archivo ...');
    ReadFile(absoluteDir);      
  } else{
    console.log(' +++ Esta ruta pertenece a un directorio +++');
    let arrayPaths = [];
    let results = ReadDir(absoluteDir, arrayPaths);
    console.log(results);
    if(results.length === 0){
      console.log('--- No existen archivos md en la ruta ingresada ---')
    }
    else{
      results.forEach(element => ReadFile(element));
    }
  }
}
// Funcion que lee el directorio de una ruta especificada y devuelve un array de archivos md
function ReadDir(absoluteDir, arrayFiles) {
  // fs.readdirSync lee el directorio y me devuelve un array con los archivos dentro del directorio
  fs.readdirSync(absoluteDir).forEach(file => {
    let newPath = path.join(absoluteDir,file);
    if(fs.statSync(newPath).isFile()){ 
      if (path.extname(file) === ".md") {
        return arrayFiles.push(newPath); 
      }      
    } else{
      return ReadDir(newPath, arrayFiles);
    }
  })
  return arrayFiles;
}
// Funcion que lee los archivos md
function ReadFile(absoluteDir){
    console.log( fs.readFileSync(absoluteDir, { encoding: "utf8", flag: "r" }));
}

module.exports = {
  ReadDir
};
