import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { calculateAge, plural } from "../utils";

const StudentCard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const storageData = localStorage.getItem("data");
    if (storageData) {
      setData(JSON.parse(storageData));
    }
  }, []);

  const handleClick = () => {
    setData({});
    localStorage.clear();
  };

  // длина массива = 0 => !0 = true => !true = false
  // т.е. переводим объект в массив ключей и если в объекте нет ключей, значит false
  const isCreatedUser = !!Object.keys(data).length;

  return (
    <section>
      <div className="container-xxl">
        <h1>Карточка студента</h1>
        {isCreatedUser ? (
          <div>
            <p>
              <strong>Имя:</strong> {data.name}
            </p>
            <p>
              <strong>Фамилия:</strong> {data.surname}
            </p>
            <p>
              <strong>Год рождения:</strong> {data.year}, {calculateAge(data.year)}{" "}
              {plural(calculateAge(data.year), ["год", "года", "лет"])}
            </p>
            <p>
              <strong>Портфолио:</strong>
              <a href={data.portfolio}> {data.portfolio}</a>
            </p>
          </div>
        ) : (
          <p>нет данных</p>
        )}
        {isCreatedUser ? (
          <Link className="btn btn-primary" to="/editor">
            Редактировать
          </Link>
        ) : (
          <Link className="btn btn-primary" to="/editor">
            Добавить
          </Link>
        )}
        <button className="btn btn-primary m-2" onClick={handleClick}>
          Очистить
        </button>
      </div>
    </section>
  );
};

export default StudentCard;
