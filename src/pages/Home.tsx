import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import Loader from "../components/Loader";
import PizzaBlock from "../components/PizzaBlock";

import ReactPaginate from "react-paginate";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

import CustomDiv from "../components/CustomDiv";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { FilterSliceState } from "../redux/filter/types";
import { selectPizzaData } from "../redux/pizza/selectors";
import { Status } from "../redux/pizza/types";
import { fetchPizzas } from "../redux/pizza/asyncActions";

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const searchParams = useLocation();

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch]
  );

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
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
  }, [categoryId, navigate, sort.sort, currentPage]);

  useEffect(() => {
    if (searchParams.search) {
      const params = qs.parse(searchParams.search.substring(1));
      const sort = sortList.find((obj) => obj.sort === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        } as FilterSliceState)
      );
      isSearch.current = true;
    }
  }, [searchParams.search, sort.sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
    isSearch.current = false;
  }, [categoryId, sort.sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={onChangeCategory} />
        <Sort value={sort} />
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
          {status === Status.LOADING
            ? [...new Array(6)].map((_, i) => <Loader key={i} />)
            : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)}
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
      />
    </div>
  );
}

export default Home;
