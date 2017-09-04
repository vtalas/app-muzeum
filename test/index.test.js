import test from 'tape';
import {MuzModel} from '../model.muzmodel';


const prepareModel = function() {

    let model = new MuzModel();

    model.records.reset(
        [
            { name: 'Vladimír', surname: 'Talaš' },
            { name: 'AAAabskjbdka', surname: 'jbdjfdf' },
            { name: 'VLADIMÍRRRR', surname: 'TALAŠŠŠŠŠ' },
            { name: 'Petr', surname: 'Skála' },
        ]);

    return model;
};


test('kal', function(t) {
    const model = prepareModel();
    var x = model.filterRecords('kal');
    t.equal(x.length, 1);
    t.equal(x[0].get('name'), 'Petr');
    t.end();
});

test('kál', function(t) {
    const model = prepareModel();
    var x = model.filterRecords('kál');
    t.equal(x.length, 1);
    t.equal(x[0].get('name'), 'Petr');
    t.end();
});

test('KÁL', function(t) {
    const model = prepareModel();
    var x = model.filterRecords('KÁL');
    t.equal(x.length, 1);
    t.equal(x[0].get('name'), 'Petr');
    t.end();
});