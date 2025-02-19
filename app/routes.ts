import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("user", [
        route("create", "routes/user/create.tsx"),
        route("edit/:id", "routes/user/edit.tsx")
    ])
] satisfies RouteConfig;
