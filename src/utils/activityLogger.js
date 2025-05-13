export const logActivity = (action) => {
  const timestamp = new Date().toISOString();
  const entry = { action, timestamp };

  const existing = JSON.parse(localStorage.getItem('pmLite_activity_log')) || [];
  existing.unshift(entry); // latest first
  localStorage.setItem('pmLite_activity_log', JSON.stringify(existing));
};
