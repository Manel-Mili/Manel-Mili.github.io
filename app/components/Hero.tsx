"use client";

import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const INK = "#0E2A2E"; // deep clinical teal-ink
const AMBER = "#E8A23D"; // warm amber accent

/* Credibility anchors — fill in real numbers or remove the strip.
   Leaving placeholder values OUT on purpose; add only what's true. */
const ANCHORS = [
  // { value: "12", label: "Publications" },
  // { value: "350+", label: "Citations" },
];

export default function Hero() {
  return (
    <Box
      mb={10}
      position="relative"
      overflow="hidden"
      borderRadius="3xl"
      bg={INK}
      color="white"
      px={{ base: 8, md: 12 }}
      py={{ base: 10, md: 14 }}
    >
      {/* amber hairline at the top edge */}
      <Box position="absolute" top={0} left={0} right={0} h="4px" bg={AMBER} />

      {/* soft ambient glow, subject-flavored (imaging / depth) */}
      <Box
        position="absolute"
        top="-30%"
        right="-10%"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(232,162,61,0.18), transparent 70%)"
        pointerEvents="none"
      />

      <VStack align="start" gap={5} position="relative" maxW="760px">
        {/* Greeting eyebrow */}
        <HStack gap={3}>
          <Box w="28px" h="2px" bg={AMBER} borderRadius="full" />
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="0.2em"
            color="whiteAlpha.800"
          >
            Welcome
          </Text>
        </HStack>

        {/* The thesis — this is the hero's job */}
        <Heading
          as="h2"
          fontWeight="bold"
          letterSpacing="-0.025em"
          lineHeight="1.1"
          fontSize={{ base: "30px", md: "44px" }}
        >
          Making medical AI{" "}
          <Box as="span" color={AMBER}>
            explainable
          </Box>{" "}
          — and clinically trustworthy.
        </Heading>

        {/* Supporting statement */}
        <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.900" lineHeight="1.7">
          I develop multimodal, interpretable deep-learning methods for medical
          image analysis, with a focus on precision oncology — building models
          whose decisions clinicians can actually understand and act on.
        </Text>

        {/* Focus tags */}
        <HStack flexWrap="wrap" gap={2} pt={1}>
          {["Medical Imaging", "Deep Learning", "Explainable AI", "Precision Oncology"].map(
            (tag) => (
              <Box
                key={tag}
                px={3}
                py={1}
                borderRadius="full"
                border="1px solid"
                borderColor="whiteAlpha.300"
                fontSize="12px"
                fontWeight="semibold"
                color="whiteAlpha.900"
              >
                {tag}
              </Box>
            )
          )}
        </HStack>

        {/* Optional credibility anchors */}
        {ANCHORS.length > 0 && (
          <HStack gap={10} pt={4}>
            {ANCHORS.map(({ value, label }) => (
              <VStack key={label} align="start" gap={0}>
                <Text fontSize="28px" fontWeight="bold" color={AMBER} lineHeight="1">
                  {value}
                </Text>
                <Text
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="0.12em"
                  color="whiteAlpha.700"
                >
                  {label}
                </Text>
              </VStack>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
