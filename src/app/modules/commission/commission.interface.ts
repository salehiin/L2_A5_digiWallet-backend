

export interface ICommission {
  name: string;             // e.g., "Add Money Commission", "Cash Out Commission"
  slug: string;             // e.g., "add-money", "cash-out"
  thumbnail?: string;       // Optional image URL or icon reference
  description?: string;     // Optional description of the commission

  rate: number;             // Commission rate (e.g., 1.5 for 1.5%)
  rateType: "percentage" | "fixed"; // Type of rate: percentage of amount or fixed value
  applicableTo: "user" | "merchant" | "agent" | "admin"; // Who pays the commission
  transactionType: string;  // e.g., "send-money", "cash-in", "cash-out", etc.
  isActive?: boolean;       // Optional flag to enable/disable commission
}
