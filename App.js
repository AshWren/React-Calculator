import {createStackNavigator, createAppContainer} from 'react-navigation';
import { ReactCalculator } from './src/ReactCalculator';

const MainNavigator = createStackNavigator({
  Home: {screen: ReactCalculator},
});

const App = createAppContainer(MainNavigator);

export default App;
