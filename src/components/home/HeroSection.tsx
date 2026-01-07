import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-hero parallax-layer"
      >
        {/* Decorative paint swatches */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-paint-sky opacity-60 blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-paint-sage opacity-50 blur-3xl" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 rounded-full bg-paint-blush opacity-60 blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 rounded-full bg-paint-slate opacity-40 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-sm font-medium">Premium Quality Paints</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-tight mb-6 animate-fade-up animation-delay-200">
            Premium Paints for{" "}
            <span className="relative">
              <span className="text-gradient">Modern Living</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 3 150 3 298 10"
                  stroke="hsl(var(--accent))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-60"
                />
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-body text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animation-delay-400">
            Colors that protect, inspire, and last longer. Designed for Indian homes, 
            crafted with world-class technology and a passion for perfection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-600">
            <a href="#products">
              <Button variant="hero" size="xl" className="group">
                Explore Our Colors
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#about">
              <Button variant="heroOutline" size="xl">
                Learn More
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up animation-delay-600">
            {[
              { value: "25+", label: "Years of Trust" },
              { value: "500+", label: "Color Options" },
              { value: "10L+", label: "Happy Homes" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl sm:text-3xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="font-body text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
