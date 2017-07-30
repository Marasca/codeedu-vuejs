'use strict';

var PAY_NAMES = ['conta de luz', 'conta de água', 'conta de telefone', 'supermercado', 'cartão de crédito', 'empréstimo', 'gasolina'];

window.billPayCreateComponent = Vue.extend({
    template: '\n    <div class="well">\n        <form name="edit-form" @submit.prevent="submit">\n            <div class="form-group">\n                <label>Vencimento:</label>\n                <input type="text" class="form-control" v-model="bill.date_due | dateFormat">\n            </div>\n            <div class="form-group">\n                <label>Nome:</label>\n                <select class="form-control" v-model="bill.name">\n                    <option v-for="o in names" value="{{ o }}">{{ o | toUpper }}</option>\n                </select>\n            </div>\n            <div class="form-group">\n                <label>Valor:</label>\n                <input type="text" class="form-control" v-model="bill.value | numberFormat">\n            </div>\n            <div class="form-group">\n                <label>Pago?</label>\n                <input type="checkbox" v-model="bill.done">\n            </div>\n            <div class="form-group">\n                <button type="submit" class="btn btn-primary">Enviar</button>\n            </div>\n        </form>\n    </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: PAY_NAMES,
            bill: new BillPay()
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillPayResource.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                BillPayResource.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillPayResource.get({ id: id }).then(function (response) {
                _this2.bill = new BillPay(response.data);
            });
        }
    }
});