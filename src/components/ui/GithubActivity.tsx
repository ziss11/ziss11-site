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
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '3px',
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

  if (loading) return null;

  return (
    <section style={{ padding: '6rem 10%', position: 'relative' }}>
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'rgba(5, 5, 10, 0.8)',
          border: '1px solid rgba(126, 231, 135, 0.2)',
          borderRadius: '24px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <div
          style={{
            marginBottom: '2rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div
            style={{
              color: '#8b949e',
              marginBottom: '0.2rem',
              fontSize: '0.9rem',
            }}
          >
            <span style={{ color: '#7ee787' }}>➜</span>{' '}
            <span style={{ color: '#79c0ff' }}>~</span> $ git contributions
            --user=ziss11
          </div>
          <h2
            style={{ fontSize: '1.5rem', color: '#c9d1d9', marginBottom: '0' }}
          >
            Github <span style={{ color: '#7ee787' }}>Activity</span>
          </h2>
        </div>
        <div
          style={{
            color: '#8b949e',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {'//'} {totalContributions} contributions in the last year
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(7, 1fr)',
            gridAutoFlow: 'column',
            gap: '4px',
            overflowX: 'auto',
            paddingBottom: '1rem',
          }}
        >
          {contributions.map((level, i) => (
            <ContributionBox
              key={i}
              level={level}
              index={i}
            />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
            fontSize: '0.8rem',
            color: '#8b949e',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span>{'/* Less'}</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <div
              style={{
                width: 10,
                height: 10,
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
              }}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                background: '#0e4429',
                borderRadius: 2,
              }}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                background: '#006d32',
                borderRadius: 2,
              }}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                background: '#26a641',
                borderRadius: 2,
              }}
            ></div>
            <div
              style={{
                width: 10,
                height: 10,
                background: '#39d353',
                borderRadius: 2,
              }}
            ></div>
          </div>
          <span>{'More */'}</span>
        </div>
      </div>
    </section>
  );
}
