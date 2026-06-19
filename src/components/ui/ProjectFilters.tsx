import { ProjectCategory } from '@/data/projectsData'

interface ProjectFiltersProps {
  categories: ('Tous' | ProjectCategory)[]
  activeCategory: 'Tous' | ProjectCategory
  onSelect: (category: 'Tous' | ProjectCategory) => void
}

export function ProjectFilters({ categories, activeCategory, onSelect }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-12">
      {categories.map((cat) => {
        const isActive = activeCategory === cat
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-all duration-300 border ${
              isActive 
                ? 'bg-ink text-white border-ink shadow-lg scale-105' 
                : 'bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
