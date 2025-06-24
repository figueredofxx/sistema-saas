
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
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
        "lg:z-40",
        isOpen ? "w-64" : "w-16 lg:w-16",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              {isOpen && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Apex</h1>
                  <p className="text-xs text-orange-600 font-medium">Comércio</p>
                </div>
              )}
            </div>
            {isOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="lg:hidden p-1"
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
                  "w-full flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-200 hover:bg-gray-50",
                  activeModule === item.id
                    ? "bg-orange-50 text-orange-600 border-r-2 border-orange-500"
                    : "text-gray-600 hover:text-gray-900"
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
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Ronei</p>
                  <p className="text-xs text-gray-500 truncate">Loja do Ronei Social</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
