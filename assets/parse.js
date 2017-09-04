const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream('databáze.txt');

const rl = readline.createInterface({
    input: stream,
});

let res = [];
let skiped = [];
let i = 0;
let record = {};
let recordLine = 0;

let importDate = function(destination, line) {
    let parts = line.split(' - ');
    destination.birth = parts[0];
    destination.died = parts[1];
};

rl.on('line', (line) => {


    let skip = line.length === 1 || line.length === 0;
    if (skip) {
        if (line) {
            skiped.push(line);
        }
        if (record.id) {
            res.push(record);
        }
        record = {};
        recordLine = 0;
        return;
    }

    if (recordLine === 3) {
        record.text += line;
    } else if (recordLine === 2) {
        importDate(record, line);
        recordLine++;
    } else if (recordLine === 1) {
        record.title = line;
        recordLine++;
    } else if (recordLine === 0) {
        const parts = line.split(' ');

        if (parts[0] && parts[0][0].toLocaleUpperCase('cs') === parts[0][0]
            && parts[1] && parts[1][0].toLocaleUpperCase('cs') === parts[1][0]) {
            record = {
                id: 'id_s' + i++,
                surname: parts[0],
                name: parts.slice(1).join(' '),
                text: ''
            };
            recordLine++;
        } else {
            skiped.push('ssss  ' + line.substr(0, 100))
        }
    } else {
        skiped.push('xxx', line.substr(0, 50));
    }
});

rl.on('close', function() {

    fs.writeFileSync('data.json', JSON.stringify({ records: res }));
    const csvStream = fs.createWriteStream('databaze.csv');

    let separator = '\t';
    for (let j = 0; j < res.length; j++) {
        let a = res[j];

        let csvLine = [
            a.id,
            a.name,
            a.surname,
            a.birth,
            a.died,
            a.text,
            '\n'
        ].join(separator);
        csvStream.write(csvLine);
    }

    csvStream.end();
    console.log(JSON.stringify(skiped));
    // console.log((skiped));
});

// rl.question('What do you think of Node.js? ', (answer) => {
//     // TODO: Log the answer in a database
//     console.log(`Thank you for your valuable feedback: ${answer}`);
//
//     console.log(rl);
//
//     rl.close();
// });