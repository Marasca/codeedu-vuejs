window.billReceiveCreateComponent = Vue.extend({
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
                <label>Recebido?</label>
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
                'Parc. do sistema do João',
                'Venda smartphone',
                'Manutenção site da Mariana'
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
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function () {
            var self = this;

            if (this.formType == 'insert') {
                BillReceive.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillReceive.update({id: this.bill.id}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function (id) {
            var self = this;

            BillReceive.get({id: id}).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});
