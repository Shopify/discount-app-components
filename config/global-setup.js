module.exports = () => {
  // This variable ensures tests always run in UTC timezone regardless of the location
  // of the process executes them (i.e. local or CI).
  // Without this, NodeJs gets its timezone from the container or machine.
  process.env.TZ = 'UTC';
};
