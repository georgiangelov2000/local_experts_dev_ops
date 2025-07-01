export default function SettingsTab() {
    return (
      <form className="space-y-2">
        <div>
          <label className="block mb-1 font-medium">Notification Preferences</label>
          <select className="w-full border border-gray-300 rounded p-2">
            <option>Email Only</option>
            <option>SMS Only</option>
            <option>Email & SMS</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Language</label>
          <select className="w-full border border-gray-300 rounded p-2">
            <option>English</option>
            <option>Bulgarian</option>
            <option>German</option>
          </select>
        </div>
      </form>
    );
  }
  