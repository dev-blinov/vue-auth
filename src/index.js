import './utils/console';
import './utils/helpers';
import Auth from './Auth';

export default {
  install: function (Vue, router, options) {
    Vue.prototype.$auth = new Auth(router, options);
    console.dev('Init auth plugin');
  },
};
