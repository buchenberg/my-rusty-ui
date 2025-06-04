import { AsyncDataStatus, type AsyncData } from '../routeStore';
import type { Route } from '../model';

type RouteTableProps = {
  routes: AsyncData<Route[]>;
};

export const RouteTable = ({ routes }: RouteTableProps) => {
  const renderStatus = () => {
    switch (routes.status) {
      case AsyncDataStatus.LOADING:
        return <span className="has-text-info">Loading...</span>;
      case AsyncDataStatus.LOADED:
        return <span className="has-text-success">Loaded</span>;
      case AsyncDataStatus.ERROR:
        return <span className="has-text-danger">Error: {routes.error}</span>;
      case AsyncDataStatus.UPDATING:
        return <span className="has-text-warning">Updating...</span>;
      case AsyncDataStatus.INIT:
        return <span className="has-text-grey">Initializing...</span>;
      default:
        return <></>;
    }
  };

  return (
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
          <tr>
            <td colSpan={5} className="has-text-centered">{renderStatus()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};