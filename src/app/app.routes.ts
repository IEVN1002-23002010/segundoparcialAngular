import { Routes } from "@angular/router";


export const routes: Routes = [
    {
    path: "escuela",
    children: [
      {
        path: "lista-alumnos",
        loadComponent: () =>
          import("./escuela/lista-alumnos/lista-alumnos").then((c) => c.ListaAlumnos),
      },
      {
        path: "cinepolis",
        loadComponent: () =>
          import("./escuela/cinepolis/cinepolis").then((c) => c.Cinepolis),
      }
    ],
  },
  {
    path: "formularios",
    children: [
      {
        path: "usuario",
        loadComponent: () =>
          import("./formularios/usuario/usuario").then((c) => c.Usuario),
      },
      {
        path: "zodiaco",
        loadComponent: () =>
          import("./formularios/zodiaco/zodiaco").then((c) => c.Zodiaco),
      },
    ],
  },
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "admin",
  },
];
