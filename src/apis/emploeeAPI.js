import axiosClient from "./axiosClient";

export const HandleEmploeeAPI = async (url, data, method) => {
  return await axiosClient(`/emploee${url}`, {
    method: method ?? 'get',
    data
  })
}