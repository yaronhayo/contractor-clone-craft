import { useParams, useLocation } from "react-router-dom";

const TestPage = () => {
  const params = useParams();
  const location = useLocation();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Route Test Page</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">URL Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Current URL:</strong>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                {window.location.href}
              </div>
            </div>
            <div>
              <strong>Pathname:</strong>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                {location.pathname}
              </div>
            </div>
            <div>
              <strong>Search:</strong>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                {location.search || '(empty)'}
              </div>
            </div>
            <div>
              <strong>Hash:</strong>
              <div className="bg-gray-100 p-2 rounded text-sm font-mono">
                {location.hash || '(empty)'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Route Parameters</h2>
          <div className="bg-gray-100 p-2 rounded text-sm font-mono">
            {JSON.stringify(params, null, 2)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Mode:</strong> {import.meta.env.MODE}
            </div>
            <div>
              <strong>Production:</strong> {import.meta.env.PROD ? 'Yes' : 'No'}
            </div>
            <div>
              <strong>Development:</strong> {import.meta.env.DEV ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Navigation Test</h2>
          <div className="space-y-2">
            <a href="/services/garage-door-repair" className="block text-blue-600 hover:underline">
              Direct Link: /services/garage-door-repair
            </a>
            <a href="/services/garage-door-spring-repair" className="block text-blue-600 hover:underline">
              Direct Link: /services/garage-door-spring-repair
            </a>
            <a href="/services/garage-door-installation" className="block text-blue-600 hover:underline">
              Direct Link: /services/garage-door-installation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;