import PromoText from "./PromoText";
import MealList from "./MealList";
import React from "react";
import { ErrorBoundary } from "react-error-boundary"

const Meals = () => {
  return (
    <React.Fragment>
      <PromoText />
      <ErrorBoundary fallback={<p>Что-то пошло не так</p>}> 
        <MealList /> 
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default Meals;
