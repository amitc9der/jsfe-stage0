"use client";

import React from "react";
import { handleEcommerceData } from "./ecommerce-data";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export interface Order {
  orderId: string;
  productId: number;
  quantity: number;
}

export interface Shipment {
  shipmentId: string;
  productId: number;
  quantity: number;
}

export interface ProductSalesData {
  name: string;
  price: number;
  stock: number;
  orders: string[];
  shipments: string[];
}

const sampleData = {
  products: [
    { id: 1, name: "Shirt", price: 20, stock: 10 },
    { id: 2, name: "Pants", price: 50, stock: 5 },
    // ... more products
  ],
  orders: [
    { orderId: "A1", productId: 1, quantity: 3 },
    { orderId: "A2", productId: 2, quantity: 2 },
    // ... more orders
  ],
  shipments: [
    { shipmentId: "S1", productId: 1, quantity: 5 },
    { shipmentId: "S2", productId: 2, quantity: 3 },
    // ... more shipments
  ],
};

export default function Q5Page() {
  const salesData: { [key: number]: ProductSalesData } =
    handleEcommerceData(sampleData);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Q5 - Product Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(salesData).map(([id, product]) => (
          <div key={id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Price:</span> ${product.price}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Orders:</h3>
                <ul className="list-disc list-inside text-gray-600 pl-2">
                  {product.orders.map((orderId) => (
                    <li key={orderId}>{orderId}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-medium text-gray-700">Shipments:</h3>
                <ul className="list-disc list-inside text-gray-600 pl-2">
                  {product.shipments.map((shipmentId) => (
                    <li key={shipmentId}>{shipmentId}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
