import { PrivateLayout } from "./layouts/private-layout";
import { LoginViewComponent } from "./views/public/login/login.view";
import { NotFoundViewComponent } from "./views/public/not-found/not-found.view";
import { RegisterViewComponent } from "./views/public/register/register.view";
import { HomeViewComponent } from "./views/private/home.view";

interface IBaseRoute {
  path: string,
}

interface IPublicRoute extends IBaseRoute {
  viewComponent: () => void,
}

export type TViewComponent = (searchParams: URLSearchParams) => {
   html: string 
   logic: () => void
}

interface IPrivateRoute extends IBaseRoute {
  viewComponent: TViewComponent,
}

interface IRoutes {
  public: IPublicRoute[];
  private: IPrivateRoute[];
}

const routes: IRoutes = {
  public: [
    {
      path: '/login',
      viewComponent: LoginViewComponent,
    },
    {
      path: '/register',
      viewComponent: RegisterViewComponent,
    },
    {
      path: '/not-found',
      viewComponent: NotFoundViewComponent,
    }
  ],
  private: [
    {
      path: '/posts',
      viewComponent: HomeViewComponent,
    }
  ]
}

export function navigateTo(targetPath: string) {
  window.history.pushState({}, "", targetPath); // para el login
  Router();
}

export function Router() {
  const currentPath = window.location.pathname; // ruta actual de la barra del navegador.

  const currentSearchParams = new URLSearchParams(window.location.search); // search params actuales
  console.log({ currentPath, currentSearchParams });

  const token = localStorage.getItem("user"); //Obtener la sesión del usuario
  // Validamos si quiere ir al /login teniendo la sesión activa
  if ((currentPath === "/login" || currentPath === "/register") && token) {
    return navigateTo("/posts");
  }
  // console.log({ path });
  // 5. Obtener la ruta descrita en `routes` que se empareje con la ruta actual
  const publicRoute = routes.public.find((r) => r.path === currentPath);
  const privateRoute = routes.private.find((r) => r.path === currentPath);
  // 6. Validar si la ruta actual existe en las rutas descritas
  if (publicRoute) {
    // 7. Ejecutar el componente asociado a la ruta pasandole los search params.
    publicRoute.viewComponent();
  } else if (privateRoute && token) {
    const { html, logic } = privateRoute.viewComponent(currentSearchParams);
    PrivateLayout(html, logic);
  } else if (privateRoute && !token) {
    navigateTo("/login");
  } else {
    console.error("No se encontró la ruta");
    // Redirigir al /not-found
    navigateTo("/not-found");
  }
}

// Se vuelve a ejecutar el router cuando
// naveguemos hacia atrás o hacia adelante con
// los botones <- o -> del navegador (ubicados
// en la parte superior izquierda de la ventana).
window.onpopstate = Router;

