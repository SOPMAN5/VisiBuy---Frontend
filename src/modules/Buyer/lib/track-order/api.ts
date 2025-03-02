/**
 * Track Order
 * GET /order/history
 * Headers: auth-token: <token>
 */
export async function fetchOrderHistory(token: string) {
  const response = await fetch("/order/history", {
    method: "GET",
    headers: {
      "auth-token": token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  return response.json();
}

/**
 * Get Order Status
 * GET /order/:order_id/status
 * Headers: auth-token: <token>
 */
export async function fetchOrderStatus(orderId: string, token: string) {
  const response = await fetch(`/order/${orderId}/status`, {
    method: "GET",
    headers: {
      "auth-token": token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch order status");
  }
  return response.json();
}

/**
 * Verify Visual Verification
 * POST /verify
 * Headers: auth-token: <token> (buyer)
 * Body: { order_id, status: 'verified' | 'canceled' }
 */
export async function verifyOrder(
  orderId: string,
  status: "verified" | "canceled",
  token: string
) {
  const response = await fetch("/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({ order_id: orderId, status }),
  });
  if (!response.ok) {
    throw new Error("Failed to verify order");
  }
  return response.json();
}

/**
 * Get Visual Verification
 * GET /image?order_id=...
 * Headers: auth-token: <token>
 */
export async function fetchVerificationImages(orderId: string, token: string) {
  const response = await fetch(`/image?order_id=${orderId}`, {
    method: "GET",
    headers: {
      "auth-token": token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch verification images");
  }
  return response.json();
}

/**
 * Feedback and Reporting
 * POST /feedback
 * Headers: auth-token: <token>
 * Body: { order_id, rating, comments? }
 */
export async function submitFeedback(
  orderId: string,
  rating: number,
  comments: string | undefined,
  token: string
) {
  const response = await fetch("/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": token,
    },
    body: JSON.stringify({
      order_id: orderId,
      rating,
      comments,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
  return response.json();
}
