import { Button } from "@/components/ui/button";
import { Search, User, Plus, LogOut, Crown, Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { TrialCounter } from "@/components/subscription/TrialCounter";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 lg:hidden hover:bg-purple-50 text-gray-700 transition-colors rounded-lg"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
          
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64 bg-white transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <TrialCounter />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden sm:flex bg-purple-600 text-white border-0 hover:bg-purple-700 rounded-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Vender
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-purple-50 text-gray-700 rounded-lg">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-900 hidden sm:block">
                  {user?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg z-50 rounded-lg">
              <DropdownMenuItem 
                onClick={() => navigate('/subscription')}
                className="hover:bg-purple-50 rounded-md cursor-pointer"
              >
                <Crown className="w-4 h-4 mr-2" />
                Planos e Assinatura
              </DropdownMenuItem>
              {user?.role === 'admin' && (
                <DropdownMenuItem 
                  onClick={() => navigate('/admin')}
                  className="hover:bg-purple-50 rounded-md cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={handleLogout}
                className="hover:bg-purple-50 rounded-md cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}