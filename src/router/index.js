import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

import routes from "./routes";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

// export default function(/* { store, ssrContext } */) {
//   const Router = new VueRouter({
//     scrollBehavior: () => ({ x: 0, y: 0 }),
//     routes,

//     // Leave these as is and change from quasar.conf.js instead!
//     // quasar.conf.js -> build -> vueRouterMode
//     // quasar.conf.js -> build -> publicPath
//     mode: "history",
//     base: process.env.VUE_ROUTER_BASE
//   });

//   return Router;

export default function({ store }) {
  store;
  firebase;
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: "history",
    base: process.env.VUE_ROUTER_BASE
  });

  // handels auth check
  Router.beforeEach(async (to, from, next) => {
    to.matched.some(record => {
      record.meta.requiresAuth;
    });
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Load user
      firebase.auth().onAuthStateChanged(user => {
        //   // If user obj does not exist --> redirect to login page
        if (!user) {
          next({
            path: "/login"
          });
        } else {
          store.commit("user/setUser", user.providerData[0]);
          user.getIdToken().then(token => {
            store.commit("user/setToken", token);
          });
          next();
        }
      });
    } else {
      // Path does not required auth - Still we check the user
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          //     store.commit("user/setUser", user);
          //     user.getIdToken().then(token => {
          //       store.commit("user/setToken", token);
          //     });
          console.log(to);
          if (to.name == "login" || to.name == "register") {
            next({ name: "dashboard" });
          }
          next();
        } else {
          next();
        }
      });
    }
  });
  return Router;
}
