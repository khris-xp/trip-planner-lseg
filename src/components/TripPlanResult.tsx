import type { TripPlanResponseType } from '../types/response';

interface TripPlanResultProps {
  plans: TripPlanResponseType[];
  onClose?: () => void;
}

export const TripPlanResult = ({ plans, onClose }: TripPlanResultProps) => {
  return (
    <div className='space-y-6 animate-fadeIn' data-testid='content_response'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold text-slate-900'>Your Trip Plan</h2>
          <p className='text-sm text-slate-600 mt-1'>
            {plans.length} {plans.length === 1 ? 'day' : 'days'} of adventure awaits
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
            aria-label='Close'
          >
            <svg
              className='w-6 h-6 text-slate-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>

      <div className='space-y-6'>
        {plans.map((dayPlan, index) => (
          <DayCard key={index} dayPlan={dayPlan} />
        ))}
      </div>
    </div>
  );
};

const DayCard = ({ dayPlan }: { dayPlan: TripPlanResponseType }) => {
  const parseDetails = (details: string) => {
    const lines = details.split('\n');
    const theme = lines[0].replace(/^Day \d+:\s*/, '').trim();
    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } | null = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('=')) continue;

      if (
        line &&
        !line.match(/^\d{2}:\d{2}/) &&
        ['Morning', 'Lunch', 'Afternoon', 'Dinner', 'Evening'].some(s => line.includes(s))
      ) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = { title: line, content: [] };
      } else if (currentSection && line) {
        currentSection.content.push(line);
      }
    }

    if (currentSection) {
      sections.push(currentSection);
    }

    return { theme, sections };
  };

  const { sections } = parseDetails(dayPlan.details);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className='bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
      <div className='bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-4'>
        <div className='flex items-center justify-between text-white'>
          <div>
            <h3 className='text-lg font-bold'>Day {dayPlan.day}</h3>
            <p className='text-indigo-100 text-sm mt-0.5'>
              {formatTime(dayPlan.startTime)} - {formatTime(dayPlan.endTime)}
            </p>
          </div>
        </div>
      </div>

      <div className='divide-y divide-slate-200'>
        {sections.map((section, index) => (
          <TimeSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
};

const TimeSection = ({ section }: { section: { title: string; content: string[] } }) => {
  const getIcon = (title: string) => {
    if (title.includes('Morning')) return '🌅';
    if (title.includes('Lunch')) return '🍽️';
    if (title.includes('Afternoon')) return '☀️';
    if (title.includes('Dinner') || title.includes('Evening')) return '🌆';
    return '📍';
  };

  return (
    <div className='px-6 py-5'>
      <div className='flex items-center gap-2 mb-4'>
        <span className='text-xl'>{getIcon(section.title)}</span>
        <h4 className='font-bold text-slate-900 text-lg'>{section.title}</h4>
        <div className='flex-1 h-px bg-slate-200 ml-2'></div>
      </div>

      <div className='space-y-3 text-slate-700 text-sm leading-relaxed'>
        {section.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
