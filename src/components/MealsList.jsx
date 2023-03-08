import { FaRegThumbsUp } from "react-icons/fa";

export default function MealsList({
  loading,
  meals,
  onSelectMeal,
  addFavorites,
}) {
  if (loading) {
    return (
      <section className="section">
        <h4>Loading... </h4>
      </section>
    );
  }

  if (meals.length < 1)
    return (
      <h4 className="section">
        No meals matched with your search. Please, try again
      </h4>
    );

  return (
    <section className="section-center">
      {meals.map((meal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = meal;

        return (
          <article
            key={idMeal}
            className="single-meal"
            onClick={() => onSelectMeal(meal)}
          >
            <img src={image} className="img" />

            <footer>
              <h5>{title}</h5>
              <button
                className="like-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  addFavorites(meal);
                }}
              >
                <FaRegThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
