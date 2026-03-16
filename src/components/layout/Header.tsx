import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut, User, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_TITLES } from "@/utils/page-titles";

const token = localStorage.getItem("token");
const isLoggedIn = !!token;

const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const currentTitle = PAGE_TITLES[location.pathname] || "Finance Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{currentTitle}</h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Button onClick={() => navigate("/login")} variant="ghost">
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:scale-105 transition-transform duration-200">
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
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
