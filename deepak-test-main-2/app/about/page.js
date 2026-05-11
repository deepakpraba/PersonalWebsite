export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
      <p className="text-xs tracking-[0.4em] uppercase text-orange-500/70 mb-2">// Profile</p>
      <h1 className="text-3xl sm:text-5xl font-bold mb-2 tracking-tight glow-orange text-orange-400">About Me</h1>
      <p className="text-zinc-600 text-xs tracking-widest uppercase mb-10">Get to know me a little better</p>

      <div className="bg-[#0a0a1a] rounded border border-orange-500/20 p-8 mb-6 border-glow-orange">
        <h2 className="text-sm font-semibold text-orange-400 tracking-widest uppercase mb-3">// Who I Am</h2>
        <p className="text-zinc-200 leading-loose text-base mb-5">
          Hey, I&apos;m Deepak — a Data Engineer at Lennar and an Ohio State grad with a degree in Computer Engineering.
          I&apos;m currently based in the Dallas area and my work keeps me busy managing and building data pipelines,
          but outside of work I keep myself busy learning new technologies and diving into my hobbies.
        </p>
        <p className="text-zinc-200 leading-loose text-base">
          Music has always been something I gravitate toward, and I&apos;ve been putting that into actually learning how to DJ lately.
          I also recently picked up golf, which has been a whole journey in itself. At home I have a goldendoodle named Rocky
          who takes up more space on the couch than he should. On weekends I&apos;m watching Ohio State football or following
          the Detroit Lions — two fan bases that have taught me a lot about patience over the years.
        </p>
      </div>

      <div className="bg-[#0a0a1a] rounded border border-orange-500/20 p-8 mb-6 border-glow-orange">
        <h2 className="text-sm font-semibold text-orange-400 tracking-widest uppercase mb-4">// Technical Background</h2>
        <p className="text-zinc-200 leading-loose text-base mb-5">
          I&apos;ve been a Data Engineer at Lennar since April 2025, where my work spans the full data pipeline lifecycle — from ingestion and transformation to orchestration and deployment. My day-to-day stack includes Apache Airflow on AWS (MWAA), Snowflake, dbt Cloud, AWS Glue, and AWS S3, alongside other services in the AWS suite.
        </p>
        <p className="text-zinc-200 leading-loose text-base mb-5">
          Two of the more impactful projects I&apos;ve worked on at Lennar include the Five Star Plan Performance pipeline and a full Airflow infrastructure overhaul. The Five Star pipeline is a data-driven home design rating system built on a dbt medallion architecture in Snowflake, giving leadership a consistent way to evaluate and compare floor plans across markets. The Airflow overhaul was a ground-up rebuild of the entire orchestration layer — one of the core improvements was designing a parallel AWS Glue job execution pattern that runs all tables in a single coordinated run, drastically reducing load times. A key part of the architecture is the separation of Historical and Change Tracking jobs, with a locking mechanism that prevents both from writing simultaneously and causing data conflicts. The result is an orchestration system that is faster, more reliable, and built to scale.
        </p>
        <p className="text-zinc-200 leading-loose text-base">
          Before Lennar, I completed an Applications Engineering internship at Rocket Mortgage. I graduated from Ohio State University with a degree in Computer Engineering and hold an AWS Certified Cloud Practitioner certification. I&apos;m continuously expanding my knowledge in the data and AI space, particularly around how modern data infrastructure intersects with machine learning and AI systems.
        </p>
      </div>

      <div className="bg-[#0a0a1a] rounded border border-orange-500/20 p-8 border-glow-orange">
        <h2 className="text-sm font-semibold text-orange-400 tracking-widest uppercase mb-6">// Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-orange-400/70 mb-3">Cloud &amp; Infrastructure</p>
            <ul className="space-y-2">
              {["AWS (MWAA, Glue, S3, Lambda)", "Snowflake", "Apache Airflow"].map(s => (
                <li key={s} className="flex items-center gap-2 text-zinc-200 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-orange-400/70 mb-3">Data &amp; Analytics</p>
            <ul className="space-y-2">
              {["dbt Cloud", "Apache Spark / PySpark", "ETL/ELT"].map(s => (
                <li key={s} className="flex items-center gap-2 text-zinc-200 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-orange-400/70 mb-3">DevOps &amp; Tools</p>
            <ul className="space-y-2">
              {["GitHub Actions", "CI/CD", "Qlik Replicate"].map(s => (
                <li key={s} className="flex items-center gap-2 text-zinc-200 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400/70 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
