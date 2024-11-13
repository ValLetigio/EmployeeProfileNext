/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Id = string | null;
export type Createdat = string;
export type Isapproved = boolean;
export type Displayname = string;
export type Email = string;
export type Version = number;
export type Image = string;

export interface User {
  _id?: Id;
  createdAt: Createdat;
  isApproved: Isapproved;
  displayName: Displayname;
  email: Email;
  roles: Roles;
  _version: Version;
  image: Image;
}
export interface Roles {
  [k: string]: unknown;
}
