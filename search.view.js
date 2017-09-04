import Backbone from 'backbone';
import $ from 'jquery';

const SearchView = Backbone.View.extend({

    events: {
        'keyup .search-input': 'doSearch',
        'click .results .record': 'onRecordClicked'
    },

    initialize() {
        this.listenTo(this.model, 'change:filter', this.renderResults);
    },

    render() {

        this.$el.empty();
        const input = this.$input = $('<input/>', {
            class: 'search-input',
            placeholder: 'Vyhledejte osobnost ... ',
            id: 'search-input',
            autofocus: true
        });

        this.$el.append(input);

        this.$results = $('<div/>', { class: 'results' });
        this.$el.append(this.$results);
        return this;
    },

    show() {
        this.$el.show();
        this.$input[0].focus();
    },

    renderResults(model, str) {

        const dest = this.$results.empty();

        if (!str) {
            return;
        }

        const results = this.model.getRecords();
        let list = [];

        for (let i = 0; i < results.length; i++) {
            const item = results[i];
            list.push(this.renderResult(item));
        }
        dest.append(list);
    },

    renderResult(item) {

        const result = $('<div/>', { class: 'record', id: item.get('id') });

        const el = $('<div/>', {
            class: 'headlight',
            text: `${item.get('name')} ${item.get('surname').toUpperCase()}`
        });

        result.append(el);
        if (item.get('bi' +
                'rth')) {
            result.append($('<div/>', { class: 'born' }).text(item.get('birth')))
        }

        if (item.get('died')) {
            result.append($('<div/>', { class: 'born' }).text(item.get('died')))
        }

        return result;
    },

    doSearch(evt) {

        const searchString = $(evt.target).val();
        this.model.set('filter', searchString);
    },

    onRecordClicked(evt) {

        let id = $(evt.target).closest('.record').attr('id');
        this.trigger('click:record', id);
    }
});

export default SearchView;
