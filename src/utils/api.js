export const url = `https://fm.skyhub.pk`
// export const url = `http://localhost:8080`
export const siteUrl = `https://furnituremecca.zellesolutions.com`
// export const url = `https://furniture-mecca-apis.vercel.app`


export function formatTime(stateName, timestamp) {
  const stateTimeZones = {
    "Pennsylvania": "America/New_York",
  };

  const timeZone = stateTimeZones[stateName];
  if (!timeZone) {
    return "Invalid state name or unsupported time zone.";
  }

  const date = new Date(timestamp);
  const now = new Date();

  // Adjust the date to the state's time zone
  const options = { timeZone, hour: "2-digit", minute: "2-digit", hour12: false };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedTime = formatter.format(date);

  // Calculate the difference in seconds
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 172800) {
    return "Yesterday";
  } else {
    return `Date: ${date.toLocaleDateString("en-US", { timeZone })}, Time: ${formattedTime}`;
  }
}

export const truncateTitle = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};


export const transformReviewData = (reviews) => {
  const result = [
    { count: 5, rev: 0 },
    { count: 4, rev: 0 },
    { count: 3, rev: 0 },
    { count: 2, rev: 0 },
    { count: 1, rev: 0 }
  ];

  // Loop through the reviews and count occurrences for each rating
  reviews?.forEach((review) => {
    if (review?.rating >= 1 && review?.rating <= 5) {
      // Find the matching count object based on rating and increment rev count
      result.forEach((item) => {
        if (item?.count === review.rating) {
          item.rev += 1;
        }
      });
    }
  });

  // console.log(result,"here is result",reviews)

  return result;
};

export const extractImagesFromReviews = (reviews) => {
  // Flatten the images from all reviews into a single array
  return reviews
    .map(review => review.images) // Extract the images field
    .flat() // Flatten the array of arrays into a single array
    .filter(image => image); // Ensure that empty values are removed
};



export async function getLatLngFromAddress(address, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error(`Geocoding error: ${data.status}`);
    }

    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error("Error fetching latitude and longitude:", error);
    return null;
  }
}


export const formatedPrice = (price) => {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}


export function openLink(link) {
  if (link) {
    window.location.href = link;
  } else {
    console.error("No link provided!");
  }
}

export const getCurrentDay = (dateStr, local) => {
  let date = new Date(dateStr);
  return date.toLocaleDateString(local, { weekday: 'long' })
}

export function getCurrentTimeForNewYork() {
  const timeZone = "America/New_York";
  let currentTime = new Date().toLocaleString("en-US", { timeZone, hour12: false });
  // return `Current time in New York is ${currentTime}`;
  return currentTime;
}


export async function getGoogleStoreDetails(placeId) {

  const baseUrl = `https://fm.skyhub.pk/api/v1/stores/get-google-store-details`;
  const url = `${baseUrl}?place_id=${encodeURIComponent(placeId)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response, "placeId")
    return await response.json();
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}



