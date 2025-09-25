'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductSortProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name: A to Z' },
  ];

  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-48 glass-effect border-white/20 text-white">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent className="glass-effect border-white/20 bg-brand-black text-white">
        {sortOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:bg-white/10 focus:bg-white/10"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}