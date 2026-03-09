"use client";
import { Star, Quote, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TestimonialsPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Interior Designer",
      comment: "The quality of the oak dining table I received exceeded my expectations. The finish is smooth, and the build is incredibly sturdy. Furni-Hub is now my go-to for client projects!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "David Miller",
      role: "Home Owner",
      comment: "Fast delivery and excellent customer service. The minimalist sofa fits perfectly in my living room. I love how 100% responsive the website is—making shopping so easy!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Alina Gomez",
      role: "Lifestyle Blogger",
      comment: "Furni-Hub combines modern aesthetics with comfort. Their attention to detail in craftsmanship is rare these days. Highly recommended for anyone looking for premium furniture.",
      rating: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
            <MessageSquare size={16} />
            Client Stories
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#5D4037] leading-tight">
            What Our <span className="text-orange-600">Customers Say.</span>
          </h1>
          <p className="text-stone-500 text-lg mt-6 max-w-2xl mx-auto">
            Real feedback from real people. We take pride in delivering elegance and comfort to every home we touch.
          </p>
        </div>

        {/* --- Testimonials Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-10 rounded-[3rem] border border-orange-50 shadow-xl shadow-orange-900/5 relative group hover:-translate-y-2 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-10 text-orange-100 w-16 h-16 group-hover:text-orange-200 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`${i < review.rating ? "text-orange-500 fill-orange-500" : "text-stone-200"}`} 
                  />
                ))}
              </div>

              <p className="text-stone-600 italic leading-relaxed mb-8 relative z-10">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 border-t border-orange-50 pt-8">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-black text-[#5D4037] text-lg">{review.name}</h4>
                  <p className="text-orange-600 text-sm font-bold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Call to Action --- */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-black text-[#5D4037] mb-8">Want to share your experience?</h2>
          <Link href="/contact">
            <Button className="bg-[#5D4037] hover:bg-orange-600 text-white px-10 py-7 rounded-2xl text-lg font-bold flex items-center gap-2 mx-auto">
              Write a Review <ArrowRight size={20} />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}