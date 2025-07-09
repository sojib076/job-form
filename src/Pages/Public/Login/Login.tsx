
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-lg w-full space-y-8 ms:p-8 p-2">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;