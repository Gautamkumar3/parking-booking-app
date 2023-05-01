import { Box, Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Flex
      justify={"space-around"}
      align="center"
      height={"70px"}
      fontSize="20px"
      color={"white"}
      bg="blue.500"
      position={"sticky"}
      zIndex={"500"}
      top="0px"
    >
      <Link to="/">Dashboard</Link>
      <Link to="/reservation">Reservation</Link>
      <Link to="/slot_form">Slot</Link>

      {!token ? (
        <>
          {" "}
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <HStack spacing={5}>
          <Button colorScheme={"red"} onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

export default Navbar;
