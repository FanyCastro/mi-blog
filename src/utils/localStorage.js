export const getSavedPostIds = () => {
  try {
    const savedIds = localStorage.getItem('savedPostIds');
    return savedIds ? JSON.parse(savedIds) : [];
  } catch (error) {
    console.error("Error getting saved post IDs from localStorage:", error);
    return [];
  }
};

export const savePostId = (id) => {
  try {
    const savedIds = getSavedPostIds();
    if (!savedIds.includes(id)) {
      const newSavedIds = [...savedIds, id];
      localStorage.setItem('savedPostIds', JSON.stringify(newSavedIds));
      return true; // Indicates post was saved
    }
    return false; // Indicates post was already saved
  } catch (error) {
    console.error("Error saving post ID to localStorage:", error);
    return false;
  }
};

export const removeSavedPostId = (id) => {
  try {
    const savedIds = getSavedPostIds();
    const newSavedIds = savedIds.filter(savedId => savedId !== id);
    localStorage.setItem('savedPostIds', JSON.stringify(newSavedIds));
    return true; // Indicates post was removed
  } catch (error) {
    console.error("Error removing saved post ID from localStorage:", error);
    return false;
  }
};

export const isPostSaved = (id) => {
  const savedIds = getSavedPostIds();
  return savedIds.includes(id);
}; 