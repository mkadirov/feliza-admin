import { BarChart, QrCodeScanner, EmojiPeople, Settings, ShoppingBag, ColorLens, Percent, PersonOutline } from '@mui/icons-material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const navList = [
    {
        title: 'Statistika',
        path: '/home',
        icon: <BarChart />
    },
    {
        title: 'Mahsulotlar',
        path: '/products?page=1',
        icon: <QrCodeScanner />
    },
    {
        title: 'Buyurtmalar',
        path: '/orders',
        icon: <ShoppingBag />
    },
    {
        title: 'Foydalanuvchilar',
        path: '/users',
        icon: <EmojiPeople />
    },
    {
        title: 'Mijozlar',
        path: '/customers',
        icon: <PersonOutline />
    },
    {
        title: 'Sozlamalar',
        path: '/settings',
        icon: <Settings />
    },
    {
        title: 'Interface',
        path: '/interface',
        icon: <ColorLens />
    },
    {
        title: 'Sale',
        path: '/sale',
        icon: <Percent />
    },
    {
        title: 'Coupons',
        path: '/coupons',
        icon: <Percent />
    },
    {
        title: 'Review',
        path: '/review',
        icon: <RemoveRedEyeIcon />
    },
]

