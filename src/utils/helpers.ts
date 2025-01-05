import { colors } from "../data/data";
import { TransactionTypes } from "../types/types";
import { FETCH_URL } from "./constants";

export function formatDateTime(dateString: string): {
  formattedDate: string;
  formattedTime: string;
} {
  const date = new Date(dateString);

  // Validate if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Define the time formatting options
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
  };

  // Format the date and time
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date
  );

  return { formattedDate, formattedTime };
}

export function formatNumber(number: number) {
  return Number(number).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export async function getData(endpoint: string) {
  const res = await fetch(`${FETCH_URL}/${endpoint}`);
  const data = await res.json();
  return data;
}

export function getColor(theme: string) {
  return colors.filter((color) => {
    if (color.value === theme.toLowerCase()) {
      return color.value;
    }
  })[0].name;
}

export function calculatePagination(pageCount: number, currentPage: number) {
  const paginationButtons: (string | number)[] = [];

  if (pageCount <= 4) {
    // Show all pages if the total number is 4 or fewer
    for (let i = 1; i <= pageCount; i++) paginationButtons.push(i);
  } else if (window.innerWidth <= 640) {
    // Small screen logic
    if (currentPage === 1) {
      // On the first page: 1, 2, ..., lastPage
      paginationButtons.push(1, 2, "...", pageCount);
    } else if (currentPage === 2) {
      // On the second page: 2, 3, ..., lastPage
      paginationButtons.push(2, 3, "...", pageCount);
    } else if (currentPage >= pageCount - 1) {
      // Near the last page: ..., pageCount-2, pageCount-1, lastPage
      paginationButtons.push("...", pageCount - 2, pageCount - 1, pageCount);
    } else {
      // Middle pages: ..., currentPage, currentPage+1, ..., lastPage
      paginationButtons.push("...", currentPage, currentPage + 1, pageCount);
    }
  } else {
    // Default: Show all pages for larger screens
    for (let i = 1; i <= pageCount; i++) paginationButtons.push(i);
  }

  return paginationButtons;
}

export function getSortedArray(array: TransactionTypes[], sortValue: string) {
  if (sortValue === "latest") {
    return array;
  }
  if (sortValue === "oldest") {
    return array.slice().reverse();
  }
  if (sortValue === "highest") {
    return array.slice().sort((a, b) => b.amount - a.amount);
  }
  if (sortValue === "lowest") {
    return array.slice().sort((a, b) => a.amount - b.amount);
  }
  if (sortValue === "a-z") {
    return array.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortValue === "z-a") {
    return array.slice().sort((a, b) => b.name.localeCompare(a.name));
  }

  return array;
}

function capitalize(str: string) {
  if (!str) return ""; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeWords(sentence: string) {
  return sentence
    .split(" ")
    .map((word) => capitalize(word)) // Reuse the capitalize function
    .join(" ");
}

export function generateRandomId(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 4;
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters[randomIndex];
  }

  return randomId;
}
