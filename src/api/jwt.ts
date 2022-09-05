import jwtDecode from 'jwt-decode';

const LOCALSTORAGE_TOKEN_KEY = '__token';

function set(token: string) {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
}

function get() {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

function forget() {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, '');
}

interface JWTData {
  data: {
    user: {
      id: UUID;
    };
  };
  exp: timestamp;
}

function _decode(token: string): JWTData {
  return jwtDecode(token);
}

function isExpired(): boolean {
  const token = get();
  if (!token) return true;

  const { exp } = _decode(token);
  return Date.now() > exp * 1000;
}

export const jwt = {
  set,
  get,
  isExpired,
  forget,
};

Object.assign(window, { jwt });
