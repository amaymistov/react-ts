import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Loader from "../components/Loader";
import PizzaBlock from "../components/PizzaBlock";

import ReactPaginate from "react-paginate";
import qs from "qs";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slice/filterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPizzas, selectPizzaData } from "../redux/slice/pizzaSlice";
import CustomDiv from "../components/CustomDiv";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const searchParams = useLocation();

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  async function getPizzas() {
    const urlItems = `https://63e79782cbdc56587379fc07.mockapi.io/items?page=${currentPage}&limit=4&`;
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortType = sort.sort.replace("-", "");
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(fetchPizzas({ urlItems, category, sortType, order, search }));
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sort, currentPage]);

  useEffect(() => {
    if (searchParams.search) {
      const params = qs.parse(searchParams.search.substring(1));
      const sort = sortList.find((obj) => obj.sort === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort.sort, searchValue, currentPage]);
  // [categoryId, sort.sort, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <CustomDiv
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="0px auto"
          padding="50px 50px"
        >
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, не удалось получить пиццы. <br />
            Попробуйте повторить попытку позже
          </p>
        </CustomDiv>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, i) => <Loader key={i} />)
            : items.map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
        </div>
      )}
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Home;
