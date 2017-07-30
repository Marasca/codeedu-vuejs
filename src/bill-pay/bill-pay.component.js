window.billPayComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: `
    <div class="page-header">
        <h1>{{ title }}</h1>
        
        <div class="page-actions">
            <menu-component></menu-component>
        </div>
    </div>
    
    <div class="page-description">
        <span :class="{'gray':status === false, 'green': !status, 'red': status > 0}">
            {{ status | billPayStatus }}
        </span>
    </div>
    
    <router-view></router-view>
    `,
    data() {
        return {
            title: "Contas a pagar",
            status: false
        };
    },
    created() {
        this.updateStatus();
    },
    methods: {
        calculateStatus(bills) {
            if (!bills.length)
                this.status = false;

            let count = 0;

            for (let i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count;
        },
        updateStatus() {
            BillPayResource.query().then((response) => {
                this.calculateStatus(response.data);
            });
        }
    },
    events: {
        'change-info'() {
            this.updateStatus();
        }
    }
});
