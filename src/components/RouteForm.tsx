import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Route } from '../model';

type RouteFormProps = {
  onAddRoute: (route: Route) => void;
  isUpdating: boolean;
};

export const RouteForm = ({ onAddRoute, isUpdating }: RouteFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Route>({
    name: '',
    path: '',
    is_enabled: false,
    method: ''
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
    onAddRoute(formData);
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
    <form className="box">
      <div className="field">
        <label className="label">{t('Name')}</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={formData.name}
            placeholder={t('Enter the name of the route...')}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">{t('Method')}</label>
        <div className="control">
          <div className="select">
            <select
              value={formData.method}
              onChange={handleMethodChange}>
              <option value={''}>{t('Select method...')}</option>
              <option value={'GET'}>{t('GET')}</option>
              <option value={'POST'}>{t('POST')}</option>
              <option value={'PUT'}>{t('PUT')}</option>
              <option value={'DELETE'}>{t('DELETE')}</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">{t('Path')}</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={formData.path}
            placeholder={t('Enter the route path')}
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
            <span className='ml-2'>{t('Enabled?')}</span>
          </label>
        </div>
      </div>
      <div className="control">
        <button 
          type="button"
          className="button is-link" 
          onClick={handleSubmit} 
          disabled={isUpdating}>
          {t('Submit')}
        </button>
      </div>
    </form>
  );
};