import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Layout = () => {
  return (
    <div className='h-screen w-screen flex'>
      <Sidebar />
      <div className='flex-grow md:w-3/4 '>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
