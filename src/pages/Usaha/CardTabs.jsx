import _ from 'lodash'
import React from 'react'
import { Grid, Container, Menu, Header } from 'semantic-ui-react'
import LogTransaksiUsaha from './LogTransaksiUsaha'

export const listActiveItemPesanan = {
  semuaPesanan: 'Semua Pesanan',
  belumBayar: 'Belum Bayar',
  perluDikirim: 'Perlu Dikirim',
  dikirim: 'Dikirim',
}

function CardTabs(props) {
  return (
    <Container>
      <Grid columns={16}>
        <Grid.Row>
          <Grid.Column width="16">
            <Menu pointing secondary fluid widths={4}>
              <Menu.Item
                name="Semua Pesanan"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.semuaPesanan
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.semuaPesanan)
                }
              />
              <Menu.Item
                name="Belum Bayar"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.belumBayar
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.belumBayar)
                }
              />
              <Menu.Item
                name="Perlu Dikirim"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.perluDikirim
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.perluDikirim)
                }
              />
              <Menu.Item
                name="Dikirim"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.dikirim
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.dikirim)
                }
              />
            </Menu>
          </Grid.Column>
        </Grid.Row>
        {props.kumpulanTransaksi.length != 0 ? (
          <>
            {props.activeItemPesanan === listActiveItemPesanan.semuaPesanan && (
              <LogTransaksiUsaha kirimResi={props.kirimResi} history={props.history} kumpulanTransaksi={props.kumpulanTransaksi} />
            )}
            {props.activeItemPesanan === listActiveItemPesanan.belumBayar && (
              <LogTransaksiUsaha kirimResi={props.kirimResi} history={props.history} kumpulanTransaksi={props.kumpulanTransaksi} />
            )}
            {props.activeItemPesanan === listActiveItemPesanan.perluDikirim && (
              <LogTransaksiUsaha kirimResi={props.kirimResi} history={props.history} kumpulanTransaksi={props.kumpulanTransaksi} />
            )}
            {props.activeItemPesanan === listActiveItemPesanan.dikirim && (
              <LogTransaksiUsaha kirimResi={props.kirimResi} history={props.history} kumpulanTransaksi={props.kumpulanTransaksi} />
            )}
          </>
        ) : (
          <Container style={styles.marginCard}>
            <Header as="h2">Transaksi Kosong</Header>
          </Container>
        )}
      </Grid>
    </Container>
  )
}

const styles = {
  marginCard: {
    marginTop: '15px',
  },
}

export default CardTabs
