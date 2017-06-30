window.billPayCreateComponent = Vue.extend({
    template: `
    <div class="well">
        <form name="edit-form" @submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento:</label>
                <input type="text" class="form-control" v-model="bill.date_due">
            </div>
            <div class="form-group">
                <label>Nome:</label>
                <select class="form-control" v-model="bill.name">
                    <option v-for="o in names" value="{{ o }}">{{ o }}</option>
                </select>
            </div>
            <div class="form-group">
                <label>Valor:</label>
                <input type="text" class="form-control" v-model="bill.value">
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
    data: function () {
        return {
            formType: 'insert',
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$root.$children[0].payBills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.$router.go({name: 'bill-pay.list'});
        },
        getBill: function (index) {
            this.bill = this.$root.$children[0].payBills[index];
        }
    }
});
