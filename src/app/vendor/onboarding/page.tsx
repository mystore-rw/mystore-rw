"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
  Button,
  Field,
  NativeSelect,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const NEIGHBORHOODS = ["Kimironko", "Remera", "Nyabugogo", "Gikondo", "Kacyiru", "Muhima"];

const PERKS = [
  { emoji: "📸", text: "Post photos — price is optional" },
  { emoji: "💬", text: "Buyers chat you directly on WhatsApp" },
  { emoji: "🆓", text: "Free to join · zero commission" },
  { emoji: "⚡", text: "Live in under 5 minutes" },
];

type State =
  | { step: "form"; error?: string }
  | { step: "success"; shopName: string; whatsapp: string; shopSlug: string };

export default function VendorOnboardingPage() {
  const [state, setState] = useState<State>({ step: "form" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setState({ step: "form" });

    const form = e.currentTarget;
    const data = {
      shopName: (form.elements.namedItem("shopName") as HTMLInputElement).value,
      whatsappNumber: (form.elements.namedItem("whatsappNumber") as HTMLInputElement).value,
      neighborhood: (form.elements.namedItem("neighborhood") as HTMLSelectElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/vendor/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setState({ step: "form", error: json.error ?? "Something went wrong." });
      } else {
        setState({
          step: "success",
          shopName: json.shopName,
          whatsapp: data.whatsappNumber,
          shopSlug: json.shopSlug,
        });
      }
    } catch {
      setState({ step: "form", error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ───────────────────────────────────────
  if (state.step === "success") {
    return (
      <Box minH="100vh" bg="#FAFAF7">
        <Navbar />
        <Box maxW="xl" mx="auto" px={{ base: 5, md: 8 }} py={16} textAlign="center">
          <style>{`
            @keyframes popIn {
              0%   { transform: scale(0.5); opacity: 0; }
              70%  { transform: scale(1.1); }
              100% { transform: scale(1);   opacity: 1; }
            }
            @keyframes fadeUp {
              from { opacity: 0; transform: translateY(16px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .pop-in  { animation: popIn  0.5s cubic-bezier(.34,1.56,.64,1) both; }
            .fade-up-1 { animation: fadeUp 0.5s 0.3s ease both; }
            .fade-up-2 { animation: fadeUp 0.5s 0.45s ease both; }
            .fade-up-3 { animation: fadeUp 0.5s 0.6s ease both; }
            .fade-up-4 { animation: fadeUp 0.5s 0.75s ease both; }
          `}</style>

          {/* Big checkmark */}
          <Flex justify="center" mb={6} className="pop-in">
            <Box
              w={20} h={20}
              bg="#25D366"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              shadow="0 8px 32px rgba(37,211,102,0.35)"
            >
              <CheckCircle size={40} color="white" strokeWidth={2.5} />
            </Box>
          </Flex>

          <Heading fontSize="3xl" fontWeight="900" color="#111827" mb={3} className="fade-up-1">
            Shop submitted! 🎉
          </Heading>
          <Text fontSize="lg" color="#4b5563" mb={8} className="fade-up-2">
            <Text as="span" fontWeight="700" color="#111827">{state.shopName}</Text> is now
            in the review queue. We'll approve it within 24 hours.
          </Text>

          {/* What happens next */}
          <VStack gap={4} mb={10} className="fade-up-3">
            {[
              {
                icon: <Clock size={18} color="#f59e0b" />,
                bg: "#fffbeb",
                border: "#fde68a",
                title: "Under review (up to 24 hrs)",
                desc: "Our team checks your shop details.",
              },
              {
                icon: <WhatsAppIcon size={18} color="#25D366" />,
                bg: "#f0fdf4",
                border: "#bbf7d0",
                title: `WhatsApp confirmation to ${state.whatsapp}`,
                desc: "We'll message you once your shop goes live.",
              },
              {
                icon: <span style={{ fontSize: "18px" }}>📸</span>,
                bg: "#eff6ff",
                border: "#bfdbfe",
                title: "Start adding your products",
                desc: "Upload photos as soon as you're approved.",
              },
            ].map((item) => (
              <HStack
                key={item.title}
                align="start"
                gap={4}
                p={4}
                bg={item.bg}
                borderWidth="1px"
                borderColor={item.border}
                borderRadius="xl"
                w="full"
                textAlign="left"
              >
                <Box
                  w={9} h={9}
                  bg="white"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  shadow="sm"
                >
                  {item.icon}
                </Box>
                <VStack align="start" gap={0.5}>
                  <Text fontSize="sm" fontWeight="700" color="#111827">{item.title}</Text>
                  <Text fontSize="xs" color="#6b7280">{item.desc}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>

          {/* WhatsApp message preview */}
          <Box
            bg="#e5ddd5"
            borderRadius="2xl"
            p={5}
            mb={8}
            textAlign="left"
            className="fade-up-3"
            position="relative"
            overflow="hidden"
          >
            <Text fontSize="xs" color="#6b7280" mb={3} fontWeight="600" textTransform="uppercase" letterSpacing="0.08em">
              Preview — what buyers will see
            </Text>
            <Box bg="white" borderRadius="xl" p={4} shadow="sm">
              <HStack gap={3} mb={3}>
                <Box
                  w={10} h={10}
                  bg="#25D366"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="lg"
                  flexShrink={0}
                >
                  🏪
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" fontWeight="700" color="#111827">{state.shopName}</Text>
                  <Text fontSize="xs" color="#6b7280">MyStore RW vendor</Text>
                </VStack>
              </HStack>
              <Box
                bg="#dcf8c6"
                borderRadius="lg"
                p={3}
                fontSize="sm"
                color="#111827"
                lineHeight="1.6"
              >
                Hi <Text as="span" fontWeight="700">{state.shopName}</Text>! 👋{"\n\n"}
                I saw your product on MyStore RW.{"\n"}
                Is it available? What&apos;s the price?
              </Box>
              <Text fontSize="xs" color="#9ca3af" mt={2} textAlign="right">
                Delivered via WhatsApp ✓
              </Text>
            </Box>
          </Box>

          {/* Actions */}
          <VStack gap={3} className="fade-up-4">
            <Link href="/vendor/dashboard" style={{ width: "100%" }}>
              <Flex
                align="center"
                justify="center"
                gap={2}
                w="full"
                py={3.5}
                bg="#111827"
                color="white"
                borderRadius="xl"
                fontWeight="700"
                fontSize="sm"
                cursor="pointer"
                _hover={{ bg: "#1f2937" }}
                transition="background 0.18s"
              >
                Go to your dashboard
                <ArrowRight size={15} />
              </Flex>
            </Link>
            <Link href="/" style={{ width: "100%" }}>
              <Flex
                align="center"
                justify="center"
                w="full"
                py={3}
                color="#6b7280"
                fontSize="sm"
                cursor="pointer"
                fontWeight="500"
              >
                Back to homepage
              </Flex>
            </Link>
          </VStack>
        </Box>
      </Box>
    );
  }

  // ── Form screen ──────────────────────────────────────────
  return (
    <Box minH="100vh" bg="#FAFAF7">
      <Navbar />

      <Box maxW="5xl" mx="auto" px={{ base: 5, md: 10 }} py={12}>
        <Flex direction={{ base: "column", md: "row" }} gap={12} align="start">

          {/* Left — value prop */}
          <VStack align="start" gap={6} flex={1} pt={2}>
            <Box>
              <Flex align="center" gap={2} mb={4}>
                <WhatsAppIcon size={28} color="#25D366" />
                <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="900" color="#111827">
                  List your shop.{" "}<br />
                  Buyers come to you.
                </Heading>
              </Flex>
              <Text color="#6b7280" fontSize="md" lineHeight="1.75">
                Post your products on MyStore RW and let buyers in your
                neighborhood find you. They tap once — you get a WhatsApp
                message. That&apos;s it.
              </Text>
            </Box>

            <VStack align="start" gap={3} w="full">
              {PERKS.map((p) => (
                <HStack
                  key={p.text}
                  gap={3}
                  p={4}
                  bg="white"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="#e5e7eb"
                  w="full"
                >
                  <Text fontSize="xl">{p.emoji}</Text>
                  <Text fontSize="sm" fontWeight="600" color="#374151">{p.text}</Text>
                </HStack>
              ))}
            </VStack>

            <Box p={5} bg="#f0fdf4" borderRadius="xl" borderWidth="1px" borderColor="#bbf7d0" w="full">
              <Text fontSize="sm" color="#15803d" fontWeight="700" mb={1}>
                💡 How it works for you
              </Text>
              <Text fontSize="sm" color="#166534" lineHeight="1.7">
                A buyer sees your product → taps &quot;Chat on WhatsApp&quot; → you get
                a message. Discuss price, arrange delivery, get paid your way.
              </Text>
            </Box>
          </VStack>

          {/* Right — form */}
          <Box
            flex={1}
            bg="white"
            borderRadius="2xl"
            borderWidth="1.5px"
            borderColor="#e5e7eb"
            p={8}
            shadow="sm"
          >
            <Heading fontSize="xl" fontWeight="800" color="#111827" mb={1}>
              Open your shop
            </Heading>
            <Text fontSize="sm" color="#6b7280" mb={6}>
              Free to join · Live in minutes
            </Text>

            {state.error && (
              <Box
                mb={5}
                p={4}
                bg="#fef2f2"
                borderWidth="1px"
                borderColor="#fecaca"
                borderRadius="lg"
              >
                <Text fontSize="sm" color="#dc2626" fontWeight="600">
                  {state.error}
                </Text>
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <VStack gap={5} align="stretch">
                <Field.Root required>
                  <Field.Label fontWeight="600" fontSize="sm">Shop Name</Field.Label>
                  <Input
                    placeholder="e.g. Mama Janet's Boutique"
                    name="shopName"
                    borderRadius="lg"
                    borderColor="#e5e7eb"
                    _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                  />
                </Field.Root>

                <Field.Root required>
                  <Field.Label fontWeight="600" fontSize="sm">
                    WhatsApp Number
                  </Field.Label>
                  <Input
                    placeholder="e.g. 0788 123 456"
                    name="whatsappNumber"
                    type="tel"
                    borderRadius="lg"
                    borderColor="#e5e7eb"
                    _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                  />
                  <Field.HelperText color="#6b7280" fontSize="xs">
                    Buyers will contact you on this number
                  </Field.HelperText>
                </Field.Root>

                <Field.Root required>
                  <Field.Label fontWeight="600" fontSize="sm">Neighborhood</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      name="neighborhood"
                      placeholder="Select your neighborhood"
                      borderRadius="lg"
                      borderColor="#e5e7eb"
                    >
                      {NEIGHBORHOODS.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root>
                  <Field.Label fontWeight="600" fontSize="sm">What do you sell?</Field.Label>
                  <Textarea
                    placeholder="e.g. Fresh vegetables, fruits, eggs — direct from farm..."
                    name="description"
                    rows={3}
                    borderRadius="lg"
                    borderColor="#e5e7eb"
                    _focus={{ borderColor: "#25D366", boxShadow: "0 0 0 1px #25D366" }}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  w="full"
                  size="lg"
                  bg="#25D366"
                  color="white"
                  fontWeight="800"
                  borderRadius="xl"
                  loading={loading}
                  loadingText="Creating your shop..."
                  _hover={{ bg: "#20b958" }}
                  gap={2}
                >
                  <WhatsAppIcon size={18} color="white" />
                  Open My Shop Free →
                </Button>

                <Text fontSize="xs" color="#9ca3af" textAlign="center">
                  Your shop will be reviewed and approved within 24 hours.
                </Text>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
