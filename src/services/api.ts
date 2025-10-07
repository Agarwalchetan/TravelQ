const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  async signup(userData: { name: string; email: string; password: string }) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async login(credentials: { email: string; password: string }) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (data.token) {
      this.setToken(data.token);
    }

    return data;
  }

  async logout() {
    await this.request('/auth/logout', {
      method: 'POST',
    });
    this.removeToken();
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData: any) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getTrips(query?: { status?: string; isPublic?: boolean }) {
    const params = new URLSearchParams();
    if (query?.status) params.append('status', query.status);
    if (query?.isPublic !== undefined) params.append('isPublic', String(query.isPublic));

    const queryString = params.toString();
    return this.request(`/trips${queryString ? `?${queryString}` : ''}`);
  }

  async getTripById(id: string) {
    return this.request(`/trips/${id}`);
  }

  async createTrip(tripData: any) {
    return this.request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData),
    });
  }

  async updateTrip(id: string, tripData: any) {
    return this.request(`/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tripData),
    });
  }

  async deleteTrip(id: string) {
    return this.request(`/trips/${id}`, {
      method: 'DELETE',
    });
  }

  async getPublicTrips(query?: { destination?: string; tags?: string }) {
    const params = new URLSearchParams();
    if (query?.destination) params.append('destination', query.destination);
    if (query?.tags) params.append('tags', query.tags);

    const queryString = params.toString();
    return this.request(`/trips/public${queryString ? `?${queryString}` : ''}`);
  }

  async getItineraries(tripId?: string) {
    const params = tripId ? `?trip=${tripId}` : '';
    return this.request(`/itineraries${params}`);
  }

  async getItineraryById(id: string) {
    return this.request(`/itineraries/${id}`);
  }

  async createItinerary(itineraryData: any) {
    return this.request('/itineraries', {
      method: 'POST',
      body: JSON.stringify(itineraryData),
    });
  }

  async updateItinerary(id: string, itineraryData: any) {
    return this.request(`/itineraries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itineraryData),
    });
  }

  async deleteItinerary(id: string) {
    return this.request(`/itineraries/${id}`, {
      method: 'DELETE',
    });
  }

  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id: string) {
    return this.request(`/users/${id}`);
  }
}

export const apiService = new ApiService();
