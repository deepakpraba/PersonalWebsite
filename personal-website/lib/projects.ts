export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  date: string
}

export const projects: Project[] = [
  {
    id: 'five-star-dashboard',
    title: 'Five Star Plan Performance Dashboard',
    description:
      'Comprehensive analytics dashboard for homebuilding performance metrics using dbt and Snowflake. Built SQL transformations and metric calculations for star rating systems.',
    technologies: ['dbt', 'Snowflake', 'SQL', 'Airflow'],
    featured: true,
    date: '2025-01',
  },
  {
    id: 'data-pipeline-orchestration',
    title: 'Data Pipeline Orchestration',
    description:
      'Developed and maintained Airflow DAGs for ETL processes with robust error handling and monitoring. Streamlined data workflows across multiple data sources.',
    technologies: ['Airflow', 'Python', 'AWS', 'Docker'],
    featured: true,
    date: '2025-01',
  },
  {
    id: 'buildpro-integration',
    title: 'BuildPro Data Integration',
    description:
      'Integrated BuildPro data using Qlik Replicate with StageRaw model development and schema synchronization for seamless data flow.',
    technologies: ['Qlik Replicate', 'dbt', 'Apache Iceberg', 'Snowflake'],
    featured: true,
    date: '2024-12',
  },
  {
    id: 'atp-jira-migration',
    title: 'ATP/JIRA PowerBI Migration',
    description:
      'Successfully migrated PowerBI connectors achieving 100% column match between old and new data sources. Ensured data integrity throughout the migration process.',
    technologies: ['PowerBI', 'SQL', 'Python'],
    featured: false,
    date: '2024-11',
  },
]
