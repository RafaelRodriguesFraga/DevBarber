import styled from 'styled-components/native';
import {Colors} from '../../shared/colors';

export const Container = styled.View`
  flex-direction: row;
`;

export const StarView = styled.View`
  margin-top: -8px;
`;

export const RatingText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  color: ${Colors.gray1};
  margin-top: 2px;
`;
