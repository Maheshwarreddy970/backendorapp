import { NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.slug) {
      return NextResponse.json(
        { error: "Missing 'slug' in the request body" },
        { status: 400 }
      );
    }

    const websiteDocRef = doc(db, "websites", data.slug);
    const snap = await getDoc(websiteDocRef);
    const existing = snap.exists() ? snap.data() : {};
    const now = new Date().toISOString();

    const payload: Record<string, unknown> = {
      slug: data.slug,
      lastUpdated: now,
    };

    if (data.websiteOneData) payload.websiteOneData = data.websiteOneData;
    if (data.websiteTwoData) payload.websiteTwoData = data.websiteTwoData;
    if (data.emailCampaign) payload.emailCampaign = data.emailCampaign;

    // Starting defaults. Only fill fields the document doesn't have yet,
    // so re-running the workflow never overrides a deliberate change.
    const defaults: Record<string, unknown> = {
      clientName: data.clientName ?? "",
      ownerEmail: data.ownerEmail ?? "",
      customDomain: "",
      domainStatus: "none",
      isDeployed: true,
      lastDeployed: now,
      paid: false,
      template: "websiteOne",
    };

    for (const [key, value] of Object.entries(defaults)) {
      if (existing[key] === undefined) payload[key] = value;
    }

    await setDoc(websiteDocRef, payload, { merge: true });

    return NextResponse.json(
      { success: true, message: `Successfully saved data for ${data.slug}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Failed to save to Firebase." },
      { status: 500 }
    );
  }
}