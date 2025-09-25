'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterProps {
  filters: {
    priceRange: [number, number];
    category: string;
    sortBy: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function ProductFilters({ filters, onFiltersChange }: FilterProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);

  const categories = [
    { id: 'caps', label: 'Caps', count: 12 },
    { id: 'snapbacks', label: 'Snapbacks', count: 8 },
    { id: 'beanies', label: 'Beanies', count: 6 },
    { id: 'trucker', label: 'Trucker Hats', count: 4 },
    { id: 'bucket', label: 'Bucket Hats', count: 3 },
  ];

  const tags = [
    { id: 'premium', label: 'Premium', count: 15 },
    { id: 'limited', label: 'Limited Edition', count: 7 },
    { id: 'streetwear', label: 'Streetwear', count: 20 },
    { id: 'urban', label: 'Urban', count: 10 },
    { id: 'dark', label: 'Dark Theme', count: 8 },
  ];

  const handlePriceChange = (values: number[]) => {
    const newRange = [values[0], values[1]] as [number, number];
    setPriceRange(newRange);
    onFiltersChange({
      ...filters,
      priceRange: newRange,
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : '',
    });
  };

  const clearFilters = () => {
    const resetFilters = {
      priceRange: [0, 1000] as [number, number],
      category: '',
      sortBy: 'popularity',
    };
    setPriceRange(resetFilters.priceRange);
    onFiltersChange(resetFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heavy text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-brand-auraRed hover:text-brand-crimson text-sm transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold">Price Range</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={500}
            min={0}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-white/70 text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={filters.category === category.id}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
                className="border-white/30 data-[state=checked]:bg-brand-auraRed data-[state=checked]:border-brand-auraRed"
              />
              <Label 
                htmlFor={category.id} 
                className="text-white/70 hover:text-white cursor-pointer flex-1 flex justify-between"
              >
                <span>{category.label}</span>
                <span className="text-white/50">({category.count})</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold">Style Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.button
              key={tag.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 glass-effect hover:bg-white/10 text-white/70 hover:text-white text-sm rounded-full transition-all duration-200"
            >
              {tag.label}
              <span className="ml-1 text-xs opacity-60">({tag.count})</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-4">
        <h4 className="text-white font-semibold">Availability</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="in-stock"
              className="border-white/30 data-[state=checked]:bg-brand-auraRed data-[state=checked]:border-brand-auraRed"
            />
            <Label htmlFor="in-stock" className="text-white/70 hover:text-white cursor-pointer">
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="on-sale"
              className="border-white/30 data-[state=checked]:bg-brand-auraRed data-[state=checked]:border-brand-auraRed"
            />
            <Label htmlFor="on-sale" className="text-white/70 hover:text-white cursor-pointer">
              On Sale
            </Label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}