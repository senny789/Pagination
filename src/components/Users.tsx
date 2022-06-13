import React from "react";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface props {
  id: 1;
  name: string;
  username: string;
  email: string;
  address: {
    street: "Kulas Light";
    city: "Gwenborough";
  };
}

export const Users: React.FC<Partial<props>> = (props) => {
  const image = `https://picsum.photos/id/237/200/`;
  const link = `/Edit/${props.id}`;
  return (
    <Box
      w="35%"
      placeItems="center"
      backgroundColor="white"
      marginInline="1em"
      border="0.1px solid #CBD5E0"
      borderRadius="20px"
      transition="0.3s"
      padding="1em"
      _hover={{
        backgroundColor: "gray.100",
        boxShadow: "0.4em 0.4em 1em  black",
      }}
    >
      <Link to={link}>
        <Flex placeItems="center" direction="column" mb="4em">
          <Image src={image} borderRadius="50%" marginBottom="0.5em"></Image>
          <Box color="gray.500">
            <Text>{props.name}</Text>
            <Text>City:{props.address?.city}</Text>
            <Text>Street:{props.address?.street}</Text>
          </Box>
          {/* <Link to="/profile/"> */}

          {/* </Link> */}
        </Flex>
      </Link>
    </Box>
  );
};
