// MealPlannerScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

export default function MealPlannerScreen() {
  const [mealPlan, setMealPlan] = useState([]);

  const addToMealPlan = (day, recipe) => {
    setMealPlan([...mealPlan, { day, recipe }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Planner</Text>
      <FlatList
        data={mealPlan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.day}: {item.recipe.title}</Text>
        )}
      />
      <Button title="Add to Meal Plan" onPress={() => addToMealPlan('Monday', { title: 'Spaghetti Carbonara' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
