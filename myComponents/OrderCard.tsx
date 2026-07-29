"use client";

import React from "react";
import {
  FiBox,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiAlertCircle,
} from "react-icons/fi";

// Sync parameters directly with the Mongoose model schema contract definitions
export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  _id?: string;
  customerEmail: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  orderItems: OrderItem[];
  paystackPaymentDetails: {
    totalPrice: number;
    paystackReference: string;
    isPaid: boolean;
    paidAt?: Date;
  };
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: Date;
}

interface OrderCardProps {
  order: OrderData;
}

// Map order lifecycle keys to custom theme color metrics dynamically
const statusStyles = {
  Pending: { bg: "bg-amber-50 text-amber-700 border-amber-200", icon: FiClock },
  Processing: { bg: "bg-blue-50 text-blue-700 border-blue-200", icon: FiBox },
  Shipped: {
    bg: "bg-purple-50 text-purple-700 border-purple-200",
    icon: FiTruck,
  },
  Delivered: {
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: FiCheckCircle,
  },
  Cancelled: {
    bg: "bg-zinc-50 text-zinc-500 border-zinc-200",
    icon: FiAlertCircle,
  },
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const statusMeta = statusStyles[order.status] || statusStyles.Pending;
  const StatusIcon = statusMeta.icon;

  return (
    <div className="bg-white border border-zinc-100 p-6 transition-all duration-300 hover:shadow-xl hover:border-zinc-200 flex flex-col justify-between">
      {/* Top Ledger Ribbon Metadata Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4 mb-4">
        <div>
          <span className="text-[9px] font-mono text-zinc-400 block tracking-widest uppercase">
            Reference Token ID
          </span>
          <span className="text-xs font-bold text-black tracking-tight font-mono uppercase">
            {order.paystackPaymentDetails.paystackReference}
          </span>
        </div>

        {/* Dynamic Context Custom Layout Pills */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] font-bold uppercase tracking-wider rounded-none ${statusMeta.bg}`}
          >
            <StatusIcon className="h-3 w-3" />
            {order.status}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 border text-[10px] font-bold uppercase tracking-wider rounded-none ${
              order.paystackPaymentDetails.isPaid
                ? "bg-red-50 text-red-600 border-red-200/50"
                : "bg-zinc-100 text-zinc-600 border-zinc-200"
            }`}
          >
            {order.paystackPaymentDetails.isPaid
              ? "Paid via Paystack"
              : "Unpaid"}
          </span>
        </div>
      </div>

      {/* Internal Snapshot Row Mappings */}
      <div className="space-y-3 mb-6 grow">
        {order.orderItems.map((item, index) => (
          <div key={index} className="flex justify-between items-start text-xs">
            <div className="max-w-[75%]">
              <p className="font-bold text-zinc-900 uppercase tracking-tight line-clamp-1">
                {item.title}
              </p>
              <p className="text-[10px] text-zinc-400 font-medium">
                Qty: {item.quantity} &times; ₦{item.price.toLocaleString()}
              </p>
            </div>
            <span className="font-mono font-bold text-zinc-900">
              ₦{(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Valuations Base */}
      <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
        <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
          Issued Date:{" "}
          <span className="font-mono text-zinc-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold text-zinc-400 uppercase block tracking-wider leading-none mb-1">
            Total Valuation
          </span>
          <span className="text-base font-black tracking-tight text-black">
            ₦{order.paystackPaymentDetails.totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
