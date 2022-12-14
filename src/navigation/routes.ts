import { builder, Config, Route, Subroute } from 'dromos';

const config: Config = {
  notation: 'snake_case',
};

type Routes = {
  signup: Route;
  signin: Route;

  profile: Subroute<{
    general: Route;
  }>;
  businessCards: Subroute<{
    edit: Route;
    connections: Route;
  }>;

  settings: Subroute<{
    passport: Route;
    security: Route;
  }>;
};

export const routes = builder.define<Routes>((root) => {
  root.define('signup');
  root.define('signin');

  root.define('profile').subroutes((profile) => {
    profile.define('general');
  });

  root.define('businessCards').subroutes((businessCards) => {
    businessCards.define('edit');
    businessCards.define('connections');
  });
  root.define('settings').subroutes((settings) => {
    settings.define('passport');
    settings.define('security');
  });
}, config);

// routes.__is.profile.general
// routes.__is.profile.general(window.location.pathname)

export const PUBLIC_ROUTES = [routes.signin()._, routes.signup()._];
export const AUTH_ROUTES = [routes.signin()._, routes.signup()._];

export const isRoutePublic = (): boolean => {
  return PUBLIC_ROUTES.some((route) => window.location.pathname.includes(route)) || isRoutePublicBusinessCard();
};

export const isRoutePublicBusinessCard = (): boolean => {
  const regex = new RegExp(routes.businessCards()._ + '/([a-z0-9]|-)+$');

  return regex.test(window.location.pathname) && window.location.pathname !== routes.businessCards().connections()._;
};

export const isRouteAuth = (): boolean => {
  return AUTH_ROUTES.some((route) => window.location.pathname.includes(route));
};

const isProfile = () => window.location.pathname.includes(routes.profile()._);

const isBusinessCards = () => window.location.pathname.includes(routes.businessCards()._);

const isSettings = () => window.location.pathname.includes(routes.settings()._);

export const routesHelpers = {
  isProfile,
  isBusinessCards,

  isSettings,
};

Object.assign(window, { routesHelpers, routes });
