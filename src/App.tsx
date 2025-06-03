import { useEffect, useState, type MouseEventHandler } from 'react'
import './App.css'
import { createRoute, getRoutes } from './api'
import type { Route } from './model'

function App() {
  const [routes, setRoutes] = useState<Route[]>();
  const [newRoute, setNewRoute] = useState<Route>({
    name: '',
    path: '',
    is_enabled: false,
    method: ''
  });


  useEffect(() => {
    // This effect runs once when the component mounts
    console.log('App component mounted');

    // createRoute({
    //   name: 'Test Route',
    //   method: 'GET',
    //   path: '/test',
    //   is_enabled: true,
    // }).then((route) => {
    //   console.log('Route created:', route);
    // }).catch((error) => {
    //   console.error('Error creating route:', error);
    // });


    getRoutes()
      .then((response) => {
        setRoutes(response);
      }).catch((error) => {
        console.error('Error fetching routes:', error);
      });



    // Cleanup function to run when the component unmounts
    return () => {
      console.log('App component unmounted');
    };
  }, []);

  const resetNewRoute = () => {
    setNewRoute({
      name: '',
      path: '',
      is_enabled: false,
      method: ''
    });
  };


  const handleSubmit = () => {
    console.log('Submitting new route:', newRoute);

    createRoute(newRoute)
      .then((route) => {
        console.log('Route created:', route);
      })
      .catch((error) => {
        console.error('Error creating route:', error);
      });
    resetNewRoute();
  };


  return (
    <section className="section">
      <div className="container has-text-left">
        <div className='block'>
          <h1 className='title is-1'>Routes</h1>
          <div className='box'>
            <table className="table">
              <thead>
                <th>Name</th>
                <th>Method</th>
                <th>Path</th>
                <th>Is Enabled</th>
              </thead>
              {routes && (
                <tbody>
                  {routes.map((route) => (
                    <tr key={route.name}>
                      <td>{route.name}</td>
                      <td>{route.method}</td>
                      <td>{route.path}</td>
                      <td>{route.is_enabled ? 'Enabled' : 'Disabled'}</td>
                    </tr>
                  ))}
                </tbody>
              )}

            </table>
          </div>
        </div>
        <div className='block'>
          <div className='block'>
            <h1 className='title is-1'>Create Route</h1>
          </div>
          <div className='block'>
            <form className="box">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Enter the name of the route..." onChange={event => setNewRoute({ ...newRoute, name: event.target.value })} />
                </div>
              </div>
              <div className="field">
                <label className="label">Method</label>
                <div className="control">
                  <div className="select">
                    <select defaultValue={''} onChange={event => setNewRoute({ ...newRoute, method: event.target.value })}>
                      <option value={''}>Select method...</option>
                      <option value={'GET'}>GET</option>
                      <option value={'POST'}>POST</option>
                      <option value={'PUT'}>PUT</option>
                      <option value={'DELETE'}>DELETE</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Path</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Enter the route path" onChange={event => setNewRoute({ ...newRoute, path: event.target.value })} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" onChange={event => setNewRoute({ ...newRoute, is_enabled: event.target.checked })} />
                    <span className='ml-2'>Enabled?</span>
                  </label>
                </div>
              </div>
              <div className="control">
                <button className="button is-link" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div >


      </div>
    </section>
  )
}

export default App
