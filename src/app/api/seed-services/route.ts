// app/api/seed-services/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const now = new Date().toISOString();

const coupons = [
    {
        id: "welcome15",
        code: "WELCOME15",
        type: "percent",
        value: 15,
        active: true,
        usageLimit: "unlimited",
        assignedCustomerIds: [],
        usedBy: [],
        expiresAt: "2026-08-31T18:30:00.000Z",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "petcare25",
        code: "PETCARE25",
        type: "flat",
        value: 25,
        active: true,
        usageLimit: "unlimited",
        assignedCustomerIds: [],
        usedBy: [],
        expiresAt: "2026-09-30T18:30:00.000Z",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "weekend30",
        code: "WEEKEND30",
        type: "percent",
        value: 30,
        active: true,
        usageLimit: "unlimited",
        assignedCustomerIds: [],
        usedBy: [],
        expiresAt: "2026-10-31T18:30:00.000Z",
        createdAt: now,
        updatedAt: now,
    },
];


export async function GET() {
    await Promise.all(
        coupons.map((coupon) =>
            setDoc(doc(db, "coupons", coupon.id), coupon)
        )
    );

    return NextResponse.json({
        success: true,
        inserted: coupons.length,
    });
}


