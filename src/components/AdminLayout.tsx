
import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname === "/logs" ? "logs" : "users";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">My Admin</h1>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Вийти
          </button>
        </div>
      </header>

      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <Tabs value={currentTab} className="w-full">
          <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="users"
              onClick={() => navigate("/")}
              className={`rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none pb-3 px-6 text-base ${
                currentTab === "users" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              All Users
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              onClick={() => navigate("/logs")}
              className={`rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none pb-3 px-6 text-base ${
                currentTab === "logs" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Logs
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
