import * as React from 'react';
import { View, Text , StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import MovieScreen from '../Screens/MovieScreen';
import Search from '../Screens/Search';


const Stack = createNativeStackNavigator();


const Nav = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="Movie" component={MovieScreen} options={{headerShown:false}} />
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}} />
 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles= StyleSheet.create({
    View :{ paddingTop : 80

    }
})



export default Nav