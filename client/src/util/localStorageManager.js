import reload from "./useReload";
import { eventStatusKey, usernameKey } from "./vars";

export const lsCreateAnEvent = () => {
  localStorage.setItem(eventStatusKey, true);
  reload();
};
export const lsRemoveAnEvent = () => {
  localStorage.removeItem(eventStatusKey);
  reload();
};

export const lsDoesEventExist = () => localStorage.getItem(eventStatusKey);

export const lsGenUser = () => {
  localStorage.setItem(usernameKey, "username-spenza-" + Date.now());
  reload();
};

export const lsGetUser = () => localStorage.getItem(usernameKey);
