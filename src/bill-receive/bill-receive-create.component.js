const RECEIVE_NAMES = [
    'parc. do sistema do joão',
    'venda smartphone',
    'manutenção site da mariana'
];

window.billReceiveCreateComponent = Vue.extend({
    template: `
    <div class="well">
        <form name="edit-form" @submit.prevent="submit">
            <div class="form-group">
                <label>Vencimento:</label>
                <input type="text" class="form-control" v-model="bill.date_due | dateFormat 'pt-BR'">
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
                <label>Recebido?</label>
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
            names: RECEIVE_NAMES,
            bill: new BillReceive()
        };
    },
    created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit() {
            let data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillReceiveResource.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillReceiveResource.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id) {
            BillReceiveResource.get({id: id}).then((response) => {
                this.bill = new BillReceive(response.data);
            });
        }
    }
});
