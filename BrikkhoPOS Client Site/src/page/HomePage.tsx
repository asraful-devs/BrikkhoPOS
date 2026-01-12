import { Outlet } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <div className=''>
                <Outlet />
            </div>
        </div>
    );
};

export default HomePage;
