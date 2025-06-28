export default function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Local Experts. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}
