
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  Settings, 
  User,
  Plus,
  Calendar,
  File,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Início",
    icon: Home,
  },
  {
    id: "sales",
    label: "Vendas",
    icon: Plus,
  },
  {
    id: "products",
    label: "Produtos",
    icon: File,
  },
  {
    id: "cashier",
    label: "Caixa",
    icon: Calendar,
  },
  {
    id: "statistics",
    label: "Estatísticas",
    icon: Search,
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
  },
];

export function Sidebar({ activeModule, setActiveModule, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed left-0 top-0 h-full bg-gradient-to-b from-violet-50 to-violet-100 border-r border-violet-200 transition-all duration-300 z-50",
        "lg:z-40",
        isOpen ? "w-64" : "w-16 lg:w-16",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              {isOpen && (
                <div>
                  <h1 className="text-lg font-bold text-violet-900">Sistema</h1>
                  <p className="text-xs text-violet-600 font-medium">ERP SaaS</p>
                </div>
              )}
            </div>
            {isOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1 hover:bg-violet-200 text-violet-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <nav className="mt-4 lg:mt-8">
          <div className="px-2 lg:px-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id);
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "w-full flex items-center px-3 py-3 mb-2 rounded-2xl transition-all duration-200",
                  activeModule === item.id
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
                    : "text-violet-700 hover:bg-violet-200"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <span className="ml-3 font-medium truncate">{item.label}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {isOpen && (
          <div className="absolute bottom-4 lg:bottom-6 left-0 right-0 px-4 lg:px-6">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-violet-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  R
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-violet-900 truncate">Ronei</p>
                  <p className="text-xs text-violet-600 truncate">Sistema ERP SaaS</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
