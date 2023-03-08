import { useState } from "react";

import Favorites from "./Favorites";
import MealsList from "./MealsList";
import Modal from "./Modal";

const getFavoritesFromLocalStorage = () => {
  const item = localStorage.getItem("favorites");

  return !!item ? JSON.parse(item) : [];
};

// Recibo estos 2 valores por props aunque solo lo requiere el componente MealsList
const Meals = ({ loading, meals }) => {
  // Movi gran parte de la logica aqui
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(() =>
    getFavoritesFromLocalStorage()
  );

  const onSelectMeal = (meal) => {
    setShowModal(true);
    setSelectedMeal(meal);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setSelectedMeal(null);
  };

  const onSaveFavorites = (updatedFavorites = []) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addFavorites = (favoriteMeal) => {
    const alreadyFavorite = favorites.find(
      (meal) => meal.idMeal === favoriteMeal.idMeal
    );

    if (alreadyFavorite) return;

    const meal = meals.find((meal) => meal.idMeal === favoriteMeal.idMeal);

    onSaveFavorites([...favorites, meal]);
  };

  const removeFromFavorites = (idMeal) => {
    onSaveFavorites(favorites.filter((meal) => meal.idMeal !== idMeal));
  };

  // Movi los componentes Favorites y Modal a este componente para que puedan consumir los valores de favorites, selectedMeal y showModal
  return (
    <>
      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          selectMeal={onSelectMeal}
          removeFromFavorites={removeFromFavorites}
        />
      )}

      <MealsList
        meals={meals}
        loading={loading}
        onSelectMeal={onSelectMeal}
        addFavorites={addFavorites}
      />

      {showModal && (
        <Modal onClose={onCloseModal} selectedMeal={selectedMeal} />
      )}
    </>
  );
};

export default Meals;
