"use strict";

window.billReceiveMenuComponent = Vue.extend({
    template: "\n    <div class=\"btn-group\">\n        <a class=\"btn btn-primary\" v-for=\"o in menus\" v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n    </div>\n    ",
    data: function data() {
        return {
            menus: [{ name: "Inserir conta", routeName: 'bill-receive.create' }]
        };
    }
});