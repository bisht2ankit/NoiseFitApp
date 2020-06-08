import AppleHealthKit from "rn-apple-healthkit";
const PERMS = AppleHealthKit.Constants.Permissions;

const healthKitOptions = {
  permissions: {
    read: [PERMS.StepCount, PERMS.Height],
    write: [PERMS.StepCount],
  },
};

export const getStepCounts = () => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(healthKitOptions, (err, results) => {
      if (err) {
        console.log("error initializing Healthkit: ", err);
        return;
      }
      AppleHealthKit.getStepCount(healthKitOptions, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  });
};
