import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor() {
    // Initialize axios with default headers
    this.axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      }
    });

    // Add request interceptor to ensure token is set for every request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle auth errors
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
      const token = localStorage.getItem('authToken');
      return token;
    }
    return null;
  }

  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      // Update axios default headers
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
    const isLoggedIn = !!this.getToken();
    return isLoggedIn;
  }

  async apiCall(method, url, data) {
    console.log(`API Call: ${method} ${url}`, data);
    try {
      const response = await this.axiosInstance({
        method,
        url,
        data,
      });
      return response;
    } catch (error) {
      console.error('API call error:', error.response || error); // Debug log
      if (error.response && error.response.status === 401) {
        this.removeToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/unauthorized';
        }
      }
      throw error;
    }
  }

  async getEvents() {
    try {
      const response = await this.apiCall("get", url + "events");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async addEvent(name, location, details, datetime) {
    try {
      return this.apiCall("post", url + "events", { 
        name,
        location,
        details,
        datetime
      });
    } catch (error) {
      console.error('addEvent error:', error.response || error); // Debug log
      throw error;
    }
  }

  async removeEvent(id) {
    return this.apiCall("delete", `${url}events/${id}`);
  }

  async updateEvent(id, name, location, details, datetime) {
    return this.apiCall("put", `${url}events/${id}`, { name, location, details, datetime });
  }

  async login(email, password) {
    console.log("test")
    try {
      const response = await this.apiCall("post", url + "auth/login", { email, password });
      
      if (response.data && response.data.token) {
        this.setToken(response.data.token);
        return response;
      } else {
        throw new Error('No token received from server');
      }
    } catch (error) {
      throw error;
    }
  }

  logout() {
    this.removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/user';
    }
  }
}