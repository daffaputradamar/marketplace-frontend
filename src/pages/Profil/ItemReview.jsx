import React, {useState, useContext} from 'react';
import { Container, Header, Grid, Image, TextArea, Button } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { HOSTNAME, UserContext } from '../../App';

function ItemReview(props) {
	const context = useContext(UserContext)
	function changeRating(newRating, name) {
		setRating(newRating)
		
	}
	function addReview(idProduk) {
		axios
		.post(`${HOSTNAME}/review`, {
			id_produk:idProduk,
			rating,
			komentar
		},{
			headers: { Authorization: `Bearer ${context.token}` },
		}).then(res => {
			setRating(0)
			setKomentar('')
		})
	}
	const [rating, setRating] = useState(0)
	const [komentar, setKomentar] = useState('')
	return (
		<Container>
			{props.transaksi.detail_transaksis.map((detail) => (
				<div key={detail.id_detiltransaksi}>
					<Grid>
						<Grid.Row>
							<Grid.Column width={5}>
								<Header as="h5">Nama Barang : {detail.produk.nama}</Header>
							</Grid.Column>
							<Grid.Column width={11}>
								<Grid>
									<Grid.Column width={4}>
										<p style={{ fontSize: 15 }}>Rating :</p>
									</Grid.Column>
									<Grid.Column width={11}>
										<StarRatings
											starRatedColor="rgb(243, 156, 18)"
											starHoverColor="rgb(243, 156, 18)"
											numberOfStars={5}
											name="rating"
											rating = {rating}
											changeRating = {changeRating}
											starDimension="20px"
											starSpacing="5px"
										/>
									</Grid.Column>
								</Grid>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid>
						<Grid.Column width={5}>
							<Image src="https://placeimg.com/120/120/any" size="small" />
						</Grid.Column>
						<Grid.Column width={11}>
							<p style={{ fontSize: 15 }}>Komentar</p>
							<TextArea rows={3} style={{ width: 300, height: 80 }} onChange={(e)=>setKomentar(e.target.value)}/>
							<Button color="yellow" floated="right" style={{ marginRight: 270 }} onClick={(e) => addReview(detail.produk.id_produk)}>
								Kirim
							</Button>
						</Grid.Column>
					</Grid>
				</div>
			))}
		</Container>
	);
}

export default ItemReview;
