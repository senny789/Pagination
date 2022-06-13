import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
interface props {
  users: [
    {
      id: number;
      name: string;
      username: string;
      email: string;
      address: {
        street: string;
        city: string;
      };
    }
  ];
  setUsers: any;
}
export const Edit: React.FC<props> = (props) => {
  const [formData, setFormData] = useState<any>({});
  const [edit, setEdit] = useState<boolean>(false);
  const { id } = useParams();
  const [paramsError, setError] = useState(false);
  const navigate = useNavigate();
  //
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
  useEffect(() => {
    if (
      !(
        props.users.filter((user) => {
          return user.id === Number(id);
        }).length > 0
      )
    ) {
      setError(true);
    }
    if (paramsError) {
      alert("invalid parameter");
    } else {
      fetch("http://localhost:4000/users/" + id)
        .then((res) => res.json())
        .then((data) => {
          delete data["id"];
          console.log(data);
          setFormData(data);
        });
    }
  }, []);
  const handleDelete = async () => {
    fetch("http://localhost:4000/users/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        res.text();
      }) // or res.json()
      .then((res) => {
        alert("deleted user");
        navigate("/");
        console.log(res);
      });
  };
  const handleSubmit = async () => {
    console.log("submitted");
    fetch(`http://localhost:4000/users/` + id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
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
    <Box>
      {paramsError ? (
        <Link to="/"> go to home ....404 not found</Link>
      ) : (
        <Box>
          <Button
            backgroundColor="blue.200"
            color="white"
            onClick={() => setEdit(!edit)}
          >
            Edit
          </Button>
          <Button
            backgroundColor="red.500"
            color="white"
            onClick={handleDelete}
          >
            {" "}
            Delete
          </Button>

          {edit ? (
            <Box backgroundColor="gray.200" h="100vh">
              <FormControl
                w="40%"
                margin="auto"
                placeItems="center"
                padding="3em"
                h="100%"
                backgroundColor="white"
              >
                <Heading>Edit User</Heading>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
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
                    value={formData.username || ""}
                  />
                  <FormLabel htmlFor="name">Enter name</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    w="30vw"
                    onChange={handleChange}
                    value={formData.name || ""}
                  />
                  <FormLabel htmlFor="Address">Address</FormLabel>
                  <FormLabel htmlFor="City">Enter City:</FormLabel>
                  <Input
                    type="text"
                    id="City"
                    w="30vw"
                    name="city"
                    onChange={handleChange}
                    value={formData?.address?.city || ""}
                  />
                  <FormLabel htmlFor="Street">
                    Enter Street:
                    <Input
                      type="text"
                      id="Street"
                      w="30vw"
                      name="street"
                      onChange={handleChange}
                      value={formData?.address?.street || ""}
                    />
                    <FormLabel htmlFor="Email">Enter Email</FormLabel>
                    <Input
                      type="email"
                      id="Email"
                      w="30vw"
                      name="email"
                      onChange={handleChange}
                      value={formData.email || ""}
                    />
                  </FormLabel>
                  <FormLabel htmlFor="Phone">Enter Phone no</FormLabel>
                  <Input
                    type="tel"
                    id="Phone"
                    w="30vw"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone || ""}
                  />

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
              </FormControl>
            </Box>
          ) : (
            <Box backgroundColor="gray.200" h="100vh">
              <Box
                w="40%"
                margin="auto"
                placeItems="center"
                padding="3em"
                h="100%"
                backgroundColor="white"
              >
                <Image src="https://picsum.photos/id/237/200/"></Image>
                <Heading>{formData.username || ""}</Heading>
                <Text>Name:{formData.name || ""}</Text>
                <Text>Email:{formData.email || ""}</Text>
                <Text>
                  Address: {formData.address?.city} ,{formData.address?.street}
                </Text>
                <Text>Phone no:{formData.phone || ""}</Text>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
