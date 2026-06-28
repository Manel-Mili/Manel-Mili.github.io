"use client";

import {
  Box,
  Container,
  VStack,
  Image,
  Heading,
  Text,
  Link,
  Separator,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCopy } from "react-icons/fa6";
import { useState } from "react";
import { Tooltip } from "../../components/ui/tooltip";
import { withBase } from "../../src/utils/basePath";

export default function BioPage() {
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedFr, setCopiedFr] = useState(false);

  const bioEnglish = `Manel Mili is a Ph.D. student at the Faculty of Sciences of Monastir and a member of the Laboratory of Medical Technologies and Imaging (LTIM-LR12ES06) at the Faculty of Medicine, University of Monastir, Tunisia. Her doctoral thesis addresses the prediction of MGMT status in gliomas using artificial intelligence.

Her research focuses on artificial intelligence and computer vision applied to medical image processing. She specializes in predictive modeling, classification, and data mining, with strong expertise in deep learning, machine learning, and data visualization. Passionate about innovative problem-solving, she strives to advance methodologies that enhance decision-making and drive impactful results in research.

In 2025 she carried out a research internship at the U2IS laboratory of ENSTA Paris (Polytechnic Institute of Paris), working on mechanistic interpretability applied to multimodal data for MGMT status prediction. Alongside her research she has taught data science, statistical programming, web services, databases, and cloud computing as a contract and adjunct lecturer at FSM and ISIMM.`;

  const bioFrench = `Manel Mili est doctorante à la Faculté des Sciences de Monastir et membre du Laboratoire de Technologies et Imagerie Médicale (LTIM-LR12ES06) à la Faculté de Médecine de l'Université de Monastir, en Tunisie. Sa thèse porte sur la prédiction du statut MGMT dans les gliomes à l'aide de l'intelligence artificielle.

Ses recherches portent sur l'intelligence artificielle et la vision par ordinateur appliquées au traitement d'images médicales. Elle est spécialisée dans la modélisation prédictive, la classification et la fouille de données, avec une solide expertise en apprentissage profond, apprentissage automatique et visualisation de données.

En 2025, elle a effectué un stage de recherche au laboratoire U2IS de l'ENSTA Paris (Institut Polytechnique de Paris), portant sur l'interprétabilité mécaniste appliquée aux données multimodales pour la prédiction du statut MGMT. En parallèle de ses recherches, elle enseigne en tant que vacataire à la FSM et à l'ISIMM.`;

  const handleCopy = (text: string, lang: 'en' | 'fr') => {
    navigator.clipboard.writeText(text);
    if (lang === 'en') {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    } else {
      setCopiedFr(true);
      setTimeout(() => setCopiedFr(false), 2000);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8} align="stretch">
        <Link href={withBase("/")} alignSelf="flex-start" display="flex" alignItems="center" gap={2}>
          <FaArrowLeft /> Back to Home
        </Link>

        <Heading as="h1" size="3xl" textAlign="center">
          Bio and Photo
        </Heading>

        <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={8}>
          {/* Bio Section - 2/3 width on desktop */}
          <Box flex={{ base: "1", md: "2" }}>
            <VStack gap={8} align="stretch">
              <Box>
                <HStack justify="space-between" mb={4}>
                  <Heading as="h2" size="xl">
                    Bio (English)
                  </Heading>
                  <Tooltip content={copiedEn ? "Copied!" : "Copy to clipboard"}>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      aria-label="Copy English bio"
                      onClick={() => handleCopy(bioEnglish, 'en')}
                    >
                      <FaCopy />
                    </IconButton>
                  </Tooltip>
                </HStack>
                <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-wrap">
                  {bioEnglish}
                </Text>
              </Box>

              <Separator />

              <Box>
                <HStack justify="space-between" mb={4}>
                  <Heading as="h2" size="xl">
                    Bio (Français)
                  </Heading>
                  <Tooltip content={copiedFr ? "Copied!" : "Copy to clipboard"}>
                    <IconButton
                      variant="ghost"
                      size="sm"
                      aria-label="Copy French bio"
                      onClick={() => handleCopy(bioFrench, 'fr')}
                    >
                      <FaCopy />
                    </IconButton>
                  </Tooltip>
                </HStack>
                <Text fontSize="lg" lineHeight="tall" whiteSpace="pre-wrap">
                  {bioFrench}
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Photo Section - 1/3 width on desktop */}
          <Box flex={{ base: "1", md: "1" }} position={{ md: "sticky" }} top="100px" h="fit-content">
            <VStack gap={6}>
              <Heading as="h2" size="lg" mb={2}>
                Profile Photo
              </Heading>
              <Box w="100%">
                <Image
                  src={withBase("/manel-mili.webp")}
                  alt="Manel Mili"
                  width="100%"
                  maxW={{ base: "300px", md: "240px" }}
                  mx="auto"
                  rounded="lg"
                  shadow="md"
                />
              </Box>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}
