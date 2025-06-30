import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Layouts/Header';
import Home from './Layouts/Home';
import Login from './Layouts/Login';
import Register from './Layouts/Register';
import Footer from './Layouts/Footer';
import Favourites from './Layouts/Favourites';
import Provider from './Layouts/Provider';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <>
              <Header />
              <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/favourites" element={<Favourites />} />
                  <Route path="/providers/:id" element={<Provider />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
