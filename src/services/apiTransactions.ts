import { getData } from "../utils/helpers";

export async function getTransactions() {
  return getData("transactions");
}
