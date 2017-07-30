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
                        <td>{{ resume.pays.done | numberFormat }}</td>
                    </tr>
                    <tr>
                        <th>A pagar</th>
                        <td>{{ resume.pays.pending | numberFormat }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ resume.pays.total | numberFormat }}</td>
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
                        <td>{{ resume.receives.done | numberFormat }}</td>
                    </tr>
                    <tr>
                        <th>A receber</th>
                        <td>{{ resume.receives.pending | numberFormat }}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{{ resume.receives.total | numberFormat }}</td>
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
                        <td>{{ resume.receives.done - resume.pays.done | numberFormat }}</td>
                    </tr>
                    <tr>
                        <th>Projetado</th>
                        <td>{{ resume.receives.total - resume.pays.total | numberFormat }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
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
    created() {
        this.getPayBillsResume();
        this.getReceiveBillsResume();
    },
    methods: {
        getPayBillsResume() {
            BillPayResource.resume().then((response) => {
                this.resume.pays = response.data.resume;
            });
        },
        getReceiveBillsResume() {
            BillReceiveResource.resume().then((response) => {
                this.resume.receives = response.data.resume;
            });
        }
    }
});
