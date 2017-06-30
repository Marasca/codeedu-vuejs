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
            title: "Contas a receber"
        };
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].receiveBills;

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
