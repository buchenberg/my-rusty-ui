import { useState } from 'react';
import type { Route } from '../model';

type RouteFormProps = {
    onAddRoute: (route: Route) => void;
    isUpdating: boolean;
};

export const RouteForm = ({ onAddRoute, isUpdating }: RouteFormProps) => {
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
        <div className="card has-text-left">
            <div className="card-content">
                <div className="content container">
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
                                    value={formData.method}
                                    onChange={handleMethodChange}>
                                    <option value={''}>Select...</option>
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
                </div>

            </div>
            <footer className="card-footer">
                {isUpdating && (
                    <span className="card-footer-item has-text-warning">
                        Updating...
                    </span>
                )}
                {!isUpdating && (
                    <>
                        <a href="#" className="card-footer-item has-text-danger" onClick={initializeFormData}>
                            Clear
                        </a>
                        <a href="#" className="card-footer-item has-text-primary" onClick={handleSubmit}>
                            Save
                        </a>
                    </>
                )}
            </footer>
        </div>
    );
};