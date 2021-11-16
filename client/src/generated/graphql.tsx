import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Interview = {
  __typename?: 'Interview';
  _id: Scalars['String'];
  description: Scalars['String'];
  experience: Scalars['String'];
  id: Scalars['String'];
  owner_id: Scalars['String'];
  position: Scalars['String'];
  title: Scalars['String'];
};

export type InterviewInput = {
  description: Scalars['String'];
  experience: Scalars['String'];
  position: Scalars['String'];
  title: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Logs = {
  __typename?: 'Logs';
  _id: Scalars['String'];
  id: Scalars['String'];
  interview_id: Scalars['String'];
  student_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  IcreateInterview: Interview;
  IdeleteInterview: Scalars['Boolean'];
  IdeleteLog: Scalars['Boolean'];
  SapplyForInterview: Scalars['Boolean'];
  SejectFromInterview: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: UserResponse;
  registration: RegistrationResponse;
};


export type MutationIcreateInterviewArgs = {
  options: InterviewInput;
};


export type MutationIdeleteInterviewArgs = {
  id: Scalars['String'];
};


export type MutationIdeleteLogArgs = {
  id: Scalars['String'];
};


export type MutationSapplyForInterviewArgs = {
  interviewId: Scalars['String'];
};


export type MutationSejectFromInterviewArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegistrationArgs = {
  options: RegistrationInput;
};

export type Query = {
  __typename?: 'Query';
  IInterviewList: Array<Interview>;
  IInterviewerLogsLists: Array<Logs>;
  IgetInterviewerLog: Logs;
  SIInterview: Interview;
  user: Array<User>;
};


export type QueryIgetInterviewerLogArgs = {
  id: Scalars['String'];
};


export type QuerySiInterviewArgs = {
  id: Scalars['String'];
};

export type RegistrationInput = {
  details: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['String'];
  username: Scalars['String'];
};

export type RegistrationResponse = {
  __typename?: 'RegistrationResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<RegistrationUser>;
};

export type RegistrationUser = {
  __typename?: 'RegistrationUser';
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  access_token: Scalars['String'];
  expires_in: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserAuth = {
  __typename?: 'UserAuth';
  email: Scalars['String'];
  name: Scalars['String'];
  token: Token;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<UserAuth>;
};

export type IcreateInterviewMutationVariables = Exact<{
  options: InterviewInput;
}>;


export type IcreateInterviewMutation = { __typename?: 'Mutation', IcreateInterview: { __typename?: 'Interview', title: string, id: string } };

export type IdeleteInterviewMutationVariables = Exact<{
  deleteInterviewId: Scalars['String'];
}>;


export type IdeleteInterviewMutation = { __typename?: 'Mutation', IdeleteInterview: boolean };

export type IdeleteLogMutationVariables = Exact<{
  ideleteLogId: Scalars['String'];
}>;


export type IdeleteLogMutation = { __typename?: 'Mutation', IdeleteLog: boolean };

export type SapplyForInterviewMutationVariables = Exact<{
  sapplyForInterviewId: Scalars['String'];
}>;


export type SapplyForInterviewMutation = { __typename?: 'Mutation', SapplyForInterview: boolean };

export type SejectFromInterviewMutationVariables = Exact<{
  sejectFromInterviewId: Scalars['String'];
}>;


export type SejectFromInterviewMutation = { __typename?: 'Mutation', SejectFromInterview: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'UserAuth', name: string, token: { __typename?: 'Token', access_token: string } } | null | undefined } };

export type RegistrationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  details: Scalars['String'];
  username: Scalars['String'];
  type: Scalars['String'];
}>;


export type RegistrationMutation = { __typename?: 'Mutation', registration: { __typename?: 'RegistrationResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, user?: { __typename?: 'RegistrationUser', email: string, name: string } | null | undefined } };

export type IInterviewerLogsListsQueryVariables = Exact<{ [key: string]: never; }>;


export type IInterviewerLogsListsQuery = { __typename?: 'Query', IInterviewerLogsLists: Array<{ __typename?: 'Logs', id: string, student_id: string }> };


export const IcreateInterviewDocument = gql`
    mutation IcreateInterview($options: InterviewInput!) {
  IcreateInterview(options: $options) {
    title
    id
  }
}
    `;

export function useIcreateInterviewMutation() {
  return Urql.useMutation<IcreateInterviewMutation, IcreateInterviewMutationVariables>(IcreateInterviewDocument);
};
export const IdeleteInterviewDocument = gql`
    mutation IdeleteInterview($deleteInterviewId: String!) {
  IdeleteInterview(id: $deleteInterviewId)
}
    `;

export function useIdeleteInterviewMutation() {
  return Urql.useMutation<IdeleteInterviewMutation, IdeleteInterviewMutationVariables>(IdeleteInterviewDocument);
};
export const IdeleteLogDocument = gql`
    mutation IdeleteLog($ideleteLogId: String!) {
  IdeleteLog(id: $ideleteLogId)
}
    `;

export function useIdeleteLogMutation() {
  return Urql.useMutation<IdeleteLogMutation, IdeleteLogMutationVariables>(IdeleteLogDocument);
};
export const SapplyForInterviewDocument = gql`
    mutation SapplyForInterview($sapplyForInterviewId: String!) {
  SapplyForInterview(interviewId: $sapplyForInterviewId)
}
    `;

export function useSapplyForInterviewMutation() {
  return Urql.useMutation<SapplyForInterviewMutation, SapplyForInterviewMutationVariables>(SapplyForInterviewDocument);
};
export const SejectFromInterviewDocument = gql`
    mutation SejectFromInterview($sejectFromInterviewId: String!) {
  SejectFromInterview(id: $sejectFromInterviewId)
}
    `;

export function useSejectFromInterviewMutation() {
  return Urql.useMutation<SejectFromInterviewMutation, SejectFromInterviewMutationVariables>(SejectFromInterviewDocument);
};
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      name
      token {
        access_token
      }
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegistrationDocument = gql`
    mutation registration($email: String!, $password: String!, $name: String!, $details: String!, $username: String!, $type: String!) {
  registration(
    options: {email: $email, password: $password, name: $name, details: $details, username: $username, type: $type}
  ) {
    errors {
      message
      field
    }
    user {
      email
      name
    }
  }
}
    `;

export function useRegistrationMutation() {
  return Urql.useMutation<RegistrationMutation, RegistrationMutationVariables>(RegistrationDocument);
};
export const IInterviewerLogsListsDocument = gql`
    query IInterviewerLogsLists {
  IInterviewerLogsLists {
    id
    student_id
  }
}
    `;

export function useIInterviewerLogsListsQuery(options: Omit<Urql.UseQueryArgs<IInterviewerLogsListsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IInterviewerLogsListsQuery>({ query: IInterviewerLogsListsDocument, ...options });
};