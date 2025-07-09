//This file is very very important

import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "subcription price is required"],
      min: 0,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"], //avaiable currency
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["sports", "news", "entertainment", "others"],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > this.startDate;
        },
        message: "Renewal date must be after the start datet",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, //indexes each user
    },
  },
  { timestamps: true }
);

// Auto-calculate the renewal date
subSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if(this.renewalDate < new Date()){
    this.status = 'expired';
  }
  next();
});

const Subscription = mongoose.model("Subscription", subSchema);
export default Subscription;
