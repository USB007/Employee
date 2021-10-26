const Handlebars = require('handlebars')

Handlebars.registerHelper('select', function (value, options) {
    return options.fn()
    .split('\n')
    .map(function (v) {
    var t = 'value="' + value + '"';
    return RegExp(t).test(v) ? v.replace(t, t + ' selected="selected"') : v;
    })
    .join('\n');
});

// This handlebars_helper help to compare the fetched data with the dropdown box data.
// then show the value on dropdown box.