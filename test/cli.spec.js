//const mdLinks = require('..');
const {
  ReadFile, toAbsolute, validateAbsolutePath, validatePath, isMarkdownFile, readPath, findlinks
} = require('../cli.js');


// const validatePath = (absolutePath) => (fs.existsSync(absolutePath)) ? true : false; 
describe('Funcion validatePath', () => {
  it('Deberia devolver true si el directorio existe', () => {
    expect(validatePath('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/')).toBe(true);
  });
  it('Deberia devolver false si el directorio no existe', () => {
    expect(validatePath('')).toBe(false);
  });
});
// validateAbsolutePath(myDir)
describe('Funcion validateAbsolutePath', () => {
  it('Deberia devolver una ruta absoluta si se le envia una relativa', () => {
    expect(validateAbsolutePath('test/')).toBe('C:\\Users\\stef_\\OneDrive\\Desktop\\LABORATORIA\\LIM17-md-links\\test');
  });
  it('Deberia devolver la misma ruta si se envia una ruta absoluta', () => {
    expect(validateAbsolutePath('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test')).toBe('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test');
  });
});
// toAbsolute (dir)
describe('Funcion toAbsolute', () => {
  it('Deberia devolver una ruta absoluta', () => {
    expect(toAbsolute('test/')).toBe('C:\\Users\\stef_\\OneDrive\\Desktop\\LABORATORIA\\LIM17-md-links\\test');
  });
});
// isMarkdownFile (absoluteDir)
describe('Funcion isMarkdownFile', () => {
  it('Deberia devolver true si la ruta contiene archivos .md', () => {
    expect(isMarkdownFile('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md')).toBe(true);
  });
  it('Deberia devolver false si la ruta no contiene archivos .md', () => {
    expect(isMarkdownFile('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.txt')).toBe(false);
  });
});
// readPath(absoluteDir)
describe('Funcion readPath', () => {
  it('Deberia devolver un arreglo si se envia un directorio', () => {
    expect(typeof(readPath('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test'))).toBe('object');
  });
  it('Deberia devolver un arreglo si se envia una ruta de archivo', () => {
    expect(typeof(readPath('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md'))).toBe('object');
  });
});
// ReadFile(absoluteDir)
describe('Funcion ReadFile', () => {
  it('Deberia devolver un string si se envia un directorio', () => {
    expect(typeof(ReadFile('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md'))).toBe('string');
  });
});
// findlinks(content)
describe('Funcion findlinks', () => {
  it('Deberia devolver un arreglo con los links encontrados', () => {
    expect(typeof(findlinks('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md'))).toBe('object');
  });
});
/* 
// function ReadDir(absoluteDir)
describe('Funcion ReadDir', () => {
  it('Deberia devolver un arreglo', () => {
    expect(typeof(ReadDir('C:/Users/stef_/LIM17-md-links/test/', []))).toBe('object');
  });
});
*/