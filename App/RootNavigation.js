import { StackNavigator } from 'react-navigation';
import HomeScreen from 'app/screens/home/HomeScreen';
import LocationsListScreen from 'app/screens/list/LocationsListScreen';
import DetailsScreen from 'app/screens/details/DetailsScreen';
import NewLocationScreen from 'app/screens/newLocation/NewLocationScreen';

export default StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Locations Overview',
    }),
  },
  LocationsList: {
    screen: LocationsListScreen,
    navigationOptions: () => ({
      title: 'Locations list',
    }),
  },
  Details: {
    screen: DetailsScreen,
    path: 'location/:location',
  },
  NewLocation: {
    screen: NewLocationScreen,
    path: 'newLocation/:coordinates',
    navigationOptions: () => ({
      title: 'New location',
    }),
  },
});
