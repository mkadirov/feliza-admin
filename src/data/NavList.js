import {BarChart, QrCodeScanner, EmojiPeople, Settings, ShoppingBag, ColorLens, Percent} from '@mui/icons-material'

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
        title: 'Foydalanuvchilar',
        path: '/customers',
        icon: <EmojiPeople/>
    },
    {
        title: 'Sozlamalar',
        path: '/settings',
        icon: <Settings/>
    },
    {
        title: 'Interface',
        path: '/interface',
        icon: <ColorLens/>
    },
    {
        title: 'Sale',
        path: '/sale',
        icon: <Percent/>
    },
]

