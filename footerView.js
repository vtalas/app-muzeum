import Backbone from 'backbone';
import $ from 'jquery';

const FooterView = Backbone.View.extend({

    events: {
        'click .index': 'onIndexClick',

        // 'click .close': 'onIndexClick',
        // 'touchstart .close': 'onIndexClick',

        'click .next': 'onNextClick',
        'click .prev': 'onPrevClick',
        'click .search': 'onSearchClick'
    },

    render() {
        let footer = this.$el;

        this.$prev = $('<a/>', { class: 'prev', text: '' }).appendTo(footer);
        this.$next = $('<a/>', { class: 'next', text: '' }).appendTo(footer);
        this.$index = $('<a/>', { class: 'index', text: 'rejstřík' }).appendTo(footer);
        this.$search = $('<a/>', { class: 'search', text: 'hledat' }).appendTo(footer);

        this.$prev.css('visibility', 'hidden');
        this.$next.css('visibility', 'hidden');
        this.$search.css('visibility', 'hidden');
        this.$index.css('visibility', 'hidden');

        return this;
    },

    update(type, opt) {

        opt = opt || {};
        this.active = opt.active;

        if (type === 'index') {
            this.$prev.css('visibility', 'hidden');
            this.$next.css('visibility', 'hidden');
            this.$search.css('visibility', 'visible');
            this.$index.css('visibility', 'hidden');
        }

        if (type === 'detail') {
            this.$prev.css('visibility', 'visible');
            this.$next.css('visibility', 'visible');
            this.$search.css('visibility', 'visible');
            this.$index.css('visibility', 'visible');
        }

        if (type === 'search') {
            this.$prev.css('visibility', 'hidden');
            this.$next.css('visibility', 'hidden');
            this.$search.css('visibility', 'hidden');
            this.$index.css('visibility', 'visible');
        }
    },

    onSearchClick() {
        this.trigger('click:search')
    },

    onIndexClick() {
        this.trigger('click:index');
    },

    onPrevClick() {
        this.trigger('click:prev', this.active);
    },

    onNextClick() {
        this.trigger('click:next', this.active);
    }
});

export default FooterView;