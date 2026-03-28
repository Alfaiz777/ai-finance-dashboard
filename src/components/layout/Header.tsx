import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, User, Settings, Bot } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_TITLES } from "@/utils/page-titles";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/navigators/routes";

const getInitials = (name: string) => {
  if (!name) return "";

  const words = name.trim().split(" ");

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout, loading } = useAuth();

  const currentTitle = PAGE_TITLES[location.pathname] || "Finance Dashboard";

  const isLoggedIn = !!user;

  const initials = user?.name ? getInitials(user.name) : "?";

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (loading) {
    return null;
  }

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-border/40 bg-background/70 backdrop-blur-xl sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{currentTitle}</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* AI Quick Button */}
        <Button
          onClick={() => navigate(ROUTES.AI_CHAT)}
          className="group relative flex items-center gap-2 h-9 px-4 rounded-xl 
  bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
  hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-500/30
  transition-all duration-300 text-white font-medium"
        >
          {/* Glow Effect */}
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-all" />

          {/* Icon */}
          <Bot className="h-4 w-4" />

          {/* Text */}
          <span className="hidden sm:inline">Ask AI</span>
        </Button>
        {!isLoggedIn ? (
          <>
            <Button
              onClick={() => navigate("/login")}
              variant="ghost"
              className="hover:bg-muted/50"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white shadow-md shadow-blue-500/20"
            >
              Sign Up
            </Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-9 w-9 border border-border/40 hover:scale-105 transition-all duration-200 shadow-sm">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 rounded-xl border border-border/40 bg-background/70 backdrop-blur-xl shadow-lg"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigate(ROUTES.PROFILE)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => navigate(ROUTES.SETTINGS)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-500 cursor-pointer hover:bg-red-500/10"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
