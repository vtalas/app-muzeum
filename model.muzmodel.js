import Backbone from 'exoskeleton';

let PeopleList = Backbone.Collection.extend({
    url: 'assets/data.json',
    parse: function(data) {
        return data.records;
    }
});

export const STATE = {
    STUDENT: 0,
    TEACHER: 1,
    TEACHER_STUDENT: 2
};

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
        this.set('stateFilter', {
            teachers: true,
            students: true
        });

        this.sorted = [];
        this.records = new PeopleList();
        this.listenTo(this.records, 'all', this.trigger);
        this.listenTo(this.records, 'reset', this.sortAndGroup);
        this.on('change:stateFilter', this.sortAndGroup);
    },

    sortAndGroup: function() {

        const x = this.records.filter(function(item) {
            let stateFilter = this.get('stateFilter');
            let state = item.get('state');

            if (!stateFilter.students) {
                return state === STATE.TEACHER || state === STATE.TEACHER_STUDENT;
            }

            if (!stateFilter.teachers) {
                return state === STATE.STUDENT || state === STATE.TEACHER_STUDENT;
            }

            return true;
        }.bind(this));

        this.recordsGrouped = _.groupBy(x, (b) => {

            let surname = b.get('surname');
            if (surname.toLowerCase().startsWith('ch')) {
                return surname.substr(0, 2);
            }
            return surname[0];
        }, 'acs');

        let keys = Object.keys(this.recordsGrouped).sort((a, b) => a.localeCompare(b));

        this.sorted = [];
        keys.forEach(key => this.sorted = this.sorted.concat(this.recordsGrouped[key]));
        this.trigger('groupedsorted');
    },

    _delocalization(str) {
        str = str || '';
        str = str.toLocaleLowerCase('cs');

        let de = '';

        for (let i = 0; i < str.length; i++) {
            de += this.czechChars[str[i]] ? this.czechChars[str[i]] : str[i]
        }

        return de;
    },

    filterRecords(str) {
        const records = this.sorted;
        const filter = this._delocalization(str);

        return records.filter(item => {
            if (this._delocalization(item.get('surname')).includes(filter)) {
                return true;
            }

            return !!this._delocalization(item.get('name')).includes(filter);
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
