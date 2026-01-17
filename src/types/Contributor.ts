export type Contributor = {
  id?: number;
  slack_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  circles: string[];
  skills: string;
  is_active: boolean;
  is_contributor: string;
  last_synced_at: string;
};
