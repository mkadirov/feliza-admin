import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../../components/Layout/MainLayout';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Dialog,
    DialogContent,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Delete } from '@mui/icons-material';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    function fetchData() {
        axios
            .get('https://felizabackend.uz/api/review/getAllReviews')
            .then((res) => {
                setReviews(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log('Error', err);
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleImageClick = (imgUrl) => {
        setSelectedImage(imgUrl);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
    };

    // detele function 
    const deleteReview = (id) => {
        axios
            .delete(`https://felizabackend.uz/api/review/deleteReview/${id}`)
            .then((res) => {
                console.log(res.data);
                fetchData();
            })
    }
    return (
        <MainLayout>
            <Typography variant="h4" align="center" gutterBottom>
                Foydalanuvchi Izohlari
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow style={{
                            background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            borderRadius: '4px',
                            padding: '10px',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                        }}>
                            <TableCell>Rasm</TableCell>
                            <TableCell>Foydalanuvchi</TableCell>
                            <TableCell>Telefon</TableCell>
                            <TableCell>Izoh</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <img
                                        src={item.customer?.image?.url || '/default-avatar.jpg'}
                                        alt="User"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        onClick={() => handleImageClick(item.customer?.image?.url)}
                                    />

                                </TableCell>
                                <TableCell>{item.customer?.fullName || 'Ismsiz'}</TableCell>
                                <TableCell>{item.customer?.phoneNumber || 'Nomaʼlum'}</TableCell>
                                <TableCell>{item.content || 'Izoh mavjud emas.'}</TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => deleteReview(item.id)}
                                        style={{
                                            background: 'red',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'background 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#b71c1c')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'red')}
                                    >
                                        <Delete
                                            sx={{
                                                color: 'white',
                                                fontSize: '20px',
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: '#ffebee',
                                                },
                                            }}
                                        />
                                    </button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogContent sx={{ position: 'relative', p: 2 }}>
                    <IconButton
                        onClick={handleClose}
                        aria-label="close"
                        setOpen={false}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'error.main',
                            transition: 'color 0.3s ease',
                            '&:hover': {
                                color: '#b71c1c', // dark red
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <img
                        src={selectedImage}
                        alt="To'liq rasm"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            maxHeight: '80vh',
                            margin: '0 auto',
                            display: 'block',
                            borderRadius: '10px',
                            objectFit: 'contain'
                        }}
                    />

                </DialogContent>
            </Dialog>
        </MainLayout>
    );
};

export default Review;
