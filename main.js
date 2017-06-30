Vue.config.devtools = true;

var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            payBills: [
                {date_due: "26/06/2017", name: "Conta de luz", value: 70.99, done: true},
                {date_due: "26/06/2017", name: "Conta de água", value: 55.99, done: false},
                {date_due: "26/06/2017", name: "Conta de telefone", value: 55.99, done: false},
                {date_due: "26/06/2017", name: "Supermercado", value: 625.99, done: false},
                {date_due: "26/06/2017", name: "Cartão de crédito", value: 1500.99, done: false},
                {date_due: "26/06/2017", name: "Empréstimo", value: 2000.99, done: false},
                {date_due: "26/06/2017", name: "Gasolina", value: 200, done: false}
            ],
            receiveBills: [
                {date_due: "30/06/2017", name: "Parc. do sistema do João", value: 450, done: true},
                {date_due: "30/06/2017", name: "Venda smartphone", value: 300, done: false},
                {date_due: "30/06/2017", name: "Manutenção site da Mariana", value: 69.90, done: false}
            ]
        };
    }
});

var router = new VueRouter({
    linkActiveClass: 'active'
});

router.map({
    'bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }
    },
    'bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    },
    '/dashboard': {
        name: 'dashboard',
        component: dashboardComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
    '*': '/dashboard'
})