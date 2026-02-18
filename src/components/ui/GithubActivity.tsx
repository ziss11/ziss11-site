'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ContributionBox = ({
  level,
  index,
}: {
  level: number;
  index: number;
}) => {
  // Level 0: No contribution (Dark)
  // Level 1: Low (Dark Blue)
  // Level 2: Medium (Blue)
  // Level 3: High (Neon Blue)
  // Level 4: Extreme (Purple/Pink accent)

  const colors = [
    'rgba(255, 255, 255, 0.05)', // 0
    '#0e4429', // 1
    '#006d32', // 2
    '#26a641', // 3
    '#39d353', // 4
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.002, duration: 0.2 }}
      viewport={{ once: true }}
      className='w-[12px] h-[12px] rounded-[3px]'
      style={{
        background: colors[level],
        boxShadow: level > 2 ? `0 0 8px ${colors[level]}` : 'none',
      }}
      whileHover={{ scale: 1.5, zIndex: 10, boxShadow: '0 0 15px white' }}
    />
  );
};

export default function GithubActivity() {
  const [contributions, setContributions] = useState<number[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add timeout to fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(
          'https://github-contributions-api.jogruber.de/v4/ziss11',
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.contributions) {
          // Get last 364 days
          const lastYear = data.contributions.slice(-364);

          // Map levels and update state
          setContributions(lastYear.map((c: { level: number }) => c.level));

          // Calculate total for the shown period
          const total = lastYear.reduce(
            (acc: number, curr: { count: number }) => acc + curr.count,
            0
          );
          setTotalContributions(total);
        }
      } catch (error) {
        console.error('Failed to fetch github data', error);

        // Fallback: Generate mock data for demonstration
        const mockData = Array.from({ length: 364 }, () =>
          Math.floor(Math.random() * 5)
        );
        setContributions(mockData);
        setTotalContributions(mockData.reduce((a, b) => a + b, 0));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <section className='py-24 px-4 md:px-[10%] relative'>
        <div className='max-w-[900px] mx-auto bg-[#05050a]/80 border border-accent-green/20 rounded-[24px] p-4 md:p-8 backdrop-blur-md' style={{ minHeight: '280px' }} />
      </section>
    );

  return (
    <section className='py-24 px-4 md:px-[10%] relative'>
      {/* Visual Title - Matched to other sections */}
      <h2 className='text-[2.5rem] text-center mb-16 text-white font-mono font-bold'>
        Github <span className='text-accent-green'>Activity</span>
      </h2>

      <div className='max-w-[900px] mx-auto bg-[#05050a]/80 border border-accent-green/20 rounded-[24px] p-4 md:p-8 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] font-mono'>
        {/* Internal Terminal Command styled as sub-header or detail */}
        <div className='mb-6 border-b border-accent-green/10 pb-4'>
          <div className='text-text-secondary text-[0.9rem]'>
            <span className='text-accent-green'>➜</span>{' '}
            <span className='text-accent-blue'>~</span> $ git contributions
            --user=ziss11
          </div>
          <div className='text-text-secondary text-[0.9rem] mt-2'>
            {'//'} {totalContributions} contributions in the last year
          </div>
        </div>

        <div className='grid grid-rows-[repeat(7,1fr)] grid-flow-col gap-1 overflow-x-auto pb-4'>
          {contributions.map((level, i) => (
            <ContributionBox
              key={i}
              level={level}
              index={i}
            />
          ))}
        </div>

        <div className='flex gap-4 items-center mt-4 text-[0.8rem] text-text-secondary font-mono'>
          <span>{'/* Less'}</span>
          <div className='flex gap-[2px]'>
            <div className='w-[10px] h-[10px] bg-white/5 rounded-[2px]' />
            <div className='w-[10px] h-[10px] bg-[#0e4429] rounded-[2px]' />
            <div className='w-[10px] h-[10px] bg-[#006d32] rounded-[2px]' />
            <div className='w-[10px] h-[10px] bg-[#26a641] rounded-[2px]' />
            <div className='w-[10px] h-[10px] bg-[#39d353] rounded-[2px]' />
          </div>
          <span>{'More */'}</span>
        </div>
      </div>
    </section>
  );
}
