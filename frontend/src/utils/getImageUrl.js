const getImageUrl = (path) => {
  if (!path) return null;
  
  // If already a full URL (Cloudinary), return as is
  if (path.startsWith('http')) {
    return path;
  }
  
  // If local path, prepend API URL
  return `${import.meta.env.VITE_API_URL}${path}`;
};

export default getImageUrl;