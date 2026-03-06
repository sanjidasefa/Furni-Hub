import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// GET all events
export async function GET() {
  try {
    const { db, client } = await db();
    const events = await db.collection("events").find().toArray();
    // client.close();

    const formattedEvents = events.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      date: event.date,
      location: event.location,
      image: event.image,
      description: event.description,
    }));

    return NextResponse.json(formattedEvents);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// POST new event
export async function POST(req) {
  try {
    const { db, client } = await db();
    const data = await req.json();

    // Basic validation
    if (!data.title || !data.date || !data.location) {
      client.close();
      return NextResponse.json(
        { error: "Title, date, and location required" },
        { status: 400 }
      );
    }

    const result = await db.collection("events").insertOne({
      ...data,
      createdAt: new Date(),
    });

    client.close();
    return NextResponse.json(
      { message: "Event created", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
