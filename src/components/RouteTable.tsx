import { useTranslation } from 'react-i18next';
import { AsyncDataStatus, type AsyncData } from '../routeStore';
import type { Route } from '../model';

type RouteTableProps = {
  routes: AsyncData<Route[]>;
};

export const RouteTable = ({ routes }: RouteTableProps) => {
  const { t } = useTranslation();

  const renderStatus = () => {
    switch (routes.status) {
      case AsyncDataStatus.LOADING:
        return <span className="has-text-info">{t('Loading')}</span>;
      case AsyncDataStatus.LOADED:
        return <span className="has-text-success">{t('Loaded')}</span>;
      case AsyncDataStatus.ERROR:
        return <span className="has-text-danger">
          {t('Error: {{errorMessage}}', { errorMessage: routes.error })}
        </span>;
      case AsyncDataStatus.UPDATING:
        return <span className="has-text-warning">{t('Updating')}</span>;
      case AsyncDataStatus.INIT:
        return <span className="has-text-grey">{t('Initializing')}</span>;
      default:
        return <></>;
    }
  };

  return (
    <div className='box'>
      <table className="table">
        <thead>
          <tr>
            <th>{t('Id')}</th>
            <th>{t('Name')}</th>
            <th>{t('Method')}</th>
            <th>{t('Path')}</th>
            <th>{t('Is Enabled')}</th>
          </tr>
        </thead>
        <tbody>
          {routes.data.map((route) => (
            <tr key={route.id}>
              <td>{route.id}</td>
              <td>{route.name}</td>
              <td>{route.method}</td>
              <td>{route.path}</td>
              <td>{route.is_enabled ? t('Enabled') : t('Disabled')}</td>
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