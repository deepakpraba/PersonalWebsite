export interface SkillCategory {
  category: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Data Engineering',
    skills: ['dbt', 'Apache Airflow', 'Apache Iceberg', 'ETL/ELT'],
  },
  {
    category: 'Cloud & Data Platforms',
    skills: ['AWS', 'Snowflake', 'Amazon Athena', 'Microsoft Fabric'],
  },
  {
    category: 'Programming',
    skills: ['Python', 'SQL', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'Tools & Technologies',
    skills: ['Git', 'Docker', 'Qlik Replicate', 'PowerBI'],
  },
]

export const allSkills = skills.flatMap((category) => category.skills)
