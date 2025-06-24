
import { Button } from "@/components/ui/button";
import { Search, User, Plus, LogOut, Crown } from "lucide-react";
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
    <header className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 lg:hidden hover:bg-violet-200 text-violet-700 transition-colors rounded-xl"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-violet-600 rounded-full"></div>
              <div className="w-full h-0.5 bg-violet-600 rounded-full"></div>
              <div className="w-full h-0.5 bg-violet-600 rounded-full"></div>
            </div>
          </Button>
          
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 border border-violet-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-64 bg-white/70 backdrop-blur-sm transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <TrialCounter />
          
          <Button variant="outline" size="sm" className="hidden sm:flex bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0 hover:from-violet-600 hover:to-purple-700 rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Vender
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-violet-200 text-violet-700 rounded-xl">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-violet-900 hidden sm:block">
                  {user?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border border-violet-200 shadow-lg z-50 rounded-2xl">
              <DropdownMenuItem 
                onClick={() => navigate('/subscription')}
                className="hover:bg-violet-100 rounded-xl cursor-pointer"
              >
                <Crown className="w-4 h-4 mr-2" />
                Planos e Assinatura
              </DropdownMenuItem>
              {user?.role === 'admin' && (
                <DropdownMenuItem 
                  onClick={() => navigate('/admin')}
                  className="hover:bg-violet-100 rounded-xl cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Dashboard Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                onClick={handleLogout}
                className="hover:bg-violet-100 rounded-xl cursor-pointer"
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
