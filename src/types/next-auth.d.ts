import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      name: string;
      token: string;
    };
  }
}
