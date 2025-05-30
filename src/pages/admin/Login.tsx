import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Simple redirect component for handling /admin/login route pattern
const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/admin/login', { replace: true });
  }, [navigate]);
  
  return null;
};

export default Login;
