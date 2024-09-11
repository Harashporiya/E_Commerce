import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import  GoogleProvider  from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials"
import bcrypt, { compare } from "bcryptjs"
import {User} from "./lib/model/user"
import { connectToDataBase } from "./lib/db/db";
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers:[
        GoogleProvider({
          clientId:process.env.GOOGLE_CLIENT_ID as string,
         clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialProvider({
            name:"Credentials",
            credentials:{
                email:{
                    label:"Email",
                    type:"email",
                },
                password:{
                    label:"Password",
                    type:"password"
                }
            },
             authorize:async(credentails)=>{
                const email = credentails.email as string
                const password = credentails.password as string
               

                if(!email || !password){
                    throw new CredentialsSignin({cause:"Please provide both email and password"})
                }

                const user = await User.findOne({email}).select("+password");
                if(!user){
                    throw new CredentialsSignin({cause:"Invaild email and password"})
                }
             
                const isMatch =  await compare(password, user.password)
                if(!isMatch){
                    throw new CredentialsSignin({cause:"Invaild password"})
                }
               
                return {name:user.name, email:user.email,user:user._id};
            }
        })
      
  ],
  pages:{
    signIn:'/signin',
  },
  callbacks:{
    signIn:async({user, account})=>{
      if(account?.provider === 'google'){
        try {
            const {email,name,id} = user
            await connectToDataBase()

            const aleaduser = await User.findOne({email})
            if(!aleaduser){
                await User.create({email,name,googleId:id});

            }
            return true;
        } catch (error) {
            throw new AuthError("Error while creating user")
        }
      }
      return false;
    }
  }
})