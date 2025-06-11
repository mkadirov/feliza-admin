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
import WarningIcon from '@mui/icons-material/Warning';

const Review = () => {
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const fetchData = () => {
        axios
            .get('https://felizabackend.uz/api/review/getAllReviews')
            .then((res) => setReviews(res.data))
            .catch((err) => console.error('Error', err));
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
            .then(() => {
                fetchData();
                alert('Izoh o‘chirildi.');
            })
            .catch((err) => {
                console.error('O‘chirishda xatolik:', err);
                alert('Izohni o‘chirishda xatolik yuz berdi.');
            });
    };

    const approveReview = (id) => {
        axios
            .put(`https://felizabackend.uz/api/review/moderateReview`, { reviewId: id, moder: true })
            .then(() => {
                fetchData();
                alert('Izoh tasdiqlandi.');
            })
            .catch((err) => {
                console.error('Tasdiqlashda xatolik:', err);
                alert('Izohni tasdiqlashda xatolik yuz berdi.');
            });
    };
    console.log(reviews);
    return (
        <MainLayout>
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3, mb: 3 }}>
                Foydalanuvchi Izohlari
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell><strong>Rasm</strong></TableCell>
                            <TableCell><strong>Foydalanuvchi</strong></TableCell>
                            <TableCell><strong>Telefon</strong></TableCell>
                            <TableCell><strong>Izoh</strong></TableCell>
                            <TableCell><strong>Mahsulot</strong></TableCell>
                            <TableCell><strong>Delete</strong></TableCell>
                            <TableCell><strong>Tasdiqlash</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviews.map((item) => (
                            <TableRow key={item.id} hover>
                                <TableCell>
                                    {item?.reviewImages?.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img?.url}
                                            alt="review"
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: '8px',
                                                marginRight: 5,
                                                objectFit: 'cover',
                                                cursor: 'pointer',
                                                border: '2px solid #eee',
                                                transition: 'transform 0.3s ease',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                            onClick={() => handleImageClick(img?.url)}
                                        />
                                    ))}
                                </TableCell>

                                <TableCell>{item.customer?.fullName || 'Ismsiz'}</TableCell>
                                <TableCell>{item.customer?.phoneNumber || 'Nomaʼlum'}</TableCell>
                                <TableCell>{item.content || 'Izoh mavjud emas.'}</TableCell>
                                <TableCell>
                                    <div>
                                        <div><strong>{item.product?.nameUZB || 'Nomaʼlum'}</strong></div>
                                        <div>{item.product?.brand?.name && `Brend: ${item.product.brand.name}`}</div>
                                        <div>{item.product?.sellPrice ? `Narxi: ${item.product.sellPrice} so'm` : ''}</div>
                                    </div>
                                </TableCell>
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
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = '#b71c1c')}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = 'red')}
                                    >
                                        <Delete sx={{ fontSize: 20, color: 'white' }} />
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button
                                        onClick={() => approveReview(item.id)}
                                        style={{
                                            background: item.moderation ? 'green' : 'orange',
                                            color: 'white',
                                            border: 'none',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        {item.moderation ? (
                                            <> <CheckCircleIcon /> Tasdiqlandi</>
                                        ) : (
                                            <>
                                                <WarningIcon /> Tasdiqlanmagan
                                            </>
                                        )}
                                    </button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for image */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogContent sx={{ position: 'relative', p: 2, textAlign: 'center' }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'error.main',
                            '&:hover': { color: '#b71c1c' },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={selectedImage}
                        alt="Kattalashtirilgan rasm"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '80vh',
                            borderRadius: 10,
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
