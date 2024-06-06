import axios from 'axios';
import {ClientRequestForm} from '../types/clientQuery';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_URL,
    headers: {
      Accept: "application/json"
    }
  });



export const clientQueryHandler = async(clientQuery :ClientRequestForm) =>{
 try {
  const config = {
    headers : {
      'Content-Type': 'application/json'
    }
  }
   const {data} = await axiosInstance.post('/api/client/postProjectConflicts', clientQuery, config);
  if(data.success){
    return Promise.resolve(data);
  }
 } catch (error  : any) {
  return Promise.reject(error.response.data);
  
 }
}

