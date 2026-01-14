import API from "./axiosInstance";

export const uploadDocuments = (formData) =>
  API.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const getDocuments = (page = 1) =>
  API.get(`/documents/list?page=${page}`);

export const deleteDocument = (id) =>
  API.delete(`/documents/${id}`);

export const getDocumentStatus = (documentId) =>
  API.get(`/documents/status/${documentId}`);

export const getDocumentArtifact = (documentId, fileType) =>
  API.get(`/documents/${documentId}/artifact/${fileType}`);