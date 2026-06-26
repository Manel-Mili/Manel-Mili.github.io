import { Flex, Container, Text, Link, Stack, Spacer } from "@chakra-ui/react";
import { withBase } from "../../src/utils/basePath";

const Footer = () => {
  return (
    <Flex as="footer" fontSize="sm" bg="bg.muted" py={8} color="fg" direction="column">
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", md: "row" }} alignItems="top">
          <Stack direction="column" gap={4} width={64}>
            <Text>
              &copy; {new Date().getFullYear()} Manel Mili
            </Text>
            <Text>
              Built with <Link href="https://nextjs.org/" target="_blank">Next.js</Link>, <Link href="https://chakra-ui.com/" target="_blank">chakra-ui</Link>, and <Link href="https://react-icons.github.io/react-icons/" target="_blank">react-icons</Link>.
            </Text>
          </Stack>
          <Spacer minH={6} />
          <Stack direction="column" gap={4} width={56}>
            <Link href="https://scholar.google.com/citations?user=-kB49IMAAAAJ" target="_blank">Google Scholar &#8599;</Link>
            <Link href="https://www.linkedin.com/in/manel-mili-574b76414/" target="_blank">LinkedIn &#8599;</Link>
            <Link href="https://orcid.org/0000-0003-3892-8579" target="_blank">ORCID &#8599;</Link>
            <Link href={withBase("/Manel_Mili_CV.pdf")} target="_blank">Curriculum Vitae &#8599;</Link>
          </Stack>
        </Flex>
      </Container>
      <Spacer minH={4} />
    </Flex>
  );
};

export default Footer;
