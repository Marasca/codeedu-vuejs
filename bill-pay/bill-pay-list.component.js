window.billPayListComponent = Vue.extend({
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
            <td>{{ index + 1 }}</td>
            <td>{{ o.date_due }}</td>
            <td>{{ o.name }}</td>
            <td>{{ o.value | currency 'R$ ' 2 }}</td>
            <td :class="{'done': o.done, 'pending': !o.done}">
                {{ o.done | billPayLabel }}
            </td>
            <td>
                <a v-link="{name: 'bill-pay.update', params: {index: index} }" class="btn btn-default btn-sm">Editar</a>
                <a href="#" @click.prevent="deleteBill(o)" class="btn btn-default btn-sm">Excluir</a>
            </td>
        </tr>
        </tbody>
    </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].payBills
        };
    },
    methods: {
        deleteBill: function (bill) {
            if (confirm('Deseja realmente exlcuir?')) {
                this.$root.$children[0].payBills.$remove(bill);
            }
        }
    }
});
