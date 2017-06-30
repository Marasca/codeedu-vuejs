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
    data: function () {
        return {
            title: "Contas a pagar"
        };
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].payBills;

            if (!bills.length)
                return false;

            var count = 0;

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }

            return count;
        }
    }
});
