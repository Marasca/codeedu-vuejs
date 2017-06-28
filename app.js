Vue.filter('doneLabel', function (value) {
    return !value ? 'Não paga' : 'Paga';
});

Vue.filter('statusGeneral', function (value) {
    if (value === false)
        return "Nenhuma conta cadastrada";
    else if (!value)
        return "Nenhuma conta a pagar";
    else
        return "Exitem " + value + " contas a pagar";
});

var app = new Vue({
    el: "#app",
    data: {
        title: "Contas a receber",
        menus: [
            {id: 0, name: "Listas contas"},
            {id: 1, name: "Criar conta"}
        ],
        activatedView: 0,
        formType: 'insert',
        bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: "26/06/2017", name: "Conta de luz", value: 70.99, done: true},
            {date_due: "26/06/2017", name: "Conta de água", value: 55.99, done: false},
            {date_due: "26/06/2017", name: "Conta de telefone", value: 55.99, done: false},
            {date_due: "26/06/2017", name: "Supermercado", value: 625.99, done: false},
            {date_due: "26/06/2017", name: "Cartão de crédito", value: 1500.99, done: false},
            {date_due: "26/06/2017", name: "Empréstimo", value: 2000.99, done: false},
            {date_due: "26/06/2017", name: "Gasolina", value: 200, done: false}
        ]
    },
    computed: {
        status: function () {
            if (!this.bills.length)
                return false;

            var count = 0;

            for (var i in this.bills) {
                if (!this.bills[i].done) {
                    count++;
                }
            }

            return count;
        }
    },
    methods: {
        showView: function (id) {
            this.activatedView = id;
            if (id == 1) {
                this.formType = 'insert';

                this.bill = {
                    date_due: '',
                    name: '',
                    value: 0,
                    done: false
                };
            }
        },
        submit: function () {
            if (this.formType == 'insert') {
                this.bills.push(this.bill);
            }

            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.activatedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activatedView = 1;
            this.formType = 'update';
        },
        deleteBill: function (bill) {
            if (confirm('Deseja realmente exlcuir?')) {
                this.bills.$remove(bill);
            }
        }
    }
});
