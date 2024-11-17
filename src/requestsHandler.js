import axios from "axios";
import { ENDPOINTS, BACKEND_DOMAIN } from "./constants";

const RequestsHandler = {
    getAll: async () => {
        return axios.get(BACKEND_DOMAIN + ENDPOINTS.get("getAll"));
    },

    add: async (listId, item) => {
        return axios.post(BACKEND_DOMAIN + ENDPOINTS.get("add"), { item });
    },

    update: async (item) => {
        return axios.put(BACKEND_DOMAIN + ENDPOINTS.get("update"), { item });
    },

    delete: async (itemId) => {
        return axios.delete(BACKEND_DOMAIN + ENDPOINTS.get("delete") + "/" + itemId);
    },

    setPriority: async (listId, itemId, newIndex) => {
        return axios.patch(BACKEND_DOMAIN + ENDPOINTS.get("setPriority") + "/" + listId, { itemId, newIndex });
    },

    setList: async (listId, itemId, newIndex) => {
        return axios.patch(BACKEND_DOMAIN + ENDPOINTS.get("setList") + "/" + listId, { itemId, newIndex });
    }
};

export default RequestsHandler;
