import { Link } from 'react-router-dom';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiHeart,
  FiShield,
  FiUsers,
  FiStar
} from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-5 pb-5">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
                LE
              </div>
              <div className="ml-3">
                <h3 className="text-xl font-bold">Local Experts</h3>
                <p className="text-gray-400 text-sm">Find Your Perfect Match</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Connect with trusted local service providers for your needs, anywhere and anytime.
            </p>
            <div className="flex space-x-3">
              {[FiTwitter, FiFacebook, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <FiStar className="mr-2 text-blue-400" /> Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/favourites" className="hover:text-blue-400">Favourites</Link></li>
              <li><Link to="/profile" className="hover:text-blue-400">My Profile</Link></li>
              <li><a href="#" className="hover:text-blue-400">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-400">Success Stories</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <FiUsers className="mr-2 text-green-400" /> Services
            </h4>
            <ul className="space-y-2 text-sm">
              {['Home Services', 'Professional Services', 'Health & Wellness', 'Education & Training', 'Technology Services']
                .map((service, i) => (
                  <li key={i}><a href="#" className="hover:text-blue-400">{service}</a></li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <FiMail className="mr-2 text-purple-400" /> Contact Us
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center"><FiMail className="mr-2 text-purple-400" /> support@localexperts.com</div>
              <div className="flex items-center"><FiPhone className="mr-2 text-purple-400" /> +1 (555) 123-4567</div>
              <div className="flex items-start"><FiMapPin className="mr-2 text-purple-400 mt-1" /> 123 Business Ave, Suite 100<br />City, State 12345</div>
            </div>
            {/* Newsletter */}
            <div className="mt-5">
              <h5 className="text-sm font-medium mb-2">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg">
                  <FiMail />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 lg:hidden">
        <nav className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-gray-400 hover:text-white">
            <FiStar className="text-xl" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/favourites" className="flex flex-col items-center text-gray-400 hover:text-white">
            <FiHeart className="text-xl" />
            <span className="text-xs">Favs</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-gray-400 hover:text-white">
            <FiUsers className="text-xl" />
            <span className="text-xs">Profile</span>
          </Link>
          <a href="#" className="flex flex-col items-center text-gray-400 hover:text-white">
            <FiShield className="text-xl" />
            <span className="text-xs">Policy</span>
          </a>
        </nav>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 text-gray-400 text-sm text-center py-4">
        © {currentYear} Local Experts. Made with <FiHeart className="inline text-red-400" /> for our community.
      </div>
    </footer>
  );
}
