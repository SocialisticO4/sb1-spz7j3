import { useAuth } from '../context/AuthContext';
import { Heart, UtensilsCrossed, Users, MapPin } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Total Donations', value: '24', icon: Heart },
    { name: 'Active Listings', value: '3', icon: UtensilsCrossed },
    { name: 'People Helped', value: '45', icon: Users },
    { name: 'Service Areas', value: '5', icon: MapPin },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'donation',
      description: 'Donated homemade curry and rice',
      quantity: '5 servings',
      location: 'Downtown Food Bank',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'received',
      description: 'Request fulfilled for groceries',
      quantity: '2 bags',
      location: 'Community Center',
      timestamp: '1 day ago',
    },
  ];

  const upcomingPickups = [
    {
      id: 1,
      title: 'Vegetarian Lunch',
      time: '12:30 PM Today',
      location: 'Central Kitchen',
      status: 'Ready for pickup',
    },
    {
      id: 2,
      title: 'Fresh Produce',
      time: '3:00 PM Today',
      location: 'Farmers Market',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome back, {user?.name}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-lg font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-5 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <Heart className="h-5 w-5 text-green-600" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        <div className="mt-1 flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-500">{activity.location}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-start text-sm text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Pickups</h3>
            <div className="mt-5 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {upcomingPickups.map((pickup) => (
                  <li key={pickup.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <UtensilsCrossed className="h-5 w-5 text-green-600" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{pickup.title}</p>
                        <div className="mt-1 flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-500">{pickup.location}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 self-start">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          {pickup.time}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}