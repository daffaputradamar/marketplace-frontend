import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import StarRatings from 'react-star-ratings'

function ItemUlasan(props) {
  return (
    <Segment>
      <StarRatings
        starRatedColor="rgb(243, 156, 18)"
        numberOfStars={5}
        name="rating"
        rating={props.review.rating}
        starDimension="20px"
        starSpacing="5px"
      />
      <Header as="h5" style={{ marginTop: 10 }}>
        Oleh : {props.review.pengguna.nama}
      </Header>
      <p>{props.review.komentar}</p>
    </Segment>
  )
}

export default ItemUlasan
