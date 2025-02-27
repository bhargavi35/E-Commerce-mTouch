export default function Sorting({ onSortChange }) {
    return (
      <div className="flex gap-2">
        <button onClick={() => onSortChange('name', 'asc')}>Name (A-Z)</button>
        <button onClick={() => onSortChange('name', 'desc')}>Name (Z-A)</button>
        <button onClick={() => onSortChange('price', 'asc')}>Price (Low-High)</button>
        <button onClick={() => onSortChange('price', 'desc')}>Price (High-Low)</button>
      </div>
    );
  }
  