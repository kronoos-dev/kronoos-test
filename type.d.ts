import { ApolloQueryResult, FetchResult } from "@apollo/client";
import { AxiosResponse } from "axios";
import { RootState } from ".";

declare global {
  type DispatchType = <TData = any>(
    options: any
  ) => Promise<ApolloQueryResult<TData>> &
    Promise<AxiosResponse<TData>> &
    Promise<FetchResult<TData, Record<string, any>, Record<string, any>>> &
    void;

  type GetStateType = () => RootState;

  type PaginatedResponse<T> = {
    meta: PaginationMeta;
    data: T;
  };

  interface PaginationMeta {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: number;
    next?: number;
  }

  type FlattenObject<T> = T extends Array<any>
    ? number | `${number}.${FlattenObject<T[number]>}`
    : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${FlattenObject<T[K]>}`;
      }[keyof T]
    : "";

  type RemoveTrailingDot<T extends string> = T extends `${infer L}.${infer R}`
    ? R extends ""
      ? L
      : `${L}.${RemoveTrailingDot<R>}`
    : T;

  type FlattenKeys<T> = RemoveTrailingDot<FlattenObject<T>>;

  type DeepType<
    T,
    Key extends string
  > = Key extends `${infer First}.${infer Rest}`
    ? DeepType<T[First], Rest>
    : T[Key];
}
