import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { logout } from "@/app/features/auth/authSlice";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-3xl group-hover:scale-110 transition-transform">🍳</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Recipe Hub
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors relative group"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              {user && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
