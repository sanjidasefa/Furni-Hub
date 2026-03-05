import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Armchair,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const footerSections = [
  {
    title: "Shop Categories",
    links: [
      { title: "Living Room", href: "/category/living" },
      { title: "Bedroom", href: "/category/bedroom" },
      { title: "Dining & Kitchen", href: "/category/dining" },
      { title: "Office Furniture", href: "/category/office" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { title: "Shipping Policy", href: "/shipping" },
      { title: "Return & Refund", href: "/returns" },
      { title: "Order Tracking", href: "/track-order" },
      { title: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Our Company",
    links: [
      { title: "About Us", href: "/about" },
      { title: "Our Showrooms", href: "/showrooms" },
      { title: "Contact Us", href: "/contact" },
      { title: "Bulk Orders", href: "/bulk" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-orange-100 bg-[#FDFBF9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section: Logo & Links */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-12 gap-y-12">
          
          {/* Brand Identity */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-[#5D4037] hover:opacity-80 transition-opacity">
              <Armchair className="h-8 w-8 text-orange-600" />
              <span>FurniHub</span>
            </Link>
            <p className="mt-6 text-stone-500 max-w-xs leading-relaxed">
              Crafting premium wood furniture for your dream home. Quality and comfort that lasts for generations.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-stone-600">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Barishal, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-stone-600">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-sm">+880 1234 567890</span>
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map(({ title, links }) => (
            <div key={title} className="lg:col-span-1">
              <h6 className="font-bold text-[#5D4037] uppercase text-xs tracking-widest">{title}</h6>
              <ul className="mt-6 space-y-4">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-stone-500 hover:text-orange-600 transition-colors text-sm"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="lg:col-span-1 min-w-[200px]">
            <h6 className="font-bold text-[#5D4037] uppercase text-xs tracking-widest">Join the Club</h6>
            <p className="mt-6 text-sm text-stone-500 mb-4">Subscribe to get special offers and wood care tips.</p>
            <form className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white border-orange-100 focus-visible:ring-orange-500"
              />
              <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="bg-orange-100" />

        {/* Bottom Section: Copyright & Socials */}
        <div className="py-8 flex flex-col-reverse md:flex-row items-center justify-between gap-y-6">
          <div className="text-stone-400 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="font-semibold text-[#5D4037]">
              FurniHub
            </Link>
            . All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-stone-400 hover:text-orange-600 transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-stone-400 hover:text-orange-600 transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-stone-400 hover:text-orange-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-stone-400 hover:text-orange-600 transition-colors">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};