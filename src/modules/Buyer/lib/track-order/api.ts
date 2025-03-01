

/**
 * Track Order
 * API Endpoint: /order/history
 */
export async function fetchOrderHistory() {
  const response = await fetch("/order/history");
  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  return response.json();
}

/**
 * Order Details Page
 * API Endpoint: /order/:order_id/status
 */
export async function fetchOrderStatus(orderId: string) {
  const response = await fetch(`/order/${orderId}/status`);
  if (!response.ok) {
    throw new Error("Failed to fetch order status");
  }
  return response.json();
}

/**
 * Verify Button
 * API Endpoint: /verify
 */
export async function verifyOrder(orderId: string) {
  const response = await fetch("/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId }),
  });
  if (!response.ok) {
    throw new Error("Failed to verify order");
  }
  return response.json();
}

/**
 * Visual Verification
 * API Endpoint: /image?order_id=...
 */
export async function fetchVerificationImages(orderId: string) {
  const response = await fetch(`/image?order_id=${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch verification images");
  }
  return response.json();
}

/**
 * Visual Verification Feedback
 * API Endpoint: /feedback
 */
export async function submitFeedback(orderId: string, feedback: string) {
  const response = await fetch("/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, feedback }),
  });
  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
  return response.json();
}
