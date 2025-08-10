import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Clock, Users, Star, Car, Search, Phone, Mail, Globe, CheckCircle, AlertCircle } from 'lucide-react';

const KidsActivityScheduler = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    // Step 1: Family Info
    parentName: '',
    email: '',
    phone: '',
    socialProvider: '',
    
    // Step 2: Interests
    selectedInterests: [],
    
    // Step 3: Location
    zipcode: '',
    
    // Step 4: Time Slots
    selectedTimeSlots: [],
    
    // Step 5: Results
    searchResults: [],
    crawlerStats: null
  });

  // Simulated backend API calls - replace with real API endpoints
  const mockBackendAPI = useCallback(() => ({
    // Simulate getting crawler statistics
    getCrawlerStats: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalProviders: 847,
            verifiedProviders: 312,
            lastUpdated: '2024-08-10T10:30:00Z',
            topCities: [
              { city: 'White Plains', count: 89 },
              { city: 'Yonkers', count: 76 },
              { city: 'New Rochelle', count: 45 },
              { city: 'Scarsdale', count: 38 },
              { city: 'Mount Vernon', count: 32 }
            ],
            topActivities: [
              { activity: 'Music Lessons', count: 156 },
              { activity: 'Dance Classes', count: 134 },
              { activity: 'Martial Arts', count: 89 },
              { activity: 'Swimming', count: 67 },
              { activity: 'Art Classes', count: 54 }
            ]
          });
        }, 1000);
      });
    },

    // Simulate searching providers based on criteria
    searchProviders: async (interests, zipcode, timeSlots) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResults = [
            {
              id: 1,
              name: 'Westchester Music Academy',
              activity: 'Piano & Guitar Lessons',
              address: '123 Main St, White Plains, NY 10601',
              distance: '1.2 miles',
              driveTime: '4 min',
              rating: 4.9,
              reviewsCount: 127,
              price: '$60/session',
              phone: '(914) 555-0123',
              email: 'info@wmacademy.com',
              website: 'westchestermusicacademy.com',
              verified: true,
              availableSlots: ['Monday 4:00-5:00 PM', 'Wednesday 4:00-5:00 PM', 'Saturday 10:00-11:00 AM'],
              ageGroups: ['Ages 5-18'],
              amenities: ['Parking Available', 'Performance Opportunities', 'Certified Instructors'],
              images: ['/api/placeholder/300/200'],
              description: 'Premier music education facility offering personalized instruction in piano, guitar, voice, and more.',
              schedule: {
                'Monday': ['3:00 PM - 8:00 PM'],
                'Wednesday': ['3:00 PM - 8:00 PM'],
                'Saturday': ['9:00 AM - 4:00 PM']
              }
            },
            {
              id: 2,
              name: 'Harrison Dance Studio',
              activity: 'Ballet & Contemporary Dance',
              address: '456 Purchase St, Harrison, NY 10528',
              distance: '2.8 miles',
              driveTime: '8 min',
              rating: 4.7,
              reviewsCount: 89,
              price: '$45/class',
              phone: '(914) 555-0456',
              email: 'info@harrisondance.com',
              website: 'harrisondance.com',
              verified: true,
              availableSlots: ['Tuesday 5:00-6:00 PM', 'Thursday 5:00-6:00 PM', 'Saturday 2:00-3:00 PM'],
              ageGroups: ['Ages 3-16'],
              amenities: ['Professional Dance Floor', 'Recital Opportunities', 'Competition Teams'],
              images: ['/api/placeholder/300/200'],
              description: 'Professional dance instruction in a nurturing environment with experienced faculty.',
              schedule: {
                'Tuesday': ['4:00 PM - 8:00 PM'],
                'Thursday': ['4:00 PM - 8:00 PM'],
                'Saturday': ['9:00 AM - 5:00 PM']
              }
            },
            {
              id: 3,
              name: 'Scarsdale Martial Arts Academy',
              activity: 'Karate & Taekwondo',
              address: '789 Central Ave, Scarsdale, NY 10583',
              distance: '3.5 miles',
              driveTime: '12 min',
              rating: 4.8,
              reviewsCount: 156,
              price: '$120/month',
              phone: '(914) 555-0789',
              email: 'contact@scarsdaleMA.com',
              website: 'scarsdaleMA.com',
              verified: true,
              availableSlots: ['Monday 6:00-7:00 PM', 'Wednesday 6:00-7:00 PM', 'Friday 6:00-7:00 PM'],
              ageGroups: ['Ages 4-Adult'],
              amenities: ['Tournament Training', 'Belt Testing', 'Character Development'],
              images: ['/api/placeholder/300/200'],
              description: 'Traditional martial arts training focusing on discipline, respect, and physical fitness.',
              schedule: {
                'Monday': ['5:00 PM - 9:00 PM'],
                'Wednesday': ['5:00 PM - 9:00 PM'],
                'Friday': ['5:00 PM - 9:00 PM'],
                'Saturday': ['9:00 AM - 2:00 PM']
              }
            },
            {
              id: 4,
              name: 'White Plains Youth Soccer League',
              activity: 'Soccer Training & Teams',
              address: 'White Plains High School, White Plains, NY 10601',
              distance: '1.8 miles',
              driveTime: '6 min',
              rating: 4.6,
              reviewsCount: 203,
              price: '$180/season',
              phone: '(914) 555-0234',
              email: 'info@wpysl.org',
              website: 'wpysl.org',
              verified: true,
              availableSlots: ['Tuesday 5:30-6:30 PM', 'Thursday 5:30-6:30 PM', 'Saturday 9:00-10:00 AM'],
              ageGroups: ['Ages 5-17'],
              amenities: ['Professional Fields', 'League Games', 'Tournaments'],
              images: ['/api/placeholder/300/200'],
              description: 'Community soccer league providing skill development and competitive play.',
              schedule: {
                'Tuesday': ['5:00 PM - 7:00 PM'],
                'Thursday': ['5:00 PM - 7:00 PM'],
                'Saturday': ['8:00 AM - 12:00 PM']
              }
            },
            {
              id: 5,
              name: 'Creative Arts Studio Westchester',
              activity: 'Art Classes & Workshops',
              address: '321 Mamaroneck Ave, Mamaroneck, NY 10543',
              distance: '4.1 miles',
              driveTime: '15 min',
              rating: 4.5,
              reviewsCount: 67,
              price: '$40/class',
              phone: '(914) 555-0567',
              email: 'hello@creativeartswest.com',
              website: 'creativeartswest.com',
              verified: false,
              availableSlots: ['Wednesday 4:00-5:00 PM', 'Friday 4:00-5:00 PM', 'Saturday 11:00-12:00 PM'],
              ageGroups: ['Ages 6-14'],
              amenities: ['Art Supplies Provided', 'Gallery Exhibitions', 'Summer Camps'],
              images: ['/api/placeholder/300/200'],
              description: 'Inspiring creativity through diverse art programs and experienced instruction.',
              schedule: {
                'Wednesday': ['3:00 PM - 7:00 PM'],
                'Friday': ['3:00 PM - 7:00 PM'],
                'Saturday': ['10:00 AM - 3:00 PM']
              }
            }
          ];

          // Filter results based on interests
          const filtered = mockResults.filter(result => 
            interests.some(interest => 
              result.activity.toLowerCase().includes(interest.toLowerCase()) ||
              result.name.toLowerCase().includes(interest.toLowerCase())
            )
          );

          resolve(filtered.length > 0 ? filtered : mockResults);
        }, 2000);
      });
    }
  }), []);

  const interests = [
    'Music', 'Art', 'Science', 'Dance', 'Math', 'Public Speaking', 
    'Lego', 'Coding', 'Martial Arts', 'Soccer', 'Swimming', 'Chess',
    'Drama', 'Cooking', 'Gymnastics', 'Tennis', 'Basketball', 'Baseball'
  ];

  const timeSlots = [
    'Monday 3:00-4:00 PM', 'Monday 4:00-5:00 PM', 'Monday 5:00-6:00 PM', 'Monday 6:00-7:00 PM',
    'Tuesday 3:00-4:00 PM', 'Tuesday 4:00-5:00 PM', 'Tuesday 5:00-6:00 PM', 'Tuesday 6:00-7:00 PM',
    'Wednesday 3:00-4:00 PM', 'Wednesday 4:00-5:00 PM', 'Wednesday 5:00-6:00 PM', 'Wednesday 6:00-7:00 PM',
    'Thursday 3:00-4:00 PM', 'Thursday 4:00-5:00 PM', 'Thursday 5:00-6:00 PM', 'Thursday 6:00-7:00 PM',
    'Friday 3:00-4:00 PM', 'Friday 4:00-5:00 PM', 'Friday 5:00-6:00 PM', 'Friday 6:00-7:00 PM',
    'Saturday 9:00-10:00 AM', 'Saturday 10:00-11:00 AM', 'Saturday 11:00-12:00 PM',
    'Saturday 1:00-2:00 PM', 'Saturday 2:00-3:00 PM', 'Saturday 3:00-4:00 PM'
  ];

  // Load crawler statistics on component mount
  useEffect(() => {
    const loadStats = async () => {
      try {
        const api = mockBackendAPI();
        const stats = await api.getCrawlerStats();
        setFormData(prev => ({ ...prev, crawlerStats: stats }));
      } catch (err) {
        setError('Failed to load system statistics');
      }
    };
    loadStats();
  }, [mockBackendAPI]);

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }));
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setFormData(prev => ({
      ...prev,
      selectedTimeSlots: prev.selectedTimeSlots.includes(timeSlot)
        ? prev.selectedTimeSlots.filter(t => t !== timeSlot)
        : [...prev.selectedTimeSlots, timeSlot]
    }));
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setFormData(prev => ({ ...prev, socialProvider: provider }));
    
    // Simulate social login
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        parentName: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '(914) 555-1234'
      }));
      setLoading(false);
    }, 1000);
  };

  const searchActivities = async () => {
    setLoading(true);
    setError('');
    
    try {
      const api = mockBackendAPI();
      const results = await api.searchProviders(
        formData.selectedInterests,
        formData.zipcode,
        formData.selectedTimeSlots
      );
      
      setFormData(prev => ({ ...prev, searchResults: results }));
    } catch (err) {
      setError('Failed to search activities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (currentStep === 4) {
      await searchActivities();
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.parentName && formData.email;
      case 2:
        return formData.selectedInterests.length > 0;
      case 3:
        return formData.zipcode && formData.zipcode.length === 5;
      case 4:
        return formData.selectedTimeSlots.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to KidsActivity Scheduler</h2>
              <p className="text-gray-600">Powered by real-time data from Westchester County providers</p>
              
              {formData.crawlerStats && (
                <div className="bg-blue-50 p-4 rounded-lg mt-4 text-sm">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formData.crawlerStats.totalProviders}</div>
                      <div className="text-gray-600">Total Providers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{formData.crawlerStats.verifiedProviders}</div>
                      <div className="text-gray-600">Verified</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Last Updated</div>
                      <div className="text-gray-600">{new Date(formData.crawlerStats.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <div className="w-5 h-5 bg-red-500 rounded mr-3"></div>
                  Continue with Google
                </button>
                <button
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded mr-3"></div>
                  Continue with Facebook
                </button>
                <button
                  onClick={() => handleSocialLogin('TikTok')}
                  disabled={loading}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <div className="w-5 h-5 bg-black rounded mr-3"></div>
                  Continue with TikTok
                </button>
              </div>

              {loading && formData.socialProvider && (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Connecting to {formData.socialProvider}...</p>
                </div>
              )}

              <div className="text-center text-gray-500">or sign up manually</div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Parent's Full Name"
                  value={formData.parentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Star className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What Interests Your Kids?</h2>
              <p className="text-gray-600">Select activities to find the best matches in your area</p>
              
              {formData.crawlerStats && (
                <div className="bg-purple-50 p-3 rounded-lg mt-4">
                  <div className="text-sm text-purple-800">
                    <strong>Popular in Westchester:</strong> {formData.crawlerStats.topActivities.slice(0, 3).map(a => a.activity).join(', ')}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.selectedInterests.includes(interest)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            {formData.selectedInterests.length > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-800 mb-2">Selected Interests ({formData.selectedInterests.length}):</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center"
                    >
                      {interest}
                      <button 
                        onClick={() => handleInterestToggle(interest)}
                        className="ml-2 hover:text-purple-900"
                      >×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Where Are You Located?</h2>
              <p className="text-gray-600">We'll find activities within 10 miles of your location</p>
              
              {formData.crawlerStats && (
                <div className="bg-green-50 p-3 rounded-lg mt-4">
                  <div className="text-sm text-green-800">
                    <strong>Coverage Areas:</strong> {formData.crawlerStats.topCities.slice(0, 3).map(c => c.city).join(', ')} + 33 more cities
                  </div>
                </div>
              )}
            </div>

            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Enter your ZIP code"
                value={formData.zipcode}
                onChange={(e) => setFormData(prev => ({ ...prev, zipcode: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center"
                maxLength="5"
              />
              <p className="text-sm text-gray-500 text-center mt-2">
                Westchester County ZIP codes (e.g., 10601, 10528, 10583)
              </p>
              
              {formData.zipcode.length === 5 && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg text-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-sm text-green-800">ZIP code validated ✓</p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">When Are You Available?</h2>
              <p className="text-gray-600">Select your preferred time slots for activities</p>
            </div>

            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div key={day} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {timeSlots
                      .filter(slot => slot.startsWith(day))
                      .map((timeSlot) => (
                        <button
                          key={timeSlot}
                          onClick={() => handleTimeSlotToggle(timeSlot)}
                          className={`px-3 py-2 text-sm rounded-md border transition-all ${
                            formData.selectedTimeSlots.includes(timeSlot)
                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                              : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                          }`}
                        >
                          {timeSlot.split(' ').slice(1).join(' ')}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {formData.selectedTimeSlots.length > 0 && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-800 mb-2">
                  Selected Time Slots ({formData.selectedTimeSlots.length}):
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {formData.selectedTimeSlots.map((slot) => (
                    <span
                      key={slot}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center justify-between"
                    >
                      {slot}
                      <button 
                        onClick={() => handleTimeSlotToggle(slot)}
                        className="ml-2 hover:text-orange-900"
                      >×</button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Search className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfect Matches Found!</h2>
              <p className="text-gray-600">
                Found {formData.searchResults.length} activity providers near {formData.zipcode}
              </p>
              
              {loading && (
                <div className="flex items-center justify-center mt-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">Searching real-time data...</span>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {formData.searchResults.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Provider Header */}
                  <div className="p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-bold text-xl text-gray-900 mr-3">{result.name}</h3>
                          {result.verified && (
                            <CheckCircle className="w-5 h-5 text-green-500" title="Verified Provider" />
                          )}
                        </div>
                        <p className="text-blue-600 font-medium text-lg mb-1">{result.activity}</p>
                        <p className="text-gray-600 text-sm">{result.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-500 mb-1">
                          <Star className="w-4 h-4 fill-current mr-1" />
                          <span className="font-medium">{result.rating}</span>
                          <span className="text-gray-500 text-sm ml-1">({result.reviewsCount})</span>
                        </div>
                        <div className="text-xl font-bold text-green-600">{result.price}</div>
                      </div>
                    </div>

                    {/* Contact & Location Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{result.address}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Car className="w-4 h-4 mr-2" />
                          <span>{result.distance} • {result.driveTime} drive</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <a href={`tel:${result.phone}`} className="hover:text-blue-600">{result.phone}</a>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Globe className="w-4 h-4 mr-2" />
                          <a href={`https://${result.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                            {result.website}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Age Groups & Amenities */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div>
                          <span className="text-sm font-medium text-gray-700 mr-2">Ages:</span>
                          {result.ageGroups.map((age, idx) => (
                            <span key={idx} className="text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md mr-1">
                              {age}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-700 mr-2">Amenities:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {result.amenities.map((amenity, idx) => (
                            <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Available Time Slots */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Available Time Slots:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.availableSlots.map((slot, idx) => {
                          const isMatched = formData.selectedTimeSlots.includes(slot);
                          return (
                            <span
                              key={idx}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                isMatched 
                                  ? 'bg-green-100 text-green-800 border border-green-300' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {slot}
                              {isMatched && <span className="ml-1">✓</span>}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary and Actions */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-3">Search Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-blue-700 font-medium">Interests:</span>
                  <p className="text-blue-600">{formData.selectedInterests.join(', ')}</p>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Location:</span>
                  <p className="text-blue-600">ZIP {formData.zipcode}</p>
                </div>
                <div>
                  <span className="text-blue-700 font-medium">Time Slots:</span>
                  <p className="text-blue-600">{formData.selectedTimeSlots.length} selected</p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Modify Search
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Results
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 5 && (
                  <div
                    className={`w-full h-1 mx-4 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Family Info</span>
            <span>Interests</span>
            <span>Location</span>
            <span>Schedule</span>
            <span>Results</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentStep === 4 ? 'Search Activities' : 'Next'}
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
              ) : (
                <ChevronRight className="w-5 h-5 ml-2" />
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Start New Search
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KidsActivityScheduler;