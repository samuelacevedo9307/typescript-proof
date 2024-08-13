import { navigateTo } from '../router';

export function logOut() {

  localStorage.removeItem('user');
  
  navigateTo(`/login`);
}
