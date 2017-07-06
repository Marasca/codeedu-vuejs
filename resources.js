Vue.http.options.root = 'http://localhost:8000/api';

window.Bill = Vue.resource('bills{/id}', {}, {
    resume: {
        method: 'GET',
        url: 'bills/resume'
    }
});

window.BillReceive = Vue.resource('bills-receives{/id}', {}, {
    resume: {
        method: 'GET',
        url: 'bills-receives/resume'
    }
});
