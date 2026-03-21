"use client";

import Link from "next/link";
import { Search, BookOpen, User, Menu, X, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useUser, useAuth } from "@/firebase";
import { signOut } from "firebase/auth";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tighter neon-glow" suppressHydrationWarning>
            Study Zone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/study/class-10" className="hover:text-primary transition-colors">Class 10</Link>
          <Link href="/study/class-12" className="hover:text-primary transition-colors">Class 12</Link>
          <Link href="/exams/jee" className="hover:text-primary transition-colors">JEE Prep</Link>
          <Link href="/exams/neet" className="hover:text-primary transition-colors">NEET Prep</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground/70" suppressHydrationWarning>
            <Search className="w-5 h-5" />
          </Button>
          
          {!isUserLoading && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex" suppressHydrationWarning>
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">{user.displayName || "Admin User"}</p>
                    <p className="w-[200px] truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive flex items-center">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : !isUserLoading ? (
            <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/10" asChild suppressHydrationWarning>
              <Link href="/auth">
                <LogIn className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
          ) : null}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            suppressHydrationWarning
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border p-4 bg-background flex flex-col space-y-4">
          <Link href="/study/class-10" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Class 10</Link>
          <Link href="/study/class-12" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Class 12</Link>
          <Link href="/exams/jee" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>JEE Prep</Link>
          <Link href="/exams/neet" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>NEET Prep</Link>
          <div className="flex flex-col space-y-2">
            {!user ? (
              <Button variant="outline" className="w-full border-primary text-primary" asChild suppressHydrationWarning>
                <Link href="/auth" onClick={() => setIsMenuOpen(false)}>Admin Login</Link>
              </Button>
            ) : (
              <Button variant="outline" className="w-full border-destructive text-destructive" onClick={() => { handleLogout(); setIsMenuOpen(false); }} suppressHydrationWarning>
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
