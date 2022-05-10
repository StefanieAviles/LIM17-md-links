const mdLinks = require('../');
const {ReadDir} = require('../cli.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});
// function ReadDir(absoluteDir)
describe('Funcion ReadDir', () => {
  it('Deberia devolver un arreglo', () => {
    expect(typeof(ReadDir('C:/Users/stef_/OneDrive/Desktop/PROJECT/LIM17-md-links/test/'))).toBe('object');
  });
});
// FindFile(array, absoluteDir)

