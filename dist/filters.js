'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('billPayLabel', function (value) {
    return !value ? 'A pagar' : 'Paga';
});

Vue.filter('billPayStatus', function (value) {
    if (value === false) return "Nenhuma conta cadastrada";else if (!value) return "Nenhuma conta a pagar";else return "Existem " + value + " contas a pagar";
});

Vue.filter('billReceiveLabel', function (value) {
    return !value ? 'A receber' : 'Recebida';
});

Vue.filter('billReceiveStatus', function (value) {
    if (value === false) return "Nenhuma conta cadastrada";else if (!value) return "Nenhuma conta a receber";else return "Existem " + value + " contas a receber";
});

Vue.filter('numberFormat', {
    read: function read(value) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';
        var minFractionDigits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
        var maxFractionDigits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
        var style = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'currency';
        var currency = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'BRL';

        var number = 0;

        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }

        if (value < 0) number = '-' + number;

        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: minFractionDigits,
            maximumFractionDigits: maxFractionDigits,
            style: style,
            currency: currency
        }).format(number).replace(/^(\D+)/, '$1 ');
    },
    write: function write(value) {
        var number = 0;

        if (value.length > 0) {
            number = value.replace(/[^\d\,]/g, '').replace(/\,/g, '.');
            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value) {
        var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';

        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.toString().match(/\d{4}\-\d{2}\-\d{2}/);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;

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
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);

        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");

            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        return value;
    }
});

Vue.filter('toUpper', {
    read: function read(value) {
        return value.toUpperCase();
    },
    write: function write(value) {
        return value.toLowerCase();
    }
});