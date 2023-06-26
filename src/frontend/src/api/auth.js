import axiosClient from "./axiosClient";

const authentication = {
  initial: params => axiosClient.post('/', params),
}

export default authentication;