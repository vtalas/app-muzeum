import Backbone from 'exoskeleton';
import {MuzModel} from './model.muzmodel';
import MuzRouter from './router.muzrouter';
import _ from 'lodash';

let model = new MuzModel();
let router = new MuzRouter({ model });
model.records.fetch({
    reset: true,
    success: function(collection, data) {
        console.log("data:", data, arguments);
    },
    error: function() {
        console.log("data:error", arguments);
    }
});

Backbone.history.start();

import $ from 'jquery';
window.x = model;
window._ = _;
window.$ = $;
