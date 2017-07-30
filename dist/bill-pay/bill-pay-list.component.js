'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n    <table class="table table-bordered table-striped">\n        <thead>\n        <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Paga?</th>\n            <th>A\xE7\xF5es</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr v-for="(index, o) in bills">\n            <td>{{ o.id }}</td>\n            <td>{{ o.date_due | dateFormat }}</td>\n            <td>{{ o.name | toUpper }}</td>\n            <td>{{ o.value | numberFormat }}</td>\n            <td :class="{\'done\': o.done, \'pending\': !o.done}">\n                {{ o.done | billPayLabel }}\n            </td>\n            <td>\n                <a v-link="{name: \'bill-pay.update\', params: {id: o.id} }" class="btn btn-default btn-sm">Editar</a>\n                <a href="#" @click.prevent="deleteBill(o)" class="btn btn-default btn-sm">Excluir</a>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n    ',
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillPayResource.query().then(function (response) {
            _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm('Deseja realmente exlcuir?')) {
                BillPayResource.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});