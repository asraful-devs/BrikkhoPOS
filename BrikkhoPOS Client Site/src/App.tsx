import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { Button } from './components/ui/button';
import CommonLayout from './layout/CommonLayout';

function App() {
    return (
        <>
            <CommonLayout>
                <Outlet />
                <div className=''>
                    <Button>
                        <Link to='/login'>Go to Login</Link>
                    </Button>
                    <Button>
                        <Link to='/login'>Go to Login</Link>
                    </Button>
                </div>
            </CommonLayout>
        </>
    );
}

export default App;
