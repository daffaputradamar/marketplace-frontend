import React from 'react'
import { Grid, Segment, Dropdown, Divider } from 'semantic-ui-react'

function PenghasilanSaya() {
  const statusOptions = [
    {
      key: 'Pesanan Dibuat',
      text: 'Pesanan Dibuat',
      value: 'Pesanan Dibuat',
    },
    {
      key: 'Pesanan Siap',
      text: 'Pesanan Siap',
      value: 'Pesanan Siap',
    },
    {
      key: 'Pesanan Dibayar',
      text: 'Pesanan Dibayar',
      value: 'Pesanan Dibayar',
    },
  ]
  return (
    <React.Fragment>
      <Segment>
        <Grid.Row>
          <Grid columns={2}>
            <Grid.Column width="7">
              Status Pesanan :
              <Dropdown
                style={styles.marginLeft}
                placeholder="Pilih Status Pesanan"
                selection
                options={statusOptions}></Dropdown>
            </Grid.Column>
            <Grid.Column width="7">Pesanan sampai dengan tanggal :</Grid.Column>
          </Grid>
        </Grid.Row>
        <Divider />
        <Grid.Row>Kriteria Utama :</Grid.Row>
      </Segment>
    </React.Fragment>
  )
}

export default PenghasilanSaya

const styles = {
  marginLeft: {
    marginLeft: '20px',
  },
}
