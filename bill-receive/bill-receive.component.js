window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
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
            {{ status | billReceiveStatus }}
        </span>
    </div>
    
    <router-view></router-view>
    `,
    data: function () {
        return {
            title: "Contas a receber",
            status: false
        };
    },
    created: function () {
        this.updateStatus();
    },
    methods: {
        calculateStatus: function (bills) {
            if (!bills.length)
                this.status = false;

            var count = 0;

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            this.status = count;
        },
        updateStatus: function () {
            var self = this;

            BillReceive.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        }
    },
    events: {
        'change-info': function () {
            this.updateStatus();
        }
    }
});
