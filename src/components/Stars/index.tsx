import React from 'react';
import * as S from './styles';
import {Images} from "../../shared/images";


type StarProps = {
  rating: number;
  showRatingNumber?: boolean;
};

const Stars = ({rating, showRatingNumber}: StarProps) => {
  /* 
    Star Ratings from 0 to 2, which 0
    is the minimum (EmptyStar), 1 is 
    half (HalfStar) and 2 is the maxium
    (FullStar).

    If the rating is a decimal value, we
    transform into the lowest number.
    and set the array value to 2.

    For example: If the rating is 4.9, it will
    be transformed into 4 and the stars array
    will look like this: [2, 2, 2, 2, 0]

    If it has any decimal numbers left and it is
    greater than 0, put 1 into the index of the 
    array that was left to be filled. So it will be
    like this: [2, 2, 2, 2, 1]
  */
  const stars = [0, 0, 0, 0, 0];

  let floor = Math.floor(rating);
  let ratingLeft = rating - floor;

  for (var i = 0; i < floor; i++) {
    stars[i] = 2;
  }

  if (ratingLeft > 0) {
    stars[i] = 1;
  }

  return (
    <S.Container>
      {stars.map((index, key) => {
        return (
          <S.StarView key={key}>
            {index === 0 && <Images.EmptyStar width="18" fill="#FF9200" />}
            {index === 1 && <Images.HalfStar width="18" fill="#FF9200" />}
            {index === 2 && <Images.FullStar width="18" fill="#FF9200" />}
          </S.StarView>
        );
      })}

      {showRatingNumber && <S.RatingText>{rating}</S.RatingText>}
    </S.Container>
  );
};

export default Stars;
