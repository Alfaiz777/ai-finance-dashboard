import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/userService";
import { toast } from "sonner";

const getInitials = (name?: string) => {
  if (!name) return "?";
  const words = name.trim().split(" ");
  return words.length === 1
    ? words[0][0].toUpperCase()
    : words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
};

const Profile = () => {
  const { setAuthUser, user } = useAuth();

  const [name, setName] = useState(user?.name || "");

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const updatedUser = await updateProfile({ name });

      setAuthUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully 🎉");
    } catch (error) {
      toast.error("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-400 text-sm">
            Manage your personal information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-lg">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        {/* EDIT SECTION */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-lg font-semibold text-white">Edit Profile</h3>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/10 border-white/10 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <Input
              value={user?.email}
              disabled
              className="bg-white/10 border-white/10 text-gray-400"
            />
          </div>

          <Button
            onClick={handleUpdate}
            className="mt-2 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
