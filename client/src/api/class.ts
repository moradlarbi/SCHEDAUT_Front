import axios from "./axios";

export const addOperation = (newData : any) => {
  return axios.post("/class", newData);
};
export const editOperation = (newData: any, id: number) => {
  return axios.put(`/class/${id}`, newData);
};
export const editStatus = (newData: any, id: number) => {
  return axios.put(`/class/active/${id}`, newData);
};
export const deleteOperation = (id: number) => {
  return axios.put(
    `/class/${id}`,
    { data: { active: false } }
  );
};