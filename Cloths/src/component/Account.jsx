import { Link, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex h-screen">

        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-5">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold">
              A
            </div>
            <div>
              <h2 className="font-semibold">Abhishek</h2>
              <p className="text-sm text-gray-500">User</p>
            </div>
          </div>

          <nav className="space-y-3">
            <Link to="/account" className="block p-2 rounded-lg hover:bg-gray-100">Account Details</Link>
            <Link to="orders" className="block p-2 rounded-lg hover:bg-gray-100">Orders</Link>
            <Link to="#" className="block p-2 rounded-lg hover:bg-gray-100">Wishlist</Link>
            <Link to="#" className="block p-2 rounded-lg hover:bg-gray-100">Manage Address</Link>
            <Link to="#" className="block p-2 rounded-lg hover:bg-gray-100">Payments</Link>
            <Link to="#" className="block p-2 rounded-lg hover:bg-gray-100">Settings</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Outlet will render child routes: UserInfo or OrderPage */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Account;