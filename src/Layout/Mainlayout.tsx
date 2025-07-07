import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div>
            <header>
                <h1>Main Layout</h1>
                {/* You can add navigation links or other header content here */}
            </header>
            <Outlet />
            <footer>
                <p>Footer content goes here</p>
                {/* You can add footer links or other footer content here */}
            </footer>
            
        
        </div>
    );
};

export default MainLayout;