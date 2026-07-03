import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { User, Mail, Shield, Save } from "lucide-react";
import avatarImg from "../../assets/images/profile_avatar.png";

export const Profile = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.userName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [success, setSuccess] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess("Settings updated locally!");
  };

  return (
    <div className="py-10 px-6 md:py-12 md:px-12 lg:px-24 flex flex-col space-y-10 items-center">
      <div className="max-w-md w-full glass-premium p-8 rounded-3xl relative shadow-2xl">
        <div className="text-center flex flex-col items-center space-y-3 mb-8 text-left">
          <div className="w-20 h-20 rounded-full border border-gold-light/25 bg-dark-bg p-1.5 overflow-hidden">
            <img src={avatarImg} alt="Profile Icon" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Account Profile</h2>
            <p className="text-xs text-silver mt-1">Manage registration details and status checks</p>
          </div>
        </div>

        <Alert type="success" message={success} className="mb-6" />

        <form onSubmit={handleSave} className="space-y-5 text-left">
          <Input
            label="Username"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            icon={User}
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            disabled
          />

          <div className="flex flex-col space-y-1.5 text-left">
            <label className="text-xs text-silver font-medium ml-1">Account Role</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-silver/40">
                <Shield size={16} />
              </span>
              <input
                type="text"
                disabled
                value={user?.role || "customer"}
                className="w-full bg-dark-bg/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-silver text-xs capitalize outline-none cursor-not-allowed font-sans"
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-3">
            <Save size={15} />
            <span>Save Profile</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
