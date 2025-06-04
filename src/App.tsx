import { useEffect } from 'react'
import './App.css'
import { AsyncDataStatus, useRouteStore } from './routeStore'
import { RouteTable } from './components/RouteTable'
import { RouteForm } from './components/RouteForm'

function App() {
  const { routes, initRoutes, addRoute } = useRouteStore((state) => state);

  useEffect(() => {
    if (routes.status === AsyncDataStatus.INIT) {
      initRoutes();
    }
  }, [routes.status, initRoutes]);

  return (
   
      <div className="container columns is-centered is-4">
        {/* Form */}
      <div className='column'>
        <h1 className='title is-2'>Create a Route</h1>
        <RouteForm
          onAddRoute={addRoute}
          isUpdating={routes.status === AsyncDataStatus.UPDATING}
        />
        </div>
        {/* Table */}
        <div className='column'>
          <h1 className='title is-2'>See a Route</h1>
          <RouteTable routes={routes} />
        </div>
      </div>
  )
}

export default App