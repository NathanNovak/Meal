import React from 'react';
import {Text, View} from 'react-native';

const APIKey = '66846fb131d44ee6b22829f7a42e8afa';
const baseURL = 'https://api.spoonacular.com/';
const recipes = 'recipes/'
const complexSearch = 'complexSearch/'
const recipeDetail = '/information'

const useRecipes = () => {


  const getComplexSearchQuery = async (query) => {
    const response = await fetch(`${baseURL + recipes + complexSearch}/?query=${query}&number=20&apiKey=${APIKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    console.log('RESPONSE', response);
    console.log('RESPONSE.JSON', responseJson.results);
    if (response.ok && responseJson.results) return responseJson.results;
  };

  const getRecipeDetails = async (id) => {
    const response = await fetch(`${baseURL + recipes + id + recipeDetail}?apiKey=${APIKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();
    console.log('RESPONSE', response);
    console.log('RESPONSE.JSON', responseJson);
    if (response.ok && responseJson) return responseJson;
  };

  return {
    getComplexSearchQuery: getComplexSearchQuery,
    getRecipeDetails: getRecipeDetails,
  };
};

export default useRecipes;
