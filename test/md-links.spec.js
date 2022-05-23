const mdLinks = require('../');
const {
  ReadDir, toAbsolute, validateAbsolutePath, isEmpty, validatePath
} = require('../cli.js');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
// isEmpty(UserPath)
describe('Funcion isEmpty', () => {
  it('Deberia devolver true si la linea de comandos no esta vacia', () => {
    expect(isEmpty('C:/Users/stef_/LIM17-md-links/test/')).toBe(true);
  });
  it('Deberia devolver false si la linea de comandos esta vacia', () => {
    expect(isEmpty('')).toBe(false);
  });
});
// function ReadDir(absoluteDir)
describe('Funcion ReadDir', () => {
  it('Deberia devolver un arreglo', () => {
    expect(typeof(ReadDir('C:/Users/stef_/LIM17-md-links/test/', []))).toBe('object');
  });
});
// toAbsolute (dir)
describe('Funcion toAbsolute', () => {
  it('Deberia devolver una ruta absoluta', () => {
    expect(toAbsolute('test/')).toBe('C:\\Users\\stef_\\LIM17-md-links\\test');
  });
});
// validateAbsolutePath(myDir)
describe('Funcion validateAbsolutePath', () => {
  it('Deberia devolver una ruta absoluta si se le envia una relativa', () => {
    expect(validateAbsolutePath('test/')).toBe('C:\\Users\\stef_\\LIM17-md-links\\test');
  });
});
describe('Funcion validateAbsolutePath', () => {
  it('Deberia devolver la misma ruta si se envia una ruta absoluta', () => {
    expect(validateAbsolutePath('C:/Users/stef_/LIM17-md-links/test/')).toBe('C:/Users/stef_/LIM17-md-links/test/');
  });
});
// validatePath(absolutePath)
describe('Funcion validatePath', () => {
  it('Deberia devolver false si la ruta no se encuentra (es invalida)' , () => {
    expect(validatePath('')).toBe(false);
  });
  it('Deberia devolver true si la ruta es encontrada', () => {
    expect(validatePath('C:\Users\stef_\LIM17-md-links\test\onFolder.md')).toBe(true);
  });
});

