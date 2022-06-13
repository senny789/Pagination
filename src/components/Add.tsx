import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Box, Input, FormLabel, FormControl, Heading } from "@chakra-ui/react";
interface props {
  update: {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      city: string;
    };
  };
  setUpdate: any;
}
export const Add: React.FC<props> = (props) => {
  const [formData, setFormData] = useState<any>({});
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    let temp;
    if (name === "city" || name === "street") {
      temp = {
        ...formData,
        address: { ...formData["address"], [name]: value },
      };
    } else {
      temp = { ...formData, [name]: value };
    }
    setFormData(temp);
  };
  const post = async () => {
    fetch("http://localhost:4000/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  return (
    <Box backgroundColor="gray.200" h="100vh">
      <Box
        w="40%"
        marginLeft="auto"
        marginRight="auto"
        placeItems="center"
        padding="3em"
        h="80%"
        backgroundColor="white"
      >
        <Heading>Add User</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("added user");
            navigate("/");
            post();
          }}
        >
          <FormLabel htmlFor="username">Enter Username</FormLabel>
          <Input
            type="text"
            id="username"
            name="username"
            w="30vw"
            required
            onChange={handleChange}
          />
          <FormLabel htmlFor="name">Enter name</FormLabel>
          <Input
            type="text"
            id="name"
            name="name"
            w="30vw"
            onChange={handleChange}
          />
          <FormLabel htmlFor="Address">Address</FormLabel>
          <FormLabel htmlFor="City">Enter City:</FormLabel>
          <Input
            type="text"
            id="City"
            w="30vw"
            name="city"
            onChange={handleChange}
          />
          <FormLabel htmlFor="Street">
            Enter Street:
            <Input
              type="text"
              id="Street"
              w="30vw"
              name="street"
              onChange={handleChange}
            />
            <FormLabel htmlFor="Email">Enter Email</FormLabel>
            <Input
              type="email"
              id="Email"
              w="30vw"
              name="email"
              onChange={handleChange}
            />
          </FormLabel>
          <Input
            type="submit"
            w="30vw"
            value="Submit"
            _hover={{
              backgroundColor: "blue.100",
              color: "white",
            }}
          ></Input>
        </form>
      </Box>
    </Box>
  );
};
