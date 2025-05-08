import { 
  faChartLine, 
  faComments, 
  faClipboardList,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";

export const getAvailableFeatures = (menuSetting) => {
  if (!menuSetting) return [];
  
  const features = [];

  // Dashboard PQRs
  if (menuSetting?.dashboard?.show && menuSetting?.dashboard?.items?.pqr_graph?.show) {
    features.push({
      icon: faChartLine,
      title: "Dashboard PQRs",
      description: "Visualiza estadísticas y métricas de PQRs en tiempo real",
      link: "/dashboard/pqrs",
      color: "#4CAF50"
    });
  }

  // Gestión de PQRs
  if (menuSetting?.pqrs?.show && menuSetting?.pqrs?.items?.list?.show) {
    features.push({
      icon: faComments,
      title: "Gestión de PQRs",
      description: "Administra y da seguimiento a todas las peticiones",
      link: "/petitions/list/list_group_roles",
      color: "#2196F3"
    });
  }else{
    features.push({
      icon: faComments,
      title: "Gestión de PQRs",
      description: "Administra y da seguimiento a todas las peticiones",
      link: "/petitions/list/list_own",
      color: "#2196F3"
    });
  }

  // Sugerencias
  if (menuSetting?.suggestions?.show && menuSetting?.suggestions?.items?.list?.show) {
    features.push({
      icon: faClipboardList,
      title: "Sugerencias",
      description: "Revisa y gestiona las sugerencias de la comunidad",
      link: "/suggestions/list/list_group_roles",
      color: "#FF9800"});
  }else{
    features.push({
      icon: faClipboardList,
      title: "Sugerencias",
      description: "Revisa y gestiona las sugerencias de la comunidad",
      link: "/suggestions/list/list_own",
      color: "#FF9800"});
  }

  // Gestión Disciplinaria
  if (menuSetting?.fines?.show) {
    features.push({
      icon: faMoneyBill,
      title: "Gestión Disciplinaria",
      description: "Administra las multas y sanciones de la comunidad",
      link: "/fines/create",
      color: "#9C27B0"
    });
  }

  return features;
};
