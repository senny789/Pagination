import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Heading,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { Users } from "./components/Users";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Edit } from "./components/Edit";
import PageButton from "./components/PageButton";
import { Home } from "./components/Home";
import { Add } from "./components/Add";

export const App = () => {
  const [users, setUsers] = useState<Array<object>>([{}]);
  const [changedUsers, setChange] = useState<Array<object>>([{}]);
  const [limit, setLimit] = useState<number>(3);
  const [listNo, setListno] = useState<number>(1);
  const [pageno, setPageno] = useState<number>(1);
  const [update, setUpdate] = useState<object>({
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      city: "",
    },
  });

  useEffect(() => {
    fetch(`http://localhost:4000/users?_page=${pageno}&_limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [pageno, listNo]);
  useEffect(() => {
    fetch(`http://localhost:4000/users`)
      .then((res) => res.json())
      .then((data) => {
        setListno(Math.ceil(data.length));
      });
  }, [users, changedUsers]);

  const changePage = (val: number) => {
    setPageno(val);
  };
  const PageButtonRender = () => {
    let render = [];
    for (let i = 1; i <= Math.ceil(listNo / limit); i++) {
      render.push(<PageButton pageno={i} onclick={changePage}></PageButton>);
    }
    return render;
  };
  const userRender = users.map((user) => {
    return <Users {...user} />;
  });

  const props: any = {
    PageButtonRender,
    userRender,
  };
  const updateP: any = {
    update,
    setUpdate,
  };
  const userP: any = {
    users,
    setUsers,
  };
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home {...props} />}></Route>
        <Route path="/Add" element={<Add {...updateP} />}></Route>
        <Route path="/Edit/:id" element={<Edit {...userP} />}></Route>
      </Routes>
    </ChakraProvider>
  );
};
