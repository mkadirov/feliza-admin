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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const fetchData = () => {
        axios
            .get('https://felizabackend.uz/api/review/getAllReviews')
            .then((res) => {
                setReviews(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log('Error', err);
            });
    };

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

    const deleteReview = (id) => {
        axios
            .delete(`https://felizabackend.uz/api/review/deleteReview/${id}`)
            .then((res) => {
                console.log(res.data);
                fetchData();
                alert('Izoh muvaffaqiyatli o`chirildi.');
                console.log('Izoh o`chirildi:', res.data);
            });
    };

    const approveReview = (id) => {
        axios
            .put('https://felizabackend.uz/api/review/moderateReview', { reviewId: id })
            .then((res) => {
                console.log('Tastiqlandi:', res.data);
                fetchData();
                alert('Izoh tasdiqlandi va ilovada ko‘rinadi.');
            })
            .catch((err) => {
                console.error('Tasdiqlashda xatolik:', err.response?.data || err);
                alert('Izohni tasdiqlashda xatolik yuz berdi.');
            });
    };



    return (
        <MainLayout>
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 3 }}>
                Foydalanuvchi Izohlari
            </Typography>

            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell><strong>Rasm</strong></TableCell>
                            <TableCell><strong>Foydalanuvchi</strong></TableCell>
                            <TableCell><strong>Telefon</strong></TableCell>
                            <TableCell><strong>Izoh</strong></TableCell>
                            <TableCell><strong>Delete</strong></TableCell>
                            <TableCell><strong>Tasdiqlash</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((item) => (
                            <TableRow key={item.id} hover>
                                <TableCell className='flex'>
                                    {item?.reviewImages?.map((event, index) => (
                                        <img
                                            key={index}
                                            src={event?.url || '/default-avatar.jpg'}
                                            alt="Mahsulot rasmi"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                marginRight: '5px',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease',
                                                border: '2px solid #eee',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                            onClick={() => handleImageClick(event?.url)}
                                        />
                                    ))}
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
                                        <Delete sx={{ fontSize: '20px', color: 'white' }} />
                                    </button>
                                </TableCell>
                                <TableCell>
                                    {item.approved ? (
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>Tasdiqlangan</span>
                                    ) : (
                                        <button
                                            onClick={() => approveReview(item.id)}
                                            style={{
                                                background: 'green',
                                                color: 'white',
                                                border: 'none',
                                                padding: '5px 10px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            <CheckCircleIcon />
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal (Dialog) */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogContent sx={{ position: 'relative', p: 2, textAlign: 'center' }}>
                    <IconButton
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'error.main',
                            '&:hover': {
                                color: '#b71c1c',
                            },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <img
                        src={selectedImage}
                        alt="To'liq rasm"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '80vh',
                            borderRadius: '10px',
                            objectFit: 'contain',
                            margin: 'auto',
                        }}
                    />
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
};

export default Review;
