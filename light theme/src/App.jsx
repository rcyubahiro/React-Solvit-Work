import { useState } from "react";
import {
  Users,
  Package,
  Layers,
  Moon,
  Settings,
  BellDot,
  Box,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Laptop,
  Menu,
  CircleUserRound,
} from "lucide-react";

/* ================= APP ================= */
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { value: 116, label: "Total Users" },
    { value: 100, label: "Total Products" },
    { value: 10, label: "Assigned Products" },
    { value: 90, label: "Unassigned Products" },
  ];

  const users = [
    { name: "John Smith", email: "john.smith@ihuza.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { name: "Sarah Johnson", email: "sarah.j@ihuza.com", role: "Manager", status: "Active", lastLogin: "5 hours ago" },
    { name: "Michael Brown", email: "m.brown@ihuza.com", role: "Staff", status: "Active", lastLogin: "1 day ago" },
    { name: "Emily Davis", email: "emily.d@ihuza.com", role: "Staff", status: "Inactive", lastLogin: "3 days ago" },
    { name: "David Wilson", email: "d.wilson@ihuza.com", role: "Staff", status: "Active", lastLogin: "6 hours ago" },
    { name: "Lisa Anderson", email: "l.anderson@ihuza.com", role: "Manager", status: "Active", lastLogin: "30 minutes ago" },
    { name: "Robert Taylor", email: "r.taylor@ihuza.com", role: "Staff", status: "Active", lastLogin: "2 days ago" },
    { name: "Jennifer Miller", email: "j.miller@ihuza.com", role: "Staff", status: "Active", lastLogin: "4 hours ago" },
    { name: "Christopher Lee", email: "c.lee@ihuza.com", role: "Admin", status: "Active", lastLogin: "1 hour ago" },
    { name: "Amanda White", email: "a.white@ihuza.com", role: "Staff", status: "Inactive", lastLogin: "1 week ago" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:h-screen
        `}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Box size={20} />
          </div>
          <div>
            <h2 className="font-bold">iHUZA</h2>
            <p className="text-xs text-gray-400">INVENTORY</p>
          </div>
        </div>

        <nav className="space-y-2">
          <NavItem icon={<Laptop size={18} />} label="Dashboard" active />
          <NavItem icon={<Users size={18} />} label="Users" badge="116" />
          <NavItem icon={<Package size={18} />} label="Products" badge="100" />
          <NavItem icon={<Menu size={18} />} label="Assignments" badge="10" />
          <NavItem icon={<Layers size={18} />} label="Categories" />
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-4 sm:p-6 md:ml-64">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Welcome Back, Admin
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-gray-500">
            <Moon size={18} />
            <Settings size={18} />
            <BellDot size={18} />
            <span className="text-sm">admin@ihuza.com</span>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
              <CircleUserRound size={18} />
            </div>
          </div>
        </header>

        {/* SYSTEM OVERVIEW */}
        <section className="bg-blue-600 text-white rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-1">
            iHUZA INVENTORY – System Overview
          </h2>
          <p className="text-sm text-blue-100 mb-4">
            Monitor your inventory and assignments in real-time.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle size={18} className="text-green-300" />
            All Systems Operational
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-5 text-center shadow-sm">
              <p className="text-2xl font-bold">{item.value}</p>
              <span className="text-sm text-gray-500">{item.label}</span>
            </div>
          ))}
        </section>

        {/* USERS TABLE */}
        <section className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="font-semibold text-lg">Users</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
              Add User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-6 py-3">USER</th>
                  <th className="text-left px-6 py-3">ROLE</th>
                  <th className="text-left px-6 py-3">STATUS</th>
                  <th className="text-left px-6 py-3">LAST LOGIN</th>
                  <th className="text-right px-6 py-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <CircleUserRound size={18} />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button className="text-blue-600">Edit</button>
                      <button className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */
function NavItem({ icon, label, active, badge }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
