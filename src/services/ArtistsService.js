import http from "../http-common";

const getAll = (page, perPage) => {
  return http.get(`/ApiArtists?page=${page}&per_page=${perPage}`);
};

const get = id => {
  return http.get(`/ApiArtists/${id}`);
};

const create = data => {
  return http.post("/ApiArtists", data);
};

const update = (id, data) => {
  return http.put(`/ApiArtists/${id}`, data);
};

const remove = id => {
  return http.delete(`/ApiArtists/${id}`);
};

const removeAll = () => {
  return http.delete(`/ApiArtists`);
};

const findBy = (artist, album) => {
  return http.get(`/ApiArtists?Artist=${artist}&Album=${album}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findBy
};
