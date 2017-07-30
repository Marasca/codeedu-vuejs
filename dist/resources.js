'use strict';

Vue.http.options.root = 'http://localhost:8000/api';

window.BillPayResource = Vue.resource('bills{/id}', {}, {
    resume: {
        method: 'GET',
        url: 'bills/resume'
    }
});

window.BillReceiveResource = Vue.resource('bills-receives{/id}', {}, {
    resume: {
        method: 'GET',
        url: 'bills-receives/resume'
    }
});