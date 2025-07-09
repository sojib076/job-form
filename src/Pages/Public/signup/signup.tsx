
import SignupForm from './SignupForm';

const Signup = () => {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-lg w-full space-y-8 md:p-8 p-2">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started with JobApp</p>
        </div>
        <SignupForm />
      </div>
    </div>
    );
};

export default Signup;