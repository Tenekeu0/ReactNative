import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RecipeScreen from './screens/RecipeScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import MealPlannerScreen from './screens/MealPlannerScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
        <Stack.Screen name="MealPlanner" component={MealPlannerScreen} options={{ title: 'Meal Planner' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
