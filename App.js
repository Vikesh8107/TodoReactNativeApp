import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TodoScreen from "./src/screen/TodoScreen";
import CompletedTasksScreen from "./src/screen/CompletedTasksScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        <Stack.Screen
          name="CompletedTasksScreen"
          component={CompletedTasksScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
