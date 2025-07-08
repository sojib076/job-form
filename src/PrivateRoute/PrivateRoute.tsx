
import { useAppSelector } from '@/redux/Hook';
import { Navigate } from 'react-router-dom';

interface UserRouteProps {
     children: React.ReactNode;
   }
const PrivateRoute:React.FC<UserRouteProps>  = ({children}) => {
    // Access the authentication state from Redux
    const auth = useAppSelector((state) => state.auth.user?.email);
     return auth ? children : <Navigate to="/login" />;
    
};

export default PrivateRoute;