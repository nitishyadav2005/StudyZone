"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  FileText, 
  Plus, 
  Download, 
  ExternalLink, 
  ArrowLeft,
  Loader2,
  BookOpen,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFirestore, useCollection, useMemoFirebase, useUser, errorEmitter } from "@/firebase";
import { collection, query, where, doc, setDoc } from "firebase/firestore";
import { FirestorePermissionError } from "@/firebase/errors";
import { useToast } from "@/hooks/use-toast";

export default function SubjectDetailPage() {
  const params = useParams();
  const classSlug = params?.class as string;
  const subjectSlug = params?.subject as string;
  
  const { firestore } = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ title: "", url: "", description: "" });

  const materialsQuery = useMemoFirebase(() => {
    if (!firestore || !classSlug || !subjectSlug) return null;
    return query(
      collection(firestore, "studyMaterials"),
      where("classId", "==", classSlug),
      where("subjectId", "==", subjectSlug)
    );
  }, [firestore, classSlug, subjectSlug]);

  const { data: materials, isLoading: isDataLoading } = useCollection(materialsQuery);

  const handleAddMaterial = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!firestore || !newMaterial.title || !newMaterial.url) return;

    setIsSaving(true);
    const materialsCol = collection(firestore, "studyMaterials");
    const newDocRef = doc(materialsCol);

    const materialData = {
      id: newDocRef.id,
      title: newMaterial.title,
      description: newMaterial.description || "No description provided.",
      fileUrl: newMaterial.url,
      materialType: "Notes",
      classId: classSlug,
      subjectId: subjectSlug,
      publishedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
    };

    setDoc(newDocRef, materialData, { merge: true })
      .then(() => {
        toast({
          title: "Material Added Successfully",
          description: `${newMaterial.title} has been added to the library.`,
        });
        setNewMaterial({ title: "", url: "", description: "" });
        setIsDialogOpen(false);
      })
      .catch((error: any) => {
        const permissionError = new FirestorePermissionError({
          path: newDocRef.path,
          operation: 'create',
          requestResourceData: materialData,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const subjectName = subjectSlug ? subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1) : "";
  const className = classSlug ? classSlug.replace("-", " ").toUpperCase() : "";

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href={`/study/${classSlug}`}>
        <Button variant="ghost" size="sm" className="mb-8 hover:bg-white/5" suppressHydrationWarning>
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Subjects
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline">{subjectName} - {className}</h1>
          <p className="text-muted-foreground">Access all study resources for this subject.</p>
        </div>

        {!isAuthLoading && user ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground font-bold" suppressHydrationWarning>
                <Plus className="mr-2 h-4 w-4" /> Add Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Study Material</DialogTitle>
                <DialogDescription>
                  Enter the details of the PDF. This feature is restricted to logged-in admins.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddMaterial}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Chapter 1: Calculus Notes" 
                      value={newMaterial.title}
                      onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="url">File URL (PDF Link)</Label>
                    <Input 
                      id="url" 
                      type="url"
                      placeholder="https://example.com/file.pdf" 
                      value={newMaterial.url}
                      onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                      required
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Brief Description</Label>
                    <Input 
                      id="description" 
                      placeholder="Short summary..." 
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} suppressHydrationWarning>Cancel</Button>
                  <Button type="submit" disabled={isSaving || !newMaterial.title || !newMaterial.url} suppressHydrationWarning>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Material"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <Button variant="outline" className="opacity-50 cursor-not-allowed" disabled suppressHydrationWarning>
            <Lock className="mr-2 h-4 w-4" /> Admin Access Required
          </Button>
        )}
      </div>

      {isDataLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Loading materials...</p>
        </div>
      ) : materials && materials.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item) => (
            <Card key={item.id} className="bg-card border-white/5 hover:border-primary/50 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground bg-white/5 px-2 py-1 rounded">
                    {item.materialType}
                  </span>
                </div>
                <CardTitle className="mt-4 text-xl">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {item.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 flex gap-2">
                <Button variant="outline" className="flex-1 text-xs font-bold" asChild suppressHydrationWarning>
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3 w-3" /> View PDF
                  </a>
                </Button>
                <Button variant="secondary" size="icon" className="shrink-0" asChild suppressHydrationWarning>
                  <a href={item.fileUrl} download>
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No materials found</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mb-8">
            There are currently no study materials for {subjectName} in {className}.
            {user ? " Click 'Add Material' to upload your first PDF link." : " Please login as admin to add materials."}
          </p>
        </div>
      )}
    </div>
  );
}
