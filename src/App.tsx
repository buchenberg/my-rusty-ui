import { useEffect } from 'react'
import './App.css'
import { AsyncDataStatus, useRouteStore } from './routeStore'
import { RouteTable } from './components/RouteTable'
import { RouteForm } from './components/RouteForm'

function App() {
  const { routes, initRoutes, addRoute } = useRouteStore((state) => state);

  useEffect(() => {
    if (routes.status === AsyncDataStatus.INIT) {
      console.log('No routes found, initializing...');
      initRoutes();
    }
  }, [routes.status, initRoutes]);

  return (
    <section className="section">
      <div className="container has-text-left">
        {/* Table */}
        <div className='block'>
          <h1 className='title is-1'>Routes</h1>
          <RouteTable routes={routes} />
        </div>
        {/* Form */}
        <div className='block'>
            <h1 className='title is-1'>Create Route</h1>
            <RouteForm 
              onAddRoute={addRoute} 
              isUpdating={routes.status === AsyncDataStatus.UPDATING} 
            />
        </div >
      </div>
    </section>
  )
}

export default App