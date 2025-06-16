import React from 'react';
import { cn } from '../utils/cn';

function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  resultsCount
}) {
  // Search and filter styles
  const searchContainerClasses = cn(
    "mb-8 bg-white rounded-xl shadow-lg p-6 border border-purple-200"
  );
  const searchInputClasses = cn(
    "w-full px-4 py-2 rounded-lg border border-purple-200",
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
    "transition-all duration-200",
    "mb-4" // Add margin-bottom to separate from filters
  );
  const filterSelectClasses = cn(
    "w-full px-4 py-2 rounded-lg border border-purple-200",
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
    "transition-all duration-200",
    "mt-1" // Add margin-top to separate from label
  );
  const filterContainerClasses = cn(
    "flex flex-col sm:flex-row gap-6 mt-4 items-end" // Increased gap and added items-end for alignment
  );
  const filterLabelClasses = cn(
    "text-sm font-medium text-gray-700"
  );
  const filterWrapperClasses = cn(
    "flex-1 flex flex-col"
  );
  const resultsCountClasses = cn(
    "text-sm text-gray-600 mt-6"
  );

  return (
    <div className={searchContainerClasses}>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={searchInputClasses}
      />
      <div className={filterContainerClasses}>
        <div className={filterWrapperClasses}>
          <label className={filterLabelClasses}>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={filterSelectClasses}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className={filterWrapperClasses}>
          <label className={filterLabelClasses}>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={filterSelectClasses}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>
      <p className={resultsCountClasses}>
        Showing {resultsCount} posts
      </p>
    </div>
  );
}

export default SearchBar; 