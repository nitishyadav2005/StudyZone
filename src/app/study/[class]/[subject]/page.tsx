"use client";

import { useState, useMemo } from "react";
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
  Lock,
  FolderOpen,
  Edit,
  Trash2
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useFirestore, useCollection, useMemoFirebase, useUser, errorEmitter } from "@/firebase";
import { collection, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { FirestorePermissionError } from "@/firebase/errors";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export default function SubjectDetailPage() {
  const params = useParams();
  const classSlug = params?.class as string;
  const subjectSlug = params?.subject as string;
  
  const firestore = useFirestore();
  const { user, isUserLoading: isAuthLoading } = useUser();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ 
    title: "", 
    url: "", 
    description: "",
    folder: "Ncert Solution" 
  });

  const materialsQuery = useMemoFirebase(() => {
    if (!firestore || !classSlug || !subjectSlug) return null;
    return query(
      collection(firestore, "studyMaterials"),
      where("classId", "==", classSlug),
      where("subjectId", "==", subjectSlug)
    );
  }, [firestore, classSlug, subjectSlug]);

  const { data: materials, isLoading: isDataLoading } = useCollection(materialsQuery);

  const groupedMaterials = useMemo(() => {
    if (!materials) return {};
    
    // Group materials by folder type
    const grouped = materials.reduce((acc, item) => {
      let folder = item.materialType || "Ncert Solution";
      if (!acc[folder]) acc[folder] = [];
      acc[folder].push(item);
      return acc;
    }, {} as Record<string, typeof materials>);

    // Natural Sort function: Correctly handles "Chapter 2" vs "Chapter 10"
    const naturalSort = (a: string, b: string) => {
      return a.localeCompare(b, undefined, { 
        numeric: true, 
        sensitivity: 'base'
      });
    };

    // Sort items within each folder
    Object.keys(grouped).forEach(folder => {
      grouped[folder].sort((a, b) => naturalSort(a.title.trim(), b.title.trim()));
    });

    return grouped;
  }, [materials]);

  const folders = useMemo(() => {
    return Object.keys(groupedMaterials).sort((a, b) => 
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
  }, [groupedMaterials]);

  const handleOpenAddDialog = () => {
    setEditingMaterial(null);
    setNewMaterial({ title: "", url: "", description: "", folder: "Ncert Solution" });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (material: any) => {
    setEditingMaterial(material);
    setNewMaterial({ 
      title: material.title, 
      url: material.fileUrl, 
      description: material.description,
      folder: material.materialType || "Ncert Solution"
    });
    setIsDialogOpen(true);
  };

  const handleSaveMaterial = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!firestore || !newMaterial.title || !newMaterial.url) return;

    setIsSaving(true);
    
    if (editingMaterial) {
      const docRef = doc(firestore, "studyMaterials", editingMaterial.id);
      const updateData = {
        title: newMaterial.title,
        description: newMaterial.description,
        fileUrl: newMaterial.url,
        materialType: newMaterial.folder,
        lastUpdatedAt: new Date().toISOString(),
      };

      updateDoc(docRef, updateData)
        .then(() => {
          toast({ title: "Updated", description: "Resource updated successfully." });
          setIsDialogOpen(false);
        })
        .catch(() => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: docRef.path,
            operation: 'update',
            requestResourceData: updateData
          }));
        })
        .finally(() => setIsSaving(false));
    } else {
      const materialsCol = collection(firestore, "studyMaterials");
      const newDocRef = doc(materialsCol);
      const materialData = {
        id: newDocRef.id,
        title: newMaterial.title,
        description: newMaterial.description || "Study material for " + subjectSlug,
        fileUrl: newMaterial.url,
        materialType: newMaterial.folder,
        classId: classSlug,
        subjectId: subjectSlug,
        publishedAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
      };

      setDoc(newDocRef, materialData)
        .then(() => {
          toast({ title: "Added", description: "Resource added successfully." });
          setIsDialogOpen(false);
        })
        .catch(() => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: newDocRef.path,
            operation: 'create',
            requestResourceData: materialData
          }));
        })
        .finally(() => setIsSaving(false));
    }
  };

  const handleDelete = (materialId: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, "studyMaterials", materialId);
    deleteDocumentNonBlocking(docRef);
    toast({ title: "Deleted", description: "Resource removed." });
  };

  const subjectName = subjectSlug ? subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1) : "";
  const className = classSlug ? classSlug.replace("-", " ").toUpperCase() : "";

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href={`/study/${classSlug}`}>
        <Button variant="ghost" size="sm" className="mb-8 hover:bg-white/5">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Subjects
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-headline">{subjectName} - {className}</h1>
          <p className="text-muted-foreground">Download NCERT Solutions and more.</p>
        </div>

        {!isAuthLoading && user && (
          <Button onClick={handleOpenAddDialog} className="bg-primary text-primary-foreground font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add PDF
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingMaterial ? "Edit Material" : "Add Material"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveMaterial}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="folder">Folder</Label>
                <Select 
                  value={newMaterial.folder} 
                  onValueChange={(val) => setNewMaterial({ ...newMaterial, folder: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ncert Solution">Ncert Solution</SelectItem>
                    <SelectItem value="NCERT Book">NCERT Book</SelectItem>
                    <SelectItem value="PYQ">PYQ</SelectItem>
                    <SelectItem value="Notes">Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title (e.g., Chapter 1)</Label>
                <Input 
                  id="title" 
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">PDF URL</Label>
                <Input 
                  id="url" 
                  type="url"
                  value={newMaterial.url}
                  onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isDataLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : folders.length > 0 ? (
        <Accordion type="multiple" defaultValue={[folders[0]]} className="space-y-4">
          {folders.map((folderName) => (
            <AccordionItem key={folderName} value={folderName} className="border rounded-xl bg-card/30 px-4">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center space-x-3">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <span className="text-lg font-bold">{folderName}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {groupedMaterials[folderName].map((item) => (
                    <Card key={item.id} className="bg-card border-white/5 hover:border-primary/50 transition-all">
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          {user && (
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenEditDialog(item)}>
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                        <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs" asChild>
                          <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">View</a>
                        </Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8" asChild>
                          <a href={item.fileUrl} download><Download className="h-4 w-4" /></a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold">No materials yet</h3>
          {user && <p className="text-muted-foreground mt-2">Add your first PDF to get started.</p>}
        </div>
      )}
    </div>
  );
}
