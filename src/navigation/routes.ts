import { builder, Config, Route, Schema, Subroute, types, utils } from '../lib/dromos';

export const ROUTES = {
  AUTH: {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
  },

  PROFILE: '/profile',
  BUSINESS_CARDS: '/business_cards',
  SETTINGS: '/settings',
};

export const PUBLIC_ROUTES = [ROUTES.AUTH.SIGNIN, ROUTES.AUTH.SIGNUP];

export const isRoutePublic = (): boolean => {
  return PUBLIC_ROUTES.some((route) => window.location.pathname.includes(route));
};

const isProfile = () => window.location.pathname.includes(ROUTES.PROFILE);

const isBusinessCards = () => window.location.pathname.includes(ROUTES.BUSINESS_CARDS);

const isSettings = () => window.location.pathname.includes(ROUTES.SETTINGS);

export const routes = {
  isProfile,
  isBusinessCards,

  isSettings,
};

Object.assign(window, { routes, ROUTES });

type Routes = {
  profile: Route;
  users: Subroute<{
    properties: Subroute<{
      else: Route;
    }>;
    friends: Route;
    kebabCase: Subroute<{
      someOtherThing: Route;
    }>;
  }>;
  settings: Subroute<{
    general: Route;
    passowrd: Route;
  }>;
};

const config: Config = {
  // notation: 'kebab-case',
  notation: 'camelCase',
};

const __routes = builder.define<Routes>((root) => {
  root.define('profile');

  root.define('users').subroutes((users) => {
    users.define('properties').subroutes((smthelse) => {
      smthelse.define('else');
    });

    users.define('friends');

    users.define('kebabCase', { notation: 'kebab-case' }).subroutes((kebabCase) => {
      kebabCase.define('someOtherThing');
    });
  });

  root.define('profile').subroutes((profile) => {
    profile.define('general');
    profile.define('password');
  });
}, config);

Object.assign(window, { __routes });
// const a1 = __routes.users('uid')._;
// const a2 = __routes.users('uid').properties('pid')._;
// __routes.users('uid').friends('fid');
// __routes.users(':uid').kebabCase().someOtherThing()._;
//  __routes.settings().general();

const schema: Schema = {
  profile: types.route,
  users: {
    properties: types.route,
    kebabCase: {
      someOtherThing: types.route,
    },
  },
  settings: {
    general: types.route,
    password: types.route,
  },
};

const __routesFromConfig = builder.from<Routes>(schema, config);
__routesFromConfig.users(':uid').kebabCase().someOtherThing();
Object.assign(window, { __routesFromConfig });

const d = utils.match(__routes.users(':uid').properties(':pid')._, '/users/1/properties/3?q=5');

// utils.findMatch(__routes, '/users/1/properties/3?q=5');
// utils.allRoutes(__routes)

Object.assign(window, { utils });

// [IDEA]: query
// routes.users().properties().__query({
//   a: 1,
//   b: ['12', '13']
// })
