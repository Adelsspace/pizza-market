import React, { useState, useRef, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSortType } from "../redux/filter/selectors";
import { setSort, setSortType } from "../redux/filter/slice";
import { Sort as SortValueType, SortPropertyEnum } from "../redux/filter/types";

type SortType = "asc" | "desc";

type SortList = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type SortPopupProps = {
  value: SortValueType;
};

export const list: SortList[] = [
  { name: "поплуярности", sortProperty: SortPropertyEnum.RATING },
  { name: "цене", sortProperty: SortPropertyEnum.PRICE },
  { name: "алфавиту", sortProperty: SortPropertyEnum.TITLE },
];

export const Sort: React.FC<SortPopupProps> = memo(({ value }) => {
  const dispatch = useDispatch();
  const orderType = useSelector(selectSortType);
  const sortRef = useRef<HTMLDivElement>(null);

  const [openSort, setOpenSort] = useState(false);

  const onClickListItem = (obj: SortValueType) => {
    dispatch(setSort(obj));
    setOpenSort(false);
  };
  const onClickChangeOrder = (type: SortType) => {
    dispatch(setSortType(type));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpenSort(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform={openSort ? "rotate(180)" : ""}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenSort(!openSort)}>{value.name}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => onClickChangeOrder("asc")}
        className={orderType === "asc" ? "active" : ""}
      >
        {" "}
        ↑{" "}
      </button>
      <button
        onClick={() => onClickChangeOrder("desc")}
        className={orderType === "desc" ? "active" : ""}
      >
        {" "}
        ↓{" "}
      </button>
    </div>
  );
});
