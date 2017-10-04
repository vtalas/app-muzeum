import Backbone from 'exoskeleton';
import IndexView from './indexView';
import FooterView from './footerView';
import DetailView from './detailView';
import SearchView from './search.view';
import $ from 'jquery';
import {MuzModel} from './model.muzmodel';

const MuzRouter = Backbone.Router.extend({
    routes: {
        'user/:id': 'user',
        'search': 'search',
        '*path': 'main'
    },

    views: {
        index: null,
        footer: null,
    },

    initialize(opt) {

        this.dom = {
            app: $('.main'),
            detail: $('.detail'),
            index: $('.list'),
            search: $('.search-page')
        };

        this.model = opt.model;
        this.initFooterView();
        this.listenTo(this.model, 'change:active', (model, active) => {

            if (!active) {
                this.navigate('main', { trigger: true });
            }
        });
    },

    execute(callback, args) {

        this.dom.detail.hide();
        this.dom.search.hide();
        if (this.views.index) {
            this.views.index.hide();
        }

        if (callback) callback.apply(this, args);
    },

    initFooterView() {

        let footer = this.views.footer = new FooterView({ el: $('.footer') }).render();

        this.listenTo(footer, 'click:search', () => this.navigate('search', { trigger: true }));
        this.listenTo(footer, 'click:index', () => this.navigate('main', { trigger: true }));
        this.listenTo(footer, 'click:prev', (currentId) => {
            const prev = this.model.getPrevious(currentId);
            this.navigate('user/' + prev.get('id'), { trigger: true })
        });

        this.listenTo(footer, 'click:next', (currentId) => {
            const next = this.model.getNext(currentId);
            this.navigate('user/' + next.get('id'), { trigger: true })
        });

        this.listenTo(footer, 'click:student', function() {
            const stateFilter = _.clone(this.model.get('stateFilter'));
            stateFilter.students = !stateFilter.students;

            if (!stateFilter.students && !stateFilter.teachers) {
                stateFilter.teachers = true;
            }


            console.log("asdkjbsakd", stateFilter);
            this.model.set('stateFilter', stateFilter);
            footer.update({ stateFilter })
        });

        this.listenTo(footer, 'click:prof', function() {
            const stateFilter = _.clone(this.model.get('stateFilter'));
            stateFilter.teachers = !stateFilter.teachers;

            if (!stateFilter.students && !stateFilter.teachers) {
                stateFilter.students = true;
            }

            this.model.set('stateFilter', stateFilter);
            footer.update({ stateFilter })
        })
    },

    initIndexView() {

        const views = this.views;
        views.index = new IndexView({ model: this.model }).render();

        this.listenTo(views.index, 'click:record', (id, evt) => this.navigate('user/' + id, { trigger: true }))
    },

    main() {

        const views = this.views;
        if (!views.index) {
            this.initIndexView();
            views.index.render();
        }

        views.index.show();
        views.footer.update({ type: 'index', stateFilter: this.model.get('stateFilter') });
    },

    user(id) {

        let view = new DetailView({ model: this.model, active: id });
        this.dom.detail.show().html(view.el);
        view.render();
        this.views.footer.update({ type: 'detail', active: id });
        this.dom.app.scrollTop(0);
    },

    search() {

        const views = this.views;
        if (!views.search) {
            let view = new SearchView({ el: this.dom.search, model: this.model }).render();
            views.search = view;

            this.listenTo(view, 'click:record', (id, evt) => {
                console.log("id", id, 'user/' + id);
                this.navigate('user/' + id, { trigger: true })
            })
        }
        views.search.show();
        this.views.footer.update({ type: 'search' });
    }
});

export default MuzRouter;