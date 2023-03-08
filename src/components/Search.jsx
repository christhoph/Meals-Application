import { useState } from "react";

import { allMealsUrl } from "../constants";

// Recibo las 2 funciones a ejecutar por props
const Search = ({ fetchMeals, fetchRandomMeal }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Al dar click en el boton de buscar obtiene el texto ingresado y lo pasa a la funcion fetchMeals
  const onSearch = () => {
    fetchMeals(`${allMealsUrl}${text}`);
    setText("");
  };

  const handleRandomMeal = () => {
    setText("");
    fetchRandomMeal();
  };

  // No me gusta mucho usar el tag form en React, no se aprovecha mucho sus beneficios
  // Prefiero que el input o los botones ejecuten la logica que deban independientemente
  return (
    <header className="header search-container">
      <div className="form-container">
        <input
          className="form-input"
          type="text"
          value={text}
          placeholder="type your favorite meal"
          onChange={handleChange}
        />

        <button className="btn" onClick={onSearch}>
          search
        </button>

        <button
          className="btn btn-hipster"
          type="button"
          onClick={handleRandomMeal}
        >
          surprise me!
        </button>
      </div>
    </header>
  );
};

export default Search;
