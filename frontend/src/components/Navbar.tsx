import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, getUser, logout } from "@/lib/auth";
import {
  FileText,
  Menu,
  X,
  Home,
  FolderOpen,
  Sparkles,
  User,
  LogOut,
  Settings,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const authLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/quotation", label: "Quotation", icon: FileText },
  { to: "/proposal", label: "Proposal", icon: Sparkles },
  { to: "/my-files", label: "My Files", icon: FolderOpen },
  { to: "/dashboard", label: "Profile", icon: User },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = isAuthenticated();
  const user = getUser();
  const { setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary rounded-lg p-1.5">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground hidden sm:inline">QuoteCraft</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {loggedIn ? (
            <>
              {authLinks.map((link) => (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "gap-1.5",
                      location.pathname === link.to && "bg-secondary text-secondary-foreground"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 focus-visible:ring-0">
                    <Settings className="h-4 w-4" /> Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" /> Light Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" /> Dark Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" /> System
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gradient-primary text-primary-foreground shadow-primary hover:opacity-90">
                  Sign Up
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 focus-visible:ring-0 ml-2">
                    <Settings className="h-4 w-4" /> Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" /> Light Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" /> Dark Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Monitor className="mr-2 h-4 w-4" /> System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 pb-4 pt-2 space-y-1">
          {loggedIn ? (
            <>
              {authLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2",
                      location.pathname === link.to && "bg-secondary text-secondary-foreground"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
              
              <div className="pt-2 pb-1 border-t space-y-1">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2">Appearance</p>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setTheme("light"); setOpen(false); }}>
                  <Sun className="h-4 w-4" /> Light Mode
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setTheme("dark"); setOpen(false); }}>
                  <Moon className="h-4 w-4" /> Dark Mode
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setTheme("system"); setOpen(false); }}>
                  <Monitor className="h-4 w-4" /> System
                </Button>

                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-4">Account</p>
                <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={() => { handleLogout(); setOpen(false); }}>
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button className="w-full gradient-primary text-primary-foreground shadow-primary hover:opacity-90 mb-2">
                  Sign Up
                </Button>
              </Link>
              
              <div className="pt-2 pb-1 border-t space-y-1">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 mt-2">Appearance</p>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setTheme("light"); setOpen(false); }}>
                  <Sun className="h-4 w-4" /> Light Mode
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setTheme("dark"); setOpen(false); }}>
                  <Moon className="h-4 w-4" /> Dark Mode
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setTheme("system"); setOpen(false); }}>
                  <Monitor className="h-4 w-4" /> System
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
