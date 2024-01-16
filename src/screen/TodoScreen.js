import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";

import Fallback from "../components/Fallback";
import CompletedTasksScreen from "./CompletedTasksScreen";

const TodoScreen = () => {
  const navigation = useNavigation();

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleAddTodo = () => {
    if (todo === "") {
      return;
    }

    setTodoList([...todoList, { id: uuid.v4(), title: todo }]);
    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  const handleCompleteTodo = (id) => {
    const completedTask = todoList.find((task) => task.id === id);
    setCompletedTasks([...completedTasks, completedTask]);
    handleDeleteTodo(id);
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 8,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 }}>
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
        <IconButton
          icon="check-circle"
          iconColor="#fff"
          onPress={() => handleCompleteTodo(item.id)}
        />
      </View>
    );
  };

  const navigateToCompletedTasks = () => {
    navigation.navigate("CompletedTasksScreen", { completedTasks });
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 40 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddTodo()}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}

      <FlatList data={todoList} renderItem={renderTodos} />

      {todoList.length <= 0 && <Fallback />}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToCompletedTasks()}
      >
        <Text style={styles.buttonText}>Completed Tasks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default TodoScreen;
