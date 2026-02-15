
import Link from "next/link";
import { BookOpen, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-headline tracking-tighter">EduVault</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering students with quality study materials for CBSE and competitive exams.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Study Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/study/class-10" className="hover:text-primary transition-colors">Class 10 Materials</Link></li>
              <li><Link href="/study/class-12" className="hover:text-primary transition-colors">Class 12 Materials</Link></li>
              <li><Link href="/exams/jee" className="hover:text-primary transition-colors">JEE Preparation</Link></li>
              <li><Link href="/exams/neet" className="hover:text-primary transition-colors">NEET Preparation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">User Dashboard</Link></li>
              <li><Link href="/ai-guide" className="hover:text-primary transition-colors">AI Study Guide</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Practice Tests</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Solved PYQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EduVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
