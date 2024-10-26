import { useState } from 'react';
import { Plus, Clock, MapPin } from 'lucide-react';

interface FoodItem {
  id: string;
  type: 'donation' | 'request';
  name: string;
  category: string;
  foodType: string;
  dietaryType: string;
  quantity: number;
  unit: string;
  location: string;
  radius?: number;
  cookingTime?: string;
  expiryTime?: string;
  requiredBy?: string;
  allergies?: string[];
  status: 'active' | 'completed' | 'expired';
}

export function FoodLogging() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [isGiving, setIsGiving] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: 'grains',
    foodType: 'prepared',
    dietaryType: 'veg',
    quantity: 1,
    unit: 'servings',
    location: '',
    radius: 5,
    cookingTime: '',
    expiryTime: '',
    requiredBy: '',
    allergies: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: FoodItem = {
      id: Date.now().toString(),
      type: isGiving ? 'donation' : 'request',
      ...formData,
      status: 'active',
    };
    setItems([newItem, ...items]);
    // Reset form
    setFormData({
      name: '',
      category: 'grains',
      foodType: 'prepared',
      dietaryType: 'veg',
      quantity: 1,
      unit: 'servings',
      location: '',
      radius: 5,
      cookingTime: '',
      expiryTime: '',
      requiredBy: '',
      allergies: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {isGiving ? 'Share Food' : 'Request Food'}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setIsGiving(true)}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ${
                isGiving
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              Give Food
            </button>
            <button
              type="button"
              onClick={() => setIsGiving(false)}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ${
                !isGiving
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
              }`}
            >
              Request Food
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Food Item Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="e.g., Rice and Curry"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="grains">Grains & Rice</option>
                <option value="curry">Curries</option>
                <option value="bread">Bread & Bakery</option>
                <option value="produce">Fresh Produce</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">
                Food Type
              </label>
              <select
                id="foodType"
                name="foodType"
                value={formData.foodType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="prepared">Prepared Food</option>
                <option value="raw">Raw Ingredients</option>
                <option value="packaged">Packaged Food</option>
              </select>
            </div>

            <div>
              <label htmlFor="dietaryType" className="block text-sm font-medium text-gray-700">
                Dietary Type
              </label>
              <select
                id="dietaryType"
                name="dietaryType"
                value={formData.dietaryType}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                >
                  <option value="servings">Servings</option>
                  <option value="kg">Kilograms</option>
                  <option value="items">Items</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="Enter your location"
              />
            </div>

            {!isGiving && (
              <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700">
                  Search Radius (km)
                </label>
                <input
                  type="number"
                  name="radius"
                  id="radius"
                  min="1"
                  max="50"
                  value={formData.radius}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            )}

            {isGiving ? (
              <>
                <div>
                  <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
                    Cooking Time
                  </label>
                  <input
                    type="datetime-local"
                    name="cookingTime"
                    id="cookingTime"
                    value={formData.cookingTime}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="expiryTime" className="block text-sm font-medium text-gray-700">
                    Best Before
                  </label>
                  <input
                    type="datetime-local"
                    name="expiryTime"
                    id="expiryTime"
                    value={formData.expiryTime}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="requiredBy" className="block text-sm font-medium text-gray-700">
                    Required By
                  </label>
                  <input
                    type="datetime-local"
                    name="requiredBy"
                    id="requiredBy"
                    value={formData.requiredBy}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isGiving ? 'Share Food' : 'Request Food'}
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {isGiving ? 'Your Donations' : 'Your Requests'}
          </h3>
          <div className="mt-5">
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {items
                  .filter((item) => item.type === (isGiving ? 'donation' : 'request'))
                  .map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>
                              {isGiving
                                ? `Best before: ${new Date(
                                    item.expiryTime!
                                  ).toLocaleDateString()}`
                                : `Needed by: ${new Date(
                                    item.requiredBy!
                                  ).toLocaleDateString()}`}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <div className="inline-flex flex-col items-end space-y-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.quantity} {item.unit}
                          </span>
                          <span className="text-sm text-gray-500">{item.dietaryType}</span>
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