import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from "./textField";
import { validator } from "../utils";

const CardEditor = () => {
  // отсеживание состояния каждого поля фотмы (сколько полей в форме,
  // столько и объектов. Поле объекта = name поля
  const [data, setData] = useState({
    name: "",
    surname: "",
    year: "",
    portfolio: "",
  });

  const [isCreatedUser, setIsCreatedUser] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const validatorConfig = {
    name: {
      isRequired: {
        message: `Поле 'Имя' обязательно для заполнения`,
      },
    },
    surname: {
      isRequired: {
        message: `Поле 'Фамилия' обязательно для заполнения`,
      },
    },
    year: {
      isRequired: {
        message: `Поле 'Год рождения' обязательно для заполнения`,
      },
      isBirthYear: {
        message: `Поле 'Год рождения' не корректно`,
      },
    },
    portfolio: {
      isRequired: {
        message: `Поле 'Портфолио' обязательно для заполнения`,
      },
      isUrl: {
        message: `Поле 'Портфолио' должно быть ссылкой`,
      },
    },
  };

  useEffect(() => {
    const ls = localStorage.getItem("data");
    if (ls) {
      console.log("ls", ls);
      setData(JSON.parse(ls));
      setIsCreatedUser(true);
    }
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // универсальный метод при onChange любого поля
  // target.name совпадает и именованием поля в объекте data
  const handleChange = ({ target }) => {
    console.log("event", target.name);
    console.log("event", target.value);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  // метод отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidate = validate();
    if (!isValidate) return;
    console.log("Submit form", data);
    localStorage.setItem("data", JSON.stringify(data));
    alert("Обновлено!");
    history.push("/");
  };
  console.log("isCreatedUser=", isCreatedUser);
  const isValidate = Object.keys(errors).length === 0;

  return (
    <section>
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <h3 className="mb-4">Создать</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                type="text"
                label={"Имя"}
                name={"name"}
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                type="text"
                label={"Фамилия"}
                name={"surname"}
                value={data.surname}
                onChange={handleChange}
                error={errors.surname}
              />
              <TextField
                type="number"
                label={"Год рождения"}
                name={"year"}
                value={data.year}
                onChange={handleChange}
                error={errors.year}
              />
              <TextField
                type="text"
                label={"Портфолио (url)"}
                name={"portfolio"}
                value={data.portfolio}
                onChange={handleChange}
                error={errors.portfolio}
              />
              {isCreatedUser && (
                <Link to="/" className="btn btn-secondary me-2">
                  Назад
                </Link>
              )}
              <button
                className="btn btn-primary m-2 mx-auto"
                type={"submit"}
                disabled={!isValidate}
              >
                {isCreatedUser ? "Обновить" : "Создать"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardEditor;
