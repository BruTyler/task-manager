import {RepeatingDays} from '../types';
import {RepeatingDaysMap} from '../const';


export const isTaskRepeating = (repeatingMask: number): boolean => {
  return repeatingMask > 0;
};

export const isDayRepeating = (repeatingMask: number, dayName: string): boolean => {
  return Boolean(repeatingMask & RepeatingDaysMap[dayName]);
};

export const updateRepeatingMask = (repeatingMask: number, dayName: string): number => {
  return repeatingMask ^ RepeatingDaysMap[dayName];
};

export const getRepeatingDayNames = (): string[] => {
  return Object.keys(RepeatingDaysMap).filter((dayKey) => isNaN(Number(dayKey)));
};

export const reduceDaysToMask = (selectedDays: string[]): number => {
  return selectedDays.reduce(
      (accumulatedBit, dayKey) => accumulatedBit | RepeatingDaysMap[dayKey],
      0
  );
};

export const convertRepeatingToMask = (repeatingDays: RepeatingDays): number => {
  const repeatingDayNames = getRepeatingDayNames();

  const repeatingMask = repeatingDayNames
    .reduce(
        (accumulatedBit, dayKey) => {
          if (repeatingDays[dayKey]) {
            accumulatedBit += repeatingDays[dayKey] ? RepeatingDaysMap[dayKey] : 0;
          }

          return accumulatedBit;
        },
        0
    );

  return repeatingMask;
};

export const convertRepeatingToDays = (repeatingMask: number): RepeatingDays => {
  const repeatingDays = {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  };

  Object.keys(repeatingDays).forEach((dayKey) => {
    repeatingDays[dayKey] = isDayRepeating(repeatingMask, dayKey);
  });

  return repeatingDays;
};
