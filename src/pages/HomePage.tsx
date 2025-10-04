import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components/Input';
import { TimeInput } from '../components/TimeInput';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import { TripPlanResult } from '../components/TripPlanResult';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { mockTripPlan } from '../mock/tripPlanData';
import type { CreatePlanRequest } from '../types/request';
import type { TripPlanResponseType } from '../types/response';
import BackgroundGlass from '../components/BackgroundGlass';

const validationSchema = Yup.object({
  day: Yup.number()
    .required('Number of days is required')
    .min(1, 'Number of days must be at least 1')
    .max(31, 'Number of days cannot exceed 31')
    .integer('Number of days must be a whole number')
    .typeError('Please enter a valid number'),
  country: Yup.string()
    .required('Destination is required')
    .min(2, 'Destination must be at least 2 characters')
    .max(100, 'Destination must not exceed 100 characters')
    .trim()
    .matches(
      /^[a-zA-Z\s,.-]+$/,
      'Destination can only contain letters, spaces, and basic punctuation'
    ),
  startTime: Yup.string()
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time'),
  endTime: Yup.string()
    .optional()
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time')
    .test('is-after-start', 'End time must be after start time', function (value) {
      const { startTime } = this.parent;
      if (!value || !startTime) return true;
      return value > startTime;
    }),
});

type ViewState = 'form' | 'loading' | 'result' | 'error';

export const HomePage = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [viewState, setViewState] = useState<ViewState>('form');
  const [tripPlan, setTripPlan] = useState<TripPlanResponseType[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  const formik = useFormik<CreatePlanRequest>({
    initialValues: {
      day: 0,
      country: '',
      startTime: '',
      endTime: '',
    },
    validationSchema,
    onSubmit: async values => {
      setViewState('loading');

      // Prepare request payload - only include optional fields if they have values
      const requestPayload: Partial<CreatePlanRequest> = {
        day: values.day,
        country: values.country,
      };

      // Only add startTime and endTime if they were provided
      if (values.startTime) {
        requestPayload.startTime = values.startTime;
      }
      if (values.endTime) {
        requestPayload.endTime = values.endTime;
      }

      console.log('Request payload:', requestPayload);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Uncomment the line below to test error state
        // throw new Error('API Error: Unable to generate trip plan');

        // TODO: Replace with actual API call
        // Example:
        // const response = await fetch('/api/generate-plan', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(requestPayload)
        // });
        // if (!response.ok) throw new Error('Failed to generate trip plan');
        // const data = await response.json();
        // setTripPlan(data);

        setTripPlan(mockTripPlan);
        setViewState('result');
      } catch (error) {
        console.error('Error generating trip plan:', error);
        setErrorMsg(
          error instanceof Error
            ? error.message
            : 'Failed to generate trip plan. Please check your connection and try again.'
        );
        setViewState('error');
      }
    },
  });

  const handleReset = () => {
    setViewState('form');
    setTripPlan([]);
    setErrorMsg('');
    formik.resetForm();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative'>
      <BackgroundGlass />
      <div className='relative z-10 flex items-center justify-center min-h-screen px-4 py-12'>
        <div className='w-full max-w-xl'>
          <div className='text-center mb-10'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl mb-4 shadow-lg'>
              <span className='text-3xl'>✈️</span>
            </div>
            <h1
              className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-violet-900 bg-clip-text text-transparent mb-3'
              data-testid='app_name'
            >
              Trip Planner
            </h1>
            <p className='text-slate-600 text-lg'>Plan your perfect adventure in seconds</p>
          </div>

          <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8'>
            {viewState === 'loading' && <LoadingSpinner />}

            {viewState === 'error' && (
              <ErrorMessage message={errorMsg} onRetry={handleReset} onBack={handleReset} />
            )}

            {viewState === 'result' && <TripPlanResult plans={tripPlan} onClose={handleReset} />}

            {viewState === 'form' && (
              <form onSubmit={formik.handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-5'>
                  <Input
                    label='Number of Days'
                    type='number'
                    min='1'
                    max='31'
                    defaultValue={1}
                    placeholder='e.g., 7'
                    icon='📅'
                    name='day'
                    value={formik.values.day}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.day && formik.errors.day ? formik.errors.day : undefined}
                    data-testid='day_field'
                  />

                  <Input
                    label='Destination'
                    type='text'
                    placeholder='e.g., Bangkok, Thailand'
                    icon='🌍'
                    name='country'
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.country && formik.errors.country
                        ? formik.errors.country
                        : undefined
                    }
                    data-testid='country_field'
                  />
                </div>

                {/* Optional Schedule Toggle */}
                <div className='space-y-4'>
                  <Checkbox
                    label='Add daily schedule times'
                    checked={showSchedule}
                    onChange={e => {
                      setShowSchedule(e.target.checked);
                      if (!e.target.checked) {
                        formik.setFieldValue('startTime', '');
                        formik.setFieldValue('endTime', '');
                      }
                    }}
                  />

                  {showSchedule && (
                    <div className='space-y-3 animate-fadeIn'>
                      <div className='grid md:grid-cols-2 gap-5'>
                        <TimeInput
                          label='Start Time'
                          icon='🌅'
                          name='startTime'
                          optional
                          value={formik.values.startTime}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.startTime && formik.errors.startTime
                              ? formik.errors.startTime
                              : undefined
                          }
                        />

                        <TimeInput
                          label='End Time'
                          icon='🌆'
                          name='endTime'
                          optional
                          value={formik.values.endTime}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.endTime && formik.errors.endTime
                              ? formik.errors.endTime
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  type='submit'
                  className='w-full text-base'
                  icon='✨'
                  disabled={formik.isSubmitting}
                  data-testid='generate_button'
                >
                  {formik.isSubmitting ? 'Generating...' : 'Generate My Trip Plan'}
                </Button>
              </form>
            )}

            {/* Features hint - only show on form view */}
            {viewState === 'form' && (
              <div className='mt-6 pt-6 border-t border-slate-100'>
                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div className='flex flex-col items-center gap-1'>
                    <span className='text-2xl'>🎯</span>
                    <span className='text-xs text-slate-600'>Personalized</span>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <span className='text-2xl'>⚡</span>
                    <span className='text-xs text-slate-600'>Instant</span>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <span className='text-2xl'>🗺️</span>
                    <span className='text-xs text-slate-600'>Detailed</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
