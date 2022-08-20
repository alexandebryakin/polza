const LOCALSTORAGE_TOKEN_KEY = '__token';

function set(token: string) {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
}

function get() {
  localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
}

export const jwt = {
  set,
  get,
};
