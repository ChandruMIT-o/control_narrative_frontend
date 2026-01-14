import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, CheckCircle, XCircle, Loader2, ShieldCheck } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    upper: false,
    number: false,
    special: false
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  // Real-time password strength checker
  useEffect(() => {
    const pwd = form.password;
    setPasswordCriteria({
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  }, [form.password]);

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...dataToSend } = form;
      const res = await registerRequest(dataToSend);
      login(res.data.access_token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* LEFT PANEL - Form (Now on the Left) */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          
          <div className="text-center mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <p className="text-sm text-gray-500">Get started for free</p>
          </div>

          {error && (
            <div className="mb-3 p-2 bg-red-50 text-red-700 text-xs rounded flex items-center gap-2 border border-red-200">
              <XCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  className="pl-9 w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="John Doe"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  className="pl-9 w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="name@company.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="pl-9 w-full p-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    placeholder="••••••••"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Confirm</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    className={`w-full p-2.5 text-sm border rounded-lg focus:ring-2 outline-none transition ${
                      form.confirmPassword && form.password !== form.confirmPassword 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-green-500"
                    }`}
                    placeholder="••••••••"
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Compact Password Strength Checklist */}
            <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 flex items-center gap-1">
                <ShieldCheck size={12} /> Password Strength
              </p>
              <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                <Requirement met={passwordCriteria.length} label="8+ Chars" />
                <Requirement met={passwordCriteria.upper} label="Uppercase" />
                <Requirement met={passwordCriteria.number} label="Number" />
                <Requirement met={passwordCriteria.special} label="Symbol" />
              </div>
            </div>

            <button
              disabled={loading || !isPasswordValid}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Branding (Now on the Right) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-bl from-green-600 to-teal-700 relative overflow-hidden items-center justify-center text-white p-12">
        <div className="absolute top-0 right-0 w-full h-full bg-white opacity-5 pattern-grid" />
        <div className="relative z-10 max-w-lg text-right">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Join the Platform</h1>
          <p className="text-green-100 text-base leading-relaxed">
            Create an account to start parsing complex control narratives with AI-driven precision.
          </p>
        </div>
      </div>

    </div>
  );
}

// Compact Requirement Component
function Requirement({ met, label }) {
  return (
    <div className={`flex items-center gap-1.5 text-[11px] transition-colors ${met ? "text-green-600 font-medium" : "text-gray-400"}`}>
      {met ? <CheckCircle size={10} className="fill-green-100" /> : <div className="w-2.5 h-2.5 rounded-full border border-gray-300" />}
      {label}
    </div>
  );
}