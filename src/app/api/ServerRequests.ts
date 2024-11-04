/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import Server from "./Server.ts";
import { UserObject, Employee, DataToUpdate, UserDataSchema, Offense, Memo } from "../Schema";
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

  async deleteAllDataInCollection(collection: string): Promise<any> {
    try {
      const res: AxiosResponse = await axios.post(`${this.url}/deleteAllDataInCollection`, {
        collection,
      });
      return res.data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }

  async firebaseLogin(userObject: UserObject): Promise<any> {
    console.log("userObject", userObject);
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

  async createEmployee(employee: Employee, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        employee: employee,
        userData: userObject,
      };

      console.log(data)
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

  async updateEmployee(employee: Employee, dataToUpdate: DataToUpdate, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        employeeData: employee,
        dataToUpdate,
        userData: userObject,
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

  async getUserForTesting(): Promise<any> {
    try {
      const res: AxiosResponse = await axios.get(`${this.url}/getUserForTesting`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  }
  async createOffense (offense: Offense, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        offense: offense,
        userData: userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/createOffense`, jsonData, {
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
  async updateOffense (offense: Offense, dataToUpdate: DataToUpdate, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        offenseData: offense,
        dataToUpdate,
        userData: userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/updateOffense`, jsonData, {
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
  async deleteOffense (offense: Offense, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        offenseData: offense,
        userData: userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/deleteOffense`, jsonData, {
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
  async createMemo (memo: Memo, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        memo: memo,
        userData: userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/createMemo`, jsonData, {
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

  async submitMemo (memo: Memo, reason: string, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        memoData: memo,
        reason,
        userData: userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/submitMemo`, jsonData, {
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

  async deleteMemo (memo: Memo, userObject: UserDataSchema): Promise<any> {
    try {
      const data = {
        memoData: memo,
        userData: userObject,
      };
      const jsonData = JSON.stringify(data);
      const res: AxiosResponse = await axios.post(`${this.url}/deleteMemo`, jsonData, {
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

  async fetchEmployeeList(collection: string): Promise<any> {
    try {
      const data = {
        collection,
      };
      const jsonData = JSON.stringify(data);
      const res = await axios.post(
        `${this.url}/readAllDataInCollection`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error: any) {
      return error.response?.data || error.message;
    }
  } 
}

export default ServerRequests;
