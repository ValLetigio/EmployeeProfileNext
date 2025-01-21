/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Id = string | null;
export type Name = string;
export type Address = string | null;
export type Phonenumber = string | null;
export type Photoofperson = string | null;
export type Resumephotoslist = string[] | null;
export type Biodataphotoslist = string[] | null;
export type Email = string | null;
export type Datejoined = string | null;
export type Company = string | null;
export type Isregular = boolean | null;
export type Isproductionemployee = boolean | null;
export type IsOJT = boolean | null;
export type Dailywage = number | null;
export type Version = number;

export interface Employee {
  _id?: Id;
  name: Name;
  address: Address;
  phoneNumber: Phonenumber;
  photoOfPerson: Photoofperson;
  resumePhotosList: Resumephotoslist;
  biodataPhotosList: Biodataphotoslist;
  email: Email;
  dateJoined: Datejoined;
  company: Company;
  isRegular: Isregular;
  isProductionEmployee: Isproductionemployee;
  isOJT: IsOJT;
  dailyWage: Dailywage;
  _version: Version;
}
