import axios from "axios";
import { Contact } from "../types/types";
const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const fetchContacts = async () => {
  try {
    const response = await API.get("contacts/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createContact = async (contact: Contact) => {
  try {
    await API.post("contacts/", contact);
  } catch (error: any) {
    alert(error.message);
  }
};
export const updateContact = async (id: number, contact: Contact) => {
  try {
    await API.put(`contacts/${id}/`, contact);
  } catch (error: any) {
    alert(error.message);
  }
};
export const deleteContact = async (id: number) => {
  try {
    await API.delete(`contacts/${id}/`);
  } catch (error: any) {
    alert(error.message);
  }
};
