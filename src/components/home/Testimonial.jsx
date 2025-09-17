import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anita Sharma",
    role: "Jewellery Shop Owner - Kathmandu",
    feedback:
      "GoldVault has simplified my shop's accounting and customer management. I no longer struggle with manual records! The inventory tracking is seamless and the reporting features have saved me countless hours.",
    rating: 5,
  },
  {
    name: "Ramesh Gupta",
    role: "Goldsmith - Pokhara",
    feedback:
      "The inventory tracking is a lifesaver. I can manage purity, weight, and pricing without any hassle. The mobile app makes it easy to update stock even when I'm away from the shop.",
    rating: 4,
  },
  {
    name: "Priya Koirala",
    role: "Retailer - Lalitpur",
    feedback:
      "Customer support is excellent and the platform is easy to use. Highly recommended for jewellery businesses. The training sessions were incredibly helpful for my staff.",
    rating: 5,
  },
  {
    name: "Bikash Thapa",
    role: "Gold Wholesaler - Biratnagar",
    feedback:
      "As a wholesaler, I deal with large volumes daily. GoldVault's bulk operations and batch processing have increased my efficiency by at least 40%.",
    rating: 5,
  },
  {
    name: "Sunita Gurung",
    role: "Jewellery Designer - Butwal",
    feedback:
      "I love how I can track each piece from design to sale. The client management system helps me maintain relationships with my customers and understand their preferences.",
    rating: 4,
  },
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Handle responsive display
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsToShow >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - itemsToShow : prevIndex - 1
    );
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [itemsToShow]);

  return (
    <section className="bg-gradient-to-br from-amber-50 to-amber-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">
            Trusted by Jewelers Across Nepal
          </h2>
          <p className="text-amber-600 max-w-2xl mx-auto">
            Discover why hundreds of jewelry businesses choose GoldVault to streamline their operations
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-amber-700 hover:bg-amber-800 text-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-amber-700 hover:bg-amber-800 text-white rounded-full p-2 shadow-lg transition-all"
            aria-label="Next testimonials"
          >
            <ChevronRight size={24} />
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-amber-200 hover:shadow-xl transition-all duration-300">
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex">
                          {Array.from({ length: testimonial.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-5 h-5 text-amber-500 fill-amber-500"
                            />
                          ))}
                          {Array.from({ length: 5 - testimonial.rating }).map((_, idx) => (
                            <Star
                              key={idx}
                              className="w-5 h-5 text-amber-300"
                            />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-amber-200" />
                      </div>
                      
                      <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                        "{testimonial.feedback}"
                      </p>
                    </div>
                    
                    <div className="bg-amber-50 px-6 py-4 border-t border-amber-100">
                      <h3 className="text-amber-800 font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-amber-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / itemsToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsToShow)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex >= index * itemsToShow && currentIndex < (index + 1) * itemsToShow
                  ? 'bg-amber-700 w-8'
                  : 'bg-amber-300'
              }`}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;