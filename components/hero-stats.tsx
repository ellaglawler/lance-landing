"use client"

import { useEffect } from 'react'
import { TrendingUp, Target, Clock } from 'lucide-react'

export function HeroStats() {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const targetValue = parseInt(target.getAttribute('data-target') || '0');
          const startValue = parseInt(target.textContent || '0');
          const duration = 1000; // milliseconds
          let currentValue = startValue;

          const updateCounter = () => {
            if (currentValue < targetValue) {
              const increment = Math.ceil(targetValue / duration);
              currentValue += increment;
              target.textContent = currentValue.toString();
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = targetValue.toString();
            }
          };

          updateCounter();
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      observer.observe(counter);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-3 mb-10 max-w-4xl mx-auto">
      {/* Primary Stat */}
      <div className="hero-stats-card primary">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-800">
              <span className="counter" data-target="2">0</span>×
            </div>
            <div className="text-sm text-gray-600 -mt-1">Faster Payments</div>
          </div>
        </div>
      </div>

      <div className="hero-stats-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg opacity-80">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-800">
              $<span className="counter" data-target="1000">0</span>+
            </div>
            <div className="text-sm text-gray-600 -mt-1">Monthly Recovery</div>
          </div>
        </div>
      </div>

      <div className="hero-stats-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg opacity-80">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-3xl font-bold text-gray-800">
              <span className="counter" data-target="8">0</span>+
            </div>
            <div className="text-sm text-gray-600 -mt-1">Hours Saved Weekly</div>
          </div>
        </div>
      </div>
    </div>
  )
} 