import Backbone from 'backbone';
import $ from 'jquery';

const FooterView = Backbone.View.extend({

    events: {
        'click .index': 'onIndexClick',

        // 'click .close': 'onIndexClick',
        // 'touchstart .close': 'onIndexClick',

        'click .student': 'onStudentClick',
        'click .prof': 'onProfClick',
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

        const cont = $('<div/>', { class: 'state-container' }).appendTo(footer);
        this.$pupil = $('<a/>', { class: 'student', text: 'studenti' }).appendTo(cont);
        this.$teacher = $('<a/>', { class: 'prof', text: 'profesoři' }).appendTo(cont);

        this.$prev.css('visibility', 'hidden');
        this.$next.css('visibility', 'hidden');
        this.$search.css('visibility', 'hidden');
        this.$index.css('visibility', 'hidden');

        return this;
    },

    update(opt) {

        opt = opt || {};
        this.active = opt.active;
        const type = opt.type;
        const stateFilter = opt.stateFilter;

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

        if (stateFilter !== undefined) {
            this.$teacher.toggleClass('inactive', !stateFilter.teachers);
            this.$pupil.toggleClass('inactive', !stateFilter.students);
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
    },

    onStudentClick() {
        this.trigger('click:student', this.active);
    },

    onProfClick() {
        this.trigger('click:prof', this.active);
    }
});

export default FooterView;