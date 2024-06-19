import axiosClient from "./axiosClient";

export const HandleAuthentication = async (url, data, method) => {
  return await axiosClient(`/auth${url}`, {
    method: method ?? 'get',
    data
  })
}