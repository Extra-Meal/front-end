/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIError {
  status: "failed";
  code: number | undefined;
  data: any;
}
export interface APISuccess<R> {
  status: "success";
  code: number;
  data: R;
}
