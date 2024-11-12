import AuthRepository from "@/modules/Auth/respository/auth-repository";
import {
  User,
  LoginCredentials,
  LoginResponse,
  Role,
  RegisterResponse,
  BuyerSchema,
  SellerSchema,
} from "@/modules/Auth/models/types";
import { apiClient } from "@/lib/client";
class AuthApiAdapter implements AuthRepository {
  async  registerBuyer(payload:BuyerSchema): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
        "/auth/register/buyer",
        payload
      );
      return response.data;
  }
  async registerSeller(data:SellerSchema): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
        "/auth/register/seller",
        data
      );
      return response.data;
  }
  async loginAsBuyer(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  }

  async loginAsSeller(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  }
  async getUser(token:string, role:Role): Promise<User> {
    const response = await apiClient.post(
        `/user/${role}`,
      );
      return response.data;  
  }
  async getCurrentUser(token:string, role:Role): Promise<User> {
    const response = await this.getUser(token,role)
    return response;  
  }
  async logout(): Promise<void> {
    const response = await apiClient.post('/logout')
    return;  
  }
}
export default new AuthApiAdapter();