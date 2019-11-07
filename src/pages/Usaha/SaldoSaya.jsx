import React from 'react'
import { Header, Segment, Grid, Form, Icon } from 'semantic-ui-react'

function SaldoSaya(props) {
  return (
    <Segment>
      <Grid style={styles.marginGrid}>
        <Grid.Row columns={3}>
          <Grid.Column />
          <Grid.Column textAlign="center">
            <Header>Saldo Saya</Header>
            <Header as="h3">Rp. {props.usaha.saldo}</Header>
          </Grid.Column>
          <Grid.Column />
        </Grid.Row>
      </Grid>
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="No. Rekening" />
          <Form.Input fluid label="Atas Nama" />
          <Form.Input fluid label="Nominal" />
        </Form.Group>
        <Form.Button color="green">Tarik Saldo</Form.Button>
      </Form>
    </Segment>
  )
}

export default SaldoSaya

const styles = {
  marginGrid: {
    marginTop: 40,
    marginBottom: 40,
  },
}
