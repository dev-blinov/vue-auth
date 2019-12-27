import cookie from 'js-cookie';

const DEFAULT_ROUTE = '/';
const AUTH_ROUTE = '/login';

const DEFAULT_OPTIONS = {
  defaultRoute: DEFAULT_ROUTE,
  authRoute: AUTH_ROUTE,
  allowedRoutes: [],
  excludeRoutes: [],
  key: 'auth',
  cookieName: 'jwt',
};

class Auth {

  constructor(router, options = {}) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    router.beforeEach((to, from, next) => this.createGuard(to, from, next));
  }

  isAuth() {
    const {cookieName} = this.options;
    return cookie.get(cookieName) || null;
  }

  createGuard(to, from, next) {
    const {
      defaultRoute,
      authRoute,
      allowedRoutes,
      excludeRoutes,
      key,
    } = this.options;

    const match = to.matched.find(record => key in record.meta);

    if (allowedRoutes.includeRoute(to)) return next();

    if (this.isAuth()) {
      if (excludeRoutes.includeRoute(to)) return next(defaultRoute);
    } else {
      if (match && match.meta[key]) return next(authRoute);
    }

    return next();
  }
}

export default Auth;
