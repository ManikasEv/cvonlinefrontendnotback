const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getAuthToken() {
  // This will be called from components that have access to useUser()
  return null;
}

export async function createCV(cvData, token) {
  const response = await fetch(`${API_URL}/api/cvs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cvData),
  });

  if (!response.ok) {
    throw new Error('Failed to create CV');
  }

  return response.json();
}

export async function getCVs(token) {
  const response = await fetch(`${API_URL}/api/cvs`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch CVs');
  }

  return response.json();
}

export async function getCV(id, token) {
  const response = await fetch(`${API_URL}/api/cvs/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch CV');
  }

  return response.json();
}

export async function updateCV(id, cvData, token) {
  const response = await fetch(`${API_URL}/api/cvs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(cvData),
  });

  if (!response.ok) {
    throw new Error('Failed to update CV');
  }

  return response.json();
}

export async function deleteCV(id, token) {
  const response = await fetch(`${API_URL}/api/cvs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete CV');
  }

  return response.json();
}

export async function createPaymentIntent(token) {
  const response = await fetch(`${API_URL}/api/payment/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }

  return response.json();
}

export async function getSubscriptionStatus(token) {
  const response = await fetch(`${API_URL}/api/payment/subscription-status`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get subscription status');
  }

  return response.json();
}

export async function cancelSubscription(token) {
  const response = await fetch(`${API_URL}/api/payment/cancel-subscription`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to cancel subscription');
  }

  return response.json();
}
