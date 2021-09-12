import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Appointments from "../screens/Appointments";
import Favorites from "../screens/Favorites";
import Settings from "../screens/Settings";
import TabBar from "../components/TabBar";

const {Navigator, Screen} = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <Navigator tabBar={props => <TabBar {...props}/> }>
            <Screen name="Home" component={Home} />
            <Screen name="Search" component={Search} />
            <Screen name="Appointments" component={Appointments} />
            <Screen name="Favorites" component={Favorites} />
            <Screen name="Settings" component={Settings} />
        </Navigator>

    );
}

export default TabRoutes;