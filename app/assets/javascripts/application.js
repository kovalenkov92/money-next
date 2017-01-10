//= require jquery
//= require jquery_ujs
//= require js-cookie/src/js.cookie
//= require i18n
//= require i18n/translations
//= require bootstrap/dist/js/bootstrap.min.js
//= require_tree ./utils

I18n.locale = Cookies.get('locale');

require('./app/index');
