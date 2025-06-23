
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  Settings, 
  User,
  Users,
  Plus,
  Calendar,
  Edit,
  File
} from "lucide-react";

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

export function Sidebar({ activeModule, setActiveModule, isOpen }: SidebarProps) {
  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          {isOpen && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">Apex</h1>
              <p className="text-xs text-emerald-600 font-medium">Comércio</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8">
        <div className="px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-200 hover:bg-gray-50",
                activeModule === item.id
                  ? "bg-emerald-50 text-emerald-600 border-r-2 border-emerald-500"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {isOpen && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {isOpen && (
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Ronei</p>
                <p className="text-xs text-gray-500">Loja do Ronei Social</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
