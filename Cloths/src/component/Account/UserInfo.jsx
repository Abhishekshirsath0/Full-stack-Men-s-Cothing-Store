const UserInfo = () => {
  return (
    <>
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-orange-500 text-white flex items-center justify-center text-xl rounded-full">
            A
          </div>
          <div>
            <h1 className="text-xl font-semibold">Abhishek Shirsath</h1>
            <p className="text-gray-500">Customer • Active</p>
            <p className="text-sm text-gray-400">Joined March 2025</p>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-6">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="text-sm text-gray-500">First Name</label>
            <div className="flex items-center justify-between border p-3 rounded-lg mt-1">
              <span>Abhishek</span>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-500">Last Name</label>
            <div className="flex items-center justify-between border p-3 rounded-lg mt-1">
              <span>Shirsath</span>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-500">Gender</label>
            <div className="flex items-center justify-between p-3 rounded-lg mt-1 border border-gray-200">
              {/* Radio input */}
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  id="gender_male"
                  value="Male"
                />
                <label htmlFor="gender_Female">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="gender_Female"
                  value="Female"
                />
                <label htmlFor="gender_Female">Female</label>
              </div>

              {/* Edit button */}
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <div className="flex items-center justify-between border p-3 rounded-lg mt-1">
              <span>abhishek@gmail.com</span>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <div className="flex items-center justify-between border p-3 rounded-lg mt-1">
              <span>+91 9876543210</span>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500">Address</label>
            <div className="flex items-center justify-between border p-3 rounded-lg mt-1">
              <span>Mumbai, Maharashtra, India</span>
              <button className="text-blue-600 text-sm">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
