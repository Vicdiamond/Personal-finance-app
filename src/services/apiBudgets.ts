import { BudgetTypes } from "../types/types";
import { FETCH_URL } from "../utils/constants";

export async function createBudget(newData: BudgetTypes) {
  try {
    const res = await fetch(`${FETCH_URL}/budgets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not create budget");
    }
  }
}

export async function editBudget(newData: BudgetTypes) {
  try {
    const res = await fetch(`${FETCH_URL}/budgets/${newData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not edit budget");
    }
  }
}

export async function deleteBudget(id: string) {
  try {
    const res = await fetch(`${FETCH_URL}/budgets/${id}`, {
      method: "DELETE",
    });
    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not delete budget");
    }
  }
}
