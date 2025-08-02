// src/modules/commission/commission.service.ts

import { Commission } from "./commission.model"; // adjust if model path differs

export const CommissionService = {
  // Get all commissions
  getAllCommissions: async () => {
    const result = await Commission.find();
    return result;
  },
};
