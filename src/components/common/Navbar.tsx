import { Code, LogOut, Menu, Moon, Settings, Sun, User, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  return (
    <>
      <nav className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-foreground">DevConnect</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/developers" className="text-foreground hover:text-primary transition-colors">
                Developers
              </Link>
              <Link to="/projects" className="text-foreground hover:text-primary transition-colors">
                Projects
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {theme.mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.displayName}</span>
                  </Button>

                  {isProfileMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-accent"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Join Now</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {theme.mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/developers"
                  className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Developers
                </Link>
                <Link
                  to="/projects"
                  className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 text-foreground hover:bg-accent rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-foreground hover:bg-accent rounded-md"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 px-3 py-2">
                    <Link to="/login" className="block">
                      <Button variant="outline" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" className="block">
                      <Button size="sm" className="w-full">
                        Join Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav></>
  )
}

export default Navbar