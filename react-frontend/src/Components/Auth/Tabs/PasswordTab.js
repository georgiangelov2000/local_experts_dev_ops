export default function PasswordTab() {
  return (
    <>
      <p className="mb-4 bg-gray-400 p-2 text-white">
        Променете паролата си за по-висока сигурност.
      </p>
      <form className="space-y-2">
        <div>
          <label className="block mb-1 font-medium">Current Password</label>
          <input 
            type="password" 
            className="w-full border border-gray-300 rounded p-2" 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">New Password</label>
          <input 
            type="password" 
            className="w-full border border-gray-300 rounded p-2" 
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Confirm New Password</label>
          <input 
            type="password" 
            className="w-full border border-gray-300 rounded p-2" 
          />
        </div>
      </form>
    </>
  );
}
