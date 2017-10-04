import Backbone from 'backbone';
import $ from 'jquery';

const DetailView = Backbone.View.extend({

    initialize(opt) {
        this.active = opt.active;
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change:stateFilter', function() {
            this.active = this.model.sorted[0].id;
            this.render();
        });
    },

    render() {

        let m = this.model.getRecord(this.active);

        this.$el.empty();
        if (!m) {
            return this;
        }

        this.$el.append($('<h1/>').text(`${m.get('surname')} ${m.get('name')}`));
        if (m.get('maiden')) {
            this.$el.append($('<h2/>').text(`rozená ${m.get('maiden')}`));
        }
        if (m.get('original_name')) {
            this.$el.append($('<h2/>').text(`vl. jménem ${m.get('original_name')}`));
        }
        this.$el.append($('<h3/>').text(m.get('title')));
        this.$el.append(this.renderTimePlace());
        this.$el.append($('<p/>', { class: 'detail-text', text: m.get('text') }));

        return this;
    },

    renderTimePlace() {

        let m = this.model.getRecord(this.active);

        const born = m.get('birth');
        const died = m.get('died');
        const cont = $('<div/>', { class: 'birth-died' });

        if (born) {

            // const text = [this.formatDate(new Date(born)), m.get('birth_place')];
            $('<h4/>', { class: 'born', text: born }).appendTo(cont);
        }

        if (died && died !== '???') {

            // const text = [this.formatDate(new Date(died)), m.get('died_place')];
            $('<h4/>', { class: 'died', text: died }).appendTo(cont);
        }

        return cont;
    },

    formatDate(date) {
        return date.toLocaleString('cs', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    },
});


export default DetailView;

