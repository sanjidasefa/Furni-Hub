"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowSuccess(false);

    // এটি মূলত একটি ডেমো। আপনি চাইলে /api/contact এ পোস্ট করতে পারেন।
    console.log("Contact Form Data:", formData);

    // ১.৫ সেকেন্ড লোডিং সিমুলেশন
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      // ফর্ম রিসেট করা
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us Anytime",
      value: "+880 123 456 789",
      description: "Available Mon-Fri, 9am - 6pm",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      value: "support@furnihub.com",
      description: "We'll reply within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Showroom",
      value: "Gulshan-1, Dhaka, Bangladesh",
      description: "Open Sat-Thu, 10am - 8pm",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <MessageSquare size={16} />
            Connect With Us
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#5D4037] tracking-tight">
            We're Here to Help
          </h1>
        </div>
        <p className="text-stone-500 mt-4 text-lg max-w-2xl mx-auto">
          Have a question about our collections or need support? Reach out via
          the form or our direct contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* --- Contact Info Cards (Left Side) --- */}
        <div className="lg:col-span-1 space-y-8">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[2rem] border border-orange-50 shadow-xl shadow-orange-900/5 flex items-start gap-6"
            >
              <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-black text-[#5D4037] text-xl">
                  {item.title}
                </h3>
                <p className="text-orange-700 font-bold mt-1 text-base">
                  {item.value}
                </p>
                <p className="text-stone-500 text-sm mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Contact Form (Right Side) --- */}
        <div className="lg:col-span-2 bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-orange-900/5 border border-orange-50">
          <h2 className="text-3xl font-black text-[#5D4037] mb-8 flex items-center gap-3">
            <Send className="text-orange-600" />
            Send Us a Message
          </h2>

          {showSuccess && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 size={20} />
              <span className="font-bold">
                Thank you! Your message has been sent successfully. We'll get
                back to you soon.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037] ml-1">
                  Your Full Name
                </label>
                <Input
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-xl border-orange-100 focus:ring-orange-600 py-6"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#5D4037] ml-1">
                  Email Address
                </label>
                <Input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-xl border-orange-100 py-6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037] ml-1">
                Subject
              </label>
              <Input
                required
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="rounded-xl border-orange-100 py-6"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#5D4037] ml-1">
                Your Message
              </label>
              <Textarea
                required
                placeholder="Write your detailed message here..."
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="rounded-2xl border-orange-100 resize-none p-5"
              />
            </div>

            <Button
              disabled={loading}
              className="w-full md:w-auto bg-[#5D4037] hover:bg-orange-600 text-white py-8 px-10 rounded-2xl text-lg font-bold transition-all mt-4 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending
                  Message...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Inquiry
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
