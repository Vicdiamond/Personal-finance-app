import { BalanceTypes, PotTypes } from "../types/types";
import { FETCH_URL } from "../utils/constants";

export async function editPots(newData: PotTypes) {
  try {
    const res = await fetch(`${FETCH_URL}/pots/${newData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not edit pot");
    }
  }
}

export async function createPot(newData: PotTypes) {
  try {
    const res = await fetch(`${FETCH_URL}/pots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not create pot");
    }
  }
}

export async function deletePot(id: string) {
  try {
    const res = await fetch(`${FETCH_URL}/pots/${id}`, {
      method: "DELETE",
    });
    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not delete pot");
    }
  }
}

export async function editPotBalance(
  id: string,
  amount: number,
  isAdding: boolean,
  balance: BalanceTypes,
  pot: PotTypes
) {
  try {
    // console.log(id, amount, isAdding, balance);
    let newBalance;
    let newPot;
    if (isAdding) {
      newBalance = { ...balance, current: balance.current - amount };
      newPot = { ...pot, total: pot.total + amount };
    }

    if (!isAdding) {
      newBalance = { ...balance, current: balance.current + amount };
      newPot = { ...pot, total: pot.total - amount };
    }

    // console.log(newBalance);
    // console.log(newPot);
    const res = await fetch(`${FETCH_URL}/pots/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPot),
    });
    await res.json();

    const balanceRes = await fetch(`${FETCH_URL}/balance`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBalance),
    });
    await balanceRes.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not add to pot");
    }
  }
}

export async function editCurrentBalance(amount: number) {
  try {
    const balanceRes = await fetch(`${FETCH_URL}/balance`);

    const balance = await balanceRes.json();
    const newBalance = { ...balance, current: amount };

    const res = await fetch(`${FETCH_URL}/balance`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBalance),
    });

    await res.json();
  } catch (error) {
    if (error) {
      throw new Error("Could not edit current balance");
    }
  }
}
