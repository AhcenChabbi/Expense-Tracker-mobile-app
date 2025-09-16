import { HttpStatusCode } from "../constants/http";
import assert from "node:assert";
type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string
) => asserts condition;

const appAssert: AppAssert = (condition, httpStatusCode, message) => {
  return assert(condition);
};
export default appAssert;
