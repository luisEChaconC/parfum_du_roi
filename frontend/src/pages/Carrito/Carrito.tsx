import { useContext } from "react"
import { CarritoContext } from "../../Context/Carrito/carrito"
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { Link } from "react-router-dom"
import { Routes } from "../../global/Routes/Routes"
import { useNavigate } from 'react-router-dom';
import "./Carrito.css"

export const Carrito = () => {
	const navigate = useNavigate();
	const { carrito, totalPrice, amountOfProducts, clearCart, removeFromCart, updateQuantity } = useContext(CarritoContext)

	// Empty cart component
	const EmptyCartState = () => (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				py: 10,
				textAlign: 'center'
			}}
		>
			<Box 
				sx={{ 
					mb: 4,
					width: 140,
					height: 140,
					opacity: 0.7 
				}}
			>
			<img 
				src="/img/carrito_transparente.png" 
				alt="Empty cart" 
				style={{ 
					width: '100%', 
					height: '100%',
					objectFit: 'contain'
				}}
			/>
			</Box>
				
			<Typography variant="h4" component="h2" sx={{ mb: 4, color: "#cfb662", fontWeight: "bold" }}>
				Tu carrito está vacío
			</Typography>
			
			<Button
				component={Link}
				to={Routes.Home}
				variant="contained"
				sx={{
					backgroundColor: "#cfb662",
					color: "#000",
					py: 1.5,
					px: 4,
					fontSize: "1rem",
					"&:hover": {
						backgroundColor: "#c4a037"
					}
				}}
			>
				Explorar Productos
			</Button>
		</Box>
	);

	// If cart is empty, display empty state
	if (carrito.length === 0) {
		return (
			<Container maxWidth="lg" sx={{ py: 4 }}>
				<Typography variant="h3" component="h1" sx={{ 
					mb: 4, 
					color: "#cfb662", 
				}}>
					<div className="tittle-page">
						CARRITO
					</div>
				</Typography>
				
				<Paper 
					elevation={0} 
					sx={{ 
						backgroundColor: "#121212", 
						p: 4, 
						borderRadius: 2
					}}
				>
					<EmptyCartState />
				</Paper>
			</Container>
		);
	}

	return (
		<Container maxWidth="lg" sx={{ py: 4}}>
			<Typography variant="h3" component="h1" sx={{ 
				mb: 4, 
				color: "#cfb662", 
			}}>
				<div className="tittle-page">
					CARRITO
				</div>
			</Typography>
				
			<Grid container spacing={4}>
				{/* Product List */}
				<Grid size={{ xs: 12, md: 8 }}>
					<Paper 
						elevation={0} 
						sx={{ 
							backgroundColor: "#121212", 
							p: 2, 
							borderRadius: 2,
							borderBottom: "1px solid #333"
						}}
					>
						{carrito.map((cartItem) => (
							<Box 
								key={cartItem.product.id} 
								sx={{ 
									display: "flex", 
									alignItems: "center", 
									py: 3,
									borderBottom: "1px solid #333",
									"&:last-child": { borderBottom: "none" }
								}}
							>
								{/* Product Image */}
								<Box 
									sx={{ 
										width: 100, 
										height: 100, 
										backgroundColor: "#1E1E1E", 
										display: "flex", 
										alignItems: "center", 
										justifyContent: "center",
										borderRadius: 2,
										overflow: "hidden",
										mr: 2
									}}
								>
									<img 
										src={cartItem.product.img} 
										alt={cartItem.product.name} 
										style={{ 
											maxWidth: "100%", 
											maxHeight: "100%", 
											objectFit: "contain" 
										}} 
									/>
								</Box>
									
								{/* Product Info */}
								<Box sx={{ flexGrow: 1, ml: 2 }}>
									<Typography variant="h6" sx={{ color: "#FFF" }}>
										{cartItem.product.name}
									</Typography>
									<Typography variant="body1" sx={{ color: "#FFF", mt: 1 }}>
										${cartItem.product.price.toFixed(2)}
									</Typography>
									<Button 
										onClick={() => removeFromCart(cartItem.product.id)}
										size="small"
										sx={{ 
											mt: 1, 
											color: "#cfb662",
											textTransform: "none",
											padding: "2px 8px",
											minWidth: "auto",
											borderRadius: "4px",
											fontSize: "0.75rem",
											backgroundColor: "rgba(212, 175, 55, 0.1)",
											border: "1px solid rgba(212, 175, 55, 0.3)",
											"&:hover": {
												backgroundColor: "rgba(212, 175, 55, 0.2)"
											}
										}}
									>
										Remover
									</Button>
								</Box>
									
								{/* Quantity Controls */}
								<Box sx={{ display: "flex", alignItems: "center", mx: 2,
									backgroundColor: "#222", borderRadius: "4px" 
								}}>
									<Button 
										onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity - 1)} 
										sx={{ minWidth: "30px", height: "38px", 
											p: 0, 
											color: "#cfb662", 
											border: "1px solid #cfb662",
											borderRadius: "4px 0 0 4px",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: "#222"
										}}
									>
										<RemoveIcon />
									</Button>
									<TextField
										value={cartItem.quantity}
										onChange={(e) => {
											const val = parseInt(e.target.value);
											if (!isNaN(val) && val > 0) {
												updateQuantity(cartItem.product.id, val);
											}
										}}
										inputProps={{ 
											min: 1, 
											style: { 
												textAlign: "center",
												width: "40px",
												padding: "8px 0",
												color: "#FFF",
												backgroundColor: "#222",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: "16px",
												fontWeight: "500"
											} 
										}}
										sx={{ 
											width: "60px",
											"& .MuiOutlinedInput-root": {
												height: "38px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												"& input": {
													textAlign: "center",
													padding: "8px 0",
												},
												"& fieldset": { 
													border: "1px solid #cfb662", 
													borderLeft: 0, 
													borderRight: 0 
												},
												"&:hover fieldset": { borderColor: "#cfb662" },
												"&.Mui-focused fieldset": { borderColor: "#cfb662" }
											}
										}}
									/>
									<Button 
										onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity + 1)} 
										sx={{ 
											minWidth: "30px",
											height: "38px", 
											p: 0, 
											color: "#cfb662", 
											border: "1px solid #cfb662",
											borderRadius: "0 4px 4px 0",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											backgroundColor: "#222"
										}}
									>
										<AddIcon />
									</Button>
								</Box>
									
								{/* Product Total */}
								<Box sx={{ width: 100, textAlign: "right" }}>
									<Typography variant="body1" sx={{ color: "#FFF", fontWeight: "bold" }}>
										${(cartItem.product.price * cartItem.quantity).toFixed(2)}
									</Typography>
								</Box>
							</Box>
						))}
					</Paper>
						
						{/* Cart Total */}
						<Box 
							sx={{ 
								display: "flex", 
								justifyContent: "space-between", 
								alignItems: "center", 
								mt: 3, 
								p: 2 
							}}
						>
							<Typography variant="h5" sx={{ color: "#FFF" }}>
								Total
							</Typography>
							<Typography variant="h5" sx={{ color: "#FFF" }}>
								${totalPrice.toFixed(2)}
							</Typography>
						</Box>
				</Grid>
					
					{/* Order Summary */}
					<Grid size={{ xs: 12, md: 4 }}>
						<Paper 
							elevation={0} 
							sx={{ 
								backgroundColor: "#121212", 
								p: 3, 
								borderRadius: 2 
							}}
						>
							<Typography variant="h5" component="h2" sx={{ 
								mb: 3, 
								color: "#cfb662", 
								fontWeight: "bold" 
							}}>
								RESUMEN
							</Typography>
								
							<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
								<Typography variant="body1" sx={{ color: "#FFF" }}>
									Total de artículos:
								</Typography>
								<Typography variant="body1" sx={{ color: "#FFF", fontWeight: "bold" }}>
									{amountOfProducts}
								</Typography>
							</Box>
								
							<Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
								<Typography variant="h6" sx={{ color: "#FFF" }}>
									Total:
								</Typography>
								<Typography variant="h6" sx={{ color: "#FFF", fontWeight: "bold" }}>
									${totalPrice.toFixed(2)}
								</Typography>
							</Box>
								

							<Button 
								fullWidth 
								variant="contained" 
								sx={{ 
									backgroundColor: "#cfb662", 
									color: "#000", 
									py: 1.5,
									"&:hover": {
										backgroundColor: "#c4a037"
									}
								}}
								onClick={() => { 
									clearCart(),
									navigate("/pay")
								}}
							>
								PAGAR
							</Button>

								
							<Button 
								fullWidth 
								variant="outlined" 
								onClick={clearCart}
								sx={{ 
									mt: 2,
									color: "#cfb662", 
									borderColor: "#cfb662",
									"&:hover": {
										borderColor: "#c4a037",
										backgroundColor: "rgba(212, 175, 55, 0.1)"
									}
								}}
							>
								Vaciar Carrito
							</Button>
						</Paper>
					</Grid>
				</Grid>
		</Container>
	)
}