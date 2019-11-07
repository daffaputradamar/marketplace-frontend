import React, {useContext, useEffect, useState} from 'react'
import PenghasilanSayaItem from './PenghasilanSayaItem'
import { HOSTNAME, UserContext } from '../../App'
import axios from 'axios';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';

function PenghasilanSaya(props) {
  const context = useContext(UserContext)

  useEffect(() => {
    setLoading(true)
		axios
			.get(`${HOSTNAME}/transaksi/usaha`, {
				headers: { Authorization: `Bearer ${context.token}` }
			})
			.then((res) => {
        setKumpulanTransaksi(res.data);
        const transaksiSelesai = res.data.filter(transaksi => transaksi.selesai)
        setSelectedTransaksi(transaksiSelesai);
        console.log(transaksiSelesai)
        setLoading(false)
			});
  }, []);

  const [ kumpulanTransaksi, setKumpulanTransaksi ] = useState([]);
  const [ selectedTransaksi, setSelectedTransaksi ] = useState([]);
  const [loading, setLoading] = useState(false)
  
  return (
    loading ? (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted content="loading" />
        </Dimmer>
      </Segment>
    ) : (
      selectedTransaksi.map(transaksi => {
        const dateTime = new Date(transaksi.createdAt);
        const date = dateTime.getDate();
        const month = dateTime.getMonth() + 1;
        const year = dateTime.getFullYear();
        const hour = dateTime.getHours();
        const minutes = dateTime.getMinutes();

        const time = `${date}-${month}-${year} ${hour}:${minutes}`;
        return(
          <PenghasilanSayaItem transaksi={transaksi} time={time} key={transaksi.id_transaksi}/>
        )
      })
    )
  )
}

export default PenghasilanSaya