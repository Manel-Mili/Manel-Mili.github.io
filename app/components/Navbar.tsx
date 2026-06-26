// app/components/Navbar.tsx
import {
  Flex,
  Box,
  Spacer,
  Button,
  ButtonGroup,
  Link,
  IconButton,
  Container,
  ClientOnly,
} from "@chakra-ui/react";
import { ColorModeToggle } from "../../components/color-mode-toggle"
import { RiHome3Line } from "react-icons/ri";
import { GrDocumentPdf } from "react-icons/gr";
import { withBase } from "../../src/utils/basePath";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      bg="bg"
      borderBottomWidth={1}
    >
      <Container px={3}>
        <Flex
          align="center"
          justify="between"
          paddingY={4}
        >
          <Box>
            <ButtonGroup gap="0">
              <Link href={withBase("/")}><IconButton aria-label="Home" variant="ghost"><RiHome3Line /></IconButton></Link>
              <ClientOnly><ColorModeToggle /></ClientOnly>
            </ButtonGroup>
          </Box>

          <Spacer />

          <ButtonGroup gap="4">
            <Link href={withBase("/bio")} mr={4}>
              <Box display={{ base: "inline", md: "none" }}>Bio</Box>
              <Box display={{ base: "none", md: "inline" }}>Bio and Photo</Box>
            </Link>
            <Button asChild>
              <Link href={withBase("/Manel_Mili_CV.pdf")} target="_blank">CV<GrDocumentPdf /></Link>
            </Button>
          </ButtonGroup>

        </Flex>
      </Container>
    </Flex>
  );
};

export default Navbar;
