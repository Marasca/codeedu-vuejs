window.billReceiveListComponent = Vue.extend({
    template: `
    <table class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Paga?</th>
            <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(index, o) in bills">
            <td>{{ o.id }}</td>
            <td>{{ o.date_due }}</td>
            <td>{{ o.name }}</td>
            <td>{{ o.value | currency 'R$ ' 2 }}</td>
            <td :class="{'done': o.done, 'pending': !o.done}">
                {{ o.done | billReceiveLabel }}
            </td>
            <td>
                <a v-link="{name: 'bill-receive.update', params: {id: o.id} }" class="btn btn-default btn-sm">Editar</a>
                <a href="#" @click.prevent="deleteBill(o)" class="btn btn-default btn-sm">Excluir</a>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    data: function () {
        return {
            bills: []
        };
    },
    created: function () {
        var self = this;

        BillReceive.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm('Deseja realmente exlcuir?')) {
                var self = this;

                BillReceive.delete({id: bill.id}).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});
