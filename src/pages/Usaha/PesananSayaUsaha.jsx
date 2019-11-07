import React, { useState, useEffect, useContext } from 'react';
import CardTabs, { listActiveItemPesanan } from './CardTabs';
import axios from 'axios';
import { HOSTNAME, UserContext } from '../../App';

function PesananSayaUsaha(props) {
	const context = useContext(UserContext);

	function setActiveItemData(item) {
		const transactions = kumpulanTransaksi;
		switch (item) {
			case listActiveItemPesanan.semuaPesanan:
				setSelectedTransaksi(transactions. filter((transaction) => !transaction.selesai));
				break;
			case listActiveItemPesanan.belumBayar:
				setSelectedTransaksi(transactions.filter((transaction) => !transaction.konfirmasi));
				break;
			case listActiveItemPesanan.perluDikirim:
				setSelectedTransaksi(
					transactions.filter((transaction) => transaction.konfirmasi && !transaction.kirim)
				);
				break;
			case listActiveItemPesanan.dikirim:
				setSelectedTransaksi(transactions.filter((transaction) => transaction.kirim && !transaction.selesai));
				break;
		}
		setActiveItemPesanan(item);
	}

	function kirimResi(idTransaksi, no_resi) {
		axios
			.put(
				`${HOSTNAME}/transaksi/${idTransaksi}/kirim`,
				{
					no_resi: no_resi
				},
				{
					headers: { Authorization: `Bearer ${context.token}` }
				}
			)
			.then(() => {
				axios
					.get(`${HOSTNAME}/transaksi/usaha`, {
						headers: { Authorization: `Bearer ${context.token}` }
					})
					.then((res) => {
						const finishedTransaksi = res.data.filter(transaksi => !transaksi.selesai)
						setKumpulanTransaksi(finishedTransaksi);
						setActiveItemData(listActiveItemPesanan.dikirim);
					});
			});
	}

	useEffect(() => {
		axios
			.get(`${HOSTNAME}/transaksi/usaha`, {
				headers: { Authorization: `Bearer ${context.token}` }
			})
			.then((res) => {
				setKumpulanTransaksi(res.data);
				setActiveItemData(listActiveItemPesanan.semuaPesanan);
			});
	}, []);

	const [ kumpulanTransaksi, setKumpulanTransaksi ] = useState([]);
	const [ activeItemPesanan, setActiveItemPesanan ] = useState(listActiveItemPesanan.semuaPesanan);
	const [ selectedTransaksi, setSelectedTransaksi ] = useState([]);

	return (
		<div style={{ marginLeft: '20px' }}>
			<CardTabs
				kumpulanTransaksi={selectedTransaksi}
				activeItemPesanan={activeItemPesanan}
				setActiveItemPesanan={setActiveItemData}
				history={props.history}
				kirimResi={kirimResi}
			/>
		</div>
	);
}

export default PesananSayaUsaha;
