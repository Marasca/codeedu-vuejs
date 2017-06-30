Vue.filter('billPayLabel', function (value) {
    return !value ? 'A pagar' : 'Paga';
});

Vue.filter('billPayStatus', function (value) {
    if (value === false)
        return "Nenhuma conta cadastrada";
    else if (!value)
        return "Nenhuma conta a pagar";
    else
        return "Existem " + value + " contas a pagar";
});

Vue.filter('billReceiveLabel', function (value) {
    return !value ? 'A receber' : 'Recebida';
});

Vue.filter('billReceiveStatus', function (value) {
    if (value === false)
        return "Nenhuma conta cadastrada";
    else if (!value)
        return "Nenhuma conta a receber";
    else
        return "Existem " + value + " contas a receber";
});
