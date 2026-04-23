import {signOut} from 'next-auth/react';

// INFO: federated logout
// Remove the keycloak session inside the service
export async function federatedLogout() {
  try {
    const response = await fetch('/api/auth/federated-logout', {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Federated logout failed:', response.status);
      throw new Error(`Failed with status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid response type:', contentType);
      throw new Error('Response is not JSON');
    }

    const data = await response.json();

    if (data.logoutUrl) {
      await signOut({callbackUrl: '/'});
      window.location.href = data.logoutUrl;
    } else {
      await signOut({callbackUrl: '/'});
      throw new Error('No logout URL returned');
    }
  } catch (error) {
    console.error('Error during federated logout:', error);
    await signOut({callbackUrl: '/'});
  }
}
