window.billReceiveMenuComponent = Vue.extend({
    template: `
    <div class="btn-group">
        <a class="btn btn-primary" v-for="o in menus" v-link="{name: o.routeName}">{{ o.name }}</a>
    </div>
    `,
    data: function () {
        return {
            menus: [
                {name: "Inserir conta", routeName: 'bill-receive.create'}
            ]
        };
    }
});
