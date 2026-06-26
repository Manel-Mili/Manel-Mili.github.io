import { Box, VStack, Image, Heading, Link, Stack, IconButton, Spacer, Text } from "@chakra-ui/react"
import { Tooltip } from "../../components/ui/tooltip"
import { FaGoogleScholar, FaLinkedinIn, FaOrcid } from "react-icons/fa6"
import { withBase } from "../../src/utils/basePath"

export default function Sidebar() {
  return (
    <Box
      w={{ base: "full", md: "1/4" }}
      position={{ md: "sticky" }}
      top="110px"  // Adjust top value as needed to avoid overlap with navbar
      h="fit-content" // Important so it does not take up the entire viewport height
    >
      <VStack gap="0">
        <Image
          src={withBase("/manel-mili.webp")}
          alt="Manel Mili"
          width={48}
          rounded="full"
          mb={8}
        />
        <Heading as="h1" size="2xl" mb={4}>
          Manel Mili
        </Heading>
        <Text>Ph.D. Student in Medical AI</Text>
        <Text textAlign="center">Laboratory of Medical Technologies and Imaging (LTIM)</Text>
        <Text>University of Monastir</Text>
        <Text color="fg.muted">Monastir, Tunisia</Text>
        <Spacer minH={4} />
        <Link href="mailto:manel.mili@isimm.u-monastir.tn">
          manel.mili@isimm.u-monastir.tn
        </Link>
        <Link href="tel:+21658621270">
          +216 58 621 270
        </Link>
        <Stack mt={6} direction="row" gap={4} flexWrap="wrap" justifyContent="center">
          <Tooltip content="Google Scholar">
            <Link href="https://scholar.google.com/citations?user=-kB49IMAAAAJ" target="_blank">
              <IconButton variant="surface" aria-label="Google Scholar">
                <FaGoogleScholar />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="LinkedIn">
            <Link href="https://www.linkedin.com/in/manel-mili-574b76414/" target="_blank">
              <IconButton variant="surface" aria-label="LinkedIn">
                <FaLinkedinIn />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip content="ORCID">
            <Link href="https://orcid.org/0000-0003-3892-8579" target="_blank">
              <IconButton variant="surface" aria-label="ORCID">
                <FaOrcid />
              </IconButton>
            </Link>
          </Tooltip>
        </Stack>
      </VStack>
    </Box>
  )
}
