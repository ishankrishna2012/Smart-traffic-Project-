import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Settings, LogOut, Edit2 } from 'lucide-react';

interface ParentProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  schoolBusNumber: string;
  emergencyContact: string;
  emergencyPhone: string;
  verified: boolean;
}

const ParentProfile: React.FC = () => {
  const [profile, setProfile] = useState<ParentProfileData>({
    name: 'Ahmed Al-Mazrouei',
    email: 'ahmed@example.com',
    phone: '+971-50-123-4567',
    address: 'The Gardens, Dubai',
    schoolBusNumber: 'School Bus 1',
    emergencyContact: 'Fatima Al-Mazrouei',
    emergencyPhone: '+971-50-987-6543',
    verified: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg shadow-md p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="text-indigo-600" size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-indigo-100">Parent Profile • Verified ✓</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <User size={20} className="text-indigo-600" />
            Personal Information
          </h2>
          <div className="space-y-4">
            {isEditing ? (
              <>
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <User size={18} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="text-gray-800 font-semibold">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-800 font-semibold">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-800 font-semibold">{profile.phone}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* School Bus Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" />
            School Bus Information
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-sm text-gray-600">Assigned Bus</p>
              <p className="text-2xl font-bold text-blue-600">{profile.schoolBusNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-gray-800 font-semibold">{profile.address}</p>
            </div>
            <div className="pt-4 border-t">
              <p className="text-xs text-green-600 font-semibold">✓ Enrolled & Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-red-800 mb-4">Emergency Contact</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {isEditing ? (
            <>
              <div>
                <label className="text-sm text-gray-600">Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={editedProfile.emergencyContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-red-300 rounded-lg mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Contact Phone</label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={editedProfile.emergencyPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-red-300 rounded-lg mt-1"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-gray-800 font-semibold">{profile.emergencyContact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-800 font-semibold">{profile.emergencyPhone}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {isEditing && (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setEditedProfile(profile);
                setIsEditing(false);
              }}
              className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </>
        )}
        {!isEditing && (
          <>
            <button className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              <Settings size={18} />
              Settings
            </button>
            <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2">
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentProfile;
