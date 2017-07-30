const PAY_NAMES = [
    'conta de luz',
    'conta de água',
    'conta de telefone',
    'supermercado',
    'cartão de crédito',
    'empréstimo',
    'gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template: `
    <div class="well">
        <form name="edit-form" @submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento:</label>
                <input type="text" class="form-control" v-model="bill.date_due | dateFormat">
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <select class="form-control" v-model="bill.name">
                    <option v-for="o in names" value="{{ o }}">{{ o | toUpper }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor:</label>
                <input type="text" class="form-control" v-model="bill.value | numberFormat">
            </div>
            <div class="form-group">
                <label>Pago?</label>
                <input type="checkbox" v-model="bill.done">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
        </form>
    </div>
    `,
    data() {
        return {
            formType: 'insert',
            names: PAY_NAMES,
            bill: new BillPay()
        };
    },
    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillPayResource.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            } else {
                BillPayResource.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },
        getBill(id) {
            BillPayResource.get({id: id}).then((response) => {
                this.bill = new BillPay(response.data);
            });
        }
    }
});
