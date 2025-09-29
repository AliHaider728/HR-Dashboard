import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // localStorage.setItem("authToken", "dummy-token");
      setIsAuthenticated(true);
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement actual social login logic here
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Enhanced Branding with Animated Balls */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg")'
          }}
        ></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 to-red-600/80"></div>
        
        {/* Additional Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Animated Bouncing Balls */}
        <div className="absolute inset-0">
          {/* Ball 1 - Top Right */}
          <div className="absolute w-32 h-32 bg-yellow-400 rounded-full opacity-30 bouncing-ball-1"></div>
          
          {/* Ball 2 - Bottom Left */}
          <div className="absolute w-24 h-24 bg-orange-300 rounded-full opacity-40 bouncing-ball-2"></div>
          
          {/* Ball 3 - Middle Right */}
          <div className="absolute w-20 h-20 bg-white rounded-full opacity-25 bouncing-ball-3"></div>
          
          {/* Ball 4 - Top Left */}
          <div className="absolute w-16 h-16 bg-pink-400 rounded-full opacity-35 bouncing-ball-4"></div>
          
          {/* Ball 5 - Bottom Right */}
          <div className="absolute w-28 h-28 bg-purple-400 rounded-full opacity-30 bouncing-ball-5"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="max-w-md ">
            <h1 className="text-4xl font-bold mb-6 text-balance">
              Empowering people through seamless HR management.
            </h1>
            <p className="text-xl mb-8 text-orange-100 text-pretty">
              Efficiently manage your workforce, streamline operations
              effortlessly.
            </p>

            {/* Illustration placeholder */}
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm border border-white border-opacity-20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-orange-100">
                Join thousands of companies using SmartHR to manage their
                workforce efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">SmartHR</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 ">Sign In</h2>
            <p className="text-gray-600">
              Please enter your details to sign in
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember Me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/register"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Create Account
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className="flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("apple")}
                className="flex justify-center items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M16.365 1.43c0 1.14-.466 2.26-1.206 3.07-.77.84-2.03 1.49-3.09 1.46-.14-1.08.41-2.24 1.17-3.06.82-.88 2.26-1.54 3.13-1.47zM20.2 17.55c-.48 1.1-.72 1.58-1.35 2.55-.88 1.34-2.13 3-3.67 3-1.36 0-1.72-.88-3.59-.88-1.91 0-2.28.86-3.64.88-1.54.02-2.71-1.52-3.6-2.86-2.47-3.75-2.74-8.16-1.2-10.47 1.1-1.68 2.86-2.67 4.5-2.67 1.7 0 2.78.91 4.18.91 1.36 0 2.19-.91 4.13-.91 1.47 0 3.03.8 4.11 2.17-3.6 1.98-3.01 7.2-.87 9.28z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
        
        {/* Shiny Text */}
        <div className="flex justify-center">
          <span className="text-center mt-9 items-center shiny-text">
            Powered By TecnoSphere
          </span>
        </div>
        
        {/* CSS for animations */}
        <style>
          {`
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Emilys+Candy&family=Gravitas+One&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

/* Shiny text animation */
.shiny-text {
  position: relative;
  display: inline-block;
  font-family: "Josefin Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;   
  overflow: hidden;
}

.shiny-text::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 150%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.8) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: shine 3s linear infinite;
}

@keyframes shine {
  0%   { left: -150%; }
  100% { left: 150%; }
}

/* Bouncing Ball Animations */
.bouncing-ball-1 {
  top: 10%;
  right: 10%;
  animation: bounce1 4s ease-in-out infinite;
}

.bouncing-ball-2 {
  bottom: 15%;
  left: 15%;
  animation: bounce2 3.5s ease-in-out infinite;
}

.bouncing-ball-3 {
  top: 45%;
  right: 5%;
  animation: bounce3 5s ease-in-out infinite;
}

.bouncing-ball-4 {
  top: 20%;
  left: 10%;
  animation: bounce4 3s ease-in-out infinite;
}

.bouncing-ball-5 {
  bottom: 10%;
  right: 20%;
  animation: bounce5 4.5s ease-in-out infinite;
}

/* Bounce animations with opacity changes */
@keyframes bounce1 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.3;
  }
  25% { 
    transform: translateY(-30px) translateX(-20px); 
    opacity: 0.6;
  }
  50% { 
    transform: translateY(0px) translateX(-40px); 
    opacity: 0.3;
  }
  75% { 
    transform: translateY(-20px) translateX(-20px); 
    opacity: 0.5;
  }
}

@keyframes bounce2 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.4;
  }
  30% { 
    transform: translateY(-40px) translateX(30px); 
    opacity: 0.7;
  }
  60% { 
    transform: translateY(-10px) translateX(50px); 
    opacity: 0.4;
  }
  80% { 
    transform: translateY(-25px) translateX(25px); 
    opacity: 0.6;
  }
}

@keyframes bounce3 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.25;
  }
  40% { 
    transform: translateY(-50px) translateX(-30px); 
    opacity: 0.55;
  }
  70% { 
    transform: translateY(-20px) translateX(-60px); 
    opacity: 0.25;
  }
}

@keyframes bounce4 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.35;
  }
  50% { 
    transform: translateY(-35px) translateX(40px); 
    opacity: 0.65;
  }
}

@keyframes bounce5 {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.3;
  }
  20% { 
    transform: translateY(-25px) translateX(-35px); 
    opacity: 0.6;
  }
  60% { 
    transform: translateY(-45px) translateX(-15px); 
    opacity: 0.3;
  }
  85% { 
    transform: translateY(-15px) translateX(-25px); 
    opacity: 0.5;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .shiny-text {
    font-size: 0.9rem;
  }
}
`}
        </style>
      </div>
    </div>
  );
};

export default Login;