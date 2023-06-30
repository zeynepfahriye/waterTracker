// api.ts

import axios from 'axios';
import { goalResponseData, responseData } from '../types/types';

const baseURL = 'https://645ce732e01ac6105896bbce.mockapi.io/';

export const fetchGoalData = async (): Promise<goalResponseData> => {
   try {
      const response = await axios.get(`${baseURL}/goal/1`);
      if (response.status === 200) {
         return response.data;
      } else {
         throw new Error("An error has occurred");
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
};

export const updateGoalData = async (data: any) => {
   try {
      const response = await axios.put(`${baseURL}/goal/1`, data);
      if(response.status === 200) {
         return response.data
      } else {
         throw new Error("An error has occurred");
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export const fetchIntakeData = async (): Promise<responseData[]> => {
   try {
      const response = await axios.get(`${baseURL}/intake/`);
      if (response.status === 200) {
         return response.data;
      } else {
         throw new Error("An error has occurred");
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export const addIntakeData = async (data: any): Promise<responseData> => {
   try {
      const response = await axios.post(`${baseURL}/intake`, data);
      if (response.status === 201) {
         return response.data;
      } else {
            throw new Error("An error has occurred");
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export const updateIntakeData = async (input: number, id: number): Promise<responseData> => {
   const updatedData = { amount: input };

   console.log('Update started => ', input, id);
   const response = await axios.put(`${baseURL}/intake/${id}`, updatedData);
   try {
      if (response.status === 200) {
         console.log('Update endend => ', response.data);
         return response.data;
      } else {
         throw new Error("An error has occurred");
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export const deleteIntakeData = async (id: number) => {
   console.log('Delete started => ', id);
   const response = await axios.delete(`${baseURL}/intake/${id}`);
   try {
      if(response.status === 200) {
         console.log('Delete endend => ', response.data);
         return response.data;
      }
   } catch (error) {
      console.log(error);
      throw error;
   }
 };