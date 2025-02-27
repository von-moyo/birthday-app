import Cookies from "js-cookie";
import { useAuth } from '../../context/authContext';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    // Redirect to sign-in page
    navigate('/login');
    // Clear cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    localStorage.clear();
    setIsAuthenticated(false);
    // Set authentication status to false
    setIsAuthenticated(false);
    toast.success('Logged out successfully.');
  };

  return logout;
};
