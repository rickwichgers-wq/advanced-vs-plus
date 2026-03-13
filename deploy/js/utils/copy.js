export const APP_NAME = 'PlusCase';
export const TAGLINE = 'Make the case for Plus.';
export const CONTEXT_LINE = 'Stop building one-pagers from scratch. PlusCase gives you calculators, comparisons, and generators — ready to go.';

export const PAGE_DESCRIPTIONS = {
  home:        { title: 'Home', subtitle: 'Your sales enablement dashboard' },
  calculators: { title: 'Calculators', subtitle: 'TCO, fee savings, POS Pro, and ROI calculators' },
  comparisons: { title: 'Comparisons', subtitle: 'Feature-by-feature Advanced vs Plus breakdowns' },
  generators:  { title: 'Rep Prep', subtitle: 'Outcome-based meeting prep and AI document generation' },
  settings:    { title: 'Settings', subtitle: 'Preferences and configuration' },
  resources:   { title: 'Resources', subtitle: 'Existing tools, docs, decks, and channels' },
  features:    { title: 'Features', subtitle: 'What this tool can do' },
  changelog:   { title: 'Changelog', subtitle: 'Version history' },
};

export const EMPTY_STATES = {
  calculators: {
    title: 'No saved calculations',
    message: 'Run a calculator to compare Advanced vs Plus for a specific merchant.',
    icon: 'calculator',
  },
  comparisons: {
    title: 'Select a comparison',
    message: 'Choose a feature area to see the Advanced vs Plus breakdown.',
    icon: 'columns',
  },
  generators: {
    title: 'Prep for your next meeting',
    message: 'Select merchant outcomes to generate a personalized value story, talking points, and objection drill.',
    icon: 'briefcase',
  },
};
