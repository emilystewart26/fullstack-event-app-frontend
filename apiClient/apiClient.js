import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor() {
    this.axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.removeToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/unauthorized';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      this.axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      delete this.axiosInstance.defaults.headers['Authorization'];
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  async apiCall(method, url, data) {
    console.log(`API Call: ${method} ${url}`, data);
    try {
      const response = await this.axiosInstance({ method, url, data });
      return response;
    } catch (error) {
      console.error('API call error:', error.response || error);
      if (error.response && error.response.status === 401) {
        this.removeToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/unauthorized';
        }
      }
      throw error;
    }
  }

  // Your other methods like getEvents, addEvent, etc.
  async getEvents() {
    const response = await this.apiCall("get", url + "events");
    return response.data;
  }

  async getEventById(id) {
    const response = await this.apiCall("get", url + `events/${id}`);
    return response.data;
  }

  async getEventsByUserId(userId) {
    const response = await this.apiCall("get", url + `events/userid/${userId}`);
    return response.data;
  }

  async getEventByName(name) {
    return this.apiCall("get", url + `events/name/${encodeURIComponent(name)}`);
  }

  async getEventsByLocation(location) {
    return this.apiCall("get", url + `events/location/${encodeURIComponent(location)}`);
  }

  async addEvent(name, location, details, datetime) {
    return this.apiCall("post", url + "events", { name, location, details, datetime });
  }

  async removeEvent(id) {
    return this.apiCall("delete", `${url}events/${id}`);
  }

  async updateEvent(id, name, location, details, datetime) {
    return this.apiCall("put", `${url}events/${id}`, { name, location, details, datetime });
  }

  async login(email, password) {
    console.log("test login");
    const response = await this.apiCall("post", url + "auth/login", { email, password });
    if (response.data?.token) {
      this.setToken(response.data.token);
      return response;
    } else {
      throw new Error('No token received from server');
    }
  }

  async register(email, password) {
    console.log("test register");
    return this.apiCall("post", url + "auth/register", { email, password });
  }

  logout() {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/user';
    }
  }
}

// For dynamic updating of navbar
export const apiClient = new ApiClient();