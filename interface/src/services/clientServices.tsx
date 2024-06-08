import axios from 'axios';
import { ClientRequestForm } from '../types/clientQuery';
import { SignupValidation, SigninValidation } from '@/types/registerValidations';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL,
  headers: {
    Accept: "application/json"
  }
});

export const signupHandler = async (signupPayload: SignupValidation): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        withCredentials: "true",
      }
    }
    const { data } = await axiosInstance.post('/api/auth/signup', signupPayload, config);
    if (data.success) {
      return Promise.resolve(data);
    }
  } catch (error: any) {
    console.log("error : ", error.response.data)
    return Promise.reject(error.response.data);
  }
}
export const signinHandler = async (loginPayload: SigninValidation): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axiosInstance.post('/api/auth/login', loginPayload, config);
    if (data.success) {
      return Promise.resolve(data);
    }
  } catch (error: any) {
    console.log("error : ", error.response.data)
    return Promise.reject(error.response.data);
  }
}
export const activationHandler = async (activationToken: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/api/auth/activation/${activationToken}`);
    if (data.success) {
      return Promise.resolve(data);
    }
    console.log("data : ", data)
  } catch (error: any) {
    console.log("error : ", error.response.data)
    return Promise.reject(error.response.data);
  }
}

export const clientQueryHandler = async (clientQuery: ClientRequestForm): Promise<any> => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axiosInstance.post('/api/client/postProjectConflicts', clientQuery, config);
    if (data.success) {
      return Promise.resolve(data);
    }
  } catch (error: any) {
    return Promise.reject(error.response.data);

  }
}


