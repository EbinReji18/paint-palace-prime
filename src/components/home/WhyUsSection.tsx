import { Leaf, Clock, Wrench, Users } from "lucide-react";

const WhyUsSection = () => {
  const reasons = [
    {
      icon: Clock,
      title: "Long-lasting Colors",
      description:
        "Our advanced pigment technology ensures colors stay vibrant for 7+ years, resisting fading even in harsh sunlight.",
      color: "bg-paint-sky",
    },
    {
      icon: Leaf,
      title: "Eco-friendly",
      description:
        "Low VOC formulations that are safe for your family and the environment, without compromising on quality.",
      color: "bg-paint-sage",
    },
    {
      icon: Wrench,
      title: "Low Maintenance",
      description:
        "Easy-to-clean, washable surfaces that resist stains, dirt, and moisture—keeping walls pristine longer.",
      color: "bg-paint-blush",
    },
    {
      icon: Users,
      title: "Trusted by Professionals",
      description:
        "Preferred by leading architects, interior designers, and contractors across India for premium results.",
      color: "bg-paint-slate",
    },
  ];

  return (
    <section id="why-us" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block font-body text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Why ColorCraft
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            What Sets Us Apart
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            We don't just sell paint—we deliver a promise of quality, durability, and beauty 
            that transforms spaces and lasts for years.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group text-center p-8 rounded-2xl bg-card shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${reason.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <reason.icon className="w-8 h-8 text-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>

              {/* Decorative number */}
              <div className="absolute top-4 right-4 font-heading text-6xl font-bold text-muted/30 opacity-0 group-hover:opacity-100 transition-opacity">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
