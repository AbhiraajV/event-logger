import axios from "axios";
import {
  lsCreateAnEvent,
  lsGetUser,
  lsRemoveAnEvent,
} from "./localStorageManager";

export const create = async (setData) => {
  await axios
    .post("http://localhost:8080/event", {
      creator: lsGetUser(),
      callback: "some callback function",
    })
    .then((data) => {
      setData(data);
      lsCreateAnEvent();
    })
    .catch((error) => setData(error));
};
export const trigger = async (setData) => {
  await axios
    .post("http://localhost:8080/event/trigger", {
      creator: lsGetUser(),
    })
    .then((data) => {
      setData(data);
    })
    .catch((error) => setData(error));
};

export const remove = async (setData) => {
  await axios
    .delete("http://localhost:8080/event", {
      data: {
        creator: lsGetUser(),
      },
    })
    .then((data) => {
      setData(data);
      lsRemoveAnEvent();
    })
    .catch((error) => setData(error));
};
