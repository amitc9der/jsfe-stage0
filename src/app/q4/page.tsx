"use client";

import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  onSale: boolean;
  inStock: boolean;
};

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000, onSale: true, inStock: true },
  { id: 2, name: "Mouse", price: 50, onSale: false, inStock: true },
  { id: 3, name: "Keyboard", price: 80, onSale: true, inStock: false },
  { id: 4, name: "Monitor", price: 300, onSale: true, inStock: true },
  { id: 5, name: "Headphones", price: 120, onSale: false, inStock: false },
  { id: 6, name: "Webcam", price: 60, onSale: true, inStock: true },
  { id: 7, name: "Speakers", price: 150, onSale: false, inStock: true },
  { id: 8, name: "Tablet", price: 400, onSale: true, inStock: false },
  { id: 9, name: "Printer", price: 200, onSale: true, inStock: true },
  { id: 10, name: "Scanner", price: 180, onSale: false, inStock: true },
  { id: 11, name: "External SSD", price: 90, onSale: true, inStock: true },
  { id: 12, name: "Router", price: 70, onSale: true, inStock: false },
  { id: 13, name: "USB Hub", price: 30, onSale: false, inStock: true },
];

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    {children}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-4 text-gray-500">
    <p>No items to display</p>
  </div>
);

export default function Q4Page() {
  const [productNames, setProductNames] = useState<string[]>([]);
  const [totalSalePrice, setTotalSalePrice] = useState<number>(0);
  const [inStockProducts, setInStockProducts] = useState<Product[]>([]);

  const generateReport = () => {
    // todo generate
    setProductNames(products.map((product)=>product.name))
    setTotalSalePrice(products.reduce((sum,product)=>sum + product.price,0))
    setInStockProducts(products.filter((product)=>product.inStock))
  };

  useEffect(() => {
    // TODO: Implement the data fetching and processing logic here 
    // Update the state variables with above using `products` array above;
    generateReport();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Q4 - Product Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Product Names">
          {productNames.length > 0 ? (
            <ul>
              {productNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </Card>

        <Card title="Total Sale Price">
          {totalSalePrice > 0 ? (
            <p>${totalSalePrice.toFixed(2)}</p>
          ) : (
            <EmptyState />
          )}
        </Card>

        <Card title="In Stock Products">
          {inStockProducts.length > 0 ? (
            <ul>
              {inStockProducts.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </Card>
      </div>
    </div>
  );
}
