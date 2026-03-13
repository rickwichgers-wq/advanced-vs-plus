import {
  FEATURE_CATEGORIES,
  KEY_DIFFERENTIATORS,
  KEY_BENEFITS,
  PUBLIC_SOURCES,
  SUCCESS_STORIES,
} from '../utils/data.js';

export function getCategories() {
  return FEATURE_CATEGORIES;
}

export function getCategoryById(id) {
  return FEATURE_CATEGORIES.find(c => c.id === id) || null;
}

export function getKeyDifferentiators() {
  return KEY_DIFFERENTIATORS;
}

export function getKeyBenefits() {
  return KEY_BENEFITS;
}

export function getPublicSources() {
  return PUBLIC_SOURCES;
}

export function getSuccessStories() {
  return SUCCESS_STORIES;
}

export function searchFeatures(query) {
  if (!query) return [];
  const q = query.toLowerCase();
  const results = [];

  FEATURE_CATEGORIES.forEach(cat => {
    cat.features.forEach(f => {
      if (f.name.toLowerCase().includes(q)) {
        results.push({ ...f, category: cat.label, categoryId: cat.id });
      }
    });
  });

  return results;
}

export function getPlusOnlyFeatures() {
  const results = [];
  FEATURE_CATEGORIES.forEach(cat => {
    cat.features.forEach(f => {
      if (f.advanced === false && f.plus === true) {
        results.push({ ...f, category: cat.label, categoryId: cat.id });
      }
    });
  });
  return results;
}

export function generateTalkTrack(featureName) {
  const feature = searchFeatures(featureName)[0];
  if (!feature) return null;

  return {
    feature: feature.name,
    category: feature.category,
    advanced: feature.advanced,
    plus: feature.plus,
    plusOnly: feature.advanced === false,
  };
}
