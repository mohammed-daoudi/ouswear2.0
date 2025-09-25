import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'customer' | 'admin';
    }
  }

  interface User {
    role: 'customer' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'customer' | 'admin';
  }
}