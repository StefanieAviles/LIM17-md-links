const {
    mdLinks, objectOptions, showResults
} = require('../index.js');
const path = 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/';
const pathWrong = 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/folder/';
const pathNoLinks = 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/nolinks.md';
const arrayObjects = [
{
    file: 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md',
    text: 'Markdown',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    status: '200',
    ok: 'ok'
},
{
    file: 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md',
    text: 'NOVALE',
    href: 'https://linkdanado.com/es/',
    status: '200',
    ok: 'fail'
},
{
    file: 'C:/Users/stef_/OneDrive/Desktop/LABORATORIA/LIM17-md-links/test/onFolder.md',
    text: 'ERROR 404',
    href: 'https://www.google.com/MD',
    status: '200',
    ok: 'fail'
}
]

// objectOptions(optionUser)
describe('Funcion objectOptions', () => {
    it('Deberia devolver un objeto con la opcion --validate ingresada', () => {
        expect(typeof(objectOptions('--validate'))).toBe('object');
    });
    it('Deberia devolver un objeto con la opcion --stats ingresada', () => {
        expect(typeof(objectOptions('--stats'))).toBe('object');
    });
    it('Deberia devolver un objeto con la opcion --validate--stats ingresada', () => {
        expect(typeof(objectOptions('--validate--stats'))).toBe('object');
    });
    it('Deberia devolver un objeto si no se ingresa ninguna opcion', () => {
        expect(typeof(objectOptions(''))).toBe('object');
    });
    it('Deberia devolver un objeto vacio si se ingresa cualquier otro texto', () => {
        expect(typeof(objectOptions('-s'))).toBe('object');
    });
});
// showResults(arrayObjects, options)
describe('Funcion showResults', () => {
    it('Deberia devolver true si se mostraron los resultados', () => {
        expect(showResults(arrayObjects, {validate: true, stats: false})).toBe(true);
    });
    it('Deberia devolver true si se mostraron los resultados', () => {
        expect(showResults(arrayObjects, {validate: true, stats: true})).toBe(true);
    });
    it('Deberia devolver true si se mostraron los resultados', () => {
        expect(showResults(arrayObjects, {validate: false, stats: false})).toBe(true);
    });
    it('Deberia devolver true si se mostraron los resultados', () => {
        expect(showResults(arrayObjects, {validate: false, stats: true})).toBe(true);
    });
    it('Deberia devolver true si se mostraron los resultados', () => {
        expect(showResults(arrayObjects, {validate: null, stats: null})).toBe(true);
    });
});
//mdLinks(path, options)
describe('Funcion mdLinks', () => {
    it('Deberia MDLINKS', () => mdLinks(path, {validate: false, stats: false}).then(response => {
        expect(typeof(response)).toBe('object');  
    }));
    it('Deberia MDLINKS', () => mdLinks(path, {validate: true, stats: false}).then(response => {
        expect(typeof(response)).toBe('object');  
    }));
    it('Deberia MDLINKS', () => mdLinks(path, {validate: true, stats: true}).then(response => {
        expect(typeof(response)).toBe('object');  
    }));
    it('Deberia MDLINKS', () => mdLinks(path, {validate: null, stats: null}).then(response => {
        expect(typeof(response)).toBe('string');  
    }));
    it('Deberia MDLINKS', () => mdLinks('', {validate: null, stats: null}).catch(response => {
        expect(typeof(response)).toBe('string');  
    }));
    it('Deberia MDLINKS', () => mdLinks(pathWrong, {validate: null, stats: null}).catch(response => {
        expect(typeof(response)).toBe('string');  
    }));
    it('Deberia MDLINKS', () => mdLinks(pathNoLinks, {validate: null, stats: null}).catch(response => {
        expect(typeof(response)).toBe('string');  
    }));
});