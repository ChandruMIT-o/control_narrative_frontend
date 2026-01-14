import { useState } from "react";
import API from "../api/axiosInstance";

export default function ChangePasswordModal({ closeModal }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await API.post("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      alert("Password updated successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">

        <h2 className="text-xl font-semibold mb-4 text-center">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="password"
            placeholder="Current Password"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, currentPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update Password
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}
