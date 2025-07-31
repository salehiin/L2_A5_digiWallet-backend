import { model, Schema } from "mongoose";
import { ICommission } from "./commission.interface";

const commissionSchema = new Schema<ICommission>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: { type: String },
  description: { type: String },
  rate: { type: Number, required: true },
  rateType: { type: String, enum: ["percentage", "fixed"], required: true },
  applicableTo: {
    type: String,
    enum: ["user", "merchant", "agent", "admin"],
    required: true,
  },
  transactionType: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true
});

commissionSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    const baseSlug = this.name.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-commission`;

    let counter = 0;
    while (await Commission.exists({ slug })) {
      slug = `${baseSlug}-commission-${++counter}`; // e.g., send-money-commission-1
    }

    this.slug = slug;
  }

  next();
});

commissionSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as Partial<ICommission>;

  if (update.name) {
    const baseSlug = update.name.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}-commission`;

    let counter = 0;
    while (await Commission.exists({ slug })) {
      slug = `${baseSlug}-commission-${++counter}`;
    }

    update.slug = slug;
    this.setUpdate(update);
  }

  next();
});

export const Commission = model<ICommission>("Commission", commissionSchema);
