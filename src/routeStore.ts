import { create } from 'zustand'
import type { Route } from './model'
import { createRoute, getRoutes } from './api'

export interface AsyncData<T> {
    data: T
    loaded: boolean
    loading: boolean
    updating: boolean
    error: string | null
}

export interface RouteState {
    routes: AsyncData<Route[]>
    initRoutes: () => void
    addRoute: (route: Route) => void
}

export const useRouteStore = create<RouteState>()((set) => ({
    routes: {
        data: [],
        loading: false,
        loaded: false,
        updating: false,
        error: null
    },
    initRoutes: () => {
        // This function can be used to initialize routes if needed
        console.log('Initializing routes...');
        set((state) => ({
            routes: {
                ...state.routes,
                loading: true,
                error: null
            }
        }));
        getRoutes()
            .then((fetchedRoutes) => {
                console.log('Fetched routes:', fetchedRoutes);
                // Update the state with the fetched routes
                set((state) => ({
                    routes: {
                        ...state.routes,
                        data: fetchedRoutes,
                        loaded: true,
                        loading: false
                    }
                }));
            })
            .catch((error) => {
                console.error('Error fetching routes:', error);
                set((state) => ({   
                    routes: { 
                        ...state.routes,
                        loading: false, 
                        error: error.message 
                    }    
                }));
            });
    },
    addRoute: (route) => {
        set((state) => ({
            routes: {
                ...state.routes,
                updating: true,
                error: null
            }
        }));
        createRoute(route)
            .then((createdRoute) => {
                console.log('Route created:', createdRoute);
                // Update the state with the newly created route
                set((state) => ({
                    routes: {
                        ...state.routes,
                        updating: false,
                        data: [...state.routes.data, createdRoute]
                    }
                }));
            })
            .catch((error) => {
                console.error('Error creating route:', error);
                set((state) => ({
                    routes: { 
                        ...state.routes, 
                        updating: false, 
                        error: error.message 
                    }
                })); 
            });
    }
}))