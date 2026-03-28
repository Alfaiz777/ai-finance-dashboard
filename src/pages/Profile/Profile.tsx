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
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your personal information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl p-6 shadow-sm flex items-center gap-5">
          <Avatar className="h-16 w-16 border border-border/40 shadow-sm">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
            <p className="text-muted-foreground text-sm">{user?.email}</p>
          </div>
        </div>

        {/* EDIT SECTION */}
        <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl p-6 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-white tracking-tight">
            Edit Profile
          </h3>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border border-border/40 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email Address</label>
            <Input
              value={user?.email}
              disabled
              className="bg-muted/30 border border-border/40 text-muted-foreground rounded-xl"
            />
          </div>

          <Button
            onClick={handleUpdate}
            className="px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-lg shadow-blue-500/20"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
