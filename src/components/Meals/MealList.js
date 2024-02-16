import styles from "./MealList.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Loading from "../UI/Loading";
import Error from "../UI/Error";
import {useState, useEffect} from 'react';


const MealList = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState();

  useEffect(() => {
      async function getMeals () {  
        setIsLoading(true)
        let response = await fetch('https://apps-93cf2-default-rtdb.firebaseio.com/meals.json');
        if (!response.ok){
          throw new Error('Произошла ошибка');
        }

        let meals = await response.json();
        let mealsArray = [];
  
        for (let key of meals){
          if (key == null){
            continue
          }

          mealsArray.push({
            id: key.id,
            name: key.name,
            description: key.description,
            price: key.price
          })
        }
        
        setMeals(mealsArray);
        setIsLoading(false);
      }

        getMeals().catch(err => {
          setIsLoading(false);
          setIsError(err.message)});
  }, [])
  
  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading){
    return <Loading />
  }

  if(isError){
    return <Error/>
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>

    </section>
  );
};

export default MealList;
