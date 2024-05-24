import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, TextInput, Alert } from 'react-native';
import * as Speech from 'expo-speech';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons'; // Importe Ionicons depuis @expo/vector-icons

const recipes = [
  { id: '1', title: 'Spaghetti Carbonara', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Chicken Parmesan', image: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Beef Tacos', image: 'https://via.placeholder.com/150' },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [favorites, setFavorites] = useState([]);

  const handleNotification = async () => {
    await scheduleNotificationAsync({
      content: {
        title: 'Remember to cook tonight!',
        body: 'Don\'t forget to try out that new recipe you found!',
      },
      trigger: { seconds: 10 }, // 10 secondes pour tester, tu peux changer cela en ce que tu veux
    });
  };

  const handleVoiceSearch = () => {
    Speech.speak('Say the name of the recipe you are looking for', {
      onDone: () => {
        // Simulate voice input
        // In a real app, you would use a speech-to-text library here
        const simulatedVoiceInput = 'Chicken Parmesan';
        setSearchQuery(simulatedVoiceInput);
        filterRecipes(simulatedVoiceInput);
      },
    });
  };

  const addToFavorites = (recipe) => {
    if (!favorites.includes(recipe)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (recipeId) => {
    const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
    setFavorites(updatedFavorites);
  };

  const filterRecipes = (query) => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);

    if (filtered.length === 0) {
      searchOnline(query);
    }
  };

  const searchOnline = (query) => {
    Alert.alert(
      'Rectte non trouvée',
      `Aucune recette locale trouvée pour "${query}". Voulez-vous chercher en ligne ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Search Online',
          onPress: () => {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+recipe`;
            WebBrowser.openBrowserAsync(searchUrl);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    filterRecipes(text);
  };

  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={handleNotification} />
      <Button
        title="View Favorites"
        onPress={() => navigation.navigate('Favorites', { favorites, removeFromFavorites })}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search recipes..."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      <Button title="Voice Search" onPress={handleVoiceSearch} />
      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Recipe', { recipe: item })}>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => addToFavorites(item)}>
                <Ionicons name="star" size={24} color="gold" />
              </TouchableOpacity>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});
