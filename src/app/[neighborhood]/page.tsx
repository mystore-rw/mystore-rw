import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { CategoryFilter } from "@/components/buyer/category-filter";
import { ProductFeed } from "@/components/buyer/product-feed";

interface Props {
  params: Promise<{ neighborhood: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function NeighborhoodPage({ params, searchParams }: Props) {
  const { neighborhood } = await params;
  const { category } = await searchParams;

  const neighborhoodName =
    neighborhood.charAt(0).toUpperCase() + neighborhood.slice(1);

  return (
    <Box minH="100vh" bg="bg">
      <Navbar />

      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        {/* Header */}
        <VStack align="start" gap={1} mb={6}>
          <HStack color="fg.muted" fontSize="sm">
            <MapPin size={14} />
            <Text>Kigali · {neighborhoodName}</Text>
          </HStack>
          <Heading size="xl">{neighborhoodName} Market</Heading>
          <Text color="fg.muted">
            Fresh products from trusted vendors in your neighborhood
          </Text>
        </VStack>

        {/* Category Filter */}
        <CategoryFilter neighborhood={neighborhood} activeCategory={category} />

        {/* Product Feed */}
        <ProductFeed neighborhood={neighborhood} category={category} />
      </Box>
    </Box>
  );
}
