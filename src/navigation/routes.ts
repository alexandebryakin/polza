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
  return PUBLIC_ROUTES.some((route) =>
    window.location.pathname.includes(route)
  );
};

const isProfile = () => window.location.pathname.includes(ROUTES.PROFILE);

const isBusinessCards = () =>
  window.location.pathname.includes(ROUTES.BUSINESS_CARDS);

const isSettings = () => window.location.pathname.includes(ROUTES.SETTINGS);

export const routes = {
  isProfile,
  isBusinessCards,

  isSettings,
};

Object.assign(window, { routes, ROUTES });
