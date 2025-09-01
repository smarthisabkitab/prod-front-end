import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Anita Sharma",
    role: "Jewellery Shop Owner - Kathmandu",
    feedback:
      "GoldVault has simplified my shop’s accounting and customer management. I no longer struggle with manual records!",
    rating: 5,
  },
  {
    name: "Ramesh Gupta",
    role: "Goldsmith - Pokhara",
    feedback:
      "The inventory tracking is a lifesaver. I can manage purity, weight, and pricing without any hassle.",
    rating: 4,
  },
  {
    name: "Priya Koirala",
    role: "Retailer - Lalitpur",
    feedback:
      "Customer support is excellent and the platform is easy to use. Highly recommended for jewellery businesses.",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <section className="bg-amber-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-8">
          What Our Clients Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl shadow-md border border-amber-200 bg-white hover:shadow-lg transition p-6 flex flex-col items-center"
            >
              {/* Stars */}
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-700 italic mb-4">"{t.feedback}"</p>
              <h3 className="text-amber-800 font-semibold">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
