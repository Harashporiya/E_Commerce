import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./lib/model/user";
import { connectToDataBase } from "./lib/db/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new AuthError("No credentials provided");
        }
        const { email, password } = credentials;

        if (!email || !password) {
          throw new AuthError("Please provide both email and password");
        }

        await connectToDataBase();
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new AuthError("Invalid email or password");
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new AuthError("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name } = user;
          await connectToDataBase();
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            const [firstName, ...lastNameParts] = name?.split(" ") || ["", ""];
            const lastName = lastNameParts.join(" ") || "";
            await User.create({
              email,
              firstName,
              lastName,
              password: bcrypt.hashSync(
                Math.random().toString(36).slice(-8),
                10,
              ),
            });
          }
          return true;
        } catch (error) {
          console.error("Error while creating user:", error);
          throw new AuthError("Error while creating user");
        }
      }
      return true;
    },
  },
});
