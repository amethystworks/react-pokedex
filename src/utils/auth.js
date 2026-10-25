// Login info lives in localStorage so it survives a page refresh.
export function saveLogin(token, username) {
  localStorage.setItem("access", token);
  localStorage.setItem("username", username);
}

export function getToken() {
  return localStorage.getItem("access");
}

export function getUsername() {
  return localStorage.getItem("username");
}

export function clearLogin() {
  localStorage.removeItem("access");
  localStorage.removeItem("username");
}
