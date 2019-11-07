import React from 'react'
import { Segment, Grid, Icon, Header } from 'semantic-ui-react'


function PenghasilanSayaItem(props) {
    console.log(props)
    return (
        <Segment>
            <Grid columns={2} celled textAlign="center" verticalAlign="middle">
                <Grid.Column width={11} textAlign="left">
                    <Header size="medium">
                        <Icon name="file alternate outline"/>
                        <Header.Content>
                            {props.transaksi.id_transaksi}
                            <Header.Subheader>{props.time}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header size="huge">
                        <Header.Content>
                            <Header.Subheader>Total Pendapatan : </Header.Subheader>
                            Rp. {props.transaksi.total_harga +
									props.transaksi.ongkir -
									props.transaksi.profit_koperasi}
                        </Header.Content>
                    </Header>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default PenghasilanSayaItem
