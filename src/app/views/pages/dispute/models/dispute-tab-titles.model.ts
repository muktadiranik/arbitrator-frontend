export interface ITab {
  id: string;
  value: string;
  path: string;
  roles: string[];
}
//the roles key contains list of user.actor.type allowed
export const disputeDashboardTabTitles: ITab[] = [
  {
    id: 'claimer',
    value: 'Claimer',
    path: `claimer/summary`,
    roles: ['respondent', 'arbitrator', 'creator'],
  },
  {
    id: 'claimerme',
    value: 'Claimer (me)',
    path: `claimer/actions`,
    roles: ['claimer'],
  },
  {
    id: 'dashboard',
    value: 'Dashboard',
    path: `dashboard`,
    roles: ['claimer', 'respondent', 'arbitrator', 'creator'],
  },
  {
    id: 'respondent',
    value: 'Respondent',
    path: `respondent/summary`,
    roles: ['claimer', 'arbitrator', 'creator'],
  },
  {
    id: 'respondentme',
    value: 'Respondent (me)',
    path: `respondent/actions`,
    roles: ['respondent'],
  },
  {
    id: 'claimer-handoff',
    value: 'Claimer Handoff',
    path: `claimer-handoff`,
    roles: ['creator'],
  },
  {
    id: 'respondent-handoff',
    value: 'Respondent Handoff',
    path: `respondent-handoff`,
    roles: ['creator'],
  },
  {
    id: 'witnessme',
    value: 'Witness (me)',
    path: `witness/actions`,
    roles: ['witness'],
  },
  {
    id: 'witness',
    value: 'Witness',
    path: 'witness',
    roles: ['claimer', 'respondent', 'creator', 'arbitrator'],
  },
  {
    id: 'note-board',
    value: 'Note Board',
    path: `note-board/board`,
    roles: ['arbitrator'],
  },
  {
    id: 'term-sheet',
    value: 'Term Sheet',
    path: `term-sheet`,
    roles: ['arbitrator'],
  },
  {
    id: 'timelog',
    value: 'Time Log',
    path: `timelog`,
    roles: ['arbitrator'],
  },
];

export const hideTabForRoutes = ['claimer-handoff', 'respondent-handoff'];

export const creatorDashboardTabTitles = [
  {
    id: 'waiting-for-sign-up',
    value: 'Waiting for sign up',
    path: '../waiting-for-sign-up',
  },
  {
    id: 'in-progress',
    value: 'In progress',
    path: '../in-progress',
  },
  {
    id: 'resolved',
    value: 'Resolved',
    path: '../resolved',
  },
  {
    id: 'unresolved',
    value: 'Unresolved',
    path: '../unresolved',
  },
];
