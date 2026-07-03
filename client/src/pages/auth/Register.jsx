import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { User, Mail, Lock } from "lucide-react";
import avatarImg from "../../assets/images/profile_avatar.png";

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!userName || !email || !password) {
        throw new Error("Please fill in all fields.");
      }
      await register(userName, email, password);
      navigate("/customer");
    } catch (err) {
      setError(err.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-dark-bg relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-light/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-cyan/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full glass-premium p-8 rounded-3xl relative z-10 shadow-2xl">
        <div className="text-center flex flex-col items-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full border border-gold-light/25 bg-dark-bg p-1 overflow-hidden">
            <img src={avatarImg} alt="Profile Icon" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
            <p className="text-xs text-silver mt-1">Join ReserveEase to start booking</p>
          </div>
        </div>

        <Alert type="error" message={error} className="mb-6" />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            icon={User}
            placeholder="John Doe"
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            placeholder="email@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
          />

          <Button type="submit" loading={loading} className="w-full py-3.5 mt-2">
            <span>Sign Up</span>
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center text-sm">
          <span className="text-silver/70">Already have an account?</span>
          <Link to="/login" className="text-gold-light font-semibold hover:text-white transition-colors ml-1.5">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
