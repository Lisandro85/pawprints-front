import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      //FORMULARIO DE LOGUIN
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              userName: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        console.log(
          "Usuario recibido en authorize:",
          JSON.stringify(user, null, 2)
        );
        if (!res.ok || user.error) {
          throw new Error(user.error || "Error en la autenticación");
        }

        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
