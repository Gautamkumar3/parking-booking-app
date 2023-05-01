import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const getParkingLotData = async () => {
  let res = await axios.get(`http://localhost:8080/slot/all`);
  return res.data;
};

const ParkingLot = () => {
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const toast = useToast();
  const [update, setUpdate] = useState(false);

  function convertDate(date) {
    let indianTime = new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    return indianTime;
  }

  function handleBookSlot(id) {
    axios
      .post(
        `http://localhost:8080/slot/book/${id}`,
        {},
        { headers: { token: token } }
      )
      .then((res) => {
        setUpdate(!update);
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
  }

  const handleCancelSlot = (id) => {
    axios
      .post(
        `http://localhost:8080/slot/cancel/${id}`,
        {},
        { headers: { token: token } }
      )
      .then((res) => {
        setUpdate(!update);
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

  useEffect(() => {
    getParkingLotData().then((res) => {
      setData(res.data);
    });
  }, [update]);

  return (
    <Box>
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing={5}
        textAlign={"left"}
        w="90%"
        m="auto"
        mt={5}
      >
        {data.map((el) => {
          return (
            <Box key={el._id} boxShadow="md" p="6" rounded="md" bg="white">
              <Image src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGFya2luZyUyMGxvdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" />
              <Text>
                <b>Slot number : </b> {el.slotNo}
              </Text>
              <Text>
                <b>Price : </b> ₹ {el.price}
              </Text>
              <Text>
                <b>Status : </b>
                <Badge
                  colorScheme={el.status === "available" ? "green" : "red"}
                >
                  {" "}
                  {el.status}
                </Badge>
              </Text>
              <Text>
                <b>Start date : </b> {convertDate(el.bookedFromDate)}
              </Text>
              <Text>
                <b>End date : </b> {convertDate(el.bookedTill)}
              </Text>
              <Flex gap={3} mt={2}>
                <Button
                  w={"100px"}
                  colorScheme="whatsapp"
                  onClick={() => handleBookSlot(el._id)}
                >
                  Book
                </Button>
                <Button
                  w={"100px"}
                  colorScheme="red"
                  onClick={() => handleCancelSlot(el._id)}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ParkingLot;
