window.dashboardComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: `
    <div class="page-header">
        <h1>{{ title }}</h1>
    </div>
    <div class="row">
        <div class="col-md-6">
            <h3>Contas a pagar</h3>
            
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Pagas</th>
                        <td>{{ resume.pays.done | currency 'R$ ' 2 }}</td>
                    </tr>
                    <tr>
                        <th>A pagar</th>
                        <td>{{ resume.pays.pending | currency 'R$ ' 2 }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ resume.pays.total | currency 'R$ ' 2 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-6">
            <h3>Contas a receber</h3>
            
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Recebidas</th>
                        <td>{{ resume.receives.done | currency 'R$ ' 2 }}</td>
                    </tr>
                    <tr>
                        <th>A receber</th>
                        <td>{{ resume.receives.pending | currency 'R$ ' 2 }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ resume.receives.total | currency 'R$ ' 2 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-xs-12 col-md-offset-3 col-md-6">
            <h3>Saldo</h3>
            
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Atual</th>
                        <td>{{ resume.receives.done - resume.pays.done | currency 'R$ ' 2 }}</td>
                    </tr>
                    <tr>
                        <th>Projetado</th>
                        <td>{{ resume.receives.total - resume.pays.total | currency 'R$ ' 2 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data: function () {
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
    created: function () {
        this.getPayBillsResume();
        this.getReceiveBillsResume();
    },
    methods: {
        getPayBillsResume: function () {
            var self = this;

            Bill.resume().then(function (response) {
                self.resume.pays = response.data.resume;
            });
        },
        getReceiveBillsResume: function () {
            var self = this;

            BillReceive.resume().then(function (response) {
                self.resume.receives = response.data.resume;
            });
        }
    }
});
