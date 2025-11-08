import { useState } from 'react';
import { Save, Bell, Lock, Globe, Trash2 } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Settings = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('preferences');
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    lessonReminders: true,
    weeklyProgress: true,
    language: 'en',
    ttsSpeed: 0.9,
    autoplay: true
  });

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 }
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    alert('Settings saved! (This will be implemented in a future phase)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your preferences and account settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow p-6">
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Preferences</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interface Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="ur">اردو</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TTS Playback Speed: {settings.ttsSpeed}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={settings.ttsSpeed}
                      onChange={(e) => setSettings({ ...settings, ttsSpeed: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Slow (0.5x)</span>
                      <span>Normal (1.0x)</span>
                      <span>Fast (1.5x)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Autoplay Audio</p>
                      <p className="text-sm text-gray-600">Automatically play audio when viewing lessons</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoplay}
                        onChange={(e) => setSettings({ ...settings, autoplay: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.pushNotifications}
                          onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium text-gray-900">Lesson Reminders</p>
                        <p className="text-sm text-gray-600">Daily reminders to complete lessons</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.lessonReminders}
                          onChange={(e) => setSettings({ ...settings, lessonReminders: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Weekly Progress Report</p>
                        <p className="text-sm text-gray-600">Get a summary of your weekly progress</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.weeklyProgress}
                          onChange={(e) => setSettings({ ...settings, weeklyProgress: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                      Password management and two-factor authentication will be available in a future update.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Change Password</h3>
                    <p className="text-sm text-gray-600 mb-4">Coming soon...</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600mb-4">Add an extra layer of security to your account</p>
                    <button
                      disabled
                      className="bg-gray-100 text-gray-400 px-6 py-2 rounded-lg font-medium cursor-not-allowed"
                    >
                      Enable 2FA (Coming Soon)
                    </button>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Active Sessions</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage your active sessions across devices</p>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Current Device</p>
                          <p className="text-sm text-gray-600">Last active: Now</p>
                        </div>
                        <span className="text-green-600 text-sm font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'danger' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Danger Zone</h2>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-800">
                      ⚠️ Warning: These actions are irreversible. Please proceed with caution.
                    </p>
                  </div>

                  <div className="border border-red-300 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                          alert('Account deletion will be implemented in a future phase');
                        }
                      }}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete My Account</span>
                    </button>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-2">Clear Learning Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Reset all your progress, vocabulary, and completed lessons. Your account will remain active.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to clear all your learning data?')) {
                          alert('Clear data functionality will be implemented in a future phase');
                        }
                      }}
                      className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear All Data</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;