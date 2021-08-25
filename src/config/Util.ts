import Hashids from "hashids";
import { AppConfig } from "./Config";

export const encodeHashUserId = (userId: number) => {
  const hashids = new Hashids(AppConfig.hashKey, 30);
  const encodedId = hashids.encode(userId);
  return encodedId;
};
export const decodeHashUserId = (hashUserId: string) => {
  const hashids = new Hashids(AppConfig.hashKey, 30);
  const decoded = hashids.decode(hashUserId);
  return decoded[0];
};
