import AuthApi from '@/modules/Auth/lib/api'
import { BuyerSchema  as BuyerDto, LoginCredentials, Role, SellerSchema as SellerDto } from '@/modules/Auth/models/types';

async function login(credentials: LoginCredentials) {
   if(credentials.role === 'buyer') {

     return await AuthApi.loginAsBuyer(credentials);
   }

   return await AuthApi.loginAsSeller(credentials);

  }
  async function registerBuyer(payload:BuyerDto) {
    
    return await AuthApi.registerBuyer(payload);
 
   }
   async function registerSeller(payload:SellerDto) {
    
   
    return await AuthApi.registerSeller(payload)
 
   }  
async function logout() {
    await AuthApi.logout();
  }

export default {login,logout,registerSeller,registerBuyer}