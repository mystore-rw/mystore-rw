export function getWhatsAppUrl(phone: string, productName: string, shopName: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const intl = cleaned.startsWith("0")
    ? `250${cleaned.slice(1)}`
    : cleaned.startsWith("250")
    ? cleaned
    : `250${cleaned}`;

  const message = `Hi ${shopName}! 👋\n\nI saw your *${productName}* on MyStore RW.\n\nIs it available? What's the price?`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}

export function getShopWhatsAppUrl(phone: string, shopName: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const intl = cleaned.startsWith("0")
    ? `250${cleaned.slice(1)}`
    : cleaned.startsWith("250")
    ? cleaned
    : `250${cleaned}`;

  const message = `Hi ${shopName}! 👋\n\nI found your shop on MyStore RW. I'd like to know more about what you sell.`;
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}
