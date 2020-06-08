import AppleHealthKit from "rn-apple-healthkit";
const PERMS = AppleHealthKit.Constants.Permissions;

const healthKitPermissions = {
  permissions: {
    read: [PERMS.StepCount, PERMS.DistanceWalkingRunning]
  },
};

const healthKitOptions = {
    date: new Date().toISOString()
}

export const fetchFitnessApi = (options) => {
    /**
     * pass date in options arugement. If not, then it will give today's data
     */
    
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(healthKitPermissions, (err, results) => {
      if (err) {
        reject(err);
      }
      AppleHealthKit.getStepCount(options || healthKitOptions, (err, steps) => {
        AppleHealthKit.getDistanceWalkingRunning( options || healthKitOptions, (err, distance) => {
            const result = { steps, distance};
            resolve(result);
          });
      });
    });
  });
};
