const DEVELOPMENT = "development",
  PRODUCTION = "production";

export const secToTimeString = (input) => {
  let mm = Math.floor(+input / 60);
  let ss = +input - mm * 60;

  return `${mm < 10 ? "0" + mm : mm.toString()}:${
    ss < 10 ? "0" + ss : ss.toString()
  }`;
};

export const roundEfficiency = (right = 0, time = 0) => {
  let efficiency = time > 0 ? right / (time / 60) : 0;

  if (efficiency === 0) return efficiency.toFixed(0);
  if (efficiency < 1) return efficiency.toFixed(2);
  if (efficiency < 10 && efficiency % efficiency.toFixed(0) > 0)
    return efficiency.toFixed(1);
  else return efficiency.toFixed(0);
};

export const isDevelopment = () => {
  return process.env.NODE_ENV === DEVELOPMENT;
};

export const isProduction = () => {
  return process.env.NODE_ENV === PRODUCTION;
};
