export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  signinUser: Maybe<SigninUserPayload>;
  signupUser: Maybe<SignupUserPayload>;
  upsertPassport: Maybe<UpsertPassportPayload>;
};

export type MutationSigninUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationSignupUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpsertPassportArgs = {
  code: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  number: Scalars['String'];
};

export type Passport = {
  __typename?: 'Passport';
  code: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  number: Scalars['String'];
  userId: Scalars['ID'];
  verified: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  /** An example field added by the generator */
  testField: Scalars['String'];
};

/** Autogenerated return type of SigninUser */
export type SigninUserPayload = {
  __typename?: 'SigninUserPayload';
  errors: Maybe<Scalars['JSON']>;
  token: Maybe<Scalars['String']>;
  user: Maybe<User>;
};

/** Autogenerated return type of SignupUser */
export type SignupUserPayload = {
  __typename?: 'SignupUserPayload';
  errors: Maybe<Scalars['JSON']>;
  token: Maybe<Scalars['String']>;
  user: Maybe<User>;
};

export enum Status {
  Failure = 'failure',
  Success = 'success',
}

/** Autogenerated return type of UpsertPassport */
export type UpsertPassportPayload = {
  __typename?: 'UpsertPassportPayload';
  errors: Maybe<Scalars['JSON']>;
  passport: Maybe<Passport>;
  status: Maybe<Status>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  passport: Maybe<Passport>;
};

export type SigninUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SigninUserMutation = {
  __typename?: 'Mutation';
  signinUser: {
    __typename?: 'SigninUserPayload';
    token: string | null;
    errors: any | null;
    user: { __typename?: 'User'; id: string; email: string } | null;
  } | null;
};

export type SignupUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignupUserMutation = {
  __typename?: 'Mutation';
  signupUser: {
    __typename?: 'SignupUserPayload';
    token: string | null;
    errors: any | null;
    user: { __typename?: 'User'; id: string; email: string } | null;
  } | null;
};