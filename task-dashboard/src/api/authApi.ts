export async function fetchCurrentUser() {
  const res = await fetch('/api/auth/me', {
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Not authenticated');
  }
  return res.json(); // { email, token }
}
