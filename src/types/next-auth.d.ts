/**
 *
 * Next Auth
 *
 */
import { User } from '@prisma/client';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession`
   * and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    userId: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }
}
