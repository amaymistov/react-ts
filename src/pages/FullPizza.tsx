import React, { useEffect, useState } from "react";
import CustomDiv from "../components/CustomDiv";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

type PizzaItem = {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
};

function FullPizza(): JSX.Element {
  const [pizza, setPizza] = useState<PizzaItem>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63e79782cbdc56587379fc07.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Такой пиццы нет");
        navigate("/");
      }
    }

    fetchPizza();
  });

  if (!pizza) {
    return (
      <CustomDiv display="flex" flexDirection="column" alignItems="center">
        <Loader />
      </CustomDiv>
    );
  }
  return (
    <CustomDiv
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="90%"
      margin="0 auto"
    >
      <img src={pizza.imageUrl} alt={"Пицца " + pizza.title} />
      <h2>{pizza.title}</h2>
      <p>{pizza.description}</p>
      <h4>от {pizza.price}₽</h4>
    </CustomDiv>
  );
}

export default FullPizza;
