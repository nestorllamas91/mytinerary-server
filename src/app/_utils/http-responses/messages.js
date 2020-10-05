export default {
  DATABASE_POPULATED: 'The database has been populated with all its collections.',
  USER_CREATED: 'The requested user has been created in the database.',
  USERS_READ: 'The requested users have been read from the database.',
  USER_READ: 'The requested user has been read from the database.',
  USER_UPDATED: 'The requested user has been updated in the database.',
  USERS_DELETED: 'The requested users have been deleted from the database.',
  USER_DELETED: 'The requested user has been deleted from the database.',
  USER_LOGGED_IN: 'The requested user has been logged in.',
  USER_LOGGED_OUT: 'The requested user has been logged out.',
  USER_AUTHENTICATED: 'The requested user has been authenticated.',
  USER_NOT_FOUND: {
    name: 'UserNotFound',
    message: 'The requested user does not exist in the database.'
  },
  USER_CONFLICT: {
    name: 'UserConflict',
    message: 'The requested user attempts to create a duplicate user in the database.'
  },
  USER_CONFLICT_USERNAME: {
    name: 'UserConflictUsername',
    message: 'This username already exists in the database.'
  },
  USER_CONFLICT_EMAIL: {
    name: 'UserConflictEmail',
    message: 'This email address already exists in the database.'
  },
  USER_UNPROCESSABLE: {
    name: 'UserUnprocessable',
    message: 'The requested user is well-formed but has semantic errors.'
  },
  USER_UNAUTHORIZED: {
    name: 'UserUnauthorized',
    message: 'The password introduced is not valid.'
  },
  USER_FORBIDDEN: {
    name: 'UserForbidden',
    message: 'The request could not be done because the user has no permission for that.'
  },
  COUNTRY_CREATED: 'The requested country has been created in the database.',
  COUNTRIES_READ: 'The requested countries have been read from the database.',
  COUNTRY_READ: 'The requested country has been read from the database.',
  COUNTRY_UPDATED: 'The requested country has been updated in the database.',
  COUNTRIES_DELETED:
    'The requested countries, and its cities, itineraries, and activities, have been deleted from the database.',
  COUNTRY_DELETED:
    'The requested country, and its cities, itineraries, and activities, have been deleted from the database.',
  COUNTRY_NOT_FOUND: {
    name: 'CountryNotFound',
    message: 'The requested country does not exist in the database.'
  },
  COUNTRY_CONFLICT: {
    name: 'CountryConflict',
    message: 'The requested country attempts to create a duplicate country in the database.'
  },
  COUNTRY_CONFLICT_FULLNAME: {
    name: 'CountryConflictFullname',
    message: 'This country full name already exists in the database.'
  },
  COUNTRY_UNPROCESSABLE: {
    name: 'CountryUnprocessable',
    message: 'The requested country is well-formed but has semantic errors.'
  },
  CITY_CREATED: 'The requested city has been created in the database.',
  CITIES_READ: 'The requested cities have been read from the database.',
  CITY_READ: 'The requested city has been read from the database.',
  CITY_UPDATED: 'The requested city has been updated in the database.',
  CITIES_DELETED: 'The requested cities, and its itineraries and activities, have been deleted from the database.',
  CITY_DELETED: 'The requested city, and its itineraries and activities, have been deleted from the database.',
  CITY_NOT_FOUND: {
    name: 'CityNotFound',
    message: 'The requested city does not exist in the database.'
  },
  CITY_CONFLICT: {
    name: 'CityConflict',
    message: 'The requested city attempts to create a duplicate city in the database.'
  },
  CITY_CONFLICT_NAME: {
    name: 'CityConflictName',
    message: 'This city name for this country already exists in the database.'
  },
  CITY_UNPROCESSABLE: {
    name: 'CityUnprocessable',
    message: 'The requested city is well-formed but has semantic errors.'
  },
  ITINERARY_CREATED: 'The requested itinerary has been created in the database.',
  ITINERARIES_READ: 'The requested itineraries have been read from the database.',
  ITINERARY_READ: 'The requested itinerary has been read from the database.',
  ITINERARY_UPDATED: 'The requested itinerary has been updated in the database.',
  ITINERARIES_DELETED: 'The requested itineraries, and its activities, have been deleted from the database.',
  ITINERARY_DELETED: 'The requested itinerary, and its activities, have been deleted from the database.',
  ITINERARY_NOT_FOUND: {
    name: 'ItineraryNotFound',
    message: 'The requested itinerary does not exist in the database.'
  },
  ITINERARY_CONFLICT: {
    name: 'ItineraryConflict',
    message: 'The requested itinerary attempts to create a duplicate itinerary in the database.'
  },
  ITINERARY_CONFLICT_TITLE: {
    name: 'ItineraryConflictTitle',
    message: 'This itinerary title for this city already exists in the database.'
  },
  ITINERARY_UNPROCESSABLE: {
    name: 'ItineraryUnprocessable',
    message: 'The requested itinerary is well-formed but has semantic errors.'
  },
  ACTIVITY_CREATED: 'The requested activity has been created in the database.',
  ACTIVITIES_READ: 'The requested activities have been read from the database.',
  ACTIVITY_READ: 'The requested activity has been read from the database.',
  ACTIVITY_UPDATED: 'The requested activity has been updated in the database.',
  ACTIVITIES_DELETED: 'The requested activities have been deleted from the database.',
  ACTIVITY_DELETED: 'The requested activity has been deleted from the database.',
  ACTIVITY_NOT_FOUND: {
    name: 'ActivityNotFound',
    message: 'The requested activity does not exist in the database.'
  },
  ACTIVITY_CONFLICT: {
    name: 'ActivityConflict',
    message: 'The requested activity attempts to create a duplicate activity in the database.'
  },
  ACTIVITY_CONFLICT_TITLE: {
    name: 'ActivityConflictTitle',
    message: 'This activity title for this itinerary already exists in the database.'
  },
  ACTIVITY_UNPROCESSABLE: {
    name: 'ActivityUnprocessable',
    message: 'The requested activity is well-formed but has semantic errors.'
  }
};
