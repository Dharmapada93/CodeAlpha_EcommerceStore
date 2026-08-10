import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
