import React from 'react'
import { Header, Segment, Grid, Icon } from 'semantic-ui-react'

function PenarikanItem(props) {
  return (
    <Grid columns={3} celled textAlign="center" verticalAlign="middle">
      <Grid.Column width={8} textAlign="left">
        <Header>{props.tglPenarikan}</Header>
        <Header size="medium">
          <Icon name="file alternate outline" />
          <Header.Content>
            {props.noRek}
            <Header.Subheader>{props.atasNama}</Header.Subheader>
          </Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column width={5}>
        <Header size="huge">
          <Header.Content>
            <Header.Subheader>Jumlah Penarikan : </Header.Subheader>
            Rp. {props.jumlah}
          </Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column width={3}>
        {props.konfirmasi ? (
          <Header size="medium">
            <Icon name="check" color="green" />
          </Header>
        ) : (
          <Header size="medium">
            <Icon name="close" color="red" />
          </Header>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default PenarikanItem
