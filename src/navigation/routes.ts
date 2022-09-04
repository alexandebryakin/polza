import { builder, Config, Route, Subroute } from 'dromos';

const config: Config = {
  notation: 'snake_case',
};

type Routes = {
  signup: Route;
  signin: Route;

  profile: Subroute<{
    general: Route;
    passport: Route;
  }>;
  businessCards: Route;

  settings: Route;
};

export const routes = builder.define<Routes>((root) => {
  root.define('signup');
  root.define('signin');

  root.define('profile').subroutes((profile) => {
    profile.define('general');
    profile.define('passport');
  });

  root.define('businessCards');
  root.define('settings');
}, config);

// routes.__is.profile.general
// routes.__is.profile.general(window.location.pathname)

export const PUBLIC_ROUTES = [routes.signin()._, routes.signup()._];

export const isRoutePublic = (): boolean => {
  return PUBLIC_ROUTES.some((route) => window.location.pathname.includes(route));
};

const isProfile = () => window.location.pathname.includes(routes.profile()._);

const isBusinessCards = () => window.location.pathname.includes(routes.businessCards()._);

const isSettings = () => window.location.pathname.includes(routes.settings()._);

export const routesHelpers = {
  isProfile,
  isBusinessCards,

  isSettings,
};

Object.assign(window, { routesHelpers });
