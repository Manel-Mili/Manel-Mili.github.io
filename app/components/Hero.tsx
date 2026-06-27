"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FaGoogleScholar } from "react-icons/fa6";
import { withBase } from "../../src/utils/basePath";

export default function Hero() {
  return (
    <Box
      mb={10}
      p={10}
      borderRadius="3xl"
      bg="linear-gradient(135deg, #0f172a, #1e3a8a)"
      color="white"
    >
      <HStack
        gap={10}
        align="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Image
          src={withBase("/manel-mili.webp")}
          alt="Manel Mili"
          boxSize="220px"
          rounded="full"
          border="5px solid white"
          objectFit="cover"
        />

        <VStack align={{ base: "center", md: "start" }} gap={4}>
          <Heading size="2xl">
            Manel Mili
          </Heading>

          <Text fontSize="xl" fontWeight="bold">
            Artificial Intelligence Researcher
          </Text>

          <Text fontSize="lg">
            Medical Imaging • Deep Learning • Explainable AI
          </Text>

          <Text maxW="700px">
            Developing explainable and multimodal artificial intelligence
            methods for medical image analysis and precision oncology.
          </Text>

          <HStack mt={4} gap={4}>
            <Link
              href={withBase("/CV_Manel_Mili.pdf")}
              target="_blank"
            >
              <Button>
                Download CV
              </Button>
            </Link>

            <Link
              href="https://scholar.google.com/citations?user=-kB49IMAAAAJ"
              target="_blank"
            >
              <Button>
                <FaGoogleScholar />
              </Button>
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
