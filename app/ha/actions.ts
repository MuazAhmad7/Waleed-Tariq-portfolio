'use server';

import { redirect } from 'next/navigation';

// Stub implementations - authentication removed
export async function signOut() {
  // No sign out needed - just redirect
  redirect('/');
}

export async function signInWithGoogle() {
  // No authentication - just redirect
  redirect('/');
}

export async function signUp(formData: FormData) {
  // No sign up needed - just redirect
  redirect('/');
}
