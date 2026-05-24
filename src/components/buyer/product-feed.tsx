"use client";

import { SimpleGrid, Box, Text, VStack } from "@chakra-ui/react";
import { PackageSearch } from "lucide-react";
import { ProductCard } from "./product-card";

interface Props {
  neighborhood: string;
  category?: string;
}

// placeholder — will be replaced with real data fetching
const MOCK_PRODUCTS: never[] = [];

export function ProductFeed({ neighborhood, category }: Props) {
  if (MOCK_PRODUCTS.length === 0) {
    return (
      <VStack gap={4} py={20} color="fg.muted" textAlign="center">
        <PackageSearch size={48} strokeWidth={1} />
        <Text fontSize="lg" fontWeight="medium">
          No products yet in this neighborhood
        </Text>
        <Text fontSize="sm">
          Be the first vendor to list here!
        </Text>
      </VStack>
    );
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} gap={4}>
      {/* ProductCard components will render here */}
    </SimpleGrid>
  );
}
