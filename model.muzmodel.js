import Backbone from 'exoskeleton';

let PeopleList = Backbone.Collection.extend({
    url: 'assets/data.json',
    parse: function(data) {
        return data.records;
    }
});

export const MuzModel = Backbone.Model.extend({

    czechChars: {
        'ě': 's',
        'š': 's',
        'č': 'c',
        'ř': 'r',
        'ž': 'z',
        'ý': 'y',
        'á': 'a',
        'í': 'i',
        'é': 'e',
        'ď': 'd',
        'ť': 't',
        'ň': 'n',
        'ů': 'u',
        'ú': 'u'
    },

    initialize() {
        this.sorted = [];
        this.records = new PeopleList();
        this.listenTo(this.records, 'all', this.trigger);
        this.listenTo(this.records, 'reset', this.onReset)
    },

    onReset() {

        this.recordsGrouped = this.records.groupBy((b) => {

            let surname = b.get('surname');
            if (surname.toLowerCase().startsWith('ch')) {
                console.log("asdkjbaskjdksad");
                return surname.substr(0, 2);
            }
            return surname[0];
        }, 'acs');
        let keys = Object.keys(this.recordsGrouped).sort((a, b) => a.localeCompare(b));

        console.log(keys);
        this.sorted = [];
        keys.forEach(key => this.sorted = this.sorted.concat(this.recordsGrouped[key]));
    },

    delocalization(str) {
        str = str || '';
        str = str.toLocaleLowerCase('cs');

        let de = '';

        for (let i = 0; i < str.length; i++) {
            de += this.czechChars[str[i]] ? this.czechChars[str[i]] : str[i]
        }

        return de;
    },

    filterRecords(str) {
        const records = this.records;
        const filter = this.delocalization(str);

        return records.filter(item => {
            if (this.delocalization(item.get('surname')).includes(filter)) {
                return true;
            }

            return !!this.delocalization(item.get('name')).includes(filter);
        })
    },

    getRecords() {
        let filter = this.get('filter');
        let records;

        if (filter) {
            records = this.filterRecords(filter);
        } else {
            records = this.records.toArray();
        }

        return records.sort((a, b) => {
            return a.get('surname')[0].localeCompare(b.get('surname')[0]);
        });
    },

    getRecord(id) {
        return this.records.get(id);
    },

    getRecordByIndex(index) {

        let i = index;

        if (index >= this.sorted.length) {
            i = 0;
        }

        if (index < 0) {
            i = this.sorted.length - 2;
        }

        return this.getRecord(this.sorted[i]);
    },

    getNext(active) {

        let index = this.sorted.findIndex(i => i.get('id') === active);
        return this.getRecordByIndex(++index);
    },

    getPrevious(active) {

        let index = this.sorted.findIndex(i => i.get('id') === active);
        return this.getRecordByIndex(--index);
    }
});
