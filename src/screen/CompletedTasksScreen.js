import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const CompletedTasksScreen = ({ route }) => {
  const { completedTasks } = route.params;

  const renderCompletedTasks = ({ item }) => {
    return (
      <View style={styles.completedTaskContainer}>
        <Text style={styles.completedTaskText}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks</Text>
      {completedTasks.length > 0 ? (
        <FlatList data={completedTasks} renderItem={renderCompletedTasks} />
      ) : (
        <Text style={styles.noCompletedTasks}>No completed tasks yet!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  completedTaskContainer: {
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  completedTaskText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  noCompletedTasks: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
});

export default CompletedTasksScreen;
