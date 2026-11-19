const API_BASE_URL = 'http://localhost:3000';

async function request(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export const API = {
  resources: {
    async getAll() {
      return await request('/resources', 'GET');
    },

    async create(resourceData) {
      return await request('/resources', 'POST', resourceData);
    },

    async update(id, resourceData) {
      return await request(`/resources/${id}`, 'PUT', resourceData);
    },

    async delete(id) {
      return await request(`/resources/${id}`, 'DELETE');
    },
  },
};

export default API;
