const {
  ReadFile, toAbsolute, validateAbsolutePath, validatePath, isMarkdownFile, readPath, findlinks,
  makeArrayObject, validateLinks, getStats, getStatsAndValidate
} = require('../cli.js');
// -------------------------------------------AARAYS DE PRUEBA-----------------------------------------------------
const arrayLinks = ['C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/[SomeText](https://www.google.com)'];
const arrayObjects = [
  {
    file: 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md',
    text: 'Markdown',
    href: 'https://es.wikipedia.org/wiki/Markdown'
  },
  {
    file: 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md',
    text: 'NOVALE',
    href: 'https://linkdanado.com/es/'
  },
  {
    file: 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md',
    text: 'ERROR 404',
    href: 'https://www.google.com/MD'
  }
]

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
  it('Deberia devolver un arreglo vacio si no hay archivos md en esa ruta de archivo', () => {
    expect(readPath('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/some.txt')).toStrictEqual([]);
  });
  it('Deberia devolver un arreglo vacio si no hay archivos md en ese directorio', () => {
    expect(readPath('C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/Diagram')).toStrictEqual([]);
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
// makeArrayObject(linksArray)
describe('Funcion makeArrayObject', () => {
  it('Deberia devolver un arreglo de objetos', () => {
    expect(typeof(makeArrayObject(arrayLinks))).toBe('object');
  });
});
//validateLinks(arrayLinks)
describe('Funcion validateLinks', () => {
  it('Deberia devolver un arreglo de objetos', () => {
    expect(typeof(validateLinks(arrayObjects))).toBe('object');
  });
});
// getStats (array)
describe('Funcion getStats', () => {
  it('Deberia devolver el numero 3 que es la cantidad de links unicos', () => {
    expect((getStats(arrayObjects))).toStrictEqual(3);
  });
});
// getStatsAndValidate(array)
describe('Funcion getStatsAndValidate', () => {
  it('Deberia devolver un arreglo con 3 como 1er elemento(links unicos) y 0 como 2do elemento(links rotos)', () => {
    expect((getStatsAndValidate(arrayObjects))).toStrictEqual([3,0]);
  });
});

