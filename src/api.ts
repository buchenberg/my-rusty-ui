import type { Route } from "./model";

export async function getRoutes(): Promise<Route[]>{
    const response = await fetch("/api/routes");
    const data = await response.json();
    return data;
}

export async function getRouteById(id: string): Promise<Route> {
    const response = await fetch(`/api/routes/${id}`);
    if (!response.ok) {
        throw new Error(`Error fetching route with id ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function createRoute(route: Route): Promise<Route> {
    const response = await fetch("/api/routes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
    });
    if (!response.ok) {
        throw new Error(`Error creating route: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function updateRoute(id: string, route: Route): Promise<Route> {
    const response = await fetch(`/api/routes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
    });
    if (!response.ok) {
        throw new Error(`Error updating route with id ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

export async function deleteRoute(id: string): Promise<void> {
    const response = await fetch(`/api/routes/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Error deleting route with id ${id}: ${response.statusText}`);
    }
    return;
}