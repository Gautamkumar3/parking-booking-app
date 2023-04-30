import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const SlotForm = () => {
  const [data, setData] = useState({
    slotNo: "",
    bookedFromDate: "",
    bookedTill: "",
    price: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setData({
      ...data,
      [name]: type == "datetime-local" ? value : +value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await axios
      .post("http://localhost:8080/slot/create", data)
      .then((res) => {
        toast({
          title: `Status code ${res.status}`,
          description: `${res.data.message}`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((er) => {
        toast({
          title: `Status code ${er.response.status}`,
          description: `${er.response.data.message || "Something went wrong"}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Box
      w={["90%", "50%", "30%"]}
      m={"auto"}
      boxShadow="md"
      p="6"
      rounded="md"
      bg="white"
      mt={"5%"}
    >
      <Heading textAlign={"center"} color={"tomato"} mb={5}>
        Slot Form
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel mt={2}>Slot number</FormLabel>
          <Select
            placeholder="Select slot"
            name="slotNo"
            onChange={handleChange}
          >
            <option value={1}>Slot 1</option>
            <option value={2}>Slot 2</option>
            <option value={3}>Slot 3</option>
          </Select>

          <FormLabel mt={2}>Price</FormLabel>
          <Input
            type={"number"}
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          <FormLabel mt={2}>Start date</FormLabel>
          <Input
            type={"datetime-local"}
            placeholder="Book from date"
            name="bookedFromDate"
            onChange={handleChange}
          />
          <FormLabel mt={2}>End date</FormLabel>
          <Input
            type={"datetime-local"}
            name="bookedTill"
            placeholder="book till"
            onChange={handleChange}
          />
          <Button mt={3} type="submit" colorScheme={"whatsapp"} w="full">
            Create Slot
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default SlotForm;
