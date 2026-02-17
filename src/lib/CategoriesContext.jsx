import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';
import { categories as fallbackCategories } from '../data/guides';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  // Initialize with fallback or localStorage
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('sb_categories');
    return saved ? JSON.parse(saved) : fallbackCategories;
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('name')
          .order('order_index', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const names = data.map(c => c.name);
          setCategories(names);
          localStorage.setItem('sb_categories', JSON.stringify(names));
        }
      } catch (err) {
        console.error("Error background fetching categories:", err);
      }
    }

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
