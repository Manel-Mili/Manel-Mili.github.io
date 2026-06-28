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

  const bioEnglish = `Hi, I'm Manel Mili, a Ph.D. candidate in Artificial Intelligence and Medical Imaging at the University of Monastir, Tunisia, and a researcher at the Laboratory of Medical Technologies and Imaging (LTIM).

My work lies at the intersection of artificial intelligence, computer vision, and healthcare, where I develop intelligent systems capable of transforming complex medical data into meaningful clinical insights. My current research focuses on predicting MGMT promoter methylation status in gliomas using multimodal AI models, with a particular interest in explainable and trustworthy artificial intelligence.

Beyond building accurate models, I am passionate about understanding why they make their decisions. This curiosity led me to conduct a research internship at U2IS – ENSTA Paris (Institut Polytechnique de Paris), where I explored mechanistic interpretability for multimodal medical AI.

Alongside my research, I enjoy sharing knowledge through teaching, mentoring, and collaborating with multidisciplinary teams. Over the years, I have taught courses in data science, machine learning, databases, cloud computing, and software engineering while contributing to international research projects and scientific publications.

I believe that the future of artificial intelligence is not only about creating smarter algorithms but also about building systems that are transparent, reliable, and capable of making a real impact on people's lives. Whether I'm developing new deep learning models, exploring explainable AI, or working with medical experts, my goal remains the same: to bridge cutting-edge AI research with meaningful healthcare innovation.`;

  const bioFrench = `Bonjour, je suis Manel Mili, doctorante en intelligence artificielle et imagerie médicale à l'Université de Monastir (Tunisie) et membre du Laboratoire de Technologies et d'Imagerie Médicale (LTIM).

Mes recherches se situent à l'intersection de l'intelligence artificielle, de la vision par ordinateur et de la santé, avec pour objectif de développer des solutions capables d'extraire des informations pertinentes à partir de données médicales complexes. Ma thèse porte sur la prédiction du statut de méthylation du promoteur MGMT dans les gliomes grâce à des approches d'intelligence artificielle multimodales, en accordant une attention particulière à l'IA explicable et digne de confiance.

Au-delà des performances des modèles, je cherche à comprendre comment et pourquoi ils prennent leurs décisions. Cette démarche m'a conduite à effectuer un stage de recherche au laboratoire U2IS de l'ENSTA Paris (Institut Polytechnique de Paris), où j'ai travaillé sur l'interprétabilité mécaniste appliquée à l'intelligence artificielle multimodale.

En parallèle de mes activités de recherche, j'aime transmettre mes connaissances à travers l'enseignement, l'encadrement et les collaborations scientifiques. J'ai eu l'opportunité d'enseigner la science des données, l'apprentissage automatique, les bases de données, le cloud computing et le génie logiciel, tout en contribuant à plusieurs publications scientifiques et projets de recherche internationaux.

Je suis convaincue que l'avenir de l'intelligence artificielle ne repose pas uniquement sur des modèles plus performants, mais sur des systèmes fiables, explicables et utiles. Mon ambition est de faire le lien entre la recherche de pointe en IA et des applications concrètes capables d'améliorer les soins de santé et d'avoir un impact positif sur la vie des patients.`;

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
