import Backbone from 'exoskeleton';
import {MuzModel} from './model.muzmodel';
import MuzRouter from './router.muzrouter';

let model = new MuzModel();
let router = new MuzRouter({ model });
model.records.fetch({
    reset: true
});

Backbone.history.start();
