import { Order, Product, ProductSalesData, Shipment } from "./page";

/* 
Refactor below code for 

1- Improve efficiency.
2- Make it more readable and maintainable.
3- Handle potential errors in data (e.g., negative stock).
4- Separate the logic into more modular and reusable functions.
5- Utilize ES6+ features where appropriate.

*/
type Data = {
  products :Product[];
  orders: Order[];
  shipments: Shipment[];
}

type FinalData = Record<number, ProductSalesData>;

export function handleEcommerceData(data: Data): FinalData{
  const products = data.products;
  const orders = data.orders;
  const shipments = data.shipments;

  const finalData = ProcessProducts(products);
  ProcessOrders(orders, finalData);
  ProcessShipments(shipments, finalData);
  RemoveOutOfStockProduct(finalData);
  return finalData;
}

function ProcessProducts(products: Product[]): FinalData{
  const finalData:FinalData={}; 

  products.forEach(product => {
    if (product.stock > 0) {
      finalData[product.id] = { ...product,orders:[],shipments:[] };
    }
  });
  return finalData
}

function ProcessOrders(orders: Order[], finalData: FinalData) {
  orders.forEach(({ orderId, productId, quantity }) => {
    if (finalData[productId]) {
      const productData = { ...finalData[productId] };
      productData.stock -= quantity;
      productData.orders ??= [];
      productData.orders.push(orderId);
    }
  })
}

function ProcessShipments(shipments: Shipment[], finalData: FinalData) {
  shipments.forEach(({ productId, quantity, shipmentId }) => {
    if (finalData[productId]) {
      const productDataForShipment = finalData[productId];
      productDataForShipment.stock += quantity;
      productDataForShipment.shipments ??= [];
      productDataForShipment.shipments.push(shipmentId);
    }
  })
}


function RemoveOutOfStockProduct(finalData: FinalData) {
  const outOfStockProductIds = Object.entries(finalData)
    .filter(([, product]) => product.stock <= 0)
    .map(([productId]) => Number(productId));

  outOfStockProductIds.forEach(productId => {
    delete finalData[productId];
  });
}