import React, {useState, useContext, useEffect} from 'react'
import { Header, Segment, Grid, Form, Icon } from 'semantic-ui-react'
import PenarikanItem from './PenarikanItem'
import { UserContext, HOSTNAME } from '../../App'
import axios from 'axios'

function SaldoSaya(props) {
  const context = useContext(UserContext)
  const [input, setInput] = useState({
    no_rek: '',
    atas_nama:'',
    jumlah:0
  })
  const [kumpulanPenarikan, setkumpulanPenarikan] = useState([])
  const [loading, setloading] = useState(false)
  
  useEffect(() =>{
    setloading(true)
    axios.get(`${HOSTNAME}/penarikan`,{
      headers: { Authorization: `Bearer ${context.token}` },
    }).then(res => {
      setkumpulanPenarikan(res.data)
      setloading(false)
    })
  })

  function changeValue(value, name) {
    setInput({ ...input, [name]: value })
  }

  function addPenarikan() {
    console.log(input)
    if (context.getPengguna().usaha) {
      axios
        .post(
          `${HOSTNAME}/penarikan`,
          input,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${context.token}`,
            },
          }
        )
      .then(res => {
        axios.get(`${HOSTNAME}/penarikan`,{
          headers: { Authorization: `Bearer ${context.token}` },
        }).then(res => {
          setkumpulanPenarikan(res.data)
          setloading(false)
        })
      })
    }
  }

  return (
    <React.Fragment>
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
          <Form.Input
           fluid label="No. Rekening" 
           onChange={event => 
           changeValue(event.target.value, 'no_rek')}/>
          <Form.Input
           fluid label="Atas Nama"
           onChange={event =>
           changeValue(event.target.value, 'atas_nama')} />
          <Form.Input
           fluid label="Nominal"
           onChange={event => 
           changeValue(event.target.value, 'jumlah')} />
        </Form.Group>
        <Form.Button color="green" onClick={addPenarikan}>Tarik Saldo</Form.Button>
      </Form>
    </Segment>
          
      {kumpulanPenarikan.length ? (
        kumpulanPenarikan.map(penarikan => {
          const dateTime = new Date(penarikan.createdAt)
            const date = dateTime.getDate()
            const month = dateTime.getMonth() + 1
            const year = dateTime.getFullYear()
            const hour = dateTime.getHours()
            const minutes = dateTime.getMinutes()
        
      return (
        <Segment>
          <PenarikanItem key={penarikan.id_penarikan}
          noRek={penarikan.no_rek}
          atasNama={penarikan.atas_nama}
          tglPenarikan={`${date}-${month}-${year} ${hour}:${minutes}`}
          jumlah={penarikan.jumlah}
          konfirmasi={penarikan.konfirmasi}
          />
        </Segment>
        )}
      )): (
        <p>Penarikan Kosong</p>
      )}
    </React.Fragment>
  )
}

export default SaldoSaya

const styles = {
  marginGrid: {
    marginTop: 40,
    marginBottom: 40,
  },
}
