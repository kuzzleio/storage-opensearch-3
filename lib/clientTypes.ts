/*
 * The request and response types the driver's code was written against
 * (opensearch-js 2, the shape of the Elasticsearch 7 client), built on
 * opensearch-js 3's typings.
 *
 * opensearch-js 3 types every request body and response strictly, while the
 * driver builds its requests from Kuzzle's own (`JSONObject`) bodies: each
 * request type keeps the client's parameters with a body of the driver's
 * choosing, and a response's body is what the driver says it reads.
 */

import type {
  API,
  ApiResponse as ClientApiResponse,
  Client,
} from "@opensearch-project/opensearch";
import type { JSONObject } from "kuzzle";

type WithBody<Request, Body> = Omit<Request, "body"> & { body?: Body };
type WithRequiredBody<Request, Body> = Omit<Request, "body"> & { body: Body };

/** A client response whose body has the type the driver reads */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<Body = any> = Omit<ClientApiResponse, "body"> & {
  body: Body;
};

/** A client method as the driver calls it: promise or callback style */
type DriverMethod = {
  (
    params: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (error: any, result: ApiResponse) => void,
  ): void;
  (params?: object, options?: object): Promise<ApiResponse>;
};

/**
 * The client as the driver calls it: every method of the client and of its
 * namespaces (`indices`, `cluster`, `cat`...) takes the driver's requests and
 * answers a body the driver reads as it did with opensearch-js 2.
 */
export type DriverClient = {
  [K in keyof Client]: Client[K] extends (...args: never[]) => unknown
    ? DriverMethod
    : { [M in keyof Client[K]]: DriverMethod };
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace RequestParams {
  type Bulk<Body = JSONObject[]> = WithRequiredBody<API.Bulk_Request, Body>;
  type DeleteByQuery<Body = JSONObject> = WithBody<
    API.DeleteByQuery_Request,
    Body
  >;
  type Exists = API.Exists_Request;
  type Index<Body = JSONObject> = WithRequiredBody<API.Index_Request, Body>;
  type IndicesCreate<Body = JSONObject> = WithBody<
    API.Indices_Create_Request,
    Body
  >;
  type IndicesDelete = API.Indices_Delete_Request;
  type IndicesGetSettings = API.Indices_GetSettings_Request;
  type IndicesPutMapping<Body = JSONObject> = WithRequiredBody<
    API.Indices_PutMapping_Request,
    Body
  >;
  type IndicesRefresh = API.Indices_Refresh_Request;
  type Mget<Body = JSONObject> = WithRequiredBody<API.Mget_Request, Body>;
  type Scroll<Body = JSONObject> = WithBody<API.Scroll_Request, Body>;
  type Search<Body = JSONObject> = WithBody<API.Search_Request, Body>;
  type Update<Body = JSONObject> = WithRequiredBody<API.Update_Request, Body>;
  type UpdateByQuery<Body = JSONObject> = WithBody<
    API.UpdateByQuery_Request,
    Body
  >;
}
