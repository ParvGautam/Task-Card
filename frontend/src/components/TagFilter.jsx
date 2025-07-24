function TagFilter({ tags, selectedTag, onSelectTag }) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <button
        className={`px-3 py-1 rounded border ${!selectedTag ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
        onClick={() => onSelectTag(null)}
      >
        Show All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          className={`px-3 py-1 rounded border ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => onSelectTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter; 