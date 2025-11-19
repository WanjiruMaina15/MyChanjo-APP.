import { SignUp } from '@clerk/clerk-react';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center py-10 min-h-[80vh]">
      <SignUp 
        routing="path" 
        path="/register" 
        signInUrl="/login"
        forceRedirectUrl="/add-baby"
      />
    </div>
  );
}