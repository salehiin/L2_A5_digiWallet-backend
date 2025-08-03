// export interface ITransaction {
//   _id?: string;
//   walletId: string;
//   amount: number;
//   type: "credit" | "debit";
//   description?: string;
//   status: "pending" | "completed" | "failed";
//   createdAt?: Date;
//   updatedAt?: Date;
// }


// export interface ITransaction {
//   senderId: string;
//   receiverId: string;
//   amount: number;
//   commissionAmount: number;
//   timestamp: Date;
// }


// export interface ITransaction {
//   _id?: string;
//   walletId: string;
//   wFrom: string;  // add this
//   to: string;    // add this
//   amount: number;
//   type: "credit" | "debit";
//   description?: string;
//   status: "pending" | "completed" | "failed";
//   createdBy?: string; // if needed
//   createdAt?: Date;
//   updatedAt?: Date;
// }

export interface ITransaction {
  _id?: string;
  walletId: string;
  amount: number;
  type: "deposit" | "withdraw" | "send";
  description?: string;
  status: "pending" | "completed" | "failed" ;
  createdAt?: Date;
  updatedAt?: Date;

  // Add these if you're using them in the logic
  from?: string;
  to?: string;
  createdBy?: string;
}

