export interface User {
   id: string;
   name: string;
 }
 //we created data by using Promise and we call iy with Promise
 export function getUser(): Promise<User> {
   return Promise.resolve({ id: "1", name: "David" });
 }