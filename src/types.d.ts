interface Route {
    uuid: string;
    date: string;
    fromWhere: string;
    toWhere: string;
    partnerName: string;
    distance: number;
    type: string;
    vehicleId: string;
  }
  
  interface Vehicle extends Route {
    consumption: number;
    plate_number: string;
    averageConsumption: number;
  }

  interface Vehicle {
    uuid: string;
    type: string;
  }

  interface RouteData {
    uuid: string;
    date: string;
    fromWhere: string;
    toWhere: string;
    partnerName: string;
    distance: string;
    type: string;
    vehicleId: string;
  }

  interface SearchFormProps {
    updateSearchQuery: (query: string) => void;
  }

  interface CardProps {
    title: string;
    description: string;
    link: string;
  }
  
interface SidebarProps {
  isOpen: boolean;
}

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  redirectPath: string;
}

interface ButtonProps {
  children: React.ReactNode;
  to? : string;
  className?: string;
}

  