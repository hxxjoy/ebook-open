import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import PrivateRoute from './PrivateRoute';
import MainLayout from '../layout/MainLayout';
import Home from '../page/home/Home';
import BookDetail from '../page/book/BookDetail';
import BookReader from '../page/book/BookReader';
import NoFooterLayout from '../layout/NoFooter';
import Search from '../page/book/Search';
import Category from '../page/book/Category';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公共路由 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/search/:word" element={<Search />} />
          <Route path="/category" element={<Category />} />
          {/*<Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/reader/:id" element={<Reader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />*/}
        </Route>
        
        <Route element={<NoFooterLayout />}>
          <Route path="/book/read/:id" element={<BookReader />} />
          <Route path="/book/read/:id/:chapterId" element={<BookReader />} />
        </Route>
        {/* 需要登录的路由 */}
        {/*<Route element={<PrivateRoute />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/books/upload" element={<BookUpload />} />
          <Route path="/books/manage" element={<BookManage />} />
        </Route>*/}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes; 