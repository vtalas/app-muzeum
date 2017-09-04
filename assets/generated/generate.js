const randomName = require('random-name');
let DateGenerator = require('random-date-generator');
const loremIpsum = require('lorem-ipsum');

DateGenerator.getRandomDate(); // random date

function text() {
    return loremIpsum({
        count: Math.random() * 10 + 5                      // Number of words, sentences, or paragraphs to generate.
        , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
        , sentenceLowerBound: 5         // Minimum words per sentence.
        , sentenceUpperBound: 15        // Maximum words per sentence.
        , paragraphLowerBound: 3        // Minimum sentences per paragraph.
        , paragraphUpperBound: 7        // Maximum sentences per paragraph.
        , format: 'plain'               // Plain text or html
        // , words: ['ad', 'dolor', ... ]  // Custom word dictionary. Uses dictionary.words (in lib/dictionary.js) by default.
        , random: Math.random           // A PRNG function. Uses Math.random by default
        , suffix: '\n'                   // The character to insert between paragraphs. Defaults to default EOL for your OS.
    });
}

function create(id) {

    var a = {
        "id": id,
        "name": randomName.first(),
        "surname": randomName.last(),
        "title": "",
        "degree": "",
        "birth": DateGenerator.getRandomDateInRange(new Date(1700, 2, 2), new Date(1940, 2, 2)),
        "birth_place": randomName.place(),
        "died": DateGenerator.getRandomDateInRange(new Date(1800, 2, 2), new Date(2000, 2, 2)),
        "died_place": randomName.place(),
        "text": text()
    };

    return a;
}

var items = [];
for (var i = 0; i < 300; i++) {
    items.push(create('id' + i));
}

console.log(JSON.stringify({ records: items }));