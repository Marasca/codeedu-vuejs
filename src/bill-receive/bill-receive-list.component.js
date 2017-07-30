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
            <td>{{ o.date_due | dateFormat }}</td>
            <td>{{ o.name | toUpper }}</td>
            <td>{{ o.value | numberFormat }}</td>
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
    data() {
        return {
            bills: []
        };
    },
    created() {
        BillReceiveResource.query().then((response) => {
            this.bills = response.data;
        });
    },
    methods: {
        deleteBill(bill) {
            if (confirm('Deseja realmente exlcuir?')) {
                BillReceiveResource.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});
