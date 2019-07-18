import React from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./assets/energy.png')}
        style={{ width: 30, height: 30, resizeMode: 'contain' }}
      />
    );
  }
}
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => { // A screen component can have a static property called navigationOptions
  // can be either an object or a function which returns an object containing configuration options.
    return {
      // title: 'Home',
      headerTitle: <LogoTitle />, // if we need to override the component used for the title
      // we can use headerTitle instead of title and set a new component.

      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')} // use params to give the header button
          // access to a function on the component instance
          title="+1"
          color="#fff"
        />
      ),

      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{`Count is: ${this.state.count}`}</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
  // if we want to use params to set the title, we need to make navigationOptions a function
  // React Navigation will call this function with an object containing
  // { navigation, navigationOptions, screenProps }
  // we can then get params from navigation.state.params.
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
        />

      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: { // we can share navigationOptions across screens
      headerStyle: { // applied to the <View> that wraps the header
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff', // color for back button and title
      headerTitleStyle: { // customize text properties for the title
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppNavigator,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
