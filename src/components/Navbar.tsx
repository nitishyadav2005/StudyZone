
"use client";

import Link from "next/link";
import { Search, BookOpen, User, Menu, X, Sparkles, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-headline tracking-tighter neon-glow">
            EduVault
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/study/class-10" className="hover:text-primary transition-colors">Class 10</Link>
          <Link href="/study/class-12" className="hover:text-primary transition-colors">Class 12</Link>
          <Link href="/exams/jee" className="hover:text-primary transition-colors">JEE Prep</Link>
          <Link href="/exams/neet" className="hover:text-primary transition-colors">NEET Prep</Link>
          <Link href="/ai-guide" className="flex items-center space-x-1 text-secondary hover:text-secondary/80 transition-colors">
            <Sparkles className="w-4 h-4" />
            <span>AI Guide</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-foreground/70">
            <Search className="w-5 h-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Saved Notes</DropdownMenuItem>
              <DropdownMenuItem>Progress Tracker</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="hidden sm:flex border-primary text-primary hover:bg-primary/10">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>

          <Button className="hidden sm:flex bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border p-4 bg-background flex flex-col space-y-4">
          <Link href="/study/class-10" className="text-lg font-medium">Class 10</Link>
          <Link href="/study/class-12" className="text-lg font-medium">Class 12</Link>
          <Link href="/exams/jee" className="text-lg font-medium">JEE Prep</Link>
          <Link href="/exams/neet" className="text-lg font-medium">NEET Prep</Link>
          <Link href="/ai-guide" className="text-lg font-medium text-secondary">AI Guide</Link>
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full border-primary text-primary">Login</Button>
            <Button className="w-full bg-primary text-primary-foreground">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}
