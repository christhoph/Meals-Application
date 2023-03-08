const Favorites = ({ favorites, selectMeal, removeFromFavorites }) => {
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favorites.map((favorite) => {
            const { idMeal, strMealThumb: image, strMeal: title } = favorite;

            return (
              <div
                key={idMeal}
                className="favorite-item"
                onClick={() => selectMeal(favorite)}
              >
                <img
                  id={idMeal}
                  src={image}
                  alt={title}
                  className="img favorites-img"
                />
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();

                    removeFromFavorites(idMeal);
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
