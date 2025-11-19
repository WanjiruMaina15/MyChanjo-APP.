import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  
 
  return (
    <div className="flex justify-center items-center py-10 min-h-[80vh]">
      <SignIn 
       
        routing="path" 
        path="/login" 
        
       
        signUpUrl="/register"
        
    
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
}