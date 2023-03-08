import { useState, useEffect } from "react";
import axios from "axios";

import Meals from "./components/Meals";
import Search from "./components/Search";

import { allMealsUrl, randomMealUrl } from "./constants";

import "./App.css";

// Se puede agregar esta logica inicial en el componente superior
// Se recomienda moverlo a un custom hook para poder reducir la logica que tiene el componente
function App() {
  //initiliaze loading to false
  const [loading, setLoading] = useState(false);
  //we use an empty array because we will be iterating over an array of meals
  const [meals, setMeals] = useState([]);

  //fetch data from an url, and print it. we call the function in the use effect hook, passing a 2nd parameter an [] that executes the code every time that the component is mounted
  const fetchMeals = async (url) => {
    setLoading(true);

    try {
      const response = await axios(url);

      if (response.data.meals) {
        setMeals(response.data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  //loads all the meals when the component is loaded
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  return (
    <main>
      <Search fetchMeals={fetchMeals} fetchRandomMeal={fetchRandomMeal} />

      <Meals meals={meals} loading={loading} />
    </main>
  );
}

export default App;
