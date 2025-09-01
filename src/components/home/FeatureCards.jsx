import { BarChart3, Package, CreditCard } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Gain real-time insights into sales performance, inventory turnover, and customer preferences with our powerful analytics dashboard."
  },
  {
    icon: Package,
    title: "Inventory Management",
    description: "Track every piece with detailed records including karat, weight, stones, and certifications. Never lose track of your valuable inventory."
  },
  {
    icon: CreditCard,
    title: "Sales & CRM",
    description: "Manage customer relationships, track sales history, and create personalized experiences for your valued clients."
  }
];

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-20">
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        return (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-amber-100 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
            <div className="bg-amber-100 p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-8 h-8 text-amber-700" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">{feature.title}</h3>
            <p className="text-amber-700 leading-relaxed">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCards;
