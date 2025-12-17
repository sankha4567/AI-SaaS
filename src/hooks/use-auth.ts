import {useAuthActions} from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
const SignInSchema=z.object({
  email:z.string().email("Invalid email address"),
  password:z.string().min(6,"password must be atleast of 6 characters")
});
const SignUpSchema=z.object({
 firstname:z.string().min(2,"First name must be atleast of 2 characetrs"),
 lastname:z.string().min(2,"Last name must be atleast of 2 characetrs"),
 email:z.string().email("Invalid email address"),
 password:z.string().min(6,"password must be atleast of 6 characters")
});
type SignInData=z.infer<typeof SignInSchema>;
type SignUpData=z.infer<typeof SignUpSchema>;
export const useAuth=()=>{
  const {signIn,signOut} = useAuthActions();
  const router = useRouter();
  const [isLoading,setIsLoading]=useState(false);
  const SignInForm =useForm<SignInData>({
    resolver:zodResolver(SignInSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });
  const SignUpForm=useForm<SignUpData>({
    defaultValues:{
      firstname:"",
      lastname:"",
      email:"",
      password:""
    }
  });
  const handleSignIn=async(data:SignInData)=>{
   setIsLoading(true);
   try{
    await signIn("password",{
       email:data.email,
       password:data.password,
       flow:"signIn"
    })
    router.push("/dashboard") ;
   }
   catch(err){
     console.error(err);
     SignInForm.setError("password",{
      message:"Invalid email or password"
     })
   }
   finally{
    setIsLoading(false);
   }
  
  
  } 

  const handleSignUp=async(data:SignUpData)=>{
    setIsLoading(true);
    try{
     
      await signIn(
        "password",{
           
           email:data.email,
           password:data.password,
           name:`${data.firstname} ${data.lastname}`,
           flow:"signup"
        }
      );
      router.push("/dashboard");
    }
    catch(err){
      console.error("Sign up error:",err);
      SignUpForm.setError("root",{
        message:"Failed to create account.Email already exists"
      });
    }
    finally{
      setIsLoading(false);
    }
   
  } 
  const handleSignOut=async()=>{
   try{
    await signOut();
    router.push("/auth/sign-in");
   }
   catch(err){
    console.error("Sign out error:",err);
   }
    
    
  }
  return {
    SignInForm,
    SignUpForm,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    isLoading
  }

}