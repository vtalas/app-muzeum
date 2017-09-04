import Backbone from 'exoskeleton';
import IndexView from './indexView';
import FooterView from './footerView';
import DetailView from './detailView';
import SearchView from './search.view';
import $ from 'jquery';

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

        this.views.footer = new FooterView({ el: $('.footer'), model: this.model }).render();
        this.listenTo(this.views.footer, 'click:search', () => this.navigate('search', { trigger: true }));
        this.listenTo(this.views.footer, 'click:index', () => this.navigate('main', { trigger: true }));
        this.listenTo(this.views.footer, 'click:prev', (currentId) => {
            const prev = this.model.getPrevious(currentId);
            this.navigate('user/' + prev.get('id'), { trigger: true })
        });

        this.listenTo(this.views.footer, 'click:next', (currentId) => {
            const next = this.model.getNext(currentId);
            this.navigate('user/' + next.get('id'), { trigger: true })
        });
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
        views.footer.update('index');
    },

    user(id) {

        let view = new DetailView({ model: this.model, active: id });
        this.dom.detail.show().html(view.el);
        view.render();
        this.views.footer.update('detail', { active: id });
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
        this.views.footer.update('search');
    }
});

export default MuzRouter;