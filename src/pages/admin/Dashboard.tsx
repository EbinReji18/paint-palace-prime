import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogOut, Upload, Trash2, Loader2, Image as ImageIcon, Eye } from "lucide-react";

interface UploadedImage {
    name: string;
    url: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<UploadedImage[]>([]);

    useEffect(() => {
        checkUser();
        fetchImages();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate("/login");
        }
        setLoading(false);
    };

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from('uploads')
                .list();

            if (error) {
                throw error;
            }

            if (data) {
                const imageUrls = data.map(file => {
                    const { data: { publicUrl } } = supabase
                        .storage
                        .from('uploads')
                        .getPublicUrl(file.name);

                    return {
                        name: file.name,
                        url: publicUrl
                    };
                });
                setImages(imageUrls);
            }
        } catch (error: any) {
            toast.error("Error fetching images: " + error.message);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            setUploading(true);
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('uploads')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            toast.success("Image uploaded successfully!");
            fetchImages();
        } catch (error: any) {
            toast.error("Error uploading image: " + error.message);
        } finally {
            setUploading(false);
            // Reset input value if needed (requires ref but simple reload works too)
            e.target.value = "";
        }
    };

    const handleDelete = async (imageName: string) => {
        try {
            const { error } = await supabase.storage
                .from('uploads')
                .remove([imageName]);

            if (error) {
                throw error;
            }

            toast.success("Image deleted successfully");
            fetchImages();
        } catch (error: any) {
            toast.error("Error deleting image: " + error.message);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
        toast.success("Logged out successfully");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-hero p-8 relative overflow-hidden">
            {/* Decorative elements from Login/Home */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-paint-sky opacity-40 blur-3xl" />
                <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-paint-sage opacity-30 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                            <span className="text-primary-foreground font-heading font-bold text-xl">C</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">Admin Dashboard</h1>
                    </div>

                    <Button variant="outline" onClick={handleLogout} className="gap-2 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>

                <div className="grid gap-8">
                    {/* Image Upload Section */}
                    <div className="p-8 bg-card/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-elegant">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2 font-heading">
                                    <Upload className="w-6 h-6 text-primary" />
                                    Upload New Project
                                </h2>
                                <p className="text-muted-foreground">Add new photos to your gallery section.</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={uploading}
                                    />
                                    <Button
                                        asChild
                                        disabled={uploading}
                                        size="lg"
                                        className="cursor-pointer shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <label htmlFor="image-upload" className="flex items-center gap-2">
                                            {uploading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Upload className="w-4 h-4" />
                                            )}
                                            {uploading ? "Uploading..." : "Select Image"}
                                        </label>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery Section */}
                    <div className="p-8 bg-card/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-elegant">
                        <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2 font-heading">
                            <ImageIcon className="w-6 h-6 text-primary" />
                            Uploaded Projects ({images.length})
                        </h2>

                        {images.length === 0 ? (
                            <div className="text-center py-20 text-muted-foreground bg-muted/30 rounded-2xl border border-dashed border-border">
                                <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p>No images uploaded yet. Start by adding some projects!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {images.map((image) => (
                                    <div key={image.name} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-muted">
                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(image.name)}
                                                className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 rounded-full"
                                                title="Delete image"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                asChild
                                                className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 rounded-full"
                                                title="View full size"
                                            >
                                                <a href={image.url} target="_blank" rel="noopener noreferrer">
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
