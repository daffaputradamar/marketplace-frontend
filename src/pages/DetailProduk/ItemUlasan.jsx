import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import StarRatings from 'react-star-ratings'

function ItemUlasan() {
  return (
    <Segment>
      <StarRatings
        starRatedColor="blue"
        numberOfStars={5}
        name="rating"
        starDimension="20px"
        starSpacing="5px"
      />
      <Header as="h5" style={{ marginTop: 10 }}>
        Oleh :{' '}
      </Header>
      <p>AWassdad</p>
    </Segment>
  )
}

export default ItemUlasan
