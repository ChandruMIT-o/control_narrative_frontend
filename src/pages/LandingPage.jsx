import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();

  if (user) return <Navigate to="/home" replace />;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Control Narrative AI Assistant
      </h1>

      <p className="mb-6 text-gray-600">
        Upload control narratives → extract logic → chat with your documents.
      </p>

      <div className="space-x-4">
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </Link>
        <Link to="/register" className="bg-gray-700 text-white px-4 py-2 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
