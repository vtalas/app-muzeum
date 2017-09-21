import Backbone from 'backbone';
import $ from 'jquery';

const IndexView = Backbone.View.extend({

    el: '.main',
    recordElement: $('<a/>', { class: 'record' }),
    letterElement: $('<h1/>', { class: 'record-letter' }),
    MIN_SIZE: 8,
    MAX_COLUMNS: 3,

    events: {
        'click .list .record': 'recordClicked',
    },

    initialize() {
        this.$list = this.$('.list');
        this.listenTo(this.model, 'reset', this.render);
        this.$el.scroll(() => {
            if (this.visible) {
                this.currentScroll = this.$el.scrollTop();
            }
        })
    },

    hide() {
        this.visible = false;
        this.$list.hide();
    },

    show() {
        this.$list.show();
        this.$el.scrollTop(this.currentScroll || 0);
        this.visible = true;
    },

    render() {

        if (!this.model.recordsGrouped) {
            return this;
        }

        this.$list.empty();
        Object.keys(this.model.recordsGrouped).map((currentLetter) => {

            this.letterElement
                .clone()
                .text(currentLetter)
                .appendTo(this.$list);

            this.renderRecordBatch(this.model.recordsGrouped[currentLetter]);
        });

        return this;
    },

    renderRecordBatch(batch) {

        let sortedBatch = batch.sort((a, b) => a.get('surname').localeCompare(b.get('surname')));

        const batchSize = sortedBatch.length;
        let columns = Math.min(Math.ceil(batchSize / this.MIN_SIZE), this.MAX_COLUMNS);
        let batchContainer = $('<div/>').addClass('batch-container');
        let column = $('<divs/>', { class: 'column' });
        let step = Math.ceil(batchSize / columns);

        let x = column.clone();
        for (let i = 0; i < batchSize; i++) {
            let obj = sortedBatch[i];
            if (i > 0 && i % step === 0) {
                batchContainer.append(x);
                x = column.clone();
            }

            const record = this.recordElement.clone();

            record.attr('id', obj.get('id'))
                .text(`${obj.get('surname')} ${obj.get('name')}`)
                .appendTo(x);

            // const teacher = obj.get('state') === 1 || obj.get('state') === 2;
            // if (teacher) {
            //     record.css('font-weight', 'bold');
            // }
        }

        batchContainer.append(x);
        this.$list.append(batchContainer);
    },

    recordClicked(evt) {

        let id = $(evt.target).attr('id');
        this.trigger('click:record', id, evt);
    }

});

export default IndexView;