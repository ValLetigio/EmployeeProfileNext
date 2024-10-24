/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import Server from "./Server.ts";
import { UserObject, Employee, DataToUpdate } from "../Schema";
class ServerRequests extends Server {
  constructor(isProduction: boolean) {
    super(isProduction);
  }

  async getIsDevEnvironment(): Promise<boolean | string> {
    try {
      const res: AxiosResponse<{ isDevEnvironment: boolean }> = await axios.get(`${this.url}/getIsDevEnvironment`);
      return res.data.isDevEnvironment;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

  async getEnvironment(): Promise<any> {
    try {
      console.log("this.url", this.url);
      const res: AxiosResponse = await axios.get(`${this.url}/getEnvironment`);
      return res.data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

  async firebaseLogin(userObject: UserObject): Promise<any> {
    try {
      const data = {
        userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/firebaseLogin`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message || "An error occurred during login.");
      }
    }
  }

  async createEmployee(employee: Employee, userObject: UserObject): Promise<any> {
    try {
      const data = {
        employee,
        userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/createEmployee`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message || "An error occurred during login.");
      }
    }
  }

  async updateEmployee(employee: Employee, dataToUpdate: DataToUpdate, userObject: UserObject): Promise<any> {
    try {
      const data = {
        employee,
        dataToUpdate,
        userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/updateEmployee`, jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error(error.message || "An error occurred during login.");
      }
    }
  }
}

export default ServerRequests;
