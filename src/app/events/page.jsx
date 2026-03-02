"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-12 text-center">All Events</h2>

      {loading ? (
        <div className="flex justify-center items-center text-lg">
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-semibold">{event.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {event.date} | {event.location}
                </p>
                <p className="mt-3 line-clamp-3 text-gray-700">
                  {event.description}
                </p>

                <Link href={`/events/${event.id}`}>
                  <Button
                    variant="outline"
                    className="mt-4 flex items-center gap-2"
                  >
                    <Eye size={18} /> View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
