import API from "./axiosInstance";

export const createChat = (payload) => API.post(`/chats`, payload);
export const getChats = () => API.get(`/chats`);
export const getChatMessages = (chatId, params) => API.get(`/chats/${chatId}/messages`, { params });

// sendMessage: expects backend to either stream or return final message
export const sendMessage = (chatId, payload) => API.post(`/chats/${chatId || ''}/messages`, payload);

export const listTemplates = () => API.get(`/templates`);
export const createTemplate = (payload) => API.post(`/templates`, payload);
export const deleteTemplate = (id) => API.delete(`/templates/${id}`);
