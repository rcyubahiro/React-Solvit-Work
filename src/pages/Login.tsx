import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/app/api/auth";
import { setCredentials } from "@/app/features/auth/authSlice";
import type { RootState } from "@/app/store";
import Input from "@/components/Input";
import Button from "@/components/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login({ username, password }).unwrap();
      dispatch(setCredentials(result));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative z-10 scale-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🍳</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mt-2">Login to access your recipe dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-lg mb-6 slide-in">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm text-blue-800 font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">ℹ️</span>
            Demo Credentials:
          </p>
          <div className="space-y-1">
            <p className="text-sm text-blue-700 font-mono bg-white px-3 py-1 rounded">
              <strong>Username:</strong> emilys
            </p>
            <p className="text-sm text-blue-700 font-mono bg-white px-3 py-1 rounded">
              <strong>Password:</strong> emilyspass
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <Input
            label="Username"
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Want to explore first?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-colors"
            >
              Browse Recipes
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
