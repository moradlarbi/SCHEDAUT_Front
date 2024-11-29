import axios from "./axios";

export const addOperation = (newData : any) => {
  return axios.post("/salle", newData);
};
export const editOperation = (newData: any, id: number) => {
  return axios.put(`/salle/${id}`, newData);
};
export const editStatus = (newData: any, id: number) => {
  return axios.put(`/salle/active/${id}`, newData);
};
export const deleteOperation = (id: number) => {
  return axios.delete(
    `/salle/${id}`
  );
};