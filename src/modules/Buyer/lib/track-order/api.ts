

export async function fetchOrderHistory() {
  const response = await fetch("/order/history");
  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  return response.json();
}
