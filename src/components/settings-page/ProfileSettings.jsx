import InputField from "./InputField";
import ProfilePhoto from "./ProfilePhoto";

const ProfileSettings = ({ formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
      
      <ProfilePhoto />
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          placeholder="John"
        />
        <InputField
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          placeholder="Doe"
        />
        <InputField
          label="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          type="email"
          placeholder="john.doe@example.com"
        />
        <InputField
          label="Phone"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      </div>
    </div>
  );
};

export default ProfileSettings;