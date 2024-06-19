import axiosClient from "./axiosClient";

export const HandleRoomAPI = async (url, data, method) => {
  return await axiosClient(`/room${url}`, {
    method: method ?? 'get',
    data
  })
}