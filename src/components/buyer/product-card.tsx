"use client";

import { Box, Text, VStack, HStack, Badge, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface Props {
  product: {
    id: string;
    name: string;
    price?: number | null;
    images: string[];
    category: string;
    shopId: string;
    shopName: string;
    shopPhone: string;
    isAvailable: boolean;
  };
}

export function ProductCard({ product }: Props) {
  const waUrl = getWhatsAppUrl(product.shopPhone, product.name, product.shopName);

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      borderColor="#e5e7eb"
      transition="all 0.2s"
      _hover={{ shadow: "md", transform: "translateY(-2px)", borderColor: "#16a34a" }}
      position="relative"
    >
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <Box position="relative" aspectRatio={1} bg="gray.50">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <Box
              w="full"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="3xl"
            >
              🛍️
            </Box>
          )}
          {!product.isAvailable && (
            <Badge
              position="absolute"
              top={2} left={2}
              colorPalette="red"
              variant="solid"
              borderRadius="full"
            >
              Unavailable
            </Badge>
          )}
        </Box>
      </Link>

      {/* Info */}
      <VStack align="start" p={3} gap={2}>
        <Link href={`/product/${product.id}`} style={{ width: "100%" }}>
          <Text fontSize="sm" fontWeight="600" color="#111827" lineClamp={2}>
            {product.name}
          </Text>
          <Text fontSize="xs" color="#6b7280" mt={0.5}>{product.shopName}</Text>
        </Link>

        {/* Price or "Ask for price" */}
        {product.price ? (
          <Text fontWeight="700" color="green.600" fontSize="sm">
            {product.price.toLocaleString()} RWF
          </Text>
        ) : (
          <Text fontSize="xs" color="#9ca3af" fontStyle="italic">
            Ask for price
          </Text>
        )}

        {/* WhatsApp CTA */}
        {product.isAvailable && (
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", textDecoration: "none", marginTop: "4px" }}>
            <Flex
              align="center"
              justify="center"
              gap={1.5}
              w="full"
              py={2}
              bg="#25D366"
              color="white"
              borderRadius="lg"
              fontWeight="700"
              fontSize="xs"
              cursor="pointer"
              _hover={{ bg: "#20b958" }}
              transition="background 0.18s"
            >
              <WhatsAppIcon size={13} color="white" />
              Chat on WhatsApp
            </Flex>
          </a>
        )}
      </VStack>
    </Box>
  );
}
