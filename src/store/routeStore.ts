import { create } from 'zustand'
import { createRoute, getRoutes } from '../network/api'

export interface Route {
    id?: number;
    name: string;
    path: string;
    is_enabled: boolean;
    method: string;
} 

export type AsyncDataStatus = 
    | 'init'
    | 'loading'
    | 'loaded'
    | 'error'
    | 'updating';

export const AsyncDataStatus = {
    INIT: 'init' as AsyncDataStatus,
    LOADING: 'loading' as AsyncDataStatus,
    LOADED: 'loaded' as AsyncDataStatus,
    ERROR: 'error' as AsyncDataStatus,
    UPDATING: 'updating' as AsyncDataStatus,
};

export interface AsyncData<T> {
    data: T
    status: AsyncDataStatus,
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
        status: AsyncDataStatus.INIT,
        error: null
    },
    initRoutes: () => {
        // This function can be used to initialize routes if needed
        console.log('Initializing routes...');
        set((state) => ({
            routes: {
                ...state.routes,
                status: AsyncDataStatus.LOADING,
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
                        status: AsyncDataStatus.LOADED,
                    }
                }));
            })
            .catch((error) => {
                console.error('Error fetching routes:', error);
                set((state) => ({
                    routes: {
                        ...state.routes,
                        status: AsyncDataStatus.ERROR,
                        error: error.message
                    }
                }));
            });
    },
    addRoute: (route) => {
        set((state) => ({
            routes: {
                ...state.routes,
                status: AsyncDataStatus.UPDATING,
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
                        status: AsyncDataStatus.LOADED,
                        data: [...state.routes.data, createdRoute]
                    }
                }));
            })
            .catch((error) => {
                console.error('Error creating route:', error);
                set((state) => ({
                    routes: {
                        ...state.routes,
                        status: AsyncDataStatus.ERROR,
                        error: error.message
                    }
                }));
            });
    }
}))