import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Heading,
  Divider,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface props {
  PageButtonRender: any;
  userRender: [];
}
export const Home: React.FC<props> = (props) => {
  return (
    <Box h="100vh" w="100%" backgroundColor="gray.100">
      <Box h="100%" w="75%" margin="auto">
        <Flex direction="column" marginBottom="2rem">
          <Heading padding="3rem" textAlign="center">
            Pagination
          </Heading>
          <Box
            width="30%"
            h="10px"
            backgroundColor="blue.200"
            borderRadius="10px"
            margin="auto"
            marginTop="-3rem"
          ></Box>
        </Flex>
        <Box>
          <Flex placeItems="center">
            {props.userRender.length > 1 ? props.userRender : ""}
          </Flex>
        </Box>
        <Box marginLeft="30rem" paddingBlock="5rem">
          <HStack margin="auto" placeItems="center">
            {props.PageButtonRender()}
          </HStack>
        </Box>
        <Link to="/Add">
          <Button
            padding="2.5em"
            marginLeft="43%"
            backgroundColor="blue.200"
            transition="0.5s"
            color="white"
            _hover={{
              boxShadow: "0.1em 0.1em 1em  #63b3ed",
            }}
          >
            Add User
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
