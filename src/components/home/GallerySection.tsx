import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface UploadedImage {
    name: string;
    url: string;
}

const GallerySection = () => {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .storage
                .from('uploads')
                .list();

            if (error) {
                console.error("Error fetching images:", error);
                return;
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
        } catch (error) {
            console.error("Error in fetchImages:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (images.length === 0) {
        return null; // Don't show section if no images
    }

    return (
        <section className="py-20 bg-secondary/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary font-medium tracking-wider uppercase mb-2 block">
                        Our Work
                    </span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Recent Projects
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Browse through our collection of recently completed painting projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((image, index) => (
                        <div
                            key={image.name}
                            className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg cursor-pointer"
                        >
                            <img
                                src={image.url}
                                alt={`Project ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-medium text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    View Project
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
