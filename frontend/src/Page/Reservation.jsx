import { SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReservationCard from "../Components/ReservationCard";

const getReservationData = async (token) => {
  let res = await axios.get(`http://localhost:8080/reservation/all`, {
    headers: { token },
  });
  return res.data;
};

const Reservation = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getReservationData(token).then((res) => {
      setData(res.data);
    });
  }, [update]);

  function handleUpdate() {
    setUpdate(!update);
  }

  return (
    <SimpleGrid
      columns={[1, 2, 3, 4]}
      spacing={5}
      textAlign={"left"}
      w="90%"
      m="auto"
      mt={5}
    >
      {data?.map((el) => (
        <ReservationCard key={el._id} {...el} handleUpdate={handleUpdate} />
      ))}
    </SimpleGrid>
  );
};

export default Reservation;
