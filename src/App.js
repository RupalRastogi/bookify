import {Routes,Route} from 'react-router-dom';

//page 
import RegisterPage from './pages/Register';
import LoginPage from './pages/login';
import ListingPage from './pages/list';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Details';
import OrdersPage from './pages/ViewOrder';
import ViewOrderDetail from './pages/ViewOrderDetail';

// components
import MyNavbar from './components/Navbar';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  return (
    <div>
    <MyNavbar/>
    <Routes>

    <Route path='/' element={<HomePage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/book/list' element={<ListingPage/>}/>
    <Route path='/book/view/:bookId' element={<BookDetailPage/>}/>
    <Route path='/book/order' element={<OrdersPage/>}/>
    <Route path='/book/order/:bookId' element={<ViewOrderDetail/>}/>
    

    </Routes>
    </div>
  )

}

export default App;
