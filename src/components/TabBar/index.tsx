import React, {useContext} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {AvatarIcon, TabArea, TabItem, TabItemCenter} from './style';
import {UserContext} from '../../contexts/User/userContext';

import {Images} from '../../shared/images';
import {Colors} from '../../shared/colors';

const TabBar = ({state, navigation}: BottomTabBarProps) => {
  const {state: userState} = useContext(UserContext);

  const handleNavigateToTab = (tabName: string) => {
    navigation.navigate(tabName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => handleNavigateToTab('Home')}>
        <Images.HomeIcon
          style={{opacity: state.index === 0 ? 1 : 0.5}}
          width="24"
          height="24"
          fill={Colors.white}
        />
      </TabItem>

      <TabItem onPress={() => handleNavigateToTab('Search')}>
        <Images.SearchIcon
          style={{opacity: state.index === 1 ? 1 : 0.7}}
          width="24"
          height="24"
          fill={Colors.white}
        />
      </TabItem>

      <TabItemCenter onPress={() => handleNavigateToTab('Appointments')}>
        <Images.TodayIcon width="34" height="2434" fill={Colors.blue1} />
      </TabItemCenter>

      <TabItem onPress={() => handleNavigateToTab('Favorites')}>
        <Images.FavoriteIcon
          style={{opacity: state.index === 3 ? 1 : 0.7}}
          width="24"
          height="24"
          fill={Colors.white}
        />
      </TabItem>

      <TabItem onPress={() => handleNavigateToTab('Settings')}>
        {userState.avatar != '' ? (
          <AvatarIcon source={{uri: userState.avatar}} />
        ) : (
          <Images.AccountIcon
            style={{opacity: state.index === 4 ? 1 : 0.7}}
            width="24"
            height="24"
            fill={Colors.white}
          />
        )}
      </TabItem>
    </TabArea>
  );
};

export default TabBar;
