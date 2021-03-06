'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: '\n    <div class="page-header">\n        <h1>{{ title }}</h1>\n        \n        <div class="page-actions">\n            <menu-component></menu-component>\n        </div>\n    </div>\n    \n    <div class="page-description">\n        <span :class="{\'gray\':status === false, \'green\': !status, \'red\': status > 0}">\n            {{ status | billPayStatus }}\n        </span>\n    </div>\n    \n    <router-view></router-view>\n    ',
    data: function data() {
        return {
            title: "Contas a pagar",
            status: false
        };
    },
    created: function created() {
        this.updateStatus();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
            if (!bills.length) this.status = false;

            var count = 0;

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            Bill.query().then(function (response) {
                _this.calculateStatus(response.data);
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
        }
    }
});