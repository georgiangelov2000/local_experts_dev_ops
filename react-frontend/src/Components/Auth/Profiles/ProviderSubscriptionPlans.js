import { useSubscription } from '../../../Context/SubscriptionContext';

export default function ProviderSubscriptionPlans() {
  const { plans, mySubscriptions, promotion, subscribe, unsubscribe, loading } = useSubscription();

  const activeSub = mySubscriptions.find(sub => sub.is_active);

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Promotion & Subscription Plans</h2>
      {promotion && (
        <div className="mb-4 p-2 bg-yellow-100 text-yellow-800 rounded">
          Your service is currently <strong>Promoted</strong>!
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">Available Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {plans.map(plan => (
          <div key={plan.id} className={`border rounded p-4 ${activeSub?.subscription_plan_id === plan.id ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}>
            <h4 className="font-bold text-gray-800 mb-1">{plan.name}</h4>
            <div className="text-gray-600 text-sm mb-2">{plan.description}</div>
            <div className="text-blue-700 font-bold text-lg mb-2">${plan.price} / {plan.duration_days} days</div>
            {plan.features && Array.isArray(plan.features) && (
              <ul className="text-xs text-gray-500 mb-2 list-disc pl-4">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
            {activeSub?.subscription_plan_id === plan.id && activeSub.is_active ? (
              <button disabled className="bg-yellow-400 text-white px-4 py-2 rounded w-full cursor-not-allowed">Active</button>
            ) : (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
                onClick={() => subscribe(plan.id)}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Subscribe'}
              </button>
            )}
          </div>
        ))}
      </div>
      {activeSub && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">My Current Subscription</h3>
          <div className="border rounded p-4 bg-gray-50">
            <div><strong>Plan:</strong> {activeSub.subscription_plan?.name}</div>
            <div><strong>Start:</strong> {new Date(activeSub.start_date).toLocaleDateString()}</div>
            <div><strong>End:</strong> {new Date(activeSub.end_date).toLocaleDateString()}</div>
            <button
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={unsubscribe}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Unsubscribe'}
            </button>
          </div>
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">Subscription History</h3>
      <ul className="text-xs text-gray-600">
        {mySubscriptions.map(sub => (
          <li key={sub.id} className="mb-1">
            {sub.subscription_plan?.name} | {new Date(sub.start_date).toLocaleDateString()} - {new Date(sub.end_date).toLocaleDateString()} {sub.is_active && <span className="text-yellow-600 font-bold">(Active)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
} 