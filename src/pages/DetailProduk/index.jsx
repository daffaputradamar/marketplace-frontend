import React, { useState, useContext, useEffect } from 'react'
import { UserContext, HOSTNAME } from '../../App'
import { Link } from 'react-router-dom'
import {
  Container,
  Image,
  Grid,
  Input,
  Header,
  Divider,
  Form,
  Button,
  Segment,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import axios from 'axios'
import ItemUlasan from './ItemUlasan'

function DetailProduk(props) {
  const context = useContext(UserContext)
  const [produk, setProduk] = useState(props.location.state)
  const [usaha, setUsaha] = useState({})
  const [jumlah, setJumlah] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${HOSTNAME}/usaha/${produk.id_usaha}/produk/${produk.id_produk}`)
      .then(res => {
        console.log(res.data.reviews)
        setUsaha(res.data.usaha)
        setProduk(res.data)
        if (doesHaveSameUsahaId()) {
          setJumlah(produk.stok)
        }
        setLoading(false)
      })
  }, [])

  function addKeranjang() {
    axios
      .post(
        `${HOSTNAME}/keranjang`,
        {
          id_produk: produk.id_produk,
          jumlah,
        },
        { headers: { Authorization: `Bearer ${context.token}` } },
      )
      .then(() => props.history.push('/keranjang'))
  }

  function updateStok() {
    axios
      .put(
        `${HOSTNAME}/usaha/${produk.id_usaha}/produk/${produk.id_produk}`,
        {
          stok: parseInt(jumlah),
        },
        { headers: { Authorization: `Bearer ${context.token}` } },
      )
      .then(res => {
        setProduk(res.data)
      })
  }

  function deleteProduk() {
    axios
      .delete(
        `${HOSTNAME}/usaha/${produk.id_usaha}/produk/${produk.id_produk}`,
        { headers: { Authorization: `Bearer ${context.token}` } },
      )
      .then(() => props.history.push('/usaha'))
  }

  function isLoggedIn() {
    return context.isLoggedIn()
  }

  function doesHaveUsaha() {
    return isLoggedIn() && context.getPengguna().usaha
  }

  function doesHaveSameUsahaId() {
    if (doesHaveUsaha()) {
      const produkUsaha = produk.id_usaha
      const userUsaha = context.getPengguna().usaha.id_usaha
      return doesHaveUsaha() && produkUsaha == userUsaha
    } else {
      return false
    }
  }

  return !loading ? (
    <Container>
      <Grid columns={2} relaxed="very">
        <Grid.Column width="8">
          <Image fluid src="https://placeimg.com/250/200/any" />
        </Grid.Column>
        <Grid.Column>
          <Header size="huge" content={produk.nama} />
          <Header size="tiny">
            Kategori: &emsp; <span>{produk.kategori.nama_kategori}</span>
          </Header>
          <Divider horizontal>Detail Produk</Divider>
          <Grid celled columns="3">
            <Grid.Column>
              <Header
                size="small"
                icon="dollar"
                content="Harga"
                subheader={`Rp. ${produk.harga}`}
              />
            </Grid.Column>
            <Grid.Column>
              <Header
                size="small"
                icon="box"
                content="Stok"
                subheader={produk.stok}
              />
            </Grid.Column>
            <Grid.Column>
              <Header
                size="small"
                icon="weight"
                content="Berat"
                subheader={`${produk.berat} gr`}
              />
            </Grid.Column>
          </Grid>
          <p>{produk.deskripsi}</p>

          <Divider />

          <Form>
            <Form.Field>
              <label>Jumlah</label>
              {!doesHaveSameUsahaId() ? (
                <Input
                  type="number"
                  placeholder="Jumlah"
                  value={jumlah}
                  onChange={(event, { value }) => setJumlah(value)}
                  min="1"
                  action={{
                    color: 'blue',
                    labelPosition: 'right',
                    icon: 'cart',
                    content: 'Beli',
                    onClick: addKeranjang,
                  }}
                />
              ) : (
                <Input
                  type="number"
                  placeholder="Jumlah"
                  value={jumlah}
                  onChange={(event, { value }) => setJumlah(value)}
                  min="1"
                  action={{
                    color: 'yellow',
                    labelPosition: 'right',
                    icon: 'sync',
                    content: 'Update Stok',
                    onClick: updateStok,
                  }}
                />
              )}
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Column />
        <Grid.Column>
          <Grid columns={2} celled="internally" verticalAlign="middle">
            {!doesHaveSameUsahaId() ? (
              <React.Fragment>
                <Grid.Column>
                  {usaha && (
                    <Header
                      size="tiny"
                      icon="warehouse"
                      content={usaha.nama}
                      floated="right"
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  <Link to={{ pathname: '/usaha', state: produk.usaha }}>
                    <Button color="instagram" size="medium" floated="left">
                      Kunjungi Toko
                    </Button>
                  </Link>
                </Grid.Column>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid.Column>
                  <Button disabled color="yellow" size="medium" floated="right">
                    Update Produk
                  </Button>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    color="red"
                    size="medium"
                    floated="left"
                    onClick={deleteProduk}>
                    Delete Produk
                  </Button>
                </Grid.Column>
              </React.Fragment>
            )}
          </Grid>
        </Grid.Column>
      </Grid>
      <Header as="h3">Ulasan</Header>
      {produk.reviews.map(review => {
        return <ItemUlasan review={review} key={review.id_review} />
      })}
    </Container>
  ) : (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted content="Loading" />
      </Dimmer>

      <Image src="/images/wireframe/short-paragraph.png" />
    </Segment>
  )
}

export default DetailProduk
