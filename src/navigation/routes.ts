export const ROUTES = {
  AUTH: {
    SIGNUP: '/signup',
    SIGNIN: '/signin',
  },

  PROFILE: '/profile',
};

export const PUBLIC_ROUTES = [ROUTES.AUTH.SIGNIN, ROUTES.AUTH.SIGNUP];

export const isRoutePublic = (): boolean => {
  return PUBLIC_ROUTES.some((route) =>
    window.location.pathname.includes(route)
  );
};
