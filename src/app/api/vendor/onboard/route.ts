import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { shopName, whatsappNumber, neighborhood, description } = body;

    if (!shopName?.trim() || !whatsappNumber?.trim() || !neighborhood?.trim()) {
      return NextResponse.json({ error: "Shop name, WhatsApp number and neighborhood are required." }, { status: 400 });
    }

    // Find neighborhood
    const hood = await prisma.neighborhood.findFirst({
      where: { name: { equals: neighborhood, mode: "insensitive" } },
    });
    if (!hood) {
      return NextResponse.json({ error: "Neighborhood not found." }, { status: 404 });
    }

    // Build a URL-safe slug
    const baseSlug = shopName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existing = await prisma.shop.findUnique({ where: { slug: baseSlug } });
    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    // Normalize phone → store digits only
    const cleanPhone = whatsappNumber.replace(/\D/g, "");

    // Find or create a user by phone
    let user = await prisma.user.findUnique({ where: { phone: cleanPhone } });
    if (!user) {
      user = await prisma.user.create({
        data: { phone: cleanPhone, name: shopName.trim(), role: "VENDOR" },
      });
    }

    // Block duplicate shops
    const existingShop = await prisma.shop.findUnique({ where: { ownerId: user.id } });
    if (existingShop) {
      return NextResponse.json(
        { error: "A shop is already registered for this WhatsApp number.", shopSlug: existingShop.slug },
        { status: 409 }
      );
    }

    const shop = await prisma.shop.create({
      data: {
        name: shopName.trim(),
        slug,
        whatsappNumber: cleanPhone,
        description: description?.trim() || null,
        neighborhoodId: hood.id,
        ownerId: user.id,
        isApproved: false,
      },
    });

    return NextResponse.json({ success: true, shopSlug: shop.slug, shopName: shop.name });
  } catch (err) {
    console.error("[onboard]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
