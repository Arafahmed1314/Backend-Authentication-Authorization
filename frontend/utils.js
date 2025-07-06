import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
    position: 'top-right',  // ✅ Simpler and safer than toast.POSITIONS.TOP_RIGHT
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const handleSuccess = (msg) => toast.success(msg, toastOptions);
export const handleError = (msg) => toast.error(msg, toastOptions);
