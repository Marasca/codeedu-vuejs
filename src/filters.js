Vue.filter('billPayLabel', (value) => !value ? 'A pagar' : 'Paga');

Vue.filter('billPayStatus', (value) => {
    if (value === false)
        return "Nenhuma conta cadastrada";
    else if (!value)
        return "Nenhuma conta a pagar";
    else
        return "Existem " + value + " contas a pagar";
});

Vue.filter('billReceiveLabel', (value) => !value ? 'A receber' : 'Recebida');

Vue.filter('billReceiveStatus', (value) => {
    if (value === false)
        return "Nenhuma conta cadastrada";
    else if (!value)
        return "Nenhuma conta a receber";
    else
        return "Existem " + value + " contas a receber";
});

Vue.filter('numberFormat', {
    read(value, locale = 'pt-BR', minFractionDigits = 2, maxFractionDigits = 2, style = 'currency', currency = 'BRL'){
        let number = 0;

        if (value && typeof value !== undefined) {
            let numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        if (value < 0)
            number = '-' + number;

        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits: maxFractionDigits,
            style: style,
            currency: currency
        }).format(number).replace(/^(\D+)/, '$1 ');
    },
    write(value){
        let number = 0;

        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});

Vue.filter('dateFormat', {
    read(value, locale = 'pt-BR'){
        if (value && typeof value !== undefined) {
            if (!(value instanceof Date)) {
                let dateRegex = value.toString().match(/\d{4}\-\d{2}\-\d{2}/);
                let dateString = dateRegex ? dateRegex[0] : dateRegex;

                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }

            return new Intl.DateTimeFormat(locale).format(value).split(' ')[0];
        }

        return value;
    },
    write(value){
        let dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);

        if (dateRegex) {
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");

            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        return value;
    }
});

Vue.filter('toUpper', {
    read(value) {
        return value.toUpperCase();
    },
    write(value) {
        return value.toLowerCase();
    }
});
