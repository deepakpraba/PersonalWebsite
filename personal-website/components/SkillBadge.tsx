interface SkillBadgeProps {
  skill: string
  variant?: 'primary' | 'secondary'
}

export default function SkillBadge({ skill, variant = 'primary' }: SkillBadgeProps) {
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:shadow-md',
    secondary:
      'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:shadow-md',
  }

  return (
    <span
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default ${variants[variant]}`}
    >
      {skill}
    </span>
  )
}
