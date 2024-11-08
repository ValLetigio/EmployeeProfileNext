/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import Server from "./Server.ts";
import { UserObject, Employee, DataToUpdate, UserDataSchema, Offense, Memo } from "../Schema";
class ServerRequests extends Server {
  constructor( ) {
    super( );
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
      const res = await fetch(`${this.url}/createEmployee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee: employee, userData: userObject }),
      });

      if (!res.ok) throw new Error('Failed to fetch data');

      return await res.json();

    } catch (error:unknown) {
      return (error as Error).message;
    }  
  }

  async updateEmployee(employee: Employee, dataToUpdate: DataToUpdate, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/updateEmployee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeData: employee, dataToUpdate, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }  
  }

  async deleteEmployee(employee: Employee, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/deleteEmployee`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeData: employee, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }  
    // try {
    //   const data = {
    //     employeeData: employee,
    //     userData: userObject,
    //   };
    //   const jsonData = JSON.stringify(data);
    //   const res: AxiosResponse = await axios.post(`${this.url}/deleteEmployee`, jsonData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return res.data;
    // } catch (error: any) {
    //   if (error.response && error.response.data) {
    //     throw new Error(error.response.data);
    //   } else {
    //     throw new Error(error.message || "An error occurred during login.");
    //   }
    // }
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
      const res = await fetch(`${this.url}/createOffense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offense: offense, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    } 
  }

  async updateOffense (offense: Offense, dataToUpdate: DataToUpdate, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/updateOffense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offenseData: offense, dataToUpdate, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }  
  }

  async deleteOffense (offense: Offense, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/deleteOffense`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offenseData: offense, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }  
  }

  async createMemo (memo: Memo, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/createMemo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memo: memo, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }   
  }

  async submitMemo (memo: Memo, reason: string, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/submitMemo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memoData: memo, reason, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) {console.log(res) ; throw new Error('Failed to fetch data')};
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }   
    // try {
    //   const data = {
    //     memoData: memo,
    //     reason,
    //     userData: userObject,
    //   };
    //   const jsonData = JSON.stringify(data);
    //   const res: AxiosResponse = await axios.post(`${this.url}/submitMemo`, jsonData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return res.data;
    // } catch (error: any) {
    //   if (error.response && error.response.data) {
    //     throw new Error(error.response.data);
    //   } else {
    //     throw new Error(error.message || "An error occurred during login.");
    //   }
    // }
  }

  async deleteMemo (memo: Memo, userObject: UserDataSchema): Promise<any> {
    try {
      const res = await fetch(`${this.url}/deleteMemo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memoData: memo, userData: userObject }),
        cache: 'no-store',
      });
      if (!res.ok) {console.log(res) ; throw new Error('Failed to fetch data')};
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }   
    // try {
    //   const data = {
    //     memoData: memo,
    //     userData: userObject,
    //   };
    //   const jsonData = JSON.stringify(data);
    //   const res: AxiosResponse = await axios.post(`${this.url}/deleteMemo`, jsonData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   return res.data;
    // } catch (error: any) {
    //   if (error.response && error.response.data) {
    //     throw new Error(error.response.data);
    //   } else {
    //     throw new Error(error.message || "An error occurred during login.");
    //   }
    // }
  }

  // async getAllMemoThatsNotSubmitted (userData: UserDataSchema): Promise<any> {
  //   try {
  //     const data = {
  //       userData: userData,
  //     };
  //     const jsonData = JSON.stringify(data);
  //     const res: AxiosResponse = await axios.post(`${this.url}/getAllMemoThatsNotSubmitted`, jsonData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     return res.data;
  //   } catch (error: any) {
  //     if (error.response && error.response.data) {
  //       throw new Error(error.response.data);
  //     } else {
  //       throw new Error(error.message || "An error occurred during login.");
  //     }
  //   }
  // }

  async getAllMemoThatsNotSubmitted(): Promise<any> {
    try {
      const res = await fetch(`${this.url}/readAllDataInCollection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: "Memo" }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    } 
    // try {
    //   const data = {
    //     collection: "Memo",
    //   };
    //   const jsonData = JSON.stringify(data);
    //   const res = await axios.post(
    //     `${this.url}/readAllDataInCollection`,
    //     jsonData,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   return res.data;
    // } catch (error: any) {
    //   return error.response?.data || error.message;
    // }
  } 

  async fetchEmployeeList(): Promise<any> { 
    try {
      const res = await fetch(`${this.url}/readAllDataInCollection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: "Employee" }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    }
  }  

  async fetchOffenseList(): Promise<any> {
    try {
      const res = await fetch(`${this.url}/readAllDataInCollection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: "Offense" }),
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch data');
      return await res.json();
    } catch (error:unknown) {
      return (error as Error).message;
    } 
  } 
}

export default ServerRequests;
