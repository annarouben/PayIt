import { Link, useLocation } from 'react-router-dom'

const VariantSwitcher = () => {
  const location = useLocation()
  
  const variants = [
    { path: '/', name: 'Original', color: 'bg-teal-600 hover:bg-teal-700' },
    { path: '/v2', name: 'V2', color: 'bg-purple-600 hover:bg-purple-700' },
    { path: '/v3', name: 'V3', color: 'bg-indigo-600 hover:bg-indigo-700' },
    { path: '/v4', name: 'V4', color: 'bg-gray-600 hover:bg-gray-700' }
  ]
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border p-2">
        <div className="text-xs text-gray-500 mb-2 px-2">Variants</div>
        <div className="flex gap-1">
          {variants.map((variant) => (
            <Link
              key={variant.path}
              to={variant.path}
              className={`px-3 py-1 rounded text-xs font-medium text-white transition-colors ${
                location.pathname === variant.path 
                  ? variant.color.replace('hover:', '').replace('bg-', 'bg-opacity-100 bg-')
                  : `${variant.color} opacity-70 hover:opacity-100`
              }`}
            >
              {variant.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VariantSwitcher
