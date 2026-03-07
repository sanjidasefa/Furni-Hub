import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Get event by ID
export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const { client, db } = await mongoConnect();
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });
    client.close();

    if (!event)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const formattedEvent = {
      id: event._id.toString(),
      title: event.title,
      date: event.date,
      location: event.location,
      image: event.image,
      description: event.description,
    };

    return NextResponse.json(formattedEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params;

    const { db, client } = await mongoConnect();
    const data = await req.json();

    const result = await db
      .collection("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });

    client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    const { db, client } = await mongoConnect();

    const result = await db
      .collection("events")
      .deleteOne({ _id: new ObjectId(id) });
    client.close();

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Event deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
