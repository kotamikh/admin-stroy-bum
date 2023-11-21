import { HTTPMethod } from "h3";
import { SearchParameters } from "ofetch";

export type ResponseWithError<T> = {
    data: null
    error: string,
} | {
    data: any | null,
    error: null,
}

export type RequestParameters = {
    url: string,
    method: HTTPMethod,
    params?: SearchParameters,
    body?: any,
}

const useCustomFetch = async <T>(requestParams: RequestParameters): Promise<ResponseWithError<T>> => {
  let response = await fetch(requestParams.url, {
        method: requestParams.method,
        body: requestParams.body,
    })

    if (!response.ok) {
        const errorName = response.status || "undefined name"
        const errorMessage = response.statusText || "undefined message"
        return {
          data: null,
          error: `[${errorName}]${errorMessage}`
        }
    } else if (requestParams.method === "GET") {
        return {
          data: await response.json(),
          error: null
        }
    } else if (requestParams.method === "POST" || "PUT" || "DELETE") {
      return {
          data: requestParams.method,
          error: null
      }
    }

    else return {
      data: null,
      error: `Falsy error and data when executing ${requestParams.method} request to '${requestParams.url}'`
    }
}

export const useHttpGet = async <T>(requestParams: Omit<RequestParameters, "method">): Promise<ResponseWithError<T>> => {
    return useCustomFetch<T>({
        method: "GET",
        ...requestParams
    })
}

export const useHttpPost = async <T>(requestParams: Omit<RequestParameters, "method">): Promise<ResponseWithError<T>> => {
    return useCustomFetch<T>({
        method: "POST",
        ...requestParams
    })
}

export const useHttpPut = async <T>(requestParams: Omit<RequestParameters, "method">): Promise<ResponseWithError<T>> => {
    return useCustomFetch<T>({
        method: "PUT",
        ...requestParams
    })
}

export const useHttpDelete = async <T>(requestParams: Omit<RequestParameters, "method">): Promise<ResponseWithError<T>> => {
    return useCustomFetch<T>({
        method: "DELETE",
        ...requestParams
    })
}
