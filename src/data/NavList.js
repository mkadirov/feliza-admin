import {BarChart, QrCodeScanner, EmojiPeople, Settings, ShoppingBag} from '@mui/icons-material'

export const navList = [
    {
        title: 'Statistika',
        path: '/home',
        icon: <BarChart/>
    },
    {
        title: 'Mahsulotlar',
        path: '/products',
        icon: <QrCodeScanner/>
    },
    {
        title: 'Buyurtmalar',
        path: '/orders',
        icon: <ShoppingBag/>
    },
    {
        title: 'Mijozlar',
        path: '/customers',
        icon: <EmojiPeople/>
    },
    {
        title: 'Sozlamalar',
        path: '/settings',
        icon: <Settings/>
    },
    


]

