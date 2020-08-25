const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        name: "home",
        meta: { requiresAuth: false }
      },
      {
        path: "/troubleshooting",
        component: () => import("pages/Troubleshooting.vue"),
        name: "troubleshooting",
        meta: { requiresAuth: false }
      },
      {
        path: "/customize",
        component: () => import("pages/Customize.vue"),
        name: "customize",
        meta: { requiresAuth: false }
      },
      // {
      //   path: "/dashboard",
      //   component: () => import("pages/Dashboard.vue"),
      //   name: "dashboard",
      //   meta: { requiresAuth: true }
      // },
      {
        path: "/login",
        component: () => import("pages/Login.vue"),
        name: "login",
        meta: { requiresAuth: false }
      },
      {
        path: "/register",
        component: () => import("pages/Register.vue"),
        name: "register",
        meta: { requiresAuth: false }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
