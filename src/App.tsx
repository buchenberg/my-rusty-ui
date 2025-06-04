import { useEffect, useState } from 'react'
import './App.css'
import type { Route } from './model'
import { useRouteStore } from './routeStore'

function App() {

  const { routes, initRoutes, addRoute } = useRouteStore((state) => state);
  const [formData, setFormData] = useState<Route>({
    name: '',
    path: '',
    is_enabled: false,
    method: ''
  });


  useEffect(() => {
    if (!routes.loaded && !routes.loading) {
      console.log('No routes found, initializing...');
      initRoutes();
    }
  });

  const initializeFormData = () => {
    setFormData({
      name: '',
      path: '',
      is_enabled: false,
      method: ''
    });
  };

  const handleSubmit = () => {
    console.log('Submitting new route:', formData);
    addRoute(formData);
    initializeFormData();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, method: event.target.value }));
  };

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, path: event.target.value }));
  };

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_enabled: event.target.checked }));
  };

  return (
    <section className="section">
      <div className="container has-text-left">
        <div className='block'>
          <h1 className='title is-1'>Routes</h1>
          <div className='box'>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Method</th>
                  <th>Path</th>
                  <th>Is Enabled</th>
                </tr>
              </thead>
              <tbody>
                {routes.data.map((route) => (
                  <tr key={route.id}>
                    <td>{route.id}</td>
                    <td>{route.name}</td>
                    <td>{route.method}</td>
                    <td>{route.path}</td>
                    <td>{route.is_enabled ? 'Enabled' : 'Disabled'}</td>
                  </tr>
                ))}

                {routes.loading &&
                  <tr>
                    <td colSpan={5} className="has-text-centered">Loading...</td>
                  </tr>
                }
                {routes.updating && (
                  <tr>
                    <td colSpan={5} className="has-text-centered">Updating...</td>
                  </tr>
                )}
                {routes.error && (
                  <tr>
                    <td colSpan={5} className="has-text-centered has-text-danger">{routes.error}</td>
                  </tr>
                )}
                {routes.data.length === 0 && !routes.loading && !routes.error &&
                  <tr>
                    <td colSpan={5} className="has-text-centered">No routes found</td>
                  </tr>
                }
              </tbody>
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
                  <input
                    className="input"
                    type="text"
                    value={formData.name}
                    placeholder="Enter the name of the route..."
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Method</label>
                <div className="control">
                  <div className="select">
                    <select
                      defaultValue={''}
                      onChange={handleMethodChange}
                      value={formData.method}
                    >
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
                  <input
                    className="input"
                    type="text"
                    value={formData.path}
                    placeholder="Enter the route path"
                    onChange={handlePathChange}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input
                      checked={formData.is_enabled}
                      type="checkbox"
                      onChange={handleEnabledChange}
                    />
                    <span className='ml-2'>Enabled?</span>
                  </label>
                </div>
              </div>
              <div className="control">
                <button className="button is-link" onClick={handleSubmit} disabled={routes.updating}>Submit</button>
              </div>
            </form>
          </div>
        </div >
      </div>
    </section>
  )
}

export default App


