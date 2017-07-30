"use strict";

window.dashboardComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: "\n    <div class=\"page-header\">\n        <h1>{{ title }}</h1>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-6\">\n            <h3>Contas a pagar</h3>\n            \n            <table class=\"table table-bordered\">\n                <tbody>\n                    <tr>\n                        <th>Pagas</th>\n                        <td>{{ resume.pays.done | numberFormat }}</td>\n                    </tr>\n                    <tr>\n                        <th>A pagar</th>\n                        <td>{{ resume.pays.pending | numberFormat }}</td>\n                    </tr>\n                    <tr>\n                        <th>Total</th>\n                        <td>{{ resume.pays.total | numberFormat }}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"col-md-6\">\n            <h3>Contas a receber</h3>\n            \n            <table class=\"table table-bordered\">\n                <tbody>\n                    <tr>\n                        <th>Recebidas</th>\n                        <td>{{ resume.receives.done | numberFormat }}</td>\n                    </tr>\n                    <tr>\n                        <th>A receber</th>\n                        <td>{{ resume.receives.pending | numberFormat }}</td>\n                    </tr>\n                    <tr>\n                        <th>Total</th>\n                        <td>{{ resume.receives.total | numberFormat }}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"col-xs-12 col-md-offset-3 col-md-6\">\n            <h3>Saldo</h3>\n            \n            <table class=\"table table-bordered\">\n                <tbody>\n                    <tr>\n                        <th>Atual</th>\n                        <td>{{ resume.receives.done - resume.pays.done | numberFormat }}</td>\n                    </tr>\n                    <tr>\n                        <th>Projetado</th>\n                        <td>{{ resume.receives.total - resume.pays.total | numberFormat }}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    ",
    data: function data() {
        return {
            title: "Início",
            resume: {
                pays: {
                    done: 0,
                    pending: 0,
                    total: 0
                },
                receives: {
                    done: 0,
                    pending: 0,
                    total: 0
                }
            }
        };
    },
    created: function created() {
        this.getPayBillsResume();
        this.getReceiveBillsResume();
    },

    methods: {
        getPayBillsResume: function getPayBillsResume() {
            var _this = this;

            BillPayResource.resume().then(function (response) {
                _this.resume.pays = response.data.resume;
            });
        },
        getReceiveBillsResume: function getReceiveBillsResume() {
            var _this2 = this;

            BillReceiveResource.resume().then(function (response) {
                _this2.resume.receives = response.data.resume;
            });
        }
    }
});