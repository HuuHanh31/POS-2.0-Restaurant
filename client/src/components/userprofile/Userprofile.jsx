import React, { useState, useEffect } from 'react';
import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./Userprofile.module.css";
import { useNavigate } from "react-router-dom";

import getProfile from '../../midlewares/getProfile';
import putProfile from '../../midlewares/putProfile';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import SecurityIcon from '@mui/icons-material/Security';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import axios from 'axios';
import Home from '@mui/icons-material/Home';

function Userprofile(){
    const [profile, setProfile] = useState({})
	const [displayName, setDisplayName] = useState('')
	const [changeDB, setChangeDB] = useState('')

	useEffect(() => {
		const fetch = async () => {
			const pf = await getProfile()
			const theProfile = pf.data['theProfile']
			setProfile(theProfile)
			if (theProfile.fname || theProfile.lname) 
				setDisplayName(theProfile.fname.concat(' ').concat(theProfile.lname))
		}
		fetch()
	}, [changeDB])

	const handleOnChangeFname = (e) => {
		setProfile({
			...profile,
			fname: e.target.value
		})
	}

	const handleOnChangeLname = (e) => {
		setProfile({
			...profile,
			lname: e.target.value
		})
	}

	const handleOnChangePhone = (e) => {
		setProfile({
			...profile,
			phone: e.target.value
		})
	}

	const handleOnChangeAddress = (e) => {
		setProfile({
			...profile,
			address: e.target.value
		})
		console.log(profile.address)
	}

	const handleOnclickSubmitbtn = (e) => {
		e.preventDefault()
		putProfile(profile)
		setChangeDB(!changeDB)
	}

	if (!profile.email) {
		return "loading data"
	}

	return (
		<Container fluid='lg' sx={{}}>
			<Container fluid='lg' sx={{p:2}}>
				<Box sx={{bgcolor: '#F8F8F8',p:2, height: '100vh' }}>
					<Box 
						sx={{
							display:'flex', 
							px: 5, bgcolor:'white', height:'98%'
						}}
					>
						<Box id="sidebar" sx={{maxWidth: '35%', py: 8, pr: 6}} style={{borderRight: '4px solid #dfdfdf'}}>

							<Link to="/" style={{ textDecoration: "none" }}>
									<Box 
										id='sidebar-item' 
										sx={{display:'flex', alignItems:'center', mb: 1, fontSize: 30}}
									>
										<Home fontSize='inherit'/>
										<Box sx={{ml: 1, fontSize: 18, display: {xs: 'none', md:'block'}}}>Về trang chủ</Box>
									</Box>

            				</Link>
							<Link to="/profile" style={{ textDecoration: "none" }}>
									<Box 
										id='sidebar-item' 
										sx={{display:'flex', alignItems:'center', mb: 1, fontSize: 30}}
									>
										<AccountCircleIcon fontSize='inherit'/>
										<Box sx={{ml: 1, fontSize: 18, display: {xs: 'none', md:'block'}}}>Thông tin tài khoản</Box>
									</Box>

            				</Link>

						</Box>

						<Box id="body" 
							sx={{
								width: '60%', py: 8, ml:8, 
								display:'flex', flexDirection: 'column'
							}}
						>
							<Box id="body-title" sx={{display:'flex', fontSize: 50, mb: 8}}>
								<AccountCircleIcon fontSize='inherit'/>
								<Box sx={{my: 'auto', ml: 2}}>
									{displayName==='' ?
									<Box sx={{fontSize: 20, }}>Không tên</Box>
									:
									<Box sx={{fontSize: 20, }}>{displayName}</Box>
									}
									<Box sx={{fontSize: 20, }}>{profile.email}</Box>	
								</Box>
							</Box>
							<form onSubmit={handleOnclickSubmitbtn}>
								<Box sx={{mb: 3}}>
									<Grid container spacing={3}>
										<Grid item xs={12} md={6} >
											<TextField 
												variant="outlined" 
												fullWidth 
												required
												label='Tên' 
												onChange={handleOnChangeFname}
												defaultValue={profile.fname}
												InputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField 
												variant='outlined' 
												fullWidth 
												required
												label='Họ' 
												onChange={handleOnChangeLname}
												defaultValue={profile.lname}
												InputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField 
												fullWidth 
												variant="outlined" 
												label='Địa chỉ' 
												defaultValue={profile.address}
												onChange={handleOnChangeAddress}
												InputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField 
												fullWidth 
												variant="outlined" 
												label='Số điện thoại' 
												defaultValue={profile.phone}
												onChange={handleOnChangePhone}
												InputProps={{ style: { fontSize: 14 } }}
												InputLabelProps={{ style: { fontSize: 14 } }}
											/>
										</Grid>
									</Grid>
								</Box>
								<Button 
									fullWidth type="submit" color="secondary" variant="contained"
									
									style={{ fontSize: '14px'}}
								>
									Lưu thay đổi
								</Button>
							</form>

							

						</Box>
					</Box>
				</Box>
			</Container>
		</Container>
	)
}
export default Userprofile