import NextAuth from "next-auth";

//Sobreescrevendo algumas interfaces específicas do Typescript
declare module 'next-auth' {
  export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar_url: string | null | undefined;
  }

  interface Session {
    user: User
  }
}