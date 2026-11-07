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
      },
      {
        path: "ver-registros",
        loadComponent: () =>
          import("./escuela/ver-registros/ver-registros").then((c) => c.VerRegistros),
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
  path: "utl",
  children: [
    // ---------- ALUMNOS ----------
    {
      path: "alumnos",
      loadComponent: () =>
        import("./utl/alumnos/alumnos").then((c) => c.Alumnos),
    },
    {
      path: "agregar",
      loadComponent: () =>
        import("./utl/alumnos/agregar/agregar").then((c) => c.Agregar),
    },
    {
      path: "editar/:matricula",
      loadComponent: () =>
        import("./utl/alumnos/editar/editar").then((c) => c.Editar),
    },
    {
      path: "eliminar/:matricula",
      loadComponent: () =>
        import("./utl/alumnos/eliminar/eliminar").then((c) => c.Eliminar),
    },

    // ---------- MAESTROS (anidados) ----------
    {
      path: "maestros",
      children: [
        {
          path: "",
          loadComponent: () =>
            import("./utl/maestros/maestros").then((c) => c.Maestros),
        },
        {
          path: "agregar",
          loadComponent: () =>
            import("./utl/maestros/agregar/agregar").then((c) => c.Agregar),
        },
        {
          path: "editar/:idmaestro",
          loadComponent: () =>
            import("./utl/maestros/editar/editar").then((c) => c.Editar),
        },
        {
          path: "eliminar/:idmaestro",
          loadComponent: () =>
            import("./utl/maestros/eliminar/eliminar").then((c) => c.Eliminar),
        },
      ],
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