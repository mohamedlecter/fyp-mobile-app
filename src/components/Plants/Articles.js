import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Linking } from "react-native";
import axios from "axios";

const Article = () => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        // Query Wikipedia for plant disease articles
        const response = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            format: "json",
            list: "search",
            srsearch: "plant diseases", // Your search query
          },
        });

        // Extract relevant information from the response
        if (
          response.data &&
          response.data.query &&
          response.data.query.search
        ) {
          setDiseases(response.data.query.search);
        }
      } catch (error) {
        console.error("Error fetching disease data:", error);
      }
    };

    fetchDiseases();
  }, []);

  const openArticle = (articleTitle) => {
    Linking.openURL(
      `https://en.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Diseases</Text>
      <FlatList
        data={diseases}
        keyExtractor={(item) => item.pageid.toString()}
        renderItem={({ item }) => (
          <View style={styles.diseaseItem}>
            <Text
              style={styles.diseaseTitle}
              onPress={() => openArticle(item.title)}
            >
              {item.title}
            </Text>
            <Text style={styles.diseaseSnippet}>{item.snippet}</Text>
            {/* You can display more disease information here */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  diseaseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  diseaseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "blue",
  },
  diseaseSnippet: {
    fontSize: 16,
    color: "#888",
  },
});

export default Article;
