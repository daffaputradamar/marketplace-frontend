import React from 'react'
import { Container, Segment, Header, Grid, Icon } from 'semantic-ui-react'

function UangSaya() {
  return (
    <Container>
      <Segment>
        <Header as="h2" textAlign="center" style={styles.marginHeader}>
          Total
        </Header>
        <Header as="h2" textAlign="center">
          Rp. -
        </Header>
        <Grid style={styles.marginGrid}>
          <Grid.Row columns={3}>
            <Grid.Column />
            <Grid.Column>
              <Segment style={styles.marginSegment} textAlign="center">
                <Icon name="money bill alternate outline" size="huge" />
                <Header as="h3">Penarikan</Header>
              </Segment>
            </Grid.Column>
            <Grid.Column />
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

const styles = {
  marginHeader: {
    marginTop: '30px',
  },
  marginGrid: {
    marginTop: '80px',
    marginBottom: '200px',
  },
  marginSegment: {
    paddingTop: '50px',
    paddingBottom: '50px',
  },
}
export default UangSaya
