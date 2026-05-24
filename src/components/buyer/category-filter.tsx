"use client";

import { HStack, Button } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "🥦 Produce", value: "PRODUCE" },
  { label: "👗 Fashion", value: "FASHION" },
  { label: "💄 Beauty", value: "BEAUTY" },
  { label: "📱 Electronics", value: "ELECTRONICS" },
  { label: "🍔 Food & Drinks", value: "FOOD_DRINKS" },
  { label: "📦 Other", value: "OTHER" },
];

interface Props {
  neighborhood: string;
  activeCategory?: string;
}

export function CategoryFilter({ neighborhood, activeCategory }: Props) {
  const router = useRouter();

  const handleSelect = (value: string) => {
    const params = value ? `?category=${value}` : "";
    router.push(`/${neighborhood}${params}`);
  };

  return (
    <HStack gap={2} mb={6} flexWrap="wrap">
      {CATEGORIES.map((cat) => (
        <Button
          key={cat.value}
          size="sm"
          variant={activeCategory === cat.value || (!activeCategory && !cat.value) ? "solid" : "outline"}
          colorPalette={activeCategory === cat.value || (!activeCategory && !cat.value) ? "green" : "gray"}
          borderRadius="full"
          onClick={() => handleSelect(cat.value)}
        >
          {cat.label}
        </Button>
      ))}
    </HStack>
  );
}
