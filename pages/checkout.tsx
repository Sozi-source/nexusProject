
import { useAuth } from "@/firebase/auth";
import ProtectedRoute from "@/components/common/protectedRoute";

const Checkout: React.FC = () => {
const {user, loading}= useAuth();

 const handleCheckout=()=>{
    console.log("Proceed to checkout", user)

    if(!user){
        console.warn("You must login to checkout")
    }
    
}
return(
    <ProtectedRoute isAuthenticated={!!user} loading={loading}>
    <div>
        <h2>Checkout</h2>
        <button 
        onClick={handleCheckout}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        >{loading? "Loading": "Confirm & Pay"}
        </button>
    </div>
    </ProtectedRoute>
)
}
export default Checkout;








  