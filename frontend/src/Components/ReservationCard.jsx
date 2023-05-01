import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

const ReservationCard = ({
  _id,
  price,
  status,
  slotNo,
  bookedFromDate,
  bookedTill,
  handleUpdate,
}) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const toast = useToast();

  function convertDate(date) {
    let indianTime = new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    return indianTime;
  }

  const handleCancelReservation = (id) => {
    axios
      .post(
        `http://localhost:8080/reservation/cancel/${id}`,
        {},
        { headers: { token: token } }
      )
      .then((res) => {
        handleUpdate();
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
    <Box key={_id} boxShadow="md" p="6" rounded="md" bg="white">
      <Image src="https://media.istockphoto.com/id/1471910385/photo/two-cinema-blue-yellow-ticket-isolated-object-shadow-clipping-path.jpg?b=1&s=170667a&w=0&k=20&c=trxldz4GzgM0qjtzR9KiwKcu6R5y-iy7GaSh5hrtJro=" />
      <Text>
        <b>Slot number : </b> {slotNo}
      </Text>
      <Text>
        <b>Price : </b> ₹ {price}
      </Text>
      <Text>
        <b>Status : </b>
        <Badge colorScheme={status === "Booked" ? "green" : "red"}>
          {" "}
          {status}
        </Badge>
      </Text>
      <Text>
        <b>Start date : </b> {convertDate(bookedFromDate)}
      </Text>
      <Text>
        <b>End date : </b> {convertDate(bookedTill)}
      </Text>
      <Flex gap={3} mt={2}>
        <Button w={"100px"} colorScheme="whatsapp">
          Change slot
        </Button>
        <Button
          w={"100px"}
          colorScheme="red"
          onClick={() => handleCancelReservation(_id)}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

export default ReservationCard;
