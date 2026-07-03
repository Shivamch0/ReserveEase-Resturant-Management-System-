import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CalendarCheck, Armchair, Clock, Sparkles, ChevronRight } from "lucide-react";
import heroImg from "../assets/images/hero_restaurant.png";

export const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/customer");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <section className="relative min-h-[85svh] flex items-center py-16 px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/85 to-transparent z-10"></div>
          <img
            src={heroImg}
            alt="Luxurious Restaurant Interior"
            className="w-full h-full object-cover object-center scale-[1.02] transform"
          />
        </div>

        <div className="relative z-20 max-w-2xl text-left flex flex-col space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-gold-light text-xs font-semibold tracking-wider uppercase w-max">
            <Sparkles size={14} />
            <span>Exquisite Dining Experience</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Reserve Your Table <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark">
              With Pure Ease
            </span>
          </h1>

          <p className="text-silver md:text-lg leading-relaxed max-w-xl">
            Indulge in a seamless dining journey. Browse table configurations, select your desired date and time, and secure your reservation at ReserveEase.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={handleCTA}
              className="gold-gradient text-dark-bg font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center space-x-2 text-sm tracking-wider uppercase shadow-lg shadow-gold-dark/20"
            >
              <span>{user ? "Go To Dashboard" : "Book A Table Now"}</span>
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => navigate(user ? (user.role === "admin" ? "/admin" : "/customer") : "/login")}
              className="glass hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-xl border border-white/10 transition-colors text-sm tracking-wide"
            >
              Explore Configurations
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-12 border-t border-white/5 max-w-md w-full">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono">6</div>
              <div className="text-[10px] sm:text-xs text-silver mt-1">Premium Tables</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono">1–8</div>
              <div className="text-[10px] sm:text-xs text-silver mt-1">Guest Capacities</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-mono">100%</div>
              <div className="text-[10px] sm:text-xs text-silver mt-1">Instant Bookings</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-bg py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col space-y-12">
          <div className="text-center max-w-xl mx-auto flex flex-col space-y-3">
            <span className="text-gold-light text-xs font-bold uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Three Steps to Fine Dining</h2>
            <p className="text-silver text-sm">Our modern reservation system guarantees an effortless dining setup so you can focus on the culinary journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl border border-white/5 hover:border-gold-light/20 transition-all flex flex-col space-y-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-gold-light">
                <Armchair size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">1. Select Guest Size</h3>
              <p className="text-silver text-sm leading-relaxed">
                Choose the number of guests. Our system filters available tables matching your exact requirement.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl border border-white/5 hover:border-gold-light/20 transition-all flex flex-col space-y-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-gold-light">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">2. Pick Date & Time</h3>
              <p className="text-silver text-sm leading-relaxed">
                Specify your reservation date and dining hours. Overlapping slots are checked instantly.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl border border-white/5 hover:border-gold-light/20 transition-all flex flex-col space-y-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-gold-light/10 border border-gold-light/20 flex items-center justify-center text-gold-light">
                <CalendarCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-white">3. Confirm Instantly</h3>
              <p className="text-silver text-sm leading-relaxed">
                Review configuration and notes, lock your booking, and get instant digital confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
