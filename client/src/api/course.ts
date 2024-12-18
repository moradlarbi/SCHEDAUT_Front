import axios from "./axios";

export const addOperation = (newData : any) => {
  return axios.post("/course", newData);
};
export const editOperation = (newData: any, id: number) => {
  return axios.put(`/course/${id}`, newData);
};
export const editStatus = (newData: any, id: number) => {
  return axios.put(`/course/active/${id}`, newData);
};
export const deleteOperation = (id: number) => {
  return axios.delete(
    `/course/${id}`
  );
};