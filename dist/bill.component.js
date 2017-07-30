"use strict";

window.billComponent = Vue.extend({
    template: "\n    <nav class=\"navbar navbar-default\">\n        <div class=\"container\">\n            <div class=\"navbar-header\">\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\n                        data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n                    <span class=\"sr-only\">Toggle navigation</span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                    <span class=\"icon-bar\"></span>\n                </button>\n                <span class=\"navbar-brand\">Vue Contas</span>\n            </div>\n    \n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                <ul class=\"nav navbar-nav\">\n                    <li v-for=\"o in menus\" v-link-active>\n                        <a v-link=\"{name: o.routeName}\">{{ o.name }}</a>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </nav>\n    <div class=\"container\">\n        <router-view></router-view>\n    </div>\n    ",
    data: function data() {
        return {
            menus: [{ name: "Início", routeName: 'dashboard' }, { name: "Contas a pagar", routeName: 'bill-pay.list' }, { name: "Contas a receber", routeName: 'bill-receive.list' }]
        };
    }
});