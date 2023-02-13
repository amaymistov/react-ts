import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Loader from "../components/Loader";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const pizzasResponse = await axios.get(
          "https://63e79782cbdc56587379fc07.mockapi.io/items"
        );
        setPizzas(pizzasResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Loader key={i} />)
          : pizzas.map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
      </div>
    </>
  );
}

export default Home;
